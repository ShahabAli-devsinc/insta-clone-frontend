// components/shared/InputField.tsx
import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
      />
    </div>
  );
};

export default InputField;
