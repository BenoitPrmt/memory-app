import { useRef, useState } from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {CameraView, useCameraPermissions} from 'expo-camera';
import {ArrowRightIcon, CameraIcon, DoorOpenIcon, InfoIcon, LockIcon, SwitchCameraIcon} from "lucide-react-native";
import {HStack} from "@/components/ui/hstack";
import TinyImage from "@/components/image/TinyImage";
import {useRouter} from "expo-router";
import {useStore} from "@/store/store";
import {Alert, AlertIcon, AlertText} from "@/components/ui/alert";

const Camera = () => {
    const router = useRouter();
    const { addPhoto, photos, uriToPhoto, setMemoryGame, buildMemoryGame, memoryGame } = useStore();

    const [facing, setFacing] = useState<"front" | "back">('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const styles = StyleSheet.create({
        message: {
            textAlign: 'center',
            paddingBottom: 10,
        },
        camera: {
            flex: 1,
            minHeight: Dimensions.get('window').height / 1.5,
        },
        buttonContainer: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginBottom: 30,
        },
        text: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
        },
        photo: {
            width: 50,
            height: 50,
            borderRadius: 10,
        },
    });

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({
                base64: true
            });
            if (!photo) return;
            addPhoto(photo.uri);
        }
    };

    if (!permission) {
        return (
            <View>
                <Text>Pour activer la camera activer les permissions</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission}>
                    <ButtonIcon as={LockIcon} className="mr-1" />
                    <ButtonText>Accorder les permissions</ButtonText>
                </Button>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleStartGame = () => {
        buildMemoryGame();

        router.replace('/game');
    };

    return (
        <View className="flex-1">
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <HStack space="md">
                        <Button onPress={toggleCameraFacing}>
                            <ButtonIcon as={SwitchCameraIcon} className="mr-1" />
                            <ButtonText>Flip</ButtonText>
                        </Button>
                        <Button onPress={takePhoto} disabled={((memoryGame.size ** 2) / 2) === photos.length} action={((memoryGame.size ** 2) / 2) === photos.length ? 'secondary' : 'primary'}>
                            <ButtonIcon as={CameraIcon} className="mr-1" />
                            <ButtonText>
                                {((memoryGame.size ** 2) / 2) === photos.length ? `${photos.length} photos sur ${(memoryGame.size ** 2) / 2} max.` : 'Prendre une photo'}
                            </ButtonText>
                        </Button>
                    </HStack>
                </View>
            </CameraView>
            {!!photos.length && (
                <ScrollView className="p-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-3">
                        <HStack space="md" reversed>
                            {photos.map((photo, index) => (<TinyImage key={index} index={index} imageUri={photo} />)) }
                        </HStack>
                    </ScrollView>
                    <Button onPress={handleStartGame} disabled={photos.length < 2} action={photos.length < 2 ? 'secondary' : 'primary'}>
                        <ButtonIcon as={ArrowRightIcon} className="mr-1" />
                        <ButtonText>Commencer la partie avec {photos.length} photo{photos.length > 1 ? 's' : ''}</ButtonText>
                    </Button>
                    <Alert action="info" variant="solid" className="rounded-xl mt-2">
                        <AlertIcon as={InfoIcon} />
                        <AlertText>{(memoryGame.size ** 2) / 2} photos maximum pour ce mode de jeu</AlertText>
                    </Alert>
                </ScrollView>
            )}
        </View>
    );
}

export default Camera;