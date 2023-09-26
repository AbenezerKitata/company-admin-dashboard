import React from "react";

export interface CheckboxProps {
  label: string;
  value: { [key: string]: string };
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  selectedValues,
  onChange,
  className,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxLabel = event.target.value;

    const updatedValues = selectedValues.includes(checkboxLabel)
      ? selectedValues.filter((v) => v !== checkboxLabel)
      : [...selectedValues, checkboxLabel];

    onChange(updatedValues);
  };

  const isChecked = selectedValues.includes(label);

  return (
    <div className={`checkbox ${className}`}>
      <label>
        <input
          type="checkbox"
          value={label}
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        {value[label]}
      </label>
    </div>
  );
};

export default Checkbox;
