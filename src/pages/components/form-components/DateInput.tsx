import React from "react";

export interface DateInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={`date-input ${className}`}>
      <label>{label}</label>
      <input type="date" value={value} onChange={onChange} />
    </div>
  );
};

export default DateInput;
