import React from "react";

const DetailYouTube = () => {
  return (
    <iframe
      //   key={video.key}
      src={`https://www.youtube.com/embed/${getYouTubeId(
        "https://www.youtube.com/watch?v=cS-IiArGmcU"
      )}?showinfo=0&enablejsapi=1`}
      width="100%"
      height="100%"
    ></iframe>
  );
};

export default DetailYouTube;
