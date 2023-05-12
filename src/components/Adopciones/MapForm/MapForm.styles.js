import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 550,
  },

  mapOptions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  mapContainerSave: {
    paddingLeft: 5,
    width: "50%",
  },

  mapSave: {
    backgroundColor: "#00a680",
  },

  mapContainerCancel: {
    marginRight: 5,
    width: "50%",
  },

  mapCancel: {
    backgroundColor: "red",
  },
});
