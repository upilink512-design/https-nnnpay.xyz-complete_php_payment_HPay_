import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  hpay_money: { type: String, required: true },
  payment_type: { type: String, required: true },
  upi_address: { type: String, required: true },
});

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
