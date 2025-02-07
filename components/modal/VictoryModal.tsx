import React from 'react';
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@/components/ui/modal";
import {Heading} from "@/components/ui/heading";
import {CloseIcon, Icon} from "@/components/ui/icon";
import {Text} from "@/components/ui/text";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {HomeIcon, RefreshCcwIcon} from "lucide-react-native";

type Props = {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    handleQuit: () => void;
    handleRestartGame: () => void;
}

const VictoryModal = ({ showModal, setShowModal, handleQuit, handleRestartGame }: Props) => {
    return (
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
                    <Heading size="xl" className="text-typography-950">
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
    );
};

export default VictoryModal;