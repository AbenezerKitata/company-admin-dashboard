import React from "react";

export interface RadioGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  className,
}) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={`services-list ${className}`}>
      <label>{label}</label>
      {options.map((option) => (
        <div key={option.value} className="radio-option">
          <input
            type="radio"
            value={option.value}
            checked={option.value === selectedValue}
            onChange={handleRadioChange}
          />
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
