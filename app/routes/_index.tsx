import type { V2_MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { ChevronDown, Menu } from "react-feather";
import { Carousel } from "~/components/Carousel";
import { Testimonial } from "~/components/Testimonial";
import testimonials from "~/data/testimonials";
import Sidebar from "~/components/Sidebar";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import Modal from "~/components/Modal";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Rescue Wrench" }];
};

export default function Index() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);

  return (
    <main>
      <div className="absolute top-0 left-0 p-5 z-10">
        <button>
          <Menu size={24} color="white" onClick={() => setShowSidebar(true)} />
        </button>
      </div>
      {showSidebar ? <Sidebar onClose={() => setShowSidebar(false)} /> : null}
      <section>
        <div className="w-screen h-screen relative">
          <img
            src="/images/jeep.jpg"
            alt="Jeep"
            className="w-full h-full object-cover shadow-inner absolute top-0 left-0 brightness-50"
          />
          <div className="w-full h-full flex flex-col justify-between py-20 items-center">
            <div className="z-10">
              <h1 className="text-4xl text-white text-center font-bold pt-10">
                Rescue Wrench
              </h1>
              <h3 className="text-3xl text-white text-center">of Nashville</h3>
            </div>
            <Carousel />
            {isMobile ? (
              <button
                onClick={() => setShowPhoneOptions(true)}
                className="bg-red-400 text-white font-bold text-2xl rounded-lg p-4 z-10"
              >
                Call to book an appointment
              </button>
            ) : (
              <Link
                to="/#contact"
                className="bg-red-400 text-white font-bold text-2xl rounded-lg p-4 z-10"
              >
                Call to book an appointment
              </Link>
            )}
          </div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 10 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              repeatType: "reverse",
              type: "spring",
            }}
            className="w-full h-20 absolute bottom-0 left-0 flex justify-center items-center"
          >
            <ChevronDown size={30} color="white" />
          </motion.div>
        </div>
      </section>
      <section className="py-10 px-5">
        <h3 className="text-3xl md:text-4xl text-center">
          Why people love us...
        </h3>
        <div className="z-10 w-full max-w-5xl mx-auto h-full grid grid-cols-1 md:grid-cols-2 justify-items-center p-5 gap-y-5">
          {testimonials.map((testimonial) => (
            <Testimonial
              key={testimonial.id}
              name={testimonial.name}
              quote={testimonial.quote}
              truncated={false}
            />
          ))}
        </div>
      </section>
      <section className="pt-10 pb-40 px-8 bg-slate-50" id="contact">
        <div className="max-w-md mx-auto">
          <h3 className="text-3xl md:text-4xl text-center pb-10">About us</h3>
          <div className="flex flex-col">
            <p className="pb-16 leading-7">
              Rescue Wrench of Nashville is a mobile automobile repair service
              that comes to you, wherever you are within our radius. We service
              various problems and are always striving to get you back on the
              road and safe. Call us today to book an appointment!
            </p>
            <p className="text-2xl pb-4">Hours:</p>
            <div className="flex flex-col gap-y-1 ml-2">
              <p>Monday: Closed</p>
              <p>Tuesday - Saturday: 24 hours</p>
              <p>Sunday: 12:00 – 8:00 PM</p>
            </div>
            <p className="text-2xl pt-16 pb-4">Contact:</p>
            <div className="flex flex-col gap-y-2 ml-2">
              {isMobile ? (
                <p>
                  Phone (Call or Text):{" "}
                  <span
                    className="underline"
                    onClick={() => setShowPhoneOptions(true)}
                  >
                    (615) 388-0228
                  </span>
                </p>
              ) : (
                <p>Phone (Call or Text): (615) 388-0228</p>
              )}
              {/* <p>
                Email:{" "}
                <a
                  href="mailto:parker.matthewjones@gmail.com"
                  className="underline"
                >
                  parker.matthewjones@gmail.com
                </a>
              </p> */}
            </div>
          </div>
        </div>
      </section>
      <Modal
        open={showPhoneOptions}
        onClose={() => setShowPhoneOptions(false)}
      />
    </main>
  );
}
