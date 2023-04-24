// Import the necessary parts and functions.
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  CheckCircleRounded,
  OpenInFull
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, TextField } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import axios from 'axios'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create the component UserWidget.
const UserWidget = ({ userId, picturePath }) => {
  // State variables 
  const [user, setUser] = useState(null);
  const { _id } = useSelector((state) => state.user);
  const [err, setErr] = useState(false)
  const [InputBox, setInputBox] = useState(false);
  const [InputBoxInsta, setInputBoxInsta] = useState(false)
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  console.log('122', token)
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // Get the user information
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log('39', data);
    setUser(data);
  };

  // Update user information
  const updateUser = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/users/${userId}`,
        { twitter, linkedIn: user.linkedIn, instagram },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Whenever the component mounts, fetch the user data.
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // If the user data is not accessible, return null.
  if (!user) {
    return null;
  }
  // User attributes are deconstructed.
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    twitter,
    linkedIn,
    instagram,
  } = user;

  // Manage the Twitter form submission
  const handleTwitterSubmit = () => {
    updateUser()
    setInputBox(false)
  }

  // Manage the Instagram form submission
  const handleInstaSubmit = () => {
    console.log('102', linkedIn)
    updateUser()
    setInputBoxInsta(false)
  }
  // Take the URL's profile ID.
  const ProfileId = window.location.pathname.split("/").pop()

  // Manage modifications to input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  console.log('103', linkedIn, twitter, instagram)
  return (// Return the UserWidget component's JSX.
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>



      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" onClick={() => window.open(`https://twitter.com/${twitter}`, '_blank')} />
            <Box>
              <Typography color={main} fontWeight="500" onClick={() => window.open(`https://twitter.com/${twitter}`, '_blank')}>
                Twitter
              </Typography>
              {InputBox ?
                <>
                  <TextField id="standard-basic" label="" variant="standard"
                    name="twitter" onChange={handleInputChange} />

                </>
                :
                <>
                  <Typography color={medium} onClick={() => window.open(`https://twitter.com/${twitter}`, '_blank')}>{twitter}</Typography>

                </>
              }
            </Box>
          </FlexBetween>
          {(_id === ProfileId) ? (InputBox ?

            <CheckCircleRounded onClick={handleTwitterSubmit} />
            :
            <EditOutlined sx={{ color: main }} onClick={() => setInputBox(!InputBox)} />
          ) : ''}
        </FlexBetween>

        {/* //Instagram */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem" >
            <img src="../assets/insta.png" alt="instagram" onClick={() => window.open(`https://instagram.com/${instagram}`, '_blank')} />
            <Box>
              <Typography color={main} fontWeight="500" onClick={() => window.open(`https://instagram.com/${instagram}`, '_blank')}>
                Instagram
              </Typography>
              {InputBoxInsta ?
                <>
                  <TextField id="standard-basic" label="" variant="standard"
                    name="instagram" onChange={handleInputChange} />

                </>
                :
                <>
                  <Typography color={medium} onClick={() => window.open(`https://instagram.com/${instagram}`, '_blank')}>{instagram}</Typography>

                </>
              }
            </Box>
          </FlexBetween>
          {(_id === ProfileId) ? (InputBoxInsta ?

            <CheckCircleRounded onClick={handleInstaSubmit} />
            :
            <EditOutlined sx={{ color: main }} onClick={() => setInputBoxInsta(!InputBoxInsta)} />
          ) : ''}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};
// Export the component UserWidget
export default UserWidget;











