import React from "react"
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../theme";


function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            InkWell-Library
          </Typography>
          <div>
          <p>Inkwell Library is a book app designed to cater to book lovers who want to explore different genres and authors. The app offers an extensive collection of books ranging from classic literature to modern-day bestsellers. With Inkwell Library, users can easily search for books by author, title, or genre, and save their favorite titles to personalized reading lists. The app also features book recommendations and reviews from other readers, providing a community-driven experience. With a simple and user-friendly interface, Inkwell Library makes reading and discovering new books easy and accessible. Whether you're a casual reader or a bookworm, Inkwell Library has something for everyone.</p>
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Frequently Asked Questions</Typography>
          <Typography mb="30px">Complaints</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Partner With Us</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            Physical address: Ngong Lane Plaza, Ngong Road
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: support@sunny-books.com
          </Typography>
          <Typography mb="30px">+254-712-345-678</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;