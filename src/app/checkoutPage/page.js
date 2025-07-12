// Index.jsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  Checkbox,
  FormGroup,
  Paper,
  Divider
} from "@mui/material";
// import Header from "../../app/components/header/index"
import { Add, Remove, ArrowBack } from "@mui/icons-material";
const imagess = "../../public/assets/Frame.png";
import HomeIcon from "../../public/assets/image 8.png";
import AddIcon from '@mui/icons-material/Add';

import Image from "next/image";
import { API_DOMAIN } from "../helper/constant";
import axios from "axios";
import Header from "../components/header/index"
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [guestInfoo, setGuestInfoo] = useState();


  useEffect(()=> {
    setGuestInfoo(JSON.parse(localStorage.getItem("userInfoData")) || JSON.parse(localStorage.getItem("guestInfo")))
  },[])
  // const guestInfo = JSON.parse(localStorage.getItem("guestInfo"));

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "JLG Articulating Boom Lift",
      variant: "(61-90ft)",
      price: 5000,
      qty: 1,
      image: "../../public/assets/Frame 166.png",
    },
    {
      id: 2,
      name: "JLG Articulating Boom Lift",
      variant: "(40-60ft)",
      price: 5000,
      qty: 1,
      image: "../../public/assets/Frame 166.png",
    },
  ]);

  const [orderSuccess, setOrderSuccess] = useState(false);


  const [cartItemss, setCartItemss] = useState([
    {
      id: 1,
      name: "JLG Articulating Boom Lift",
      variant: "(61-90ft)",
      price: 5000,
      qty: 1,
      image: "../../public/assets/Frame 166.png",
    }
  ]);

  const [cartData, setCartData] = useState([]);


  

  const [usage, setUsage] = useState("standard");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gst: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    billingDifferent: false,
    rentalCharge: 0,    // ✅ added
  totalGST: 0,        // ✅ added
  subTotal: 0         // ✅ added
  });

  const handleQuantityChange = (e, index, change) => {
    e.stopPropagation();
    const updatedItems = [...cartData];
  
    const currentItem = updatedItems[index];
    const pricePerUnit = currentItem.product?.prices?.[0]?.amount ?? 0;
  
    const newCount = Math.max(1, currentItem.count + change);
    
    // ✅ update the object at current index
    updatedItems[index] = {
      ...currentItem,
      count: newCount,
      totalPrice: pricePerUnit * newCount,
    };
  
    // ✅ recalculate grand total correctly
    const total = updatedItems.reduce((sum, item) => {
      const unitPrice = item.product?.prices?.[0]?.amount ?? 0;
      return sum + unitPrice * item.count;
    }, 0);
  
    console.log("Updated Items:", updatedItems);
    console.log("Total Price:", total);
  
    // ✅ Update state
    setCartData(updatedItems);
  };
  
  
  

  const handleProceed = () => {
    const orderSummary = cartItems.map(item => ({
      name: item.name,
      variant: item.variant,
      qty: item.qty,
      price: item.price,
    }));
    const rentalCharges = 1177;
    const gst = 2118.11;
    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    console.log("Cart Order Summary:", { orderSummary, usage, rentalCharges, gst, total });
    setStep(2);
  };

  const handleContinue = async () => {
    try {
      const payload = {
        cartIds: cartData.map(item => item.cartId),
        firstName: formData.firstName || "Guest User",
        lastName: formData.lastName || "User",
        phoneNumber: formData.phone,
        email: formData.email,
        gstPan: formData.gst,
        jobsiteAddress: formData.address,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pin,
        diffBillAddress: formData.billingDifferent ? true : false,
        rentalCharge: formData?.rentalCharge,
        totalGST: formData?.totalGST,
        subTotal: formData?.subTotal,
        duration: "3 Days",
      };
  
      await axios.post(`${API_DOMAIN}/checkout/create`, payload, {
        headers: {
          Authorization: `Bearer ${guestInfoo?.token}`,
        },
      });
  
      // ✅ API success => show success UI
      setOrderSuccess(true);
  
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };
  

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfoData") || localStorage.getItem("guestInfo"));
    console.log("userInfouserInfo", userInfo);
    const fetchCartList = async () => {
      try {
        const response = await axios.get(`${API_DOMAIN}/cart/list/${userInfo?.userId}`, {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        setCartData(response.data?.data); // Adjust based on actual API structure
        console.log("Cart Data:", response.data?.data);
      } catch (error) {
        console.error("Error fetching cart list:", error);
      }
    };

    fetchCartList();
  }, []);



  console.log("cartData", cartData);
  
// 🧮 Rental Charges (sum of totalPrice)
const rentalCharges = cartData.reduce((sum, item) => sum + (item.totalPrice || item.product?.prices?.[0]?.amount || 0), 0);

// 🧮 GST Calculation (18% of rental charges)
const gst = +(rentalCharges * 0.18).toFixed(2);

// 🧮 Grand Total
const grandTotal = +(rentalCharges + gst).toFixed(2);


console.log("rentalCharges", rentalCharges,gst,grandTotal)


useEffect(() => {
  if (cartData.length > 0) {
    const rentalCharges = cartData.reduce(
      (sum, item) => sum + (item.totalPrice || item.product?.prices?.[0]?.amount || 0),
      0
    );
    const gst = +(rentalCharges * 0.18).toFixed(2);
    const grandTotal = +(rentalCharges + gst).toFixed(2);

    setFormData((prev) => ({
      ...prev,
      rentalCharge: rentalCharges,
      totalGST: gst,
      subTotal: grandTotal,
    }));
  }
}, [cartData]);

console.log("finalFormData", formData)


  return (
    <>
    <Header />

  {!orderSuccess &&   <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        {step === 1 ? "Shopping Cart" : "Checkout Details"}
      </Typography>

      {/* Stepper */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: step >= 1 ? "orange" : "grey.400", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            1
          </Box>
          <Typography ml={1}>Shopping Cart</Typography>
        </Box>
        <Box sx={{ width: 150, height: 2, bgcolor: "grey.400", mx: 2 }} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: step === 2 ? "orange" : "grey.400", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            2
          </Box>
          <Typography ml={1}>Checkout Details</Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left Section */}
        <Grid item xs={12} md={8}>
          {step === 1 ? (
            <>
              {/* {cartItems.map((item, index) => (
                <Card key={item.id} sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: "#FFF4E5", p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image src={HomeIcon} alt={item.name} width={80} height={80} />
                    <Box ml={2}>
                      <Typography>{item.name}</Typography>
                      <Typography variant="body2">Variant: {item.variant}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton onClick={() => handleQuantityChange(index, -1)}><Remove /></IconButton>
                    <Typography>{item.qty}</Typography>
                    <IconButton onClick={() => handleQuantityChange(index, 1)}><Add /></IconButton>
                  </Box>
                  <Typography>₹{item.price}</Typography>
                </Card>
              ))} */}
                {cartData.map((item, index) => {
        const product = item.product;
        const price = product?.prices?.[0]?.amount ?? 0;

        return (
          <Card
            key={item.cartId}
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#FFF4E5",
              p: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image src={HomeIcon} alt={product?.name} width={80} height={80} />
              <Box ml={2}>
                <Typography fontWeight={600}>{product?.name}</Typography>
                <Typography variant="body2">{product?.description}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton onClick={(e) => handleQuantityChange(e, index, -1)}>
                <Remove />
              </IconButton>
              <Typography>{item.count}</Typography>
              <IconButton onClick={(e) => handleQuantityChange(e, index, 1)}>
                <Add />
              </IconButton>
            </Box>

            <Typography fontWeight={600}>₹{item?.totalPrice ? item?.totalPrice :   item.product?.prices?.[0]?.amount}</Typography>
          </Card>
        );
      })}
<div style={{display:"flex", justifyContent:"center"}}>
<Button
onClick={() => router.back()}
style={{width:"800px"}}
      startIcon={<AddIcon />}
      variant="outlined"
      sx={{
        border: '1px dotted black',
        color: 'black',
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'white', // darker red on hover
        },
        textTransform: 'none', // keep "Add Equipments" as-is
        px: 2,
        py: 2,
      }}
    >
      Add Equipments
    </Button>
    </div>

              <Box my={2} mt={5}>
                <Typography variant="h6" gutterBottom>
                  How long do you plan to use your equipment daily?
                </Typography>
                <RadioGroup row value={usage} onChange={(e) => setUsage(e.target.value)} style={{display:"flex", gap:"10px"}}>
                  <FormControlLabel value="standard" control={<Radio />} label="Up to 8 hours (per day)" style={{padding:"10px",
    background: "#FF8D0114",
    color: "black",
    marginBlock:"0px",
    border:"1px dotted",
    borderRadius:"10px"
}} />
                  <FormControlLabel style={{padding:"10px",
    background: "#FF8D0114",
    color: "black",
    marginBlock:"0px",
    border:"1px dotted",
    borderRadius:"10px"

}} value="1.5x" control={<Radio />} label="8 - 16 hours (per day)" />
                  <FormControlLabel style={{padding:"10px",
    background: "#FF8D0114",
    color: "black",
    marginBlock:"0px",
    border:"1px dotted",
    borderRadius:"10px"


}} value="2x" control={<Radio />} label="Over 16 hours (per day)" />
                </RadioGroup>
              </Box>

              {/* <Button variant="contained" onClick={handleProceed}>Proceed to Reserve</Button> */}
            </>
          ) : (
            <Box component="form" noValidate autoComplete="off">
              <Typography variant="h6" gutterBottom>Your details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField fullWidth label="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} /></Grid>
                <Grid item xs={12} sm={6}><TextField fullWidth label="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Email Address (Optional)" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="GST or PAN Number" value={formData.gst} onChange={(e) => setFormData({ ...formData, gst: e.target.value })} /></Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                    Your jobsite
                        </Typography> 
                        </Grid>
                <Grid item xs={12}><TextField fullWidth label="Jobsite Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} /></Grid>
                <Grid item xs={6}><TextField fullWidth label="Town / City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField fullWidth label="State" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField fullWidth label="Pin Code" value={formData.pin} onChange={(e) => setFormData({ ...formData, pin: e.target.value })} /></Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={formData.billingDifferent} onChange={(e) => setFormData({ ...formData, billingDifferent: e.target.checked })} />}
                      label="Use a different billing address (optional)"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button startIcon={<ArrowBack />} onClick={() => setStep(1)}>Back</Button>
                <Button variant="contained" onClick={handleContinue}>Continue</Button>
              </Box>
            </Box>
          )}
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {step === 1 ? "Estimated Total" : "Order Summary"}
            </Typography>
            {cartItemss.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }} style={{display:"flex", flexDirection:"column", gap:"15px"}}>
                {/* <Typography fontWeight="bold"> ₹5000</Typography> */}
                {/* <Typography>{item.name}</Typography> */}
                {/* <Typography variant="body2">Variant: {item.variant}</Typography>
                <Typography variant="body2">Qty: {item.qty}</Typography>
                <Typography variant="body2">Price: ₹{item.price * item.qty}</Typography> */}
                <Typography>Rental Charges: {formData?.rentalCharge}</Typography>
                <Typography>GST (18%): {formData?.totalGST}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Typography fontWeight="bold">Total: {formData?.subTotal}</Typography>
           {step == 1 && <Button sx={{mt:3, mb:2}} style={{background:"#FF8D01", color:"white", paddingInline:"10px", borderRadius:"5px"}} onClick={handleProceed}>Proceed to Reserve</Button>}

          </Paper>
        </Grid>


  
        
      </Grid>





    
    </Container>}

    {orderSuccess &&
  
  <Box sx={{ p: 4 }}>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      Thank you!
    </Typography>
    <Grid container spacing={3}>
      {/* Left Section */}
      <Grid item xs={12} md={5}>
        <Paper sx={{ p: 2, border: "1px solid orange" }}>
          <Typography variant="subtitle1" fontWeight="bold" color="orange">
            Request #6563236856
          </Typography>
          <Typography>Date: Jun 22 2025</Typography>
          <Typography mt={1} fontWeight="bold">Jobsite Address:</Typography>
          <Typography>{formData?.address} + {formData?.city}</Typography>
          {/* <Typography mt={1}>No. of Days: 3 Days (18 may - 21 may)</Typography> */}
        </Paper>
      </Grid>

      {console.log("cartDataaaaaaa", cartData)}

      {/* Right Section */}
      <Grid item xs={12} md={7}>
        <Typography variant="h6" gutterBottom>Order Summary</Typography>
        {cartData.map((item, i) => {
          const product = item.product;
          const price = product?.prices?.[0]?.amount ?? 0;
          return (
            <Paper key={item.cartId} sx={{ p: 2, mb: 2, bgcolor: "#FFF7EE" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  {/* <Image src={i % 2 === 0 ? BoomLiftOrange : BoomLiftBlue} width={60} height={60} alt="Lift" /> */}
                  <Box>
                    <Typography fontWeight="bold">{product?.name}</Typography>
                    {/* <Typography variant="body2">Variant: ({item?.description})</Typography> */}
                    <Typography variant="body2">Count: ({item?.count})</Typography>
                    <Typography variant="body2">{item?.startDate} - {item?.endDate}</Typography>
                  </Box>
                </Box>
                <Typography fontWeight="bold">₹{item?.totalPrice ? item?.totalPrice: price}</Typography>
              </Box>
            </Paper>
          );
        })}

        <Typography>Rental Charges: {formData?.rentalCharge}</Typography>
        <Typography>GST (18%): {formData?.totalGST}</Typography>
        <Typography fontWeight="bold" mt={2}>Subtotal: ₹{formData?.subTotal}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography>😊 Your Equipment is getting ready. Our team will contact you soon.</Typography>
      </Grid>
    </Grid>
  </Box>
}
    </>
  );
};

export default Index;