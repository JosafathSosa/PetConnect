import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "../../../utils/firebase";
import { size, map } from "lodash";
import {
  doc,
  getDocs,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Icon } from "@rneui/base";
import { PetsLists } from "../../../components/Account/PetsLists";
import { Loading } from "../../../components/Shared/Loading";
import { screen } from "../../../utils/screenName";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./AdoptionsList.styles";

export function AdoptionsList() {
  const navigation = useNavigation();
  const { uid } = getAuth().currentUser;
  const [pets, setPets] = useState(null);

  const verMascota = (mascota) => {
    navigation.navigate(screen.adopciones.mascota, { id: mascota.id });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const PetRef = collection(db, "pets");
        const q = query(PetRef, where("idUser", "==", uid));
        const querySnapshot = await getDocs(q);
        let pet = [];
        querySnapshot.forEach((doc) => {
          pet.push(doc.data());
        });
        setPets(pet);
      } catch (error) {
        // Manejo de errores, por ejemplo:
        console.error("Error fetching pets:", error);
      }
    };

    fetchData(); // Llamada inmediata a la función fetchData

    // No devuelvas nada aquí, ya que no necesitas limpieza
  }, []); // [] para indicar que este efecto se ejecuta solo una vez al montar el componente

  if (!pets) return <Loading show text="Cargando mis mascotas" />;

  if (size(pets) === 0)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Icon
          type="material-community"
          name="cancel"
          size={120}
          color="orange"
        />
        <Text style={{ fontSize: 20, marginTop: 20, color: "#F8C471" }}>
          ¡Da en adopacion!
        </Text>
      </View>
    );

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {map(pets, (pet) => (
        <TouchableOpacity onPress={() => verMascota(pet)}>
          <PetsLists key={pet.id} pet={pet} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
