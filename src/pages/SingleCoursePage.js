import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import ButtonContainer from "../components/ButtonContainer";
import CourseChapters from "../components/CourseChapters";
import { useParams } from "react-router-dom";
import { fetchCourseById } from "../features/courseSlice";
import { fetchChaptersByCourse } from "../features/chapterSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
const SingleCoursePage = () => {
  const [videoLoading, setVideoLoading] = useState(true);
  const { lessonLoading } = useSelector((state) => state.lesson.loading);
  const { course, loading } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);
  const { lesson } = useSelector((state) => state.lesson);
  const { chapters } = useSelector((state) => state.chapter);

  const { id } = useParams();
  function isSubscribed() {
    const courseIds = user?.coursesSubscribed.map((course) => course._id);
    return courseIds?.includes(id);
  }
  function isCreator() {
    const courseIds = user?.coursesCreated.map((course) => course._id);
    return courseIds?.includes(id);
  }
  const isSubscribedToThisCourse = isSubscribed();
  const isTheCreatorofThisCourse = isCreator();
  const dispatch = useDispatch();
  const handleVideoLoaded = () => {
    setVideoLoading(false);
  };

  useEffect(() => {
    dispatch(fetchCourseById(id));
    dispatch(fetchChaptersByCourse(id));
  }, [dispatch, id, isSubscribedToThisCourse]);
  useEffect(() => {
    dispatch(fetchChaptersByCourse(id));

    console.log(lesson.videoUrl);
  }, [dispatch, id, lesson]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return loading ? (
    <div className="flex h-screen justify-center items-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="md:my-40 my-28 flex md:items-start md:flex-row flex-col justify-center items-center">
      <div className="w-full md:w-2/3 px-10">
        {lessonLoading ? (
          <LoadingSpinner />
        ) : lesson?.videoUrl ? (
          <VideoPlayer
            videoUrl={lesson?.videoUrl}
            title={`${course?.Subject}`}
            onLoadedData={handleVideoLoaded}
          />
        ) : (
          <div>
            <img src={course?.image} alt="course image" />
            <h2 className="text-left text-xl font-bold my-4">
              {course?.Subject}
            </h2>
          </div>
        )}
        <ButtonContainer courseView={course?.overview} />
      </div>

      <div className="md:px-2 px-10 flex justify-start items-start w-full md:w-1/3">
        <CourseChapters
          isSubscribedToThisCourse={isSubscribedToThisCourse}
          isTheCreatorofThisCourse={isTheCreatorofThisCourse}
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default SingleCoursePage;
