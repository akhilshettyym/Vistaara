import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/vistaara.png";
import frame from "../../assets/images/frame.png"
import { Formik } from "formik"
import validationSchema from "../../utils/authSchema";

const Signin = () => {
    const router = useRouter();

    const handleSignin = () => {

    }

    return (
        <SafeAreaView className={"bg-[#2b2b2b] flex-1"} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="m-2 pt-10 flex justify-center items-center">
                    <Image source={logo} style={{ width: 240, height: 240 }} />
                    <Text className="pt-5 text-2xl text-white flex font-semibold justify-center">Let's get you started</Text>


                    <View className="flex-l">
                        <Image source={""} className="w-full h-full" resizeMode="contain" />
                    </View>

                    <View className="w-5/6">
                        <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSignin} >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <>
                                    <View className="w-full">

                                        <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                                        <TextInput className="h-10 border border-white text-white rounded px-2" keyboardType="email-address" onChangeText={handleChange("email")} values={values.email} onBlur={handleBlur("email")} />

                                        {touched.email && errors.email && (
                                            <Text className="text-red-500 text-xs">{errors.email}</Text>)}


                                        <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                                        <TextInput className="h-10 border border-white text-white rounded px-2" secureTextEntry onChangeText={handleChange("password")} values={values.password} onBlur={handleBlur("password")} />

                                        {touched.password && errors.password && (
                                            <Text className="text-red-500 text-xs">{errors.password}</Text>)}

                                        <TouchableOpacity onPress={handleSubmit} className="p-2 my-2 bg-[#f49b33] text-black rounded-lg mt-10">
                                            <Text className="text-xl font-semibold text-center"> Sign In </Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </Formik>
                        <View>
                            <TouchableOpacity className="flex flex-row justify-center items-center my-3 p-2" onPress={() => router.push("/signup")}>
                                <Text className="text-white font-semibold">New User ? {" "}</Text>
                                <Text className="text-base font-semibold underline text-[#f49b33]">Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="flex-l">
                    <Image source={frame} style={{ width: 450, height: 300 }} resizeMode="contain" />
                </View>
                <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signin;