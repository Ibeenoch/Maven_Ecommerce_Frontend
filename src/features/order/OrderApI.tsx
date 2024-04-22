import axios from "axios";
const API = "https://ecommerce-backend-chji.onrender.com";

export const fetchAllOrder = async (token: any) => {
  try {
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
console.log('send token ', token)
    const res = await axios.get(API + `/orders`, option);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateAnOrder = async (data: any) => {
  try {
    const token = data.token;
    const id = data.id;
    const status = data.status;
    const message = {
      status: status,
    };
    const option = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    console.log('update data ', data)

    const res = await axios.put(API + `/order/${id}`, message, option);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnOrder = async (data: any) => {
  try {
    const token = data.token;
    const id = data.id;
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.delete(API + `/order/${id}`, option);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrderPagination = async (item: any) => {
  try {
    const token = item.token;
    const data = item.data;
    console.log("data", data);
    const option = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    const res = await axios.post(API + `/order/paginate`, data, option);
    console.log("order pag ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
