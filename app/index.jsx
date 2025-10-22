import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/android-icon-background.png";
// const logo = require("../assets/images/logo.png");

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className={`bg-[#2b2b2b]`} >
      <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View>
          <Image source={logo} style={{width:300, height:300}} />
        </View>
      </ScrollView>      
    </SafeAreaView>
  );
}
