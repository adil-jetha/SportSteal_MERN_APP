
// Create a default export of FlexBetween.
import { Box } from "@mui/material";// Bring up the Box component in the Material-UI library
import { styled } from "@mui/system";// Import the styled method from the System Package Material-UI
// Create a new FlexBetween styled component and provide it specific styling.
const FlexBetween = styled(Box)({
  display: "flex",// Set the flex display attribute.
  justifyContent: "space-between",// Place things evenly spaced out within the container.
  alignItems: "center",// Center objects vertically within the container.

});

export default FlexBetween;
