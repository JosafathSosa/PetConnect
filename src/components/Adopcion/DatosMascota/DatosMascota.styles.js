import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 500,
  },

  datos: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },

  dato: {
    marginTop: 15,
    fontSize: 20,
  },

  subTitle: {
    fontSize: 22,
    marginBottom: 10,
    color: "gray",
  },

  icon: {
    marginRight: 10,
  },

  btnView: {
    marginTop: 30,
    marginBottom: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  btnContainer: {
    width: "35%",

    borderRadius: 10,
  },

  btn: {
    backgroundColor: "orange",
  },
});
