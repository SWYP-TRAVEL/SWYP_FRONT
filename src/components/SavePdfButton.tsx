'use client';

import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import Image from 'next/image';
import Text from './Text';

interface SavePdfButtonProps {
  onClickButton: () => void;
  fileName?: string;
}

export default function SavePdfButton({ onClickButton, fileName = 'my-document' }: SavePdfButtonProps) {
  const handleDownloadPDF = async () => {
    const element = document.getElementById('pdf-target');
    if (!element) return;

    domtoimage.toPng(element, {
      quality: 1,
      bgcolor: '#FFFFFF',
    })
      .then((dataUrl) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = dataUrl;

        img.onload = () => {
          const ratio = img.width / img.height;
          const imgWidth = pdfWidth;
          const imgHeight = pdfWidth / ratio;

          const totalPages = Math.ceil(imgHeight / pdfHeight);

          for (let page = 0; page < totalPages; page++) {
            if (page > 0) pdf.addPage();
            const position = -(pdfHeight * page);

            pdf.addImage(
              dataUrl,
              'PNG',
              0,
              position,
              imgWidth,
              imgHeight
            );
          }

          // ✅ 지정된 파일명으로 저장
          pdf.save(`${fileName}.pdf`);
          onClickButton();
        };

        img.onerror = (error) => {
          console.error("이미지 로딩 실패: ", error);
        };
      })
      .catch((error) => {
        console.error('PDF 생성 중 에러 발생:', error);
      });
  };

  return (
    <button
      className='flex flex-col w-[80px] h-[90px] justify-center items-center text-[#C1C1C1]'
      onClick={handleDownloadPDF}>
      <Image
        src="/icons/Pdf Download.svg"
        alt='Pdf Download'
        width={60}
        height={60}
        className='mb-2.5'
      />
      <Text textStyle="label1" className="text-[#C1C1C1]">PDF 저장</Text>
    </button>
  );
}
