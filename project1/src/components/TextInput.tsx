import React from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "",
  required = false,
  multiline = false,
  rows = 3,
  className = "w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500",
}) => {
  if (multiline) {
    return (
      <textarea
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={rows}
      />
    );
  }
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  );
};

export default TextInput;
