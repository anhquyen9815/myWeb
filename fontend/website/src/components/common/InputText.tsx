import React from 'react';
import {
    Box,
    Typography,
    TextField,
} from '@mui/material';

interface FormRowProps {
    title: string;
    children?: React.ReactNode;
    isRequired?: boolean;
    error?: string;
    isError?: boolean;
    multiline?: boolean;
    value: string;
    onChange: (label: string, value: string) => void;
    numberOfLine?: number
}

const InputTextCP: React.FC<FormRowProps> = ({
    title,
    children,
    isRequired = false,
    error,
    multiline,
    value,
    isError,
    onChange,
    numberOfLine = 1
}) => {
    // ✅ Hàm xử lý thay đổi nội bộ
    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.name, e.target.value);
    };

    return (
        <Box
            sx={{
                mb: 1.5,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
                width: '100%',
            }}
        >
            {/* CỘT LABEL */}
            <Box
                sx={{
                    width: { xs: '100%', md: '33.33%' },
                    pr: { md: 2 },
                    mb: { xs: 0.5, md: 0 },
                }}
            >
                <Typography
                    variant="body1"
                    sx={{ textAlign: { xs: 'left', md: 'right' }, fontWeight: 500 }}
                >
                    {title}
                    {isRequired && (
                        <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>
                            *
                        </Box>
                    )}
                </Typography>
            </Box>

            {/* CỘT INPUT */}
            <Box sx={{ width: { xs: '100%', md: '66.67%' } }}>
                {children ? (
                    children
                ) : (
                    <TextField
                        fullWidth variant="outlined" size="small"
                        name={title}
                        value={value}
                        // CHỈ DÙNG HÀM XỬ LÝ TEXTFIELD CHUYÊN BIỆT
                        onChange={handleTextFieldChange}
                        multiline={multiline}
                        rows={numberOfLine}
                        error={isError}
                    />
                )}

                {error && (
                    <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 0.5, display: 'block' }}
                    >
                        {error}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default InputTextCP;
