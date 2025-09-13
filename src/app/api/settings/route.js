import { connectDB } from "@/lib/db";
import Settings from "@/models/Settings";

export async function GET() {
  await connectDB();
  const settings = await Settings.findOne();
  return Response.json(settings || {});
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  console.log("Received data:", data);
  if (!data.hpay_money || !data.payment_type || !data.upi_address) {
    return Response.json({ success: false, message: "All fields are required." }, { status: 400 });
  }

  // Update if exists, otherwise create (but always keep one document)
  const settings = await Settings.findOneAndUpdate(
    {}, // empty filter -> always matches the first document
    {
      hpay_money: data.hpay_money,
      payment_type: data.payment_type,
      upi_address: data.upi_address,
    },
    {
      new: true,     // return updated document
      upsert: true,  // create if doesn't exist
    }
  );

  return Response.json({ success: true, settings });
}
