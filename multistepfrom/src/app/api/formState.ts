// src/app/api/formState/route.ts

import { NextApiRequest, NextApiResponse } from "next";

// Mock data structure to simulate the form state
let mockFormState = {
  personalInfo: { name: "John Doe", email: "john@example.com" },
  addressDetails: { address: "123 Main St", city: "New York" },
  preferences: { newsletter: true },
};

let interval: NodeJS.Timer | null = null;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Simulate periodic updates (for real-time collaboration)
  if (!interval) {
    interval = setInterval(() => {
      mockFormState.personalInfo.name = "Updated Name " + Math.random().toString(36).substr(2, 5);
      mockFormState.addressDetails.city = "Updated City " + Math.random().toString(36).substr(2, 5);
    }, 5000); // Update the mock state every 5 seconds
  }

  // Respond with the mock form state
  return res.status(200).json(mockFormState); // Send a JSON response
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // Parse incoming JSON data manually if req.json() is not available
  let formData = req.body;

  // If the body is not parsed correctly, try to parse manually
  if (typeof formData === 'string') {
    formData = JSON.parse(formData);
  }

  mockFormState = formData;

  // Respond with a success message
  return res.status(200).json({ message: "Form data updated" });
}
