import React from "react";
import { useNavigate } from "react-router";
import { FaTimesCircle, FaHome, FaRedo, FaEnvelope } from "react-icons/fa";
import Container from "../../../components/Shared/Container";

const FundingCancel = ({
  transactionId = null,
  email = null,
  onRetry = null,
}) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (typeof onRetry === "function") {
      onRetry();
    } else {
      navigate("/funding");
    }
  };

  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">

        <div className="max-w-2xl w-full bg-base-100 border border-base-300 rounded-2xl shadow-lg p-8">

          <div className="flex flex-col items-center text-center gap-4">

            {/* Icon */}
            <div className="bg-error/10 rounded-full p-4">
              <FaTimesCircle className="text-6xl text-error" />
            </div>

            <h1 className="text-2xl font-bold text-base-content">
              Payment Cancelled
            </h1>

            <p className="text-sm text-base-content/70 max-w-xl">
              Your payment was not completed. No charge has been made. You can
              try again, return to the funding page, or contact support if you
              need help.
            </p>

            {/* Transaction Info */}
            {transactionId && (
              <div className="w-full bg-base-200 border border-base-300 rounded-md p-3 text-sm text-base-content">
                <span className="font-semibold text-primary">
                  Transaction ID:
                </span>
                <span className="ml-2 font-mono text-xs break-all">
                  {transactionId}
                </span>
              </div>
            )}

            {email && (
              <div className="w-full text-sm text-base-content">
                <span className="font-semibold text-primary">
                  Email:
                </span>{" "}
                {email}
              </div>
            )}

            {/* Actions */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

              <button
                onClick={handleRetry}
                className="btn btn-primary flex items-center justify-center gap-2"
              >
                <FaRedo />
                Retry Payment
              </button>

              <button
                onClick={() => navigate("/funding")}
                className="btn btn-ghost flex items-center justify-center gap-2"
              >
                <FaHome />
                Funding Page
              </button>

              <a
                href={`mailto:support@yourdomain.com?subject=Payment%20Help&body=${encodeURIComponent(
                  `I cancelled a payment.\nTransaction: ${
                    transactionId || "N/A"
                  }\nEmail: ${email || "N/A"}\n\nPlease help.`
                )}`}
                className="btn btn-outline flex items-center justify-center gap-2"
              >
                <FaEnvelope />
                Contact Support
              </a>
            </div>

            <p className="text-xs text-base-content/50 mt-4">
              If you cancelled the payment on Stripe, you may try again later or
              use another payment method.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FundingCancel;
