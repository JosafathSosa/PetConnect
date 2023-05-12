import React from "react";
import { View, Text } from "react-native";

import { Image } from "@rneui/base";
import { styles } from "./ImagePet.styles";

export function ImagePet(props) {
  const { formik } = props;

  const imagenPrincipal = formik.values.imagenes[0];
  return (
    <View style={styles.content}>
      <Image
        source={
          imagenPrincipal
            ? { uri: imagenPrincipal }
            : require("../../../../assets/coverAdd.jpg")
        }
        style={styles.image}
      />
    </View>
  );
}
