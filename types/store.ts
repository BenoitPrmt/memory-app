export type FlipCard = {
    id: string;
    uri: string;
    flipped: boolean;
    find?: boolean;
};

export type MemoryGame = {
    cards: FlipCard[];
    size: number;
    victory: boolean;
}

export type Store = {
    photos: string[];
    addPhoto: (photo: string) => void;
    removePhoto: (photo: string) => void;
    uriToPhoto: (uri: string) => FlipCard;
    memoryGame: MemoryGame;
    setMemoryGame: (memoryGame: MemoryGame) => void;
    buildMemoryGame: () => void;
    setGameSize: (size: number) => void;
    flipCard: (id: string) => void;
    getFlippedCards: () => FlipCard[];
    resetFlippedCards: () => void;
    checkPair: () => void;
    resetGame: () => void;
    resetGameBoard: () => void;
    setFinded: (id: string) => void;
    checkWin: () => void;

    sounds: any;
    preloadSounds: () => void;
    playSound: (key: string, volume?: number) => void;
};