// import * as Yup from "yup";

// export const emailSchema = Yup.string()
//     .required("Email is required")
//     .email("Invalid Email Format");

// export const passwordSchema = Yup.string()
//     .required("Password is required")
//     .min(7, "Password must be at least 7 characters long");

// export const signupSchema = Yup.object().shape({
//     name: Yup.string()
//         .required("Name is required")
//         .max(15, "Name must be under 15 characters"),
//     email: emailSchema,
//     password: passwordSchema,
// });

// export const signinSchema = Yup.object().shape({
//     email: emailSchema,
//     password: passwordSchema,
// });
import * as Yup from "yup";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const emailSchema = Yup.string()
  .required("Email is required")
  .matches(EMAIL_REGEX, "Invalid email format")
  .max(254, "Email too long")
  .trim();

export const passwordSchema = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password too long (max 72 chars for bcrypt)")
  .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  .matches(/[a-z]/, "Must contain at least one lowercase letter")
  .matches(/[0-9]/, "Must contain at least one number")
  .matches(/[^A-Za-z0-9]/, "Must contain at least one special character");

const COMMON_PASSWORDS = ["password", "12345678", "qwerty", "admin123"];

export const strongPasswordSchema = passwordSchema.test(
  "not-common",
  "This password is too common",
  (value) => !value || !COMMON_PASSWORDS.includes(value.toLowerCase())
);

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name too short")
    .max(30, "Name too long")
    .matches(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters")
    .trim(),

  email: emailSchema,

  password: strongPasswordSchema,

  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const signinSchema = Yup.object().shape({
  email: emailSchema,
  password: Yup.string().required("Password is required"),
});