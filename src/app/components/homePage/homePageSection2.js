



// "use client";

// import { Box, Button, Container, Grid, Typography } from "@mui/material";
// import Image from "next/image";
// import icon1 from "../../../public/assets/store-card-40-watch-s10-202409 (1).png";


// const equipmentList = [
//   {
//     id: 1,
//     name: "Excavator 320D",
//     price: "₹5000/Day",
//     category: "Earth Moving",
//     image: icon1, // Add these images in /public/images/
//   },
// ];

// const EquipmentCard = (item) => {
//   return (
//     <Box
//       sx={{
//         p: 1,
//         borderRadius: "5px",
//         bgcolor: "white",
//         boxShadow: 2,
//         textAlign: "center",
//         transition: "0.3s",
//         "&:hover": { boxShadow: 5 },
//         marginLeft:"15px !important"
//       }}
//     >
//       {/* Category Label */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: 10,
//           right: 10,
//           bgcolor: "rgba(255,165,0,0.1)",
//           color: "#FFA500",
//           px: 2,
//           py: 0.5,
//           fontSize: "12px",
//           fontWeight: "bold",
//           borderRadius: "15px",
//           border: "1px solid #FFA500",
//           marginLeft:"15px !important"
//         }}
//       >
//         {item.category}
//       </Box>

//       {/* Equipment Image */}
//       <Image src={icon1} alt="imahge" width={250} height={200} style={{ objectFit: "contain" }} />

//       {/* Equipment Info */}
//       <Typography fontSize="18px" fontWeight="bold" mt={1}>
//         {item.name}
//       </Typography>
//       <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//         <div>
//         <div>
//         Excavator 320D
//         </div>
//         <div style={{fontSize:"12px",display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start"}}>
//         Rent Starts From<p>
//         ₹5000/Day
// </p>
//         </div>
//         </div>
//         <div>
//         <Button
//         variant="outlined"
//         sx={{
//           mt: 1,
//           color: "#1D3058",
//           borderColor: "#1D3058",
//           borderRadius: "10px",
//           fontWeight: "bold",
//           "&:hover": { bgcolor: "#FFA500", color: "white" },
//         }}
//       >
//         Rent Now
//       </Button>
//         </div>
//         </div>
//       {/* <Typography fontSize="14px" color="gray">
//         Rent Starts From
//       </Typography> */}
//       <Typography fontSize="16px" fontWeight="bold">
//         {item.price}
//       </Typography>

//       {/* Rent Button */}
      
//     </Box>
//   );
// };

// const HomePageSection2 = () => {
//   return (
//     <Box sx={{ py: 5, paddingRight:"0px", Width:"unset", mx:3, mt:5 }}  >
//       {/* Title and Description */}
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography variant="h5" fontWeight="bold">
//             Most Leased Equipment
//           </Typography>
//           <Typography variant="body2" color="gray">
//             Our most popular choices, trusted by contractors nationwide.
//           </Typography>
//         </Box>
//         <Button
//           variant="text"
//           sx={{
//             color: "#FFA500",
//             fontWeight: "bold",
//             display: "flex",
//             alignItems: "center",
//             "&:hover": { textDecoration: "underline" },
//             backgroundColor:"#FF8D011A",
//             borderRadius:"20px"
//           }}
//         >
//           See All →
//         </Button>
//       </Box>

//       {/* Equipment Cards */}
//       <Grid container spacing={3} mt={0} sx={{display:"flex"
//       }}>
//         {equipmentList.map((item) => (
//           <Grid item xs={12} sm={6} md={3} key={item.id} sx={{display:"flex", gap:"20px"
//           }}>
//             <EquipmentCard item={item}  />
//             <EquipmentCard item={item} />
//             <EquipmentCard item={item} />
//             <EquipmentCard item={item} />
            
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default HomePageSection2;

