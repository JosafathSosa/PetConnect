import React from "react";
import { View, Text } from "react-native";
import { Input, Icon, Button } from "@rneui/base";
import Toast from "react-native-toast-message";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";

import { initialValues, validationSchema } from "./ChangeUserName.data";

export function ChangeUserName(props) {
  const { onClose, onReload } = props;

  const formk = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { displayName } = formValue;

        const currentUser = getAuth().currentUser;

        await updateProfile(currentUser, { displayName });

        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "No se pudo cambiar el nombre",
        });
      }
    },
  });
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "500",
          marginBottom: 30,
          marginTop: 10,
        }}
      >
        Cambiar nombre y apellido
      </Text>
      <Input
        placeholder="Nombre y apellidos"
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
        }}
        onChangeText={(text) => formk.setFieldValue("displayName", text)}
        errorMessage={formk.errors.displayName}
      />
      <Button
        title="Guardar nombre"
        containerStyle={{ marginBottom: 10 }}
        buttonStyle={{
          backgroundColor: "#F8C471",
          width: "80%",
          marginLeft: 35,
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={formk.handleSubmit}
        loading={formk.isSubmitting}
      />
    </View>
  );
}
