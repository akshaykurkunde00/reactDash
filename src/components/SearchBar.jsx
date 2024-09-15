import React from "react";
import { Box, Input, Button } from "@mui/material";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setSearchOne, clearSearch } from "../slice/WidgetSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchOne = useSelector((state) => state.widgets.searchOne);

  const clearSearchHandler = () => {
    dispatch(clearSearch());
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", }}>
      <Input
        type="text"
        color="success"
        placeholder="Search by widget title"
        value={searchOne}
        onChange={(e) => dispatch(setSearchOne(e.target.value))}
        sx={{ width: "auto" }}
        aria-label="Search Widgets"
      />
      {searchOne && (
        <Button onClick={clearSearchHandler} sx={{ ml: 1 }}>
          <ImCross />
        </Button>
      )}
    </Box>
  );
};

export default SearchBar;
