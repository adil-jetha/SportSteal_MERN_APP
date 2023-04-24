// Bring in the required icons
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
// Import the required MUI hooks and components.
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
// Import unique parts
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
// Import Redux and React hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// importing an action to set posts
import { setPosts } from "state";

// Create the component MyPostWidget
const MyPostWidget = ({ picturePath }) => {
  // Set hooks and variables in the code
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  // Post-submission handling function
  const handlePost = async () => {
    // Generate FormData and add required info.
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    // Send server a POST request
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    // Refresh state with the answer
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };
  // Create the component MyPostWidget.
  return (
    // Use the WidgetWrapper component to enclose the entire widget.
    <WidgetWrapper>
      {/* Create a flex container to horizontally align components with a gap. */}
      <FlexBetween gap="1.5rem">
        {/* Show the person's profile picture */}
        <UserImage image={picturePath} />
        {/* Make a post input form for the user to fill out */}
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {/* If isImage is true, render the image upload section only if necessary. */}
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* Establish a Dropzone for picture uploads. */}
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                {/* Make a prompt or box to display the image preview. */}
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {/* Only display the image preview or prompt text when necessary. */}
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {/* Render a delete button for the uploaded picture under certain conditions. */}
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {/* Make a separator with a customizable margin. */}
      <Divider sx={{ margin: "1.25rem 0" }} />
      {/* Make the elements' flex container. */}
      <FlexBetween>
        {/* Make a flex container for the label and image icon, switching to the isImage state when clicked. */}
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          {/* Show the image icon in a specific color. */}
          <ImageOutlined sx={{ color: mediumMain }} />
          {/* Show the label "Image" in custom color and hover mode. */}
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>
        {/* Based on the value of isNonMobileScreens, conditional rendering */}
        {isNonMobileScreens ? (
          <>
            {/*  Create a blank fragment for desktop and laptop computers.*/}
          </>
        ) : (
          // On mobile screens, provide a flex container for the "more options" button.
          <FlexBetween gap="0.25rem">
            {/* Use a custom color to display the more options icon. */}
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        { /* Create a custom "POST" button with handlePost as the onClick event. */}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
      {/* End WidgetWrapper execution */}
    </WidgetWrapper>
  );
};

// Export the component MyPostWidget
export default MyPostWidget;






