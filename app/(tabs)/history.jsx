import { StyleSheet } from "react-native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  useEffect,
  useState,
  SafeAreaView,
  useRouter,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  AsyncStorage,
  Modal,
  Ionicons,
} from "../../constants/Imports";
import RNPickerSelect from "react-native-picker-select";

const history = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const options = [
    {  label: "Change of plans" },
    { label: "Booked by mistake" },
    { label: "No longer needed" },
    {  label: "Personal reasons" },
    { label: "Other (please specify)" },
  ];
  const router = useRouter();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };

    fetchUserEmail();
  }, []);

  const fetchBookings = async () => {
    if (userEmail) {
      try {
        const bookingCollection = collection(db, "bookings");
        const bookingQuery = query(
          bookingCollection,
          where("email", "==", userEmail)
        );
        const bookingSnapshot = await getDocs(bookingQuery);
        const bookingList = bookingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingList);
        // console.log("BOOKING", bookingList);
      } catch (error) {
        Alert.alert("Error", "Could not fetch bookings");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [userEmail]);

  const handleCancelBooking = () => {
    setModalVisible(true);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#2b2b2b]">
        <Text className="text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      {userEmail ? (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 bg-[#00000080] justify-end">
            <View className="bg-[#474747] mx-4 rounded-t-lg p-5 pb-8">
              <View className="flex-row justify-between items-center mb-3">
                <Text style={styles.label}>Reason:</Text>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedValue(value)}
                  items={options}
                  placeholder={{ label: "Choose an option...", value: null }}
                  style={pickerSelectStyles}
                  value={selectedValue}
                  onRequestClose={() => setModalVisible(false)}
                />

                {selectedValue ? (
                  <Text style={styles.result}>
                    You selected: {selectedValue}
                  </Text>
                ) : null}
                <Ionicons
                  name="close-sharp"
                  size={28}
                  color="#1ED760"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        ""
      )}
      {userEmail ? (
        <FlatList
          data={bookings}
          onRefresh={fetchBookings}
          refreshing={loading}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="border border-[#1ED760] p-2 m-4 rounded-lg space-y-2">
              {[
                {
                  label: "Date",
                  value: new Date(item.date).toLocaleDateString(),
                },
                { label: "Slot", value: item.slot },
                { label: "Guests", value: item.guests },
                { label: "Restaurant", value: item.restaurant },
                { label: "Email", value: item.email },
              ].map((field, i) => (
                <View key={i} className="flex-row items-center">
                  <Text
                    className="text-[#1ED760] font-semibold text-left"
                    style={{ width: 100 }}
                  >
                    {field.label}:
                  </Text>
                  <Text className="text-white ml-3 flex-1">{field.value}</Text>
                </View>
              ))}
              <View>
                <TouchableOpacity
                  onPress={() => {
                    handleCancelBooking();
                  }}
                  className="p-2 my-2 bg-[#1ED760] items-center rounded-lg mt-10"
                >
                  <Text className="p-2 text-black font-semibold">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white mb-4">
            Please sign in to view your booking history
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/signin")}
            className="p-2 my-2 bg-[#1ED760]"
          >
            <Text className="text-lg font-semibold text-center"> Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default history;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 20,
  },
  label: {
    fontSize: 25,
    marginBottom: 10,
    color: "#1ED760",
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: "#1ED760",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure text is not hidden
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
