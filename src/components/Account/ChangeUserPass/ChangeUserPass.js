import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input, Button, Icon } from "@rneui/base";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import { Formik, useFormik } from "formik";
import Toast from "react-native-toast-message";

import { initialValues, validationSchema } from "./ChangeUserPass.data";
import { styles } from "./ChangeUserPass.styles";

export function ChangeUserPass(props) {
  const { onClose } = props;
  const [showPass, setShowPass] = useState(null);

  const showHiddenPass = () => setShowPass((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;

        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          formValue.password
        );

        reauthenticateWithCredential(currentUser, credentials);
        await updatePassword(currentUser, formValue.newPassword);
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "No se pudo cambiar la contraseña",
        });
      }
    },
  });

  return (
    <View style={styles.Content}>
      <Text style={styles.title}>Cambiar contraseña</Text>
      <View style={styles.Form}>
        <Input
          placeholder="Contraseña"
          secureTextEntry={showPass ? true : false}
          rightIcon={{
            type: "material-community",
            name: showPass ? "eye-outline" : "eye-off-outline",
            onPress: showHiddenPass,
          }}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          errorMessage={formik.errors.password}
        />
        <Input
          placeholder="Nueva contraseña "
          secureTextEntry={showPass ? true : false}
          rightIcon={{
            type: "material-community",
            name: showPass ? "eye-outline" : "eye-off-outline",
            onPress: showHiddenPass,
          }}
          onChangeText={(text) => formik.setFieldValue("newPassword", text)}
          errorMessage={formik.errors.newPassword}
        />
        <Input
          placeholder="Confirmar contraeña"
          secureTextEntry={showPass ? true : false}
          rightIcon={{
            type: "material-community",
            name: showPass ? "eye-outline" : "eye-off-outline",
            onPress: showHiddenPass,
          }}
          onChangeText={(text) =>
            formik.setFieldValue("confirmNewPassword", text)
          }
          errorMessage={formik.errors.confirmNewPassword}
        />
      </View>
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
