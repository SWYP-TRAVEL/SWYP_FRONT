'use client';

import { useToastStore } from '@/store/useToastStore';
import Text from '@/components/Text';

export default function ToastContainer() {
  const { toasts } = useToastStore();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 space-y-2 z-5000">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`w-[880px] h-[60px] px-6 py-3 rounded-[11px] shadow-md text-sm transition-all flex items-center gap-3 backdrop-blur
              ${toast.type === 'success'
              ? 'bg-[#EEF4FFD9] '
              : 'bg-[#FFEEEE]'
            }
        `}
        >
          {toast.type === 'success' ? <img src="/icons/Success.svg" alt="success" /> : <img src="/icons/Fail.svg" alt="fail" />}

          <Text textStyle='body1' className='font-semibold'>
            {toast.message}
          </Text>
        </div>
      ))}
    </div>
  );
}
