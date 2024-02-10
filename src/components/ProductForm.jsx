"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: prevTitle,
  description: prevDescription,
  price: prevPrice,
  rating: prevRating,
  brand: prevBrand,
  category: prevCategory,
  images: prevImages,
}) => {
  const [title, setTitle] = useState(prevTitle || "");
  const [description, setDescription] = useState(prevDescription || "");
  const [price, setPrice] = useState(prevPrice || "");
  const [rating, setRating] = useState(prevRating || "");
  const [brand, setBrand] = useState(prevBrand || "");
  const [category, setCategory] = useState(prevCategory || "");
  const [images, setImages] = useState(prevImages || "");

  async function uploadImages(e) {
    // console.log(e);
    const file = e.target.files;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  }

  function removeImage(indexToRemove) {
    setImages((prev) => {
      return [...prev].filter((image, imageIndex) => {
        return imageIndex !== indexToRemove;
      });
    });
  }

  return (
    <>
      <h1 className="mt-1 mb-3">{prevTitle}</h1>
      <hr />
      <hr />
      <form className="flex flex-col gap-2 text-xl mt-7">
        <div className="flex items-start gap-2">
          <label>Product Name:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            required
          />
        </div>

        <div className="flex items-start gap-2">
          <label>Description:</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            cols={`40`}
            rows={`3`}
            required
          />
        </div>

        <div className="flex items-start gap-2">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            required
          />
        </div>

        <div className="flex items-start gap-2">
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            required
            max={5}
          />
        </div>

        <div className="flex items-start gap-2">
          <label>Brand:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            required
          />
        </div>

        <div className="flex items-start gap-2">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-500 pl-2 rounded-md border-[2px] border-[#222F3E]"
            required
          />
        </div>

        <label>Images (max 5 images)</label>
        <div className="flex">
          <ReactSortable
            list={images}
            setList={setImages}
            className="flex gap-2"
          >
            {!!images.length &&
              images.map((link, index) => (
                <div
                  key={index}
                  className="relative mt-2"
                >
                  <img
                    src={link}
                    alt={title}
                    width={185}
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2"
                    onClick={() => removeImage(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </ReactSortable>

          {images.length < 5 && (
            <label className=" w-24 h-24 border flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-md cursor-pointer shadow-md place-self-center ml-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Upload
              <input
                type="file"
                onChange={uploadImages}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="place-self-center flex gap-3 mt-5">
          <button
            type="submit"
            className="bg-[#FF9900] px-5 py-2 rounded-md"
          >
            Save
          </button>
          <Link href={"/products"}>
            <button
              type="button"
              className="bg-red-500 px-5 py-2 rounded-md"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
