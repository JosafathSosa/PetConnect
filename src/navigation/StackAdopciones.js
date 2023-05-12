import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { screen } from "../utils";
import { Icon } from "@rneui/base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Pantallas que van al stack de adopciones
import { AdopcionesScreen } from "../screens/Adopciones/AdopcionesScreen";
import { AddPet } from "../screens/Adopciones/AddPet";
import { Adopcion } from "../screens/Adopciones/Adopcion";
import { Donate } from "../components/Adopcion/Donate";

const Stack = createNativeStackNavigator();
export function StackAdopciones() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.adopciones.adopciones}
        component={AdopcionesScreen}
        options={{
          title: "Adopciones",
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerStyle: { backgroundColor: "#F8C471" },
          headerRight: () => <TouchableOpacity></TouchableOpacity>,
        }}
      />
      <Stack.Screen
        name={screen.adopciones.agregar}
        component={AddPet}
        options={{
          title: "Agregar Mascota",
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: "#F8C471",
        }}
      />
      <Stack.Screen
        name={screen.adopciones.mascota}
        component={Adopcion}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerRight: () => (
            <TouchableOpacity>
              <Icon
                type="material-community"
                name="heart"
                size={30}
                color="red"
              />
            </TouchableOpacity>
          ),
          headerTintColor: "#F8C471",
        }}
      />
      <Stack.Screen
        name={screen.adopciones.donar}
        component={Donate}
        options={{
          title: "Donate",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#F8C471" },
        }}
      />
    </Stack.Navigator>
  );
}
