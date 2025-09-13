import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;       // abre/fecha no mobile
  collapsed: boolean;    // colapsa no desktop
  toggle: () => void;
  close: () => void;
  toggleCollapse: () => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  collapsed: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  toggleCollapse: () => set((state) => ({ collapsed: !state.collapsed })),
}));
