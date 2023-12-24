import { create } from 'zustand';

interface cartHookProps {
    isOpen: boolean;
    isReload: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}

const useCartHook = create<cartHookProps>((set) => ({
    isOpen: false,
    isReload: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onToggle: () => set((state) => ({ isReload: !state.isReload })),
}));

export default useCartHook;
