'use client';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';

export default function SavePdfButton({ onClickButton }: { onClickButton: () => void }) {
  const handleDownloadPDF = async () => {
    const element = document.getElementById('pdf-target');
    if (!element) return;

    // ✅ 폰트 로딩 기다리기
    await document.fonts.ready;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    // 첫 페이지
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // 다음 페이지들
    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save('my-document.pdf');
    onClickButton();
  };

  return (
    <button
      className='flex flex-col text-[#C1C1C1]'
      onClick={handleDownloadPDF}>
      <Image
        src="/icons/Pdf Download.svg"
        alt='Pdf Download'
        width={60}
        height={60}
        className='mb-2.5'
      />
      PDF 저장
    </button>
  );
}