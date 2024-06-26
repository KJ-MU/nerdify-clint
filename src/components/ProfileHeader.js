import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../features/userSlice"; // Adjust the path as per your project structure
import { Formik, Form, Field, ErrorMessage } from "formik";

const ProfileHeader = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (values) => {
    // Dispatch action to update profile
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("profileImage", values.file);
    // console.log(formData);
    dispatch(updateProfile({ values, token }));
    setIsEditing(false);
  };
  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue("profileImage", file);
  };

  return (
    <div className="w-8/12 mx-auto p-4 bg-white rounded-lg flex items-center justify-center">
      <div className="w-full md:pr-6 flex flex-col items-center justify-center md:flex-row">
        <div className="w-full flex md:flex-row gap-5 flex-col md:justify-start justify-center items-center md:w-3/4 mt-4">
          <img
            src={user?.profileImage}
            alt="User"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex md:text-left justify-between items-center">
            <div className="flex flex-col justify-start">
              <h2 className="text-2xl font-bold">{user?.fullName}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleEditClick}
          className={` ${
            isEditing
              ? "hidden"
              : "md:self-start px-4 py-2 my-6 bg-[#0D99FF] text-white rounded-md hover:brightness-75 transition-all"
          }`}
        >
          Edit Profile
        </button>
        {isEditing && (
          <Formik
            initialValues={{
              fullName: user.fullName,
              email: user.email,
              profileImage: null,
            }}
            onSubmit={handleSubmit}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Full Name</label>
                    <Field
                      type="text"
                      name="fullName"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Profile Image</label>
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
