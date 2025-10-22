import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, TextInput } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import { Formik, validateYupSchema } from 'formik';
import frame from "../../assets/images/frame.png"
import logo from "../../assets/images/vistaara.png"
import validationSchema from '../../utils/signupSchema';
import { useRouter } from 'expo-router';

const Signup = () => {
  const router = useRouter();
  const handleSignup = () => { handleSubmit }
  return (
    <SafeAreaView className={"bg-[#2b2b2b] flex-1"} >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 220, height: 220 }} />
          {/* SignIn / Guest User */}
          <Text className="text-white text-lg text-center font-bold mb-10">
            Let's get you started
          </Text>

          <View className="w-5/6">
            <Formik initialValues={{ email: "", password: "", name: "" }}
              validationSchema={validationSchema} onSubmit={handleSignup}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View className="w-full">
                  <Text className="text-[#f49b33] mt-4 mb-2">Name</Text>
                  <TextInput
                    className="h-10 border border-white text-white rounded px-2"
                    onChangeText={handleChange('name')}
                    value={values.name}
                    onBlur={handleBlur('name')} />
                  {touched.name && errors.name && (
                    <Text className="text-red-500 text-xs mb-2">{errors.name}</Text>
                  )}

                  <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                  <TextInput
                    className="h-10 border border-white text-white rounded px-2"
                    keyboardType='email-address'
                    onChangeText={handleChange('email')}
                    value={values.email}
                    onBlur={handleBlur('email')} />

                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-xs mb-2">{errors.email}</Text>
                  )}

                  <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                  <TextInput
                    className="h-10 border border-white text-white rounded px-2"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    value={values.password}
                    onBlur={handleBlur('password')} />

                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-xs mb-2">{errors.password}</Text>
                  )}
                  <TouchableOpacity onPress={handleSubmit} className="p-2 my-2 bg-[#f49b33] text-black rounded-lg mt-10">
                    <Text className="text-xl font-semibold text-center"> Sign Up </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View>
              <TouchableOpacity className="flex flex-row justify-center items-center" onPress={() => router.push("/singin")}>
                <Text className="text-white font-semibold">Already a User ? {" "}</Text>
                <Text className="text-base font-semibold underline text-[#f49b33]">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-l">
            <Image source={frame} style={{ width: 450, height: 200 }} resizeMode="contain" />
          </View>

          {/* <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup