
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
    <div
      className={`
      p-[2px] rounded-full inline-block
      ${selected
          ? 'bg-gradient-to-r from-[#9A77FF] to-[#214BFF]'
          : 'bg-white border border-[#E8E8EA]'}
    `}
    >
      <button
        onClick={onClick}
        className={`
        flex items-center px-4 py-2 rounded-full transition-all text-sm
        bg-white w-full h-full
        ${selected ? 'text-[#214BFF] font-semibold' : 'text-gray-700 font-medium'}
      `}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="chip icon"
            width={20}
            height={20}
            className="mr-2"
          />
        )}
        {children}
      </button>
    </div>
  );
}
