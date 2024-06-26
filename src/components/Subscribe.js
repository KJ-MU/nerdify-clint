import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToCourse } from "../features/courseSlice";

const Subscribe = (courseId) => {
  const user = useSelector((state) => state.user.user);
  const isSubscribed = user?.coursesSubscribed?.some(
    (course) => course._id === courseId
  );
  const iscreated = user?.coursesCreated?.some(
    (course) => course._id === courseId
  );

  const dispatch = useDispatch();

  const handelSubscribtion = () => {
    dispatch(subscribeToCourse(courseId));
  };
  if (isSubscribed) {
    return null;
  }
  if (iscreated) {
    return null;
  }
  if (!user) {
    return null;
  }
  return (
    <div>
      <button
        onClick={handelSubscribtion}
        className="hidden md:flex justify-center font-bold items-center my-2 py-4 px-12 rounded-xl text-white bg-green-500 hover:brightness-75 transition-all"
      >
        Subscribe to the course
      </button>
    </div>
  );
};

export default Subscribe;
