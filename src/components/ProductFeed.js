/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Product from './Product';


export default function ProductFeed({ products }) {

    return (
        <div className=" grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 lg:-mt-60 xl:-mt-80 mx-auto">
            {products.slice(0, 4).map(({ id, title, price, description, category, image, rating }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    rating={rating}
                />
            ))}

            <img className=' md:col-span-full' src="https://cdn.discordapp.com/attachments/1107573460584124427/1107947884923605053/advar.jpg" alt="advar" />

            <div className=' md:col-span-2'>
                {products.slice(4, 5).map(({ id, title, price, description, category, image, rating }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                        rating={rating}
                    />
                ))}
            </div>

            {products.slice(5, products.length).map(({ id, title, price, description, category, image, rating }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    rating={rating}
                />
            ))}
        </div>
    )
}




