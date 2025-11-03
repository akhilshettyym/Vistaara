import { Alert, ImageBackground, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, ActivityIndicator, useRouter, SafeAreaView, Formik, signinSchema, getAuth, signInWithEmailAndPassword, doc, getDoc, getFirestore, bg, AsyncStorage, useState, useEffect } from "../../constants/Imports"

const Signin = () => {
  const router = useRouter()
  const auth = getAuth()
  const db = getFirestore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkGuestAndLogout = async () => {
      try {
        const isGuest = await AsyncStorage.getItem("isGuest")
        if (isGuest === "true") {
          await AsyncStorage.removeItem("isGuest")
          await AsyncStorage.removeItem("userEmail")
        }
      } catch (error) {
        console.error("Error checking guest status:", error)
      }
    }
    checkGuestAndLogout()
  }, [])

  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true")
    router.push("/home")
  }

  const handleSignin = async (values) => {
    setLoading(true)
    try {
      const { user } = await signInWithEmailAndPassword(auth, values.email, values.password)

      const userSnap = await getDoc(doc(db, "users", user.uid))

      if (!userSnap.exists()) {
        console.warn("User doc missing for uid:", user.uid)
      }

      await AsyncStorage.setItem("userEmail", values.email)
      await AsyncStorage.setItem("isGuest", "false")
      router.push("/home")
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Sign-In Failed!");
        Alert.alert("Sign-In Failed!", "Incorrect email or password. Please try again.", [{ text: "OK" }])
      } else {
        alert("Sign-In Error!");
        Alert.alert("Sign-In Error!", error.message ?? "Something went wrong. Please try again later.", [
          { text: "OK" },
        ])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="bg-[#000000] flex-1">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 30,
        }}
      >
        <View className="mb-10 items-center">
          <Text className="pt-5 text-2xl text-white font-semibold text-center"> Welcome Back </Text>
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
          imageStyle={{ borderRadius: 30, opacity: 0.85 }}
        >
          <View className="absolute inset-0 bg-black/40" />

          <View className="w-80">
            <Formik initialValues={{ email: "", password: "" }} validationSchema={signinSchema} onSubmit={handleSignin}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <Text className="text-[#1ED760] mt-2 mb-2 font-semibold"> Email * </Text>
                  <TextInput
                    className="h-11 border border-white text-white rounded px-2 bg-white/10"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                    placeholder="Enter your email"
                    placeholderTextColor="#ccc"
                  />
                  {touched.email && errors.email && (
                    <Text className="text-white font-semibold text-xs mt-1 bg-red-50 dark:bg-red-900 dark:bg-opacity-50 px-2 py-1 rounded border border-red-200 dark:border-red-500">
                      {" "}
                      {errors.email}{" "}
                    </Text>
                  )}

                  <Text className="text-[#1ED760] mt-4 mb-2 font-semibold"> Password * </Text>
                  <TextInput
                    className="h-11 border border-white text-white rounded px-2 bg-white/10"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                    placeholder="Enter your password"
                    placeholderTextColor="#ccc"
                  />
                  {touched.password && errors.password && (
                    <Text className="text-white font-semibold text-xs mt-1 bg-red-50 dark:bg-red-900 dark:bg-opacity-50 px-2 py-1 rounded border border-red-200 dark:border-red-500">
                      {" "}
                      {errors.password}{" "}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={loading ? undefined : handleSubmit}
                    disabled={loading}
                    className={`p-3 rounded-lg mt-8 ${loading ? "bg-[#4DE57C]" : "bg-[#1ED760]"}`}
                  >
                    {loading ? (
                      <ActivityIndicator color="#000" />
                    ) : (
                      <Text className="text-base font-bold text-center text-black"> Sign In </Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            <View className="mt-6">
              <TouchableOpacity
                className="flex flex-row justify-center items-center my-3"
                onPress={() => router.push("/signup")}
              >
                <Text className="text-white font-semibold"> New User? </Text>
                <Text className="text-base font-semibold underline text-[#1ED760]"> Sign Up </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex flex-row justify-center items-center my-3" onPress={handleGuest}>
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