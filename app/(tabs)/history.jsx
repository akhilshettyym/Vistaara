import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const history = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email)
    }

    fetchUserEmail();
  }, []);

  const fetchBookings = async () => {
    if (userEmail) {
      try {
        const bookingCollection = collection(db, "bookings");
        const bookingQuery = query(bookingCollection, where("email", "==", userEmail));
        const bookingSnapshot = await getDocs(bookingQuery);
        const bookingList = bookingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setBookings(bookingList);
        // console.log("BOOKING", bookingList);
      } catch (error) {
        Alert.alert("Error", "Could not fetch bookings")
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBookings();
  }, [userEmail])


  if (loading) {
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
          renderItem={({ item }) => (
            <View className="border border-[#1ED760] p-2 m-4 rounded-lg space-y-2">
              {[
                { label: 'Date', value: new Date(item.date).toLocaleDateString() },
                { label: 'Slot', value: item.slot },
                { label: 'Guests', value: item.guests },
                { label: 'Restaurant', value: item.restaurant },
                { label: 'Email', value: item.email },
              ].map((field, i) => (
                <View key={i} className="flex-row items-center">
                  <Text
                    className="text-[#1ED760] font-semibold text-left"
                    style={{ width: 100 }}
                  >
                    {field.label}:
                  </Text>
                  <Text className="text-white ml-3 flex-1">
                    {field.value}
                  </Text>
                </View>
              ))}
            </View>

          )} />) : (
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

export default history;