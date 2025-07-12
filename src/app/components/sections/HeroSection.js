"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import bannerVideo from "../../../public/assets/-5ac0-4917-a8dd-41d72f383edd.mp4";
import catImage from "../../../public/assets/Frame 162.png";
import { API_DOMAIN } from "@/app/helper/constant";

const HeroSection = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");

  const handleFilter = async (value) => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("userInfoData") || localStorage.getItem("guestInfo") || "{}");
      const token = tokenData?.token;

      const response = await axios.get(`${API_DOMAIN}/product/all?start=0&size=25`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filtered = response.data.data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setProductList(filtered);
    } catch (err) {
      console.error("Search Error:", err);
    }
  };

  const checkUserOrCreateGuest = async () => {
    const userInfo = localStorage.getItem("userInfoData");
    const existingGuestInfo = localStorage.getItem("guestInfo");
  
    if (userInfo || existingGuestInfo) {
      return;
    }
  
    try {
      const response = await fetch(`${API_DOMAIN}/guestUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("guestInfo", JSON.stringify(data));
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_DOMAIN}/category/all?start=0&size=10`);
        setCategories(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    checkUserOrCreateGuest();
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src={bannerVideo} type="video/mp4" />
        </video>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(13, 27, 57, 0.7)",
            zIndex: 0,
          }}
        />

        <Container sx={{ position: "relative", zIndex: 1, maxWidth: "1200px" }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: "32px", sm: "48px", md: "64px" },
              lineHeight: { xs: "40px", sm: "56px", md: "72px" },
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              mb: 3,
              fontFamily: "'Inter', sans-serif"
            }}
          >
            RENT EQUIPMENT FASTER & BETTER
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
              lineHeight: "28px",
              maxWidth: "600px",
              mx: "auto",
              mb: 5,
              opacity: 0.9,
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Browse from a wide range of quality-checked construction equipment. Rent,
            buy, or sell in just a few clicks.
          </Typography>

          <Box 
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 6
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "white",
                borderRadius: "50px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                maxWidth: "600px",
                width: "100%",
                height: "56px"
              }}
            >
              <Autocomplete
                freeSolo
                options={productList.map((p) => p.name)}
                onInputChange={(e, value) => {
                  setSearch(value);
                  handleFilter(value);
                }}
                onChange={(e, value) => {
                  const selectedProduct = productList.find((p) => p.name === value);
                  console.log("Selected Product: ", selectedProduct);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search for equipment..."
                    variant="standard"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "#888", ml: 2 }} />
                        </InputAdornment>
                      ),
                      sx: {
                        height: "56px",
                        pl: 1,
                        fontSize: "16px",
                        fontFamily: "'Inter', sans-serif"
                      },
                    }}
                  />
                )}
                sx={{ flexGrow: 1 }}
              />
              
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#1D3058",
                  color: "white",
                  height: "56px",
                  px: 4,
                  fontWeight: 600,
                  borderRadius: "0 50px 50px 0",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: "'Inter', sans-serif",
                  "&:hover": { bgcolor: "#152544" },
                  minWidth: "180px"
                }}
                onClick={() => {
                  const selectedProduct = productList.find((p) => p.name === search);
                  if (selectedProduct?.id) {
                    router.push(`/productDetails?id=${selectedProduct.id}`);
                  } else {
                    alert("Please select a valid product from suggestions.");
                  }
                }}
              >
                RENT EQUIPMENT
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              maxWidth: "800px",
              mx: "auto"
            }}
          >
            {[
              "Excavator", "Boom Lift", "Skid Steer", "Bulldozer", 
              "Crane", "Forklift", "Compactor", "Generator"
            ].map((tag) => (
              <Box
                key={tag}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "25px",
                  px: 3,
                  py: 1,
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: "'Inter', sans-serif",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.25)",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Equipment Categories */}
      <Box
        sx={{
          position: "absolute",
          top: "calc(100vh - 80px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          width: "100%",
          maxWidth: "1200px",
          px: 2
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {categories?.slice(0, 6).map((item) => (
            <Grid item key={item.id}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  bgcolor: "white",
                  textAlign: "center",
                  width: "140px",
                  height: "140px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.15)"
                  }
                }}
                onClick={() => router.push(`/listingPage?id=${item?.id}`)}
              >
                <Image src={catImage} alt="image" width={60} height={60} />
                <Typography 
                  sx={{
                    fontSize: "14px", 
                    fontWeight: 600, 
                    mt: 2,
                    color: "#1D3058",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: "18px"
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HeroSection;