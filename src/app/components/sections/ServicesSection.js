"use client";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Grid, 
  Typography 
} from "@mui/material";
import Image from "next/image";
import Icon1 from "../../../public/assets/image 7.png";

const services = [
  {
    title: "Rent Equipment",
    description: "Browse our wide range of quality-checked equipment, ready for immediate use.",
    image: Icon1,
    features: ["7Days Return", "Verified", "4Hrs/Day"]
  },
  {
    title: "Buy Used Equipment", 
    description: "Browse our wide range of quality-checked equipment, ready for immediate use.",
    image: Icon1,
    features: ["7Days Return", "Verified", "4Hrs/Day"]
  },
  {
    title: "Sell Used Equipment",
    description: "Browse our wide range of quality-checked equipment, ready for immediate use.", 
    image: Icon1,
    features: ["7Days Return", "Verified", "4Hrs/Day"]
  },
  {
    title: "Hire Operators",
    description: "Browse our wide range of quality-checked equipment, ready for immediate use.",
    image: Icon1,
    features: ["7Days Return", "Verified", "4Hrs/Day"]
  },
];

const ServicesSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: "#FAFBFC" }}>
      <Container maxWidth="xl">
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            mb: 6 
          }}
        >
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: "24px", md: "32px" },
                color: "#1D3058",
                mb: 1,
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Our Services
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "#666",
                fontSize: "16px",
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Our most popular choices, trusted by contractors nationwide.
            </Typography>
          </Box>
          
          <Button
            variant="text"
            sx={{
              color: "#FF8D01",
              fontWeight: 600,
              fontSize: "14px",
              textTransform: "none",
              bgcolor: "rgba(255, 141, 1, 0.1)",
              borderRadius: "25px",
              px: 3,
              py: 1,
              fontFamily: "'Inter', sans-serif",
              "&:hover": {
                bgcolor: "rgba(255, 141, 1, 0.2)"
              }
            }}
          >
            See All →
          </Button>
        </Box>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  borderRadius: "16px", 
                  overflow: "hidden", 
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
                  }
                }}
              >
                <Box sx={{ position: "relative", height: 200 }}>
                  <Image 
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>

                <CardContent 
                  sx={{ 
                    bgcolor: "#1D3058", 
                    color: "white",
                    p: 3,
                    height: "calc(100% - 200px)",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 2,
                      fontSize: "18px",
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {service.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 3,
                      opacity: 0.9,
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontFamily: "'Inter', sans-serif",
                      flexGrow: 1
                    }}
                  >
                    {service.description}
                  </Typography>

                  <Box 
                    sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 2, 
                      mb: 3,
                      fontSize: "12px",
                      opacity: 0.8
                    }}
                  >
                    {service.features.map((feature, idx) => (
                      <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Box 
                          sx={{ 
                            width: 4, 
                            height: 4, 
                            borderRadius: "50%", 
                            bgcolor: "#FF8D01" 
                          }} 
                        />
                        <Typography sx={{ fontSize: "12px", fontFamily: "'Inter', sans-serif" }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      color: "white",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: "14px",
                      textTransform: "none",
                      fontFamily: "'Inter', sans-serif",
                      "&:hover": { 
                        borderColor: "#FF8D01", 
                        color: "#FF8D01",
                        bgcolor: "rgba(255, 141, 1, 0.1)"
                      },
                    }}
                  >
                    Rent Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection;