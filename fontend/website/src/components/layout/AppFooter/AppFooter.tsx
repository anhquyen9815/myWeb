// src/components/AppFooter.tsx

import React from 'react';
import {
    Box,
    Typography,
    Link as MuiLink,
    TextField,
    Button,
    Stack,
    IconButton
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

// Import dữ liệu từ file riêng (hoặc định nghĩa trực tiếp)
import {  contactLinks, socialLinks } from '@/data/footerData';

const AppFooter: React.FC = () => {
    return (
        <Box sx={{
            bgcolor: 'white', // Màu nền xanh đậm như ảnh
            color: 'text.main',
            mt: 5,
            padding: 4,
            boxShadow: 6
        }}>
            {/* CONTAINER CHÍNH CỦA CÁC CỘT */}
            <Box sx={{
                maxWidth: 1200,
                p: 4,
                display: 'flex',
                flexWrap: 'wrap',
                // justifyContent: 'space-between',
                margin: '0 auto',
                gap: '1%',
                // bgcolor: 'orange'
            }}>
                {/* CỘT 1: THÔNG TIN CÔNG TY */}
                <Box sx={{ width: { xs: '100%', sm: '45%', md: '34%', }, mb: { xs: 4, md: 0 }, }}>
                    <Typography fontSize={'13px'} fontWeight="bold" gutterBottom>
                        THÔNG TIN CỬA HÀNG
                    </Typography>
                    <Typography fontSize={'13px'} fontWeight="bold" gutterBottom>
                        ĐIỆN MÁY LONG QUYỀN
                    </Typography>
                    <Typography fontSize={'13px'} >Add: Thôn Tân Phúc - Xã Ân Thi - Tỉnh Hưng Yên</Typography>
                    <Typography fontSize={'13px'}>{'Điện thoại:'}{' '}
                        <MuiLink href={`tel:0936862366`} fontSize={'13px'} underline="none" color="inherit" fontWeight="bold"> {'093 686 2366'}</MuiLink>
                    </Typography>
                    {/* <Typography fontSize={'13px'}>{'Điện thoại 2:'}{' '}
                        <MuiLink href={`tel:0363005549`} fontSize={'13px'} underline="none" color="inherit" fontWeight="bold"> {'036 300 5539'}</MuiLink>
                    </Typography>
                    <Typography fontSize={'13px'}>{'Điện thoại 3:'}{' '}
                        <MuiLink href={`tel:0354753979`} fontSize={'13px'} underline="none" color="inherit" fontWeight="bold"> {'0354753979'}</MuiLink>
                    </Typography> */}
                    <Typography fontSize={'13px'}>{'Email:'}{' '}
                        <MuiLink href={`mailto:quyenit9815@gmail.com`} fontSize={'13px'} underline="none" color="inherit" fontWeight="bold"> {'quyenit9815@gmail.com'}</MuiLink>
                    </Typography>
                    <Typography fontSize={'13px'}>
                        Website: {' '}
                        <MuiLink href="https://DienMayLongQuyen.com/" underline="none" fontSize={'13px'} fontWeight="bold" color="inherit" > {'DienMayLongQuyen.com'}</MuiLink>
                    </Typography>

                </Box>

                {/* CỘT 2: THÔNG TIN BỔ SUNG & LIÊN HỆ */}
                {/* <Box sx={{ width: { xs: '100%', sm: '45%', md: '14%' }, mb: { xs: 4, md: 0 } }}>
                    <Typography fontSize={'13px'} fontWeight="bold" gutterBottom>
                        THÔNG TIN BỔ SUNG
                    </Typography>
                    <Stack spacing={0.5} mb={3}>
                        {additionalLinks.map((link, index) => (
                            <MuiLink href={link.href} key={index} color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                <Typography fontSize={'13px'}>{link.label}</Typography>
                            </MuiLink>
                        ))}
                    </Stack>
                </Box> */}

                {/* CỘT 2: THÔNG TIN BỔ SUNG & LIÊN HỆ */}
                <Box sx={{ width: { xs: '100%', sm: '45%', md: '25%' }, mb: { xs: 4, md: 0 }, marginLeft: '1%' }}>
                    <Typography fontSize={'13px'} fontWeight="bold" gutterBottom>
                        LIÊN HỆ
                    </Typography>
                    <Stack spacing={0.5}>
                        {contactLinks.map((link, index) => (
                            <Box key={index}>
                                <Typography fontSize={'13px'} sx={{ fontWeight: 'bold' }}>{link.label}</Typography>
                                <Typography fontSize={'13px'}>{link.phone}</Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                {/* CỘT 3: ĐĂNG KÝ NHẬN TIN & KẾT NỐI VỚI CHÚNG TÔI */}
                <Box sx={{ width: { xs: '100%', sm: '45%', md: '34%' }, mb: { xs: 4, md: 0 } }}>
                    <Typography fontSize={'13px'} fontWeight="bold" gutterBottom>
                        ĐĂNG KÝ NHẬN TIN MIỄN PHÍ
                    </Typography>
                    <Stack direction="row" mb={2}>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Mời bạn nhập email"
                            sx={{
                                flexGrow: 1,
                                bgcolor: 'white',
                                // borderRadius: 1,
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5,
                                borderTop: '1px solid #f16e23',
                                borderLeft: '1px solid #f16e23',
                                borderBottom: '1px solid #f16e23',
                                '& fieldset': { border: 'none', }, // Loại bỏ border mặc định
                            }}
                            InputProps={{
                                sx: { py: 0.1 } // Điều chỉnh padding bên trong TextField
                            }}
                        />
                        <Button variant="contained" color='warning' sx={{ textTransform: 'none', borderRadius: 0, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                            Đăng ký
                        </Button>
                    </Stack>

                    {/* Nút Like/Share (Chỉ dùng Placeholder Icon) */}
                    <Stack direction="row" spacing={1} alignItems="center" mb={4}>
                        <Button variant="contained" size="small" sx={{ bgcolor: '#3b5998', '&:hover': { bgcolor: '#2d4373' }, textTransform: 'none' }}>
                            <FacebookIcon sx={{ fontSize: 16, mr: 0.5 }} /> Thích 1.1K
                        </Button>
                        <Button variant="contained" size="small" sx={{ bgcolor: '#00acee', '&:hover': { bgcolor: '#008bb2' }, textTransform: 'none' }}>
                            Chia sẻ
                        </Button>
                    </Stack>

                    <Typography fontSize={'13px'} fontWeight="bold" gutterBottom>
                        KẾT NỐI VỚI CHÚNG TÔI
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        {socialLinks.map((social, index) => (
                            <MuiLink href={social.href} target="_blank" rel="noopener noreferrer" key={index}>
                                {/* Dùng ảnh SVG cục bộ cho Zalo */}
                                {social.name === 'Zalo' ? (
                                    <Box sx={{ width: 32, height: 32, bgcolor: social.bgcolor, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src={social.icon} alt={social.name} style={{ width: 20, height: 20 }} />
                                    </Box>
                                ) : (
                                    // Dùng icon của MUI cho Facebook/Youtube
                                    <IconButton sx={{ bgcolor: social.bgcolor, color: 'white', '&:hover': { bgcolor: social.bgcolor } }}>
                                        {social.name === 'Facebook' && <FacebookIcon />}
                                        {social.name === 'Youtube' && <YouTubeIcon />}
                                    </IconButton>
                                )}
                            </MuiLink>
                        ))}
                    </Stack>
                </Box>
            </Box>

            {/* COPYRIGHT VÀ THÔNG TIN BẢN QUYỀN */}
            {/* <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.3)', pt: 2, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ display: 'block' }}>
                    © 2018 Nước Sạch Ngọc Tuấn - Nagaoka
                </Typography>
                <Typography variant="caption" sx={{ display: 'block' }}>
                    Mã số ĐN: 0900996305 – Cấp ngày: 08/08/2016 – Tại: Phòng ĐKKD – Sở Kế hoạch & Đầu tư tỉnh Hưng Yên
                </Typography>
            </Box> */}
        </Box>
    );
};

export default AppFooter;