import { FC, useState } from "react";
import Text from '../Text';

interface AlertBoxProps {
    message: string;
    description: string;
}

const AlertBox: FC<AlertBoxProps> = ({ message, description }) => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="relative bg-[#EEF4FF] p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <div className="flex items-center mb-1">
                        <img
                            src="/icons/Inform.svg"
                            alt="Info Icon"
                            className="w-5 h-5 mr-2"
                        />
                        <Text as="h2" textStyle="body1" className="font-semibold text-[#5896FF]">
                            {message}
                        </Text>
                    </div>
                    <Text as="p" textStyle="label1" className="text-[#858588] ml-[21px]">
                        {description}
                    </Text>
                </div>
                <button
                    onClick={handleClose}
                    className="ml-4 transition-colors hover:opacity-80"
                >
                    <img src="/icons/Close.svg" alt="Close Icon" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default AlertBox;
