import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import {Heading} from "@/components/ui/heading";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {Link} from "@/components/ui/link";
import {PlayIcon} from "lucide-react-native";
import {useRouter} from "expo-router";

export default function TabOneScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Heading>abc</Heading>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href={'/camera'}>
        <Button onPress={() => router.push('/camera')}>
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
