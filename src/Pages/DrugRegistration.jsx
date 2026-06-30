import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdOutlineInventory2,
  MdShield,
  MdVerifiedUser,
  MdRefresh,
  MdCheckCircle,
  MdArrowForward,
  MdCalendarToday,
  MdLocationOn,
  MdBusiness,
  MdNumbers,
  MdAttachMoney,
  MdDescription,
  MdQrCode2,
  MdLock,
  MdSecurity,
  MdCloudUpload,
  MdClose,
  MdErrorOutline,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { RiShieldCheckFill, RiMedicineBottleLine } from "react-icons/ri";
import { BiNetworkChart, BiPackage } from "react-icons/bi";
import { FaCube, FaQrcode } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import Layout from "../components/layout/Layout";
import toast from "react-hot-toast";

/* ─── tiny design tokens ─────────────────────────────────── */
const CYAN = "#00e5ff";
const GLOW_CYAN = "rgba(0,229,255,0.18)";

/* ─── reusable atoms ─────────────────────────────────────── */
const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase mb-1.5">
    {children}
    {required && <span className="text-cyan-400 ml-1">*</span>}
  </label>
);

const inputBase =
  "w-full bg-[#0b1628]/80 border border-cyan-500/15 text-white text-sm rounded-xl px-4 py-2.5 " +
  "placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 " +
  "focus:shadow-[0_0_16px_rgba(0,229,255,0.12)] transition-all duration-200";

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && (
      <Icon
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-500/50 pointer-events-none"
      />
    )}
    <input {...props} className={`${inputBase} ${Icon ? "pl-9" : ""} ${props.className ?? ""}`} />
  </div>
);

const Textarea = ({ maxLen, value, onChange, ...props }) => (
  <div className="relative">
    <textarea
      {...props}
      value={value}
      onChange={onChange}
      maxLength={maxLen}
      rows={4}
      className={`${inputBase} resize-none`}
    />
    {maxLen && (
      <span className="absolute bottom-2.5 right-3 text-[10px] text-gray-600">
        {value.length} / {maxLen}
      </span>
    )}
  </div>
);

/* disabled / read-only pill input (filled from req.user) */
const ReadonlyInput = ({ icon: Icon, value }) => (
  <div className="relative">
    {Icon && (
      <Icon
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/50 pointer-events-none"
      />
    )}
    <div
      className="w-full bg-[#0d0f2a]/70 border border-purple-500/15 text-gray-300 text-sm rounded-xl px-4 py-2.5 pl-9
        cursor-not-allowed select-none"
    >
      {value}
    </div>
    <MdLock
      size={12}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400/40"
    />
  </div>
);

/* collapsible section card */
const Section = ({ icon: Icon, title, subtitle, accent = "cyan", children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  const color = accent === "purple" ? "text-purple-400" : "text-cyan-400";
  const border = accent === "purple" ? "border-purple-500/15" : "border-cyan-500/15";
  const glow = accent === "purple" ? "rgba(139,92,246,0.08)" : "rgba(0,229,255,0.06)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border ${border} bg-[#060f1e]/80 backdrop-blur-xl overflow-hidden`}
      style={{ boxShadow: `0 0 40px ${glow}` }}
    >
      <button

            type="button"

            onClick={() => setOpen((o) => !o)}

            className="
                w-full
                flex
                items-start
                justify-between
                p-5
                text-left
            "
        >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              accent === "purple" ? "bg-purple-500/10 text-purple-400" : "bg-cyan-500/10 text-cyan-400"
            }`}
          >
            <Icon size={18} />
          </div>
          <div>
            <p className={`font-semibold text-sm ${color}`}>{title}</p>
            <p className="text-gray-500 text-xs mt-0.5">{subtitle}</p>
          </div>
        </div>
        {open ? (
          <MdKeyboardArrowUp size={20} className="text-gray-500 mt-0.5 shrink-0" />
        ) : (
          <MdKeyboardArrowDown size={20} className="text-gray-500 mt-0.5 shrink-0" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* process step */
const ProcessStep = ({ icon: Icon, label, active }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
        active
          ? "border-cyan-400 bg-cyan-400/15 text-cyan-400 shadow-[0_0_16px_rgba(0,229,255,0.4)]"
          : "border-purple-500/40 bg-purple-500/10 text-purple-400"
      }`}
    >
      <Icon size={20} />
    </div>
    <span className="text-[10px] text-center text-gray-400 leading-tight max-w-[56px]">{label}</span>
  </div>
);

