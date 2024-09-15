import React, { useMemo } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./components/SearchBar";
import Widgets from "./components/Widgets";
import AddWidgetModal from "./components/addWidget";
import { toggleModal, setNewWidget } from "./slice/WidgetSlice";

function App() {
  const dispatch = useDispatch();
  const { categories, searchOne } = useSelector((state) => state.widgets);

  const filteredWidgets = useMemo(
    () =>
      categories.map((cat) => ({
        ...cat,
        widgets: cat.widgets.filter((widget) =>
          widget.title.toLowerCase().includes(searchOne.toLowerCase())
        ),
      })),
    [categories, searchOne]
  );

  return (
    <Container>
      <Box
        sx={{
          marginBottom: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          
        
        }}
      >
        <SearchBar />
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            dispatch(toggleModal());
            dispatch(
              setNewWidget({ id: null, title: "", text: "", category: "" })
            );
          }}
          sx={{ marginLeft: 2  }}
        >
          Add Widget
        </Button>
      </Box>

      {filteredWidgets.every((cat) => cat.widgets.length === 0) && (
        <Typography variant="h4" textAlign="center">
          No results found
        </Typography>
      )}

      <Widgets filteredWidgets={filteredWidgets} />
      <AddWidgetModal />
    </Container>
  );
}

export default App;
