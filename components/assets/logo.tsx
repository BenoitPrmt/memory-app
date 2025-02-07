import React from 'react';
import {HStack} from "@/components/ui/hstack";
import {Heading} from "@/components/ui/heading";
import {Image} from "react-native";

const Logo = () => {
    return (
        <HStack space="sm" className="items-center pt-5">
            <Heading size="2xl" className="font-chillax">PixelMem</Heading>
            <Image source={require('../../assets/images/icon.png')} alt="Logo" className="w-10 h-10" />
        </HStack>
    );
};

export default Logo;