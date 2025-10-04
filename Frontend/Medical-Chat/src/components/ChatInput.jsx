import { useState, useEffect, useRef } from "react";

function ChatInput({ onSend, sending }) {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  // Auto focus when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t border-gray-300 bg-white">
    <input
    ref={inputRef}
    type="text"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder="Type your message..."
    className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
    />

      <button
        onClick={handleSend}
        disabled={sending || !message.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        {sending ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

export default ChatInput;
