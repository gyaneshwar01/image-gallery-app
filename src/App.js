import React, { useState, useEffect } from "react";
import axios from "axios";
import { ACCESS_KEY } from "./config/constants";

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [tempImageList, setTempImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Image Gallery";
    setTimeout(() => {
      axios
        .get(
          `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=30`
        )
        .then((res) => {
          setImageList(res.data);
          setTempImageList(res.data);
          setIsLoading(false);
        });
    }, 500);
  }, []);

  const handleChange = (query) => {
    const filteredImageList = tempImageList.filter((image) => {
      image.alt_description =
        image.alt_description === null
          ? "react"
          : image.alt_description.toLowerCase();
      return image.alt_description.includes(query.toLowerCase());
    });

    setImageList(filteredImageList);
  };

  const imageElement =
    imageList.length > 0 ? (
      imageList.map((image) => (
        <div key={image.id} style={{ padding: "20px", textAlign: "center" }}>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            style={{
              height: "250px",
              width: "250px",
              objectFit: "cover",
            }}
          />
          <br />
          <p style={{ width: "250px" }}>
            {image.alt_description ? image.alt_description : "react"}
          </p>
        </div>
      ))
    ) : (
      <h1 style={{ marginTop: "20px" }}>
        {isLoading ? "Loading..." : "No image found!!"}
      </h1>
    );

  return (
    <div>
      <center>
        <input
          type="text"
          placeholder="Search Images..."
          onChange={(event) => handleChange(event.target.value)}
          style={{
            width: "50%",
            height: "40px",
          }}
        />
      </center>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {imageElement}
      </div>
    </div>
  );
};

export default App;
