// BreadcrumbNav.tsx
import React from "react";
import { Breadcrumbs, Typography, Box, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  params?: {
    categoryId?: number;
    brandId?: number;
    brandName?: string;
    categoryName?: string;
  }
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
  const navigate = useNavigate();
  const handleClick = (item: BreadcrumbItem) => {
    navigate(item.href || '/', {
      state: item.params, // 👈 truyền props qua state
      replace: true
    });
  };
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", mb: 1 }}>
      <Breadcrumbs
        separator={
          <NavigateNextIcon fontSize="small" sx={{ color: "text.secondary"}} />
        }
        aria-label="breadcrumb"
        sx={{
          fontSize: 15,
          "& a": {
            textDecoration: "none",
            color: "text.secondary",
            fontWeight: 500,
          },
          "& a:hover": {
            color: "primary.main",
          },
        }}
      >
        {items.map((item, index) =>
          item.href && index !== items.length - 1 ? (
            <button onClick={() => handleClick(item)} style={{margin: 0, padding: 8}} >
             {item.label}
            </button>
          ) : (
            <Typography key={index} color="text.primary" fontWeight={600}>
              {item.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbNav;
