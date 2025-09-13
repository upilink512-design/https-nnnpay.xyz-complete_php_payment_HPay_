"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    hpay_money: "",
    payment_type: "",
    upi_address: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data) {
          setForm({
            hpay_money: data.hpay_money || "",
            payment_type: data.payment_type || "",
            upi_address: data.upi_address || ""
          });
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading
    setMessage("");   // clear old message

    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();

    if (data.success) {
      setMessage("✅ Changes saved!");
    } else {
      setMessage("❌ Error: " + (data.message || "Something went wrong"));
    }

    setLoading(false); // ✅ stop loading
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-center text-xl font-bold mb-4">🔑 Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <label>HPay Money</label>
        <input
          className="border p-2 w-full mb-2"
          value={form.hpay_money}
          onChange={(e) => setForm({ ...form, hpay_money: e.target.value })}
        />

        <label>Payment Type</label>
        <input
          className="border p-2 w-full mb-2"
          value={form.payment_type}
          onChange={(e) => setForm({ ...form, payment_type: e.target.value })}
        />

        <label>UPI Address</label>
        <input
          className="border p-2 w-full mb-2"
          value={form.upi_address}
          onChange={(e) => setForm({ ...form, upi_address: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white transition 
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Updating...
            </span>
          ) : (
            "Save"
          )}
        </button>
      </form>

      <p className="text-green-600 text-center mt-2">{message}</p>
    </div>
  );
}
