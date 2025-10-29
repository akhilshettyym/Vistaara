import { View, Text, TouchableOpacity } from 'react-native'

const GuestPicker = ({ selectedNumber, setSelectedNumber }) => {

    const decrement = () => {
        if (selectedNumber > 1) setSelectedNumber(selectedNumber - 1);
    }

    const increment = () => {
        if (selectedNumber < 15) setSelectedNumber(selectedNumber + 1);
    }

    return (
        <View className="flex flex-row items-center rounded-lg text-white text-base">
            <TouchableOpacity onPress={decrement} className="rounded">
                <Text className="text-white text-lg border border-[#1ED760] rounded-l-lg px-3">-</Text>
            </TouchableOpacity>

            <Text className="px-3 text-white bg-[#474747] text-lg border border-[#2b2b2b]"> {selectedNumber} </Text>

            <TouchableOpacity onPress={increment} className="rounded">
                <Text className="text-white text-lg border border-[#1ED760] rounded-r-lg px-3">+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GuestPicker