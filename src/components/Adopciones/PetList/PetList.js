import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image, Divider } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

import { styles } from "./PetList.styles";

export function PetList(props) {
  const { mascotas } = props;

  const navigation = useNavigation();

  const verMascota = (mascota) => {
    navigation.navigate(screen.adopciones.mascota, { id: mascota.id });
  };

  return (
    <View style={{ marginTop: 100 }}>
      <FlatList
        data={mascotas}
        renderItem={(doc) => {
          const mascota = doc.item;
          return (
            <TouchableOpacity onPress={() => verMascota(mascota)}>
              <View style={{ flexDirection: "row", margin: 20 }}>
                <Image
                  source={{ uri: mascota.imagenes[0] }}
                  style={styles.image}
                />
                <View style={styles.datos}>
                  <Text style={styles.nombre}>{mascota.nombre}</Text>

                  <Text style={{ marginTop: 10 }}>Raza: {mascota.raza}</Text>
                  <Text style={{ marginTop: 5 }}>Edad: {mascota.edad}</Text>
                  <Text style={{ marginTop: 5 }}>
                    Direccion: {mascota.direccion}
                  </Text>
                  <Text style={{ marginTop: 5 }}>Sexo: {mascota.sexo}</Text>
                </View>
              </View>
              <Divider width={1} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
