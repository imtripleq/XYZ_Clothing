import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import TableProducts from "./TableProducts";

// Styling
const useStyles = makeStyles({
  page: { display: "flex", flexDirection: "column", alignItems: "center" },
  cardContainer: { minWidth: "300px", maxWidth: "500px" },
  productContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  relatedContainer: {
    margin: "40px 0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const Product = ({
  details,
  handleBack,
  products,
  AUD,
  USD,
  CNY,
  currency,
}) => {
  const classes = useStyles();
  const { id, name, price, description, relatedProducts } = details;

  // Enable or Disable edit
  const [edit, setEdit] = useState(true);
  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      <Box className={classes.page}>
        <Box className={classes.cardContainer}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                component="form"
                className={classes.productContainer}
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
        </Box>
        <Button onClick={handleEdit}>{edit ? "EDIT" : "DONE"}</Button>
        <Button onClick={handleBack}>BACK</Button>
      </Box>

      <Box className={classes.relatedContainer}>
        <Typography variant="h5">Related Products</Typography>
        <Table>
          <TableBody>
            {relatedProducts.map((item) => {
              return (
                <TableProducts
                  product={products[item]}
                  key={item}
                  currency={currency}
                  AUD={AUD}
                  USD={USD}
                  CNY={CNY}
                />
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default Product;
