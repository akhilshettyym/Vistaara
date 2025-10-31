import * as Yup from "yup";

export const emailSchema = Yup.string()
    .required("Email is required")
    .email("Invalid Email Format");

export const passwordSchema = Yup.string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters long");

export const signupSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required")
        .max(15, "Name must be under 15 characters"),
    email: emailSchema,
    password: passwordSchema,
});

export const signinSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
});