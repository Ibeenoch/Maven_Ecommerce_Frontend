import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  createproduct,
  getAllproduct,
  getAproduct,
  selectProduct,
  updateproduct,
} from "../ProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import { selectUser } from "../../auth/authSlice";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { product, status } = useAppSelector(selectProduct);
  const { user } = useAppSelector(selectUser);
  const { id } = useParams();
  const [isPosting, setIsPosting] = useState<boolean>(false);

  type FormValues = {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    stock: number;
    brand: string;
    category: string;
    keywords: string;
    thumbnail: any;
    images: any;
  };

  const [images, setImages] = useState<File[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [errorform, setErrorform] = useState<string>("");

  const [productForm, setProductForm] = useState<FormValues>({
    title: id ? product.title : "",
    description: id ? product.description : "",
    price: id ? parseInt(product.price) : 0,
    discountPercentage: id ? parseInt(product.discountPercentage) : 0,
    stock: id ? parseInt(product.stock) : 0,
    brand: "",
    category: "",
    keywords: id ? product.keywords : "",
    thumbnail: null,
    images: null,
  });

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const img = Array.from(e.target.files);
      setImages(img);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const {
    title,
    description,
    price,
    discountPercentage,
    stock,
    brand,
    category,
    keywords,
  } = productForm;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsPosting(true);
    if (id) {
      const token = user && user && user.token;

      if (images) {
        if (images.length < 4) {
          setIsPosting(false);
          toast.error("To Update the Product images, Please Ensure to Add a Minimum of 4 photos of the Product!!!",
           {
            position: "top-center",
            autoClose: 1500, //6 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            transition: Bounce,
          });
          
          return;
        } else {
          const product = new FormData();
          product.append("title", title);
          product.append("description", description);
          product.append("price", price.toString());
          product.append("discountPercentage", discountPercentage.toString());
          product.append("stock", stock.toString());
          product.append("brand", brand);
          product.append("category", category);
          product.append("keywords", keywords);

          images.map((image) => {
            product.append("fileupload", image);
          });

          const products = {
            id,
            product,
            token,
            images,
          };

          dispatch(updateproduct(products)).then((res: any) => {
            if (res && res.payload && res.payload.id) {
              dispatch(getAllproduct()).then(() => {
                setIsPosting(false);
                navigate("/");
              });
            }
          });
        }
      } else {
        const product = {
          title,
          description,
          price,
          discountPercentage,
          stock,
          keywords,
        };
        const products = {
          id,
          product,
          token,
        };

        dispatch(updateproduct(products)).then(() => {
          dispatch(getAllproduct()).then(() => {
            setIsPosting(false);
            navigate("/");
          });
        });
      }
    } else {
      if (
        !title ||
        !description ||
        !price ||
        !discountPercentage ||
        !stock ||
        !brand ||
        !category ||
        !keywords
      ) {
        setIsPosting(false);
        toast.error("Please Ensure to add all fields",
        {
         position: "top-center",
         autoClose: 1500, //6 seconds
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: false,
         transition: Bounce,
       });
       
        return;
      } else if (images.length < 4) {
        setIsPosting(false);
        toast.error("Please Ensure to Add a Minimum of 4 photos of the Product!!!",
        {
         position: "top-center",
         autoClose: 1500, //6 seconds
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: false,
         transition: Bounce,
       });
        return;
      } else {
        const product = new FormData();
        product.append("title", title);
        product.append("description", description);
        product.append("price", price.toString());
        product.append("discountPercentage", discountPercentage.toString());
        product.append("stock", stock.toString());
        product.append("brand", brand);
        product.append("category", category);
        product.append("keywords", keywords);

        images.map((image) => {
          product.append("fileupload", image);
        });

        const token = user && user && user.token;

        const products = {
          product,
          token,
        };

        dispatch(createproduct(products)).then((res) => {
          if (
            res.payload &&
            res.payload.response &&
            res.payload.response.data &&
            res.payload.response.data.error
          ) {
            setIsPosting(false);
            toast.error("Something went wrong",
            {
             position: "top-center",
             autoClose: 1500, //6 seconds
             hideProgressBar: true,
             closeOnClick: true,
             pauseOnHover: false,
             draggable: false,
             transition: Bounce,
           });

            return;
          } else {
            setIsPosting(false);
            toast.success("Product Successfully Added!!!",
            {
             position: "top-center",
             autoClose: 1500, //6 seconds
             hideProgressBar: true,
             closeOnClick: true,
             pauseOnHover: false,
             draggable: false,
             transition: Bounce,
           });
            dispatch(getAllproduct()).then(() => {
              navigate("/");
            });
          }
        });
      }
    }
  };

  const hexcode = "#DEB887";

  return (
    <div style={{ background: hexcode }}>
      <div
        style={{ background: hexcode }}
        className="mx-auto z-12 max-w-7xl px-4 sm:px-6 mt-6 lg:px-8"
      >
        <form style={{ background: hexcode }} onSubmit={handleSubmit}>
          <div
            className="space-y-12"
            style={{
              padding: "16px",
              borderRadius: "0.5rem",
            }}
          >
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
                {id ? "Update Product" : "Add Product"}
              </h2>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={productForm?.title}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ($) Price
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={productForm?.price}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="discountPercentage"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Discount Percentage %
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="discountPercentage"
                        id="discountPercentage"
                        value={productForm?.discountPercentage}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Stock Available
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="stock"
                        id="stock"
                        value={productForm?.stock}
                        onChange={handleChange}
                        className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="keywords"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Keywords (Separate by commas)
                    </label>
                    <div className="mt-2">
                      <input
                        type="string"
                        name="keywords"
                        id="keywords"
                        value={productForm?.keywords}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                {id ? (
                  <></>
                ) : (
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="category"
                          id="category"
                          value={productForm?.category}
                          onChange={handleChange}
                          className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="brand"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Brand
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="brand"
                          id="brand"
                          value={productForm?.brand}
                          onChange={handleChange}
                          className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      value={productForm?.description}
                      onChange={handleChange}
                      rows={3}
                      className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about the Product.
                  </p>
                </div>

                <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full bg-white">
                    <label
                      htmlFor="cover-image"
                      className="block text-sm font-medium px-2 leading-6 text-gray-900"
                    >
                      {id ? "Update Product Photos" : "Add Product Photos"}
                    </label>
                    <div className="mt-2 flex justify-center px-2 rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex flex-col md:flex-row text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="fileupload"
                            className="relative bg-none cursor-pointer rounded-md bg-white font-semibold text-gray-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-700"
                          >
                            <span>Upload a file</span>
                            <input
                              id="fileupload"
                              name="fileupload"
                              type="file"
                              multiple
                              className="sr-only"
                              onChange={handleFiles}
                            />
                          </label>
                          <p className="pl-1">
                            or drag and drop a Minimum of 4 photos
                          </p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-red-900">{errorMsg}</div>
                <div className="text-red-900">{errorform}</div>
              </div>
            </div>
          </div>

          <div className="mt-0 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold px-5 leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-red-800 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {id && isPosting ? "Loading..." :
              id && !isPosting ? "Update" : 
              !id && isPosting ? "Loading..." : 
              "Create"}
              <ToastContainer />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
