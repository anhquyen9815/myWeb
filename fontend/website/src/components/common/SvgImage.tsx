// // SvgImage.tsx
// import React from 'react';
// import { ReactSVG } from 'react-svg';

// interface SvgIconProps {
//   src: string;                         // Đường dẫn đến file SVG
//   width?: string | number;            // Chiều rộng
//   height?: string | number;           // Chiều cao
//   color?: string;                     // Màu sắc
//   className?: string;                 // Class CSS tùy chọn
// }

// const SvgImage: React.FC<SvgIconProps> = ({
//   src,
//   width = 24,
//   height = 24,
//   color = 'currentColor',
//   className = '',
// }) => {
//   return (
//     <ReactSVG
//       src={src}
//       beforeInjection={(svg) => {
//         // Set width & height trên thẻ <svg>
//         svg.setAttribute('width', width.toString());
//         svg.setAttribute('height', height.toString());

//         // Gán fill = currentColor cho các phần tử bên trong
//         svg.querySelectorAll('[fill]').forEach((el) => {
//           el.setAttribute('fill', 'currentColor');
//         });

//         // Gán stroke = currentColor nếu có
//         svg.querySelectorAll('[stroke]').forEach((el) => {
//           el.setAttribute('stroke', 'currentColor');
//         });
//       }}
//       wrapper="span"
//       className={className}
//       style={{ color }}
//     />
//   );
// };

// export default SvgImage;

// src/SvgImage.tsx

import React from 'react';
import { ReactSVG } from 'react-svg';

interface SvgIconProps {
  src: string;                         // Đường dẫn đến file SVG
  width?: string | number;            // Chiều rộng (Tùy chọn)
  height?: string | number;           // Chiều cao (Tùy chọn)
  color?: string;                     // Màu sắc
  className?: string;                 // Class CSS tùy chọn
}

const SvgImage: React.FC<SvgIconProps> = ({
  src,
  width = 'auto', // Đặt mặc định là 'auto'
  height = 'auto', // Đặt mặc định là 'auto'
  color = 'currentColor',
  className = '',
}) => {
  
  // KIỂM TRA LỖI LOGIC: Không thể đặt cả hai là 'auto' nếu người dùng không truyền gì.
  // Tuy nhiên, logic này sẽ được xử lý trong beforeInjection.
  
  return (
    <ReactSVG
      src={src}
      beforeInjection={(svg) => {
        // --- LOGIC CĂN CHỈNH TỈ LỆ (QUAN TRỌNG) ---
        const finalWidth = width.toString() === 'auto' && height.toString() !== 'auto' 
                           ? 'auto' 
                           : width.toString();
        
        const finalHeight = height.toString() === 'auto' && width.toString() !== 'auto' 
                            ? 'auto' 
                            : height.toString();

        // 1. ÁP DỤNG KÍCH THƯỚC ĐÃ TÍNH TOÁN
        // Ghi đè width/height trên thẻ <svg> (Sử dụng 'auto' để giữ tỉ lệ)
        svg.setAttribute('width', finalWidth);
        svg.setAttribute('height', finalHeight);

        // 2. LOGIC THAY ĐỔI MÀU SẮC (Giữ nguyên)
        // Gán fill = currentColor cho các phần tử bên trong
        svg.querySelectorAll('[fill]').forEach((el) => {
          el.setAttribute('fill', 'currentColor');
        });

        // Gán stroke = currentColor nếu có
        svg.querySelectorAll('[stroke]').forEach((el) => {
          el.setAttribute('stroke', 'currentColor');
        });
      }}
      wrapper="span"
      className={className}
      // Áp dụng màu sắc thông qua style (currentColor sẽ được fill/stroke bên trong sử dụng)
      style={{ color }} 
    />
  );
};

export default SvgImage;



