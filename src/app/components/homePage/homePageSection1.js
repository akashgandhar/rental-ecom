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

// Static Assets
import bannerVideo from "../../../public/assets/-5ac0-4917-a8dd-41d72f383edd.mp4";
import catImage from "../../../public/assets/Frame 162.png";
import { API_DOMAIN } from "@/app/helper/constant";
import { Crushed } from "next/font/google";

// 🔧 Hero Section with Search
const HeroSection = ({ search, setSearch, productList, handleFilter, router }) => 
  (
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 0,
      }}
    />

    <Container sx={{ position: "relative", zIndex: 1 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ marginInline: "20px", textTransform:"uppercase", fontSize:"64px" }}>
      Rent EqUipment Faster & Better
      </Typography>
      <Typography
        variant="body1"
        mt={2}
        maxWidth="600px"
        mx="auto"
        sx={{ fontSize: "16px" }}
      >
        Browse from a wide range of quality-checked construction equipment. Rent,
        buy, or sell in just a few clicks.
      </Typography>

      {/* Search Bar with Button */}
      <Box mt={3} display="flex" justifyContent="center">
        <Box style={{padding:"7px 10px"}}
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "white",
            borderRadius: "30px",
            overflow: "hidden",
            boxShadow: 2,
            maxWidth: "600px",
            width: "100%",
            marginTop: "20px",
            px: 2,
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
                      <SearchIcon sx={{ color: "#888" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: "white",
                    borderRadius: "30px 0 0 30px",
                    height: "48px",
                    pl: 2,
                  },
                }}
              />
            )}
            sx={{ flexGrow: 1 }}
          />
{/* <a href={`/productDetails?id=${selectedProduct?.id}`} >
            <Button
            variant="contained"
            // onClick={() => console.log("Search clicked:", search)}
            sx={{
              bgcolor: "#1D3058",
              color: "white",
              height: "40px",
              px: 3,
              fontWeight: "bold",
              ml: 2,
              borderRadius: "30px",
              "&:hover": { bgcolor: "#1D3058" },
            }}

            // onClick={() => ("/productDetails")}
          >
            RENT EQUIPMENT
          </Button>
          </a> */}
          <Button
  variant="contained"
  sx={{
    bgcolor: "#1D3058",
    color: "white",
    height: "40px",
    px: 3,
    fontWeight: "bold",
    ml: 2,
    borderRadius: "30px",
    padding:"25px",
    "&:hover": { bgcolor: "#1D3058" },
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
    </Container>
  </Box>
);

// 🛠 Equipment Categories Component
const EquipmentCategory = ({ categories }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        py: 5,
        position: "absolute",
        background: "none",
        top: "96%",
        left: "25%",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {categories?.map((item) => (
          <Grid item key={item.id}>
            <Box style={{cursor:"pointer"}}
              sx={{
                p: 2,
                borderRadius: "15px",
                bgcolor: "white",
                textAlign: "center",
                width: "120px",
                boxShadow: 3,
              }}
              onClick={() => router.push(`/listingPage?id=${item?.id}`)}
            >
              <Image src={catImage} alt="image" width={50} height={50} />
              <Typography fontSize="14px" fontWeight="bold" mt={1}>
                {item.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// 🧩 Main Component
export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");

  const handleFilter = async (value) => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("userInfoData") || localStorage.getItem("guestInfo"));
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
    console.log("Checking user or guest...");
  
    const userInfo = localStorage.getItem("userInfoData");
    const existingGuestInfo = localStorage.getItem("guestInfo");
  
    // ✅ Skip API call if either userInfoData or guestInfo is present
    if (userInfo || existingGuestInfo) {
      console.log("User or Guest already exists. Skipping API call.");
      return;
    }
  
    try {
      const response = await fetch(`${API_DOMAIN}/guestUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({}) // optional payload
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("guestInfo", JSON.stringify(data));
        console.log("✅ Guest user created:", data);
      } else {
        console.error("❌ Failed to create guest user");
      }
    } catch (error) {
      console.error("❌ API error:", error);
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
    <>
      <HeroSection
        search={search}
        setSearch={setSearch}
        productList={productList}
        handleFilter={handleFilter}
        router={useRouter()} // ✅ pass router

      />
      <EquipmentCategory categories={categories} />
    </>
  );
}
