import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../helpers/FormatNumber";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    await axios
      .get("https://api.coingecko.com/api/v3/coins/categories/")
      .then((res) => {
        setCategories(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <TableContainer component={Paper} style={{ width: 1000, margin: "auto" }}>
      <h2>Categories</h2>
      <Table size="small" stickyHeader>
        <TableHead xs={{ backgroundColor: "blue" }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Market Cap</TableCell>
            <TableCell>Volume (24h)</TableCell>
            <TableCell>Top 3 Coins</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => {
            return (
              <TableRow key={category.id}>
                <TableCell component="th" scope="row">
                  {category.name}{" "}
                </TableCell>
                <TableCell> {formatNumber(category.market_cap)} </TableCell>
                <TableCell> {formatNumber(category.volume_24h)} </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    {category.top_3_coins.map((coin) => {
                      return (
                        <Avatar
                          sx={{ bgcolor: "none" }}
                          alt={category.name + "-" + "logo"}
                          src={coin}
                        />
                      );
                    })}
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryList;
