import { View, Text, Image, Platform, ScrollView, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

const home = () => {
  return (
    <SafeAreaView style={{backgroundColor: "#2b2b2b flex-1"}}>
      <View className="flex items-center pt-5">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center flex-row p-2" >
          <View className="flex flex-row">
            <Text className={`text-base h-10 p-2 pt-[${ Platform.OS=="ios" ? 8 : 6.5}] align-middle text-white`}> Welcome to VISTAARA</Text>
          </View>
        </View>
      </View>

      <ScrollView>

      </ScrollView>
        <ImageBackground resizeMode='cover' className="my-4 w-full h-52 items-center justify-center">
          <BlurView intensity={100} tint="dark" >
            <Text style={StyleSheet.text}>Dine with your loved ones</Text>
          </BlurView>
        </ImageBackground>
    </SafeAreaView>
  )
}

export default home;