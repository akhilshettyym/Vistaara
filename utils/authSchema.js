import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").max(15, "Name must be under 15 characters"),
    email: Yup.string().required("Email is required").email("Invalid Email Format"),
    password: Yup.string().required("Password is required").min(7, "Password must be at least 7 characters long")
});

export default validationSchema;