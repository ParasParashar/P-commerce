import { create } from 'zustand';

interface cartHookProps {
    isOpen: boolean;
    onOpen: () => void; 
    onClose: () => void; 
    onToggle: () => void; 
}

const useCartHook = create<cartHookProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }), 
    onClose: () => set({ isOpen: false }), 
    onToggle: () => set((state)=>({ isOpen: !state.isOpen })), 
}));

export default useCartHook;
