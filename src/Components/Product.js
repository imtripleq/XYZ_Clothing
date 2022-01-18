import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
  currencyContainer: {
    display: "flex",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    minWidth: "300px",
    justifyContent: "space-between",
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
  currencyOption,
}) => {
  // Product details
  const [id, setId] = useState(details.id);
  const [name, setName] = useState(details.name);
  const [price, setPrice] = useState(details.price.amount);
  const [description, setDescription] = useState(details.description);
  const [relatedProducts, setRelatedProducts] = useState(
    details.relatedProducts
  );
  const [form, setForm] = useState({});
  const [sending, setSending] = useState(false);
  const [characterError, setcharacterError] = useState(false);
  const [newCurrency, setNewCurrency] = useState(details.price.base);
  const [checkFormat, setCheckFormat] = useState(true);

  const classes = useStyles();

  // Check Name Character
  const checkName = (words) => {
    if (words.length < 3) {
      return setcharacterError(true), setCheckFormat(false);
    } else {
      setName(words);
      setcharacterError(false);
      setCheckFormat(true);
    }
  };

  // Enable or Disable edit
  const [edit, setEdit] = useState(true);
  const handleEdit = () => {
    setEdit(!edit);
    setForm({
      id: id,
      name: name,
      description: description,
      price: {
        base: newCurrency,
        amount: price,
      },
      relatedProducts: relatedProducts,
    });
  };

  // Handle submit form
  const handleSubmit = async (products, id) => {
    setSending(true);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    };
    const response = await fetch(
      `http://localhost:4000/products/${id}`,
      requestOptions
    );
    setTimeout(() => setSending(false), 1000);
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
                  onChange={(e) => setId(e.target.value)}
                />
                <TextField
                  disabled={edit}
                  id="outlined-read-only-input"
                  label="Name"
                  defaultValue={name}
                  onChange={(e) => checkName(e.target.value)}
                />
                {characterError ? (
                  <Typography variant="caption" sx={{ color: "red" }}>
                    Please enter at least 3 characters.
                  </Typography>
                ) : null}
                <Box className={classes.currencyContainer}>
                  <TextField
                    sx={{ width: "15ch!important" }}
                    disabled={edit}
                    id="outlined-read-only-input"
                    label="Price"
                    defaultValue={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <FormControl>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      onChange={(e) => setNewCurrency(e.target.value)}
                      label="Currency"
                      value={newCurrency}
                      sx={{ width: "12ch!important" }}
                      disabled={edit}
                    >
                      {currencyOption.map((item, id) => {
                        return (
                          <MenuItem value={item.base} key={id}>
                            {item.base}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Typography>Description: {description}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box className={classes.buttonContainer}>
          <Button onClick={handleEdit}>{edit ? "EDIT" : "DONE"}</Button>
          <Button
            onClick={() => {
              checkFormat ? handleSubmit(form, id) : alert("Incorrect format!");
            }}
          >
            Submit
          </Button>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 250,
          }}
        >
          {sending ? <CircularProgress size={100} /> : null}
        </Box>
        <Button onClick={handleBack}>BACK</Button>
      </Box>

      <Box className={classes.relatedContainer}>
        <Typography variant="h5">Related Products</Typography>
        <Table>
          <TableBody>
            {relatedProducts.map((item) => {
              return (
                <TableProducts
                  product={products[item - 1]}
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
