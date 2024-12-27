import * as Yup from "yup";

export const RegistrationValidationSchema = Yup.object({
  username: Yup.string()
    .min(5, "Username must be at least 5 characters long")
    .max(14, "Username must be at most 15 characters long")
    .required("Username is required"),

  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    })
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
