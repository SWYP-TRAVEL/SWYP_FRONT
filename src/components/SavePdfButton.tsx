'use client';

import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import Image from 'next/image';

export default function SavePdfButton({ onClickButton }: { onClickButton: () => void }) {
  const handleDownloadPDF = async () => {
    const element = document.getElementById('pdf-target');
    if (!element) return;

    // ✅ PNG 이미지로 변환
    domtoimage.toPng(element, {
      quality: 1,
      bgcolor: '#FFFFFF',
    })
      .then((dataUrl) => {
        // ✅ PDF 생성
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // ✅ Image 객체 생성
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = dataUrl;

        img.onload = () => {
          // ✅ 실제 크기 계산 (DOM 사이즈와 PDF 비율 맞춤)
          const ratio = img.width / img.height;
          const imgWidth = pdfWidth;
          const imgHeight = pdfWidth / ratio;

          // ✅ 페이지 넘기기 처리
          const totalPages = Math.ceil(imgHeight / pdfHeight);

          for (let page = 0; page < totalPages; page++) {
            if (page > 0) pdf.addPage();
            const position = -(pdfHeight * page);

            // ✅ 페이지 별로 이미지 잘라서 넣기
            pdf.addImage(
              dataUrl,
              'PNG',
              0,
              position,
              imgWidth,
              imgHeight
            );
          }

          // ✅ PDF 다운로드
          pdf.save('my-document.pdf');
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
