import {
  SET_PRODUCTS,
  SET_SELECTED_PRODUCT,
  SET_DELETE_MODAL_OPEN,
  SET_MODAL_OPEN,
  SET_IS_NEW_PRODUCT,
} from "./actionTypes";

const initialState = {
  products: [],
  selectedProduct: null,
  deleteModalOpen: false,
  modalOpen: false,
  isNewProduct: true,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    case SET_DELETE_MODAL_OPEN:
      return { ...state, deleteModalOpen: action.payload };
    case SET_MODAL_OPEN:
      return { ...state, modalOpen: action.payload };
    case SET_IS_NEW_PRODUCT:
      return { ...state, isNewProduct: action.payload };

    default:
      return state;
  }
};
