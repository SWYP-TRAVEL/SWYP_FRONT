import Button from '../Button';
import Text from '../Text';
import BaseModal from '@/components/modals/BaseModal';

interface AlertModalProps {
  title: string;
  description?: string;
  onClose: () => void;
  buttonText: string;
  children?: React.ReactNode;
}

export default function AlertModal({
  title,
  description,
  onClose,
  children,
  buttonText
}: AlertModalProps) {
  return (
    <BaseModal onClose={onClose}>
      <Text as='h2' textStyle='heading1' className='font-semibold text-center'>{title}</Text>
      {description ? (
        <Text as='p' textStyle='body1' className='text-center text-semantic-label-alternative mt-3'>
          {description}
        </Text>
      ) : null}
      {children && <div className="mt-4">{children}</div>}
      <div className="flex justify-center mt-9">
        <Button
          variant='gradation'
          onClick={onClose}
          className="w-[50%]"
          textStyle='body1'
        >
          {buttonText}
        </Button>
      </div>
    </BaseModal>
  );
}
