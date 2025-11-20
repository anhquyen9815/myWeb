import React, { useEffect, useState } from "react";
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
  value: string
}

interface MenuDropsDownProps {
  // data: ItemData[];
  attributeDefinitionId: number;
  onSelect: (attributeOptionId: number) => void;
  initValue?: number;
  title: string
}

const MenuDropsDownAttribute: React.FC<MenuDropsDownProps> = ({ attributeDefinitionId, onSelect, initValue, title }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selected, setSelected] = useState<number>(initValue || 0);
  const { getFilteredAttributeOption, filteredAttributeOptions } = useAttributeOptionHooks();

  useEffect(() => {
    getFilteredAttributeOption({ page: 1, size: 10, attributeDefinitionId })
  }, [attributeDefinitionId])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (attributeOptionId: number) => {
    onSelect(attributeOptionId)
    setSelected(attributeOptionId);
    setAnchorEl(null);
  };

  const handleLabelSelect = () => {
    const item = filteredAttributeOptions?.items.find(ele => ele.id == selected)
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
        <Stack direction="row" flexWrap="wrap" gap={1.2} sx={{ width: '50vw' }}>
          {selected != 0
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
          {filteredAttributeOptions?.items.map((option) => (
            <Chip
              key={option.label}
              label={option.label}
              onClick={() => handleSelect(option.id)}
              color={selected === option.id ? "error" : "default"}
              variant={selected === option.id ? "filled" : "outlined"}
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

export default MenuDropsDownAttribute;
