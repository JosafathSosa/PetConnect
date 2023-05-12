import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Image, Icon } from "@rneui/base";
import { doc, deleteDoc } from "firebase/firestore";
import { styles } from "./PetsList.styles";
import { db } from "../../../utils/firebase";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

export function PetsLists(props) {
  const { pet } = props;

  const navigation = useNavigation();

  const removePet = () => {
    Alert.alert("Remove Pet", "You want to remove this pet from the list?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancelled"),
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "pets", pet.id));
            Toast.show({
              text1: "Pet removed",
              position: "top",
              type: "success",
            });
          } catch (error) {
            console.log(error);
          }
          navigation.navigate(screen.cuenta.cuenta);
        },
      },
    ]);
  };

  if (pet !== null) {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image source={{ uri: pet.imagenes[0] }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.titile}>{pet.nombre} </Text>
          <Text style={styles.direccion}>{pet.raza}</Text>
          <Text style={styles.direccion}>{pet.sexo}</Text>
          <Text style={styles.direccion}>{pet.edad}</Text>
          <Text style={styles.direccion}>{pet.direccion}</Text>
        </View>
        <Icon
          type="material-icon"
          name="delete"
          size={30}
          onPress={removePet}
          color="red"
          iconStyle={styles.icon}
        />
      </View>
    );
  }
}
