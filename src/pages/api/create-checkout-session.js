/* eslint-disable import/no-anonymous-default-export */

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  
  const transformedItems = items.map((item) => ({
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description.substring(0,20) + "...",
        images: [item.image],
      },
    },
  }));

  const shippingData = {

    shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 500,
          currency: 'usd',
        },
        display_name: 'Next-Day Shipping',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 1,
          },
          maximum: {
            unit: 'business_day',
            value: 3,
          },
        },
      },
    };

  try {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // shipping_rates: ["shr_1NA8QQSHMcdGCCmM8G6jenyR"], 
        shipping_options: [shippingData], 
        shipping_address_collection: {
          allowed_countries: ["GB", "US", "CA", "IN"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
          email,
          images: JSON.stringify(items.map((item) => item.image)),
        },
      });

    // Handle successful response
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe API Error:", error);
  }
};