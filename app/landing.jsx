import { StatusBar, Text, TouchableOpacity, View, ImageBackground, useRouter, SafeAreaView, LinearGradient, landing } from "../constants/Imports";

export default function Landing() {
    const router = useRouter()

    return (
        <SafeAreaView className="flex-1 bg-black">
            <LinearGradient
                colors={['#000000', '#000000']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 2.5 }}
                style={{ flex: 1 }} >
                <View className="flex-1 justify-center items-center">

                    <ImageBackground
                        source={landing}
                        style={{ width: 400, height: 150, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
                        imageStyle={{ borderRadius: 10, opacity: 0.3 }} >

                        <Text className="text-7xl font-bold text-black" style={{
                            position: 'absolute', zIndex: 0, textShadowColor: '#black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10
                        }} >
                            VISTAARA
                        </Text>
                        <Text className="text-7xl font-bold text-[#1ED760]" style={{ zIndex: 1 }} > VISTAARA </Text>
                    </ImageBackground>

                    <View className="mb-12">
                        <Text className="text-5xl font-bold text-white mt-20">VISTAARA</Text>
                        <Text className="text-3xl font-semibold text-white mt-5 opacity-30">Reserve Moments</Text>
                        <Text className="text-3xl font-semibold text-white opacity-30">Not Just Tables</Text>
                    </View>
                </View>

                <View className="pb-12 px-4 items-center">
                    <TouchableOpacity onPress={() => router.push("/signup")} className="w-4/5 bg-[#1ED760] rounded-full py-5">
                        <Text className="text-xl font-bold text-black text-center">Get Started</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        </SafeAreaView>
    )
}