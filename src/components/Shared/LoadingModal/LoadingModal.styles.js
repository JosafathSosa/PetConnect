import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    height: 150,
    width: 200,
    backgroundColor: "orange",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
  },

  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "white",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
