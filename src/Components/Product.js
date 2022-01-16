import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Product = ({ details, handleBack }) => {
  const { id, name, price, description } = details;

  const [edit, setEdit] = useState(true);

  const handleEdit = () => {
    setEdit(!edit);
  };

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
                disabled={edit}
                id="outlined-read-only-input"
                label="ID"
                defaultValue={id}
              />
              <TextField
                disabled={edit}
                id="outlined-read-only-input"
                label="Name"
                defaultValue={name}
              />
              <TextField
                disabled={edit}
                id="outlined-read-only-input"
                label="Price"
                defaultValue={price.amount + price.base}
              />
              <Typography>Description: {description}</Typography>
            </Box>
          </CardContent>
        </Card>
        <Button onClick={handleEdit}>{edit ? "EDIT" : "DONE"}</Button>
        <Button onClick={handleBack}>BACK</Button>
      </Box>
    </>
  );
};

export default Product;
