import React from 'react';
import {Photo, useStore} from "@/store/store";
import {View} from "react-native";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import FlipCard from "@/components/cell/FlipCard";

const GameGrid = () => {
    const { memoryGame } = useStore();

    const lines: Photo[][] = [];
    for (let i = 0; i < memoryGame.size; i++) {
        const line: Photo[] = [];
        for (let j = 0; j < memoryGame.size; j++) {
            line.push(memoryGame.cards[i * memoryGame.size + j]);
        }
        lines.push(line);
    }

    return (
        <View>
            <VStack space="md">
                {lines.map((line: Photo[], index) => (
                    <HStack key={index} space="md">
                        {line.map((cell: Photo) => (
                            <FlipCard image={cell} key={cell.id} />
                        ))}
                    </HStack>
                ))}
            </VStack>
        </View>
    );
};

export default GameGrid;