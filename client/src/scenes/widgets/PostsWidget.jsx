// Import the required Redux state management routines and hooks.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
// Import the component PostWidget
import PostWidget from "./PostWidget";
// Definition of the PostsWidget component
const PostsWidget = ({ userId, isProfile = false }) => {
  // Hooks to control Redux state retrieval and dispatch
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  // Get all posts using this function
  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // Refresh posts with the Redux state
    dispatch(setPosts({ posts: data }));
  };
  // Function to retrieve posts particular to a user.
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();// Refresh posts with the Redux state
    dispatch(setPosts({ posts: data }));
  };
  // get posts on component mount using the useEffect hook
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>  {/* For each post, render PostWidget components. */}
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,

        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      ).reverse()}
    </>
  );
};

export default PostsWidget;





