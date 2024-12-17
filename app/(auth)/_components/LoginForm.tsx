"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/features/authSlice";
import { useRouter } from "next/navigation";
import { apiLogin } from "../../../utils/api";
import { User } from "@/types/types";
import Link from "next/link";
import Button from "@/components/shared/Button";
import InputField from "@/components/shared/InputField";
import { toast } from "sonner";
import { setUserProfile } from "@/store/features/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiLogin({ username, password });
      const user: User = {
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
        bio: response.user.bio,
        profile_picture: response.user.profile_picture,
      };

      dispatch(setUser(user));
      dispatch(setUserProfile(user));
      toast("Logged in successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      toast("Login failed. Please check your credentials.");
      // setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl text-gray-800">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Login
      </h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <InputField
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" loading={loading}>
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
