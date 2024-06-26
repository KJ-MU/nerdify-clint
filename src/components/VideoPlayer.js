import React from "react";

const VideoPlayer = ({ videoUrl, title }) => {
  return (
    <div className="">
      <video controls>
        <source src={videoUrl} type="video/mp4" />
      </video>

      <h2 className="text-2xl font-semibold text-gray-700 my-4 text-left">
        {title}
      </h2>
    </div>
  );
};

export default VideoPlayer;
