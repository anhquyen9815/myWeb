// src/components/layout/PrimaryBar/PrimaryBar.tsx

import React, { useContext } from 'react';
import logoImage from '@/assets/images/logo.png';
import './PrimaryBar.scss';
import { Link } from 'react-router-dom';
import { GlobalContext } from '@/contexts/GlobalVariableContext';
import { SCREEN_PATH } from '@/constants/screenPaths';

const PrimaryBarComponent: React.FC = () => {
  const { auxBarHeight } = useContext(GlobalContext);
  const dynamicStyles = {
    '--dynamic-header-height': `${auxBarHeight}px`,
  } as React.CSSProperties;


  const menuItems = [
    { label: 'TRANG CHỦ', path: '/' },
    { label: 'TRA CỨU HÓA ĐƠN', path: '/tra-cuu' },
    {
      label: 'THANH TOÁN ONLINE',
      path: SCREEN_PATH.PAYMENT,
      hasDropdown: true,
      dropdownItems: [
        { label: 'Các loại thanh toán hóa đơn', path: SCREEN_PATH.PAYMENT_TYPES },
        { label: 'Thanh toán qua web online', path: SCREEN_PATH.PAYMENT_WEB },
        { label: 'Thanh toán qua OnePAY', path: SCREEN_PATH.PAYMENT_ONEPAY },
        { label: 'Thanh toán qua Payoo', path: '/payment-payoo' },
        { label: 'Tra cứu lịch sử hóa đơn', path: '/thanhtoan/onepay' },
      ]
    },
    {
      label: 'ĐĂNG KÝ DỊCH VỤ',
      path: SCREEN_PATH.SERVICE,
      hasDropdown: true,
      dropdownItems: [
        { label: 'Đăng ký lắp đặt đồng hồ', path: SCREEN_PATH.SERVICE_NEW_REGISTRATION },
        { label: 'Đổi tên hợp đồng', path: '/huong-dan/dangky' },
        { label: 'Đổi vị trí cụm đồng hồ', path: '/huong-dan/dangky' },
        { label: 'Điều chỉnh giá nước', path: '/huong-dan/dangky' },
        { label: 'Tạm ngừng, mở lại cấp nước', path: '/huong-dan/dangky' },
        { label: 'Kiểm định lại đồng hồ', path: '/huong-dan/dangky' },
        { label: 'Kiểm tra, thay vật tư cụm đồng hồ', path: '/huong-dan/dangky' },
        { label: 'Nâng cụm đồng hồ', path: '/huong-dan/dangky' },
      ]
    },
    { label: 'ADMIN', path: SCREEN_PATH.ADMIN,
       hasDropdown: true,
      dropdownItems: [
        { label: 'Sản phẩm', path: SCREEN_PATH.PRODUCTMANAGER },
        { label: 'Thương hiệu', path: SCREEN_PATH.BRANDMANAGER },
        { label: 'Thêm sản phẩm', path: SCREEN_PATH.ADDPRODUCT },
      ]
     },
    { label: 'SẢN PHẨM', path: SCREEN_PATH.PRODUCTMANAGER },
    { label: 'LIÊN HỆ', path: '/lien-he' },
    { label: 'HỎI ĐÁP', path: '/hoi-dap' },
  ];

  return (
    <nav className="primary-bar" style={dynamicStyles}

    >
      <div className="menu-content">

        {/* 1. LOGO */}
        <div className="logo-section">
          {/* Thay thế bằng Component Logo hoặc thẻ img */}
          <img src={logoImage} alt="Logo" className="main-logo" />
        </div>

        {/* 2. THANH MENU CHÍNH */}
        <ul className="main-menu">
          {menuItems.map((item) => (
            <li key={item.label} className={`menu-item ${item.hasDropdown ? 'has-dropdown' : ''}`}>

              <Link to={item.path}>{item.label}</Link>

              {/* DROPDOWN MENU */}
              {item.hasDropdown && item.dropdownItems && (
                <ul className="dropdown-menu">
                  {item.dropdownItems.map((subItem, index) => (
                    <li key={subItem.path}>
                      {/* <a href={subItem.path}>{subItem.label}</a> */}
                      <Link to={subItem.path}>{index + 1}. {subItem.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(PrimaryBarComponent);