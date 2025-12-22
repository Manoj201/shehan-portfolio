import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Handle CORS
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, contactNumber, email, message } = request.body;

    // Validate required fields
    if (!name || !contactNumber) {
      return response
        .status(400)
        .json({ error: "Name and contact number are required" });
    }

    // Google Sheets Web App URL (you'll get this after deploying the Apps Script)
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

    if (!GOOGLE_SHEETS_URL) {
      console.error("GOOGLE_SHEETS_URL not configured");
      return response.status(500).json({ error: "Server configuration error" });
    }

    // Send data to Google Sheets
    const sheetsResponse = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        contactNumber,
        email: email || "",
        message: message || "",
        timestamp: new Date().toISOString(),
      }),
    });

    if (!sheetsResponse.ok) {
      throw new Error("Failed to save to Google Sheets");
    }

    return response
      .status(200)
      .json({ success: true, message: "Contact saved successfully" });
  } catch (error) {
    console.error("Error saving contact:", error);
    return response.status(500).json({ error: "Failed to save contact" });
  }
}
