import React, { useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import { GoBriefcase } from "react-icons/go";
import { CiGlobe } from "react-icons/ci";
import { useUser } from "@clerk/clerk-react";

const Profile = () => {
  const { user } = useUser();
  const [enabled, setEnabled] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile);
  };

  const [selectedLanguage, setSelectedLanguage] = useState('en'); 

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    console.log('Selected Language:', newLanguage);
  };

  return (
    <div className="px-4 py-6">
      <form action="#">
        <div className="form-container vertical">
          <div>
            <h5>General</h5>
            <p>
              Basic info, like your name and address that will displayed in
              public
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
            <div className="font-semibold">Name</div>
            <div className="col-span-2">
              <div className="form-item vertical mb-0 max-w-[700px]">
                <label className="form-label"></label>
                <div className="">
                  <span className="input-wrapper undefined">
                    <div className="input-suffix-start">
                      <CgProfile className="text-lg ml-3" />
                    </div>
                    <input
                      className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 pl-[2.25rem]"
                      type="text"
                      name="name"
                      autoComplete="off"
                      placeholder="Name"
                      value={user.fullName}
                      readOnly
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
            <div className="font-semibold">Email</div>
            <div className="col-span-2">
              <div className="form-item vertical mb-0 max-w-[700px]">
                <label className="form-label"></label>
                <div className="">
                  <span className="input-wrapper undefined">
                    <div className="input-suffix-start">
                      <CiMail className="text-lg ml-3" />
                    </div>
                    <input
                      className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 pl-[2.25rem]"
                      type="email"
                      name="email"
                      autoComplete="off"
                      placeholder="Email"
                      value={user.primaryEmailAddress}
                      readOnly
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
            <div className="font-semibold">Avatar</div>
            <div className="col-span-2">
              <div className="form-item vertical mb-0 max-w-[700px]">
                <label className="form-label"></label>
                <div>
                  <div className="upload cursor-pointer">
                    <input
                      className="upload-input"
                      type="file"
                      title=""
                      value=""
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                    <span
                      className="avatar avatar-circle"
                      style={{
                        width: "40px",
                        height: "40px",
                        minWidth: "32px",
                        lineHeight: "32px",
                        fontSize: "14px",
                      }}
                      onClick={handleImageClick}
                    >
                      <img
                        className="avatar-img avatar-circle"
                        src={user.imageUrl}
                        alt={user.fullName}
                        loading="lazy"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 py-8 items-center">
            <div className="font-semibold">Phone Number</div>
            <div className="col-span-2">
              <div className="form-item vertical mb-0 max-w-[700px]">
                <label className="form-label"></label>
                <div className="">
                  <span className="input-wrapper undefined">
                    <div className="input-suffix-start">
                      <GoBriefcase className="text-lg ml-3" />
                    </div>
                    <input
                      className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 pl-[2.25rem]"
                      autoComplete="off"
                      placeholder="Phone"
                      value={user.primaryPhoneNumber}
                      readOnly
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h5>Preferences</h5>
            <p>Your personalized preference displayed in your account</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
            <div className="font-semibold">Language</div>
            <div className="col-span-2">
              <div className="form-item vertical mb-0 max-w-[700px]">
                <label className="form-label">Select Language:</label>
                <div>
                  <div className="">
                    <div className="">
                      <div className="">
                        {/* <div className="">
                          {selectedLanguage === "en" ? "English (US)" : "Hindi"}
                        </div> */}
                        <div
                          className="p-2 border mt-2 rounded-lg "
                          data-value=""
                        >
                          <select
                            className="active:border-none bg-transparent"
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                          >
                            <option value="en">English (US)</option>
                            <option value="hin">
                             Hindi
                            </option>
                          </select>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center">
            <div className="font-semibold">Time Zone</div>
            <div className="col-span-2">
              <div className="form-item vertical mb-0 max-w-[700px]">
                <label className="form-label"></label>
                <div className="">
                  <span className="input-wrapper undefined">
                    <div className="input-suffix-start">
                      <CiGlobe className="text-lg ml-3" />
                    </div>
                    <input
                      className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 pl-[2.25rem]"
                      type="text"
                      name="timeZone"
                      autoComplete="off"
                      placeholder="Time Zone"
                      value="GMT+8"
                      readOnly
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 py-8 items-center">
            <div className="font-semibold">Sync Data</div>
            <div className="col-span-2">
              <div className="form-item vertical mb-0 max-w-[700px]">
                <label className="form-label"></label>
                <div className="relative flex flex-col overflow-hidden">
                  <div className="flex">
                    <label className="inline-flex relative items-center mr-5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={enabled}
                        readOnly
                      />
                      <div
                        onClick={() => {
                          setEnabled(!enabled);
                        }}
                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"
                      ></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 ">
            <button
              className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-11 px-8 py-2 mx-2"
              type="button"
            >
              Reset
            </button>
            <button
              className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white radius-round h-11 px-8 py-2"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
