import { create } from "zustand"


interface Message {
  id:string,
  content:string
}
interface ChatState {
  editingMesssageData: Message | null;
  updateEditingMesssageData: (message: Message) => void;
  clearEditingMesssageData: () => void;
}

const useChatStore = create<ChatState>((set) => ({
  editingMesssageData: null,
  updateEditingMesssageData: (message) => set({ editingMesssageData: message }),
  clearEditingMesssageData: () => set({ editingMesssageData: null }),
}))

export default useChatStore;