"use client"
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const faqs = [
  { question: "What is the purpose of a dehumidifier?", answer: "A dehumidifier helps to reduce humidity levels, preventing mold growth and improving air quality." },
  { question: "How does a dehumidifier work?", answer: "It pulls in humid air, cools it to condense moisture, and then releases drier air back into the room." },
  { question: "What types of dehumidifiers are available for rent?", answer: "You can rent refrigerant dehumidifiers, desiccant dehumidifiers, and whole-house dehumidifiers." },
  { question: "What size dehumidifier do I need for my space?", answer: "The size depends on the room’s humidity level and square footage. A larger space requires a more powerful unit." },
  { question: "What benefits can I expect from using a dehumidifier?", answer: "It helps prevent mold, reduces allergens, improves air quality, and protects furniture from moisture damage." },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (isExpanded) => {
    // Toggle the accordion when clicking the same question again
    setExpanded(prev => (prev === panel ? false : panel));
  };

  return (
    <Box sx={{ py: 5, paddingRight:"0px", Width:"unset", mx:3, mt:3  }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Frequently asked questions about Dehumidifiers
      </Typography>

      <Box>
        {faqs.map((faq, index) => (
          <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: "bold" }}>
              {faq.question}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQSection;
