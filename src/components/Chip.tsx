
import Image from "next/image";

interface ChipProps {
  children: string;
  imageSrc?: string;
  selected?: boolean;
  onClick?: () => void;
}


export default function Chip({
  children,
  imageSrc,
  selected = false,
  onClick
}: ChipProps) {

  return (
    <button
      onClick={onClick}
      className={`
      flex items-center px-4 py-2 rounded-full border transition-all text-sm font-medium
      ${selected
          ? 'border-[#9A77FF] text-[#9A77FF] bg-[#F1EBFF]'
          : 'border-gray-200 text-gray-700 bg-white hover:border-[#9A77FF] hover:text-[#9A77FF]'}
    `}
    >
      {imageSrc ?
        <Image
          src={imageSrc}
          alt="chip icon"
          width={20}
          height={20}
          className="mr-2"
        />
        : null}
      {children}
    </button>
  );
}
