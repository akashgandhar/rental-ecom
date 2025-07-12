"use client"
import { useState } from "react";
import { Box, Button, Card, CardContent, Container, Grid, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Image from "next/image";
import partnerImage from "../../../public/assets/Frame 203 (1).png"
import icons from "../../../public/assets/Frame (1).png"
// Dummy Icons (Replace with actual icons)
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TruckIcon from "../../../public/assets/Frame 162 (1).png"
import { alignProperty } from "@mui/material/styles/cssUtils";

const HomePageSection6 = () => {
  const [userType, setUserType] = useState("buyer");

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: "#0D1B39", color: "white", py: 6, borderRadius: "24px 24px 0 0" }}>
        <Container>
          {/* Title + Toggle Buttons */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} sx={{display:"block", borderRadius:"30px"}}>
            <Typography variant="h4" fontWeight="bold">
              Why Buyers Choose Us?
            </Typography>
            <ToggleButtonGroup
              value={userType}
              exclusive
              onChange={(e, newValue) => newValue && setUserType(newValue)}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "40px",
                mt:2
              }}
            >
              <ToggleButton value="buyer" sx={{ color: "white", border: "none", px: 2, borderRadius:"40px", "&.Mui-selected": { bgcolor: "#FF8D01B2" } }}>
                Buyer
              </ToggleButton>
              <ToggleButton value="supplier" sx={{ color: "white", border: "none", px: 2, "&.Mui-selected": { bgcolor: "#1E40AF" } }}>
                Supplier
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Description */}
          <Typography color="gray" mb={4}>
            We’re redefining the equipment rental experience.
          </Typography>

          {/* Feature Cards */}
          <Grid container spacing={4}>
            {[1, 2, 3, 4].map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ bgcolor: "#1E293B", p: 2, textAlign: "center", color: "white", borderRadius: 2 }}>
                  <Image  sx={{ fontSize: 40, color: "#FFB800" }} src={icons} alt="image" title="ddd" />
                  <CardContent>
                    <Typography fontWeight="bold">Post-rental support</Typography>
                    <Typography variant="body2" color="white">
                      Post-rental support to resolve breakdowns immediately.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Statistics */}
          <Box sx={{ bgcolor: "white", color: "black", py: 2, px: 4, mt: 4, borderRadius: 2, display: "flex", justifyContent: "space-around" }}>
            {[
              { number: "500+", label: "Verified Equipments" },
              { number: "98%", label: "On-Time Deliveries" },
              { number: "100+", label: "Transactions" },
            ].map((stat, index) => (
              <Box key={index} textAlign="center" style={{display:"flex", alignItems:"center"}}>
                <Image src={TruckIcon} sx={{ fontSize: 40, color: "#FFB800" }} />
                <div style={{display:"flex", flexDirection:"column", marginLeft:"4px"}}>
                <Typography variant="h5" fontWeight="bold">
                  {stat.number}
                </Typography>
                <Typography>{stat.label}</Typography>
                </div>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Partner Section */}
      <Box sx={{ mt: 4, mx:3, height:"270px" }}>
        <Card sx={{ display: "flex", alignItems: "center", p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Box sx={{ width: "20%", position: "relative", height: "250px", }}>
            <Image src={partnerImage} alt="Partner" layout="fill" objectFit="cover"  sx={{objectFit:"cover"}}/>
          </Box>
          <Box sx={{ flex: 1, pl: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              Partner with BidForSure & Get Unlimited Enquiries
            </Typography>
            <Typography color="gray" my={2}>
              Our suppliers have grown 3X with us and you can too.
            </Typography>
            <Button variant="contained" sx={{ bgcolor: "#FF9800", "&:hover": { bgcolor: "#E68900" } }}>
              Start Selling
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default HomePageSection6;
