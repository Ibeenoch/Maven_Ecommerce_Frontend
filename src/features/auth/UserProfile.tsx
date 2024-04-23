import {
  CalendarDaysIcon,
  CameraIcon,
  CheckBadgeIcon,
  ChevronDoubleRightIcon,
  EnvelopeIcon,
  HomeIcon,
  PhoneIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAUser, getotherUser, selectUser, uploadUserPhoto } from "./authSlice";
import { getAUserTransaction, selectCheckout } from "../checkout/checkoutSlice";
import { ChangeEvent, Fragment, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pics from "../../images/image.jpeg";
import { toast, ToastContainer, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import ShippingDetails from "./ShippingDetails";
import { format } from "date-fns";
import { GlobeAltIcon, UserGroupIcon } from "@heroicons/react/20/solid";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selected1, setSelected1] = useState(true);
  const [selected2, setSelected2] = useState(false);
  const [isUpLoading, setIsUploading] = useState(false);
  const [image, setImage] = useState<any>([]);
  const { id } = useParams();
  const hiddleFileInput = useRef<HTMLInputElement>(null);
  const clickFile = () => {
    hiddleFileInput?.current?.click();
  };
  const { aUserOrderedProducts } = useAppSelector(selectCheckout);
  const user = JSON.parse(localStorage.getItem("user") as any);
  const otheruser = JSON.parse(localStorage.getItem("otheruser") as any);
  const users = JSON.parse(localStorage.getItem("alluser") as any);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if(otheruser){
    console.log('other user available ', otheruser, 'the user ', user, users)
  }

if(aUserOrderedProducts){
  console.log('aUserOrderedProducts ', aUserOrderedProducts)
}

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  if (!Object.keys(user).length) {
    console.log("user profile not available");
    navigate("/login");
  } else {
    console.log("user profile is available", Object.keys(user), user);
  }

  useEffect(() => {
    if(users){
       const findtheUser = users.find((person: any) => person.id.toString() ===  id);
    if(id === user.id.toString()){
      const data = {
        id,
        token: user && user.token,
      };
  
      dispatch(getAUser(data)).then((res: any) => {
        if ((res && res.payload !== undefined) || res.payload !== null) {
          console.log("data ", data);
          dispatch(getAUserTransaction(data)).then((res: any) => {
            console.log("all user transactions ", res.payload);
          });
        }
      });
    }else{
      const data = {
        id,
        token: user && user.token,
      };
  
      dispatch(getotherUser(data)).then((res: any) => {
        if ((res && res.payload !== undefined) || res.payload !== null) {
          console.log("data ", data);
          dispatch(getAUserTransaction(data)).then((res: any) => {
            console.log("all user transactions ", res.payload);
          });
        }
      });
    }

    };
   
   
  }, []);

  const handlebtn1 = () => {
    setSelected1(true);
    setSelected2(false);
  };
  const handlebtn2 = () => {
    setSelected1(false);
    setSelected2(true);
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchCategories = (name: string) => {
    //options is an array of objects
    if (name === "Personal Information") {
      handlebtn2();
    } else if (name === "Purchase History") {
      handlebtn1();
    } else {
      console.log("");
    }
  };

  const getUsername = (id: any) => {
    const findName = users.find((person: any) => person.id.toString() === id )
    console.log('other name ', findName)
    let userName = findName.fullName;
    // console.log('other name ', userName)
    return userName;
  }
 

  const getUserImage = (id: any) => {
    const findImage = users.find((person: any) => person.id.toString() === id )
    let userPhoto = findImage && findImage.image && findImage.image.url ? findImage.image.url : pics;
    console.log('other image ', userPhoto)
    return userPhoto;
  }

 const getUserState = (id: any) => {
    const findstate = users.find((person: any) => person.id.toString() === id )
    let userstate = findstate.state;
    console.log('other state ', userstate)
    return userstate;
  }
// id in useParams return a string not a number

 const getUserCountry = (id: any) => {
    const findcountry = users.find((person: any) => person.id.toString() === id )
    let usercountry = findcountry.country;
    console.log('other state ', usercountry)
    return usercountry;
  }


  const filters = [
    {
      id: "profile",
      name: "Personal Information",
    },
    {
      id: "order",
      name: "Orders",
    },
  ];

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];
    setImage(img);
  };

  const submitBtn = () => {
    setIsUploading(true);
    toast.info("Uploading image please wait...",
    {
     position: "top-center",
     autoClose: 7000, //7 seconds
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: false,
     transition: Bounce,
   });
    if (image) {
      const imageForm = new FormData();
      imageForm.append("fileupload", image);
      const token = user && user.token;
      const data = {
        id,
        token,
        imageForm,
      };
      dispatch(uploadUserPhoto(data)).then((res: any) => {
        console.log('image... ', res.payload)
        if (res && res.payload && res.payload.image && res.payload.image.url) {
          const token = res.payload.token;
          const id = res.payload.id;
          const data = { token, id };
          console.log("uploading ", data);
          setIsUploading(false);
          
          toast.success("Profile photo uploaded Added!!!",
          {
           position: "top-center",
           autoClose: 6000, //6 seconds
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: false,
           transition: Bounce,
         });
         window.location.reload();
          
        }
      });
    }
  };

  return (
    <div className="mt-4">
      <div>
        <div className="">
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className="border-t border-gray-200">
                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-t border-gray-200 px-4 py-6"
                          >
                            {({ open }) => <></>}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only"></span>
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-3 gap-y-4 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="">
                        {({ open }) => <></>}
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
                  {!Object.keys(user).length ? (
                    <div className="lg:col-span-3 bg-white h-1/2 rounded-lg pt-10">
                      No Profile Info Available pls update profile
                    </div>
                  ) : (
                    <div className="lg:col-span-3 bg-white h-1/2 rounded-lg pt-10">
                      {/* this is product list Content */}
                      <div className="">
                        <div className="">
                          <h2 className="text-2xl font-bold text-center text-gray-900 tracking-tight text-gray-900 flex justify-center item-center">
                            <CheckBadgeIcon
                              width="30px"
                              height="30px"
                              color="brown"
                            />{" "}
                            { id === user.id.toString() ? user.fullName : getUsername(id)}
                          </h2>

                          <div className="">
                            {/* <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg"> */}
                            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                              <div className="border-b px-4 pb-6">
                                <div className="text-center my-4">
                                  <img
                                    className="h-45 w-45 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                                    src={
                                     user.id.toString() !== id ? getUserImage(id) :
                                     user.id.toString() === id && user.image && user.image.url ? user.image.url : pics
                                    }
                                    alt=''
                                  />
                               { id === user.id.toString() ? (
                               <div className="">
                                    <button
                                      onClick={clickFile}
                                      className="flex-1 inline-flex rounded-full bg-red-800 text-white w-250 dark:text-white antialiased font-bold hover:bg-red-700 dark:hover:bg-blue-900 px-4 py-2"
                                    >
                                      <CameraIcon width="16px" height="16px" />
                                      Add Photo
                                      <input
                                        id="fileupload"
                                        name="fileupload"
                                        type="file"
                                        ref={hiddleFileInput}
                                        multiple
                                        className="sr-only"
                                        onChange={handleFiles}
                                      />
                                    </button>
                                  </div>
                               ) : (
                                <>
                                </>
                               ) }  

                                { id === user.id.toString() ? (
                               <button
                                    style={{
                                      width: "150px",
                                      cursor: "pointer",
                                      background: "forestgreen",
                                      padding: "5px 10px",
                                      color: "white",
                                      borderRadius: "1rem",
                                      marginTop: "20px",
                                    }}
                                    onClick={submitBtn}
                                  >
                                  { isUpLoading ? 'Uploading...' : 'Submit'} 
                                    <ToastContainer />
                                  </button>
                               ) : (
                                <>
                                </>
                               ) }  
                                  
                                  
                                  <div className="py-2">
                                    <div></div>
                                    <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                      { user.id.toString() === id ? user.state : getUserState(id)},{" "}
                                      { user.id.toString() === id ? user.country : getUserCountry(id)}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 px-2">
                                  <button
                                    onClick={handlebtn1}
                                    className={
                                      selected1
                                        ? "flex-1 rounded-full bg-red-800 hover:bg-red-700 text-white hover:text-white font-semibold hover:bg-red-700 px-3 py-1"
                                        : "flex-1 rounded-full bg-white border border-red-800 hover:bg-red-700 hover:text-white dark:border-gray-700 font-semibold text-red-800 dark:text-white px-3 py-1"
                                    }
                                  >
                                    Order History
                                  </button>
                                  <button
                                    onClick={handlebtn2}
                                    className={
                                      selected2
                                        ? "flex-1 rounded-full bg-red-800 hover:bg-red-700 text-white font-semibold hover:bg-red-700 px-3 py-1"
                                        : "flex-1 rounded-full bg-white border border-red-800 hover:bg-red-700 dark:border-gray-700 font-semibold text-red-800 hover:text-white px-3 py-1"
                                    }
                                  >
                                    Your Profile
                                  </button>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {selected1 ? (
                                  <>
                                    {!aUserOrderedProducts.length ? (
                                      <>
                                        <div className="flex items-center p-4 my-1">
                                          <div className="ml-6 truncate p-2 text-sm font-poppins text-center">
                                            No transaction history
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      aUserOrderedProducts.map((item: any) => (
                                        <>
                                          <h3 className="flex text-sm py-2 text-semibold justify-center">
                                            <strong>
                                              Product Ordered Details
                                            </strong>{" "}
                                          </h3>
                                          <div className="flex items-center my-1">
                                            <div className="ml-6 text-semibold whitespace-normal break-words font-poppins text-center">
                                              {" "}
                                              <strong>
                                                Product Name:
                                              </strong>{" "}
                                              {item.title}
                                            </div>
                                          </div>

                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                              {" "}
                                              <strong>Price Per Item:</strong> $
                                              {item.price}
                                            </div>
                                          </div>

                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                              {" "}
                                              <strong>
                                                Quantity Purchased:
                                              </strong>{" "}
                                              {item.quantity}
                                            </div>
                                          </div>

                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                              {" "}
                                              <strong>
                                                Product Brand:
                                              </strong>{" "}
                                              {item.brand.name}
                                            </div>
                                          </div>

                                          <div className="flex items-center my-1">
                                            <div className="ml-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                              {" "}
                                              <strong>
                                                Product Category:
                                              </strong>{" "}
                                              {item.category.name}
                                            </div>
                                          </div>
                                          <ShippingDetails />
                                        </>
                                      ))
                                    )}
                                  </>
                                ) : (
                                  <div className="profile info">
                                    <h3 className="flex text-sm whitespace-normal break-words py-2 text-semibold justify-center">
                                      <strong>Personal Details</strong>{" "}
                                    </h3>

                                    <div className="flex items-center my-1">
                                      <div className="flex ml-6 gap-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                        <strong className="flex  align-center">
                                          <UserIcon
                                            width={25}
                                            height={25}
                                            color="brown"
                                            fill="brown"
                                          />{" "}
                                        </strong>{" "}
                                        {id === user.id.toString() ? user.fullName : otheruser.fullName}
                                      </div>
                                    </div>

                                    <div className="flex items-center my-1">
                                      <div className="flex ml-6 gap-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                        <strong className="flex  align-center">
                                          <PhoneIcon
                                            width={25}
                                            height={25}
                                            color="brown"
                                            fill="brown"
                                          />{" "}
                                        </strong>
                                        {id === user.id.toString() ?  user.phone : otheruser.phone }
                                      </div>
                                    </div>

                                    <div className="flex items-center my-1">
                                      <div className="flex ml-6 gap-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                        <strong className="flex  align-center">
                                          <HomeIcon
                                            width={25}
                                            height={25}
                                            color="brown"
                                            fill="brown"
                                          />{" "}
                                        </strong>{" "}
                                        {id === user.id.toString() ? user.address : otheruser.address}
                                      </div>
                                    </div>

                                    <div className="flex items-center my-1">
                                      <div className="flex ml-6 gap-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                        <strong className="flex  align-center">
                                          <EnvelopeIcon
                                            width={25}
                                            height={25}
                                            color="white"
                                            fill="brown"
                                          />{" "}
                                        </strong>{" "}
                                        {id === user.id.toString() ? user.email : otheruser.email}
                                      </div>
                                    </div>

                                    <div className="flex items-center my-1">
                                      <div className="flex ml-6 gap-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                        <strong className="flex  align-center">
                                          <GlobeAltIcon
                                            width={25}
                                            height={25}
                                            color="brown"
                                            fill="brown"
                                          />{" "}
                                        </strong>{" "}
                                        {id === user.id.toString() ? user.city : otheruser.city}, {id === user.id.toString() ? user.state : otheruser.state},{" "}
                                        {id === user.id.toString() ? user.country : otheruser.country}.
                                      </div>
                                    </div>

                                    <div className="flex items-center my-1">
                                      <div className="flex ml-6 gap-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                        <strong className="flex  align-center">
                                          <ChevronDoubleRightIcon
                                            width={25}
                                            height={25}
                                            color="brown"
                                            fill="brown"
                                          />{" "}
                                        </strong>{" "}
                                        {id === user.id.toString() ? user.zipcode : otheruser.zipcode}
                                      </div>
                                    </div>

                                    <div className="flex items-center my-1">
                                      <div className="flex ml-6 gap-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                        <strong className="flex  align-center">
                                          <UserGroupIcon
                                            width={25}
                                            height={25}
                                            color="brown"
                                            fill="brown"
                                          />{" "}
                                        </strong>{" "}
                                        {id === user.id.toString() ? user.role : otheruser.role}
                                      </div>
                                    </div>

                                    <div className="flex items-center my-1">
                                      <div className="flex ml-6 gap-6 truncate text-sm whitespace-normal break-words font-poppins text-center">
                                        <strong className="flex  align-center">
                                          <CalendarDaysIcon
                                            width={25}
                                            height={25}
                                            color="white"
                                            fill="brown"
                                          />{" "}
                                        </strong>{" "}
                                        Joined{" "}
                                        { id === user.id.toString() ? format(user.createdAt, "yyyy/ dd/ MM") : format(otheruser.createdAt, "yyyy/ dd/ MM") }
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* end of product grid */}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
