import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import TypingLoader from "./TypingLoader";

const AIChatBot = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! I'm Flavoro AI. Ask me anything about our menu.",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, loading, open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg z-50 cursor-pointer hover:scale-110 transition-all duration-300"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[550px] bg-white rounded-xl shadow-2xl flex flex-col z-50">
          <div className="bg-orange-500 text-white p-4 font-bold rounded-t-xl">
            Flavoro AI
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}

            {loading && <TypingLoader />}

            <div ref={bottomRef}></div>
          </div>

          <ChatInput
            messages={messages}
            setMessages={setMessages}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      )}
    </>
  );
};

export default AIChatBot;
