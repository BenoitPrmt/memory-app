import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalBody,
} from "@/components/ui/modal"
import React from "react"
import {Dimensions, Image, StyleSheet, TouchableOpacity} from "react-native";

type Props = {
    imageUri: string;
    index: number;
}

const TinyImage = ({imageUri, index}: Props) => {
    const [showModal, setShowModal] = React.useState(false)
    return (
        <>
            <TouchableOpacity onPress={() => setShowModal(true)}>
                <Image key={index} source={{uri: imageUri}} style={styles.photo}/>
            </TouchableOpacity>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                size="lg"
            >
                <ModalBackdrop/>
                <ModalContent>
                    <ModalBody>
                        <Image key={index} source={{uri: imageUri}} style={styles.photoBig}/>
                    </ModalBody>
                    {/*<ModalFooter className="w-full">*/}
                    {/*    <Button*/}
                    {/*        variant="outline"*/}
                    {/*        action="secondary"*/}
                    {/*        size="sm"*/}
                    {/*        onPress={() => {*/}
                    {/*            setShowModal(false)*/}
                    {/*        }}*/}
                    {/*        className="flex-grow"*/}
                    {/*    >*/}
                    {/*        <ButtonText>Annuler</ButtonText>*/}
                    {/*    </Button>*/}
                    {/*    <Button*/}
                    {/*        onPress={() => {*/}
                    {/*            setShowModal(false)*/}
                    {/*        }}*/}
                    {/*        size="sm"*/}
                    {/*        className="flex-grow"*/}
                    {/*        action="negative"*/}
                    {/*    >*/}
                    {/*        <ButtonText>Supprimer</ButtonText>*/}
                    {/*    </Button>*/}
                    {/*</ModalFooter>*/}
                </ModalContent>
            </Modal>
        </>
    )
};

export default TinyImage;

const styles = StyleSheet.create({
    photo: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    photoBig: {
        width: '100%',
        height: Dimensions.get('window').height / 2,
        borderRadius: 10,
    },
});