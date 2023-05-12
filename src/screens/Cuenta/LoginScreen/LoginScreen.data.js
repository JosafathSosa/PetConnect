import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El correo no es valido")
      .required("Se necesita un correo"),
    password: Yup.string().required("Se necesita una contraseña"),
  });
}
