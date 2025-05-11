"use client";
import { useChatStore } from "@/stores/useChatStore";
import React, { useState } from "react";

const ChatWindow = () => {
  const { chats, selectedChatId, updateChatMessages, updateChatFeedback } =
    useChatStore();
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  const { messages } = selectedChat || {};
  const [loading, setLoading] = useState(false);

  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (!userInput.trim() || loading) return;
    const newMessage = {
      role: "user",
      content: userInput,
    };
    const updatedMessages = [...(messages || []), newMessage];
    updateChatMessages(selectedChatId, updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) throw new Error("Failed to fetch AI response");

      const data = await res.json();

      if (data?.message) {
        updateChatMessages(selectedChatId, [
          ...updatedMessages,
          { role: "assistant", content: data.message },
        ]);
      }
    } catch (error) {
      updateChatMessages(selectedChatId, [
        ...updatedMessages,
        {
          role: "assistant",
          content: "Something went wrong. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full relative">
      {messages?.length > 0 && (
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 ${
                message.role === "user" ? "bg-blue-100" : "bg-gray-100 font-kid"
              } rounded-md mb-2`}
            >
              <strong>{message.role === "user" ? "You" : "AI"}:</strong>{" "}
              {message.content}
            </div>
          ))}
        </div>
      )}
      <div className="absolute bottom-12 left-0 right-0 shadow border rounded-full">
        <input
          type="text"
          value={userInput}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full px-4 py-2 outline-none"
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

export default ChatWindow;
