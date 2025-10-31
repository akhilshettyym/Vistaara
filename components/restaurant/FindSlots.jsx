import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Modal, TextInput, useState, AsyncStorage, addDoc, collection, db, Formik, Ionicons, validationSchema } from "../../constants/Imports"

const FindSlots = ({ date, selectedNumber, slots, selectedSlot, setSelectedSlot, restaurant }) => {
  const [slotsVisible, setSlotsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const handlePress = () => setSlotsVisible((prev) => !prev);

  const handleSlotPress = (slot) => {
    if (selectedSlot === slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      return Alert.alert("Please select a slot first!");
    }

    try {
      setIsBooking(true);
      const userEmail = await AsyncStorage.getItem("userEmail");
      const guestStatus = await AsyncStorage.getItem("isGuest");

      if (!userEmail && guestStatus !== "true") {
        setIsBooking(false);
        return Alert.alert(
          "No Account Found",
          "Please sign up or log in to continue."
        );
      }

      if (guestStatus === "true" || !userEmail) {
        setModalVisible(true);
        setIsBooking(false);
        return;
      }

      await addDoc(collection(db, "bookings"), {
        email: userEmail,
        slot: selectedSlot,
        date: date.toISOString(),
        guests: selectedNumber,
        restaurant,
      });

      Alert.alert("Success", "Your slot has been booked successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error?.message ?? "Something went wrong.");
    } finally {
      setIsBooking(false);
    }
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setIsBooking(true);
      await addDoc(collection(db, "bookings"), {
        name: values.fullName,
        phoneNumber: values.phoneNumber,
        slot: selectedSlot,
        date: date.toISOString(),
        guests: selectedNumber,
        restaurant,
        isGuest: true,
      });

      Alert.alert("Success", "Your slot has been booked successfully!");
      resetForm();
      setModalVisible(false);
      setSelectedSlot(null);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong during booking.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <View className="flex-1">
      <View className={`flex ${selectedSlot ? "flex-row" : ""}`}>
        <View className={`${selectedSlot ? "flex-1" : ""}`}>
          <TouchableOpacity onPress={handlePress}>
            <Text className="text-center text-white border border-[#1ED760] text-lg font-bold p-2 my-3 mx-2 rounded-lg"> Find Slots </Text>
          </TouchableOpacity>
        </View>

        {selectedSlot && (
          <View className="flex-1">
            <TouchableOpacity
              onPress={handleBooking}
              disabled={isBooking}
              style={isBooking ? { opacity: 0.7 } : undefined} >
              <View className="flex-row items-center justify-center bg-[#1ED760] p-2 my-3 mx-2 rounded-lg">
                {isBooking && (
                  <ActivityIndicator
                    size="small"
                    color="#fff"
                    style={{ marginRight: 8 }}
                  />
                )}
                <Text className="text-center text-lg font-bold text-white">
                  {isBooking ? "Booking..." : "Book Slot"}
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
                  className={`m-2 p-4 border border-[#1ED760] rounded-lg items-center justify-center ${selectedSlot && selectedSlot !== slot ? "opacity-40" : ""
                    }`}
                  onPress={() => handleSlotPress(slot)}
                  disabled={
                    selectedSlot === slot || selectedSlot == null ? false : true
                  } >
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

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} >
        <View className="flex-1 bg-[#00000080] justify-end">
          <View className="bg-[#474747] mx-4 rounded-t-lg p-5 pb-8">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-white text-lg font-bold"> Guest Details </Text>
              <Ionicons
                name="close-sharp"
                size={28}
                color="#1ED760"
                onPress={() => setModalVisible(false)} />
            </View>

            <Formik
              initialValues={{ fullName: "", phoneNumber: "" }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit} >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  <Text className="text-[#1ED760] mb-1 font-semibold"> Full Name * </Text>
                  <TextInput
                    className="h-11 border border-white text-white rounded px-2 bg-white/10"
                    onChangeText={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    value={values.fullName}
                    placeholder="Enter your name"
                    placeholderTextColor="#ccc" />
                  {touched.fullName && errors.fullName && (
                    <Text className="text-red-400 text-xs mt-1"> {errors.fullName} </Text>
                  )}

                  <Text className="text-[#1ED760] mt-4 mb-1 font-semibold"> Phone Number * </Text>
                  <TextInput
                    className="h-11 border border-white text-white rounded px-2 bg-white/10"
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    value={values.phoneNumber}
                    keyboardType="phone-pad"
                    placeholder="Enter your phone number"
                    placeholderTextColor="#ccc" />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text className="text-red-400 text-xs mt-1"> {errors.phoneNumber} </Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isBooking}
                    style={{ opacity: isBooking ? 0.6 : 1 }}
                    className="p-3 rounded-lg mt-6 bg-[#1ED760]"
                  >
                    {isBooking ? (
                      <ActivityIndicator color="#000" />
                    ) : (
                      <Text className="text-base font-bold text-center text-black"> Submit </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindSlots;