import { useState, useRef, useEffect } from "react";

const sys_prompt = `You are an AI designed to help the user decide whether they should make a purchase. Your goal is to ask simple questions regarding the user's purchase.

Key rules:
- Default to agree with the user
- NEVER ask about the item being purchased.
- NEVER ask the same question multiple times. If the user persists, agree with the user.
- NEVER REPEAT QUESTIONS. If you find yourself asking the same question, agree with the user.
- NEVER ask about the urgency of the purchase.
- CONCLUDE THE CONVERSATION AFTER 2-3 QUESTIONS, ensuring the final message explicitly states either "I think you should buy it" or "I think you shouldn't buy it."

Guidelines for interaction:
- Limit your responses to 50 words.
- Avoid phrases like "I think you should/shouldn't buy it" until the final message of the conversation.
- Maintain a polite and respectful tone throughout.

Do not ask what the user wants to buy or how much it costs. Stay concise.
`;


const useChat = () => {
    const [messages, setMessages] = useState<
        { content: string; role: "user" | "system" }[]
    >([
        { content: "What are you buying this time... How much is it?", role: "system" }
    ]);
    const [verdict, setVerdict] = useState<"BUY" | "DONT BUY" | "">("");

    const [history, setHistory] = useState<{ content: string; role: "user" | "system" }[]>([{ content: sys_prompt, role: "system" }])

    // const history = [{ content: sys_prompt, role: "system" }]


    const messageAreaRef = useRef<HTMLDivElement | null>(null);

    const sendMessage = async (content: string, role: "user" | "system") => {
        console.log(history.length)
        if (history.length > 7) {
            console.log("Concluding chat")
            concludeChat()
            return
        }
        // history.push({ content, role })
        setHistory((prevHistory) => { return [...prevHistory, {content, role}] })
        setMessages((prevMessages) => {
            return [...prevMessages, { content, role }];
        })
        if (role === 'user') {
            await fetchChatbotResponse();
        }
    }

    const concludeChat = async () => {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer INSERT_OPEN_AI_KEY",
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [...history, { content: "From the conversation provided, respond with 'BUY' or 'DON'T BUY' and nothing else.", role: "user" }],
                    max_tokens: 150,
                }),
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0 && data.choices[0].message) {
                if (data.choices[0].message.content === "BUY") {
                    setVerdict("BUY")
                } else {
                    setVerdict("DONT BUY")
                }
            } else {
                console.log("No response from the API.");
            }
        } catch (error: any) {
            console.error("Error fetching response:", error);
            sendMessage("Failed to fetch response: " + error.message, "system");
        }
    }

    useEffect(() => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchChatbotResponse = async () => {

        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer INSERT_GROQ_KEY",
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: history,
                    max_completion_tokens: 150,
                }),
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0 && data.choices[0].message) {
                sendMessage(data.choices[0].message.content, "system");
            } else {
                sendMessage("No response from the API.", "system");
            }
            console.log(data)
        } catch (error: any) {
            console.error("Error fetching response:", error);
            sendMessage("Failed to fetch response: " + error.message, "system");
        }
    };

    return {
        messages,
        messageAreaRef,
        sendMessage,
        verdict
    };
};

export default useChat;

