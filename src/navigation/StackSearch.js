import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { screen } from "../utils/screenName";
import { SearchScreen } from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();
export function StackSearch() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.search.search}
        component={SearchScreen}
        options={{
          title: "Buscar Mascota",
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: "#F8C471" },
        }}
      />
    </Stack.Navigator>
  );
}
