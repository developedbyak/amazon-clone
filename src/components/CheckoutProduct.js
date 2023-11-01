import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@/assets/icons/icons';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '@/slices/basketSlice';
import toast, { Toaster } from "react-hot-toast";

export default function CheckoutProduct({
    id,
    title,
    price,
    description,
    category,
    image,
    rating,
    hasPrime
}) {

    const dispatch = useDispatch();

    const itemRating = Math.floor(rating.rate + 1);

    
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

        dispatch(addToBasket(product))
        toast.success('Successfully added to Cart!', {
            duration: 1500,
            style: {
                boxShadow: "none"
            }
        });
    };

    const removeItemFromCart = () => {
        dispatch(removeFromBasket({ id }))
        toast.success('Successfully removed from Cart!', {
            duration: 1500,
            style: {
                boxShadow: "none",
            }
        });
    }

    return (
        <div className=' grid grid-cols-5'>
            <Toaster />
            <div className="w-full h-[200px] flex justify-center items-center">
                <Image
                    src={image}
                    width={100}
                    height={100}
                    alt="banner"
                    placeholder="blur"
                    blurDataURL={image}
                    className=" object-contain w-auto h-auto"
                />
            </div>

            <div className=' col-span-3 mx-5'>
                <h4 className=" my-3">{title}</h4>
                <div className="flex items-center">
                    {Array(itemRating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} />
                        ))}
                </div>
                <p className=" text-xs my-2 line-clamp-3">{description}</p>
                <p className=" mb-5">$ {price}</p>

                {hasPrime && (
                    <div className=" flex items-center space-x-2 -mt-2">
                        <Image
                            src="https://cdn.discordapp.com/attachments/1107573460584124427/1107900355238428742/prime.png"
                            alt="prime-img"
                            width={20}
                            height={20}
                            className=' object-contain w-auto h-auto'
                        />
                        <p className=" text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            <div className=' flex flex-col space-y-2 my-auto justify-self-end'>
                <button onClick={addItemToCart} className='button mt-auto'>Add item again</button>
                <button onClick={removeItemFromCart} className='button mt-auto'>Remove from Cart</button>
            </div>
        </div>
    )
}
