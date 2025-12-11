import React from "react";
import { useNavigate } from "react-router";
import { FaTimesCircle, FaHome, FaRedo, FaEnvelope } from "react-icons/fa";

/**
 * PaymentCancel component
 *
 * Props:
 * - transactionId (string | null)  -> optional: show transaction id for support
 * - email (string | null)          -> optional: show donor email
 * - onRetry (function | null)      -> optional: function to call for retry; if not passed, navigates to /funding
 */
const FundingCancel = ({ transactionId = null, email = null, onRetry = null }) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (typeof onRetry === "function") {
      onRetry();
    } else {
      navigate("/funding"); // go to funding page / form
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-6">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 border border-secondary rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-4">
            <FaTimesCircle className="text-6xl text-red-600 dark:text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Payment Cancelled
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl">
            Your payment was not completed. No charge has been made. You can try again,
            return to the funding form, or contact support if you need help.
          </p>

          {transactionId && (
            <div className="w-full bg-gray-50 dark:bg-gray-800 border rounded-md p-3 text-sm text-gray-700 dark:text-gray-200">
              <strong>Transaction ID:</strong>{" "}
              <span className="font-mono text-xs ml-2">{transactionId}</span>
            </div>
          )}

          {email && (
            <div className="w-full text-sm text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> <span className="ml-2">{email}</span>
            </div>
          )}

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
                `I cancelled a payment.\nTransaction: ${transactionId || "N/A"}\nEmail: ${email || "N/A"}\n\nPlease help.`
              )}`}
              className="btn btn-outline flex items-center justify-center gap-2"
            >
              <FaEnvelope />
              Contact Support
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            If you were redirected to Stripe and cancelled there, try again later or use another payment method.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundingCancel;
