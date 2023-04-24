// Import Box from Material in MUI
import { Box } from "@mui/material";

// Displays a user's image through the UserImage component.
const UserImage = ({ image, size = "60px" }) => {// Source of the image:
  // Image's default size
  return (
    // Container for the user image is in 

    <Box width={size} height={size}>
      <img
        // Designing the user image
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        // Base URL for the image source
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};
// Export the component UserImage
export default UserImage;








