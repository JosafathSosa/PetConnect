import * as Yup from "yup"

export function initialValues(){
    return {
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    }
}

export function validationSchema() {
    return Yup.object({
        password: Yup.string().required("La contraseña es requerida"),
        newPassword: Yup.string().required("La nueva contraseña es requerida"),
        confirmNewPassword: Yup.string().required("Confirma la contraseña").oneOf([Yup.ref("newPassword")], "Las contraseñas tienen que ser iguales")
    })
}