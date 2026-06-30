import { motion } from "framer-motion";

import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlineIdentification,
  HiOutlineShieldCheck,
  HiOutlineCube,
} from "react-icons/hi";

import {
  MdOutlinePassword,
  MdArrowForward,
} from "react-icons/md";

import {
  RiShieldCheckFill,
  RiWallet3Line,
  RiBrainLine,
  RiQrCodeLine,
} from "react-icons/ri";
import Layout from "../components/layout/Layout";
import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/Slices/AuthSlice";


export default function RegisterPage() {
    const dispatch=useDispatch()
    const navigate = useNavigate()

    const [signUpState,setsignUpState]=useState({
        name:'',
        email:'',
        password:'',
        role:'',
        organizationName:'',
        licenseNumber:'',
        walletAddress:'',

    })
    function handleUserInput(e){
       const {name,value}=e.target
        setsignUpState({
            ...signUpState,
            [name]:value
        })
    }
    async function handleUserSubmit(e){

    e.preventDefault()

    console.log(signUpState)

    if(
        !signUpState.name ||
        !signUpState.email ||
        !signUpState.password ||
        !signUpState.licenseNumber ||
        !signUpState.organizationName ||
        !signUpState.role ||
        !signUpState.walletAddress
    ){
        toast.error("Missing the value from form")
        return
    }

    try{

        const apiresponse = await dispatch(
            createAccount(signUpState)
        )

        console.log("the api response is:", apiresponse)

        // SUCCESS
        if(apiresponse.payload?.success){

            toast.success("Account Created Successfully")

            // clear form
            setsignUpState({
                name:'',
                email:'',
                password:'',
                role:'',
                organizationName:'',
                licenseNumber:'',
                walletAddress:'',
            })

            // redirect to login page
            navigate('/login')
        }

        // FAILURE
        else{

            toast.error(
                apiresponse.payload?.message ||
                "Failed to create account"
            )
        }

    }
    catch(error){

        toast.error("Something went wrong")
    }
}
  return (
    <Layout>
        <div className="min-h-screen bg-[#020817] overflow-hidden relative">
        {/* background glow */}
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px]" />

            <div className="absolute bottom-20 right-20 w-[350px] h-[350px] bg-blue-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 py-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[85vh]">
            {/* LEFT SECTION */}
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="hidden lg:block"
            >
                {/* badge */}
                <div className="inline-flex items-center gap-2 border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 px-5 py-2 rounded-full text-sm font-medium mb-10">
                <RiShieldCheckFill />
                Secure. Transparent. Trustworthy.
                </div>

                {/* icon */}
                <div className="mb-10">
                <div className="w-32 h-32 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,255,0.15)]">
                    <RiShieldCheckFill
                    size={60}
                    className="text-cyan-400"
                    />
                </div>
                </div>

                {/* heading */}
                <h1 className="text-6xl font-extrabold leading-tight text-white">
                Create Your Account
                <br />
                Join{" "}
                <span className="text-cyan-400">
                    PharmaTrack
                </span>
                </h1>

                {/* description */}
                <p className="mt-8 text-gray-400 text-2xl leading-relaxed max-w-xl">
                Be a part of the trusted pharmaceutical ecosystem secured by
                Blockchain and AI.
                </p>

                {/* features */}
                <div className="mt-12 space-y-8">
                {/* item */}
                <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <HiOutlineShieldCheck size={28} />
                    </div>

                    <div>
                    <h3 className="text-white text-2xl font-semibold">
                        Secure & Reliable
                    </h3>

                    <p className="text-gray-400 text-lg mt-1">
                        Blockchain ensures data integrity
                    </p>
                    </div>
                </div>

                {/* item */}
                <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <HiOutlineCube size={26} />
                    </div>

                    <div>
                    <h3 className="text-white text-2xl font-semibold">
                        End-to-End Traceability
                    </h3>

                    <p className="text-gray-400 text-lg mt-1">
                        Track medicines at every step
                    </p>
                    </div>
                </div>

                {/* item */}
                <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <RiBrainLine size={26} />
                    </div>

                    <div>
                    <h3 className="text-white text-2xl font-semibold">
                        AI-Powered Insights
                    </h3>

                    <p className="text-gray-400 text-lg mt-1">
                        Detect anomalies and ensure safety
                    </p>
                    </div>
                </div>

                {/* item */}
                <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <RiQrCodeLine size={26} />
                    </div>

                    <div>
                    <h3 className="text-white text-2xl font-semibold">
                        Instant Verification
                    </h3>

                    <p className="text-gray-400 text-lg mt-1">
                        Verify medicines with a simple scan
                    </p>
                    </div>
                </div>
                </div>
            </motion.div>

            {/* RIGHT SECTION */}
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative"
            >
                {/* form card */}
                <div className="relative rounded-[32px] border border-cyan-400/20 bg-[#071626]/80 backdrop-blur-xl p-8 lg:p-10 shadow-[0_0_50px_rgba(0,255,255,0.08)]">
                {/* top glow */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                {/* heading */}
                <div className="flex items-start gap-5 mb-10">
                    <div className="w-20 h-20 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <HiOutlineUser size={40} />
                    </div>

                    <div>
                    <h2 className="text-5xl font-bold text-cyan-400">
                        Register
                    </h2>

                    <p className="text-gray-400 text-lg mt-2">
                        Fill in your details to create an account
                    </p>
                    </div>
                </div>

                {/* form */}
                <form className="space-y-6">
                    {/* name */}
                    <div>
                    <label className="block text-gray-300 mb-2">
                        Name
                    </label>

                    <div className="relative">
                        <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />

                        <input
                        type="text"
                        name="name"
                        onChange={handleUserInput}
                        placeholder="jose Pharma"
                        className="w-full bg-[#020817] border border-cyan-400/10 focus:border-cyan-400/40 rounded-2xl py-4 pl-14 pr-4 text-white outline-none transition-all"
                        />
                    </div>
                    </div>

                    {/* email */}
                    <div>
                    <label className="block text-gray-300 mb-2">
                        Email
                    </label>

                    <div className="relative">
                        <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />

                        <input
                        type="email"
                        name="email"
                        onChange={handleUserInput}
                        placeholder="retailer@test.com"
                        className="w-full bg-[#020817] border border-cyan-400/10 focus:border-cyan-400/40 rounded-2xl py-4 pl-14 pr-4 text-white outline-none transition-all"
                        />
                    </div>
                    </div>

                    {/* password */}
                    <div>
                    <label className="block text-gray-300 mb-2">
                        Password
                    </label>

                    <div className="relative">
                        <MdOutlinePassword className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />

                        <input
                        type="password"
                        name="password"
                        onChange={handleUserInput}
                        placeholder="gagan123"
                        className="w-full bg-[#020817] border border-cyan-400/10 focus:border-cyan-400/40 rounded-2xl py-4 pl-14 pr-4 text-white outline-none transition-all"
                        />
                    </div>
                    </div>

                    {/* role */}
                    <div>
                    <label className="block text-gray-300 mb-2">
                        Role
                    </label>

                    <select className="w-full bg-[#020817] border border-cyan-400/10 focus:border-cyan-400/40 rounded-2xl py-4 px-4 text-white outline-none transition-all" name="role" onChange={handleUserInput}>
                        <option>manufacturer</option>
                        <option>distributor</option>
                        <option>retailer</option>
                        <option>inspector</option>
                    </select>
                    </div>

                    {/* organization */}
                    <div>
                    <label className="block text-gray-300 mb-2">
                        Organization Name
                    </label>

                    <div className="relative">
                        <HiOutlineOfficeBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />

                        <input
                        type="text"
                        name="organizationName"
                        onChange={handleUserInput}
                        placeholder="jose Pharma Pvt Ltd"
                        className="w-full bg-[#020817] border border-cyan-400/10 focus:border-cyan-400/40 rounded-2xl py-4 pl-14 pr-4 text-white outline-none transition-all"
                        />
                    </div>
                    </div>

                    {/* license */}
                    <div>
                    <label className="block text-gray-300 mb-2">
                        License Number
                    </label>

                    <div className="relative">
                        <HiOutlineIdentification className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />

                        <input
                        type="text"
                        name="licenseNumber"
                        onChange={handleUserInput}
                        placeholder="LIC0012"
                        className="w-full bg-[#020817] border border-cyan-400/10 focus:border-cyan-400/40 rounded-2xl py-4 pl-14 pr-4 text-white outline-none transition-all"
                        />
                    </div>
                    </div>

                    {/* wallet */}
                    <div>
                    <label className="block text-gray-300 mb-2">
                        Wallet Address
                    </label>

                    <div className="relative">
                        <RiWallet3Line className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-xl" />

                        <input
                        type="text"
                        name="walletAddress"
                        onChange={handleUserInput}
                        placeholder="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
                        className="w-full bg-[#020817] border border-cyan-400/10 focus:border-cyan-400/40 rounded-2xl py-4 pl-14 pr-4 text-white outline-none transition-all"
                        />
                    </div>
                    </div>

                    {/* button */}
                    <button
                    type="submit"
                    onClick={handleUserSubmit}
                    className="w-full mt-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 transition-all text-white font-semibold py-5 rounded-2xl flex items-center justify-center gap-3 text-xl shadow-[0_0_35px_rgba(0,255,255,0.2)]"
                    >
                    Register Account
                    <MdArrowForward size={24} />
                    </button>

                    {/* login */}
                    <p className="text-center text-gray-400 text-lg pt-2">
                    Already have an account?{" "}
                    <span className="text-cyan-400 cursor-pointer hover:underline">
                        <Link to="/login">
                             Login
                        </Link>
                        
                    </span>
                    </p>
                </form>
                </div>
            </motion.div>
            </div>
        </div>
        </div>
    </Layout>
  );
}