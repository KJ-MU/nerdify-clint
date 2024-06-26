import Card from "../components/Card";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

const CoursesPage = ({ courses }) => {
  const loading = useSelector((state) => state.course.loading);

  const [currentPage, setCurrentPage] = useState(0); // ReactPaginate uses 0-based index
  const coursesPerPage = 8;
  // Calculate the current courses to display
  const indexOfLastCourse = (currentPage + 1) * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Calculate the total number of pages
  const pageCount = Math.ceil(courses.length / coursesPerPage);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="container mx-auto mt-16 py-20 md:px-10 lg:px-0">
      <div className="px-4 py-6 w-full text-3xl text-left font-bold text-gray-700 mb-4">
        Courses
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10 -mx-2">
        {currentCourses.length > 0 ? (
          currentCourses.map((course, index) => (
            <Card key={index} course={course} />
          ))
        ) : (
          <p className="flex justify-center items-center py-20 ">
            No courses found.
          </p>
        )}
      </div>
      <div className="flex justify-center mt-8">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          nextLinkClassName={"nex"}
          previousLinkClassName={"prev"}
          disabledClassName={"disabled"}
          pageClassName={"page"}
        />
      </div>
    </div>
  );
};

export default CoursesPage;
