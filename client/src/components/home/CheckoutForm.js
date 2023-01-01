import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { API } from "../../config";

export default function CheckoutForm({ currentOrder }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);
    currentOrder.payStatus = "Đã thanh toán";
    const res = await axios.post(`${API}/orders/create-order`, currentOrder);

    console.log(res);

    localStorage.setItem("cart", JSON.stringify([]));
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/orderdetails/${res?.data?.ordered?._id}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <PaymentElement id="payment-element" />
      <div style={{ display: "flex" }}>
        <button
          disabled={isProcessing || !stripe || !elements}
          id="submit"
          style={{ margin: "20px auto" }}
        >
          <span id="button-text" className="pay-onl">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
      </div>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
