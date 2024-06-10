import React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const CustomSlider = ({ value, ...props }) => {
  return (
    <Box sx={{ width: 200 }}>
      <Slider
        size="small"
        defaultValue={value}
        aria-label="Small"
        valueLabelDisplay="auto"
        {...props}
        sx={{
          color: "#008EFA",
          "& .MuiSlider-thumb": {
            backgroundColor: "#008EFA",
          },
          "& .MuiSlider-track": {
            backgroundColor: "#008EFA",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#e0e0e0",
          },
        }}
      />
    </Box>
  );
};

export default CustomSlider;
