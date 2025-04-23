import React, { useState } from "react";
import styles from "./ChatWidget.module.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Привіт! Я допоможу обрати букет 🌸" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const botResponse = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      }).then((res) => res.json());

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: botResponse.reply },
      ]);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Вибач, щось пішло не так 😢" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleClear = () => {
    setMessages([{ from: "bot", text: "Привіт! Я допоможу обрати букет 🌸" }]);
  };

  return (
    <div className={styles.chatContainer}>
      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <span>Флорист-консультант 🌺</span>
            <button onClick={handleClear}>🗑 </button>
          </div>
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={styles[msg.from]}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className={styles.spinner}>
                <div className={styles["dot-flashing"]}></div>
              </div>
            )}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Напишіть, що вас цікавить..."
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
