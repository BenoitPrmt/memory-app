import React, { useState } from "react";
import {Image, Pressable} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate
} from "react-native-reanimated";
import {Box} from "@/components/ui/box";
import {Photo, useStore} from "@/store/store";

type Props = {
    image: Photo;
}

const FlipCard = ({ image }: Props) => {
    const { flipCard } = useStore();
    const rotate = useSharedValue(0);
    const [isFlipped, setIsFlipped] = useState<boolean>(image.flipped);

    const handleFlip = () => {
        if (isFlipped) {
            rotate.value = withTiming(0, { duration: 500 });
        } else {
            rotate.value = withTiming(180, { duration: 500 });
        }
        setIsFlipped(!isFlipped);
        flipCard(image.id);
    };

    const animatedFrontStyle = useAnimatedStyle(() => ({
        transform: [
            { rotateY: `${interpolate(rotate.value, [0, 180], [0, 180])}deg` },
        ],
        opacity: interpolate(rotate.value, [0, 90, 180], [1, 0, 1]),
    }));

    const animatedBackStyle = useAnimatedStyle(() => ({
        transform: [
            { rotateY: `${interpolate(rotate.value, [0, 180], [180, 360])}deg` },
        ],
        opacity: interpolate(rotate.value, [0, 90, 180], [1, 0, 1]),
    }));

    // TODO: Ajouter un bruit de papier qui se retourne

    return (
        <Pressable onPress={handleFlip}>
            <Box className={"relative w-32 h-32"}>
                {/* Dos de la carte */}
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
                />

                {/* Face de la carte */}
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
                        className={"w-full h-full rounded-lg"}
                    />
                </Animated.View>
            </Box>
        </Pressable>
    );
};

export default FlipCard;
