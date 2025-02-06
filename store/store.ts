import { create } from "zustand";
import uuid from 'react-native-uuid';

export type Photo = {
    id: string;
    uri: string;
    flipped: boolean;
    find?: boolean;
};

export type MemoryGame = {
    cards: Photo[];
    size: number;
}

export type Store = {
    photos: string[];
    addPhoto: (photo: string) => void;
    uriToPhoto: (uri: string) => Photo;
    memoryGame: MemoryGame;
    setMemoryGame: (memoryGame: MemoryGame) => void;
    buildMemoryGame: () => void;
    setGameSize: (size: number) => void;
    flipCard: (id: string) => void;
    getFlippedCards: () => Photo[];
    resetFlippedCards: () => void;
    checkPair: () => void;
    resetGame: () => void;
    setFinded: (id: string) => void;
    checkWin: () => void;
};

// TODO: Double cards to create pairs, Shuffle cards, Create a game loop

export const useStore = create<Store>((set, get) => ({
    photos: [],
    addPhoto: (photo: string) => set((state) => ({ photos: [...state.photos, photo] })),
    uriToPhoto: (uri: string) => {
        const id = uuid.v4();
        return {
            id: id!,
            uri,
            flipped: false,
        };
    },
    memoryGame: {
        cards: [],
        size: 4,
    },
    setMemoryGame: (memoryGame: MemoryGame) => set({ memoryGame }),
    buildMemoryGame: () => set((state) => {
        const photos = state.photos.map(uri => state.uriToPhoto(uri));
        const cards = [...photos, ...photos].map((photo) => ({
            ...photo,
            id: uuid.v4(),
        }));
        state.memoryGame.cards = cards.sort(() => Math.random() - 0.5);
        return state;
    }),
    flipCard: (id: string) => set((state) => {
        const index = state.memoryGame.cards.findIndex(card => card.id === id);
        const card = state.memoryGame.cards[index];
        state.memoryGame.cards[index] = {
            ...card,
            flipped: !card.flipped,
        };
        return state;
    }),
    getFlippedCards: () => get().memoryGame.cards.filter(card => card.flipped),
    resetFlippedCards: () => set((state) => {
        state.memoryGame.cards = state.memoryGame.cards.map(card => ({
            ...card,
            flipped: false,
        }));
        return state;
    }),
    checkPair: () => {
        const flippedCards = get().getFlippedCards();
        if (flippedCards.length === 2) {
            if (flippedCards[0].uri === flippedCards[1].uri) {
                get().setFinded(flippedCards[0].id);
                get().setFinded(flippedCards[1].id);
            }
        }
    },
    resetGame: () => set((state) => {
        state.memoryGame.cards = [];
        return state;
    }),
    setFinded: (id: string) => set((state) => {
        const index = state.memoryGame.cards.findIndex(card => card.id === id);
        state.memoryGame.cards[index] = {
            ...state.memoryGame.cards[index],
            find: true,
        };
        return state;
    }),
    setGameSize: (size: number) => set((state) => {
        state.memoryGame.size = size;
        return state;
    }),
    checkWin: () => {
        const findedCards = get().memoryGame.cards.filter(card => card.find);
        if (findedCards.length === get().memoryGame.cards.length) {
            alert('You win');
        }
    }
}));