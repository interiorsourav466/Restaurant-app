import { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

const ChatInput = ({
  messages,
  setMessages,
  loading,
  setLoading,
}) => {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim() || loading) return;

    const userText = text;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userText,
      },
    ]);

    setText("");

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/ai/chat",
        {
          message: userText,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ AI is currently unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 border-t flex gap-2">

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Ask about food..."
        className="flex-1 border rounded-lg px-3 py-2"
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-orange-500 text-white p-3 rounded-lg disabled:opacity-50"
      >
        <Send size={18} />
      </button>

    </div>
  );
};

export default ChatInput;