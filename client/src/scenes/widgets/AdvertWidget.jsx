// Import the necessary components and libraries
import { useState, useEffect } from "react";
import { Typography, useTheme, IconButton, Button } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import axios from 'axios';
// Definition of the AdvertWidget component
const AdvertWidget = () => {
  // Determine colors and theme information
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  // State to hold retrieved data
  const [data, setData] = useState([]);
  // Get data from external API using this function
  const fetchData = async () => {
    try {
      // Obtain data from the API
      const response = await axios.get(`https://sheetdb.io/api/v1/y87lx4zcx0xz3`);
      const data = response.data;
      // Map and save the retrieved data.
      setData(data.map(item => ({
        ProductLink: item['Product Link'],
        Description: item['Description'],
        Link: item['Link'],
        Price: item['Price']
      })));

    } catch (error) {
      console.error(error);
    }
  };
  // Call fetchData on component mount using effect.
  useEffect(() => {
    fetchData();
  }, []);
  // Take the ProductLink from the retrieved data.

  const slideImages = data.map(item => item.ProductLink);
  // Manage the current slide state
  const [currentSlide, setCurrentSlide] = useState(0);
  // Slide change handling function
  const handleSlideChange = (direction) => {
    if (direction === "next") {
      // Go to the following slide or loop back to the previous slide
      setCurrentSlide((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));
    } else if (direction === "prev") {
      // Loop to the final slide or move to the previous slide.
      setCurrentSlide((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
    }
  };

  // The AdvertWidget component's main function
  return (
    // Widget container container
    <WidgetWrapper>
      {/* Contains the "Sponsored" title and "See More" link for the header. */}
      <FlexBetween>  {/*  Sponsored" heading*/}
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Link to="/sponsored">
          {/* "See More" hyperlink */}
          <Typography color="medium">
            See More
          </Typography>
        </Link>
      </FlexBetween>
      {/* Container for the navigation buttons and picture carousel */}
      <div style={{ position: "relative", width: "100%", height: "auto", overflow: "hidden", borderRadius: "0.75rem", margin: "0.75rem 0" }}>
        {/* Overlay map on slideusing pictures to make image elements */}
        {slideImages.map((img, index) => (
          <Link to="/sponsored">
            <img
              key={img}
              src={img}
              alt="advert"
              style={{
                position: index === currentSlide ? "static" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "auto",
                transition: "opacity 0.5s",
                opacity: index === currentSlide ? 1 : 0,
              }}
            />
          </Link>
        ))}
        {/* Backwards-sliding button */}
        <div style={{ position: "absolute", top: "50%", left: "0", transform: "translateY(-50%)", cursor: "pointer" }} onClick={() => handleSlideChange("prev")}>
          < IconButton ><ArrowBackIosNewRounded /></IconButton>
        </div>
        {/* Slide button next */}
        <div style={{ position: "absolute", top: "50%", right: "0", transform: "translateY(-50%)", cursor: "pointer" }} onClick={() => handleSlideChange("next")}>
          < IconButton ><ArrowForwardIosRounded /></IconButton>
        </div>
      </div>
      {/* Container for the data pertaining to the visible advertisement image */}
      <div>
        {data.map((item, k) => (
          <div key={k} style={{
            position: k === currentSlide ? "static" : "absolute",
            width: "100%",
            height: "auto",
            transition: "opacity 0.5s",
            opacity: k === currentSlide ? 1 : 0,
          }}>
            {/* Presenting the item's pricing */}
            <FlexBetween>
              <Typography variant="h4" component="h4" color={main}>{item.Price}</Typography>
            </FlexBetween>
            {/* Presenting the item's description */}
            <Typography color={medium} m="0.5rem 0">
              {item.Description}
            </Typography>
          </div>
        ))}
      </div>

    </WidgetWrapper>
  );
};

export default AdvertWidget;











