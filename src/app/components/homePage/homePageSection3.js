



"use client";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import icon1 from "../../../public/assets/store-card-40-watch-s10-202409 (2).png";


const equipmentList = [
  {
    id: 1,
    name: "Excavator 320D",
    price: "₹5000/Day",
    category: "Earth Moving",
    image: icon1, // Add these images in /public/images/
  },
];

const EquipmentCard = (item) => {
  return (
    <Box
      sx={{
        p: 1,
        borderRadius: "5px",
        bgcolor: "white",
        boxShadow: 2,
        textAlign: "center",
        transition: "0.3s",
        "&:hover": { boxShadow: 5 },
      }}
    >
      {/* Category Label */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          bgcolor: "rgba(255,165,0,0.1)",
          color: "#FFA500",
          px: 2,
          py: 0.5,
          fontSize: "12px",
          fontWeight: "bold",
          borderRadius: "15px",
          border: "1px solid #FFA500",
        }}
      >
        {item.category}
      </Box>

      {/* Equipment Image */}
      <Image src={icon1} alt="image" width={250} height={200} style={{ objectFit: "contain" }} />

      {/* Equipment Info */}
      <Typography fontSize="18px" fontWeight="bold" mt={1}>
        {item.name}
      </Typography>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <div>
        <div>
        Excavator 320D
        </div>
        <div style={{fontSize:"12px",display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"}}>
        Rent Starts From<p>
        ₹5000/Day
</p>
        </div>
        </div>
        <div>
        <Button
        variant="outlined"
        sx={{
          mt: 1,
          color: "#1D3058",
          borderColor: "#1D3058",
          borderRadius: "10px",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#FFA500", color: "white" },
        }}
      >
        Rent Now
      </Button>
        </div>
        </div>
      {/* <Typography fontSize="14px" color="gray">
        Rent Starts From
      </Typography> */}
      <Typography fontSize="16px" fontWeight="bold">
        {item.price}
      </Typography>

      {/* Rent Button */}
      {/* <Button
        variant="outlined"
        sx={{
          mt: 1,
          color: "#FFA500",
          borderColor: "#FFA500",
          borderRadius: "20px",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#FFA500", color: "white" },
        }}
      >
        Rent Now
      </Button> */}
    </Box>
  );
};

const HomePageSection3 = () => {
  return (
    <Box sx={{ py: 5, paddingRight:"0px", Width:"unset", mx:3  }}>
      {/* Title and Description */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight="bold">
          Earthmoving Equipments
          </Typography>
          <Typography variant="body2" color="gray">
          Our most popular choices, trusted by contractors nationwide.          </Typography>
        </Box>
        <Button
          variant="text"
          sx={{
            color: "#FFA500",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            "&:hover": { textDecoration: "underline" },
            backgroundColor:"#FF8D011A",
            borderRadius:"20px"
          }}
        >
          See All →
        </Button>
      </Box>

      {/* Equipment Cards */}
      <Grid container spacing={3} mt={0}>
        {equipmentList.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id} sx={{display:"flex", gap:"20px"}}>
            <EquipmentCard item={item} /><EquipmentCard item={item} />
             <EquipmentCard item={item} />
            <EquipmentCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePageSection3;
