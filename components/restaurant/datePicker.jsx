import { View, Text, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react';

const DatePicker = () => {

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const handlePress = () => {
    setShow(true);
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  }

  return (
    <View className="flex flex-row">
      <TouchableOpacity onPress={handlePress}>
        {Platform.OS === "android" && <Text className="text-white">{date.toLocaleDateString()}</Text>}
        {Platform.OS === "android" && show && (
        <DateTimePicker onChange={onChange} accentColor="#1ED760" textColor="#1ED760" value={date} mode="date" display="default" minimumDate={new Date()} maximumDate={new Date(new Date().setDate(new Date().getDate()+7))} />
        )}

        {Platform.OS === "ios" && (
        <DateTimePicker onChange={onChange} accentColor="#1ED760" textColor="#1ED760" value={date} mode="date" display="default" minimumDate={new Date()} maximumDate={new Date(new Date().setDate(new Date().getDate()+7))} />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default DatePicker;