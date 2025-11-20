import React from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Divider,
  SvgIcon,
  useTheme,
} from "@mui/material";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";

const CommitmentCard: React.FC = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      {/* Tiêu đề */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
      >
        Cam kết sản phẩm
      </Typography>

      {/* Khối 1 */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        {/* Bên trái */}
        <Box display="flex" alignItems="flex-start" gap={1.5} flex={1}>
          <SvgIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: 26,
              mt: 0.3,
              flexShrink: 0,
            }}
          >
            <AutorenewOutlinedIcon />
          </SvgIcon>
          <Typography variant="subtitle2" sx={{ lineHeight: 1.6 }}>
            Hư gì đổi nấy <b>12 tháng</b> tận nhà (miễn phí tháng đầu){" "}
            {/* <Typography
              component="span"
              color="primary"
              sx={{ fontWeight: 500, cursor: "pointer" }}
            >
              Xem chi tiết
            </Typography> */}
          </Typography>
        </Box>

        {/* Bên phải */}
        <Box display="flex" alignItems="flex-start" gap={1.5} flex={1}>
          <SvgIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: 26,
              mt: 0.3,
              flexShrink: 0,
            }}
          >
            <SecurityOutlinedIcon />
          </SvgIcon>
          <Typography variant="subtitle2" sx={{ lineHeight: 1.6 }}>
            Bảo hành <b>chính hãng 2 năm</b>, có người đến tận nhà{" "}
            {/* <Typography
              component="span"
              color="primary"
              sx={{ fontWeight: 500, cursor: "pointer" }}
            >
              Xem chi tiết bảo hành
            </Typography> */}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 1 }} />

      {/* Khối 2 */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box display="flex" alignItems="flex-start" gap={1.5} flex={1}>
          <SvgIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: 26,
              mt: 0.3,
              flexShrink: 0,
            }}
          >
            <SecurityOutlinedIcon />
          </SvgIcon>
          <Typography variant='subtitle2' sx={{ lineHeight: 1.6 }}>
            Bảo hành máy nén <b>10 năm</b> (sản phẩm mua từ ngày 01/07/2024)
          </Typography>
        </Box>

        <Box display="flex" alignItems="flex-start" gap={1.5} flex={1}>
          <SvgIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: 26,
              mt: 0.3,
              flexShrink: 0,
            }}
          >
            <InfoOutlinedIcon />
          </SvgIcon>
          <Typography variant="subtitle2" sx={{ lineHeight: 1.6 }}>
            Nếu dùng cho hoạt động kinh doanh (nhà máy, khách sạn, giặt ủi,…)
            thì không được bảo hành.
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 1 }} />

      {/* Khối 3 */}
      <Box display="flex" alignItems="flex-start" gap={1.5}>
        <SvgIcon
          sx={{
            color: theme.palette.primary.main,
            fontSize: 26,
            mt: 0.3,
            flexShrink: 0,
          }}
        >
          <BuildOutlinedIcon />
        </SvgIcon>
        <Typography variant="subtitle2" sx={{ lineHeight: 1.6 }}>
          <b>Lắp đặt miễn phí</b> lúc giao hàng
        </Typography>
      </Box>
    </Paper>
  );
};

export default CommitmentCard;
