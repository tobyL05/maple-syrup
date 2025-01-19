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
                                <svg width="40" height="40" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="41.1535" cy="36.9643" rx="37.7036" ry="32.0357" fill="#D9D9D9"/>
                                <ellipse cx="14.0464" cy="12.3214" rx="14.0464" ry="12.3214" fill="#D9D9D9"/>
                                <ellipse cx="70.7251" cy="12.3214" rx="14.0464" ry="12.3214" fill="#D9D9D9"/>
                                <path d="M56.6786 44.6036C56.6786 50.4558 49.6175 55.2 40.9072 55.2C32.1969 55.2 25.1357 50.4558 25.1357 44.6036C25.1357 38.7513 32.1969 34.0071 40.9072 34.0071C49.6175 34.0071 56.6786 38.7513 56.6786 44.6036Z" fill="#C4C4C4"/>
                                <ellipse cx="26.0158" cy="33.5143" rx="7.28725" ry="6.9" fill="white"/>
                                <ellipse cx="55.7984" cy="33.5143" rx="7.28725" ry="6.9" fill="white"/>
                                <path d="M27.1118 33.8279C27.1118 36.0798 25.2351 37.9052 22.9202 37.9052C20.6052 37.9052 18.7285 36.0798 18.7285 33.8279C18.7285 31.5761 20.6052 29.7507 22.9202 29.7507C25.2351 29.7507 27.1118 31.5761 27.1118 33.8279Z" fill="#4F4343"/>
                                <path d="M56.7489 33.8279C56.7489 36.0798 54.8723 37.9052 52.5573 37.9052C50.2423 37.9052 48.3656 36.0798 48.3656 33.8279C48.3656 31.5761 50.2423 29.7507 52.5573 29.7507C54.8723 29.7507 56.7489 31.5761 56.7489 33.8279Z" fill="#4F4343"/>
                                <ellipse cx="35.9786" cy="44.6036" rx="2.95714" ry="4.68214" fill="#6B6C6E"/>
                                <ellipse cx="46.3285" cy="44.6036" rx="2.95714" ry="4.68214" fill="#6B6C6E"/>
                                <line x1="19.7144" y1="21.6714" x2="31.0501" y2="21.6714" stroke="#4F4343" stroke-width="2"/>
                                <line x1="51.2571" y1="21.6714" x2="62.5928" y2="21.6714" stroke="#4F4343" stroke-width="2"/>
                                </svg>

                                <div className="input-area">
                                    <input type="text" id="inputField" placeholder="Convince me..." onChange={(e) => setUserMessage(e.target.value)} value={userMessage} autoComplete="off" />
                                    <button id="submitButton" onClick={() => handleSend()} >Send</button>
                                </div>
                            </div>
                        </div>}
                        {verdict === "BUY" ? <button className="final" onClick={() => { setVisible(false) }}>buy it!!!</button> : 
                            verdict === "DONT BUY" ? <button className="final" onClick={() => { window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }}>don't buy it!</button> :
                                <button id="cancel" onClick={() => history.back()}>Cancel</button>}   
                    </div>
                </div>}
        </>
    );
};
