import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useAppSelector } from "../../../app/hooks";
import { getPagination, selectProduct } from "../ProductSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster  } from "react-hot-toast"
interface ChildComponentProp {
  totalCount: number;
  setLoadProduct: React.Dispatch<boolean>;
  loadProduct: boolean;
}

const Pagination: React.FC<ChildComponentProp> = ({ totalCount, loadProduct, setLoadProduct }) => {
  const dispatch = useDispatch();
  const iTemLimitPerPage = 15;
  const [page, setPage] = useState(1);

  const { products } = useAppSelector(selectProduct);

  const totalItem = totalCount;
  const handlePages = (num: number) => {
    setPage(num);
    const limit = iTemLimitPerPage;
    const currentPage = num;
    const data = { limit, currentPage };
    dispatch(getPagination(data) as any).then((res: any) => {
      if(res && res.payload !== undefined){
       window.scrollTo(0, 0) ;
      }else{
        toast.error("Poor Network Connection please try again later",
       {
        duration: 1500, 
      });
      }
      
    });
  };

  const handlePrevious = (num: number) => {
    if(num < 1){
      return;
    }else{
    setPage(num);
    const limit = iTemLimitPerPage;
    const currentPage = num;
    const data = { limit, currentPage };
    dispatch(getPagination(data) as any).then((res: any) => {
      if(res && res.payload !== undefined){
       window.scrollTo(0, 0) ;
      }else{
        toast.error("Poor Network Connection please try again later",
       {
         duration: 1500, //6 seconds
      });
      }
      
    });

    }
  };

  const handleNext = (num: number) => {
    if(num > paginatePage){
      return;
    }else{
      setPage(num);
      const limit = iTemLimitPerPage;
      const currentPage = num;
      const data = { limit, currentPage };
      dispatch(getPagination(data) as any).then((res: any) => {
        if(res && res.payload !== undefined){
         window.scrollTo(0, 0) ;
        }else{
          toast.error("Poor Network Connection please try again later",
            {
              duration: 1500, //6 seconds
            });
        }
        
      });
    }
  
  };
  const paginatePage = Math.ceil(totalItem / iTemLimitPerPage)
  console.log('pagin ', paginatePage, page)
  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-1 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() => handlePrevious(paginatePage <= 1 ? 1 : paginatePage - 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={() =>
            handleNext( page > paginatePage ? paginatePage : page + 1)
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * iTemLimitPerPage + 1}
            </span>{" "}
            to <span className="font-medium">{page * iTemLimitPerPage}</span> of{" "}
            <span className="font-medium">{totalItem}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={() => handlePrevious(paginatePage <= 1 ? 1 : paginatePage - 1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 bg-white ring-1 ring-inset ring-gray-300 hover:bg-red-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {Array.from({
              length: Math.ceil(totalItem / iTemLimitPerPage),
            }).map((el: any, index: number) => (
              <div
                onClick={(e) => handlePages(index + 1)}
                aria-current="page"
                className={
                  index + 1 === page
                    ? "z-10 bg-red-800 cursor-pointer px-2 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "text-gray-900 cursor-pointer px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-red-700 focus:outline-offset-0"
                }
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={() =>
                handleNext( page > paginatePage ? paginatePage : page + 1)
              }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 bg-white text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
