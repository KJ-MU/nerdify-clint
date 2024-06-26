import React, { useEffect } from "react";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { LuRocket } from "react-icons/lu";
import ProfileHeader from "../components/ProfileHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../features/userSlice";
const ProfilePage = () => {
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      <div className="flex mt-32 justify-center items-center">
        <ProfileHeader />
      </div>
      <div className="p-4">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-2xl font-bold">My Learning</h2>
        </div>
        <div className="flex justify-center items-center flex-wrap mt-10 gap-5 ">
          {user?.coursesSubscribed?.length > 0 ? (
            user?.coursesSubscribed?.map((course) => (
              <Card key={course._id} course={course} />
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              <LuRocket className="text-blue-500 mr-2" size={30} />

              <p>No courses found. Start your learning journey now!</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 my-20 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-10">My Courses</h2>
        <div className=" flex justify-center items-center flex-wrap gap-5">
          {user?.coursesCreated?.length > 0 ? (
            user?.coursesCreated.map((course) => (
              <Card key={course._id} course={course} />
            ))
          ) : (
            <p>No courses created.</p>
          )}
        </div>
        <div
          onClick={handleLogout}
          className=" flex justify-end items-end gap-2 px-2 fixed bottom-10 right-10 bg-white border rounded-full py-1"
        >
          <svg
            className="hover:scale-110 transition-all ease-in-out cursor-pointer"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            stroke-width="2"
          >
            <path
              d="M15 3H9C7.34315 3 6 4.34315 6 6V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V15"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19 12H9M15 16L19 12L15 8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
