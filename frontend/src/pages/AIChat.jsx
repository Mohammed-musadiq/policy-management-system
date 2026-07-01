import { useState } from "react";

function AIChat() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm your AI Policy Assistant. Ask me anything about our insurance policies.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text,
        }),
      });

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const aiReply = await response.text();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Unable to connect to the AI server.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>🤖 AI Policy Assistant</h2>

      <div
        style={{
          height: "500px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "15px",
          background: "#fafafa",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "12px",
                borderRadius: "10px",
                background:
                  msg.sender === "user" ? "#dbeafe" : "#f3f4f6",
                maxWidth: "80%",
                whiteSpace: "pre-wrap",
              }}
            >
              <strong>{msg.sender === "user" ? "You" : "AI"}</strong>
              <br />
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ color: "gray" }}>
            AI is typing...
          </div>
        )}
      </div>

      <textarea
        rows="4"
        value={input}
        placeholder="Ask anything about insurance policies..."
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          resize: "none",
        }}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}

export default AIChat;