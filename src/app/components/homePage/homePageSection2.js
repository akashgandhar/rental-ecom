"use client";
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import icon1 from "../../../public/assets/store-card-40-watch-s10-202409 (1).png";
import { API_DOMAIN } from "@/app/helper/constant";
import { useRouter } from "next/navigation";

const EquipmentCard = ({ item, onRentClick }) => {
  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
        },
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
      onClick={() => onRentClick(item)}
    >
      {/* Equipment Image */}
      <CardMedia sx={{ position: "relative", height: 240 }}>
        <img
          src={`${API_DOMAIN}/subcategory/icon/${item.id}`}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          onError={(e) => {
            e.currentTarget.src = icon1.src;
          }}
        />
        {/* Category Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            bgcolor: "rgba(255, 141, 1, 0.1)",
            color: "#FF8D01",
            px: 2,
            py: 0.5,
            fontSize: "12px",
            fontWeight: 600,
            borderRadius: "20px",
            border: "1px solid #FF8D01",
            backdropFilter: "blur(10px)"
          }}
        >
          Available
        </Box>
      </CardMedia>

      {/* Equipment Info */}
      <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              mb: 1,
              fontSize: "18px",
              color: "#1D3058",
              fontFamily: "'Inter', sans-serif"
            }}
          >
            {item.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: "#666",
              mb: 2,
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Rent Starts From
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: "#1D3058",
              fontSize: "20px",
              fontFamily: "'Inter', sans-serif"
            }}
          >
            ₹5000/Day
          </Typography>
        </Box>

        {/* Rent Button */}
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 2,
            color: "#1D3058",
            borderColor: "#1D3058",
            borderRadius: "8px",
            fontWeight: 600,
            py: 1.5,
            fontSize: "14px",
            textTransform: "none",
            fontFamily: "'Inter', sans-serif",
            "&:hover": { 
              bgcolor: "#FF8D01", 
              color: "white",
              borderColor: "#FF8D01"
            },
          }}
        >
          Rent Now
        </Button>
      </CardContent>
    </Card>
  );
};

const HomePageSection2 = () => {
  const [categories, setCategories] = useState([]);
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const productHandler = (data) => {
    router.push(`productListing?id=${data?.categoryId}&subCatId=${data?.id}`);
  };

  const allHandler = (category) => {
    router.push(`/listingPage?id=${category?.id}`);
  };

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const catRes = await axios.get(`${API_DOMAIN}/category/all?start=0&size=25`);
        const topCategories = catRes.data.data.slice(0, 3);
        setCategories(topCategories);

        const subcategoryPromises = topCategories.map((category) =>
          axios.get(`${API_DOMAIN}/subcategory/byCategory/all/${category.id}?start=0&size=4`)
        );

        const subcategoryResponses = await Promise.all(subcategoryPromises);

        const subcatMap = {};
        topCategories.forEach((category, index) => {
          subcatMap[category.id] = subcategoryResponses[index].data.data;
        });

        setSubcategoriesByCategory(subcatMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);

  const categoryTitles = {
    1: "Most Leased Equipment",
    2: "Earthmoving Equipments", 
    6: "Trailers and Trucks"
  };

  const categoryDescriptions = {
    1: "Our most popular choices, trusted by contractors nationwide.",
    2: "Heavy-duty earthmoving equipment for construction projects.",
    6: "Transportation and hauling solutions for your projects."
  };

  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography>Loading equipment...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, mt: 12, bgcolor: "#FAFBFC" }}>
      <Container maxWidth="xl">
        {categories.map((category, categoryIndex) => (
          <Box key={category.id} sx={{ mb: categoryIndex < categories.length - 1 ? 8 : 0 }}>
            {/* Section Header */}
            <Box 
              sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                mb: 4 
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
                  {categoryTitles[category.id] || category.name}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: "#666",
                    fontSize: "16px",
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {categoryDescriptions[category.id] || "Quality equipment for your construction needs."}
                </Typography>
              </Box>
              
              <Button
                variant="text"
                endIcon={<span>→</span>}
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
                onClick={() => allHandler(category)}
              >
                See All
              </Button>
            </Box>

            {/* Equipment Grid */}
            <Grid container spacing={3}>
              {subcategoriesByCategory[category.id]?.map((subcat) => (
                <Grid item xs={12} sm={6} md={3} key={subcat.id}>
                  <EquipmentCard 
                    item={subcat} 
                    onRentClick={productHandler}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default HomePageSection2;