// Box component imported from Material-UI
import { Box } from "@mui/material";
// Import styling from the Material-UI System
import { styled } from "@mui/system";
// Using Box as a base, create the styled component WidgetWrapper.
const WidgetWrapper = styled(Box)(({ theme }) => ({
  // Create a widget's padding
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  // Setting the backdrop color with the theme palette

  backgroundColor: theme.palette.background.alt,
  // Determine the widget's border radius

  borderRadius: "0.75rem",
}));

export default WidgetWrapper;
// Export the WidgetWrapper part.







