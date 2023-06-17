import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type LoaderData = {
  paypal_client_id: string;
};

export const loader: LoaderFunction = async () => {
  const paypal_client_id = process.env.PAYPAL_CLIENT_ID;
  return { paypal_client_id };
};

const Payment = () => {
  const { paypal_client_id } = useLoaderData<LoaderData>();

  return (
    <section className="h-screen bg-slate-100 py-10 px-5">
      <h2 className="text-4xl font-bold text-center pb-10">Make a payment</h2>
      <p className="mx-auto max-w-lg">
        We accept Paypal, Venmo, or CashApp. If paying with Venmo or CashApp,
        please include your name and the date of your service in the "memo"
        section.
      </p>
      <div className="flex flex-col gap-y-6 pt-16 mx-auto max-w-lg">
        <PayPalScriptProvider options={{ "client-id": paypal_client_id }}>
          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "1.99",
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              return actions.order
                ? await actions.order.capture().then((details) => {
                    const name = details.payer.name?.given_name;
                    alert(`Transaction completed by ${name}`);
                  })
                : alert("Something went wrong, please try again");
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
  );
};

export default Payment;
