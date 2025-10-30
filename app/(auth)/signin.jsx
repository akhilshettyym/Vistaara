// import { Alert, ImageBackground, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native"
// import { useRouter } from "expo-router"
// import { SafeAreaView } from "react-native-safe-area-context"
// import { Formik } from "formik"
// import validationSchema from "../../utils/authSchema"
// import bg from "../../assets/images/bg.jpeg"
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
// import { doc, getDoc, getFirestore } from "firebase/firestore"

// const Signin = () => {
//     const router = useRouter();
//         const auth = getAuth();
//         const db = getFirestore();

//     const handleSignin = async (values) => {
//         setLoading(true);
//         try {
//             const userCredentials = await signInWithEmailAndPassword(
//                 auth, values.email, values.password
//             );

//             const user = userCredentials.user;

//             const userDoc = await getDoc(doc(db, "users", user.uid));
//             if(userDoc.exists()) {
//                 console.log("User data", userDoc.data());
//                 await AsyncStorage.setItem("userEmail", values.email);
//                 router.push("/home");
//             } else {
//                 console.log("No such doc");
//             }
//         } catch (error) {
//             // console.log("TEST", error.code)
//             if (error.code === "auth/invalid-credential") {
//                 Alert.alert(
//                     "Sign-In Failed!",
//                     "Incorrect credentials. please try again.",
//                     [{ text: "OK" }]
//                 );
//             } else {
//                 Alert.alert(
//                     "Sign-In Error!",
//                     "An unexpected error occurred. Please try again later.",
//                     [{ text: "OK" }]
//                 );
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <SafeAreaView className="bg-[#000000] flex-1">
//             <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", paddingVertical: 30 }}>
//                 <View className="mb-10 items-center">
//                     <Text className="pt-5 text-2xl text-white font-semibold text-center"> Welcome Back </Text>
//                 </View>

//                 <ImageBackground
//                     source={bg}
//                     style={{ width: 340, borderRadius: 30, overflow: "hidden", justifyContent: "center", alignItems: "center", paddingVertical: 30 }}
//                     imageStyle={{ borderRadius: 30, opacity: 0.85 }} >
//                     <View className="absolute inset-0 bg-black/40" />

//                     <View className="w-80">
//                         <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSignin} >
//                             {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//                                 <>
//                                     <Text className="text-[#1ED760] mt-2 mb-2 font-semibold"> *Email </Text>
//                                     <TextInput
//                                         className="h-11 border border-white text-white rounded px-2 bg-white/10"
//                                         keyboardType="email-address"
//                                         onChangeText={handleChange("email")}
//                                         value={values.email}
//                                         onBlur={handleBlur("email")}
//                                         placeholder="Enter your email"
//                                         placeholderTextColor="#ccc"
//                                     />
//                                     {touched.email && errors.email && (
//                                         <Text className="text-white font-semibold text-xs mt-1 bg-red-50 dark:bg-red-900 dark:bg-opacity-50 px-2 py-1 rounded border border-red-200 dark:border-red-500"> {errors.email} </Text>
//                                     )}

//                                     <Text className="text-[#1ED760] mt-4 mb-2 font-semibold"> *Password </Text>
//                                     <TextInput
//                                         className="h-11 border border-white text-white rounded px-2 bg-white/10"
//                                         secureTextEntry
//                                         onChangeText={handleChange("password")}
//                                         value={values.password}
//                                         onBlur={handleBlur("password")}
//                                         placeholder="Enter your password"
//                                         placeholderTextColor="#ccc"
//                                     />
//                                     {touched.password && errors.password && (
//                                         <Text className="text-white font-semibold text-xs mt-1 bg-red-50 dark:bg-red-900 dark:bg-opacity-50 px-2 py-1 rounded border border-red-200 dark:border-red-500"> {errors.password} </Text>
//                                     )}

//                                     <TouchableOpacity onPress={handleSubmit} className="p-3 bg-[#1ED760] rounded-lg mt-8" >
//                                         <Text className="text-lg font-semibold text-center text-black"> Sign In </Text>
//                                     </TouchableOpacity>
//                                 </>
//                             )}
//                         </Formik>

//                         <View className="mt-6">
//                             <TouchableOpacity className="flex flex-row justify-center items-center my-3" onPress={() => router.push("/signup")}>
//                                 <Text className="text-white font-semibold">New User? </Text>
//                                 <Text className="text-base font-semibold underline text-[#1ED760]"> Sign Up </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity className="flex flex-row justify-center items-center my-3" onPress={() => router.push("/home")} >
//                                 <Text className="text-base font-semibold underline text-[#1ED760]"> Continue as Guest </Text>
//                             </TouchableOpacity>

