import React, {useEffect} from "react";
import { Pressable } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate
} from "react-native-reanimated";
import { Box } from "@/components/ui/box";
import { useStore } from "@/store/store";
import {FlipCard as FlipCardType} from "@/types/store";
import {LinearGradient} from "expo-linear-gradient";
import {Image} from "@/components/ui/image";

type Props = {
    image: FlipCardType;
};

const FlipCard = ({ image }: Props) => {
    const { flipCard, memoryGame } = useStore();
    // const { cardSize } = useGameParam();
    let cardStyle = 'relative w-12 h-12';
    switch (memoryGame.size) {
        case 2:
            cardStyle = 'relative w-32 h-32';
            break;
        case 4:
            cardStyle = 'relative w-20 h-20';
            break;
        case 6:
            cardStyle = 'relative w-12 h-12';
            break;
    }

    const rotate = useSharedValue(0);

    const isFlipped = memoryGame.cards.find(card => card.id === image.id)?.flipped || false;

    useEffect(() => {
        rotate.value = withTiming(isFlipped ? 180 : 0, { duration: 500 });
    }, [isFlipped]);

    const handleFlip = () => {
        flipCard(image.id);
    };

    const animatedFrontStyle = useAnimatedStyle(() => ({
        transform: [{ rotateY: `${interpolate(rotate.value, [0, 180], [0, 180])}deg` }],
        opacity: interpolate(rotate.value, [0, 90, 180], [1, 0, 1]),
    }));

    const animatedBackStyle = useAnimatedStyle(() => ({
        transform: [{ rotateY: `${interpolate(rotate.value, [0, 180], [180, 360])}deg` }],
        opacity: interpolate(rotate.value, [0, 90, 180], [1, 0, 1]),
    }));

    return (
        <Pressable onPress={handleFlip}>
            <Box className={cardStyle}>
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "gray",
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            backfaceVisibility: "hidden",
                        },
                        animatedFrontStyle,
                    ]}
                >
                    <LinearGradient
                        colors={['#dd4566', '#f97497', '#ff92be', '#ffb3d8']}
                        start={[0, 0]}
                        end={[1, 1]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: '100%',
                            borderRadius: 10
                        }}
                    />
                </Animated.View>
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            backfaceVisibility: "hidden",
                        },
                        animatedBackStyle,
                    ]}
                >
                    <Image
                        source={{ uri: image.uri }}
                        className="w-full h-full rounded-lg"
                    />
                </Animated.View>
            </Box>
        </Pressable>
    );
};

export default FlipCard;