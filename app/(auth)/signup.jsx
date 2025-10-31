import { Alert, ImageBackground, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, ActivityIndicator, useRouter, SafeAreaView, Formik, signupSchema, createUserWithEmailAndPassword, getAuth, bg, doc, getFirestore, setDoc, AsyncStorage, useState } from "../../constants/Imports";

const Signup = () => {
    const router = useRouter();
    const auth = getAuth();
    const db = getFirestore();
    const [loading, setLoading] = useState(false);

    const handleGuest = async () => {
        try {
            const isGuest = await AsyncStorage.getItem("isGuest");
            if (isGuest === "true") {
                router.push("/home");
                return;
            }
            await AsyncStorage.setItem("isGuest", "true");
            router.push("/home");
        } catch (error) {
            Alert.alert(
                "Guest Error!",
                error.message ?? "An unexpected error occurred. Please try again later.",
                [{ text: "OK" }]
            );
        }
    };

    const handleSignup = async (values) => {
        setLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth, values.email, values.password
            );

            await setDoc(doc(db, "users", user.uid), {
                name: values.name,
                email: values.email,
                createdAt: new Date(),
            });

            await AsyncStorage.setItem("userEmail", values.email);
            router.push("/home");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                Alert.alert("Signup Failed!",
                    "This email address is already in use. Please use a different email.",
                    [{ text: "OK" }]
                );
            } else {
                Alert.alert("Signup Error!",
                    error.message ?? "An unexpected error occurred. Please try again later.",
                    [{ text: "OK" }]
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="bg-[#000000] flex-1">
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 30,
                }} >

                <View className="mb-10 items-center">
                    <Text className="pt-5 text-2xl text-white font-semibold text-center"> Let's get you started </Text>
                </View>

                <ImageBackground
                    source={bg}
                    style={{
                        width: 350,
                        borderRadius: 30,
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 30,
                    }}
                    imageStyle={{ borderRadius: 30, opacity: 0.85 }} >
                    <View className="absolute inset-0 bg-black/40" />

                    <View className="w-80">
                        <Formik
                            initialValues={{ name: "", email: "", password: "" }}
                            validationSchema={signupSchema}
                            onSubmit={handleSignup} >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <>
                                    <Text className="text-[#1ED760] mt-2 mb-2 font-semibold"> Name * </Text>
                                    <TextInput
                                        className="h-11 border border-white text-white rounded px-2 bg-white/10"
                                        onChangeText={handleChange("name")}
                                        value={values.name}
                                        onBlur={handleBlur("name")}
                                        placeholder="Enter your name"
                                        placeholderTextColor="#ccc" />
                                    {touched.name && errors.name && (
                                        <Text className="text-white font-semibold text-xs mt-1 bg-red-50 dark:bg-red-900 dark:bg-opacity-50 px-2 py-1 rounded border border-red-200 dark:border-red-500"> {errors.name} </Text>
                                    )}

                                    <Text className="text-[#1ED760] mt-4 mb-2 font-semibold"> Email * </Text>
                                    <TextInput
                                        className="h-11 border border-white text-white rounded px-2 bg-white/10"
                                        keyboardType="email-address"
                                        onChangeText={handleChange("email")}
                                        value={values.email}
                                        onBlur={handleBlur("email")}
                                        placeholder="Enter your email"
                                        placeholderTextColor="#ccc" />
                                    {touched.email && errors.email && (
                                        <Text className="text-white font-semibold text-xs mt-1 bg-red-50 dark:bg-red-900 dark:bg-opacity-50 px-2 py-1 rounded border border-red-200 dark:border-red-500"> {errors.email} </Text>
                                    )}

                                    <Text className="text-[#1ED760] mt-4 mb-2 font-semibold"> Password * </Text>
                                    <TextInput
                                        className="h-11 border border-white text-white rounded px-2 bg-white/10"
                                        secureTextEntry
                                        onChangeText={handleChange("password")}
                                        value={values.password}
                                        onBlur={handleBlur("password")}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#ccc" />
                                    {touched.password && errors.password && (
                                        <Text className="text-white font-semibold text-xs mt-1 bg-red-50 dark:bg-red-900 dark:bg-opacity-50 px-2 py-1 rounded border border-red-200 dark:border-red-500"> {errors.password} </Text>
                                    )}

                                    <TouchableOpacity
                                        onPress={loading ? undefined : handleSubmit}
                                        disabled={loading}
                                        className={`p-3 rounded-lg mt-8 ${loading ? "bg-gray-400" : "bg-[#1ED760]"
                                            }`} >
                                        {loading ? (
                                            <ActivityIndicator color="#000" />
                                        ) : (
                                            <Text className="text-base font-bold text-center text-black"> Sign Up </Text>
                                        )}
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>

                        <View className="mt-6">
                            <TouchableOpacity
                                className="flex flex-row justify-center items-center my-3"
                                onPress={() => router.push("/signin")} >
                                <Text className="text-white font-semibold"> Already a User? </Text>
                                <Text className="text-base font-semibold underline text-[#1ED760]"> Sign In </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="p-3 bg-[#1ED760] rounded-lg mt-8 flex flex-row justify-center items-center"
                                onPress={handleGuest} >
                                <Text className="text-base font-bold text-black"> Guest User </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" translucent />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Signup;