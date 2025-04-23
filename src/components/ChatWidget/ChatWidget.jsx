import React, { useState } from "react";
import styles from "./ChatWidget.module.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Привіт! Я допоможу обрати букет 🌸" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // тут буде виклик до OpenAI
    const botResponse = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    }).then((res) => res.json());

    setMessages((prev) => [...prev, { from: "bot", text: botResponse.reply }]);
  };

  return (
    <div className={styles.chatContainer}>
      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={styles[msg.from]}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Що вас цікавить?"
            />
            <button onClick={handleSend}>Відправити</button>
          </div>
        </div>
      )}
      <button className={styles.toggleButton} onClick={toggleChat}>
        💬
      </button>
    </div>
  );
};

export default ChatWidget;
