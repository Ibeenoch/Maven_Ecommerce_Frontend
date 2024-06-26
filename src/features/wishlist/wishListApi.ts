
export const fetchAllUsersWishList = async () => {
  try {
    const response = await JSON.parse(localStorage.getItem("wishlist") as any);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addToWishList = async (data: any, toast: any) => {
  try {
    const checkItem = await JSON.parse(localStorage.getItem("wishlist") as any);
    if (checkItem === null || checkItem.length < 1) {
      let checkItem = [];
      checkItem.push(data);
      localStorage.setItem("wishlist", JSON.stringify(checkItem));
      toast.success("product successfully added to wishlist",
      {
       position: "top-center",
       duration: 1500,
     });

    } else {
      const index = checkItem.find((item: any) => item.id === data.id);
      if (!index) {
        checkItem.push(data);
        localStorage.setItem("wishlist", JSON.stringify(checkItem));
        toast.success("product successfully added to wishlist",
        {
         position: "top-center",
         duration: 1500, 
       });
       
      } else {
        toast.error("The product already exist in the wishlist",
        {
         position: "top-center",
         duration: 1500, 
       });

        return;
      }
    }
    const response = await JSON.parse(localStorage.getItem("wishlist") as any);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateWishListQty = async (id: any, data: any) => {
  try {
    const checkItem = JSON.parse(localStorage.getItem("wishlist") as any);
    const getIndex = checkItem.find((item: any) => item.id === id);
    checkItem[getIndex].quantity = data;
    const response = JSON.parse(localStorage.getItem("wishlist") as any);
    return response;
  } catch (error) {
    console.log(error);
  }
};
