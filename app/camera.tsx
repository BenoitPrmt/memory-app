import { useRef, useState } from 'react';
import {Text, View, StyleSheet, Image, ScrollView, Dimensions} from 'react-native';
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {CameraView, useCameraPermissions} from 'expo-camera';
import {CameraIcon, LockIcon, SwitchCameraIcon} from "lucide-react-native";
import {HStack} from "@/components/ui/hstack";
import {Heading} from "@/components/ui/heading";
import TinyImage from "@/components/image/TinyImage";

const Camera = () => {
    const [facing, setFacing] = useState<"front" | "back">('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photos, setPhotos] = useState<string[]>([]);
    const cameraRef = useRef<CameraView>(null);
    const styles = StyleSheet.create({
        message: {
            textAlign: 'center',
            paddingBottom: 10,
        },
        camera: {
            flex: 1,
            borderWidth: 4,
            borderColor: 'yellow',
            minHeight: Dimensions.get('window').height / 1.5,
        },
        buttonContainer: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginBottom: 50,
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
            setPhotos([...photos, photo.uri]);

            console.log(photos);
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

    return (
        <View className="flex-1 bg-transparent">
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <HStack space="md">
                        <Button onPress={toggleCameraFacing}>
                            <ButtonIcon as={SwitchCameraIcon} className="mr-1" />
                            <ButtonText>Flip</ButtonText>
                        </Button>
                        <Button onPress={takePhoto}>
                            <ButtonIcon as={CameraIcon} className="mr-1" />
                            <ButtonText>Prendre une photo</ButtonText>
                        </Button>
                    </HStack>
                </View>
            </CameraView>
            {!!photos.length && (
                <ScrollView className="pt-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-3">
                        <HStack space="md">
                            {photos.map((photo, index) => (<TinyImage key={index} index={index} imageUri={photo} />)) }
                        </HStack>
                    </ScrollView>
                </ScrollView>
            )}
        </View>
    );
}

export default Camera;