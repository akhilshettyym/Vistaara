import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/logo.png";
import path from "../assets/images/path.png"
// const logo = require("../assets/images/logo.png");

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className={"bg-[#2b2b2b] flex-1"} >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 300, height: 300 }} />

          {/* SignIn / Guest User */}
          <View className="w-3/4">
            <TouchableOpacity onPress={() => router.push("/signup")} className="p-2 my-2 bg-[#f49b33] text-black rounded-lg">
              <Text className="text-xl font-semibold text-center"> Sign Up </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/hom")} className="p-2 my-2 bg-[#2b2b2b] border border-[#f49b33] rounded-lg">
              <Text className="text-xl font-semibold text-[#f49b33] text-center"> Guest User </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-center text-base font-semibold my-4 text-white">
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" /> or{" "}
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
            </Text>

            <TouchableOpacity className="flex flex-row justify-center items-center" onPress={() => router.push("/singin")}>
              <Text className="text-white font-semibold">Already a User ? {" "}</Text>
              <Text className="text-base font-semibold underline text-[#f49b33]">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
          
          <View>
            <Text>Test test test</Text>
          </View>

        <View className="flex-l">
          <Image source={""} className="w-full h-full" resizeMode="contain" />
        </View>

        <View className="flex-l">
          <Image source={path} className="w-full h-full" resizeMode="contain" />
        </View>

        <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
      </ScrollView>
    </SafeAreaView>
  );
}