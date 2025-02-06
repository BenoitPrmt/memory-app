import {ScrollView, StyleSheet} from 'react-native';

import { View } from '@/components/Themed';
import {Heading} from "@/components/ui/heading";
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {Link} from "@/components/ui/link";
import {CrossIcon, DoorOpenIcon, PlayIcon} from "lucide-react-native";
import {useNavigation, useRouter} from "expo-router";
import {useEffect} from "react";
import {useStore} from "@/store/store";
import {HStack} from "@/components/ui/hstack";
import TinyImage from "@/components/image/TinyImage";

export default function TabOneScreen() {
  const router = useRouter();
  const { photos } = useStore();

  return (
    <View style={styles.container}>
      <Heading>Game</Heading>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-3">
        <HStack space="md" reversed>
          {photos.map((photo, index) => (<TinyImage key={index} index={index} imageUri={photo} />)) }
        </HStack>
      </ScrollView>

      <Button onPress={() => router.replace('/')}>
        <ButtonIcon as={DoorOpenIcon} />
      </Button>
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
