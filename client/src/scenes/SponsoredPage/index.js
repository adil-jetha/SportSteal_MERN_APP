// Add required hooks and components
import { Box, useMediaQuery, Grid, Paper, Typography, Select, MenuItem, Button, Card, CardContent, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "scenes/navbar";
import { PhotoAlbumOutlined } from "@mui/icons-material";
import axios from 'axios';
// Create SponsoredPage
const SponsoredPage = () => {
  // If the current screen is not a mobile screen, check it.
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  // For programmatic navigation, use the hook.
  const navigate = useNavigate()
  // State to keep data retrieved.
  const [data, setData] = useState([]);

  // API data retrieval function
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://sheetdb.io/api/v1/y87lx4zcx0xz3`);
      const data = response.data;
      // Update the state with the retrieved data
      setData(data.map(item => ({
        ProductLink: item['Product Link'],
        Description: item['Description'],
        Link: item['Link'],
        Price: item['Price']
      })));

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Get information on component mounting
  useEffect(() => {
    fetchData();
  }, []);

  console.log('Fetched data:', data);


  // Handles navigation after button click
  const handleNavigate = () => {
    navigate("/sponsored")
  }

  return (
    // The sponsored page's primary container
    <Box>
      {/* Navbar component */}
      <Navbar />
      {/* Content container with responsiveness */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {/* Image grid container */}
        <Grid container spacing={2}>
          {/*}Grid item for the text of the loading images  */}
          <Grid item xs={12}>
            <Typography variant="h4" component="h1">
              Loading Images
            </Typography>
          </Grid>
          {/* Verify that the data is not empty */}
          {data?.length > 0 ? (
            // Map the data and show pictures.
            data?.map((image, index) => (
              // One grid item per image
              <Grid item xs={12} sm={6} md={4} key={index}>/
                {/* Card component for picture information display. */}
                <Card>
                  {/*Card media for the image display  */}
                  <CardMedia
                    component="img"
                    height="400"
                    src={image?.ProductLink}
                    alt={image?.Description}
                  />
                  {/* Card content to show image information */}
                  <CardContent>
                    {/* Show image cost */}
                    <Typography gutterBottom variant="h5" component="div">
                      {image?.Price}
                    </Typography>
                    {/* Show caption for the picture */}
                    <Typography variant="body2" color="text.secondary">
                      {image?.Description}
                    </Typography>
                    <Button variant="contained" color="error" style={{ marginTop: '1rem' }} onClick={() => window.open(`${image?.Link}`, '_blank')}>
                      {/*Buy Now button */}
                      Quick Buy
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (// If the data is empty, display "No Images, Server Down."
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <PhotoAlbumOutlined fontSize="large" />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" component="h2">
                      No Images, Server down
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

export default SponsoredPage;










