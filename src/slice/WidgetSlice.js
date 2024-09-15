// redux/slices/widgetsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import data from '../data/data.json';

const initialState = {
  newWidget: { id: null, title: "", text: "", category: "" },
  categories: data,
  searchOne: "",
  openModal: false,
  openPanel: false,
  selectedCategory: 0,
  newCategory: ""
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    setNewWidget(state, action) {
      state.newWidget = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setSearchOne(state, action) {
      state.searchOne = action.payload;
    },
    toggleModal(state) {
      state.openModal = !state.openModal;
    },
    togglePanel(state) {
      state.openPanel = !state.openPanel;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setNewCategory(state, action) {
      state.newCategory = action.payload;
    },
    addOrEditWidget(state) {
        const { title, text, category, id } = state.newWidget;
      
        // Ensure that the title, text, and category are present
        if (!title || !text || !category) {
          alert("Please fill out all fields.");
          return;
        }
      
        const normalizedTitle = title.toLowerCase();
        const catIndex = state.categories.findIndex(cat => cat.category === category);
      
        if (catIndex !== -1) {
          const categoryData = state.categories[catIndex];
          const existingWidgetIndex = categoryData.widgets.findIndex(
            widget => widget.title.toLowerCase() === normalizedTitle && widget.id !== id
          );
      
          if (existingWidgetIndex !== -1) {
            alert("Title must be unique.");
            return;
          }
      
          if (id) {
            // Edit existing widget
            state.categories[catIndex].widgets = categoryData.widgets.map(widget =>
              widget.id === id ? { ...state.newWidget } : widget
            );
          } else {
            // Add new widget
            const newId = categoryData.widgets.length > 0
              ? categoryData.widgets[categoryData.widgets.length - 1].id + 1
              : 1;
            categoryData.widgets.push({ ...state.newWidget, id: newId });
          }
        } else {
          alert("Category not found.");
          return;
        }
      
        // Reset the newWidget state and close the modal
        state.newWidget = { id: null, title: "", text: "", category: "" };
        state.openModal = false;
      },
      
      
    deleteWidget(state, action) {
      const { category, id } = action.payload;
      state.categories = state.categories.map(cat => {
        if (cat.category === category) {
          cat.widgets = cat.widgets.filter(widget => widget.id !== id);
          // Remove category if it has no widgets
          if (cat.widgets.length === 0) {
            return null;
          }
        }
        return cat;
      }).filter(Boolean);
    },
    clearSearch(state) {
      state.searchOne = "";
    },
    addCategory(state) {
      if (state.newCategory.trim()) {
        state.categories.push({ category: state.newCategory, widgets: [] });
        state.newWidget.category = state.newCategory;
        state.newCategory = "";
      }
    },
    
   
  }
});

export const {
  setNewWidget,
  setCategories,
  setSearchOne,
  toggleModal,
  togglePanel,
  setSelectedCategory,
  setNewCategory,
  addOrEditWidget,
  deleteWidget,
  clearSearch,
  addCategory,
  
} = widgetsSlice.actions;

export default widgetsSlice.reducer;
