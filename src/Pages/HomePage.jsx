import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  MdVerifiedUser,
  MdOutlineInventory2,
  MdCheckCircle,
  MdArrowForward,
  MdArrowBack,
  MdShield,
} from "react-icons/md";

import { FaCube } from "react-icons/fa";
import { BiNetworkChart } from "react-icons/bi";
import { RiShieldCheckFill } from "react-icons/ri";
import Layout from "../components/layout/Layout";

const medicines = [
  {
    name: "Paracetamol 500mg",
    type: "Pain Reliever / Fever Reducer",
    count: "10 Strip Tablets",
    id: "DRG-2026-0001",
    accent: "#00e5ff",
    glow: "rgba(0,229,255,0.4)",
    pills: "bg-white",
  },
  {
    name: "Amoxicillin 250mg",
    type: "Antibiotic / Infection",
    count: "10 Capsules",
    id: "DRG-2026-0002",
    accent: "#ff7b00",
    glow: "rgba(255,123,0,0.4)",
    pills: "bg-orange-400",
  },
  {
    name: "Ibuprofen 400mg",
    type: "Anti Inflammatory",
    count: "10 Tablets",
    id: "DRG-2026-0003",
    accent: "#9b5cff",
    glow: "rgba(155,92,255,0.4)",
    pills: "bg-purple-300",
  },
  {
    name: "Vitamin D3 1000IU",
    type: "Nutritional Supplement",
    count: "30 Soft Gel Capsules",
    id: "DRG-2026-0004",
    accent: "#ffd600",
    glow: "rgba(255,214,0,0.4)",
    pills: "bg-yellow-300",
  },
];

const BlockchainCard = () => {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
      className="absolute top-2 right-2 z-30 bg-[#071626]/95 border border-cyan-400/30 rounded-2xl px-5 py-4 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.12)]"
    >
      <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm">
        <BiNetworkChart />
        BLOCKCHAIN TRANSACTION
      </div>

      <div className="flex items-center gap-2 mt-3 text-green-400 text-sm">
        <MdCheckCircle />
        Verified & Recorded
      </div>

      <div className="text-gray-400 text-sm mt-3">
        Block:
        <span className="text-white ml-2">
          #452134
        </span>
      </div>

      <div className="text-gray-400 text-sm mt-1">
        Time:
        <span className="text-white ml-2">
          27/06/2026 11:30 AM
        </span>
      </div>
    </motion.div>
  );
};

