import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Checkbox,
  Button,
  IconButton,
  Typography,
  Dialog,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ProductModal from "../../components/products/productModal";
import {
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../services/productServices";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setSelectedProduct,
  setDeleteModalOpen,
  setModalOpen,
  setIsNewProduct,
} from "../../store/action";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {
    products,
    selectedProduct,
    deleteModalOpen,
    modalOpen,
    isNewProduct,
  } = useSelector((state) => state);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      dispatch(setProducts(response));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      await updateProduct(id, productData);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(selectedProduct);
      dispatch(setSelectedProduct(null));
      dispatch(setDeleteModalOpen(false));
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = () => {
    dispatch(setSelectedProduct(null));
    dispatch(setIsNewProduct(true));
    dispatch(setModalOpen(true));
  };

  const handleEditProduct = (product) => {
    dispatch(setSelectedProduct(product));
    dispatch(setIsNewProduct(false));
    dispatch(setModalOpen(true));
  };

  const handleChecked = (id, purchased) => {
    const selected = products.filter((product) => product.id === id);
    const data = { ...selected[0], purchased: purchased };
    handleUpdateProduct(id, data);
  };

  const handleDelete = (id) => {
    dispatch(setSelectedProduct(id));
    dispatch(setDeleteModalOpen(true));
  };

  const handleModalClose = () => {
    dispatch(setSelectedProduct(null));
    dispatch(setDeleteModalOpen(false));
  };

  return (
    <>
      <Box sx={{ fontFamily: "Nunito, sans-serif" }}>
        {products.length ? (
          <Container className="productsList">
            <Grid
              container
              sx={{
                maxWidth: "1024px",
                marginTop: "36px",
                paddingLeft: "24px",
                paddingRight: "24px",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "6px 0",
                }}
              >
                <span style={{ fontSize: 18 }}>Your Items</span>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#1871E8" }}
                  onClick={handleAddProduct}
                >
                  <span
                    style={{
                      fontSize: 14,
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    Add Item
                  </span>
                </Button>
              </Grid>
              {products.map((product) => {
                return (
                  <>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        height: "88px",
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 8px",
                        width: "100%",
                        border: `${
                          product.purchased ? "none" : "1px solid #C6C6C6"
                        }`,
                        background: `${product.purchased ? "#F8FAFB" : ""}`,
                        borderRadius: 1.25,
                        margin: "6px 0",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      key={product.id}
                    >
                      <div
                        className="itemInfo"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Checkbox
                          sx={product.purchased ? { color: "#4D81B7" } : {}}
                          checked={product.purchased}
                          onClick={(e) =>
                            handleChecked(product.id, !product.purchased)
                          }
                        />
                        <div>
                          <Typography
                            className="Name"
                            sx={{
                              fontSize: 16,
                              color: `${
                                product.purchased ? "#4D81B7" : "black"
                              }`,
                              fontFamily: "Nunito, sans-serif",
                            }}
                          >
                            {product.purchased ? (
                              <s>{product.name}</s>
                            ) : (
                              product.name
                            )}
                          </Typography>
                          <Typography
                            className="Description"
                            sx={{
                              fontSize: 14,
                              color: "#7D7A7A",
                              fontFamily: "Nunito, sans-serif",
                            }}
                          >
                            {product.purchased ? (
                              <s>{product.description}</s>
                            ) : (
                              product.description
                            )}
                          </Typography>
                        </div>
                      </div>
                      <div className="actions">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditProduct(product)}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </div>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Container>
        ) : (
          <Container
            className="emptyView"
            sx={{
              width: 614,
              height: 295,
              borderRadius: 1.25,
              border: "1px solid #C6C6C6",
              display: "flex",
              alignItems: "center",
              marginTop: "110px",
            }}
          >
            <Grid container>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <p
                  style={{
                    color: "#87898C",
                    fontSize: 18,
                  }}
                >
                  Your shopping list is empty :(
                </p>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#1871E8" }}
                  onClick={handleAddProduct}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    Add your first item
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
      <Dialog open={deleteModalOpen} onClose={handleModalClose}>
        <Box sx={{ padding: "30px", maxWidth: "350px" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: 18,
              color: "black",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            Delete Item?
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: "#7D7A7A",
              fontFamily: "Nunito, sans-serif",
              marginTop: "8px",
              marginBottom: "64px",
            }}
          >
            Are you sure you want to delete this item? This can not be undone.
          </Typography>
          <div className="deleteActions" style={{ float: "right" }}>
            <Button
              variant="text"
              sx={{ marginRight: "8px" }}
              onClick={handleModalClose}
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
              onClick={() => handleDeleteProduct()}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontFamily: "Nunito, sans-serif",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Delete
              </Typography>
            </Button>
          </div>
        </Box>
      </Dialog>
      <ProductModal
        open={modalOpen}
        setOpen={(flag) => dispatch(setModalOpen(flag))}
        isNewProduct={isNewProduct}
        fetchProducts={fetchProducts}
      />
    </>
  );
};

export default ProductsPage;
