import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function LoadMoreButton() {
  return (
    <Button
      variant="outlined"
      endIcon={<KeyboardArrowDownIcon />}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: "auto",                 // 👈 căn giữa theo chiều ngang
        mt: 3,                      // khoảng cách phía trên
        px: 4,                      // padding ngang
        py: 1.2,                    // padding dọc
        borderRadius: "9999px",     // 👈 bo tròn full pill
        textTransform: "none",      // bỏ viết hoa chữ
        fontWeight: 600,
        fontSize: "1rem",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", // 👈 bóng nhẹ
        backgroundColor: "#fff",
        color: "#000",
        "&:hover": {
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      Xem thêm 275 sản phẩm
    </Button>
  );
}