//                         </View>
//                     </View>
//                 </ImageBackground>

//                 <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" translucent />
//             </ScrollView>
//         </SafeAreaView>
//     )
// }

// export default Signin;
import React, { useState } from "react";
import {
 Alert,
 ImageBackground,
 ScrollView,
 StatusBar,
 Text,
 TextInput,
 TouchableOpacity,
 View,
 ActivityIndicator,
 Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import bg from "../../assets/images/bg.jpeg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signInValidationSchema = Yup.object().shape({
 email: Yup.string().required("Email is required").email("Invalid Email Format"),
 password: Yup.string().required("Password is required").min(7, "Password must be at least 7 characters long"),
});

const Signin = () => {
 const router = useRouter();
 const auth = getAuth();
 const db = getFirestore();

 const [loading, setLoading] = useState(false);

 const handleSignin = async (values) => {
   // hide keyboard if open
   Keyboard.dismiss();
   setLoading(true);
   try {
     console.log("Attempting sign-in for:", values.email);
     const userCredentials = await signInWithEmailAndPassword(
       auth,
       values.email.trim().toLowerCase(),
       values.password
     );

     const user = userCredentials.user;
     console.log("Signed in user uid:", user.uid);

     const userDoc = await getDoc(doc(db, "users", user.uid));
     if (userDoc.exists()) {
       console.log("User data:", userDoc.data());
       await AsyncStorage.setItem("userEmail", values.email);
       router.push("/home");
     } else {
       console.warn("No user document found for uid:", user.uid);
       Alert.alert("Account issue", "We couldn't find profile data for this account.");
       // Still navigate if you want: router.push("/home");
     }
   } catch (error) {
     console.log("Signin error code:", error.code, "message:", error.message);

     // common Firebase auth errors — show friendly messages
     if (
       error.code === "auth/wrong-password" ||
       error.code === "auth/invalid-credential" ||
       error.code === "auth/invalid-email"
     ) {
       Alert.alert("Sign-In Failed", "Incorrect email or password. Please try again.");
     } else if (error.code === "auth/user-not-found") {
       Alert.alert("No Account", "No account found with this email. Please sign up first.");
     } else {
       Alert.alert("Sign-In Error", "An unexpected error occurred. Please try again later.");
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
       }}
     >
       <View className="mb-10 items-center">
         <Text className="pt-5 text-2xl text-white font-semibold text-center">
           Welcome Back
         </Text>
       </View>

       <ImageBackground
         source={bg}
         style={{
           width: 340,
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
           <Formik
             initialValues={{ email: "", password: "" }}
             validationSchema={signInValidationSchema}
             onSubmit={handleSignin}
           >
             {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
               <>
                 <Text className="text-[#1ED760] mt-2 mb-2 font-semibold">*Email</Text>
                 <TextInput
                   className="h-11 border border-white text-white rounded px-2 bg-white/10"
                   keyboardType="email-address"
                   autoCapitalize="none"
                   onChangeText={handleChange("email")}
                   value={values.email}
                   onBlur={handleBlur("email")}
                   placeholder="Enter your email"
                   placeholderTextColor="#ccc"
                 />
                 {touched.email && errors.email && (
                   <Text className="text-white font-semibold text-xs mt-1 px-2 py-1 rounded border border-red-200">
                     {errors.email}
                   </Text>
                 )}

                 <Text className="text-[#1ED760] mt-4 mb-2 font-semibold">*Password</Text>
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
                   <Text className="text-white font-semibold text-xs mt-1 px-2 py-1 rounded border border-red-200">
                     {errors.password}
                   </Text>
                 )}

                 <TouchableOpacity
                   onPress={() => handleSubmit()}
                   className={`p-3 rounded-lg mt-8 ${loading ? "bg-gray-400" : "bg-[#1ED760]"}`}
                   disabled={loading}
                 >
                   {loading ? (
                     <ActivityIndicator color="black" />
                   ) : (
                     <Text className="text-lg font-semibold text-center text-black">Sign In</Text>
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
               <Text className="text-white font-semibold">New User? </Text>
               <Text className="text-base font-semibold underline text-[#1ED760]">Sign Up</Text>
             </TouchableOpacity>

             <TouchableOpacity
               className="flex flex-row justify-center items-center my-3"
               onPress={() => router.push("/home")}
             >
               <Text className="text-base font-semibold underline text-[#1ED760]">Continue as Guest</Text>
             </TouchableOpacity>
           </View>
         </View>
       </ImageBackground>

       <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" translucent />
     </ScrollView>
   </SafeAreaView>
 );
};

export default Signin;