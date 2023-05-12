import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
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
import { styles } from "./AdoptionsList.styles";

export function AdoptionsList() {
  const { uid } = getAuth().currentUser;
  const [pets, setPets] = useState(null);

  useEffect(async () => {
    (async () => {
      const PetRef = collection(db, "pets");

      const q = query(PetRef, where("idUser", "==", uid));

      const querySnapshot = await getDocs(q);
      let pet = [];
      querySnapshot.forEach((doc) => {
        pet.push(doc.data());
      });
      setPets(pet);
    })();
  }, []);

  if (!pets) return <Loading show text="Loading my pets" />;

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
          UP FOR ADOPTION
        </Text>
      </View>
    );

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {map(pets, (pet) => (
        <PetsLists key={pet.id} pet={pet} />
      ))}
    </ScrollView>
  );
}
