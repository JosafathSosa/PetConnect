import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SearchBar, ListItem, Icon, Avatar } from "@rneui/base";
import { Loading } from "../components/Shared/Loading";
import { size, map } from "lodash";
import {
  collection,
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { screen } from "../utils/screenName";
import { useNavigation } from "@react-navigation/native";

export function SearchScreen() {
  const [searchText, setSearchText] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "pets"),
        orderBy("raza"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(3)
      );
      const qSnap = await getDocs(q);
      const data = qSnap.docs.map((item) => item.data());

      setSearchResults(data);
    })();
  }, [searchText]);

  const goToAdoptionInfo = (item) => {
    navigation.navigate(screen.adopciones.tab, {
      screen: screen.adopciones.mascota,
      params: {
        id: item,
      },
    });
  };

  return (
    <>
      <SearchBar
        placeholder="Busca mascota por raza"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        round
        containerStyle={{
          backgroundColor: "#F8C471",
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{
          backgroundColor: "white",
        }}
        inputStyle={{ color: "black" }}
      />

      <ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          flex: 1,
        }}
      >
        {size(searchResults) === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20, color: "orange" }}>
              No se han encontrado resultados
            </Text>
          </View>
        ) : (
          map(searchResults, (item) => {
            return (
              <ListItem
                key={item.id}
                bottomDivider
                onPress={() => goToAdoptionInfo(item.id)}
              >
                <Avatar
                  source={{ uri: item.imagenes[0] }}
                  containerStyle={{ width: 100, height: 100 }}
                  rounded
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: "bold", fontSize: 20 }}>
                    {item.raza}
                  </ListItem.Title>
                </ListItem.Content>
                <Icon type="material-community" name="chevron-right" />
              </ListItem>
            );
          })
        )}
      </ScrollView>
    </>
  );
}
