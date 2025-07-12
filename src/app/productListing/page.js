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
import { Breadcrumbs,Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({}); // { [categoryId]: subcategory[] }
  const searchParams = useSearchParams();
  const [categoryId, setCategoryId] = useState(null);
  const [productSubId, setProductSubId] = useState(null);
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterData, setFilterData] = useState();
  const router = useRouter()

  const handleOpenDialog = (product) => {
    console.log("leeeeee", product)
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  useEffect(() => {
    const id = searchParams.get("id");
    console.log("Category ID from URL:", id);
    setCategoryId(id);
  }, [searchParams]);

  console.log("categoryId", categoryId, "dd", subcategories)


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

  useEffect(()=>{
  console.log("categories", categories);
  const filterData = categories?.filter((data)=> data?.id == categoryId);
  setFilterData(filterData);
  },[categories])

 
  useEffect(() => {
    const subCatId = searchParams.get("subCatId");
    if (subCatId) {
      handlerSub({ id: subCatId });
    }
  }, [searchParams]); // ✅ Runs once URL changes
  
  const handlerSub = async (data) => {
    setProductSubId(data);
    try {
      const res = await axios.get(`${API_DOMAIN}/product/subcategory/${data?.id}?start=0&size=4`);
      setProducts(res?.data?.data || []);
      console.log("Products fetched for subcategory:", res?.data?.data);
  
      // ✅ Update URL on subcategory click
      const currentId = searchParams.get("id");
      router.push(`/productListing?id=${currentId}&subCatId=${data?.id}`);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
  };
 
  // const handlerSub  = async (data) => 
  // {
  //   setProductSubId(data);
  //   try {
  //     const res = await axios.get(
  //       `${API_DOMAIN}/product/subcategory/${data?.id}?start=0&size=4`
  //     );
  //     setProducts(res?.data?.data || []);
  //     console.log("resss", res?.data?.data)
  //   } catch (error) {
  //     console.error("Failed to fetch products:", error);
  //     setProducts([]);
  //   }
  // }

  console.log("products", products);

  const handleClick = (event) => {
    event.preventDefault();
    console.log("Breadcrumb clicked");
  };


  console.log("subcategories", categoryId, filterData);

  return (
    <>
      <Header />

      <Box sx={{ py: 5, bgcolor: "#F8F9FA", display: "flex", flexDirection:"column" }}>
      <Box style={{padding:"0px", marginLeft:"330px"}}>
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
          // href="/listingPage?id=1"
          // onClick={handleClick}
          sx={{ fontWeight: "500", fontSize:"18px", cursor:"pointer" }}
          onClick={() => router.push("/listingPage")}
        >
          Rent
        </Box>
        <Box
          underline="hover"
          color="inherit"
          // href="/listingPage?id=1"
          // onClick={handleClick}
          sx={{ fontWeight: "500", fontSize:"18px", cursor:"pointer" }}
        >
          {filterData?.[0]?.name}
        </Box>
        </Breadcrumbs>
</Box>
<Box style={{display:"flex"}}>
        <Filter setProductSubId={setProductSubId} handlerSub={handlerSub} />

        <Box sx={{ flex: 1 }}>
          <Container>
           

   {/* Product List after clicking subcategory */}
   {
        products.length > 0 && (
          <Box mt={5}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Products
            </Typography>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card sx={{ borderRadius: "15px", boxShadow: 3, textAlign: "center" }}>
                    <CardMedia>
                      <img
                        src={`${API_DOMAIN}/product/image/${product.primaryImageId}`}
                        alt={product.name}
                        width={200}
                        height={250}
                        style={{
                          borderTopLeftRadius: "15px",
                          borderTopRightRadius: "15px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.currentTarget.src = image.src;
                        }}
                      />
                    </CardMedia>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "1px solid #a2a2a2",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <Typography variant="h6" fontWeight="bold">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {product.modelName}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          ₹{product.rentPerDay || "N/A"}/Day
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "white",
                          color: "black",
                          marginTop: "20px",
                          borderRadius: "10px",
                          "&:hover": { bgcolor: "#FF8C00" },
                          paddingBlock: "10px",
                        }}

                        onClick={() =>
                          handleOpenDialog({
                            name: product.name,
                            variant: product.id,
                            pricePerDay: 4000,
                          })
                        }
                        // onClick={() =>
                        //   handleOpenDialog({
                        //     name: product.name,
                        //     variant: product.modelName,
                        //     pricePerDay: product.rentPerDay,
                        //   })
                        // }
                      >
                        Add to Cart
                      </Button>
                      <RentDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        product={selectedProduct}
      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        
      )}

           
          </Container>
        </Box>
        </Box>
      </Box>
    </>
  );
};

export default Index;
