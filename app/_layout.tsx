import FontAwesome from '@expo/vector-icons/FontAwesome';
import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/components/useColorScheme';
import {useStore} from "@/store/store";

export {
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        Chillax: require('../assets/fonts/Chillax-Variable.ttf'),
        ...FontAwesome.font,
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <GluestackUIProvider mode="light"><RootLayoutNav/></GluestackUIProvider>;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    const { preloadSounds } = useStore();

    useEffect(() => {
        preloadSounds();
    }, []);

    return (
        <GluestackUIProvider mode="light">
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="index" options={{headerShown: false}}/>
                    <Stack.Screen name="camera" options={{headerShown: false}}/>
                    <Stack.Screen name="game" options={{headerShown: false}}/>
                    <Stack.Screen name="modal" options={{presentation: 'modal'}}/>
                </Stack>
            </ThemeProvider>
        </GluestackUIProvider>
    );
}
