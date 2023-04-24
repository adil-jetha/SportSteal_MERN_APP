// Add required hooks and components
import { Category } from '@mui/icons-material';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { useState } from 'react';
// Component PostCategorizer;
const PostCategorizer = ({
  postId,
  likes,
  picturePath,
  userId,
  userPicturePath,
  name,
  description,
  location,
  comments
}) => {
  // The current category and snackbar state
  const [category, setCategory] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // Category change handler
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  // Saving classified post handler
  const handleSave = () => {
    // Verify that the post has not yet been saved.
    // const getItem = JSON.parse(localStorage.getItem('savedPosts'))
    // const alreadySaved = getItem.find(item => item.postId === postId)
    if (true) {
      // Make an object for categorized posts.
      const categorizedPost = {
        postId,
        category,
        likes,
        picturePath,
        userId,
        userPicturePath,
        name,
        description,
        location,
        comments
      };
      // Access locally saved posts, or use an empty array.
      const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
      // Add a category post to the array of stored posts.
      savedPosts.push(categorizedPost);
      // Locally store the modified savedPosts array.
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
    }
    // Start a snack bar
    setOpenSnackbar(true);

  };
  // Handler for closing the snack bar
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  // Display the PostCategorizer component

  return (
    <Box sx={{ display: 'flex', alignItems: 'justifyCenter' }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Category</InputLabel>
        <Select value={category} label="Category" onChange={handleCategoryChange}>
          <MenuItem value="great">Great</MenuItem>
          <MenuItem value="good">Good</MenuItem>
          <MenuItem value="ok">OK</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ mt: 1.1 }}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Post saved!"
      />
    </Box>
  );
};

export default PostCategorizer;
