"use client";
import {
  Box,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import icon1 from "../../../public/assets/store-card-40-watch-s10-202409 (1).png";
import { API_DOMAIN } from "@/app/helper/constant";
import { useRouter } from "next/navigation";


const generateDummyEquipment = (subcategory) => {

  return [
    {
      id: `${subcategory.id}-1`,
      name: `Equipment A (${subcategory.name})`,
      price: "₹5000/Day",
      category: subcategory.name,
      image: icon1,
    },
    {
      id: `${subcategory.id}-2`,
      name: `Equipment B (${subcategory.name})`,
      price: "₹6500/Day",
      category: subcategory.name,
      image: icon1,
    },
  ];
};



const HomePageSection2 = () => {
  const [categories, setCategories] = useState([]);
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const productHandler = (data) => {
    console.log("dataaaaa", data)
    router.push(`productListing?id=${data?.categoryId}&subCatId=${data?.id}`)
  
  }
  

  const EquipmentCard = ({ item }) => {
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
          position: "relative",
        }}
        onClick={() => productHandler(item)}
      >
           
  
        {console.log("mmmmmmmm", item)}
        <img
          src={`${API_DOMAIN}/subcategory/icon/${item.id}`}
          alt="image"
          title="image"
          width={250}
          height={200}
          style={{ objectFit: "contain", height: "323px",
            width: "348px" }}
        />
  <div style={{display:"flex", justifyContent:"space-between", padding:"5px 10px"}}>
   <div style={{display:"flex", flexDirection:"column"}}>
   <Typography fontSize="18px" fontWeight="bold" mt={1}>
          {item.name}
        </Typography>
  
        {/* <Typography fontSize="14px" color="gray">
          Rent Starts Fromn
        </Typography> */}
        <Typography fontSize="16px" fontWeight="bold">
          {item.price}
        </Typography>
    </div> 
    <div>
  
      
  
    <Button
          variant="outlined"
          
          sx={{
            mt: 1,
            color: "#1D3058",
            borderColor: "#1D3058",
            borderRadius: "10px",
            borderRadius:"10px",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#FFA500", color: "white" },
          }}
        >
          Rent Now
        </Button>
    </div>
  </div>
      </Box>
    );
  };

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const catRes = await axios.get(`${API_DOMAIN}/category/all?start=0&size=25`);
        const topCategories = catRes.data.data.slice(0, 10);
        setCategories(topCategories);
console.log("topCategories", topCategories);
        const subcategoryPromises = topCategories.map((category) =>
          axios.get(`${API_DOMAIN}/subcategory/byCategory/all/${category.id}?start=0&size=25`)
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

  if (loading) {
    return (
      <Box textAlign="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  const allHandler = (category) => {
    router.push(`/listingPage?id=${category?.id}`)
  }

  console.log("categories", categories);

  const categoryInfoMap = {
    1: {
      catName: "Most Leased Equipment",
      description: "Our most popular choices, trusted by contractors nationwide."
    },
    2: {
      catName: "Earthmoving Equipments",
      description: "Our most popular choices, trusted by contractors nationwide.."
    },
    6: {
      catName: "Trailers and Trucks",
      description: "Our most popular choices, trusted by contractors nationwide."
    },
    18: {
      catName: "asaS Category",
      description: "A newer choice gaining popularity among builders."
    },
    19: {
      catName: "harsh1212 Power",
      description: "Engineered to deliver unmatched performance."
    }
  };


  categories.forEach((cat) => {
    const info = categoryInfoMap[cat.id];
    if (info) {
      cat.catName = info.catName;
      cat.description = info.description;
    }
  });

  console.log("cat", categories)

  return (
    <Box sx={{ py: 5, px: 3, mt: 4 }}>
      {categories.map((category) => (
        <Box key={category.id} mb={6} style={{cursor:"pointer"}}>
          <Box className="kkkkk" display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="h5"  fontWeight="bold" style={{paddingBottom:"10px", fontSize:"32px"}} >
                {category.catName}
              </Typography>
              <Typography variant="body2" color="gray" style={{fontSize:"16px"}}>
                {category.description}
              </Typography>
            </Box>
            <Button
              variant="text"
              sx={{
                color: "#FFA500",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                "&:hover": { textDecoration: "underline" },
                backgroundColor: "#FF8D011A",
                borderRadius: "20px",
              }}
              onClick={() => allHandler(category)}
            >
              See All →
            </Button>
          </Box>
<div style={{display:"flex", gap:"50px", marginInline:"20px", marginTop:"30px", cursor:"pointer"}} className="kkkkkkkkk">
               {subcategoriesByCategory[category.id]?.map((subcat) => (
            <Box key={subcat.id} mb={4} style={{display:"flex"}} className="dfdfsd" >
              {/* <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                {subcat.name}
              </Typography> */}
              <Grid container spacing={2}>
                {/* {generateDummyEquipment(subcat).map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={item.id}>
                    <EquipmentCard item={subcat} />
                  </Grid>
                ))} */}
                <EquipmentCard item={subcat} />
              </Grid>
            </Box>
          ))}
          </div>
        </Box>
      ))}
    </Box>
  );
};

export default HomePageSection2;
