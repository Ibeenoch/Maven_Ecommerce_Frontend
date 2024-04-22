import axios from "axios";

const API = "https://ecommerce-backend-chji.onrender.com";

export const addAddress = async (data: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(API + "/checkout/info", data);
    console.log("ressffdgf ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sendTransaction = async (data: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(API + "/checkout/transaction", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAUserTransactions = async (data: any) => {
  try {
    const token = data.token;
    const id = data.id;
    console.log(" sending ", data);
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(API + `/transactions/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getATransactionforAUser = async (data: any) => {
  try {
    const token = data.token;
    const userId = data.userId;
    const id = data.id;
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(API + `/transaction/${userId}/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTransactions = async (token: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(API + `/transactions`, option);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaction = async (data: any) => {
  try {
    const token = data.token;
    const id = data.id;
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.delete(API + `/transaction/${id}`, option);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchpaymentPagination = async (data: any) => {
  try {
    const token = data.token;
    const item = data.item;

    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(API + `/payment/paginate`, item, option);
    return res;
  } catch (error) {
    console.log(error);
  }
};
