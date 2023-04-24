// Import the required components and libraries
import { Box, useMediaQuery, Grid, Paper, Typography, Select, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import { PhotoAlbumOutlined } from "@mui/icons-material";
import PostWidget from "scenes/widgets/PostWidget";

const SavedPage = () => {
  // Set state variable initial values
  const [savedPosts, setsavedPosts] = useState([]);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [selectedCategory, setSelectedCategory] = useState("all");
  // Get saved posts from local storage using this function.
  const getsavedPosts = () => {
    const savedPosts = window.localStorage.getItem('savedPosts');
    const data = JSON.parse(savedPosts);
    setsavedPosts(data);
    console.log('19-->', data)
  };
  // Handle category change in this function
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Handles removing a piece of content from stored posts
  const handleRemoveItem = (index) => {
    const items = JSON.parse(localStorage.getItem('savedPosts')) || [];
    items.splice(index, 1);
    localStorage.setItem('savedPosts', JSON.stringify(items));
    window.location.reload();
  }
  // Deletes all previously saved posts
  const deleteAllSaved = () => {
    localStorage.removeItem("savedPosts")
  }
  // When the component is mounted, useEffect to retrieve saved posts.
  useEffect(() => {
    getsavedPosts();
  }, []);

  // Sort photos according to the chosen category
  const filteredImages = selectedCategory === 'all'
    ? savedPosts
    : savedPosts.filter((image) => image.category === selectedCategory);

  // Start the component SavedPage
  return (
    <Box>
      <Navbar /> {/* Navbar component */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >  {/* Grid container */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1">
              {/* Title of page */}
              My Saved Images
            </Typography>
          </Grid>
          {/* Categorization filter */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">{
            /* Choose the component for the category filter. */}
              <Select value={selectedCategory} onChange={handleCategoryChange}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="great">Great</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="ok">Ok</MenuItem>
              </Select>
              {/*(Commented out) Delete All button  */}
              {/* <Button onClick={deleteAllSaved}>Delete All </Button> */}
            </Box>
          </Grid>
          {/*Show filtered pictures  */}
          {filteredImages?.length > 0 ? (
            filteredImages?.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                {/* Each image's PostWidget component */}
                <PostWidget
                  postId={image.postId}
                  postUserId={image.userId}
                  name={image.name}
                  description={image.description}
                  location={image.location}
                  picturePath={image?.picturePath}
                  userPicturePath={image?.userPicturePath}
                  likes={image?.likes}
                  comments={image?.comments}
                />  {/* Remove (commented out) button */}
                {/* <Button variant="contained" color="error" style={{ marginTop: '1rem' }}
                  onClick={() => handleRemoveItem(index)}>Remove</Button> */}
              </Grid>
            ))
          ) : (  // If no images were located for the chosen category, display a message.
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <PhotoAlbumOutlined fontSize="large" />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" component="h2">
                      No saved images found for this category
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
// End component for SavedPage

export default SavedPage;