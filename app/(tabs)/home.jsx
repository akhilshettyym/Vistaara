import { Image, View, Text, Platform, ScrollView, ImageBackground, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import landing from '../../assets/images/landing.jpeg'; // Change required
import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useRouter } from 'expo-router';

// import { restaurants } from '../../store/restaurants';
// import uploadData from '../../config/bulkUpload';

const Home = () => {
  // useEffect(()=> {
  //   uploadData();
  // }, []);

  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);
    res.forEach((item) => {
      setRestaurants((prev) => [...prev, item.data()])
    })
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  const name = <Text className=" font-bold text-[#1ED760]">VISTAARA</Text>;

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>router.push(`/restaurant/${item.name}`)} className="bg-[#5f5f5f] max-h-68 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow-md">
      <Image resizeMode="cover" source={{ uri: item.image || 'https://via.placeholder.com/150' }} className="h-28 w-70 rounded-lg" />
      <Text className="text-white text-lg font-bold mb-2 mt-2">{item.name}</Text>
      <Text className="text-white text-base font-base mb-2">{item.address}</Text>
      <Text className="text-white text-base font-base mb-2">Open: {item.opening} - Close: {item.closing}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{ backgroundColor: '#000000', flex: 1, paddingBottom: 30 }} >
      <ImageBackground
        resizeMode="cover"
        className="mb-4 w-full h-50 bg-black items-center justify-center p-7"
        source={landing}
        style={{ width: '100%', height: 150 }} >
        <BlurView intensity={Platform.OS === 'android' ? 100 : 25} tint="dark" className="w-full p-2 shadow-lg" >
          <View className="flex items-center p-6 rounded-lg">
            <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center flex flex-row p-2">
              <Text className="text-xl h-10 p-2 text-white">Welcome to {name}</Text>
            </View>
          </View>
        </BlurView>
      </ImageBackground>

      <ScrollView stickyHeaderIndices={[0]}>
        {/* <ImageBackground
          resizeMode="cover"
          className="mb-4 w-full h-52 bg-black items-center justify-center"
          source={banner}
          style={{ width: '100%', height: 240 }} >
          <BlurView intensity={Platform.OS === 'android' ? 100 : 25} tint="dark" className="w-full p-2 shadow-lg" >
            <Text className="text-center text-3xl font-bold text-white">
              Dine with your loved ones
            </Text>
          </BlurView>
        </ImageBackground> */}

        <View className="p-4 bg-black flex-row items-center">
          <Text className="text-2xl text-white mr-2 font-semibold">Special Discount %</Text>
        </View>
        {restaurants && restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            horizontal
            contentContainerStyle={{ paddingHorizontal: 16 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator animating color="#1ED760" />
        )}

        <View className="p-4 bg-black flex-row items-center">
          <Text className="text-2xl text-[#1ED760] mr-2 font-semibold">Our Restaurants</Text>
        </View>

        {restaurants && restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            horizontal
            contentContainerStyle={{ paddingHorizontal: 16 }}
            showsHorizontalScrollIndicator={false} />
        ) : (
          <ActivityIndicator animating color="#1ED760" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;