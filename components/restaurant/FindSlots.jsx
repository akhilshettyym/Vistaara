import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const FindSlots = ({ date, selectedNumber, slots, selectedSlot, setSelectedSlot, restaurant }) => {
  const [slotsVisible, setSlotsVisible] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const handlePress = () => setSlotsVisible(v => !v);

  const handleSlotPress = (slot) => {
    if (selectedSlot === slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot) return;

    setIsBooking(true);
    const userEmail = await AsyncStorage.getItem('userEmail');

    if (!userEmail) {
      setIsBooking(false);
      return Alert.alert('No Account', 'No account found with this email. Please sign up first.');
    }

    try {
      await addDoc(collection(db, 'bookings'), {
        email: userEmail,
        slot: selectedSlot,
        date: date.toISOString(),
        guests: selectedNumber,
        restaurant,
      });

      Alert.alert('Success', 'Your slot has been booked!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error?.message ?? 'Something went wrong.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <View className="flex-1">
      <View className={`flex ${selectedSlot != null && 'flex-row'}`}>

        <View className={`${selectedSlot != null && 'flex-1'}`}>
          <TouchableOpacity onPress={handlePress}>
            <Text className="text-center text-white border border-[#1ED760] text-lg font-bold p-2 my-3 mx-2 rounded-lg">
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>

        {selectedSlot != null && (
          <View className="flex-1">
            <TouchableOpacity
              onPress={handleBooking}
              disabled={isBooking}
              style={isBooking ? { opacity: 0.6 } : undefined}
            >
              <View className="flex-row items-center justify-center bg-[#1ED760] p-2 my-3 mx-2 rounded-lg">
                {isBooking && (
                  <ActivityIndicator
                    size="small"
                    color="#fff"
                    style={{ marginRight: 8 }}
                  />
                )}
                <Text className="text-center border border-[#1ED760] text-lg font-bold text-white">
                  {isBooking ? 'Booking...' : 'Book Slots'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

      </View>

      {slotsVisible && (
        <>
          {Array.isArray(slots) && slots.length > 0 ? (
            <View className="flex-wrap flex-row mx-2 p-2 bg-[#474747] border border-[#1ED760] rounded-lg">
              {slots.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  className={`m-2 p-4 border border-[#1ED760] rounded-lg items-center justify-center ${selectedSlot && selectedSlot !== slot ? 'opacity-30' : ''
                    }`}
                  onPress={() => handleSlotPress(slot)}
                  disabled={selectedSlot === slot || selectedSlot == null ? false : true}
                >
                  <Text className="text-white font-bold">{slot}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="mx-2 p-4 bg-[#474747] border border-[#1ED760] rounded-lg">
              <Text className="text-white text-center">No slots available</Text>
            </View>
          )}
        </>
      )}

    </View>
  );
};

export default FindSlots;