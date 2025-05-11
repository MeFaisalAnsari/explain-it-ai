"use client";
import ChatWindow from "@/components/ChatWindow";
import ThemeToggle from "@/components/ThemeToggle";
import TopicSelector from "@/components/TopicSelector";
import { useChatStore } from "@/stores/useChatStore";
import { MessageSquareText, SquarePen } from "lucide-react";

export default function Home() {
  const { selectedChatId, setSelectedChatId, chats } = useChatStore();

  return (
    <div className="h-dvh flex bg-primary/5 dark:bg-primary/10 p-4 relative">
      <aside className="w-64 bg-background dark:bg-white/5 flex flex-col rounded-2xl shadow-lg shadow-primary/5">
        <div className="p-6 border-b">
          <h1 className="font-bold text-lg mb-4 text-center">
            ExplainItLikeImFive 👶
          </h1>
          <button
            onClick={() => setSelectedChatId(null)}
            className="flex justify-center items-center gap-2 text-sm bg-primary text-background hover:opacity-80 p-2.5 rounded-full w-full transition-all"
          >
            <SquarePen size={16} /> New Chat
          </button>
        </div>
        <h4 className="font-semibold py-3 px-6 border-b uppercase tracking-wider text-xs text-foreground/50">
          Your Chats
        </h4>
        {chats?.length > 0 && (
          <div className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {chats.map((chat) => {
              return (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`flex items-center gap-2 font-medium hover:bg-primary/5 px-3 py-2 rounded-full w-full transition-all ${
                    selectedChatId === chat.id
                      ? "bg-primary/5 text-primary"
                      : ""
                  }`}
                >
                  <MessageSquareText size={16} className="shrink-0" />
                  <span className="truncate">{chat.topic}</span>
                </button>
              );
            })}
          </div>
        )}
      </aside>
      <main className="flex-1">
        {selectedChatId ? <ChatWindow /> : <TopicSelector />}
      </main>
      <div className="absolute right-6 top-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
