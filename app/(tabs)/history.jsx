import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const history = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const db = getFirestore();

  useEffect(()=>{
    const fetchUserEmail = async() =>{
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email)
    }

    fetchUserEmail();
  }, []);

  const fetchBookings = async() => {
      if(userEmail){
        try {
          const bookingCollection = collection(db, "bookings");
          const bookingQuery = query(bookingCollection, where("email", "==", userEmail));
          const bookingSnapshot = await getDocs(bookingQuery);
          const bookingList = bookingSnapshot.docs.map((doc) => ({
            id:doc.id,
            ...doc.data()
          }));

          setBookings(bookingList)
        } catch (error) {
          Alert.alert("Error", "Could not fetch bookings")
        }
      }
      setLoading(false)
    }

  useEffect(()=>{
    fetchBookings();
  }, [userEmail])


  if(loading){
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#2b2b2b]"> 
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      {
        userEmail ? (<FlatList 
        data={bookings}
        onRefresh={fetchBookings}
        refreshing={loading}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View className="p-4 border-b border-[#1ED760]">
            <Text className="text-white"> Date: {item.date}</Text>
            <Text className="text-white"> Slot: {item.slot}</Text>
            <Text className="text-white"> Guests: {item.guests}</Text>
            <Text className="text-white"> Restaurant: {item.restaurant}</Text>
            <Text className="text-white"> Email: {item.email}</Text>
          </View>
        )}/>): (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white mb-4">Please sign in to view your booking history</Text>
          <TouchableOpacity onPress={() => router.push("/signin")}
            className="p-2 my-2 bg-[#1ED760]">
            <Text className="text-lg font-semibold text-center"> Sign In</Text>
          </TouchableOpacity>
          </View>)
      }
    </SafeAreaView>
  )
}

export default history