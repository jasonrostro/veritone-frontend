import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Dialog,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import LastPageIcon from "@mui/icons-material/LastPage";
import { styled } from "@mui/system";
import { createProduct, updateProduct } from "../../services/productServices";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "../../store/action";

const StyledTextField = styled(TextField)`
  .MuiFormHelperText-root {
    text-align: right;
    margin-top: -24px;
  }
`;

const ProductModal = ({ open, setOpen, isNewProduct, fetchProducts }) => {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setCount(selectedProduct.count);
      setPurchased(selectedProduct.purchased);
    } else {
      setName("");
      setDescription("");
      setCount(0);
      setPurchased(false);
    }
  }, [selectedProduct, dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: name,
      description: description,
      count: count,
      purchased: purchased,
    };

    try {
      if (isNewProduct) {
        await createProduct({
          name: productData.name,
          description: productData.description,
          count: productData.count,
        });
      } else {
        await updateProduct(selectedProduct.id, productData);
      }
      fetchProducts();
      dispatch(setSelectedProduct(null));
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLastPageClick = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ maxWidth: "560px", minHeight: "768px" }}>
          <AppBar
            position="static"
            sx={{
              background: "#FAFAFA",
              borderBottom: "1px solid #D5DFE9",
              boxShadow: "none",
            }}
          >
            <Toolbar
              sx={{
                color: "#5C6269",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontFamily: "Dosis, sans-serif", fontSize: 18 }}
              >
                SHOPPING LIST
              </Typography>
              <IconButton aria-label="delete" onClick={handleLastPageClick}>
                <LastPageIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box sx={{ padding: "30px", maxWidth: "500px" }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
                color: "black",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              {isNewProduct ? `Add an Item` : `Edit an Item`}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: 16,
                color: "#5C6269",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              {isNewProduct
                ? `Add your new item below`
                : `Edit your item below`}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label={
                  <span style={{ fontFamily: "Nunito, sans-serif" }}>
                    Item Name
                  </span>
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ fontFamily: "Nunito, sans-serif", margin: "8px 0" }}
                fullWidth
              />
              <StyledTextField
                label={
                  <span style={{ fontFamily: "Nunito, sans-serif" }}>
                    Description
                  </span>
                }
                minRows={5}
                helperText={`${description ? description.length : 0}/100`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ fontFamily: "Nunito, sans-serif", margin: "8px 0" }}
                fullWidth
                multiline
              />
              <TextField
                label={
                  <span style={{ fontFamily: "Nunito, sans-serif" }}>
                    How Many?
                  </span>
                }
                value={count}
                onChange={(e) => setCount(e.target.value)}
                sx={{ fontFamily: "Nunito, sans-serif", margin: "12px 0" }}
                fullWidth
                select
              >
                <MenuItem key={1} value={1}>
                  1
                </MenuItem>
                <MenuItem key={2} value={2}>
                  2
                </MenuItem>
                <MenuItem key={3} value={3}>
                  3
                </MenuItem>
              </TextField>
              {!isNewProduct ? (
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      checked={purchased}
                      onClick={() => {
                        setPurchased(!purchased);
                      }}
                    />
                  }
                  label={
                    <span style={{ fontFamily: "Nunito, sans-serif" }}>
                      Purchased
                    </span>
                  }
                  labelPlacement="end"
                />
              ) : null}
              <div
                className="deleteActions"
                style={{ float: "right", marginTop: "214px" }}
              >
                <Button
                  variant="text"
                  sx={{ marginRight: "8px" }}
                  onClick={handleClose}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: "Nunito, sans-serif",
                      color: "black",
                      textTransform: "none",
                    }}
                  >
                    Cancel
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#1871E8" }}
                  type="submit"
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: "Nunito, sans-serif",
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    {isNewProduct ? "Add Item" : "Save Item"}
                  </Typography>
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ProductModal;