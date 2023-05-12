import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";

//Pantallas que van en el stack de cuenta
import { RegisterScreen } from "../screens/Cuenta/RegisterScreen";
import { UserGuestScreen } from "../screens/Cuenta/UserGuestScreen";
import { AccountScreen } from "../screens/Cuenta/AccountScreen";
import { LoginScreen } from "../screens/Cuenta/LoginScreen";
import { AdoptionsList } from "../screens/Cuenta/AdoptionsList";

const Stack = createNativeStackNavigator();

export function StackCuenta() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.cuenta.cuenta}
        component={AccountScreen}
        options={{
          title: "PetConnect",
          headerBackTitleVisible: false,
          headerTransparent: true.valueOf,
          headerStyle: { backgroundColor: "#F8C471" },
        }}
      />
      <Stack.Screen
        name={screen.cuenta.login}
        component={LoginScreen}
        options={{
          title: "Iniciar Sesion",
          headerBackTitleVisible: false,

          headerStyle: { backgroundColor: "orange" },
        }}
      />
      <Stack.Screen
        name={screen.cuenta.register}
        component={RegisterScreen}
        options={{
          title: "Crea una cuenta",
          headerBackTitleVisible: false,

          headerStyle: { backgroundColor: "orange" },
        }}
      />
      <Stack.Screen
        name={screen.cuenta.adoptions}
        component={AdoptionsList}
        options={{
          title: "Mis mascotas",
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: "#F8C471" },
        }}
      />
    </Stack.Navigator>
  );
}
