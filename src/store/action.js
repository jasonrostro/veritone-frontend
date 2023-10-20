import {
  SET_PRODUCTS,
  SET_SELECTED_PRODUCT,
  SET_DELETE_MODAL_OPEN,
  SET_MODAL_OPEN,
  SET_IS_NEW_PRODUCT,
} from "./actionTypes";

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const setSelectedProduct = (product) => ({
  type: SET_SELECTED_PRODUCT,
  payload: product,
});

export const setDeleteModalOpen = (isOpen) => ({
  type: SET_DELETE_MODAL_OPEN,
  payload: isOpen,
});

export const setModalOpen = (isOpen) => ({
  type: SET_MODAL_OPEN,
  payload: isOpen,
});

export const setIsNewProduct = (isNew) => ({
  type: SET_IS_NEW_PRODUCT,
  payload: isNew,
});
