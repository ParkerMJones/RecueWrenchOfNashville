import { Link } from "@remix-run/react";
import { Home, CreditCard, X, Phone } from "react-feather";
import { Wrench } from "~/icons/wrench";

const navigation = [
  { name: "Home", href: "/", icon: <Home color="white" size={24} /> },
  {
    name: "Make a Payment",
    href: "/payment",
    icon: <CreditCard color="white" size={24} />,
  },
  {
    name: "Contact Us",
    href: "/#contact",
    icon: <Phone color="white" size={24} />,
  },
];

export default function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-20 backdrop-brightness-50">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 py-5 px-6 w-72 h-full">
        <div className="flex h-16 shrink-0 items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Wrench />
            <p className="text-white text-xl">Rescue Wrench</p>
          </div>
          <button onClick={onClose}>
            <X size={24} color="white" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul className="-mx-2 space-y-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-indigo-200 hover:text-white hover:bg-indigo-700',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    "
                      onClick={onClose}
                    >
                      <div
                        className="text-indigo-200 group-hover:text-white
                        h-6 w-6 shrink-0"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </div>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
