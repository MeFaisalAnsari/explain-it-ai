import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create(
  persist(
    (set, get) => ({
      chats: [],
      selectedChatId: null,

      selectedChat: () => {
        const { chats, selectedChatId } = get();
        return chats.find((chat) => chat.id === selectedChatId) || null;
      },

      setChats: (newChats) => set({ chats: newChats }),

      addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),

      updateChatMessages: (chatId, messages) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, messages } : chat
          ),
        })),

      setSelectedChatId: (id) => set({ selectedChatId: id }),

      deleteChat: (chatId) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          selectedChatId:
            state.selectedChatId === chatId ? null : state.selectedChatId,
        })),
    }),
    {
      name: "chat-store",
      partialize: (state) => ({
        chats: state.chats,
        selectedChatId: state.selectedChatId,
      }),
    }
  )
);
