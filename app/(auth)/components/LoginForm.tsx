"use client";

import { useDispatch } from "react-redux";
import { setUser } from "../../../store/features/authSlice";
import { setUserProfile } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import { AuthApi } from "@/services/authApi";
import { User } from "@/types/types";
import Link from "next/link";
import Button from "@/components/shared/Button";
import InputField from "@/components/shared/InputField";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginValidationSchema } from "../login/ValidationSchema/LoginValidationSchema";

interface FormValues {
  username: string;
  password: string;
  general?: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const validationSchema = LoginValidationSchema;

  // Initialize Formik
  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
      general: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await AuthApi.login({
          username: values.username,
          password: values.password,
        });
        const user: User = {
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          bio: response.user.bio,
          profilePicture: response.user.profilePicture,
        };

        dispatch(setUser(user));
        dispatch(setUserProfile(user));
        toast("Logged in successfully!");
        router.push("/dashboard");
      } catch (error: any) {
        // Handle specific error messages from the API if available
        if (error.response?.data?.message) {
          setErrors({ general: error.response.data.message });
        } else {
          setErrors({
            general: "Login failed. Please check your credentials.",
          });
        }
        toast("Login failed. Please check your credentials.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl text-gray-800">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Login
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          id="username"
          name="username"
          label="Username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.username && formik.errors.username
              ? formik.errors.username
              : ""
          }
        />
        <InputField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
        />

        <Button type="submit" loading={formik.isSubmitting}>
          Login
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600">Don't have an account? </span>
        <Link href="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
