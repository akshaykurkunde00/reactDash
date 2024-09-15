import React from "react";
import { Box, Typography, Input, Select, MenuItem, Button, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewWidget,
  setNewCategory,
  addCategory,
  addOrEditWidget,
  toggleModal,
} from "../slice/WidgetSlice";

const AddWidget = () => {
  const dispatch = useDispatch();
  const { newWidget, openModal, newCategory, categories } = useSelector(
    (state) => state.widgets
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(setNewWidget({ ...newWidget, [name]: value }));
  };

  const addOrEditWidgetHandler = () => {
    if (newWidget.category === "addNew") {
      dispatch(addCategory());
    } else {
      dispatch(addOrEditWidget());
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={() => dispatch(toggleModal())}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          {newWidget.id ? "Edit Widget" : "Add Widget"}
        </Typography>
        <Input
          name="title"
          value={newWidget.title}
          onChange={handleInput}
          placeholder="Title"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Input
          name="text"
          value={newWidget.text}
          onChange={handleInput}
          placeholder="Text"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Select
          value={newWidget.category}
          onChange={(e) =>
            dispatch(setNewWidget({ ...newWidget, category: e.target.value }))
          }
          displayEmpty
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="" disabled>
            Select Category
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.category} value={cat.category}>
              {cat.category}
            </MenuItem>
          ))}
          <MenuItem value="addNew">Add New Category</MenuItem>
        </Select>
        {newWidget.category === "addNew" && (
          <Input
            value={newCategory}
            onChange={(e) => dispatch(setNewCategory(e.target.value))}
            placeholder="New Category"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        )}
        <Button
          variant="outlined"
          onClick={addOrEditWidgetHandler}
          fullWidth
          disabled={!newWidget.title || !newWidget.text}
        >
          {newWidget.id ? "Update" : "Add"}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddWidget;
