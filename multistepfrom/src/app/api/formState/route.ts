// src/app/api/formState/route.ts
export async function GET() {
    try {
      // Return the form state as a JSON response
      const formState = {
        personalInfo: { name: "", email: "" },
        addressDetails: { address: "", city: "" },
        preferences: { newsletter: false },
      };
  
      return new Response(JSON.stringify(formState), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  