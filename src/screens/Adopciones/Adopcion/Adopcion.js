import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";

import { styles } from "./Adopcion.styles";
import { Image, Icon } from "@rneui/base";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
import { DatosMascota } from "../../../components/Adopcion";
import { Map } from "../../../components/Shared/Map";

export function Adopcion(props) {
  const { route } = props;
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    onSnapshot(doc(db, "pets", route.params.id), (doc) => {
      //console.log(route.params.id);
      setMascota(doc.data());
    });
  }, [route.params.id]);

  return (
    <ScrollView>
      <DatosMascota mascota={mascota} />
    </ScrollView>
  );
}
