import Chip from "./Chip";
import React, { useState } from "react";

interface ChipItem {
  label: string;
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
      {items.map(({ label, imageSrc }) => (
        <Chip
          key={label}
          imageSrc={imageSrc}
          selected={selectedValue === label}
          onClick={() => handleChange(label)}
        >
          {label}
        </Chip>
      ))}
    </div>
  );
}

