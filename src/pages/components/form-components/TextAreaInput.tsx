import React from "react";

export interface TextAreaProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, onChange, className }) => {
  return (
    <div className="text-area my-2 flex items-center">
      <label className="mr-2">{label}</label>
      <textarea className={className} onChange={onChange} />
    </div>
  );
};

export default TextArea;