/* ─── main component ─────────────────────────────────────── */
const initialForm = {

  name: "",

  batchNumber: "",

  expiryDate: "",

  quantity: "",

  unitPrice: "",

  description: "",

  manufacturerLocation: "",

  notes: ""
};

/* mock authenticated user — filled by backend in real app */
const mockUser = {
  manufacturerName: "Gagan Pharma Pvt Ltd",
  licenseNumber: "LIC001",
  location: "Bangalore, India",
};
import { useDispatch } from "react-redux";

import { registerDrug } from "../Redux/Slices/DrugSlice";



export default function DrugRegistration() {
  const dispatch=useDispatch()
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef();

  const handleUserInput = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({

        ...prev,

        [name]: value

    }));
};

  const handleUserSubmit = async (e) => {

      e.preventDefault();



      // validation
      if (

          !form.name ||

          !form.batchNumber ||

          !form.expiryDate ||

          !form.quantity ||

          !form.unitPrice ||

          !form.description
      ) {

          toast.error(
              "All required fields are mandatory"
          );

          return;
      }



      // payload
      const payload = {

          name: form.name,

          batchNumber: form.batchNumber,

          expiryDate: form.expiryDate,

          quantity: Number(form.quantity),

          unitPrice: Number(form.unitPrice),

          description: form.description,

          manufacturerLocation:
              mockUser.location
      };



      console.log(
          "Sending payload:",
          payload
      );



      // dispatch thunk
      const response =
          await dispatch(
              registerDrug(payload)
          );



      console.log(
          "Drug registration response:",
          response
      );



      // success
      if (
          response.payload?.success
      ) {

          toast.success(
              "Drug registered successfully"
          );



          // reset form
          setForm(initialForm);

          setImage(null);

          setImagePreview(null);

          setSubmitted(true);
      }

      // error
      else {

          toast.error(

              response.payload?.message ||

              "Drug registration failed"
          );
      }
  };


  const handleReset = () => {
    setForm(initialForm);
    setImage(null);
    setImagePreview(null);
    setSubmitted(false);
  };

  const handleRegister = () => setSubmitted(true);

  /* image helpers */
  const processFile = useCallback((file) => {
    if (!file || !file.type.match(/image\/(jpeg|png|webp)/)) return;
    if (file.size > 5 * 1024 * 1024) return; // 5 MB guard
    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  /* derived */
  const estimatedValue =
    parseFloat(form.quantity || 0) * parseFloat(form.unitPrice || 0);

  const fmtINR = (n) =>
    n > 0
      ? "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2 })
      : "—";

  const summaryRows = [
    { label: "Drug Name",    val: form.drugName    || "—" },
    { label: "Batch Number", val: form.batchNumber || "—" },
    { label: "Expiry Date",  val: form.expiryDate  || "—" },
    { label: "Quantity",     val: form.quantity ? `${form.quantity} Units` : "—" },
    { label: "Unit Price",   val: form.unitPrice ? `₹${parseFloat(form.unitPrice).toFixed(2)}` : "—" },
  ];

  /* ── render ─────────────────────────────────────────────── */
  return (
    <Layout>
        <div className="min-h-screen bg-[#020817] text-white relative overflow-x-hidden">
        {/* ambient glows */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
            <div className="absolute top-0 left-[30%] w-[500px] h-[500px] bg-cyan-500/5 blur-[160px]" />
            <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-purple-600/6 blur-[140px]" />
        </div>

        {/* ── content ── */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-8">

            {/* page header */}
            <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
            >
            <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Drug Registration
                </h1>
                <span className="text-xs font-semibold px-3 py-1 rounded-full border border-cyan-400/25 bg-cyan-400/8 text-cyan-300">
                Register new pharmaceutical product
                </span>
            </div>
            <p className="text-gray-500 text-sm">
                Fill in the details below to register a new drug in the blockchain‑based supply chain
            </p>
            </motion.div>

            {/* ── grid ── */}
            <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">

            {/* ══════════════ LEFT ══════════════ */}
            <form onSubmit={handleUserSubmit}>
                <div className="flex flex-col gap-5">

                    {/* 1 · Drug Information */}
                    <Section
                    icon={MdOutlineInventory2}
                    title="Drug Information"
                    subtitle="Basic information about the pharmaceutical product"
                    >
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                        <Label required>Drug Name</Label>
                        <Input
                            icon={RiMedicineBottleLine}
                            name="name"
                            placeholder="e.g. Amoxicillin 250mg"
                            value={form.name}
                            onChange={handleUserInput}
                        />
                        </div>
                        <div>
                        <Label required>Batch Number</Label>
                        <Input
                            icon={MdShield}
                            name="batchNumber"
                            placeholder="e.g. BATCH-2026-001"
                            value={form.batchNumber}
                            onChange={handleUserInput}
                        />
                        </div>
                        <div>
                        <Label required>Expiry Date</Label>
                        <Input
                            icon={MdCalendarToday}
                            type="date"
                            name="expiryDate"
                            value={form.expiryDate}
                            onChange={handleUserInput}
                            className="[color-scheme:dark]"
                        />
                        </div>
                        <div>
                        <Label required>Quantity</Label>
                        <div className="flex gap-2">
                            <Input
                            icon={MdNumbers}
                            type="number"
                            name="quantity"
                            placeholder="500"
                            value={form.quantity}
                            onChange={handleUserInput}
                            className="flex-1"
                            />
                            <div className="flex items-center px-3 rounded-xl border border-cyan-500/15 bg-[#0b1628]/80 text-gray-400 text-sm shrink-0">
                            Units
                            </div>
                        </div>
                        </div>
                        <div>
                        <Label required>Unit Price (₹)</Label>
                        <div className="relative">
                            <Input
                            icon={MdAttachMoney}
                            type="number"
                            name="unitPrice"
                            placeholder="45"
                            value={form.unitPrice}
                            onChange={handleUserInput}
                            />
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                        </div>
                        </div>
                        <div>
                        <Label required>Description</Label>
                        <div className="relative">
                            <textarea
                            name="description"
                            value={form.description}
                            onChange={handleUserInput}
                            maxLength={200}
                            rows={3}
                            placeholder="Brief drug description..."
                            className={`${inputBase} resize-none`}
                            />
                            <span className="absolute bottom-2 right-3 text-[10px] text-gray-600">
                            {form.description.length} / 200
                            </span>
                        </div>
                        </div>
                    </div>
                    </Section>

                    {/* 2 · Manufacturer Information */}
                    <Section
                    
                    icon={MdBusiness}
                    title="Manufacturer Information"
                    subtitle="Details of the drug manufacturer"
                    accent="purple"
                    >
                    <div className="mb-3 flex items-center gap-2 text-[11px] text-purple-300/70 bg-purple-500/8 border border-purple-500/15 rounded-xl px-3 py-2">
                        <MdLock size={13} />
                        Auto‑filled from your authenticated account — read only
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                        <Label>Manufacturer Name</Label>
                        <ReadonlyInput icon={MdBusiness} value={mockUser.manufacturerName} />
                        </div>
                        <div>
                        <Label>License Number</Label>
                        <ReadonlyInput icon={MdShield} value={mockUser.licenseNumber} />
                        </div>
                        <div>
                        <Label>Manufacturer Location</Label>
                        <ReadonlyInput icon={MdLocationOn} value={mockUser.location} />
                        </div>
                    </div>
                    </Section>

                    {/* 3 · Additional Information */}
                    <Section
                    icon={MdDescription}
                    title="Additional Information"
                    subtitle="Any additional notes or details about the product"
                    defaultOpen
                    >
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                        <Label>Additional Notes</Label>
                        <Textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleUserInput}
                            maxLen={300}
                            placeholder="Enter any additional information..."
                        />
                        </div>

                        {/* drag & drop */}
                        <div>
                        <Label>Upload Drug Image (Optional)</Label>
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={onDrop}
                            onClick={() => fileRef.current?.click()}
                            className={`
                            relative h-[120px] rounded-xl border-2 border-dashed cursor-pointer
                            flex flex-col items-center justify-center gap-1.5 text-center transition-all duration-300
                            ${dragging
                                ? "border-cyan-400 bg-cyan-400/8 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                                : "border-cyan-500/20 bg-[#0b1628]/60 hover:border-cyan-400/40 hover:bg-cyan-400/5"}
                            `}
                        >
                            <input
                            ref={fileRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => processFile(e.target.files[0])}
                            />

                            {imagePreview ? (
                                <>
                                    <img
                                        src={imagePreview}
                                        alt="preview"
                                        className="
                                            absolute
                                            inset-0
                                            w-full
                                            h-full
                                            object-cover
                                            rounded-xl
                                            opacity-40
                                        "
                                    />

                                    <div className="relative z-10 flex flex-col items-center gap-1">

                                        <MdCheckCircle
                                            size={22}
                                            className="text-cyan-400"
                                        />

                                        <span className="text-xs text-cyan-300">
                                            {image?.name}
                                        </span>

                                        {/* UPDATED BUTTON */}
                                        <button
                                            type="button"
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                setImage(null);

                                                setImagePreview(null);
                                            }}

                                            className="
                                                text-[10px]
                                                text-red-400
                                                hover:text-red-300
                                                flex
                                                items-center
                                                gap-1
                                            "
                                        >

                                            <MdClose size={12} />

                                            Remove

                                        </button>

                                    </div>
                                </>
                                ) : (
                                <>
                                    <MdCloudUpload
                                        size={28}
                                        className="text-cyan-400/60"
                                    />

                                    <p className="text-sm text-gray-400">
                                        Drag & drop image here
                                    </p>

                                    <p
                                        className="
                                            text-[11px]
                                            text-cyan-400/70
                                            underline
                                            underline-offset-2
                                        "
                                    >
                                        or click to browse
                                    </p>

                                    <p className="text-[10px] text-gray-600">
                                        JPG, PNG or WEBP (max. 5MB)
                                    </p>
                                </>
                                )}
                        </div>
                        </div>
                    </div>
                    </Section>

                    {/* action buttons */}
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-3 justify-end pt-1"
                    >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-500/20
                        bg-white/4 hover:bg-white/8 text-gray-300 hover:text-white text-sm font-semibold
                        transition-all duration-200"
                    >
                        <MdRefresh size={17} />
                        Reset Form
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(0,229,255,0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="flex items-center gap-2 px-8 py-3 rounded-xl
                        bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm
                        transition-all duration-200 shadow-[0_0_18px_rgba(0,229,255,0.25)]"
                    >
                        <HiOutlineSparkles size={17} />
                        Register Drug
                        <MdArrowForward size={15} />
                    </motion.button>
                    </motion.div>

                    {/* success banner */}
                    <AnimatePresence>

                        {submitted && (

                            <motion.div

                                initial={{
                                    opacity: 0,
                                    y: 10
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}

                                exit={{
                                    opacity: 0
                                }}

                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-green-500/25
                                    bg-green-500/8
                                    px-4
                                    py-3
                                "
                            >

                                <MdCheckCircle
                                    size={20}
                                    className="text-green-400 shrink-0"
                                />

                                <div>

                                    <p className="text-sm font-semibold text-green-300">
                                        Drug registered successfully!
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Blockchain transaction queued —
                                        you'll receive a confirmation shortly.
                                    </p>

                                </div>

                                {/* UPDATED BUTTON */}
                                <button

                                    type="button"

                                    onClick={() =>
                                        setSubmitted(false)
                                    }

                                    className="
                                        ml-auto
                                        text-gray-500
                                        hover:text-gray-300
                                    "
                                >

                                    <MdClose size={16} />

                                </button>

                            </motion.div>
                        )}

                        </AnimatePresence>
                </div>
            </form>

            {/* ══════════════ RIGHT ══════════════ */}
            <div className="flex flex-col gap-5 lg:sticky lg:top-6">

                {/* Drug Preview Card */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl border border-cyan-500/15 bg-[#060f1e]/90 backdrop-blur-xl overflow-hidden"
                style={{ boxShadow: "0 0 40px rgba(0,229,255,0.06)" }}
                >
                {/* header */}
                <div className="px-5 pt-5 pb-3 border-b border-cyan-500/10 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <BiPackage size={16} className="text-cyan-400" />
                    </div>
                    <div>
                    <p className="text-sm font-semibold text-white">Drug Preview</p>
                    <p className="text-[11px] text-gray-500">Live preview of the drug information</p>
                    </div>
                </div>

                <div className="p-5 flex gap-4">
                    {/* mockup box */}
                    <div
                    className="shrink-0 w-[110px] h-[110px] rounded-2xl flex flex-col items-center justify-center
                        border border-cyan-500/20 bg-gradient-to-b from-[#0d1f3c] to-[#07111e]
                        shadow-[0_0_30px_rgba(0,229,255,0.15)] relative overflow-hidden"
                    >
                    {imagePreview ? (
                        <img src={imagePreview} alt="drug" className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                        <>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
                        <RiMedicineBottleLine size={32} className="text-cyan-400/70 relative z-10" />
                        <p className="text-[9px] text-cyan-300/60 mt-1 relative z-10 text-center px-1 leading-tight">
                            {form.drugName || "Drug Name"}
                        </p>
                        {/* glow ring */}
                        <div className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-16 h-6 bg-cyan-400/30 blur-xl rounded-full" />
                        </>
                    )}
                    </div>

                    {/* details */}
                    <div className="flex-1 min-w-0 space-y-2.5">
                    {[
                        { icon: RiMedicineBottleLine, label: "Drug Name",    val: form.drugName    || "—" },
                        { icon: MdNumbers,            label: "Batch Number", val: form.batchNumber || "—" },
                        { icon: MdCalendarToday,      label: "Expiry Date",  val: form.expiryDate  || "—" },
                        { icon: BiPackage,            label: "Quantity",     val: form.quantity ? `${form.quantity} Units` : "—" },
                        { icon: MdAttachMoney,        label: "Unit Price",   val: form.unitPrice ? `₹${parseFloat(form.unitPrice).toFixed(2)}` : "—" },
                    ].map(({ icon: Icon, label, val }) => (
                        <div key={label} className="flex items-start gap-2">
                        <Icon size={13} className="text-cyan-500/50 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                            <p className="text-[10px] text-gray-600 leading-none">{label}</p>
                            <p className="text-xs text-white font-medium truncate mt-0.5">{val}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </motion.div>

                {/* Registration Summary */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22 }}
                className="rounded-2xl border border-cyan-500/15 bg-[#060f1e]/90 backdrop-blur-xl overflow-hidden"
                style={{ boxShadow: "0 0 40px rgba(0,229,255,0.05)" }}
                >
                <div className="px-5 pt-4 pb-3 border-b border-cyan-500/10 flex items-center gap-2">
                    <RiShieldCheckFill size={16} className="text-cyan-400" />
                    <p className="text-sm font-semibold text-white">Registration Summary</p>
                </div>
                <div className="px-5 py-4 space-y-2.5">
                    {summaryRows.map(({ label, val }) => (
                    <div key={label} className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">{label}</span>
                        <span className="text-white font-medium text-right max-w-[55%] truncate">{val}</span>
                    </div>
                    ))}
                    <div className="pt-2 mt-1 border-t border-cyan-500/10 flex justify-between items-center">
                    <span className="text-xs font-semibold text-cyan-400">Estimated Value</span>
                    <span
                        className="text-base font-bold text-cyan-400"
                        style={{ textShadow: "0 0 12px rgba(0,229,255,0.5)" }}
                    >
                        {fmtINR(estimatedValue)}
                    </span>
                    </div>
                </div>
                </motion.div>

                {/* Registration Process */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.29 }}
                className="rounded-2xl border border-purple-500/15 bg-[#060f1e]/90 backdrop-blur-xl overflow-hidden"
                style={{ boxShadow: "0 0 40px rgba(139,92,246,0.06)" }}
                >
                <div className="px-5 pt-4 pb-3 border-b border-purple-500/10 flex items-center gap-2">
                    <MdShield size={16} className="text-purple-400" />
                    <div>
                    <p className="text-sm font-semibold text-white">Registration Process</p>
                    <p className="text-[10px] text-gray-500">Steps after successful registration</p>
                    </div>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                    <ProcessStep icon={BiNetworkChart} label="Blockchain Registration" active />
                    <MdArrowForward size={14} className="text-gray-700 shrink-0" />
                    <ProcessStep icon={MdQrCode2} label="QR Code Generation" active={false} />
                    <MdArrowForward size={14} className="text-gray-700 shrink-0" />
                    <ProcessStep icon={MdVerifiedUser} label="Verification Enabled" active={false} />
                    <MdArrowForward size={14} className="text-gray-700 shrink-0" />
                    <ProcessStep icon={FaCube} label="Supply Chain Tracking" active={false} />
                </div>
                </motion.div>

                {/* Security Card */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.36 }}
                className="rounded-2xl border border-cyan-500/10 bg-[#060f1e]/90 backdrop-blur-xl overflow-hidden relative"
                style={{ boxShadow: "0 0 40px rgba(0,229,255,0.04)" }}
                >
                {/* bg shield */}
                <div className="absolute bottom-0 right-0 opacity-10">
                    <MdSecurity size={110} className="text-cyan-400" />
                </div>

                <div className="px-5 pt-4 pb-3 border-b border-cyan-500/10 flex items-center gap-2">
                    <MdLock size={16} className="text-cyan-400" />
                    <div>
                    <p className="text-sm font-semibold text-white">Security &amp; Integrity</p>
                    <p className="text-[10px] text-gray-500">All data is secured and immutable</p>
                    </div>
                </div>

                <div className="px-5 py-4 space-y-2.5 relative z-10">
                    {[
                    "Data encrypted and stored securely",
                    "Blockchain verified and tamper-proof",
                    "QR code for product authentication",
                    "End-to-end supply chain visibility",
                    ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-xs text-gray-400">
                        <MdCheckCircle size={15} className="text-green-400 shrink-0" />
                        {item}
                    </div>
                    ))}
                </div>
                </motion.div>

            </div>
            </div>
        </div>
        </div>
    </Layout>
  );
}