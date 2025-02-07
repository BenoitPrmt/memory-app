import React, {useEffect, useState} from 'react';
import {useStore} from "@/store/store";
import {View} from "react-native";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {useRouter} from "expo-router";
import VictoryModal from "@/components/modal/VictoryModal";
import {FlipCard as FlipCardType} from "@/types/store";
import FlipCard from "@/components/card/FlipCard";

const GameGrid = () => {
    const router = useRouter();
    const { memoryGame, resetGame, resetGameBoard, playSound, photos, removePhoto } = useStore();
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        setShowModal(memoryGame.victory);
        if (memoryGame.victory) {
            playSound('victory');
        }
    }, [memoryGame.victory]);

    let gridGap: 'sm' | 'md' | 'lg' = 'md';
    switch (memoryGame.size) {
        case 2:
            gridGap = 'lg';
            break;
        case 4:
            gridGap = 'md';
            break;
        case 8:
            gridGap = 'sm';
            break;
    }

    const lines: FlipCardType[][] = [];
    for (let i = 0; i < memoryGame.size; i++) {
        const line: FlipCardType[] = [];
        for (let j = 0; j < memoryGame.size; j++) {
            line.push(memoryGame.cards[i * memoryGame.size + j]);
        }
        lines.push(line);
    }

    const handleRestartGame = () => {
        resetGameBoard();
        setShowModal(false);
        router.replace('/camera');
    }

    const handleQuit = () => {
        resetGame();
        setShowModal(false);
        photos.map(removePhoto)
        router.replace('/');
    }

    return (
        <View>
            <VStack space={gridGap}>
                {lines.map((line: FlipCardType[], index) => (
                    <HStack key={index} space={gridGap}>
                        {line.map((cell: FlipCardType) => (
                            <FlipCard image={cell} key={cell.id} />
                        ))}
                    </HStack>
                ))}
            </VStack>

            <VictoryModal showModal={showModal} setShowModal={setShowModal} handleQuit={handleQuit} handleRestartGame={handleRestartGame} />
        </View>
    );
};

export default GameGrid;