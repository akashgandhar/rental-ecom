"use client";
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Image from "next/image";
import image from "../../public/assets/image.png"; // fallback image
import Header from "../components/header/index";
import Filter from "../components/filter";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_DOMAIN } from "../helper/constant";
import { useSearchParams } from "next/navigation";
import RentDialog from "../components/RentDialog";
import { useRouter } from "next/navigation";
import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({}); // { [categoryId]: subcategory[] }
  const searchParams = useSearchParams();
  const [categoryId, setCategoryId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();


  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  useEffect(() => {
    const id = searchParams.get("id");
    console.log("Category ID from URL:", id);
    // setCategoryId(id);
  }, [searchParams]);

  console.log("categoryId", categoryId)


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_DOMAIN}/category/all?start=0&size=10`);
        const categoryData = response.data?.data || [];
        setCategories(categoryData);

        // Now fetch subcategories for each category
        categoryData.forEach(async (category) => {
          try {
            const subRes = await axios.get(`${API_DOMAIN}/subcategory/byCategory/all/${category.id}?start=0&size=25`);
            setSubcategories(prev => ({ ...prev, [category.id]: subRes.data?.data || [] }));
          } catch (subError) {
            console.error(`Failed to fetch subcategories for category ${category.id}`, subError);
          }
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleProductPage = (subcat) => {
    console.log("subcat", subcat);
  router.push(`productListing?id=${subcat?.categoryId}&subCatId=${subcat?.id}`)
  }


  const handleClick = (event) => {
    event.preventDefault();
    console.log("Breadcrumb clicked");
  };


  return (
    <>
      <Header />
      <Box sx={{ padding: "16px", backgroundColor: "#f5f6f8" }}>
     <Box style={{marginLeft:"330px"}}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ color: "#1b1f3b", fontSize: "14px" }}
      >
        <Box
          underline="hover"
          color="inherit"
          href="/"
          onClick={() => router.push("/")}
          sx={{ fontWeight: "500", fontSize:"18px", cursor:"pointer" }}
        >
          Home
        </Box>
        <Box
          underline="hover"
          color="inherit"
          sx={{ fontWeight: "500", fontSize:"18px", cursor:"pointer" }}
        >
          Rent
        </Box>
        </Breadcrumbs>
        </Box>
      <Box sx={{ py: 5, bgcolor: "#F8F9FA", display: "flex" }}>
        <Filter   handlerSub={handleProductPage} />

        <Box sx={{ flex: 1 }}>
          <Container>
            {categories.map((category) => (
              <Box key={category.id} mb={5}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h5" fontWeight="bold">
                    {category.name}
                  </Typography>
                  <Button
                    sx={{
                      color: "#FFA500",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    See All →
                  </Button>
                </Box>

                {(subcategories[category.id] || []).length > 0 ? (
  <Grid container spacing={3}>
    {subcategories[category.id].map((subcat) => (
      <Grid item xs={12} sm={6} md={4} key={subcat.id}>
        <Card sx={{ borderRadius: "15px", boxShadow: 3, textAlign: "center" }}>
          <CardMedia>
            <img
              src={`${API_DOMAIN}/subcategory/icon/${subcat.id}`}
              alt={subcat.name}
              width={200}
              height={250}
              onClick={()=>handleProductPage(subcat)}
              style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.src = image.src }}
            />
          </CardMedia>
          <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #a2a2a2" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Typography variant="h6" fontWeight="bold">{subcat.name}</Typography>
            </Box>
          
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
) : (
  <Typography variant="body1" color="textSecondary" mt={2}>
    No subcategories available for this category.
  </Typography>
)}

              </Box>
            ))}
          </Container>
        </Box>
      </Box>
      </Box>
    </>
  );
};

export default Index;
