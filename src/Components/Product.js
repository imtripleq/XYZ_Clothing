import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import React from "react";

const Product = ({ details }) => {
  const { id, name, price, description } = details;
  return (
    <>
      <Box>
        <Card>
          <CardContent>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              component="form"
            >
              <TextField
                id="outlined-read-only-input"
                label="ID"
                defaultValue={id}
              />
              <TextField
                id="outlined-read-only-input"
                label="Name"
                defaultValue={name}
              />
              <TextField
                id="outlined-read-only-input"
                label="Price"
                defaultValue={price.amount + price.base}
              />
              <Typography>Description: {description}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Product;
