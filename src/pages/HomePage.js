import React, { useEffect } from "react";
import Features from "../components/Features";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchMostSubscribedCourses } from "../features/courseSlice";
import LoadingSpinner from "../components/LoadingSpinner";
const HomePage = () => {
  const dispatch = useDispatch();
  const { mostSubscribedCourses, loading, error } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    dispatch(fetchMostSubscribedCourses());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <Header />
      <Features />
      {loading ? (
        <div className=" flex flex-col justify-center items-center my-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className=" flex flex-col justify-center items-center my-20">
          <Carousel cards={mostSubscribedCourses} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
