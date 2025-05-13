import Chip from "./Chip";
import React, { useState } from "react";

interface ChipItem {
  label: string;
  value: string;
  imageSrc?: string;
}

interface ChipGroupSingleProps {
  items: ChipItem[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function ChipGroupSingle({ items, value, onChange, className = "flex gap-3 flex-wrap" }: ChipGroupSingleProps) {
  const [internalValue, setInternalValue] = useState<string>(value || "");
  const selectedValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (value === undefined) setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={className}>
      {items.map(({ label, value: itemValue, imageSrc }) => (
        <Chip
          key={itemValue}
          imageSrc={imageSrc}
          selected={selectedValue === itemValue}
          onClick={() => handleChange(itemValue)}
        >
          {label}
        </Chip>
      ))}
    </div>
  );
}

