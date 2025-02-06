import { create } from "zustand";

export type Photo = {};

export type Store = {
    photos: string[];
    addPhoto: (photo: string) => void;
};

export const useStore = create<Store>((set, get) => ({
    photos: [],
    addPhoto: (photo: string) => set((state) => ({ photos: [...state.photos, photo] })),
}));