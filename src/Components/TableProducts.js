import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";

const TableProducts = ({ product, handleDetails, currency, AUD, USD, CNY }) => {
  const convert = ({ base, amount }) => {
    if (base === "USD") {
      return amount * (USD[currency] ? USD[currency] : 1);
    } else if (base === "CNY") {
      return amount * (CNY[currency] ? CNY[currency] : 1);
    } else if (base === "AUD") {
      return amount * (AUD[currency] ? AUD[currency] : 1);
    }
  };

  const { id, name, price } = product;
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="right">
          {Math.floor(convert(price))} {currency}
        </TableCell>
        <TableCell>
          <IconButton onClick={handleDetails}>
            <KeyboardArrowRightOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableProducts;
