// src/hooks/useWindowSize.ts

import React, { useState, useEffect } from 'react';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Hàm xử lý khi cửa sổ bị resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth, // Lấy chiều ngang viewport
        height: window.innerHeight,
      });
    }

    // Đăng ký sự kiện resize
    window.addEventListener('resize', handleResize);
    
    // Gọi hàm một lần khi component mount để lấy giá trị ban đầu
    handleResize();

    // Dọn dẹp listener khi component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  return windowSize;
}

// Cách sử dụng trong Component:
// const { width } = useWindowSize(); 
// console.log(`Chiều ngang hiện tại: ${width}`);