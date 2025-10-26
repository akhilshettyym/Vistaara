import { ImageBackground, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Formik } from "formik"
import validationSchema from "../../utils/authSchema"
import bg from "../../assets/images/bg.jpeg"

const Signin = () => {
    const router = useRouter()

    const handleSignin = (values) => {
        console.log("Signin form values:", values)
    }

    return (
        <SafeAreaView className="bg-[#000000] flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", paddingVertical: 30 }}>
                <View className="mb-10 items-center">
                    <Text className="pt-5 text-2xl text-white font-semibold text-center"> Welcome Back </Text>
                </View>

                <ImageBackground
                    source={bg}
                    style={{ width: 340, borderRadius: 30, overflow: "hidden", justifyContent: "center", alignItems: "center", paddingVertical: 30 }}
                    imageStyle={{ borderRadius: 30, opacity: 0.85 }} >
                    <View className="absolute inset-0 bg-black/40" />

                    <View className="w-80">
                        <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSignin} >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <>
                                    <Text className="text-[#1ED760] mt-2 mb-2 font-semibold"> Email </Text>
                                    <TextInput
                                        className="h-15 border border-white text-white rounded px-2 bg-white/10"
                                        keyboardType="email-address"
                                        onChangeText={handleChange("email")}
                                        value={values.email}
                                        onBlur={handleBlur("email")}
                                        placeholder="Enter your email"
                                        placeholderTextColor="#ccc"
                                    />
                                    {touched.email && errors.email && (
                                        <Text className="text-red-500 text-xs mt-1"> {errors.email} </Text>
                                    )}

                                    <Text className="text-[#1ED760] mt-4 mb-2 font-semibold"> Password </Text>
                                    <TextInput
                                        className="h-15 border border-white text-white rounded px-2 bg-white/10"
                                        secureTextEntry
                                        onChangeText={handleChange("password")}
                                        value={values.password}
                                        onBlur={handleBlur("password")}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#ccc"
                                    />
                                    {touched.password && errors.password && (
                                        <Text className="text-red-500 text-xs mt-1"> {errors.password} </Text>
                                    )}

                                    <TouchableOpacity onPress={handleSubmit} className="p-3 bg-[#1ED760] rounded-lg mt-8" >
                                        <Text className="text-lg font-semibold text-center text-black"> Sign In </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>

                        <View className="mt-6">
                            <TouchableOpacity className="flex flex-row justify-center items-center my-3" onPress={() => router.push("/signup")}>
                                <Text className="text-white font-semibold">New User? </Text>
                                <Text className="text-base font-semibold underline text-[#1ED760]"> Sign Up </Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex flex-row justify-center items-center my-3" onPress={() => router.push("/home")} >
                                <Text className="text-base font-semibold underline text-[#1ED760]"> Continue as Guest </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ImageBackground>

                <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" translucent />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signin;