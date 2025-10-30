import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const FindSlots = ({ date, selectedNumber, slots, selectedSlot, setSelectedSlot }) => {
  const [slotsVisible, setSlotsVisible] = useState(false);

  const handlePress = () => {
    setSlotsVisible(!slotsVisible);
  }

  const handleSlotPress = (slot) => {
    let prevSlot = selectedSlot;
    if (prevSlot == slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
      // setSlotsVisible(false);
    }
  }

  return (
    <View className="flex-1">
      <View className={`flex ${selectedSlot != null && "flex-row"}`}>

        <View className={`${selectedSlot != null && "flex-1"}`}>
          <TouchableOpacity onPress={handlePress}>
            <Text className="text-center text-white border border-[#1ED760] text-lg font-bold p-2 my-3 mx-2 rounded-lg">Find Slots</Text>
          </TouchableOpacity>
        </View>

        {selectedSlot != null && (
          <View className="flex-1">
            <TouchableOpacity>
              <Text className="text-center text-lg font-bold bg-[#1ED760] p-2 my-3 mx-2 rounded-lg">Book Slots</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>

      {slotsVisible && (
        <View className="flex-wrap flex-row mx-2 p-2 bg-[#474747] border border-[#1ED760] rounded-lg">
          {slots.map((slot, index) => (
            <TouchableOpacity key={index} className={`m-2 p-4 border border-[#1ED760] rounded-lg items-center justify-center ${selectedSlot && selectedSlot !== slot ? "opacity-30" : ""}`} onPress={() => handleSlotPress(slot)} disabled={selectedSlot == slot || selectedSlot == null ? false : true}>
              <Text className="text-white font-bold">{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

export default FindSlots;