import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Input, Icon, Button } from "@rneui/base";
import { useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { initialValues, validationSchema } from "./RegisterScreen.data";

import { screen } from "../../../utils";
import { styles } from "./RegisterScreen.styles";

export function RegisterScreen() {
  const [showPass, setShowPass] = useState(false);

  const showPassword = () => setShowPass((dato) => !dato);

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.cuenta.cuenta);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al registrar usuario",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <Image
        source={require("../../../../assets/petCo.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.mainTitle}>PetConnect</Text>
        <Text style={styles.create}>Create an Account</Text>
        <View style={styles.form}></View>
        <Input
          placeholder="Emal"
          containerStyle={styles.email}
          rightIcon={{ type: "material-community", name: "email" }}
          errorMessage={formik.errors.email}
          onChangeText={(text) => formik.setFieldValue("email", text)}
        />
        <Input
          placeholder="Contraseña"
          containerStyle={styles.pass}
          rightIcon={{
            type: "material-community",
            name: showPass ? "eye-outline" : "eye-off-outline",
            onPress: showPassword,
          }}
          errorMessage={formik.errors.password}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          secureTextEntry={showPass ? false : true}
        />
        <Input
          placeholder="Repetir contraseña"
          secureTextEntry={showPass ? false : true}
          errorMessage={formik.errors.repeatPassword}
          rightIcon={{
            type: "material-community",
            name: showPass ? "eye-outline" : "eye-off-outline",
            onPress: showPassword,
          }}
          onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        />
        <Button
          title="Crear Cuenta"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
