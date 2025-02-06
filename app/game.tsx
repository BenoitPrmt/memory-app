import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import {Heading} from "@/components/ui/heading";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {Link} from "@/components/ui/link";
import {CrossIcon, DoorOpenIcon, PlayIcon} from "lucide-react-native";
import {useNavigation, useRouter} from "expo-router";
import {useEffect} from "react";

export default function TabOneScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Heading>Game</Heading>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href={'/camera'}>
        <Button onPress={() => router.push('/camera')}>
          <ButtonIcon as={DoorOpenIcon} />
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
