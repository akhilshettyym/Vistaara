import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, Dimensions } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Formik } from "formik"
import validationSchema from "../../utils/authSchema"

const Signup = () => {
  const router = useRouter()

  const handleSignup = () => {}

  return (
    <SafeAreaView className={"bg-[#2b2b2b] flex-1"}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <View className="flex-1 justify-center items-center px-4">
          <Text className="pt-5 text-xl md:text-2xl text-white font-semibold text-center">Let's get you started</Text>

          <View className="w-full max-w-sm mt-8">
            <Formik
              initialValues={{ email: "", password: "", name: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <View className="w-full">
                    <Text className="text-[#1ED760] mt-4 mb-2">Name</Text>
                    <TextInput
                      className="h-10 border border-white text-white rounded px-2"
                      onChangeText={handleChange("name")}
                      value={values.name}
                      onBlur={handleBlur("name")}
                    />
                    {touched.name && errors.name && <Text className="text-red-500 text-xs">{errors.name}</Text>}
                    <Text className="text-[#1ED760] mt-4 mb-2">Email</Text>
                    <TextInput
                      className="h-10 border border-white text-white rounded px-2"
                      keyboardType="email-address"
                      onChangeText={handleChange("email")}
                      values={values.email}
                      onBlur={handleBlur("email")}
                    />

                    {touched.email && errors.email && <Text className="text-red-500 text-xs">{errors.email}</Text>}

                    <Text className="text-[#1ED760] mt-4 mb-2">Password</Text>
                    <TextInput
                      className="h-10 border border-white text-white rounded px-2"
                      secureTextEntry
                      onChangeText={handleChange("password")}
                      values={values.password}
                      onBlur={handleBlur("password")}
                    />

                    {touched.password && errors.password && (
                      <Text className="text-red-500 text-xs">{errors.password}</Text>
                    )}

                    <TouchableOpacity onPress={handleSubmit} className="p-3 bg-[#1ED760] text-black rounded-lg mt-10">
                      <Text className="text-lg font-semibold text-center text-black"> Sign Up </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
            <View>
              <TouchableOpacity
                className="flex flex-row justify-center items-center my-3 p-2"
                onPress={() => router.push("/signin")} >
                <Text className="text-white font-semibold">Already a User ? </Text>
                <Text className="text-base font-semibold underline text-[#1ED760]">Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-row justify-center items-center my-3 p-2"
                onPress={() => router.push("/home")} >
                <Text className="text-base font-semibold underline text-[#1ED760]"> Guest User </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="items-center mt-8">
        </View>
        <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup;