"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  TextField,
  Avatar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from "next/image";
import HomeIcon from "../../../public/assets/loginImg.png";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_DOMAIN } from "@/app/helper/constant";

export default function Navbar() {
  const router = useRouter();

  const [locationInput, setLocationInput] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [noMatchFound, setNoMatchFound] = useState(false);
  const inputWrapperRef = useRef(null);
  const isInitialMount = useRef(true);
  const closeTimeoutRef = useRef(null);
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userInfoData")));
  }, []);

  // Fetch locations and apply saved location on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_DOMAIN}/location/stateList?start=0&size=25`);
        const locations = res.data?.data || [];
        setAllLocations(locations);

        const savedLoc = localStorage.getItem("location");
        if (savedLoc) {
          const matched = locations.find((loc) => loc.name === savedLoc);
          if (matched) {
            setLocationInput(matched.name);
            setFilteredLocations([]);
            setNoMatchFound(false);
            setMenuAnchor(null);
          }
        }
      } catch (err) {
        console.error("Location fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // Search filter after typing
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const delay = setTimeout(() => {
      if (locationInput.trim()) {
        const filtered = allLocations.filter((state) =>
          state.name.toLowerCase().includes(locationInput.trim().toLowerCase())
        );
        setFilteredLocations(filtered);
        setNoMatchFound(filtered.length === 0);
        setMenuAnchor(inputWrapperRef.current);

        const savedLoc = localStorage.getItem("location");
        if (filtered.length === 1 && filtered[0].name === savedLoc) {
          closeTimeoutRef.current = setTimeout(() => {
            setMenuAnchor(null);
          }, 100);
        }
      } else {
        setFilteredLocations([]);
        setNoMatchFound(false);
        setMenuAnchor(null);
      }
    }, 400);

    return () => {
      clearTimeout(delay);
      clearTimeout(closeTimeoutRef.current);
    };
  }, [locationInput]);

  const handleLocationSelect = (loc) => {
    setLocationInput(loc.name);
    localStorage.setItem("location", loc.name);
    setMenuAnchor(null);
    setNoMatchFound(false);
  };

  const handleSignIn = () => {
    router.push("/Register");
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{ 
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)", 
        borderBottom: "1px solid #E5E7EB", 
        bgcolor: "white",
        py: 1
      }}
    >
      <Toolbar 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          maxWidth: "1400px",
          width: "100%",
          mx: "auto",
          px: { xs: 2, md: 3 }
        }}
      >
        {/* Logo + Location */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Typography
            variant="h6"
            sx={{ 
              fontWeight: "bold", 
              color: "#1D3058", 
              display: "flex", 
              gap: 1, 
              cursor: "pointer" 
            }}
            onClick={() => router.push("/")}
          >
            <Image 
              src={HomeIcon} 
              alt="BidForSure" 
              style={{ width: "146px", height: "45px" }} 
            />
          </Typography>

          {/* Location Input */}
          <Box
            ref={inputWrapperRef}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              background: "#F8F9FA",
              padding: "8px 16px",
              borderRadius: "8px",
              minWidth: "220px",
              border: "1px solid #E5E7EB"
            }}
          >
            <LocationOnIcon sx={{ color: "#666", mr: 1 }} />
            <TextField
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter Location"
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: { 
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif"
                },
              }}
            />
            <ArrowDropDownIcon sx={{ color: "#666" }} />
          </Box>

          {/* Suggestion Dropdown */}
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor) && (filteredLocations.length > 0 || noMatchFound)}
            onClose={() => {
              setMenuAnchor(null);
              setNoMatchFound(false);
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            PaperProps={{
              sx: { 
                width: inputWrapperRef.current?.offsetWidth || 220,
                mt: 1,
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
              },
            }}
          >
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <MenuItem 
                  key={loc.id} 
                  onClick={() => handleLocationSelect(loc)}
                  sx={{ 
                    fontSize: "14px",
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {loc.name}
                </MenuItem>
              ))
            ) : noMatchFound ? (
              <MenuItem disabled>No location found</MenuItem>
            ) : (
              <MenuItem disabled>Searching...</MenuItem>
            )}
          </Menu>
        </Box>

        {/* Navigation Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          {["Rent", "Buy", "Hire Operator", "Parts"].map((item) => (
            <Typography 
              key={item} 
              variant="body1" 
              sx={{ 
                cursor: "pointer", 
                fontWeight: 500, 
                color: "#1D3058",
                fontSize: "16px",
                fontFamily: "'Inter', sans-serif",
                "&:hover": { color: "#FF8D01" },
                transition: "color 0.2s ease"
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {userData && (
            <Button 
              variant="outlined" 
              sx={{ 
                borderColor: "#FF8D01", 
                color: "#FF8D01", 
                fontWeight: 600,
                fontSize: "14px",
                borderRadius: "8px",
                textTransform: "none",
                fontFamily: "'Inter', sans-serif",
                "&:hover": {
                  borderColor: "#E67E00",
                  bgcolor: "rgba(255, 141, 1, 0.05)"
                }
              }}
            >
              {userData?.contactNumber}
            </Button>
          )}
          
          <IconButton 
            color="inherit" 
            onClick={() => router.push("/checkoutPage")}
            sx={{ color: "#1D3058" }}
          >
            <Badge color="error">
              <ShoppingCartIcon />
            </Badge>
            <Typography 
              variant="body2" 
              sx={{ 
                marginLeft: "8px", 
                fontWeight: 500,
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Cart
            </Typography>
          </IconButton>
          
          {userData?.fullName ? (
            <Avatar 
              sx={{ 
                bgcolor: "#1D3058", 
                width: 40, 
                height: 40,
                fontSize: "16px",
                fontWeight: 600
              }}
            >
              {userData.fullName.charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <Button 
              onClick={handleSignIn} 
              variant="contained" 
              sx={{ 
                backgroundColor: "#1D3058", 
                color: "white",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "8px",
                fontSize: "14px",
                textTransform: "none",
                fontFamily: "'Inter', sans-serif",
                "&:hover": { backgroundColor: "#152544" }
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}