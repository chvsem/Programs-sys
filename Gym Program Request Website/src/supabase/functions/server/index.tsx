import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b3f9f454/health", (c) => {
  return c.json({ status: "ok" });
});

// Email submission endpoint
app.post("/make-server-b3f9f454/submit-consultation", async (c) => {
  try {
    const formData = await c.req.json();
    console.log('Received consultation request:', formData);

    // Get the Resend API key from environment variables
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment variables');
      return c.json({ 
        success: false, 
        error: 'Email service not configured. Please add RESEND_API_KEY.' 
      }, 500);
    }

    // Format the email content
    const emailBody = `
NEW CONSULTATION REQUEST - PROGRAMS.SYS
===============================================

CLIENT INFORMATION:
-------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

TRAINING DETAILS:
-----------------
Experience Level: ${formData.experience}
Weekly Availability: ${formData.availability}
Preferred Meeting Time: ${formData.preferredTime || 'Not specified'}

FITNESS GOALS:
--------------
${formData.goals}

===============================================
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
    `.trim();

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PROGRAMS.SYS <onboarding@resend.dev>',
        to: ['mulhollandchase@gmail.com'],
        subject: `🏋️ New Consultation Request from ${formData.name}`,
        text: emailBody,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', result);
      return c.json({ 
        success: false, 
        error: 'Failed to send email: ' + (result.message || 'Unknown error')
      }, 500);
    }

    console.log('Email sent successfully:', result);
    return c.json({ success: true, emailId: result.id });

  } catch (error) {
    console.error('Error processing consultation request:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, 500);
  }
});

Deno.serve(app.fetch);