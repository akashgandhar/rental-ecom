"use client"
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReplayIcon from "@mui/icons-material/Replay";
import Image from "next/image";
import Icon1 from "../../../public/assets/image 7.png"

// Service Data
const services = [
  {
    title: "Rent Equipment",
    description: "Browse our wide range of quality-checked equipment, ready for immediate use.",
    image: Icon1,
  },
  {
    title: "Buy Used Equipment",
    description: "Browse our wide range of quality-checked equipment, ready for immediate use.",
    image: Icon1,
  },
  {
    title: "Sell Used Equipment",
    description: "Browse our wide range of quality-checked equipment, ready for immediate use.",
    image: Icon1,
  },
  {
    title: "Hire Operators",
    description: "Browse our wide range of quality-checked equipment, ready for immediate use.",
    image: Icon1,
  },
];

const HomePageSection5 = () => {
  return (
    <Box sx={{ py: 5, paddingRight:"0px", Width:"unset", mx:3  }}>
      {/* Title and Description */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Our Services
          </Typography>
          <Typography color="gray">
            Our most popular choices, trusted by contractors nationwide.
          </Typography>
        </Box>
        <Button variant="text" endIcon={<ArrowForwardIcon />} sx={{ textTransform: "none", color: "#ff9800" }}>
          See All
        </Button>
      </Box>

      {/* Services Grid */}
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3 }}>
              {/* Card Image */}
              <CardMedia sx={{ position: "relative", height: 200 }}>
                <Image 
                  src={service.image}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </CardMedia>

              {/* Card Content */}
              <CardContent sx={{ bgcolor: "#1e293b", color: "white" }}>
                <Typography fontWeight="bold">{service.title}</Typography>
                <Typography variant="body2" mt={1}>{service.description}</Typography>

                {/* Features */}
                <Box display="flex" alignItems="center" gap={1} mt={2}  sx={{fontSize:"10px"}}>
                  <ReplayIcon fontSize="small" /> 7Days Return
                  <CheckCircleIcon fontSize="small" /> Verified
                  <AccessTimeIcon fontSize="small" /> 4Hrs/Day
                </Box>

                {/* Rent Now Button */}
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                    borderColor: "white",
                    color: "white",
                    backgroundColor:"#5c687f96",
                    borderRadius:"10px",
                    "&:hover": { borderColor: "#ff9800", color: "#ff9800" },
                  }}
                >
                  Rent Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePageSection5;
