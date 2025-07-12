"use client";
import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Box, 
  Container, 
  Typography 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const faqs = [
  { 
    question: "What is the purpose of a dehumidifier?", 
    answer: "A dehumidifier helps to reduce humidity levels, preventing mold growth and improving air quality." 
  },
  { 
    question: "How does a dehumidifier work?", 
    answer: "It pulls in humid air, cools it to condense moisture, and then releases drier air back into the room." 
  },
  { 
    question: "What types of dehumidifiers are available for rent?", 
    answer: "You can rent refrigerant dehumidifiers, desiccant dehumidifiers, and whole-house dehumidifiers." 
  },
  { 
    question: "What size dehumidifier do I need for my space?", 
    answer: "The size depends on the room's humidity level and square footage. A larger space requires a more powerful unit." 
  },
  { 
    question: "What benefits can I expect from using a dehumidifier?", 
    answer: "It helps prevent mold, reduces allergens, improves air quality, and protects furniture from moisture damage." 
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 8, bgcolor: "#FAFBFC" }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            fontSize: { xs: "24px", md: "32px" },
            color: "#1D3058",
            mb: 6,
            fontFamily: "'Inter', sans-serif"
          }}
        >
          Frequently asked questions about Dehumidifiers
        </Typography>

        <Box sx={{ maxWidth: "800px" }}>
          {faqs.map((faq, index) => (
            <Accordion 
              key={index} 
              expanded={expanded === `panel${index}`} 
              onChange={handleChange(`panel${index}`)}
              sx={{
                mb: 2,
                borderRadius: "12px !important",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                border: "1px solid #E5E7EB",
                "&:before": { display: "none" },
                "&.Mui-expanded": {
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
                }
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon sx={{ color: "#1D3058" }} />}
                sx={{ 
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#1D3058",
                  fontFamily: "'Inter', sans-serif",
                  py: 2,
                  px: 3,
                  "&.Mui-expanded": {
                    borderBottom: "1px solid #E5E7EB"
                  }
                }}
              >
                {faq.question}
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, py: 2 }}>
                <Typography 
                  sx={{ 
                    color: "#666",
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;