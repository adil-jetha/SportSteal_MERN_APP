// Add required hooks and components
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
// Define the component HomePage
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");// Verify that the screen width is at least 1000 pixels.
  const { _id, picturePath } = useSelector((state) => state.user);// Access user information in the Redux store.

  // Display the HomePage component.
  return (
    <Box>
      <Navbar />
      {/* Display Navbar*/}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />{/*Render UserWidget */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />{/* Represent MyPostWidget */}
          <PostsWidget userId={_id} />{/*Produce the PostsWidget */}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget /> {/* Display the AdvertWidget*/}
            <Box m="2rem 0" /> {/*Add a margin. */}
            <FriendListWidget userId={_id} /> {/* Produce the FriendListWidget.*/}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
// Default HomePage component export
















