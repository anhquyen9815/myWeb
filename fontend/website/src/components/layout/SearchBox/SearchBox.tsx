import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Paper,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { motion, AnimatePresence } from "framer-motion";

interface SuggestItem {
  title: string;
  subtitle?: string;
}

interface SearchBoxProps {
  onSearch?: (keyword: string) => void;
}

const mockSuggestions: SuggestItem[] = [
  { title: "Cơ hội nhận mã giảm 400k", subtitle: "Minigame thứ 4" },
  { title: "Máy giặt Hisense", subtitle: "Giá chỉ 3.990.000đ" },
  { title: "Tủ lạnh Toshiba 460 lít", subtitle: "Giá sốc 12.410.000đ" },
  { title: "Máy khoan FINDER ưu đãi sốc", subtitle: "Giá từ 539.000đ" },
];

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🔥 Lắng nghe click bên ngoài => đóng gợi ý
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggest(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = mockSuggestions.filter((s) =>
    s.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleSearch = () => {
    if (onSearch) onSearch(keyword);
    setShowSuggest(false);
  };

  const handleClear = () => {
    setKeyword("");
    setShowSuggest(false);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        width: {
          xs: "100%", // ✅ full màn hình mobile
          sm: "80%", // tablet
          md: 300, // desktop
          lg: 350,
        },
        maxWidth: "100%",
        mx: "auto",
        position: "relative",
      }}
    >
      <TextField
        fullWidth
        placeholder="Tìm sản phẩm..."
        variant="outlined"
        size="small"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          setShowSuggest(true);
        }}
        onFocus={() => setShowSuggest(true)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: keyword ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} size="small">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
          sx: {
            backgroundColor: "white",
            borderRadius: 10,
            "& fieldset": { border: "1px solid #ccc" },
            "&:hover fieldset": { borderColor: "#1976d2" },
          },
        }}
      />

      {/* Dropdown gợi ý */}
      <AnimatePresence>
        {showSuggest && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              top: "110%",
              left: 0,
              width: "100%",
              zIndex: 999,
            }}
          >
            <Paper
              elevation={8}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                backdropFilter: "blur(8px)",
                boxShadow: "0px 6px 18px rgba(0,0,0,0.15)",
              }}
            >
              <Box p={1.2}>
                {/* Banner + heading khi chưa nhập gì */}
                {keyword.trim() === "" && (
                  <>
                    <Typography
                      fontWeight={600}
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Ưu đãi đặc biệt
                    </Typography>
                    <Box
                      component="img"
                      src="https://cdn.tgdd.vn/2024/11/banner/thu-tu-ruc-lua.png"
                      alt="Ưu đãi"
                      sx={{
                        width: "100%",
                        borderRadius: 1,
                        mb: 1,
                        objectFit: "cover",
                      }}
                    />
                    <Divider sx={{ mb: 1 }} />
                  </>
                )}

                {(filteredSuggestions.length > 0
                  ? filteredSuggestions
                  : []
                ).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 1.5,
                        py: 1,
                        borderRadius: 1,
                        bgcolor: "#e7f0ff",
                        mb: 0.5,
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "#d0e2ff",
                          transform: "scale(1.01)",
                          transition: "0.2s",
                        },
                      }}
                      onMouseDown={() => {
                        setKeyword(item.title);
                        setShowSuggest(false);
                        if (onSearch) onSearch(item.title);
                      }}
                    >
                      <Typography fontSize="0.9rem" fontWeight={500}>
                        {item.title}
                      </Typography>
                      {item.subtitle && (
                        <Typography fontSize="0.8rem" color="text.secondary">
                          {item.subtitle}
                        </Typography>
                      )}
                    </Box>
                  </motion.div>
                ))}

                {filteredSuggestions.length === 0 && keyword.trim() !== "" && (
                  <Typography
                    fontSize="0.9rem"
                    color="text.secondary"
                    align="center"
                    py={1}
                  >
                    Không tìm thấy kết quả
                  </Typography>
                )}
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SearchBox;
