import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import companylogo from "../../images/images-9.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import  toast, { Toaster } from "react-hot-toast"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { passwordChange, selectUser } from "./authSlice";


interface Login {
  newpassword1: string;
  newpassword2: string;
}

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState<Login>({
    newpassword1: "",
    newpassword2: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ischecked, setIsChecked] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [isShowPassword3, setIsShowPassword3] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const { id } = useParams();
  const { status, user } = useAppSelector(selectUser);

  const handleSwitchElem = (checked: boolean) => {
    setIsChecked(checked);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { newpassword1, newpassword2 } = formData;
  const passwordRegex = /^(?=.*[a-zA-Z0-9]).{8,}$/;
  const handlePasswordRecovery = (e: FormEvent) => {
    e.preventDefault();
    if (passwordRegex.test(newpassword1)) {
      const changePassword = { formData, id };

      dispatch(passwordChange(changePassword)).then((res: any) => {
        if (res && res.payload && res.payload.id) {
          toast.success( "Password Changed Successfully, Please Login with the new password to continue",
          {
           position: "top-center",
           duration: 1500,
         });
          navigate("/login");
        }
      });
    } else {
      toast.error( "the password must be at least 8 character, the password should contain a upper case letter, the password should contain a lower case letter, the password should contain a number, the password should contain a special character e.g Password1!",
      {
       position: "top-center",
       duration: 1500,
     });
    }
  };

  const changeVisibilty2 = () => {
    setIsShowPassword2(!isShowPassword2);
  };
  const changeVisibilty3 = () => {
    setIsShowPassword3(!isShowPassword3);
  };

  const changeConfirmVisibilty = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const hexcode = "#DEB887";

  return (
    <div
      style={{ background: hexcode, height: "100vh" }}
      className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-20 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/product">
          <div
            style={{
              width: "40px",
              height: "40px",
              marginLeft: "40%",
              borderRadius: "50%",
              background: "red",
              overflow: "hidden",
            }}
          >
            <img
              className="mx-auto h-10 w-auto"
              src={companylogo}
              alt="Your Company"
            />
          </div>
        </Link>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Password Recovery
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handlePasswordRecovery}>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label
                htmlFor="newpassword1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="newpassword1"
                name="newpassword1"
                type={isShowPassword2 ? "text" : "password"}
                value={formData.newpassword1}
                onChange={handleChange}
                required
                placeholder="New Password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div
                onClick={changeVisibilty2}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-30"
              >
                {isShowPassword2 ? (
                  <EyeIcon color="brown" className="w-4 h-4 z-30" />
                ) : (
                  <EyeSlashIcon color="brown" className="w-4 h-4 z-30" />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label
                htmlFor="newpassword2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm New Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="newpassword2"
                name="newpassword2"
                type={isShowPassword3 ? "text" : "password"}
                value={formData.newpassword2}
                onChange={handleChange}
                required
                placeholder="Confirm New Password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div
                onClick={changeVisibilty3}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-30"
              >
                {isShowPassword3 ? (
                  <EyeIcon color="brown" className="w-4 h-4 z-30" />
                ) : (
                  <EyeSlashIcon color="brown" className="w-4 h-4 z-30" />
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {status === "loading" ? (
                "Loading..."
                ) : (
                "Change Password"
              )}
              {/* <ToastContainer /> */}
            </button>
          </div>
        </form>

        <Link to="/register">
          <p className="mt-10 text-center text-sm text-gray-800">
            Not a member?{" "}
            <div className="font-semibold leading-6 text-gray-800 hover:text-gray-700">
              Start a 14 day free trial
            </div>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ChangePassword;
