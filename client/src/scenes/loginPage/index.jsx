// Import required components from the local Form component and MUI.
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
// Create the functional component for the LoginPage.
const LoginPage = () => {
  // Open the active theme

  const theme = useTheme();
  // (Min-width: 1000px) Determine if the screen is non-mobile.
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");


  // Produce the component's login page.
  return (
    <Box>
      {/* Create an app name header box. */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sportsteals
        </Typography>
      </Box>
      {/* Create a box with the greeting and the Form component in it. */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to SportSteals, the Retail Social Media for Sport lovers!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

// Export the component LoginPage
export default LoginPage;












