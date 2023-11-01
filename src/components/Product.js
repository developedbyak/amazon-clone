/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { StarIcon } from "@/assets/icons/icons";
import { useDispatch } from "react-redux";
import { addToBasket } from "@/slices/basketSlice";
import toast, { Toaster } from "react-hot-toast";

export default function Product({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) {
  const dispatch = useDispatch();

  const itemRating = Math.floor(rating.rate + 1);
  let hasPrime;
  if (itemRating > 3) { hasPrime = true; } else { hasPrime = false; }

  const addItemToCart = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };

    // Sending the product as an action to the REDUX store
    // to basketSlice.js

    dispatch(addToBasket(product))
    toast.success('Successfully added to Cart!', {
      duration: 1500,
      style: {
        boxShadow: "none"
      }
    });
  };

  return (
    <div className=" relative flex flex-col m-5 bg-white z-30 p-10 ">
      <Toaster />
      <p className=" absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <div className="w-full h-[200px] flex justify-center items-center">
        <img
          src={image}
          alt="product-img"
          className="max-h-full max-w-full"
          loading="lazy"
        />
      </div>

      <h4 className=" my-3">{title}</h4>

      <div className="flex items-center">
        {Array(itemRating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} />
          ))}
        <p className=" ml-1">{rating.count}</p>
      </div>

      <p className=" text-xs my-2 line-clamp-2">{description}</p>

      <p className=" mb-5">$ {price}</p>

      {hasPrime && (
        <div className=" flex items-center space-x-2 -mt-5">
          <img
            src="https://cdn.discordapp.com/attachments/1107573460584124427/1107900355238428742/prime.png"
            alt="prime-img"
            className=" w-10"
            loading="lazy"
          />
          <p className=" text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button
        onClick={addItemToCart}
        className=" mt-auto button">Add to Basket</button>
    </div>
  );
}
