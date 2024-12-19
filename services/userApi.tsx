import axiosInstance from "@/config/base";

// Update Profile function
export const apiUpdateProfile = async (updateData: {
  username?: string;
  bio?: string;
  profilePicture?: string;
}) => {
  try {
    const response = await axiosInstance.patch("/users/update", updateData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update profile, please try again");
  }
};
