import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteWidget } from "../slice/WidgetSlice";

const Widgets = ({ filteredWidgets }) => {
  const dispatch = useDispatch();

  const deleteWidgetHandler = (category, id) => {
    dispatch(deleteWidget({ category, id }));
  };

  return (
    <Grid container spacing={2}>
      {filteredWidgets.map((category) =>
        category.widgets.length > 0 ? (
          <React.Fragment key={category.category}>
            <Grid item xs={12}>
              <Typography variant="h5" textAlign="center">
                {category.category}
              </Typography>
            </Grid>
            {category.widgets.map((widget) => (
              <Grid item xs={12} sm={4} key={widget.id}>
                <Box
                  sx={{
                    padding: 4,
                    backgroundColor: "#FAF6CF",
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    height: 150,
                    textAlign: "center",
                    boxShadow:3,
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
                    onClick={() =>
                      deleteWidgetHandler(category.category, widget.id)
                    }
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
        ) : null
      )}
    </Grid>
  );
};

export default Widgets;
