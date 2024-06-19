import { StarIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getAproduct,
  getaProductReviews,
  selectProduct,
  updatetheProductRating,
} from "../ProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import  toast, { Toaster } from "react-hot-toast"

const ProductReview = () => {
  const { product, productReview } = useAppSelector(selectProduct);
  const user = JSON.parse(localStorage.getItem("user") as any);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalRating = 0;
  const { id } = useParams();

  useEffect(() => {
    if(id){
      dispatch(getaProductReviews(id)).then((res: any) => {
        if(res && res.payload === undefined){
          toast.error("Poor Network Connection please try again later",
          {
            duration: 1500, //6 seconds
          });
        }
      })
    }
  }, [])

  const totalOneRatingArr = (arr: any) => {
    const totalOneRating = arr
      .filter((num: any) => num.rating === 1)
      .reduce((acc: any, obj: any) => acc + obj.rating, 0);
    return totalOneRating;
  };

  const totalOnestar = productReview ? totalOneRatingArr(productReview) : 0;

  const totalTwoRatingArr = (arr: any) => {
    const totalTwoRating = arr
      .filter((num: any) => num.rating === 2)
      .reduce((acc: any, obj: any) => acc + obj.rating, 0);
    return totalTwoRating;
  };

  const totalTwostar = productReview ? totalTwoRatingArr(productReview) : 0;

  const totalThreeRatingArr = (arr: any) => {
    const totalThreeRating = arr
      .filter((num: any) => num.rating === 3)
      .reduce((acc: any, obj: any) => acc + obj.rating, 0);
    return totalThreeRating;
  };

  const totalThreestar = productReview ? totalThreeRatingArr(productReview) : 0;

  const totalFourRatingArr = (arr: any) => {
    const totalFourRating = arr
      .filter((num: any) => num.rating === 4)
      .reduce((acc: any, obj: any) => acc + obj.rating, 0);
    return totalFourRating;
  };

  const totalFourstar = productReview ? totalFourRatingArr(productReview) : 0;

  const totalFiveRatingArr = (arr: any) => {
    const totalFiveRating = arr
      .filter((num: any) => num.rating === 5)
      .reduce((acc: any, obj: any) => acc + obj.rating, 0);
    return totalFiveRating;
  };

  const totalFivestar = productReview ? totalFiveRatingArr(productReview) : 0;

  const handleReviewForm = (id: any) => {
    console.log( 'review id ', id)
    dispatch(getAproduct(id)).then((res: any) => {
      console.log( 'review page ', res)
      if (res && res.payload && res.payload.id) {
        navigate(`/product/review/form/${id}`);
      }else{
        toast.error("Poor Network Connection please try again later",
        {
          duration: 1500, //6 seconds
       });
      }
    });
  };

  const totalRatingGiven =
    totalOnestar +
    totalTwostar +
    totalThreestar +
    totalFourstar +
    totalFivestar;
  const calculateRating = totalRatingGiven === 0 && productReview.length === 0 ? 0 : ( totalRatingGiven / productReview.length).toFixed(1);
    
  const theProductRating = calculateRating;

  const handleProfile = (id: any) => {
    navigate(`/checkout/${user.id}`)
  }
  const fifthBar = Math.round((totalFivestar / totalRatingGiven) * 10) * 10;
  const fourthBar = Math.round((totalFourstar / totalRatingGiven) * 10) * 10;
  const thirdBar = Math.round((totalThreestar / totalRatingGiven) * 10) * 10;
  const secondBar = Math.round((totalTwostar / totalRatingGiven) * 10) * 10;
  const firstBar = Math.round((totalOnestar / totalRatingGiven) * 10) * 10;
  console.log(
    "edae: ",
    fifthBar,
    fourthBar,
    thirdBar,
    secondBar,
    firstBar,
    totalRatingGiven,
    Math.round(0.7)
  );

  useEffect(() => {
    if(theProductRating !== 0){
      console.log('review can be updated now as ', theProductRating)
      const data = {
        id,
        updatedRating: theProductRating,
      };
  
      dispatch(updatetheProductRating(data)).then((res: any) => {
        if (res && res.payload !== undefined) {
          console.log("update rating ", res.payload);
          const productId = product && product.id;
          dispatch(getaProductReviews(productId)).then((res: any) => {
            console.log("get rating ", res.payload);
          });
        }
      });
  
    }
    
  }, [])

  const handleLogin = () => {
    navigate("/login");
  };


  return (
    <>
      {!productReview ? (
        <>
          <div>
            <h2 className="ml-6 text-bold text-xl whitespace-normal break-words font-poppins text-center">
              No Customer Reviews 
            </h2>
          </div>
        </>
      ) : (
        <>
          <section className="py-24 relative mt-10">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
              <div className="">
                <h2 className="ml-6 text-bold whitespace-normal text-xl break-words font-poppins text-center">
                Customer Reviews
                </h2>
                <div className="grid grid-cols-12 mb-11">
                  <div className="col-span-12 xl:col-span-4 flex items-center">
                    <div className="box flex flex-col gap-y-4 w-full max-xl:max-w-3xl mx-auto">
                      <div className="flex items-center w-full">
                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                          5
                        </p>
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_12042_8589)">
                            <path
                              d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                              fill="#FBBF24"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12042_8589">
                              <rect width={20} height={20} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>

                        <p className="h-2 w-full sm:min-w-[278px] rounded-[30px]  bg-gray-200 ml-5 mr-3">
                          <span
                            style={{ width: fifthBar > 0 ? `${fifthBar}%` : '0%' }}
                            className={`h-full bg-red-500 rounded-[30px] flex`}
                          />
                        </p>
                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                          {totalFivestar && totalFivestar}
                        </p>
                      </div>
                      <div className="flex items-center w-full">
                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                          4
                        </p>
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_12042_8589)">
                            <path
                              d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                              fill="#FBBF24"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12042_8589">
                              <rect width={20} height={20} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="h-2 w-full sm:min-w-[278px] rounded-[30px]  bg-gray-200 ml-5 mr-3">
                          <span
                           style={{ width: fourthBar > 0 ? `${fourthBar}%` : '0%' }}
                            className={`h-full bg-red-500 rounded-[30px] flex`}
                          />
                        </p>
                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                          {totalFourstar && totalFourstar}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                          3
                        </p>
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_12042_8589)">
                            <path
                              d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                              fill="#FBBF24"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12042_8589">
                              <rect width={20} height={20} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="h-2 w-full sm:min-w-[278px] rounded-[30px]  bg-gray-200 ml-5 mr-3">
                          <span
                            style={{ width: thirdBar > 0 ? `${thirdBar}%` : '0%' }}
                            className={`h-full bg-red-500 rounded-[30px] flex`}
                          />
                        </p>
                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                          {totalThreestar && totalThreestar}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                          2
                        </p>
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_12042_8589)">
                            <path
                              d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                              fill="#FBBF24"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12042_8589">
                              <rect width={20} height={20} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="h-2 w-full sm:min-w-[278px] rounded-[30px]  bg-gray-200 ml-5 mr-3">
                          <span
                            style={{ width: secondBar > 0 ? `${secondBar}%` : '0%' }}
                            className={`h-full bg-red-500 rounded-[30px] flex`}
                          />
                        </p>
                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                          {totalTwostar}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                          1
                        </p>
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_12042_8589)">
                            <path
                              d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                              fill="#FBBF24"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12042_8589">
                              <rect width={20} height={20} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="h-2 w-full sm:min-w-[278px] rounded-[30px]  bg-gray-200 ml-5 mr-3">
                          <span
                            style={{ width: firstBar > 0 ? `${firstBar}%` : '0%' }}
                            className={`h-full bg-red-500 rounded-[30px] flex`}
                          />
                        </p>
                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">
                          {totalOnestar && totalOneRatingArr}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 max-xl:mt-8 xl:col-span-8 xl:pl-8 w-full min-h-[230px]">
                    <div className="grid grid-cols-12 h-full px-8 max-lg:py-8 rounded-3xl bg-gray-100 w-full max-xl:max-w-3xl max-xl:mx-auto">
                      <div className="col-span-12 md:col-span-8 flex items-center">
                        <div className="flex flex-col sm:flex-row items-center max-lg:justify-center w-full h-full">
                          <div className="sm:pr-3 sm:border-r border-gray-200 flex items-center justify-center flex-col">
                            <h2 className="font-manrope font-bold text-xl text-black text-center mb-2">
                              {theProductRating} Rating
                            </h2>
                            <div className="flex items-center gap-3 mb-4">
                              <StarIcon
                                width={28}
                                height={28}
                                color={
                                  parseInt(
                                    theProductRating ? theProductRating : "0"
                                  ) >= 1
                                    ? "orange"
                                    : "gray"
                                }
                                fill={
                                  parseInt(
                                    theProductRating ? theProductRating : "0"
                                  ) >= 1
                                    ? "orange"
                                    : "gray"
                                }
                              />
                              <StarIcon
                                width={28}
                                height={28}
                                color={
                                  parseInt(
                                    theProductRating ? theProductRating : "0"
                                  ) >= 2
                                    ? "orange"
                                    : "gray"
                                }
                                fill={
                                  parseInt(
                                    theProductRating ? theProductRating : "0"
                                  ) >= 2
                                    ? "orange"
                                    : "gray"
                                }
                              />
                              <StarIcon
                                width={28}
                                height={28}
                                color={
                                  parseInt(
                                    theProductRating ? theProductRating : "0"
                                  ) >= 3
                                    ? "orange"
                                    : "gray"
                                }
                                fill={
                                  parseInt(
                                    theProductRating ? theProductRating : "0"
                                  ) >= 3
                                    ? "orange"
                                    : "gray"
                                }
                              />
                              <StarIcon
                                width={28}
                                height={28}
                                color={
                                  parseInt(
                                    theProductRating ? theProductRating : "0"
                                  ) >= 4
                                    ? "orange"
                                    : "gray"
                                }
                                fill={
                                  parseInt(
                                    theProductRating ? theProductRating : "0"
                                  ) >= 4
                                    ? "orange"
                                    : "gray"
                                }
                              />
                              <StarIcon
                                width={28}
                                height={28}
                                color={
                                  parseInt(
                                    theProductRating ? theProductRating : "0"
                                  ) >= 5
                                    ? "orange"
                                    : "gray"
                                }
                                fill={
                                  parseInt(
                                    theProductRating ? theProductRating : "0"
                                  ) >= 5
                                    ? "orange"
                                    : "gray"
                                }
                              />
                            </div>
                            <p className="font-normal text-lg leading-8 text-gray-400">
                              {productReview ? productReview.length : 0} Reviews
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-4 max-lg:mt-4 md:pl-8">
                        <div className="flex items-center flex-col justify-center w-full h-full ">
                          {user && user.address === null ? (
                            <button
                            onClick={() => handleProfile(product.id)}
                            className="rounded-full px-4 py-2 bg-red-800 font-semibold text-lg text-white whitespace-nowrap mb-6 w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-700 hover:shadow-red-400"
                          >
                            Write A Review
                          </button>
                          ) 
                          :  user && user.address ? (
                            <button
                              onClick={() => handleReviewForm(product.id)}
                              className="rounded-full px-4 py-2 bg-red-800 font-semibold text-lg text-white whitespace-nowrap mb-6 w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-700 hover:shadow-red-400"
                            >
                              Write A Review
                            </button>
                          ) : (
                            <button
                              onClick={handleLogin}
                              className="rounded-full px-4 py-2 bg-red-800 font-semibold text-lg text-white whitespace-nowrap mb-6 w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-700 hover:shadow-red-400"
                            >
                              Write A Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {!productReview.length ? (
                  <div className="p-6 text-base dark:bg-gray-900">
                    <p>No product review </p>
                  </div>
                ) : (
                  productReview.map((review: any) => (
                    <>
                     
<div class="flex flex-col space-y-4 p-2">
<div class="bg-white p-4 rounded-lg shadow-md">
  <div className="flex justify-between">
    <h3 class="text-xs font-bold"> {review && review.user && review.user.fullName}</h3>
    <div className="flex text-sm text-gray-600 dark:text-gray-400">
      <div>
        <StarIcon
          width={12}
          height={12}
          color={
            review && review.rating >= 1
              ? "orange"
              : "gray"
          }
          fill={
            review && review.rating >= 1
              ? "orange"
              : "gray"
          }
        />
      </div>
      <div>
        <StarIcon
          width={12}
          height={12}
          color={
            review && review.rating >= 2
              ? "orange"
              : "gray"
          }
          fill={
            review && review.rating >= 2
              ? "orange"
              : "gray"
          }
        />
      </div>
      <div>
        <StarIcon
          width={12}
          height={12}
          color={
            review && review.rating >= 3
              ? "orange"
              : "gray"
          }
          fill={
            review && review.rating >= 3
              ? "orange"
              : "gray"
          }
        />
      </div>
      <div>
        <StarIcon
          width={12}
          height={12}
          color={
            review && review.rating >= 4
              ? "orange"
              : "gray"
          }
          fill={
            review && review.rating >= 4
              ? "orange"
              : "gray"
          }
        />
      </div>
      <div>
        <StarIcon
          width={12}
          height={12}
          color={
            review && review.rating >= 5
              ? "orange"
              : "gray"
          }
          fill={
            review && review.rating >= 5
              ? "orange"
              : "gray"
          }
        />
      </div>
    </div>
    </div>
    <p class="text-gray-700 text-sm mb-2">Posted on  {format(
          review && review.createdAt,
          "MMM. d, yyyy"
        )}
        </p>
    <p class="text-gray-700"> {review && review.remark} </p>
</div>
</div>
                    </>
                  ))
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductReview;
