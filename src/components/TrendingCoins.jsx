import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

const Home = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);

  const getTrendingCoins = () => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => {
        setTrendingCoins(res.data.coins);
        console.log(res.data.coins);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTrendingCoins();
  }, []);
  return (
    <TableContainer component={Paper} style={{ width: 400, margin: "auto" }}>
      <h2>Trending Coins</h2>
      <Table size="small" stickyHeader>
        <TableHead xs={{ backgroundColor: "blue" }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Market cap rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trendingCoins.map((trendingCoin) => {
            return (
              <TableRow key={trendingCoin.item.id}>
                <TableCell component="th" scope="row">
                  {trendingCoin.item.name}{" "}
                </TableCell>
                <TableCell> {trendingCoin.item.symbol} </TableCell>
                <TableCell> {trendingCoin.item.market_cap_rank} </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
