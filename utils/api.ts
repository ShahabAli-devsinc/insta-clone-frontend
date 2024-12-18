"use client";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// API function for logging in
export const apiLogin = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed, please check your credentials");
  }
};

// API function for registering a new user
export const apiRegister = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Registration failed, please try again");
  }
};

export const apiUpdateProfile = async (updateData: {
  username?: string;
  bio?: string;
  profilePicture?: string;
}) => {
  try {
    const response = await axios.patch(`${API_URL}/users/update`, updateData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update profile, please try again");
  }
};
