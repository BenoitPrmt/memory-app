import {StyleSheet} from 'react-native';

import {View} from '@/components/Themed';
import {Heading} from "@/components/ui/heading";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {DoorOpenIcon} from "lucide-react-native";
import {useRouter} from "expo-router";
import {useStore} from "@/store/store";
import GameGrid from "@/components/grid/GameGrid";

export default function TabOneScreen() {
    const router = useRouter();
    const {memoryGame} = useStore();

    if (!memoryGame || memoryGame.cards.length === 0) {
        router.replace('/');
    }

    return (
        <View style={styles.container}>
            <View>
                <Heading size={"2xl"}>PixelMem</Heading>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            </View>

            <GameGrid/>

            <Button onPress={() => router.replace('/')} className={'mt-4'}>
                <ButtonIcon as={DoorOpenIcon}/>
                <ButtonText>Retour</ButtonText>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
