import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { Icon, Avatar, Text } from "@rneui/base";

import { v4 as uuidv4 } from "uuid";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as ImagePicker from "expo-image-picker";
import { styles } from "./UploadImagesForm.styles";
import { Formik } from "formik";

import { LoadingModal } from "../../Shared/LoadingModal";

import { map, filter } from "lodash";

export function UploadImagesForm(props) {
  const { formik } = props;

  const [isLoading, setiIsLoading] = useState(false);
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setiIsLoading(true);
      subirImagen(result.assets[0].uri);
    }
  };

  const subirImagen = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `mascotas/${uuidv4()}`);

    uploadBytes(storageRef, blob).then((snap) => {
      actualizarFotosMascotas(snap.metadata.fullPath);
    });
  };

  const actualizarFotosMascotas = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const image = await getDownloadURL(imageRef);
    formik.setFieldValue("imagenes", [...formik.values.imagenes, image]);
    setiIsLoading(false);
  };

  const removerImagen = (image) => {
    Alert.alert("Eliminar imagen", "¿Estas seguro de eliminar esta imagen?", [
      { text: "Cancelar", style: "Camncel" },
      {
        text: "Eliminar",
        onPress: () => {
          const result = filter(formik.values.imagenes, (img) => img !== image);
          formik.setFieldValue("imagenes", result);
        },
      },
      { cancelable: false },
    ]);
  };
  return (
    <>
      <ScrollView style={styles.viewImage} horizontal>
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
        {map(formik.values.imagenes, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyle}
            onPress={() => removerImagen(image)}
          />
        ))}
      </ScrollView>

      <Text style={styles.text}>{formik.errors.imagenes}</Text>
      <LoadingModal show={isLoading} text="Subiendo Imagen" />
    </>
  );
}
