import { useModalContext } from "@/providers/ModalProvider";
import { useCallback } from "react";

export function useModal<T extends any[] = any[]>(
  builder: (...args: T) => React.ReactNode
) {
  const { openModal, closeModal } = useModalContext();

  const open = useCallback(
    (...args: T) => {
      const modalElement = builder(...args);
      openModal(modalElement);
    },
    [openModal, builder]
  );

  return { open, close: closeModal };
}
