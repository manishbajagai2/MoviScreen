import { create } from "zustand"

const useModalState = create((set) => ({
    isShowing: false,
    show: () => set({ isShowing: true }),
    hide: () => set({ isShowing: false }),
}))

export default useModalState
