"use client";
import { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PaymentPage() {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [copyStatus, setCopyStatus] = useState("COPY");
  const [refNo, setRefNo] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setAmount(data.hpay_money || "₹15000");
          setPaymentType(data.payment_type || "Payoneer");
          setUpiId(data.upi_address || "induslndbala90@ybl");
        }
      })
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId).then(() => {
      setCopyStatus("COPIED");
      setTimeout(() => setCopyStatus("COPY"), 2000);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (/^[0-9]{12}$/.test(refNo)) {
      alert("Recharge submitted successfully! We will process it shortly.");
      setRefNo("");
    } else {
      alert("Please enter a valid 12-digit reference number.");
    }
  };

  return (
    <div className="max-w-md mx-auto font-serif  min-h-screen px-3 sm:px-6">
      {/* Header */}
      <div className="flex justify-between items-center py-6 m-2">
        <h1 className="text-[16px] font-semibold text-[#222]">
          Payment Via UPI
        </h1>
        <a href="#" className="text-[14px] underline text-[#e2ca17] font-bold">
          How it works ?
        </a>
      </div>

      {/* Amount Card */}
      <div className="bg-gradient-to-br from-[#db8308] to-[#d89e32] text-white p-6 m-2 rounded-md shadow-md">
        <div className="text-[15px]">Payment Amount</div>
        <div className="text-[32px] sm:text-[36px] font-bold break-words">
          {amount} {paymentType}
        </div>
      </div>

      <div className="mt-4 m-4 space-y-6">
        {/* Step 1 */}
        <div>
          <div className="text-[19px] mb-2 ">1. Copy UPI Information.</div>
          <span className="text-[#db1308] font-bold block mb-2">
            Don&apos;t save this UPI ID. Get the latest one from this page every time.
          </span>


          <div className="flex justify-between items-center bg-white border rounded-lg px-4 py-4 shadow-sm">
            <span className="text-[16px] font-bold break-all">{upiId}</span>
            <button
              onClick={handleCopy}
              className="text-[#db8308] font-bold text-[15px] cursor-pointer"
            >
              {copyStatus}
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div>
          <div className="text-[19px] mb-2 ">
            2. Transfer the amount you want to recharge to us{" "}
            <span className="text-[#db1308] font-bold">
              by UPI ID transfer, NOT MOBILE NUMBER.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              className="flex justify-between items-center border p-3 sm:p-4 rounded-md bg-white hover:bg-gray-50 cursor-pointer shadow-sm"
              onClick={() =>
                router.push("https://paytm.com/download-paytm-app")
              }
            >
              <Image
                src="/Paytm.jpg"
                alt="Paytm"
                width={100}
                height={40}
                className="h-10 object-contain"
              />
              <span className=" text-gray-500 font-bold text-lg">
                <FaGreaterThan />
              </span>
            </a>

            <a
              className="flex justify-between items-center border p-3 sm:p-4 rounded-md bg-white hover:bg-gray-50 cursor-pointer shadow-sm"
              onClick={() =>
                router.push(
                  "https://play.google.com/store/apps/details?id=com.phonepe.app"
                )
              }
            >
              <Image
                src="/phonepe.webp"
                alt="PhonePe"
                width={100}
                height={40}
                className="h-10 object-bottom"
              />
              <span className=" text-gray-500  font-bold text-lg">
                <FaGreaterThan />
              </span>
            </a>

            <a
              className="flex justify-between items-center border p-3 sm:p-4 rounded-md bg-white hover:bg-gray-50 cursor-pointer shadow-sm"
              onClick={() =>
                router.push(
                  "https://play.google.com/store/apps/details?id=com.cc.grameenphone&hl=en"
                )
              }
            >
              <Image
                src="/gpay.jpg"
                alt="GPay"
                width={100}
                height={40}
                className="h-10 object-contain"
              />
              <span className="text-gray-500  font-bold text-lg">
                <FaGreaterThan />
              </span>
            </a>

            <a
              className="flex justify-between items-center border p-3 sm:p-4 rounded-md bg-white hover:bg-gray-50 cursor-pointer shadow-sm"
              onClick={() =>
                router.push(
                  "https://play.google.com/store/apps/details?id=com.phonepe.app&hl=en"
                )
              }
            >
              <Image
                src="/upi.jpg"
                alt="UPI"
                width={100}
                height={40}
                className="h-10 object-contain"
              />
              <span className="text-gray-500  font-bold text-lg">
                <FaGreaterThan />
              </span>
            </a>
          </div>
        </div>

        {/* Step 3 */}
        <div>
          <div className="text-[19px] mb-2 ">
            3. Please enter Ref No. to complete the recharge.
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex justify-between items-center bg-white border rounded-lg px-4 py-4 shadow-sm">
              <input
                type="text"
                value={refNo}
                onChange={(e) => setRefNo(e.target.value)}
                placeholder="Ref No."
                required
                className="flex-1 bg-transparent outline-none text-[16px]"
              />
              <button
                type="submit"
                className="text-[#db8308] font-bold text-[15px] cursor-pointer"
              >
                SUBMIT
              </button>
            </div>
          </form>
          <p className="text-[16px] underline text-[#db8308] mt-2">
            Please enter the REF NO / Reference NO / UTR (12-digit number) of
            your transfer and we will finish your recharge as soon as possible.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[15px] text-gray-500 ">
        100% Secure Payments Powered by Pays
      </div>
    </div>
  );
}
