import Stripe from "stripe";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");
  //const email = url.searchParams.get("email");
  //const name = url.searchParams.get("name");

  if (!sessionId) {
    return new Response("Session ID is required", { status: 400 });
  }

  try {
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Respond with a success message
    const html = `<html><body><h1>Thanks for your order, ${session?.customer_details?.name}!</h1><p>Email: ${session?.customer_details?.email}</p></body></html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
