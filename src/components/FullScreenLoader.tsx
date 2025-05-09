import Text from "./Text";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-semantic-static-white z-50">
      <div className="flex space-x-2 mb-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full animate-bounce-dot`}
            style={{
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {/* 배경은 아래에서 제어 */}
          </div>
        ))}
      </div>

      <Text textStyle="title2" as="p" className="font-bold mt-[84px]">
        모먼티어가 맞춤 여행지를 열심히 고르고 있어요!
      </Text>
      <Text textStyle="heading2" className="font-semibold text-[#8c8c8c] mt-[20px]">
        잠시만 기다려주세요
      </Text>

      <style jsx>{`
        @keyframes bounce-dot {
          0%, 100% {
            transform: translateY(0);
            background-color: #e0e0e0;
          }
          50% {
            transform: translateY(-10px);
            background-color: #7c49ff;
          }
        }
      `}</style>
    </div>
  );
}
