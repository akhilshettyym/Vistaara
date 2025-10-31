import { View, Text, TouchableOpacity, Platform, Alert, ActivityIndicator, Modal, TextInput, ImageBackground, ScrollView, StatusBar, FlatList, Image, Dimensions, Linking, useRef } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState, useEffect, React } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Formik } from "formik";
import Ionicons from "@expo/vector-icons/Ionicons";
import validationSchema from "../utils/guestForm";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { signinSchema, signupSchema } from "../utils/authSchema";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, getDocs, query, where } from "firebase/firestore";
import bg from "../assets/images/bg.jpeg";
import { Tabs, useLocalSearchParams } from 'expo-router';
import { Colors } from '../assets/Colors';
import { BlurView } from 'expo-blur';
import Entypo from '@expo/vector-icons/Entypo';
import DatePicker from '../components/restaurant/DatePicker';
import GuestPicker from '../components/restaurant/GuestPicker';
import FindSlots from '../components/restaurant/FindSlots';
import Landing from '../app/landing';
import { LinearGradient } from "expo-linear-gradient"
import test from '../assets/images/landing.jpeg'; // Change req
import landing from '../assets/images/landing.jpeg'; // Change required



export {
    View, Text, TouchableOpacity, Platform, DateTimePicker, useState, AsyncStorage, addDoc, collection, db, Formik, Ionicons, validationSchema, Alert, ActivityIndicator, Modal, TextInput,
    ImageBackground, ScrollView, StatusBar, SafeAreaView, useRouter, signinSchema, getAuth, signInWithEmailAndPassword, doc, getDoc, getFirestore, bg, setDoc, signupSchema, createUserWithEmailAndPassword, Tabs, Colors, FlatList, useEffect, getDocs, query, where, Image, BlurView, landing, Dimensions, Linking, useRef, useLocalSearchParams, Entypo, test, DatePicker, GuestPicker, FindSlots, signOut, React, Landing, LinearGradient }