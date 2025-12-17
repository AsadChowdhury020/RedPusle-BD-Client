import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { CheckCircle, ArrowLeft, Wallet } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxios from "../../../hooks/useAxios";
import Container from "../../../components/Shared/Container";
import useUserRole from "../../../hooks/useUserRole";

const FundingSuccess = () => {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const [fundingData, setFundingData] = useState(null);
  const { role } = useUserRole()

  console.log(role)
  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    const fetchData = async () => {
      if (!sessionId) return;

      const res = await axiosInstance.get(
        `/verify-checkout-session/${sessionId}`
      );
      setFundingData(res.data);

      // Optional: save funding in DB
      // await axiosSecure.post("/save-funding", res.data);
    };

    fetchData();
  }, [sessionId, axiosInstance, axiosSecure]);

  if (!fundingData)
    return (
      <p className="text-center text-base-content/60 py-20">
        Loading payment details...
      </p>
    );

  return (
    <Container>
      <div className="min-h-screen flex justify-center items-center bg-base-200 p-6">

        <div className="bg-base-100 border border-base-300 shadow-xl rounded-xl p-8 max-w-lg w-full text-center">

          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-success w-20 h-20 animate-bounce" />
          </div>

          <h1 className="text-3xl font-bold text-primary mb-2">
            Payment Successful!
          </h1>

          {/* Summary */}
          <div className="border border-base-300 rounded-lg p-5 bg-base-200 shadow-sm mb-6 text-left">
            <h3 className="text-lg font-semibold flex items-center justify-center gap-2 mb-4 text-base-content">
              <Wallet className="w-5 h-5 text-primary" />
              Funding Summary
            </h3>

            <div className="space-y-1 text-base-content">
              <p>
                <span className="font-semibold text-primary">Donor:</span>{" "}
                {fundingData.name}
              </p>
              <p>
                <span className="font-semibold text-primary">Email:</span>{" "}
                {fundingData.email}
              </p>
              <p>
                <span className="font-semibold text-primary">Amount:</span>{" "}
                ${fundingData.amount}
              </p>
              <p className="break-all">
                <span className="font-semibold text-primary">
                  Transaction ID:
                </span>{" "}
                {fundingData.transactionId}
              </p>
              <p>
                <span className="font-semibold text-primary">Date:</span>{" "}
                {fundingData.date}
              </p>
            </div>
          </div>

          {/* Actions */}
          <Link to={`/dashboard/${role}`} className="btn btn-primary w-full">
            Go to Dashboard
          </Link>

          <Link to="/funding" className="btn btn-outline w-full mt-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Funding Page
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default FundingSuccess;
