"use client";
import ChatWindow from "@/components/ChatWindow";
import ThemeToggle from "@/components/ThemeToggle";
import TopicSelector from "@/components/TopicSelector";
import { useChatStore } from "@/stores/useChatStore";
import { SquarePen } from "lucide-react";

export default function Home() {
  const { selectedChatId, setSelectedChatId, chats } = useChatStore();

  return (
    <div className="h-dvh flex">
      <aside className="w-64 bg-secondary py-4 px-3 flex flex-col">
        <div>
          <button
            onClick={() => setSelectedChatId(null)}
            className="flex items-center gap-4 font-medium hover:bg-foreground/5 px-3 py-2 rounded-md w-full transition-all"
          >
            <SquarePen size={20} /> New Chat
          </button>
          <h4 className="mt-8 font-semibold px-3">Your Chats</h4>
        </div>
        {chats?.length > 0 && (
          <div className="flex-1">
            {chats.map((chat) => {
              return (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`flex items-center gap-4 font-medium hover:bg-foreground/5 px-3 py-2 rounded-md w-full transition-all ${
                    selectedChatId === chat.id ? "bg-foreground/5" : ""
                  }`}
                >
                  {chat.topic}
                </button>
              );
            })}
          </div>
        )}
      </aside>
      <main className="flex-1 flex flex-col bg-card">
        <header className="h-14 border-b flex justify-between items-center px-6">
          <h1 className="font-kid text-2xl">ExplainItLikeImFive</h1>
          <ThemeToggle />
        </header>
        <section className="flex-1 text-center w-full mx-auto max-w-3xl">
          {selectedChatId ? <ChatWindow /> : <TopicSelector />}
        </section>
      </main>
    </div>
  );
}
