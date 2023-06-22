import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Menu } from "react-feather";
import Sidebar from "~/components/Sidebar";

type LoaderData = {
  paypal_client_id: string;
  amount?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const paypal_client_id = process.env.PAYPAL_CLIENT_ID;

  const url = new URL(request.url);
  const amount = url.searchParams.get("amount");

  return { paypal_client_id, amount };
};

const Payment = () => {
  const { paypal_client_id, amount } = useLoaderData<LoaderData>();
  const [userSelectedAmount, setUserSelectedAmount] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [showSidebar, setShowSidebar] = useState(false);

  const paymentAmount = amount ? parseInt(amount).toFixed(2) : "0.00";

  return (
    <>
      {success ? (
        <section className="min-h-screen bg-slate-100 py-20 px-5">
          <div className="absolute top-0 left-0 p-5 z-10">
            <button>
              <Menu
                size={24}
                color="black"
                onClick={() => setShowSidebar(true)}
              />
            </button>
          </div>
          {showSidebar ? (
            <Sidebar onClose={() => setShowSidebar(false)} />
          ) : null}
          <h2 className="text-4xl font-bold text-center pb-10">
            Payment Success!
          </h2>
          <p className="mx-auto max-w-lg text-center">
            Thank you for your payment! Your payment has been successfully
            processed. You will receive an email confirmation shortly.
          </p>
          <div className="flex flex-col gap-y-6 pt-16 mx-auto max-w-lg relative z-10">
            <Link
              to="/"
              className="rounded-lg bg-black w-full py-2 px-5 flex items-center justify-center"
              reloadDocument
            >
              <span className="text-white font-bold text-xl">
                Return to Home
              </span>
            </Link>
          </div>
        </section>
      ) : null}

      {error ? (
        <section className="min-h-screen bg-slate-100 py-20 px-5">
          <div className="absolute top-0 left-0 p-5 z-10">
            <button>
              <Menu
                size={24}
                color="black"
                onClick={() => setShowSidebar(true)}
              />
            </button>
          </div>
          {showSidebar ? (
            <Sidebar onClose={() => setShowSidebar(false)} />
          ) : null}
          <h2 className="text-4xl font-bold text-center pb-10">
            Payment Error
          </h2>
          <p className="mx-auto max-w-lg text-center">
            There was an error processing your payment. Please try again.
          </p>
          <p className="mx-auto max-w-lg text-center text-red-500">
            {errorMessage}
          </p>
          <div className="flex flex-col gap-y-3 pt-16 mx-auto max-w-lg relative z-10">
            <Link
              to="/payment"
              reloadDocument
              className="rounded-lg bg-green-600 w-full py-2 px-5 flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">Try Again</span>
            </Link>
            <p className="text-center">or</p>
            <Link
              to="/"
              className="rounded-lg bg-black w-full py-2 px-5 flex items-center justify-center"
              reloadDocument
            >
              <span className="text-white font-bold text-xl">
                Return to Home
              </span>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="min-h-screen bg-slate-100 py-20 px-5">
        <div className="absolute top-0 left-0 p-5 z-10">
          <button>
            <Menu
              size={24}
              color="black"
              onClick={() => setShowSidebar(true)}
            />
          </button>
        </div>
        {showSidebar ? <Sidebar onClose={() => setShowSidebar(false)} /> : null}
        <h2 className="text-4xl font-bold text-center pb-10">Make a payment</h2>
        <p className="mx-auto max-w-lg">
          We accept Paypal, Venmo, or CashApp. If paying with Venmo or CashApp,
          please include your name and the date of your service in the "memo"
          section.
        </p>
        {!amount ? (
          <>
            <p className="mx-auto max-w-lg mt-10">
              If you are paying via <span className="underline">Paypal</span> or{" "}
              <span className="underline">Debit / Credit Card</span>, please
              enter the payment amount in the box below.
            </p>
            <div className="w-full max-w-lg mx-auto">
              <input
                type="number"
                value={userSelectedAmount}
                onChange={(e) =>
                  setUserSelectedAmount(parseInt(e.target.value))
                }
                className="rounded-lg border-2 border-slate-300 w-full py-2 px-3 mt-5"
              />
            </div>
            {userSelectedAmount > 0 ? (
              <div className="w-full max-w-lg mx-auto mt-5">
                <Link
                  to={`/payment?amount=${userSelectedAmount}`}
                  className="rounded-lg bg-black w-full py-2 px-5 flex items-center justify-center"
                  reloadDocument
                >
                  <span className="text-white font-bold text-xl">
                    Confirm Amount
                  </span>
                </Link>
              </div>
            ) : null}
          </>
        ) : null}
        <div className="flex flex-col gap-y-6 pt-16 mx-auto max-w-lg relative z-10">
          <PayPalScriptProvider options={{ "client-id": paypal_client_id }}>
            <PayPalButtons
              disabled={!amount}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: paymentAmount,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                return await actions.order?.capture().then((details) => {
                  setSuccess(true);
                });
              }}
              onError={(err) => {
                console.log("payment error", err);
                if (err.toString().includes("popup close")) return;
                setError(true);
                setErrorMessage(err.toString());
              }}
            />
          </PayPalScriptProvider>
          <a
            href="https://cash.app/$feedishswish"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-cashAppGreen w-full py-2 mb-4 px-5 flex items-center justify-center "
          >
            <img src="/images/cashapp.png" alt="CashApp" width={180} />
          </a>
          <a
            className="rounded-lg bg-venmoBlue w-full py-5 flex gap-x-5 items-center justify-center"
            href="https://venmo.com/u/Parker-Jones-89"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/Venmo_Logo_White.png" alt="Venmo" width={100} />
          </a>
        </div>
      </section>
    </>
  );
};

export default Payment;
