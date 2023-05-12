import React, { useState } from "react";
import { View, Text } from "react-native";

import { styles } from "./AddPetForm.styles";
import { Input, Icon, Button } from "@rneui/base";
import { MapForm } from "../../Adopciones/MapForm";

export function AddPetForm(props) {
  const { formik } = props;

  const [showMap, setShowMap] = useState(false);

  const abrirCerrarMapa = () => setShowMap((prevState) => !prevState);
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={styles.title}>Agrega los datos de tu mascota</Text>

      <View style={styles.form}>
        <Input
          placeholder="Nombre de la mascota"
          containerStyle={styles.formData}
          onChangeText={(text) => formik.setFieldValue("nombre", text)}
          errorMessage={formik.errors.nombre}
        />
        <Input
          placeholder="Raza"
          onChangeText={(text) => formik.setFieldValue("raza", text)}
          errorMessage={formik.errors.raza}
        />
        <Input
          placeholder="Ubicación"
          onChangeText={(text) => formik.setFieldValue("direccion", text)}
          errorMessage={formik.errors.direccion}
          rightIcon={
            <Icon
              type="material-community"
              name="map-marker-radius"
              onPress={abrirCerrarMapa}
              color={getColoIconMap(formik)}
            />
          }
        />
        <Input
          placeholder="Edad"
          onChangeText={(text) => formik.setFieldValue("edad", text)}
          errorMessage={formik.errors.edad}
        />

        <Input
          placeholder="Sexo"
          onChangeText={(text) => formik.setFieldValue("sexo", text)}
          errorMessage={formik.errors.sexo}
        />
        <Input
          placeholder="Número telefonico"
          onChangeText={(text) => formik.setFieldValue("telefono", text)}
          errorMessage={formik.errors.telefono}
        />
      </View>
      <MapForm show={showMap} close={abrirCerrarMapa} formik={formik} />
    </View>
  );
}

const getColoIconMap = (formik) => {
  if (formik.errors.ubicacion) {
    return "#ff0000";
  } else if (formik.values.ubicacion) {
    return "#00a680";
  } else {
    return "#c2c2c2";
  }
};
