import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";

//Datos de los bottom tabs
import { screen } from "../utils";

//STACKS
import { StackCuenta } from "./StackCuenta";
import { StackAdopciones } from "./StackAdopciones";
import { StackCentros } from "./StackCentros";
import { StackSearch } from "./StackSearch";

const Tab = createBottomTabNavigator();
export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}
    >
      <Tab.Screen
        name={screen.adopciones.tab}
        component={StackAdopciones}
        options={{ title: "Adoptions" }}
      />
      <Tab.Screen
        name={screen.search.tab}
        component={StackSearch}
        options={{ title: "Search" }}
      />
      <Tab.Screen
        name={screen.cuenta.tab}
        component={StackCuenta}
        options={{ title: "Account" }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;
  if (route.name === screen.adopciones.tab) {
    iconName = "dog-side";
  }
  if (route.name === screen.cuenta.tab) {
    iconName = "home-outline";
  }
  if (route.name === screen.search.tab) {
    iconName = "magnify";
  }

  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}
