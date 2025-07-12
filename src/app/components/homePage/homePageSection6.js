"use client";
import { useState } from "react";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Grid, 
  Typography, 
  ToggleButton, 
  ToggleButtonGroup 
} from "@mui/material";
import Image from "next/image";
import partnerImage from "../../../public/assets/Frame 203 (1).png";
import icons from "../../../public/assets/Frame (1).png";
import TruckIcon from "../../../public/assets/Frame 162 (1).png";

const HomePageSection6 = () => {
  const [userType, setUserType] = useState("buyer");

  const features = [
    {
      title: "Post-rental support",
      description: "Post-rental support to resolve breakdowns immediately.",
      icon: icons
    },
    {
      title: "Quality Assurance", 
      description: "All equipment is thoroughly inspected and quality-checked.",
      icon: icons
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs.",
      icon: icons
    },
    {
      title: "Fast Delivery",
      description: "Quick and reliable delivery to your job site.",
      icon: icons
    }
  ];

  const stats = [
    { number: "500+", label: "Verified Equipments", icon: TruckIcon },
    { number: "98%", label: "On-Time Deliveries", icon: TruckIcon },
    { number: "100+", label: "Transactions", icon: TruckIcon },
  ];

  return (
    <Box>
      {/* Why Choose Us Section */}
      <Box 
        sx={{ 
          bgcolor: "#1D3058", 
          color: "white", 
          py: 8, 
          borderRadius: "24px 24px 0 0",
          position: "relative"
        }}
      >
        <Container maxWidth="xl">
          {/* Header with Toggle */}
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "flex-start", 
              mb: 4,
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 3, md: 0 }
            }}
          >
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: "24px", md: "32px" },
                  mb: 2,
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Why Buyers Choose Us?
              </Typography>
              <Typography 
                sx={{ 
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "16px",
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                We're redefining the equipment rental experience.
              </Typography>
            </Box>
            
            <ToggleButtonGroup
              value={userType}
              exclusive
              onChange={(e, newValue) => newValue && setUserType(newValue)}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "25px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "& .MuiToggleButton-root": {
                  border: "none",
                  color: "white",
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                  "&.Mui-selected": {
                    bgcolor: userType === "buyer" ? "#FF8D01" : "#1E40AF",
                    color: "white"
                  }
                }
              }}
            >
              <ToggleButton value="buyer">Buyer</ToggleButton>
              <ToggleButton value="supplier">Supplier</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Feature Cards */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    bgcolor: "#2A4365", 
                    color: "white",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    height: "100%"
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <Box sx={{ mb: 2 }}>
                      <Image src={feature.icon} alt="icon" width={40} height={40} />
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        mb: 2,
                        fontSize: "16px",
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        opacity: 0.9,
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Statistics */}
          <Box 
            sx={{ 
              bgcolor: "white", 
              color: "#1D3058", 
              py: 4, 
              px: 4, 
              borderRadius: "16px", 
              display: "flex", 
              justifyContent: "space-around",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 3, md: 0 },
              alignItems: "center"
            }}
          >
            {stats.map((stat, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 2,
                  textAlign: { xs: "center", md: "left" }
                }}
              >
                <Image src={stat.icon} alt="icon" width={48} height={48} />
                <Box>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: "32px",
                      color: "#1D3058",
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontSize: "14px",
                      color: "#666",
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Partner Section */}
      <Box sx={{ py: 6, bgcolor: "#FAFBFC" }}>
        <Container maxWidth="xl">
          <Card 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              borderRadius: "16px", 
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
              flexDirection: { xs: "column", md: "row" }
            }}
          >
            <Box 
              sx={{ 
                width: { xs: "100%", md: "40%" }, 
                height: { xs: "200px", md: "300px" },
                position: "relative"
              }}
            >
              <Image 
                src={partnerImage} 
                alt="Partner" 
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
            
            <Box sx={{ flex: 1, p: { xs: 3, md: 6 } }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: "20px", md: "28px" },
                  color: "#1D3058",
                  mb: 3,
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Partner with BidForSure & Get Unlimited Enquiries
              </Typography>
              <Typography 
                sx={{ 
                  color: "#666",
                  mb: 4,
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Our suppliers have grown 3X with us and you can too.
              </Typography>
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: "#FF8D01", 
                  color: "white",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                  fontSize: "16px",
                  textTransform: "none",
                  fontFamily: "'Inter', sans-serif",
                  "&:hover": { bgcolor: "#E67E00" }
                }}
              >
                Start Selling
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePageSection6;