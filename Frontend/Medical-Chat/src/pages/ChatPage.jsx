import { useEffect, useState } from "react";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import { useChat } from "../hooks/useChat";

function ChatPage() {
  const { sending, sendError, sendMessage, loadingHistory, chatHistory, historyError, } = useChat();

  const [messages, setMessages] = useState([]);
   useEffect(() => {
    if (chatHistory?.messages) {
      setMessages(
        chatHistory.messages.map((m) => ({
          sender: m.role === "user" ? "user" : "bot",
          text: m.content,
        }))
      );
    }
  }, [chatHistory]);
  const handleSend = (newMessage) => {
    setMessages((prev) => [...prev, { sender: "user", text: newMessage }]);

    sendMessage(newMessage, {
      onSuccess: (data) => {
        if (data?.reply) {
          setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
        }
      },
    });
  };


  return (
    <div className="w-screen h-[calc(100vh-96px)] flex flex-col bg-blue-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <MessageBubble key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>

    <ChatInput onSend={handleSend} sending={sending} />
    </div>
  );
}

export default ChatPage;
