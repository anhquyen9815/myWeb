// src/contexts/GlobalVariableContext.tsx

import React, { createContext, useState, useContext, type ReactNode } from 'react';

// 1. Định nghĩa kiểu dữ liệu cho Context
interface GlobalContextType {
    globalValue: string;
    setGlobalValue: (newValue: string) => void;

    auxBarHeight: number;
    setAuxBarHeight: (newValue: number) => void;
}

// 2. Tạo Context
export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

// 3. Component Provider
interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalVariableProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    // Biến có thể gán lại
    const [globalValue, setGlobalValue] = useState<string>('Giá trị mặc định');
    const [auxBarHeight, setAuxBarHeight] = useState<number>(41);
    const values = { globalValue, setGlobalValue, auxBarHeight, setAuxBarHeight }
    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    );
};

// 4. Custom Hook tiện ích để sử dụng (tùy chọn)
export const useGlobalVariable = () => useContext(GlobalContext);