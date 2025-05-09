import { useEffect, useState, useRef } from 'react';

interface BaseModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function BaseModal({ children, onClose }: BaseModalProps) {
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerClose();
      }
    };
    document.addEventListener('keydown', handleEsc);

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = prev;
    };
  }, []);

  const triggerClose = () => {
    setShow(false);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      triggerClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-2xl p-6 w-[460px] relative shadow-lg transition-all duration-200 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
      >
        <div className="flex justify-end mb-[24px]">
          <button onClick={triggerClose} aria-label="Close">
            <img src="/icons/Close.svg" alt="닫기" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
