import React from "react";

interface UserProfileStateItemProps {
  value: string | number;
  label: string;
}

const UserProfileStateItem: React.FC<UserProfileStateItemProps> = ({
  value,
  label,
}) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-semibold text-gray-900">{value}</span>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default UserProfileStateItem;
