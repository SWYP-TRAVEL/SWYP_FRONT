import BaseModal from './BaseModal';
import Text from '../Text';

interface DefaultModalProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function
  DefaultModal({
    title,
    description,
    children,
    onClose
  }: DefaultModalProps) {
  return (
    <BaseModal onClose={onClose}>
      <Text as='h2' textStyle='heading1' className='font-semibold text-center'>{title}</Text>
      {description ? (
        <Text as='p' textStyle='body1' className='whitespace-pre-line text-center text-semantic-label-alternative mt-3'>
          {description}
        </Text>
      ) : null}
      {children && <div className="mt-4">{children}</div>}
    </BaseModal >
  );
}
