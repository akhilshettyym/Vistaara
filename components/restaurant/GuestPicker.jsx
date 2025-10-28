import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const GuestPicker = () => {

    const decrement = () => {

    }
    const increment = () => {

    }

  return (
    <View className="flex flex-row items-center rounded-lg text-white text-base">
      <TouchableOpacity onPress={decrement} className="rounded">
        <Text className="text-white text-lg border border-[#1ED760]">-</Text>
      </TouchableOpacity>

<Text className="px-3 text-white bg-[#474747] text-lg">
{selectedNumber}
</Text>
      <TouchableOpacity onPress={increment} className="rounded">
        <Text className="text-white text-lg border border-[#1ED760]">+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GuestPicker