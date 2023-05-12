import React from "react";
import { View } from "react-native";
import { Image, Icon, Text, Button, Divider } from "@rneui/base";
import { DateTime } from "luxon";
import { styles } from "./DatosMascota.styles";
import { size } from "lodash";
import { Map } from "../../../components/Shared/Map";
import call from "react-native-phone-call";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";
import { loadScript } from "@paypal/paypal-js";

export function DatosMascota(props) {
  const { mascota } = props;
  const navigation = useNavigation();

  let paypal;

  const openPaypal = async () => {
    try {
      paypal = await loadScript({
        "client-id":
          "AZKtaRvE_7fokyipfaFuJThuX8PChUxpfUPGVn9e87JB-N06pnPb8154EaRDvjkqiYdpGm5TGUCKu19u",
        currency: "EUR",
        components: "buttons,marks,messages",
      });
      console.log(paypal);
    } catch (error) {
      console.error("failed");
    }

    if (paypal) {
      try {
        await paypal.Buttons().render(<View></View>);
      } catch (error) {
        console.error("failed buttons");
      }
    }
  };

  if (mascota !== null) {
    const fecha = new Date(mascota.fechaCreacion.seconds * 1000);

    fechaActual = DateTime.fromISO(fecha.toISOString()).toFormat("yyyy/LL/dd ");

    const mandarLLamar = () => {
      const args = {
        number: mascota.telefono,
        prompt: true,
      };
      call(args);
    };

    const goToDonateScreen = () => {
      navigation.navigate(screen.adopciones.donar);
    };

    return (
      <View style={{ backgroundColor: "white" }}>
        <Image source={{ uri: mascota.imagenes[0] }} style={styles.image} />
        <View style={styles.datos}>
          <Text style={styles.titulo}>{mascota.nombre}</Text>
          <Text style={styles.subTitle}>Datos de la mascota:</Text>
          <Divider width={1} />
          <Text style={styles.dato}>
            <Icon type="material" name="pets" containerStyle={styles.icon} />
            Raza: {mascota.raza}
          </Text>
          <Text style={styles.dato}>
            <Icon
              type="material-community"
              name="cake"
              containerStyle={styles.icon}
            />
            Edad: {mascota.edad}
          </Text>
          <Text style={styles.dato}>
            <Icon
              type="material-community"
              name="gender-male"
              containerStyle={styles.icon}
            />
            Sexo: {mascota.sexo}
          </Text>
          <Text style={styles.dato}>
            <Icon
              type="material-community"
              name="city"
              containerStyle={styles.icon}
            />
            Direccion: {mascota.direccion}
          </Text>
          <Text style={styles.dato}>
            <Icon
              type="material-community"
              name="update"
              containerStyle={styles.icon}
            />
            Publicado: {fechaActual}
          </Text>
          <Text style={styles.dato}>
            <Icon
              type="material-community"
              name="map-marker"
              containerStyle={styles.icon}
            />
            Ubicacion:{" "}
          </Text>
        </View>

        <Map location={mascota.ubicacion} name={mascota.nombre} />
        <View style={styles.btnView}>
          <Button
            title="Contactar"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            icon={{
              type: "material-community",
              name: "phone",
              styles: styles.icon,
              color: "white",
            }}
            onPress={mandarLLamar}
          />
          <Button
            title="Donar"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            icon={{
              type: "material-community",
              name: "cash",
              styles: styles.icon,
              color: "white",
            }}
            onPress={openPaypal}
          />
        </View>
      </View>
    );
  }
}
