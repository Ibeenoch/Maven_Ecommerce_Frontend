import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import * as api from "./ProductAPI";
import { act } from "@testing-library/react";

export interface ProductState {
  status: "success" | "loading" | "failed" | "idle";
  products: any;
  product: any;
  productReview: any;
  similarProduct: any;
  brands: any;
  brand: any;
  categories: any;
  category: any;
  message: any;
}

const initialState: ProductState = {
  status: "idle",
  products: [],
  product: [],
  productReview: [],
  similarProduct: [],
  brands: [],
  brand: [],
  categories: [],
  category: [],
  message: "",
};

export const updateproduct = createAsyncThunk(
  "product/update",
  async (products: any, thunkAPI) => {
    try {
      const res = await api.updateProduct(products);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const deleteproduct = createAsyncThunk(  "product/delete",  async (id: any, thunkAPI) => {
    try {
      const res = await api.deleteProduct(id);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const createproduct = createAsyncThunk(
  "product/create",
  async (product: any, thunkAPI) => {
    try {
      const res = await api.createProduct(product);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const getAllproduct = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    try {
      const res = await api.getProducts();
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const sortproductAsc = createAsyncThunk(
  "product/getsortProductAsc",
  async (_, thunkAPI) => {
    try {
      const res = await api.sortProductInAsc();
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const similarproduct = createAsyncThunk(
  "product/similarproduct",
  async (data: any, thunkAPI) => {
    try {
      const res = await api.getSimilarProduct(data);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const updatetheProductRating = createAsyncThunk(
  "product/updaterating",
  async (data: any, thunkAPI) => {
    try {
      const res = await api.updateproductReview(data);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const getAproduct = createAsyncThunk(
  "product/getProduct",
  async (id: any, thunkAPI) => {
    try {
      const res = await api.getProduct(id);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const sortproductDesc = createAsyncThunk(
  "product/getsortProductDesc",
  async (_, thunkAPI) => {
    try {
      const res = await api.sortProductInDesc();
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const sortproductNewest = createAsyncThunk(
  "product/getsortProductnewest",
  async (_, thunkAPI) => {
    try {
      const res = await api.sortProductInLatest();
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const getPagination = createAsyncThunk(
  "product/getPagination",
  async (data: any, thunkAPI) => {
    try {
      const res = await api.fetchPagination(data);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);
export const sortproductRated = createAsyncThunk(
  "product/getsortProductrated",
  async (_, thunkAPI) => {
    try {
      const res = await api.sortProductInRated();
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "product/getAllCategories",
  async (_, thunkAPI) => {
    try {
      const res = await api.getAllCategories();
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const getACategory = createAsyncThunk(
  "product/getACategory",
  async (name: string, thunkAPI) => {
    try {
      const res = await api.getACategory(name);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);
export const getProductSearchResult = createAsyncThunk(
  "product/search",
  async (name: string, thunkAPI) => {
    try {
      const res = await api.searchProducts(name);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const fetchAllBrands = createAsyncThunk(
  "product/getAllBrands",
  async (_, thunkAPI) => {
    try {
      const res = await api.getAllBrands();
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const getaProductReviews = createAsyncThunk(
  "product/getAllProductReviews",
  async (id: any, thunkAPI) => {
    try {
      const res = await api.getAProductReview(id);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const fetchABrand = createAsyncThunk(
  "product/getABrand",
  async (name: string, thunkAPI) => {
    try {
      const res = await api.getABrand(name);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const createAProductReview = createAsyncThunk(
  "product/reviewcreate",
  async (data: any, thunkAPI) => {
    try {
      const res = await api.addProductReview(data);
      return res?.data;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const productSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
 extraReducers(builder) {
    builder
      .addCase(createproduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createproduct.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.products.push(action.payload);
        }
        
      })
      .addCase(createproduct.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getAllproduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllproduct.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.products = action.payload;
        }
      })
      .addCase(getAllproduct.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getAproduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAproduct.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.product = action.payload;
        }
      })
      .addCase(getAproduct.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(updateproduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateproduct.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          const index = state.products.findIndex(
            (pro: any) => pro.id === action.payload.id
          );
          state.products[index] = action.payload;
        }    
      })
      .addCase(updateproduct.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(deleteproduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.products.filter(
          (pro: { id: any }) => pro.id !== action.payload.id
        );
        }
        
      })
      .addCase(deleteproduct.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(sortproductAsc.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sortproductAsc.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.products = action.payload;
        } 
      })
      .addCase(sortproductAsc.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(sortproductDesc.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sortproductDesc.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.products = action.payload;
        } 
      })
      .addCase(sortproductDesc.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(updatetheProductRating.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatetheProductRating.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.products = action.payload;
        } 
      })
      .addCase(updatetheProductRating.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(sortproductNewest.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sortproductNewest.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.products = action.payload;
        } 
      })
      .addCase(sortproductNewest.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(sortproductRated.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sortproductRated.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.products = action.payload;
        } 
      })
      .addCase(sortproductRated.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(fetchAllCategories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.categories = action.payload;
        } 
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(similarproduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(similarproduct.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          state.similarProduct = action.payload;
        }
      })
      .addCase(similarproduct.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getProductSearchResult.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProductSearchResult.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined || action.payload !== null) {
          state.products = action.payload;
        }
      })
      .addCase(getProductSearchResult.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getACategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getACategory.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.category = action.payload;
          state.products = action.payload.products;
        } 
      })
      .addCase(getACategory.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(fetchAllBrands.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.brands = action.payload;
        } 
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(fetchABrand.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchABrand.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.brand = action.payload;
          state.products = action.payload.products;
        } 
      })
      .addCase(fetchABrand.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getPagination.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPagination.fulfilled, (state, action) => {
        state.status = "success";
        if(action.payload !== undefined){
          state.products = action.payload;
        } 
      })
      .addCase(getPagination.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(createAProductReview.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createAProductReview.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          state.productReview = action.payload;
        }
      })
      .addCase(createAProductReview.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getaProductReviews.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getaProductReviews.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          state.productReview = action.payload;
        }
      })
      .addCase(getaProductReviews.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const {} = productSlice.actions;

export const selectProduct = (state: RootState) => state.product;

export default productSlice.reducer;
