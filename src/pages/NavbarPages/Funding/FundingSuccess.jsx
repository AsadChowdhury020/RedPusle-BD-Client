import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { CheckCircle, ArrowLeft, Wallet } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxios from "../../../hooks/useAxios";

const FundingSuccess = () => {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios()
  const [fundingData, setFundingData] = useState(null);

  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    const fetchData = async () => {
      if (!sessionId) return;

      const res = await axiosInstance.get(`/verify-checkout-session/${sessionId}`);
      setFundingData(res.data);

      // Save funding into DB
    //   await axiosSecure.post("/save-funding", res.data);
    };

    fetchData();
  }, [sessionId]);

  if (!fundingData)
    return <p className="text-center">Loading payment details...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-6">
      <div className="bg-white dark:bg-base-300 shadow-xl rounded-xl p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-20 h-20 animate-bounce" />
        </div>

        <h1 className="text-3xl font-bold text-primary mb-2">Payment Successful!</h1>

        <div className="border border-secondary rounded-lg p-5 bg-base-100 shadow-md mb-6 text-left">
          <h3 className="text-lg font-semibold flex items-center justify-center gap-2 mb-3">
            <Wallet className="w-5 h-5 text-primary" />
            Funding Summary
          </h3>

          <p><strong>Donor:</strong> {fundingData.name}</p>
          <p><strong>Email:</strong> {fundingData.email}</p>
          <p><strong>Amount:</strong> ${fundingData.amount}</p>
          <p><strong>Transaction ID:</strong> {fundingData.transactionId}</p>
          <p><strong>Date:</strong> {fundingData.date}</p>
        </div>

        <Link to="/dashboard" className="btn btn-primary w-full">
          Go to Dashboard
        </Link>

        <Link to="/funding" className="btn btn-outline w-full mt-2">
          <ArrowLeft className="w-4 h-4" /> Back to Funding Page
        </Link>
      </div>
    </div>
  );
};

export default FundingSuccess;
