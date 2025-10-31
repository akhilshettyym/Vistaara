// import { Tabs } from 'expo-router';
// import { Colors } from '../../assets/Colors';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { TouchableOpacity } from 'react-native';

import { Tabs, Colors, Ionicons, useRouter, TouchableOpacity } from "../../constants/Imports"

const TabLayout = () => {
    const router = useRouter();

    const BackButton = () => (
        <TouchableOpacity
            onPress={() => {
                if (router.canGoBack()) router.back();
                else router.replace('/(tabs)/home');
            }}
            style={{ marginLeft: 16 }} >
            <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
    );

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: Colors.dark.text,
                tabBarStyle: {
                    backgroundColor: Colors.SECONDARY,
                    paddingBottom: 14,
                    height: 75,
                },
                tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
            }} >

            <Tabs.Screen
                name="home"
                options={{
                    title: 'HOME',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                }} />

            <Tabs.Screen
                name="history"
                options={{
                    title: 'HISTORY',
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.SECONDARY },
                    headerTintColor: Colors.PRIMARY,
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerLeft: () => <BackButton />,
                    tabBarIcon: ({ color }) => <Ionicons name="time" size={24} color={color} />,
                }} />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'PROFILE',
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.SECONDARY },
                    headerTintColor: Colors.PRIMARY,
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerLeft: () => <BackButton />,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-sharp" size={24} color={color} />
                    ),
                }} />
        </Tabs>
    );
};

export default TabLayout;