import BaseModal from './BaseModal';
import Button from '../Button';
import Text from '../Text';

interface ConfirmModalProps {
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
  cancelText: string;
  confirmText: string;
}

export default function ConfirmModal({
  title,
  description,
  onCancel,
  onConfirm,
  children,
  cancelText,
  confirmText
}: ConfirmModalProps) {
  return (
    <BaseModal onClose={onCancel}>
      <Text as='h2' textStyle='heading1' className='font-semibold text-center'>{title}</Text>
      {description ? (
        <Text as='p' textStyle='body1' className='whitespace-pre-line text-center text-semantic-label-alternative mt-3'>
          {description}
        </Text>
      ) : null}
      {children && <div className="mt-4">{children}</div>}
      <div className="flex justify-between mt-9">
        <Button
          variant='cancel'
          textStyle='body1'
          className="w-[50%] mr-2.5"
          onClick={onCancel}
        >
          {cancelText}
        </Button>
        <Button
          variant='gradation'
          onClick={onConfirm}
          className="w-[50%]"
          textStyle='body1'
        >
          {confirmText}
        </Button>
      </div>
    </BaseModal >
  );
}
