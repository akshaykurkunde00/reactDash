import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Input,
  Button,
  Typography,
  Modal,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import data from "./data/data.json";
import { ImCross } from "react-icons/im";

function App() {
  const [newWidget, setNewWidget] = useState({ id: null, title: "", text: "", category: "" });
  const [categories, setCategories] = useState([]);
  const [searchOne, setSearchOne] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openPanel, setOpenPanel] = useState(false); // State for Panel Modal
  const [selectedCategory, setSelectedCategory] = useState(0); // State for selected Tab
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    setCategories(data);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewWidget({ ...newWidget, [name]: value });
  };

  const addOrEditWidget = () => {
    if (newWidget.title && newWidget.text && newWidget.category) {
      const normalizedTitle = newWidget.title.toLowerCase();
      const category = categories.find(cat => cat.category === newWidget.category);

      if (category) {
        const existingWidget = category.widgets.find(widget => widget.title.toLowerCase() === normalizedTitle && widget.id !== newWidget.id);
        if (existingWidget) {
          alert("Title must be unique.");
          return;
        }

        if (newWidget.id) {
          category.widgets = category.widgets.map(widget =>
            widget.id === newWidget.id ? { ...newWidget } : widget
          );
        } else {
          const newId = category.widgets.length > 0 ? category.widgets[category.widgets.length - 1].id + 1 : 1;
          category.widgets.push({ ...newWidget, id: newId });
        }

        setCategories([...categories]);
      } else {
        alert("Category not found");
      }

      setNewWidget({ id: null, title: "", text: "", category: "" });
      setOpenModal(false);
    }
  };

  const deleteWidget = (category, id) => {
    const updatedCategories = categories.map(cat => {
      if (cat.category === category) {
        cat.widgets = cat.widgets.filter(widget => widget.id !== id);
      }
      return cat;
    });
    setCategories(updatedCategories);
  };

  const clearSearch = () => {
    setSearchOne("");
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { category: newCategory, widgets: [] }]);
      setNewWidget({ ...newWidget, category: newCategory });
      setNewCategory("");
    }
  };

  const filterWidget = categories.map(cat => ({
    ...cat,
    widgets: cat.widgets.filter(widget =>
      widget.title.toLowerCase().includes(searchOne.toLowerCase())
    )
  }));

  const handlePanelSave = () => {
    // Handle widget deletion for unchecked widgets
    const updatedCategories = categories.map(cat => ({
      ...cat,
      widgets: cat.widgets.filter(widget => widget.checked !== false)
    }));
    setCategories(updatedCategories);
    setOpenPanel(false);
  };

  const handleCheckboxChange = (categoryIndex, widgetIndex) => {
    const updatedCategories = [...categories];
    const widget = updatedCategories[categoryIndex].widgets[widgetIndex];
    widget.checked = widget.checked === undefined ? false : !widget.checked;
    setCategories(updatedCategories);
  };

  return (
    <Container > 
      <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Input
            type="text"
            placeholder="Search by widget title"
            value={searchOne}
            onChange={(e) => setSearchOne(e.target.value)}
            sx={{ width: "auto" }}
          />
          {searchOne && (
            <Button onClick={clearSearch} sx={{ ml: 1 }}>
            <ImCross />
            </Button>
          )}
        </Box>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenModal(true);
              setNewWidget({ id: null, title: "", text: "", category: "" });
            }}
            sx={{ marginLeft: 2 }}
          >
            Add Widget
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenPanel(true)} // Open the Panel Modal
            sx={{ marginLeft: 2 }}
          >
            Panel
          </Button>
        </Box>
      </Box>

      {filterWidget.every(cat => cat.widgets.length === 0) && (
        <Typography variant="h4" textAlign="center">
          No results found
        </Typography>
      )}

      <Grid container spacing={2}>
        {filterWidget.map((category) => (
          category.widgets.length > 0 && (
            <React.Fragment key={category.category}>
              <Grid item xs={12}>
                <Typography variant="h5" textAlign="center">{category.category}</Typography>
              </Grid>
              {category.widgets.map((widget) => (
                <Grid item xs={12} sm={4} key={widget.id}>
                  <Box
                    sx={{
                      padding: 4,
                      backgroundColor: "#FEFFD2",
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      height: 150,
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        fontSize: "medium",
                      }}
                    >
                      {widget.title}
                    </Typography>
                    <Button
                      onClick={() => deleteWidget(category.category, widget.id)}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "red",
                        
                      }}
                    >
                      <ImCross />
                    </Button>
                    <Typography
                      sx={{
                        fontSize: "large",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      {widget.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </React.Fragment>
          )
        ))}
      </Grid>

      {/* Add/Edit Widget Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
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
            onChange={(e) => setNewWidget({ ...newWidget, category: e.target.value })}
            displayEmpty
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="" disabled>Select Category</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.category}>{cat.category}</MenuItem>
            ))}
            <MenuItem value="addNew">Add New Category</MenuItem>
          </Select>
          {newWidget.category === "addNew" && (
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          )}
          <Button
            variant="outlined"
            onClick={newWidget.category === "addNew" ? handleAddCategory : addOrEditWidget}
            fullWidth
            disabled={!newWidget.title || !newWidget.text || (!newWidget.category && newWidget.category !== "addNew")}
          >
            {newWidget.id ? "Update" : "Add"}
          </Button>
        </Box>
      </Modal>

      {/* Panel Modal */}
      <Modal
        open={openPanel}
        onClose={() => setOpenPanel(false)}
        aria-labelledby="panel-modal-title"
        aria-describedby="panel-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>Panel</Typography>
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            variant="fullWidth"
          >
            {categories.map((cat, index) => (
              <Tab key={index} label={cat.category} />
            ))}
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {categories[selectedCategory]?.widgets.map((widget, widgetIndex) => (
              <FormControlLabel
                key={widget.id}
                control={
                  <Checkbox
                    checked={widget.checked !== false}
                    onChange={() => handleCheckboxChange(selectedCategory, widgetIndex)}
                  />
                }
                label={widget.title}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={() => setOpenPanel(false)} sx={{ marginRight: 2 }}>Cancel</Button>
            <Button onClick={handlePanelSave} variant="contained">Save</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default App;
