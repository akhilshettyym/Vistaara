import { View, Text, ScrollView, Platform, FlatList, Dimensions, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import Entypo from '@expo/vector-icons/Entypo';
import test from '../../assets/images/landing.jpeg'; // Change req

const Restaurant = () => {
    const { restaurant } = useLocalSearchParams();

    const flatListRef = useRef(null);
    const windowWidth = Dimensions.get("window").width;

    const [restaurantData, setRestaurantData] = useState({});
    const [carouselData, setCarouselData] = useState({});
    const [slotsData, setSlotsData] = useState({});

    const carouselItem = ({ item }) => {
        return (
            <View style={{ width: windowWidth - 2 }} className="h-64 relative rounded-[25px]">
                <View style={{ position: "absolute", top: "50%", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 50, padding: 5, zIndexx: 10, right: "6%" }}>
                    <Entypo name="arrow-with-circle-right" size={30} color="white" />
                </View>

                <View>
                    <Image source={{ uri: item } || test} style={{ opacity: 0.5, backgroundColor: "black", marginRight: 20, marginLeft: 5, borderRadius: 25 }} className="h-64" />
                </View>
            </View>
        )
    }

    const getRestaurantData = async () => {
        try {
            const restaurantQuery = query(collection(db, "restaurants"), where("name", "==", restaurant));
            const restaurantSnapshot = await getDocs(restaurantQuery);

            if (restaurantSnapshot.empty) {
                console.log("No matching restaurant found");
                return;
            }

            for (const doc of restaurantSnapshot.docs) {
                const restaurantData = doc.data();
                setRestaurantData(restaurantData);

                const carouselQuery = query(collection(db, "carousel"), where("res_id", "==", doc.ref));
                const carouselSnapshot = await getDocs(carouselQuery);
                const carouselImages = [];
                if (carouselSnapshot.empty) {
                    console.log("No matching carousel found");
                    return;
                }
                carouselSnapshot.forEach((carouselDoc) => {
                    carouselImages.push(carouselDoc.data());
                })
                setCarouselData(carouselImages);


                const slotsQuery = query(collection(db, "slots"), where("ref_id", "==", doc.ref));
                const slotsSnapshot = await getDocs(slotsQuery);
                const slots = [];
                if (slotsSnapshot.empty) {
                    console.log("No matching slots found");
                    return;
                }
                slotsSnapshot.forEach((slotDoc) => {
                    slotsImages.push(slotDoc.data());
                })
                setSlotsData(slots);

            }
        } catch (error) {
            console.log("Error fetching data", error);
        }
    }

    useEffect(() => {
        getRestaurantData();
    }, []);

    // console.log( restaurantData, carouselData, slotsData);

    return (
        <SafeAreaView style={[
            { backgroundColor: "#000000", flex: 1 },
            Platform.OS == "android" && { paddingBottom: 55 },
            Platform.OS == "ios" && { paddingBottom: 20 }
        ]}>
            <ScrollView className="h-full">
                <View className="flex-1 my-2 p-2">
                    <Text className="text-xl h-10 p-2 mb-2 text-semibold text-[#1ED760]">{restaurant}</Text>
                    <View className="border-b border border-[#1ED760]" />
                </View>

                <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
                    <FlatList
                        ref={flatListRef}
                        data={carouselData[0]?.images}
                        renderItem={carouselItem}
                        horizontal
                        scrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ borderRadius: 25 }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Restaurant;