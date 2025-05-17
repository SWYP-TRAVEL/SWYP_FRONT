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
  onClose?: () => void;
}

export default function
  ConfirmModal({
    title,
    description,
    onCancel,
    onConfirm,
    children,
    cancelText,
    confirmText,
    onClose
  }: ConfirmModalProps) {
  return (
    <BaseModal onClose={onClose ? onClose : onCancel}>
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
          className="w-[50%] mr-2.5 hover:bg-[#EBE1FF] hover:text-[#9A77FF]"
          onClick={onCancel}
        >
          {cancelText}
        </Button>
        <Button
          variant='gradation'
          onClick={onConfirm}
          className={`
    w-[50%] text-white relative overflow-hidden
    before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100
    before:transition-opacity
    before:bg-[linear-gradient(125.9deg,_#9A77FF_23.39%,_#214BFF_104.52%)]
    after:absolute after:inset-0 after:bg-black after:opacity-0 hover:after:opacity-20
    after:transition-opacity
    hover:text-white
  `}
          textStyle='body1'
        >
          {confirmText}
        </Button>
      </div>
    </BaseModal >
  );
}
