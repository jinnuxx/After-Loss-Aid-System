import React from "react";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(
  ({ theme, themepalette, customwidth, marginright, margintop, disabled }) => ({
    ...theme.typography.large16,
    textTransform: "none",
    width: customwidth ? customwidth : "185px",
    height: "39px",
    backgroundColor: theme.palette[themepalette].main,
    color: theme.palette[themepalette].mainfont,
    border: `1px solid ${theme.palette[themepalette].mainborder}`,
    borderRadius: "10px",
    padding: "10px 20px",
    marginRight: marginright ? marginright : "0px",
    marginTop: margintop ? margintop : "10px",
    "&:hover": {
      backgroundColor: theme.palette[themepalette].hower,
      color: theme.palette[themepalette].howerfont,
      border: `1px solid ${theme.palette[themepalette].howerborder}`,
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
      border: `1px solid ${theme.palette.action.disabled}`,
    },
  })
);
const CustomButton = ({
  themePalette,
  onClick,
  disabled,
  customWidth,
  children,
  marginRight,
  marginTop,
}) => {
  return (
    <StyledButton
      themepalette={themePalette}
      customwidth={customWidth}
      onClick={onClick}
      disabled={disabled}
      marginright={marginRight}
      margintop={marginTop}
    >
      {children}
    </StyledButton>
  );
};
export default CustomButton;
