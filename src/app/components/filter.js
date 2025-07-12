"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import Image from "next/image";
import axios from "axios";
import plus from "../../public/assets/plus.png";
import { API_DOMAIN } from "../helper/constant";
import { useSearchParams } from "next/navigation";

const Index = ({ handlerSub }) => {
  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null); // for which subcategories are shown
  const [selectedSubCatId, setSelectedSubCatId] = useState(null); // currently selected subcategory

  const searchParams = useSearchParams();
  const categoryIdFromUrl = searchParams.get("id");
  const subCatIdFromUrl = searchParams.get("subCatId");

  useEffect(() => {
    if (subCatIdFromUrl) {
      setSelectedSubCatId(subCatIdFromUrl);
    }
  }, [subCatIdFromUrl]);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubCateogryApi = async (id) => {
    setActiveCategoryId(id);
    try {
      const response = await axios.get(
        `${API_DOMAIN}/subcategory/byCategory/all/${id}?start=0&size=25`
      );
      setSubcategory(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_DOMAIN}/category/all?start=0&size=10`);
        const fetchedCategories = response.data?.data || [];
        setCategories(fetchedCategories);

        if (categoryIdFromUrl) {
          const foundIndex = fetchedCategories.findIndex(
            (cat) => cat.id.toString() === categoryIdFromUrl
          );
          if (foundIndex !== -1) {
            const panelId = `panel${foundIndex}`;
            setExpanded(panelId);
            handleSubCateogryApi(categoryIdFromUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [categoryIdFromUrl]);

  const subHandler = (data) => {
    setSelectedSubCatId(data?.id); // update selected subcategory
    handlerSub(data); // pass to parent
  };

  return (
    <Box sx={{ width: "300px", bgcolor: "#F8F8F8", borderRadius: "10px", p: 2 }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "26px" }}>
        Browse by Categories
      </Typography>

      {categories.map((category, index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion
            key={panelId}
            expanded={expanded === panelId}
            onChange={handleChange(panelId)}
            sx={{ bgcolor: "transparent", boxShadow: "none", mt: 1 }}
          >
            <AccordionSummary
              onClick={() => handleSubCateogryApi(category?.id)}
              expandIcon={<Image src={plus} alt="plus" title="plus" />}
              sx={{ fontWeight: "bold", color: "#333", fontSize: "14px" }}
            >
              {category?.name}
            </AccordionSummary>

            <AccordionDetails>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  cursor: "pointer",
                }}
              >
                {subcategory.length > 0 ? (
                  subcategory.map((data, index) => (
                    <div
                      key={index}
                      onClick={() => subHandler(data)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        fontWeight: selectedSubCatId == data.id ? "bold" : "normal",
                        backgroundColor: selectedSubCatId == data.id ? "#FFEFD5" : "transparent",
                        color: selectedSubCatId == data.id ? "#000" : "#555",
                        border: selectedSubCatId == data.id ? "1px solid #FF8C00" : "none",
                      }}
                    >
                      {data?.name}
                    </div>
                  ))
                ) : (
                  <div>No list is available</div>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default Index;
