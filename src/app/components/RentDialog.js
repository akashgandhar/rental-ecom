"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { API_DOMAIN } from "../helper/constant";
// import { useDispatch, useSelector } from "react-redux";

// Replace with your actual domain API
const API_URL = `${API_DOMAIN}/location/stateList?start=0&size=25`;

export default function RentDialog({ open, onClose, product }) {
  console.log("idddddd", product)
  // const dispatch = useDispatch();
  // const selectedLoation = useSelector((state) => state.location.selectedLocation);
  const [location, setLocation] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });


  let guestInfo = null;
 
   
    const daaaaa =  [
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 2,
            "name": "ANDHRA PRADESH"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 3,
            "name": "ARUNACHAL PRADESH "
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 4,
            "name": "ASSAM "
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 5,
            "name": "BIHAR"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 6,
            "name": "CHANDIGARH UT"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 7,
            "name": "CHHATTISGARH "
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 8,
            "name": "DADRA AND NAGAR HAVELI UT"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 9,
            "name": "DAMAN AND DIU UT"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 10,
            "name": "DELHI"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 11,
            "name": "GOA"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 12,
            "name": "GUJARAT"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 13,
            "name": "HARYANA "
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 14,
            "name": "HIMACHAL PRADESH "
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 15,
            "name": "JAMMU AND KASHMIR  "
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 16,
            "name": "JHARKHAND "
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 17,
            "name": "KARNATAKA "
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 18,
            "name": "KERALA "
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 19,
            "name": "LAKSHADWEEP UT"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 20,
            "name": "MADHYA PRADESH "
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 21,
            "name": "MAHARASHTRA "
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 22,
            "name": "MANIPUR"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 23,
            "name": "MEGHALAYA"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 24,
            "name": "MIZORAM"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 25,
            "name": "NAGALAND"
        },
        {
            "createdDate": "10 Apr 2023 12:00:00 AM",
            "modifiedDate": "10 Apr 2023 12:00:00 AM",
            "createdBy": "1",
            "modifiedBy": "1",
            "status": true,
            "id": 26,
            "name": "ORISSA "
        }
      ]
  
      
            
      

  // Fetch locations when dialog opens
  useEffect(() => {
    if (open) {
      axios
        .get(API_URL)
        .then((res) => setLocationList(daaaaa))
        .catch((err) => {
          console.error("Failed to fetch locations:", err);
          setLocationList(daaaaa)
        });
    }
    checkUserOrCreateGuest()
  }, [open]);

  const handleAddToCart = () => {
    console.log("kkkkkkkk")
    
    const API_URL = `${API_DOMAIN}/cart/add`;
    const cartData = {
      product,
      location,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
    };
    console.log("Cart Data:", cartData);
    onClose();
    setLocation("");
    setStartDate(null);
    setEndDate(null);
// Your POST API endpoint

// Body data
const userInfo = JSON.parse(localStorage.getItem("userInfoData") || localStorage.getItem("guestInfo"))

const data = {
  productId:product?.variant,
    count:1,
    userId:userInfo?.userId,
    startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
    location:location
};

// Make the POST request
const gstInfo = JSON.parse(localStorage.getItem("guestInfo"));
console.log("gstInfo", gstInfo)
axios
  .post(API_URL, data,
     {
    headers: {
      Authorization: `Bearer ${gstInfo?.token}`, // 👈 Add token here
      "Content-Type": "application/json",
    },})
  .then((response) => {
    console.log("Response:", response.data);
    setSnackbar({
      open: true,
      message: "Product added to cart successfully!",
      severity: "success",
    });
  })

  
  .catch((error) => {
    console.error("Error:", error);
    setSnackbar({
      open: true,
      message: "Failed to add product to cart. Please try again.",
      severity: "error",
    });
  });

  };

  console.log("locationList", locationList);

  const handleSelect = () => {
    dispatch(setLocation({ name: "Rajasthan", id: 10 }));
  };

  const checkUserOrCreateGuest = async () => {
    console.log("Checking user or guest...");
  
    const userInfo = localStorage.getItem("userInfoData");
    const existingGuestInfo = localStorage.getItem("guestInfo");
  
    // ✅ If either userInfo or guestInfo exists, skip API call
    if (userInfo || existingGuestInfo) {
      console.log("User or Guest already exists. Skipping API call.");
      return;
    }
  
    // ✅ Else, create guest user
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
        console.log("✅ Guest user created:", data);
      } else {
        console.error("❌ Failed to create guest user");
      }
    } catch (error) {
      console.error("❌ API error while creating guest user:", error);
    }
  };
  

  return (
    <>
    <Snackbar
    open={snackbar.open}
    autoHideDuration={4000}
    onClose={() => setSnackbar({ ...snackbar, open: false })}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <Alert
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      severity={snackbar.severity}
      variant="filled"
      sx={{ width: "100%" }}
    >
      {snackbar.message}
    </Alert>
  </Snackbar>
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: "white",
        },
      }}
    >
      {/* Title with Close Button */}
      <Box
        sx={{
          backgroundColor: "#FFF3E0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
        }}
      >
        <Box>
          <Typography variant="h6">{product?.name}</Typography>
          {/* <Typography variant="body2" color="textSecondary">
            Variant: {product?.variant || "N/A"}
          </Typography> */}
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "black" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Where is your jobsite location?
        </Typography>
        <TextField
          fullWidth
          select
          label="Search Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          margin="normal"
        >
          {locationList.map((loc) => (
            <MenuItem key={loc.id} value={loc.name}>
              {loc.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Calendar Date Pickers */}
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Start Date
              </Typography>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                disablePast
                format="YYYY-MM-DD"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                End Date
              </Typography>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                disablePast
                format="YYYY-MM-DD"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </DialogContent>

      {/* Action Buttons */}
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "orange",
            color: "white",
            px: 6,
            borderRadius:"10px",
            "&:hover": { bgcolor: "#f57c00" },
          }}
          onClick={handleAddToCart}
          disabled={!location || !startDate || !endDate}
        >
          Add to Cart
        </Button>
      </DialogActions>


    </Dialog>
    </>
  );
}
