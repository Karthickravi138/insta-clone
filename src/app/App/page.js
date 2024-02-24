"use client";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("description", description);

      await axios.post("YOUR_UPLOAD_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploaded(true);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="max-w-md mx-auto p-6 rounded-lg shadow-md"
      style={{
        background: "linear-gradient(to bottom right, #4F46E5, #EA80FC)",
      }}
    >
      <h1 className="text-2xl font-semibold mb-4 text-white">
        Instagram Clone
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="block mb-2 text-white">
            Choose photo:
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-white">
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
        </div>
        <button
          type="submit"
          disabled={!file || uploading}
          className="py-2 px-4 rounded-lg"
          style={{
            background: "linear-gradient(to right, #FF416C, #FF4B2B)",
            color: "white",
            fontWeight: "bold",
            cursor: uploading ? "not-allowed" : "pointer",
            opacity: uploading ? 0.5 : 1,
          }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {uploaded && (
        <p className="text-green-500 mt-4">Photo uploaded successfully!</p>
      )}
    </div>
  );
};

export default App;
