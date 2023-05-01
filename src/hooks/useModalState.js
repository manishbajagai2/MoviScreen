import { create } from "zustand"

const useModalState = create((set) => ({
    showModal: false,
    show: () => set({ showModal: true }),
    hide: () => set({ showModal: false }),
}))

export default useModalState
