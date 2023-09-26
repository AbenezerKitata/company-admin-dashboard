import React from "react";

export interface TextInputProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  onChange,
  className,
  type = "text",
}) => {
  return (
    <div className="text-input my-2 flex items-center">
      <label className="mr-2">{label}</label>
      <input type={type} className={className} onChange={onChange} />
    </div>
  );
};

export default TextInput;