const MedicineCard = ({ medicine }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="relative w-[520px] max-w-full rounded-[30px] border overflow-hidden"
        style={{
          borderColor: medicine.accent,
          boxShadow: `0 0 40px ${medicine.glow}`,
          background:
            "linear-gradient(135deg, rgba(30,30,40,0.95), rgba(10,15,25,0.98))",
        }}
      >
        <BlockchainCard />

        <div className="p-8">
          <div
            className="uppercase tracking-widest text-sm font-semibold mb-3"
            style={{ color: medicine.accent }}
          >
            Scan To Verify
          </div>

          <h2 className="text-4xl font-bold text-white">
            {medicine.name}
          </h2>

          <p className="text-gray-400 mt-2 text-lg">
            {medicine.type}
          </p>

          <p className="text-gray-500 mt-1">
            {medicine.count}
          </p>

          {/* pills */}
          <div className="flex gap-3 mt-10">
            {[1, 2, 3, 4, 5].map((pill) => (
              <div
                key={pill}
                className={`w-12 h-6 rounded-full ${medicine.pills}`}
              />
            ))}
          </div>

          {/* bottom */}
          <div className="flex justify-between items-end mt-14">
            <div>
              <p className="text-gray-500 text-sm">
                Drug ID
              </p>

              <p className="text-white font-mono">
                {medicine.id}
              </p>
            </div>

            {/* fake qr */}
            <div className="grid grid-cols-2 gap-1 bg-[#020817] p-3 rounded-lg">
              <div
                className="w-5 h-5 border-2 rounded-sm"
                style={{
                  borderColor: medicine.accent,
                }}
              />

              <div
                className="w-5 h-5 border-2 rounded-sm"
                style={{
                  borderColor: medicine.accent,
                }}
              />

              <div
                className="w-5 h-5 border-2 rounded-sm"
                style={{
                  borderColor: medicine.accent,
                }}
              />
            </div>
          </div>
        </div>

        {/* glow */}
        <div
          className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[70%] h-16 blur-[70px]"
          style={{
            background: medicine.glow,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % medicines.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0
        ? medicines.length - 1
        : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* floating cubes */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute top-[-50px] right-[100px] text-cyan-400/20"
      >
        <FaCube size={45} />
      </motion.div>

      {/* left arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-[-60px] z-30 text-cyan-400"
      >
        <MdArrowBack size={28} />
      </button>

      {/* card */}
      <AnimatePresence mode="wait">
        <MedicineCard
          key={medicines[current].id}
          medicine={medicines[current]}
        />
      </AnimatePresence>

      {/* right arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-[-60px] z-30 text-cyan-400"
      >
        <MdArrowForward size={28} />
      </button>
    </div>
  );
};

export default function HomePage() {
   
  return (
   
    <Layout>
        <div className="min-h-screen bg-[#020817] overflow-hidden text-white">
        {/* background glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px]" />

            <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-blue-500/10 blur-[140px]" />
        </div>

        <section className="relative z-10 max-w-7xl mx-auto px-2 lg:px-4 py-6 min-h-screen">
            {/* HERO */}
            <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[5vh]">
            {/* LEFT */}
            <div>
                <div className="inline-flex items-center gap-2 border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 px-5 py-2 rounded-full text-sm font-medium mb-8">
                <RiShieldCheckFill />
                Secure. Transparent. Trustworthy.
                </div>

                <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight">
                Building Trust in{" "}
                <span className="text-cyan-400">
                    Every Medicine.
                </span>
                <br />
                Every Step. Every Time.
                </h1>

                <p className="mt-8 text-gray-400 text-xl leading-relaxed max-w-xl">
                PharmaTrack leverages Blockchain and AI to ensure transparency,
                detect anomalies, and deliver safe verified medicines.
                </p>

                <div className="flex gap-5 mt-10">
                <button className="bg-cyan-400 hover:bg-cyan-300 transition-all text-black px-8 py-4 rounded-2xl flex items-center gap-2 font-semibold text-lg">
                    <MdVerifiedUser />
                    Verify a Drug
                </button>

                <button className="border border-cyan-400/30 bg-white/5 hover:bg-white/10 transition-all px-8 py-4 rounded-2xl flex items-center gap-2 font-semibold text-lg">
                    <MdOutlineInventory2 />
                    Register a Drug
                </button>
                </div>
            </div>

            {/* RIGHT */}
            <div className="relative flex justify-center">
                <HeroCarousel />
            </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
                {
                title: "End-to-End Traceability",
                desc: "Track medicines at every step",
                icon: <MdOutlineInventory2 size={34} />,
                },
                {
                title: "Blockchain Security",
                desc: "Immutable blockchain records",
                icon: <MdShield size={34} />,
                },
                {
                title: "QR Verification",
                desc: "Instant authenticity checks",
                icon: <FaCube size={30} />,
                },
                {
                title: "AI Insights",
                desc: "Detect counterfeit anomalies",
                icon: <BiNetworkChart size={32} />,
                },
            ].map((item, index) => (
                <motion.div
                key={index}
                whileHover={{
                    y: -10,
                    scale: 1.02,
                }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-[32px] border border-cyan-500/10 bg-gradient-to-br from-[#091225] to-[#0b1730] p-8 shadow-[0_0_40px_rgba(0,255,255,0.03)]"
                >
                {/* glow */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.08),transparent_50%)]" />

                {/* icon */}
                <div className="w-20 h-20 rounded-3xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                    {item.icon}
                </div>

                {/* title */}
                <h3 className="mt-8 text-3xl font-bold text-white leading-tight">
                    {item.title}
                </h3>

                {/* desc */}
                <p className="mt-6 text-gray-400 text-xl leading-relaxed">
                    {item.desc}
                </p>
                </motion.div>
            ))}
            </div>
        </section>
        </div>
    </Layout>
  );
}