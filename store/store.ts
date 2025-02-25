import { create } from "zustand";
import { Audio } from "expo-av";
import uuid from 'react-native-uuid';
import * as Haptics from 'expo-haptics'
import {SOUND_FILES} from "@/constants/Sounds";
import {MemoryGame, Store} from "@/types/store";

export const useStore = create<Store>((set, get) => ({
    photos: [],
    addPhoto: (photo: string) => set((state) => ({ photos: [...state.photos, photo] })),
    removePhoto: (photo: string) => set((state) => ({ photos: state.photos.filter((p) => p != photo) })),
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
        victory: false
    },
    setMemoryGame: (memoryGame: MemoryGame) => set({ memoryGame }),
    buildMemoryGame: () => set((state) => {
        const randomSeed = Math.floor(Math.random() * 1000);
        const photos = state.photos.map(uri => state.uriToPhoto(uri));
        const photosUploaded = photos.length;
        const missing = ((state.memoryGame.size ** 2) - (photosUploaded * 2)) / 2;

        if (state.memoryGame.size ** 2 > photos.length) {
            for (let i = 0; i < missing; i++) {
                photos.push(state.uriToPhoto('https://picsum.photos/seed/' + (randomSeed + i) + '/200'));
            }
        } else if (state.memoryGame.size ** 2 < photos.length) {
            photos.splice(missing);
        }

        const cards = [...photos, ...photos].map((photo) => ({
            ...photo,
            id: uuid.v4(),
            flipped: false,
        }));

        return {
            memoryGame: {
                ...state.memoryGame,
                cards: cards.sort(() => Math.random() - 0.5),
            }
        };
    }),
    flipCard: (id: string) => set((state) => {
        const card = state.memoryGame.cards.find(c => c.id === id);

        if (!card || card.find || card.flipped || get().getFlippedCards().length >= 2) {
            return state;
        }

        get().playSound('paper');

        const newCards = state.memoryGame.cards.map(c =>
            c.id === id ? { ...c, flipped: true } : c
        );

        setTimeout(() => {
            const flippedCards = get().getFlippedCards();

            if (flippedCards.length === 2) {
                get().checkPair();
            }
        }, 10);

        return {
            memoryGame: {
                ...state.memoryGame,
                cards: newCards,
            }
        };
    }),
    getFlippedCards: () => get().memoryGame.cards.filter(card => card.flipped && !card.find),
    resetFlippedCards: () => set((state) => ({
        memoryGame: {
            ...state.memoryGame,
            cards: state.memoryGame.cards.map(card =>
                card.find ? card : { ...card, flipped: false }
            ),
        },
    })),
    checkPair: () => {
        const flippedCards = get().getFlippedCards();

        if (flippedCards.length === 2 && flippedCards[0].uri === flippedCards[1].uri) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            get().playSound('pair', 0.2);
            get().setFinded(flippedCards[0].id);
            get().setFinded(flippedCards[1].id);
            get().checkWin();
        } else {
            setTimeout(() => {
                get().resetFlippedCards();
            }, 1000);
        }
    },
    resetGame: () => set((state) => {
        state.memoryGame = {
            cards: [],
            size: 4,
            victory: false
        };
        return state;
    }),
    resetGameBoard: () => set((state) => {
        state.memoryGame = {
            ...state.memoryGame,
            cards: state.memoryGame.cards.map(card =>
                ({ ...card, find: false, flipped: false })
            ),
            victory: false
        };
        return state;
    }),
    setFinded: (id: string) => set((state) => ({
        memoryGame: {
            ...state.memoryGame,
            cards: state.memoryGame.cards.map(card =>
                card.id === id ? { ...card, find: true, flipped: true } : card
            ),
        },
    })),
    setGameSize: (size: number) => set((state) => {
        state.memoryGame.size = size;
        return state;
    }),
    checkWin: () => set((state) => {
        const findedCards = get().memoryGame.cards.filter(card => card.find);
        return {
            memoryGame: {
                ...state.memoryGame,
                victory: findedCards.length === get().memoryGame.cards.length
            }
        };
    }),


    sounds: {},
    preloadSounds: async () => {
        const loadedSounds: { [key: string]: Audio.Sound } = {};
        for (const key in SOUND_FILES) {
            const { sound } = await Audio.Sound.createAsync(SOUND_FILES[key as keyof typeof SOUND_FILES], { shouldPlay: false });
            loadedSounds[key] = sound;
        }
        set({ sounds: loadedSounds });
    },
    playSound: async (key :string, volume?: number) => {
        const sound = get().sounds[key];
        if (sound) {
            if (volume) await sound.setVolumeAsync(volume);
            await sound.replayAsync();
        }
    },
}));