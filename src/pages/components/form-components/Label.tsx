import React from "react";

export interface LabelProps {
  label: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  label,

  className,
}) => {
  return (
    <div className="text-input my-2 flex items-center">
      <label className="mr-2">{label}</label>
    </div>
  );
};

export default Label;
