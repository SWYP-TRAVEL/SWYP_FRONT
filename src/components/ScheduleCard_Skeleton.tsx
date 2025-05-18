"use client";

type DayScheduleCardSkeletonProps = {
    count: number;
}

const DayScheduleCardSkeleton = ({ count }: DayScheduleCardSkeletonProps) => {

    return (
        <>
            <div className='h-[54px] rounded-[11px] animate-pulse bg-[#E8E8EA] flex items-center justify-end px-[24px] mb-2'>
                <img src="/icons/Chevron Down.svg" alt="expand" className="w-[28px] h-[28px]" />
            </div>
            {/* 아래영역을 count만큼 반복시킬거야 */}
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className='rounded-[16px] animate-pulse bg-[#F9F9F9] mb-2 flex'>
                    <div className="flex p-6 gap-4">
                        <div className="w-6 h-full flex flex-col items-center gap-2">
                            <img
                                src="/icons/Handle Desktop.svg"
                                alt="icon"
                                className="w-6 h-6 object-contain"
                            />
                        </div>

                        <div className="flex flex-col justify-between gap-2 w-[456px] h-[160px]">
                            <div className="bg-[#EEEEEE] rounded-[4px] w-[45%] h-[30px]"></div>
                            <div className="w-[55%] bg-[#EEEEEE] h-[26px] rounded-[4px]"></div>
                            <div className="flex items-center">
                                <div className='bg-[#EEEEEE] h-[20px] w-[20px] rounded-[4px] mr-1.5'></div>
                                <div className="bg-[#EEEEEE] h-[20px] w-[70%] rounded-[4px]"></div>
                            </div>
                            <div className="flex items-center">
                                <div className='bg-[#EEEEEE] h-[20px] w-[20px] rounded-[4px] mr-1.5'></div>
                                <div className="bg-[#EEEEEE] h-[20px] w-[70%] rounded-[4px]"></div>
                            </div>
                            <div className="flex items-center">
                                <div className='bg-[#EEEEEE] h-[20px] w-[20px] rounded-[4px] mr-1.5'></div>
                                <div className="bg-[#EEEEEE] h-[20px] w-[70%] rounded-[4px]"></div>
                            </div>
                        </div>

                        <div className="w-[280px] h-[160px] overflow-hidden rounded-2xl">
                            <div className='w-full h-full bg-[#EEEEEE]'></div>
                        </div>

                        <div className="w-6 h-full flex flex-col items-center gap-2">
                            <img
                                src="/icons/Re_Request.svg"
                                alt="icon"
                                className="w-6 h-6 object-contain cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default DayScheduleCardSkeleton;
