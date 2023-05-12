import React, { useState, useRef, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@rneui/base";
import {
  ImagePet,
  AddPetForm,
  UploadImagesForm,
} from "../../../components/Adopciones";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { db } from "../../../utils";

import { styles } from "./AddPet.styles";
import { initialValues, validationSchema } from "./AddPet.data";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function AddPet() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const { uid } = getAuth().currentUser;

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuidv4();
        newData.fechaCreacion = new Date();
        newData.idUser = uid;

        const myDB = doc(db, "pets", newData.id);
        await setDoc(myDB, newData);
        await schedulePushNotification();
        navigation.goBack();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Nose pudieron registrar los datos",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView style={styles.content}>
      <ImagePet formik={formik} />
      <AddPetForm formik={formik} />
      <UploadImagesForm formik={formik} />

      <Button
        title="Buscar dueño"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </KeyboardAwareScrollView>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Nueva mascota en adopcion",
      body: "Hay un nuevo amigo para adoptar",
      data: { data: "goes here" },
    },
    trigger: null,
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
