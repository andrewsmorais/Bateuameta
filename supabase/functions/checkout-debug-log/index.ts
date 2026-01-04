import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { stage, payload, ts, url, userAgent, buildId } = body;

    // Log with timestamp and stage for easy filtering
    console.log(`[CHECKOUT-DEBUG] ==========================================`);
    console.log(`[CHECKOUT-DEBUG] Stage: ${stage}`);
    console.log(`[CHECKOUT-DEBUG] Timestamp: ${ts || new Date().toISOString()}`);
    console.log(`[CHECKOUT-DEBUG] Build ID: ${buildId || "unknown"}`);
    console.log(`[CHECKOUT-DEBUG] URL: ${url || "unknown"}`);
    console.log(`[CHECKOUT-DEBUG] UserAgent: ${userAgent?.substring(0, 100) || "unknown"}`);
    
    if (payload) {
      // Sanitize any sensitive data just in case
      const sanitizedPayload = { ...payload };
      if (sanitizedPayload.cardNumber) {
        sanitizedPayload.cardNumber = sanitizedPayload.cardNumber.substring(0, 6) + "******";
      }
      if (sanitizedPayload.cvv) {
        sanitizedPayload.cvv = "***";
      }
      if (sanitizedPayload.tokenId && sanitizedPayload.tokenId.length > 10) {
        sanitizedPayload.tokenId = sanitizedPayload.tokenId.substring(0, 10) + "...";
      }
      
      console.log(`[CHECKOUT-DEBUG] Payload:`, JSON.stringify(sanitizedPayload, null, 2));
    }
    
    console.log(`[CHECKOUT-DEBUG] ==========================================`);

    return new Response(
      JSON.stringify({ ok: true, received: stage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[CHECKOUT-DEBUG] Error processing log:", error);
    return new Response(
      JSON.stringify({ ok: false, error: String(error) }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
