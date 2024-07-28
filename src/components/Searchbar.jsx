import { Search } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const naviagte = useNavigate();

  const handleSubmut = (e) => {
    e.preventDefault();

    if (searchTerm) {
    }
    naviagte(`/search/${searchTerm}`);
    setsearchTerm("");
  };
  return (
    <Paper
      component={"form"}
      onSubmit={handleSubmut}
      sx={{
        borderRadius: 20,
        border: `1px soolid #e3e3e3`,
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
      }}
    >
      <input
        className="search-bar"
        placeholder="search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton type="submit " sx={{ p: "10px", color: "red" }}>
        <Search />
      </IconButton>
    </Paper>
  );
};

export default Searchbar;
