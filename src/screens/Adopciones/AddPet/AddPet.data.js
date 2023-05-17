import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    raza: "",
    direccion: "",
    ubicacion: "",
    edad: "",
    sexo: "",
    telefono: "",
    imagenes: [],
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required("El nombre de la mascota es obligatorio"),
    raza: Yup.string().required("La raza es obligatoria"),
    direccion: Yup.string().required("La direccion es requerida"),
    ubicacion: Yup.object().required("La ubicacion es necesario"),
    edad: Yup.string().required("La edad es necesaria"),
    sexo: Yup.string().required("El sexo es necsario"),
    telefono: Yup.string()
      .max(10, "Se requieren maximo 10 digitos")
      .required("El telefono es necesario"),
    imagenes: Yup.array()
      .min(1, "Se requiere al menos una foto")
      .required("La imagen es requerida"),
  });
}
