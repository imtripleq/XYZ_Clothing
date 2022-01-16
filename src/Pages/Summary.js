import { Box, Table, TableBody, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Product from "../Components/Product";
import TableProducts from "../Components/TableProducts";

const Summary = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [currencyOption, setCurrencyOption] = useState([]);

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

  return (
    <>
      <Box>
        <Box>
          <Typography variant="h1">XYZ Clothing</Typography>
        </Box>
        <Box>
          {loading ? <Typography>Currency</Typography> : null}
          {loading ? (
            <select>
              {currencyOption.map((item) => {
                return <option value={item.base}>{item.base}</option>;
              })}
            </select>
          ) : null}
        </Box>
        <Box>
          <Table>
            <TableBody>
              {loading
                ? products.map((item) => {
                    return (
                      <TableProducts
                        product={item}
                        key={item.id}
                        handleDetails={() => handleDetails(item.id)}
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
            />
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Summary;
