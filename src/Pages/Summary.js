import { Box, Table, TableBody, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import Product from "../Components/Product";
import TableProducts from "../Components/TableProducts";

const useStyles = makeStyles({
  page: { display: "flex", flexDirection: "column", alignItems: "center" },

  titleContainer: {
    display: "flex",
    margin: "auto",
  },
  currencyContainer: { display: "flex", margin: "20px" },
  currencyTitle: { margin: "0px 20px" },
  tableContainer: { maxWidth: "800px", minWidth: "500px" },
});

const Summary = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [currencyOption, setCurrencyOption] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [USD, setUSD] = useState(1);
  const [AUD, setAUD] = useState(1);
  const [CNY, setCNY] = useState(1);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/products");
      const data = await res.json();

      setProducts(data);
      console.log(data);
      setLoading(true);
    };

    const fetchRates = async () => {
      const res = await fetch("http://localhost:4000/rates");
      const data = await res.json();

      setCurrencyOption(data);
      console.log(data);
      setAUD(data[0].rates);
      setUSD(data[1].rates);
      setCNY(data[2].rates);
    };

    fetchData();
    fetchRates();
  }, []);

  const handleDetails = async (id) => {
    const res = await fetch(`http://localhost:4000/products/${id}`);
    const data = await res.json();

    setDetail(data);
    console.log(data);
    setDetailLoading(true);
    setLoading(false);
  };

  const handleBack = () => {
    setLoading(true);
    setDetailLoading(false);
  };
  console.log(currency);
  return (
    <>
      <Box className={classes.page}>
        <Box className={classes.titleContainer}>
          <Typography variant="h1">XYZ Clothing</Typography>
        </Box>
        <Box className={classes.currencyContainer}>
          <Box className={classes.currencyTitle}>
            {loading ? <Typography>Currency</Typography> : null}
          </Box>
          {loading ? (
            <select onChange={(e) => setCurrency(e.target.value)}>
              {currencyOption.map((item) => {
                return (
                  <option value={item.base} key={item.base}>
                    {item.base}
                  </option>
                );
              })}
            </select>
          ) : null}
        </Box>
        <Box className={classes.tableContainer}>
          <Table>
            <TableBody>
              {loading
                ? products.map((item) => {
                    return (
                      <TableProducts
                        product={item}
                        key={item.id}
                        handleDetails={() => handleDetails(item.id)}
                        currency={currency}
                        AUD={AUD}
                        USD={USD}
                        CNY={CNY}
                      />
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </Box>
        <Box>
          {detailLoading ? (
            <Product
              details={detail}
              handleBack={handleBack}
              products={products}
              currency={currency}
              AUD={AUD}
              USD={USD}
              CNY={CNY}
            />
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Summary;
