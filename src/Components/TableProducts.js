import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";

const TableProducts = ({ product }) => {
  const { id, name, price } = product;
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="right">
          {price.amount}
          {price.base}
        </TableCell>
        <TableCell>
          <IconButton>
            <KeyboardArrowRightOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableProducts;
