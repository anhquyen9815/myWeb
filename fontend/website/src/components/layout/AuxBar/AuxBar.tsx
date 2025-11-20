// src/components/layout/AuxBar/AuxBar.tsx

import React, { useRef, useEffect, useContext } from 'react';
import { MapPin, Phone, LogIn, Home } from 'lucide-react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { GlobalContext } from '@/contexts/GlobalVariableContext';
import { SCREEN_PATH } from '@/constants/screenPaths';
import SearchBox from '../SearchBox/SearchBox';

interface AuxBarProps { }

const AuxBar: React.FC<AuxBarProps> = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { setAuxBarHeight } = useContext(GlobalContext);
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setAuxBarHeight(height);
    }
  }, [headerRef, isMobile]);

  return (
    <Box
      ref={headerRef}
      component="header"
      sx={{
        width: '100%',
        bgcolor: 'primary.main',
        px: 2,
        py: 1,
        boxShadow: 1,
        position: 'fixed',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
        }}
      >
        {/* Thông tin trái - ẩn trên mobile */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <MapPin size={16} color='white' />
              <Typography variant="body2" color='white' fontWeight={'800'}>
                Tân Phúc - Ân Thi - Tỉnh Hưng Yên
              </Typography>
            </Box>
          </Box>
        )}

        {/* Thanh tìm kiếm luôn hiển thị */}
        <Box sx={{ flex: isMobile ? 1 : 'auto', maxWidth: 400 }}>
          <SearchBox onSearch={(kw) => console.log('🔍 Tìm:', kw)} />
        </Box>

        {/* Hành động phải - ẩn trên mobile */}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: isMobile ? 2 : 0 }}>
            {!isMobile && (<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Phone size={16} color='white' />
            <Typography variant="body2" color='white' fontWeight={'800'} >093 686 2366</Typography>
          </Box>)}

          {!isMobile && (<IconButton
            href={SCREEN_PATH.ADMIN}
            // color=''
            sx={{ p: 0.5, color: 'white' }}
            aria-label="Admin"
          >
            <LogIn size={16} />
            <Typography variant="body2" color='white' fontWeight={'800'} sx={{ ml: 0.5 }}>
              Admin
            </Typography>
          </IconButton>)}
        </Box>


        <IconButton
          href={'/'}
          // color=''
          sx={{ p: 0.5, color: 'white', ml: 1 }}
          aria-label="Trang-chu"
        >
          <Home size={16} />
          <Typography variant="body2" color='white' fontWeight={'800'} sx={{ ml: 0.5 }}>
            Trang chủ
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
};

export default AuxBar;
