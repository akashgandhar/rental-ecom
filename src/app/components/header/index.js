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


  useEffect(()=> {
    setUserData(JSON.parse(localStorage.getItem("userInfoData")));
    console.log("userData", userData);
  },[])

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
            setFilteredLocations([]); // don't trigger suggestions
            setNoMatchFound(false);
            setMenuAnchor(null); // close dropdown if open
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

        // 🧠 Auto-close suggestion if exact match already typed
        const savedLoc = localStorage.getItem("location");
        if (filtered.length === 1 && filtered[0].name === savedLoc) {
          closeTimeoutRef.current = setTimeout(() => {
            setMenuAnchor(null);
          }, 100); // delay to allow UI to render
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
      sx={{ boxShadow: "none", borderBottom: "1px solid #ddd", padding: "8px 16px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo + Location */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#e63946", display: "flex", gap: 1, cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            <Image src={HomeIcon} alt="homeIcon" style={{width:"146px", height:"45px"}} />
            {/* <span style={{ color: "#696969" }}>What a Market!</span> */}
            {/* <Image src={loginImg} alt="logo" title="logo" /> */}

          </Typography>

          {/* Location Input */}
          <Box
            ref={inputWrapperRef}
            sx={{
              display: "flex",
              alignItems: "center",
              background: "#f5f5f5",
              padding: "6px 12px",
              borderRadius: "6px",
              minWidth: "200px",
            }}
          >
            <LocationOnIcon sx={{ color: "#666" }} />
            <TextField
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter Location"
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
                style: { marginLeft: 8 },
              }}
            />
            <ArrowDropDownIcon />
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
              sx: { width: inputWrapperRef.current?.offsetWidth || 200 },
            }}
          >
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <MenuItem key={loc.id} onClick={() => handleLocationSelect(loc)}>
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

        {/* Middle */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {["Rent", "Buy", "Hire Operator", "Parts"].map((item) => (
            <Typography key={item} variant="body1" sx={{ cursor: "pointer", fontWeight: "500", color: "#333" }}>
              {item}
            </Typography>
          ))}
        </Box>

        {/* Right */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
       {userData &&    <Button variant="outlined" sx={{ borderColor: "#ff8800", color: "#ff8800", fontWeight: "bold" }}>
           {userData?.contactNumber}
          </Button>}
          <IconButton color="inherit" onClick={() => router.push("/checkoutPage")}>
            <Badge color="error">
              <ShoppingCartIcon />
            </Badge>
            <Typography variant="body2" sx={{ marginLeft: "10px", fontWeight: "500" }}>
              Cart
            </Typography>
          </IconButton>
          {userData?.fullName ? 
       <Avatar sx={{ bgcolor: "#212529", width: 40, height: 40 }}>
       {userData.fullName.charAt(0).toUpperCase()}
     </Avatar> 
        :
          <Button onClick={handleSignIn} variant="contained" sx={{ backgroundColor: "#212529", color: "white" }}>
          Sign In
          </Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
