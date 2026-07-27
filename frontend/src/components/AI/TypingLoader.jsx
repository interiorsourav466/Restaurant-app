const TypingLoader = () => {
  return (
    <div className="flex justify-start my-3">
      <div className="bg-gray-100 px-4 py-3 rounded-xl flex items-center gap-1">

        <span
          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        ></span>

        <span
          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>

        <span
          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>

      </div>
    </div>
  );
};

export default TypingLoader;