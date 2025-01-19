import useChat from "@/hooks/useChat";
import "./ChatComponent.css"
import React, { useState } from "react";


export default function ChatComponent() {

    const [userMessage, setUserMessage] = useState("");
    const { messages, messageAreaRef, sendMessage, verdict } = useChat();
    const [visible, setVisible] = useState(true);

    async function handleSend() {
        await sendMessage(userMessage, "user");
        setUserMessage(""); // Clears the input field
        // Optionally, you can also focus back on the input field
        const inputField = document.getElementById("inputField") as HTMLInputElement;
        if (inputField) {
            inputField.focus(); // Keeps focus on the input field after sending the message
        }

    }

    return (
        <>
            {visible &&
                <div className="maple-chat-overlay">
                    <div className="maple-chat-window">
                        <h1 className="maple-chat-window-header">Are you sure you want to buy this?
                            <svg width="40" height="40" viewBox="0 0 172 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="28.5" cy="25" rx="28.5" ry="25" fill="#D9D9D9" />
                                <ellipse cx="143.5" cy="25" rx="28.5" ry="25" fill="#D9D9D9" />
                                <ellipse cx="83.5" cy="75" rx="76.5" ry="65" fill="#D9D9D9" />
                                <path d="M115 90.5C115 102.374 100.673 112 83 112C65.3269 112 51 102.374 51 90.5C51 78.6259 65.3269 69 83 69C100.673 69 115 78.6259 115 90.5Z" fill="#C4C4C4" />
                                <ellipse cx="52.7857" cy="68" rx="14.7857" ry="14" fill="white" />
                                <ellipse cx="113.214" cy="68" rx="14.7857" ry="14" fill="white" />
                                <path d="M55.0096 68.6365C55.0096 73.2054 51.2019 76.9092 46.5048 76.9092C41.8077 76.9092 38 73.2054 38 68.6365C38 64.0676 41.8077 60.3638 46.5048 60.3638C51.2019 60.3638 55.0096 64.0676 55.0096 68.6365Z" fill="#4F4343" />
                                <path d="M115.143 68.6365C115.143 73.2054 111.335 76.9092 106.638 76.9092C101.941 76.9092 98.1333 73.2054 98.1333 68.6365C98.1333 64.0676 101.941 60.3638 106.638 60.3638C111.335 60.3638 115.143 64.0676 115.143 68.6365Z" fill="#4F4343" />
                                <ellipse cx="73" cy="90.5" rx="6" ry="9.5" fill="#6B6C6E" />
                                <ellipse cx="94" cy="90.5" rx="6" ry="9.5" fill="#6B6C6E" />
                                <path d="M93.6455 50.636C133.507 40.2075 126.728 42.9885 126.319 50.6361" stroke="#6B6C6E" stroke-width="2" />
                                <path d="M42 51.9998C76.7184 29.0572 70.8134 35.1754 70.4577 52" stroke="#6B6C6E" stroke-width="2" />
                            </svg>

                        </h1>
                        {verdict === "" && <div id="chat-container">
                            <div id="message-area" ref={messageAreaRef}>
                                {messages.map((msg, index) => {
                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                textAlign: msg.role === "user" ? "right" : "left",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "inline-block",
                                                    padding: "8px",
                                                    borderRadius: "4px",
                                                    backgroundColor: msg.role === "user" ? "#d1e7dd" : "#f8d7da",
                                                    color: msg.role === "user" ? "#0f5132" : "#842029",
                                                }}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div id="message-input">
                                <svg className="bunnyface" width="40" height="40" viewBox="0 0 172 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="28.5" cy="25" rx="28.5" ry="25" fill="#D9D9D9" />
                                    <ellipse cx="143.5" cy="25" rx="28.5" ry="25" fill="#D9D9D9" />
                                    <ellipse cx="83.5" cy="75" rx="76.5" ry="65" fill="#D9D9D9" />
                                    <path d="M115 90.5C115 102.374 100.673 112 83 112C65.3269 112 51 102.374 51 90.5C51 78.6259 65.3269 69 83 69C100.673 69 115 78.6259 115 90.5Z" fill="#C4C4C4" />
                                    <ellipse cx="52.7857" cy="68" rx="14.7857" ry="14" fill="white" />
                                    <ellipse cx="113.214" cy="68" rx="14.7857" ry="14" fill="white" />
                                    <path d="M55.0096 68.6365C55.0096 73.2054 51.2019 76.9092 46.5048 76.9092C41.8077 76.9092 38 73.2054 38 68.6365C38 64.0676 41.8077 60.3638 46.5048 60.3638C51.2019 60.3638 55.0096 64.0676 55.0096 68.6365Z" fill="#4F4343" />
                                    <path d="M115.143 68.6365C115.143 73.2054 111.335 76.9092 106.638 76.9092C101.941 76.9092 98.1333 73.2054 98.1333 68.6365C98.1333 64.0676 101.941 60.3638 106.638 60.3638C111.335 60.3638 115.143 64.0676 115.143 68.6365Z" fill="#4F4343" />
                                    <ellipse cx="73" cy="90.5" rx="6" ry="9.5" fill="#6B6C6E" />
                                    <ellipse cx="94" cy="90.5" rx="6" ry="9.5" fill="#6B6C6E" />
                                    <path d="M93.6455 50.636C133.507 40.2075 126.728 42.9885 126.319 50.6361" stroke="#6B6C6E" stroke-width="2" />
                                    <path d="M42 51.9998C76.7184 29.0572 70.8134 35.1754 70.4577 52" stroke="#6B6C6E" stroke-width="2" />
                                </svg>

                                <div className="input-area">
                                    <input type="text" id="inputField" placeholder="Type a message..." onChange={(e) => setUserMessage(e.target.value)} value={userMessage} autoComplete="off" />
                                    <button id="submitButton" onClick={() => handleSend()} >Send</button>
                                </div>
                            </div>
                        </div>}
                        {verdict === "BUY" ? <button className="final" onClick={() => { setVisible(false) }}>buy it!!!</button> : 
                            verdict === "DONT BUY" ? <button className="final" onClick={() => { window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }}>don't buy it!</button> :
                                <button onClick={() => history.back()}>Cancel</button>}
                    </div>
                </div>}
        </>
    );
};
