const ChatMessage = ({ message }) => {
  return (
    <div
      className={`my-3 flex ${
        message.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] px-4 py-2 rounded-xl whitespace-pre-wrap break-words ${
          message.role === "user"
            ? "bg-orange-500 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatMessage;