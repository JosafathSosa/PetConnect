import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { Icon } from "@rneui/base";

import { screen, db } from "../../utils";
import { LoadingModal } from "../../components/Shared/LoadingModal";

import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { PetList } from "../../components/Adopciones";

import { styles } from "./Adopciones.styles";

export function AdopcionesScreen() {
  const [currentUser, setCurrentUser] = useState(null);
  const [mascotas, setMascotas] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  });

  useEffect(() => {
    const q = query(collection(db, "pets"), orderBy("fechaCreacion", "desc"));

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setMascotas(data);
    });
  }, []);

  const goToAddPet = () => {
    navigation.navigate(screen.adopciones.agregar);
  };

  return (
    <View style={styles.content}>
      {!mascotas ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <PetList mascotas={mascotas} />
      )}

      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="orange"
          containerStyle={styles.btnContainer}
          onPress={goToAddPet}
        />
      )}
    </View>
  );
}
