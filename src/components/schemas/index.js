import * as Yup from "yup";

const logInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const signUpSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const profileSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Min 3 Latter required")
    .required("Full name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be 11 digits")
    .required("Phone number is required"),
  city: Yup.string().required("City is required"),
  profileImage: Yup.mixed().required("Profile image is required"),
});

export { logInSchema, signUpSchema, profileSchema };
