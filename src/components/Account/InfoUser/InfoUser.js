import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Avatar } from "@rneui/base";

import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { styles } from "./InfoUser.styles";
import { async } from "@firebase/util";

export function InfoUser(props) {
  const { setLoading, setLoadingText } = props;
  const { uid, photoURL, displayName, email } = getAuth().currentUser;

  const [avatar, setAvatar] = useState(photoURL);

  //console.log(uid);

  const cambiarAvatar = async () => {
    console.log("Hola");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      //console.log(result.assets[0].uri);
      subirImagen(result.assets[0].uri);
    }
  };

  const subirImagen = async (uri) => {
    setLoadingText("Cambiando Avatar");
    setLoading(true);

    //Obtiene la imgaen
    const response = await fetch(uri);
    const blob = await response.blob();

    //hace referemcia  a la carpeta donde quiero almacenar
    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);

    //Subo la imagen
    uploadBytes(storageRef, blob).then((snap) => {
      updatePhotoUrl(snap.metadata.fullPath);
    });
  };

  //Funcion que actualiza el url de la imagen
  const updatePhotoUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);

    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: imageUrl });

    console.log(imageUrl);
    setAvatar(imageUrl);
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.displayName}>{displayName || "Anonimo"}</Text>
        <Text>{email}</Text>
      </View>
      <Avatar
        size={110}
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: avatar }}
      >
        <Avatar.Accessory size={30} onPress={cambiarAvatar} />
      </Avatar>
    </View>
  );
}
