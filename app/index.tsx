import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import {Heading} from "@/components/ui/heading";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {Link} from "@/components/ui/link";
import {PlayIcon} from "lucide-react-native";
import {useRouter} from "expo-router";
import {HStack} from "@/components/ui/hstack";
import {useState} from "react";
import {useStore} from "@/store/store";

export default function TabOneScreen() {
  const router = useRouter();
  const { setGameSize } = useStore();
  const [gamemode, setGamemode] = useState<number>(2);

  const handleStartGame = () => {
    setGameSize(gamemode);
    router.replace('/camera');
  }

  return (
    <View style={styles.container}>
      <Heading size="2xl">PixelMem</Heading>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <HStack space="md" className="mb-3">

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


      <Link href={'/camera'}>
        <Button onPress={handleStartGame}>
          <ButtonIcon as={PlayIcon} className="mr-1" />
          <ButtonText>Lancer une partie</ButtonText>
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
