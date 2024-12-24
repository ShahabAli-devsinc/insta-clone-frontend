"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { AuthApi } from "@/services/authApi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/shared/Button";
import InputField from "@/components/shared/InputField";
import { toast } from "sonner";
import { RegistrationValidationSchema } from "@/app/(auth)/register/ValidationSchema/RegisterationValidationScheme";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  general?: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const validationSchema = RegistrationValidationSchema;

  // Initialize Formik
  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    },
    validationSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setLoading(true);
      try {
        await AuthApi.register({
          username: values.username,
          email: values.email,
          password: values.password,
        });
        toast("Registration Successful!");
        router.push("/login");
      } catch (error: any) {
        if (error.response?.data?.message) {
          setErrors({ general: error.response.data.message });
        } else {
          setErrors({ general: "Registration failed. Please try again." });
        }
        toast("Registration failed. Please try again.");
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl text-gray-800">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Create an Account
      </h2>
      {formik.errors.general ? (
        <div className="text-red-500 text-center mb-4">
          {formik.errors.general}
        </div>
      ) : null}
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
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
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
        <InputField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ""
          }
        />

        <Button type="submit" loading={loading}>
          Register
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
