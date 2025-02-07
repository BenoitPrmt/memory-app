import React, {useEffect, useState} from 'react';
import {Photo, useStore} from "@/store/store";
import {View} from "react-native";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import FlipCard from "@/components/cell/FlipCard";
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@/components/ui/modal";
import {HomeIcon, RefreshCcwIcon} from "lucide-react-native";
import {CloseIcon, Icon} from "@/components/ui/icon";
import {Text} from "@/components/ui/text";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {Heading} from "@/components/ui/heading";
import {useRouter} from "expo-router";

const GameGrid = () => {
    const router = useRouter();
    const { memoryGame, resetGame, resetGameBoard, playSound } = useStore();
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        setShowModal(memoryGame.victory);
        if (memoryGame.victory) {
            playSound('victory');
        }
    }, [memoryGame.victory]);

    // const { gridGap } = useGameParam();

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

    const lines: Photo[][] = [];
    for (let i = 0; i < memoryGame.size; i++) {
        const line: Photo[] = [];
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
        router.replace('/');
    }

    return (
        <View>
            <VStack space={gridGap}>
                {lines.map((line: Photo[], index) => (
                    <HStack key={index} space={gridGap}>
                        {line.map((cell: Photo) => (
                            <FlipCard image={cell} key={cell.id} />
                        ))}
                    </HStack>
                ))}
            </VStack>

            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                size="md"
            >
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="md" className="text-typography-950">
                            Victoire !
                        </Heading>
                        <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                            />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Text size="sm" className="text-typography-500">
                            Vous avez gagné !
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={handleQuit}
                        >
                            <ButtonIcon as={HomeIcon} />
                            <ButtonText>Quitter</ButtonText>
                        </Button>
                        <Button
                            onPress={handleRestartGame}
                        >
                            <ButtonIcon as={RefreshCcwIcon} />
                            <ButtonText>Rejouer</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </View>
    );
};

export default GameGrid;