import React, { useState, useEffect } from "react";
import {
  Button,
  Popover,
  TextField,
  List,
  ListItem,
  FormControl,
} from "@mui/material";
import axios from "axios";
import "./CategoryDashBoard.css";

export default function CategoryDashBoard() {
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = () => {
    axios
      .get("http://localhost:5125/api/v1/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log("Error fetching categories:", error);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClick = (event, category = null) => {
    if (category) {
      setIsEditing(true);
      setSelectedCategory(category);
      setCategoryInfo({ name: category.name });
    } else {
      setIsEditing(false);
      setCategoryInfo({ name: "" });
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "category-popover" : undefined;

  const onChangeHandler = (event) => {
    setCategoryInfo({
      ...categoryInfo,
      [event.target.name]: event.target.value,
    });
  };

  // Create or Update Category
  const saveCategory = () => {
    const token = localStorage.getItem("token");
    const url = isEditing
      ? `http://localhost:5125/api/v1/category/${selectedCategory.id}`
      : "http://localhost:5125/api/v1/category";
    const method = isEditing ? "put" : "post";

    axios({
      method,
      url,
      data: categoryInfo,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert(
          isEditing
            ? "Category Updated Successfully!"
            : "Category Created Successfully!"
        );
        fetchCategories();
        handleClose();
      })
      .catch((error) => console.log("Error saving category:", error));
  };

  // Delete Category
  const deleteCategory = (categoryId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5125/api/v1/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Category Deleted Successfully!");
        fetchCategories();
      })
      .catch((error) => console.log("Error deleting category:", error));
  };

  return (
    <div className="category-dashboard">
      <h1>Categories Dashboard</h1>
      <Button
        variant="contained"
        onClick={(e) => handleClick(e)}
        className="create-button"
      >
        Create New Category
      </Button>
      <h2>List of Categories</h2>
      <List className="category-list">
        {categories.map((category) => (
          <ListItem key={category.id} className="category-item">
            <FormControl fullWidth>
              <p>{category.name}</p>
              <Button onClick={(e) => handleClick(e, category)}>Edit</Button>
              <Button onClick={() => deleteCategory(category.id)}>
                Delete
              </Button>
            </FormControl>
          </ListItem>
        ))}
      </List>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <FormControl fullWidth className="popover-content">
          <TextField
            name="name"
            label="Category Name"
            variant="standard"
            value={categoryInfo.name}
            helperText="Please enter the category name"
            onChange={onChangeHandler}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={saveCategory}
            style={{ marginTop: "16px" }}
          >
            {isEditing ? "Update Category" : "Create Category"}
          </Button>
        </FormControl>
      </Popover>
    </div>
  );
}
