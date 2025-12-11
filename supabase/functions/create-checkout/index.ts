import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Received body:", JSON.stringify(body));
    
    const { priceId, email, nomeCompleto, telefone, cpf } = body;
    console.log("Parsed values - priceId:", priceId, "email:", email);

    if (!priceId) {
      console.log("Error: Price ID is missing");
      return new Response(JSON.stringify({ error: "Price ID is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (!email) {
      console.log("Error: Email is missing");
      return new Response(JSON.stringify({ error: "Email is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if customer already exists
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customerId: string;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      // Update customer metadata
      await stripe.customers.update(customerId, {
        metadata: {
          nome_completo: nomeCompleto || "",
          telefone: telefone || "",
          cpf: cpf || "",
        },
      });
    } else {
      const customer = await stripe.customers.create({
        email: email,
        name: nomeCompleto || undefined,
        phone: telefone || undefined,
        metadata: {
          nome_completo: nomeCompleto || "",
          telefone: telefone || "",
          cpf: cpf || "",
        },
      });
      customerId = customer.id;
    }

    console.log("Creating checkout session for email:", email, "with price:", priceId);

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/pagamento-sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/planos`,
      metadata: {
        email: email,
        nome_completo: nomeCompleto || "",
        telefone: telefone || "",
        cpf: cpf || "",
      },
    });

    console.log("Checkout session created:", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating checkout session:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
