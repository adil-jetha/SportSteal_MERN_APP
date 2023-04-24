// Import UI elements made of material and icons.

import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  BookmarkBorder,
  BookmarkOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, Button, TextField } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import PostCategorizer from "./PostCategorizer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import axios from 'axios'
// Definition of the PostWidget component

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments
}) => {
  // Post categories and comment state management
  const [isComments, setIsComments] = useState(false);
  const [newcomment, setNewComment] = useState('')
  const [PostCategory, setPostCategory] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  // Get styling theme colors.
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  // Load the post's comments
  const [loadcomments, setLoadComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${postId}/get/comment`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setLoadComments(response.data.comments);
      })
      .catch(error => {
        console.error(error);
      });
  }, [postId, token, newcomment, loadcomments]);

  // Control function for like a post
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  // Comment-posting functionality
  const postComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/posts/${postId}/comment`,
        {
          userId: loggedInUserId,
          postId: postId,
          comment: newcomment,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Comment-adding functionality
  const addComment = () => {
    postComment()
  }


  // Controls how to share a post
  const handleShare = () => {
    const postUrl = `http://localhost:3000/posts`;
    navigator.clipboard.writeText(postUrl);
  };
















  return (
    // Marginally encircle the widget
    <WidgetWrapper m="2rem 0">
      <Friend
        // Show contact details for friends
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      {/* Display the description; if a link is present, display a button; else, display text. */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {/* {description.includes('.com') ? <a href={description} target="_blank" rel="noreferrer">Best Buy Link</a> : description } */}
        {description.includes('.com') ? (
          <Button
            onClick={() => window.open(description, "_blank")}
            variant="contained"
            style={{
              cursor: "pointer",
            }}
          >
            Best Buy Link
          </Button>
        ) : (
          <p>{description}</p>
        )}

      </Typography>
      {/* Show the image; use the link if it is a link; else, use the local path. */}
      {picturePath && picturePath.includes(".com") ? (
        <img
          width="100%"
          height="280px"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${picturePath}`}
        />
      ) : (
        <img
          width="100%"
          height="280px"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      {/* Show counts for the like and comment buttons. */}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            {/* Switch the "like" button. */}
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            {/*Display the likes. */}
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            {/* Switch the comments off */}
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            {/* Show the number of comments */}
            <Typography>{loadcomments?.length}</Typography>
          </FlexBetween>



          {/* Render the save icon only if it is in the saved path. */}
          {!window.location.pathname.includes('saved') &&
            <IconButton onClick={() => setPostCategory(!PostCategory)}>
              {/* Switch PostCategory and show associated bookmark icon */}
              {PostCategory ? (
                <BookmarkBorder sx={{ color: primary }} />
              ) : (
                <BookmarkBorder />
              )}
            </IconButton>
          }
        </FlexBetween>
        <IconButton onClick={handleShare}>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {/* Only render the comments section if necessary. */}
      {isComments && (
        <Box mt="0.5rem">
          <TextField
            id="my-text-field"
            label=""
            name="comment"
            variant="standard"
            placeholder="Add your Comment"
            size="small"
            sx={{ p: "0.3rem" }}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button variant="contained" size="small" onClick={addComment} >
            Add
          </Button>
          {/* Display and reverse the comment list. */}
          {loadcomments?.map(comment => (
            <Box key={comment._id}>
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment?.comment}</Typography>
            </Box>
          )).reverse()}
          {comments.length > 1 && <Divider />}
        </Box>
      )}


      <Box mt="0.5rem">
        {/*Only display the PostCategorizer component if necessary.*/}
        {PostCategory && <PostCategorizer postId={postId} likes={likes} picturePath={picturePath}
          userPicturePath={userPicturePath}
          name={name}
          description={description}
          location={location}
          comments={comments} />}
      </Box>
    </WidgetWrapper>
  );
};

export default PostWidget;








