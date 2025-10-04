function MessageBubble({ text, sender }) {
  const isUser = sender === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm md:text-base 
        ${isUser 
          ? "bg-blue-600 text-white rounded-br-none" 
          : "bg-gray-200 text-black rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;
