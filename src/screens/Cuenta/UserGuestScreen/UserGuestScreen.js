import React from "react";
import { View, Text } from "react-native";
import { styles } from "./UserGuestScreen.styles";
import { Image, Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

import { screen } from "../../../utils";

export function UserGuestScreen() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.cuenta.login);
  };

  return (
    <View style={styles.content}>
      <Image
        style={styles.image}
        source={require("../../../../assets/petCo.png")}
      />
      <Text style={styles.titulo}>PETCONNECT</Text>
      <View style={styles.slogan}>
        <Text style={styles.textRed}>Descarga</Text>
        <Text style={styles.texto}>, adopta y ama</Text>
      </View>

      <Button
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        title="Comienza a adoptar"
        onPress={goToLogin}
      />
    </View>
  );
}
