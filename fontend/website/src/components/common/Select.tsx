import React from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    type SelectChangeEvent,
} from '@mui/material';

interface FormRowProps {
    title: string;
    children?: React.ReactNode;
    isRequired?: boolean;
    error?: string;
    data: { value: number; label: string, }[];
    onChange: (value: number) => void;
    select: number | string | undefined;
}

const SelectCP: React.FC<FormRowProps> = ({
    title,
    children,
    isRequired = false,
    error,
    data,
    onChange,
    select,
}) => {
    // Hàm xử lý change trong component này
    const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
        const value = Number(event.target.value)
        onChange(value);
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
                    <Select
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={select}
                        onChange={handleSelectChange}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 400,
                                },
                            },
                        }}
                    >
                        {data.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
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

export default SelectCP;
