import React, { useState } from "react";
import {
  Button,
  Menu,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const PriceFilter: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    setSelectedPrice(value);
    setAnchorEl(null);
  };

  const priceOptions = [
    "Dưới 3 triệu",
    "Từ 3-7 triệu",
    "Từ 7-10 triệu",
    "Từ 10-15 triệu",
    "Trên 15 triệu",
  ];

  return (
    <Box>
      <Button
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        sx={{
          borderRadius: 2,
          borderColor: open ? "error.main" : "divider",
          color: open ? "error.main" : "text.primary",
        }}
      >
        Giá
      </Button>

      {/* Menu xổ xuống */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            mt: 1,
            px: 2,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        <Stack direction="row" flexWrap="wrap" gap={1.2} sx={{ width: 300 }}>
          {priceOptions.map((option) => (
            <Chip
              key={option}
              label={option}
              onClick={() => handleSelect(option)}
              color={selectedPrice === option ? "error" : "default"}
              variant={selectedPrice === option ? "filled" : "outlined"}
              sx={{
                fontWeight: 500,
                borderRadius: 2,
                px: 0.5,
              }}
            />
          ))}
        </Stack>
      </Menu>
    </Box>
  );
};

export default PriceFilter;
