import React, { useState } from "react";
import {
  Button,
  Menu,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAttributeOptionHooks } from "@/hooks/attributeOptionHooks";

interface ItemData {
  label: string;
  value: number
}

interface MenuDropsDownProps {
  data: ItemData[];
  onSelect: (value: number) => void;
  initValue?: number;
  title: string
}

const MenuDropsDown: React.FC<MenuDropsDownProps> = ({ data, onSelect, initValue, title }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selected, setSelected] = useState<number>(999);
  // const { getFilteredAttributeOption, filteredAttributeOptions } = useAttributeOptionHooks();


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: number) => {
    onSelect(value)
    setSelected(value);
    setAnchorEl(null);
  };

  const handleLabelSelect = () => {
    const item = data.find(ele => ele.value == selected)
    return item?.label || title
  }

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
        {handleLabelSelect()}
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
          {selected != 999
            ? <Chip
              key={999}
              label={'Bỏ lọc'}
              onClick={() => handleSelect(999)}
              // color={selected === option.id ? "error" : "default"}
              // variant={selected === option.id ? "filled" : "outlined"}
              sx={{
                fontWeight: 500,
                borderRadius: 2,
                px: 0.5,
              }}
            />
            : null}
          {data.map((option: ItemData) => (
            <Chip
              key={option.value}
              label={option.label}
              onClick={() => handleSelect(option.value)}
              color={selected === option.value ? "error" : "default"}
              variant={selected === option.value ? "filled" : "outlined"}
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

export default MenuDropsDown;
