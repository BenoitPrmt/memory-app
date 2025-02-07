import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Heading } from '@/components/ui/heading';
import {VStack} from "@/components/ui/vstack";
import { Link } from 'expo-router';
import { HStack } from '@/components/ui/hstack';
import {Icon} from "@/components/ui/icon";
import {GithubIcon, GlobeIcon, HouseIcon, LinkedinIcon, ParkingCircleIcon} from "lucide-react-native";

export default function ModalScreen() {
  return (
    <View className="font-chillax p-5 flex-1">
      <Heading size={"2xl"} className="py-2 font-chillax">⚡️À propos</Heading>
      <Heading size={"xl"} className="p-2 font-chillax">✨ L'application</Heading>
      <Text className="p-2">
        Ce projet est une application mobile météo. Je l'ai réalisée dans le cadre d'un cours de développement mobile à Coda. Elle a été développée avec React Native et Expo.
      </Text>
      <Heading size={"xl"} className="p-2 font-chillax">👨‍💻 Le développeur</Heading>
      <Text className="p-2">
        Je m'appelle <Text className="font-bold">Benoît Parmentier</Text>. Je suis un développeur passionné par la création d'applications mobiles et de sites web.
      </Text>
      <Heading size={"xl"} className="p-2 font-chillax">☎️ Me contacter</Heading>
      <VStack space={"md"} className="p-2">
        <Link href={"mailto:hello@benoit.fun"} className="p-2">
          <Text>
            Vous pouvez me contacter par email à <Text className="font-bold text-blue-700">hello@benoit.fun</Text>
          </Text>
        </Link>
        <Link href={"https://benoit.fun"} className="p-2">
          <HStack space={"sm"} className={"items-center"}>
            <Icon size={"md"} as={GlobeIcon} className="text-blue-700" />
            <Text className="font-bold text-blue-700">
              benoit.fun
            </Text>
          </HStack>
        </Link>

        <Link href={"https://www.linkedin.com/in/benoit-parmentier/"} className="p-2">
          <HStack space={"sm"} className={"items-center"}>
            <Icon size={"md"} as={LinkedinIcon} className="text-linkedin" />
            <Text className="font-bold text-linkedin">
              LinkedIn
            </Text>
          </HStack>
        </Link>

        <Link href={"https://github.com/BenoitPrmt"} className="p-2">
          <HStack space={"sm"} className={"items-center"}>
            <Icon size={"md"} as={GithubIcon} className="text-github" />
            <Text className="font-bold text-github">
              GitHub
            </Text>
          </HStack>
        </Link>
      </VStack>

      <Heading size={"xl"} className="p-2 font-chillax">📚 Autres projets</Heading>
      <VStack space={"md"} className="p-2">
        <Link href={"https://viteuneplace.fr"}>
          <HStack space={"sm"} className={"items-center"}>
            <Icon size={"md"} as={ParkingCircleIcon} className="text-viteuneplace" />
            <Text className="font-bold text-viteuneplace">
              viteuneplace.fr - Parkings à Orléans
            </Text>
          </HStack>
        </Link>

        <Link href={"https://colocplus.com"}>
          <HStack space={"sm"} className={"items-center"}>
            <Icon size={"md"} as={HouseIcon} className="text-colocplus" />
            <Text className="font-bold text-colocplus">
              Coloc+ - Gérez votre coloc' facilement
            </Text>
          </HStack>
        </Link>
      </VStack>
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
