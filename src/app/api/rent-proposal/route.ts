import { NextResponse } from "next/server";

const requiredFields = [
  "postcode",
  "propertyType",
  "bedrooms",
  "propertyStatus",
  "fullName",
  "email",
  "telephone",
  "contactMethod",
  "consent",
] as const;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const missingField = requiredFields.find((field) => {
      const value = payload[field];
      return typeof value !== "string" || value.trim().length === 0;
    });

    if (missingField) {
      return NextResponse.json(
        {
          ok: false,
          message: "Required property or contact information is missing.",
        },
        { status: 400 },
      );
    }

    // Connect this validated payload to the production CRM or enquiry service before launch.
    return NextResponse.json({ ok: true, preview: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "The enquiry data could not be read. Please try again.",
      },
      { status: 400 },
    );
  }
}
