import {SafeAreaView, StyleSheet} from 'react-native';

import {View} from '@/components/Themed';
import {Heading} from "@/components/ui/heading";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {PlayIcon} from "lucide-react-native";
import {Link, useRouter} from "expo-router";
import {HStack} from "@/components/ui/hstack";
import {useState} from "react";
import {useStore} from "@/store/store";
import Logo from "@/components/assets/logo";

export default function TabOneScreen() {
    const router = useRouter();
    const {setGameSize} = useStore();
    const [gamemode, setGamemode] = useState<number>(2);

    const handleStartGame = () => {
        setGameSize(gamemode);
        router.replace('/camera');
    }

    return (
        <SafeAreaView className="bg-white flex-1 justify-between">
            <View className="pt-5 items-center">
                <Logo/>
            </View>
            <View style={styles.container}>
                <View className="items-center">
                    <HStack space="md" className="mb-5">

                        <Button onPress={() => setGamemode(2)} variant={gamemode === 2 ? 'solid' : 'outline'}>
                            <ButtonText>2x2</ButtonText>
                        </Button>

                        <Button onPress={() => setGamemode(4)} variant={gamemode === 4 ? 'solid' : 'outline'}>
                            <ButtonText>4x4</ButtonText>
                        </Button>

                        <Button onPress={() => setGamemode(6)} variant={gamemode === 6 ? 'solid' : 'outline'}>
                            <ButtonText>6x6</ButtonText>
                        </Button>
                    </HStack>

                    <Link href={'/camera'} className="h-[100px]">
                        <Button onPress={handleStartGame}>
                            <ButtonIcon as={PlayIcon} className="mr-1"/>
                            <ButtonText>Lancer une partie</ButtonText>
                        </Button>
                    </Link>
                </View>
            </View>
            <View className="pt-5 pb-3 items-center">
                <Link href={'/modal'} className="text-typography-500">
                    <Heading size="sm">À propos</Heading>
                </Link>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});
