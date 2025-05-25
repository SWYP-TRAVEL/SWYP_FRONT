interface TextFieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  variant?: "filled" | "outlined";
  disabled?: boolean;
}

export default function TextField({
  placeholder = "",
  value,
  onChange,
  variant = "outlined",
  ...otherProps
}: TextFieldProps) {
  const baseClass =
    "w-full h-[66px] p-[20px] text-sm rounded-xl outline-none resize-none transition-colors";

  const variantClass =
    variant === "filled"
      ? "bg-gray-50 border border-transparent focus:border-[#9A77FF]"
      : "bg-white border border-gray-300 focus:border-[#9A77FF]";

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${baseClass} ${variantClass}`}
      rows={4}
      {...otherProps}
    />
  );
}
