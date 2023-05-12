import React, { useState } from "react";
import { View, Image } from "react-native";
import { Button, Text, Input, Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./LoginScreen.styles";

import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { initialValues, validationSchema } from "./LoginScreen.data";
import { screen } from "../../../utils";

import Toast from "react-native-toast-message";

export function LoginScreen() {
  const navigation = useNavigation();

  const [showPass, setShowPass] = useState(false);

  const showPassword = () => setShowPass((prevState) => !prevState);

  const goToRegister = () => {
    navigation.navigate(screen.cuenta.register);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.cuenta.cuenta);
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Usuario y/o contraseña incorrecta",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require("../../../../assets/petCo.png")}
        />
        <View style={styles.titulo}>
          <Text style={styles.mainTitle}>PetConnect</Text>
          <Button
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            title="Sing Up"
            onPress={goToRegister}
          ></Button>
        </View>
        <View style={styles.loginForm}>
          <Input
            containerStyle={styles.input}
            placeholder="Email"
            rightIcon={<Icon type="material-community" name="email" />}
            onChangeText={(text) => formik.setFieldValue("email", text)}
            errorMessage={formik.errors.email}
          />
          <Input
            containerStyle={styles.pass}
            placeholder="Password"
            secureTextEntry={showPass ? false : true}
            rightIcon={
              <Icon
                type="material-community"
                name="eye-outline"
                onPress={showPassword}
              />
            }
            onChangeText={(text) => formik.setFieldValue("password", text)}
            errorMessage={formik.errors.password}
          />
        </View>
        <Button
          title="Log In"
          containerStyle={styles.btnContainerLogin}
          buttonStyle={styles.btnLogin}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
