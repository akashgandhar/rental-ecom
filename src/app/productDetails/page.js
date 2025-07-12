"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import catImage from "../../public/assets/image 8.png"; // placeholder image
import Headers from "../components/header/index"
import { API_DOMAIN } from "../helper/constant";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import RentDialog from "../components/RentDialog";
import { useRouter } from "next/navigation";

const ProductDetailPage = () => {
    const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null); // ✅ Step 1: Create state
  const [productDataByCat, setProductDataByCat] = useState(null); // ✅ Step 1: Create state
  const[data, setData] = useState();
  const [paramsId, setParamsId] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  useEffect(() => {
    const id = searchParams.get("id");
    setParamsId(id);
    console.log("Category ID from URL:", id);
    // setCategoryId(id);
  }, [searchParams]);

  console.log("paramsId", paramsId);

  useEffect(()=> {
    // setData(localStorage?.getItem("location"))
    const fetchProduct = async () => {
        const id = searchParams.get("id");

        try {
          const response = await axios.get(`${API_DOMAIN}/product/${id}`);
          console.log("API response:", response.data);
          setProductData(response.data); // ✅ Step 3: Store in state
        } catch (error) {
          console.error("Failed to fetch product:", error);
        }
      };

      const fetchProductByCat = async () => {
        const id = searchParams.get("id");
        try {
          const response = await axios.get(`${API_DOMAIN}/product/category/${id}?start=0&size=4`);
          console.log("API response:", response.data);
          setProductDataByCat(response.data); // ✅ Step 3: Store in state
        } catch (error) {
          console.error("Failed to fetch product:", error);
        }
      };
    
      // ✅ Step 4: Fetch on component mount
      fetchProduct();
      fetchProductByCat();
  },[paramsId])


  const handleOpenDialog = (product) => {
    console.log("leeeeee", product)
    setSelectedProduct(product);
    setOpenDialog(true);
  };
  console.log("productData", productDataByCat);

  return (
    <>
    <Headers />
    
  <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
      {/* Top Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 5,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
             
            }}
          >
            <img src={`http://139.59.45.128:8080/product/mainImage/${paramsId}`} alt="product" width={586} height={450} />
          </Box>
          <Typography mt={2} fontWeight="500" color="#333">
            <strong>Equipment Details:</strong> {productData?.data?.description}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* <Typography variant="caption">{productData?.data?.name}</Typography> */}
          <Typography variant="h5" fontWeight="bold" mt={1}>
            {productData?.data?.name}
          </Typography>
          <Typography color="gray">
            {/* Jobsite Location: {data} */}
          </Typography>

          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item>
                <Typography>
                  <strong>Daily</strong>
                </Typography>
                <Typography>₹{productData?.data?.additionalDescription?.[0]?.amountDaily}</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <strong>Weekly</strong>
                </Typography>
                <Typography>₹{productData?.data?.additionalDescription?.[0]?.amountWeekly}
</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <strong>Monthly</strong>
                </Typography>
                <Typography>₹{productData?.data?.additionalDescription?.[0]?.amountMonthly}</Typography>
              </Grid>
            </Grid>
            <Typography fontSize="12px" color="gray" mt={1}>
              Prices may vary based on location & other factors. Request quote for accurate price.
            </Typography>
          </Box>

          {/* Quantity and Add to Cart */}
          <Box mt={3} display="flex" alignItems="center" gap={2}>
            <Box
              display="flex"
              alignItems="center"
              border="1px solid #ccc"
              borderRadius={2}
              px={2}
            >
              <IconButton onClick={() => handleQuantityChange(-1)}>
                <RemoveIcon />
              </IconButton>
              <Typography mx={1}>{quantity}</Typography>
              <IconButton onClick={() => handleQuantityChange(1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
            onClick={() =>
                handleOpenDialog({
                  name: productData?.data?.name,
                  variant: productData?.data?.id,
                  pricePerDay: 4000,
                })
              }
              variant="contained"
              sx={{ bgcolor: "#ff6c00", fontWeight: "bold", px: 4, py: 1.5 }}
            >
              Add to Cart
            </Button>
          </Box>

          <RentDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        product={selectedProduct}
      />

          {/* Specifications */}
          <Box mt={4}>
            <Typography variant="h6">Specifications</Typography>
            <Box
              mt={2}
              border="1px solid #ccc"
              borderRadius={2}
              sx={{ width: "100%" }}
            >
              <Grid container>
                <Grid item xs={6} p={1} borderBottom="1px solid #eee">
                  Daily Price:-
                </Grid>
                <Grid item xs={6} p={1} borderBottom="1px solid #eee">
                {productData?.data?.additionalDescription?.[0]?.amountDaily}
                </Grid>

                <Grid item xs={6} p={1} borderBottom="1px solid #eee">
                Weekly Price:-
                </Grid>
                <Grid item xs={6} p={1} borderBottom="1px solid #eee">
                  {productData?.data?.additionalDescription?.[0]?.amountWeekly}
                </Grid>

                <Grid item xs={6} p={1} borderBottom="1px solid #eee">
                  Monthly Price:-
                </Grid>
                <Grid item xs={6} p={1} borderBottom="1px solid #eee">
                  {productData?.data?.additionalDescription?.[0]?.amountMonthly}
                </Grid>

                {/* <Grid item xs={6} p={1}>
                  Weight:-
                </Grid>
                <Grid item xs={6} p={1}>
                  5620-5942 Kgs.
                </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Related Sections */}
      <Box mt={8}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Explore more {productData?.data?.name}
        </Typography>
        <Grid container spacing={2}>
          {productDataByCat?.data?.map((item, index) => {
            return (
                <Grid item xs={12} sm={6} md={4} key={`${index}`}>
                <Box p={2} border="1px solid #ccc" borderRadius={2}>
                  <img src={`http://139.59.45.128:8080/product/mainImage/${item?.id}`} alt="variant" width={300} height={250} title="image" />
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                  <div style={{display:"flex", flexDirection:"column"}}>
                  <Typography mt={1} fontWeight="bold">
                    {item?.name}
                  </Typography>
                  <Typography color="gray">{item?.description}</Typography>
                  </div>
                  <Box>
                  <Button
                  onClick={()=> router.push(`/productDetails?id=${item?.id}`)}
                    variant="outlined"
                    sx={{ mt: 1, fontSize: "12px", borderRadius: 8 }}
                    fullWidth
                    style={{width:"200px", height:"40px"}}
                  >
                    Rent Now
                  </Button>
                  </Box>
                  </div>
                </Box>
              </Grid>
            )
          }
           
          )}
        </Grid>
      </Box>

      {/* <Box mt={6}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Explore more Arial work platform
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Box p={2} border="1px solid #ccc" borderRadius={2}>
                <Image src={catImage} alt="variant" width={100} height={100} />
                <Typography mt={1} fontWeight="bold">
                  Push Around One Man Lift
                </Typography>
                <Typography color="gray">Starts from ₹5000/Day</Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 1, fontSize: "12px", borderRadius: 8 }}
                  fullWidth
                >
                  Rent Now
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box> */}
    </Container>
    </>
  );
};

export default ProductDetailPage;