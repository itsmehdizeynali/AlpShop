import type { DashboardResponse } from "@/types/panel/usedashboardData";
import { create } from "zustand"

interface PanelState {
  panelData: DashboardResponse | null;
  chatUserData: {name:string,avatar:string|null,id:string} | null;
  updateData: (newPanelData: DashboardResponse) => void;
  updateChatUserData: (user:{name:string,avatar:string|null,id:string}) => void;
}

const usePanelStore = create<PanelState>((set) => ({
  panelData: null,
  chatUserData: null,
  updateData: (newPanelData) => set({ panelData: newPanelData }),
  updateChatUserData: (user) => set({ chatUserData: user }),
}))

export default usePanelStore;