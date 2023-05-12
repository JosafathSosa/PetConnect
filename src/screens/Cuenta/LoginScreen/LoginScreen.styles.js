import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginLeft: 100,
    marginBottom: 50,
  },
  content: {
    marginTop: 150,
    marginHorizontal: 40,
  },

  titulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  btnContainer: {
    borderRadius: 10,
  },

  btn: {
    backgroundColor: "#F8C471",
  },

  mainTitle: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#F8C471",
  },

  loginForm: {
    marginTop: 10,
  },

  formTitle: {
    fontSize: 18,
  },

  input: {
    width: "100%",
    marginTop: 20,
  },

  pass: {
    width: "100%",
    marginTop: 20,
  },

  btnContainerLogin: {
    width: "90%",
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 10,
  },

  btnLogin: {
    backgroundColor: "#F8C471",
  },
});
