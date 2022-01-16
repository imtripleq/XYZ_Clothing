import { Box, Table, TableBody, Typography } from "@mui/material";
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
        <Box>
          <Table>
            <TableBody>
              {products.map((item) => {
                return <TableProducts product={item} key={item.id} />;
              })}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default Summary;
