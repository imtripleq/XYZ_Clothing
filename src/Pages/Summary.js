import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableProducts from "../Components/TableProducts";

const Summary = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/products");
      const data = await res.json();

      setProducts(data);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Box>
        <Typography variant="h1">XYZ Clothing</Typography>
        <TableProducts />
      </Box>
    </>
  );
};

export default Summary;
