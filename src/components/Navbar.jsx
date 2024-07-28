import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utlis/constant";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      p={2}
      sx={{
        background: "#000",
        position: "sticky",
        justifyContent: "space-between",
      }}
    >
      <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logio" height={45} />
      </Link>
      <Searchbar />
    </Stack>
  );
};

export default Navbar;
