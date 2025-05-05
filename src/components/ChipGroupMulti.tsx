import Chip from "./Chip";
import React, { useState } from "react";

interface ChipItem {
  label: string;
  imageSrc?: string;
}

interface ChipGroupMultiProps {
  items: ChipItem[];
  values?: string[];
  onChange?: (values: string[]) => void;
  className?: string;
}

export default function ChipGroupMulti({ items, values, onChange, className = "flex gap-3 flex-wrap" }: ChipGroupMultiProps) {
  const [internalValues, setInternalValues] = useState<string[]>(values || []);
  const selectedValues = values !== undefined ? values : internalValues;

  const toggleValue = (label: string) => {
    const isSelected = selectedValues.includes(label);
    const newValues = isSelected
      ? selectedValues.filter((v) => v !== label)
      : [...selectedValues, label];

    if (values === undefined) setInternalValues(newValues);
    onChange?.(newValues);
  };

  return (
    <div className={className}>
      {items.map(({ label, imageSrc }) => (
        <Chip
          key={label}
          imageSrc={imageSrc}
          selected={selectedValues.includes(label)}
          onClick={() => toggleValue(label)}
        >
          {label}
        </Chip>
      ))}
    </div>
  );
}
