import Stripe from "stripe";
import { media } from "@wix/sdk";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  // Parse the JSON body from the request
  const { items } = await request.json();

  try {
    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => {
        // Convert Wix image URL to a standard URL
        const imageUrl = media.getScaledToFillImageUrl(
          item.image,
          300,
          300,
          {}
        );

        return {
          price_data: {
            currency: "USD",
            product_data: {
              name: item.productName?.original, // Log product name to debug
              images: [imageUrl], // Adding the converted product image URL
            },
            unit_amount: item.price?.amount * 100, // Convert price to cents and log price
          },
          quantity: item?.quantity,
        };
      }),
      mode: "payment",

      success_url: `${request.headers.get(
        "origin"
      )}/api/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}`,
    });

    // Respond with the session ID
    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (err) {
    // Handle any errors that occur during session creation
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
