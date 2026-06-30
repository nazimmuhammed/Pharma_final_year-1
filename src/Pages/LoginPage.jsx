import { motion } from "framer-motion";

import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineCube,
} from "react-icons/hi";

import {
  MdOutlinePassword,
  MdArrowForward,
} from "react-icons/md";

import {
  RiShieldCheckFill,
  RiBrainLine,
  RiQrCodeLine,
} from "react-icons/ri";
import Layout from "../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/Slices/AuthSlice";

export default function LoginPage() {

    const dispatch=useDispatch()
    const navigate=useNavigate()


    const [loginState,setloginState]=useState({
        email:'',
        password:''
    })

    function handleUserInput(e){
        const {name,value}=e.target
        setloginState({
            ...loginState,
            [name]:value
        })
    }

    async function handleUserSubmit(e){

    e.preventDefault()

    console.log(loginState)

    if(!loginState.email || !loginState.password){

        toast.error("All fields are required")

        return
    }

    const response = await dispatch(
        loginUser(loginState)
    )

    console.log(
        "the response for login from login thunk:",
        response
    )

    if(response.payload?.success){

        toast.success("Login successful")

        setloginState({
            email:'',
            password:'',
        })

        navigate('/')
    }

    else{

        toast.error(
            response.payload?.message ||
            "Failed to login"
        )
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
                Blockchain Secured Authentication
                </div>

                {/* icon */}
                <div className="mb-10">
                <div className="w-32 h-32 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,255,0.15)]">
                    <HiOutlineUser
                    size={60}
                    className="text-cyan-400"
                    />
                </div>
                </div>

                {/* heading */}
                <h1 className="text-6xl font-extrabold leading-tight text-white">
                Welcome Back To
                <br />
                <span className="text-cyan-400">
                    PharmaTrack
                </span>
                </h1>

                {/* description */}
                <p className="mt-8 text-gray-400 text-2xl leading-relaxed max-w-xl">
                Access your pharmaceutical supply chain dashboard securely with
                blockchain-powered authentication.
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
                        Secure Authentication
                    </h3>

                    <p className="text-gray-400 text-lg mt-1">
                        JWT secured role-based access
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
                        Supply Chain Tracking
                    </h3>

                    <p className="text-gray-400 text-lg mt-1">
                        Manage medicines with transparency
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
                        AI Monitoring
                    </h3>

                    <p className="text-gray-400 text-lg mt-1">
                        Detect anomalies in real-time
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
                        QR Verification
                    </h3>

                    <p className="text-gray-400 text-lg mt-1">
                        Verify medicines instantly
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
                        Login
                    </h2>

                    <p className="text-gray-400 text-lg mt-2">
                        Sign in to continue to PharmaTrack
                    </p>
                    </div>
                </div>

                {/* form */}
                <form className="space-y-6">
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
                        placeholder="Enter your password"
                        className="w-full bg-[#020817] border border-cyan-400/10 focus:border-cyan-400/40 rounded-2xl py-4 pl-14 pr-4 text-white outline-none transition-all"
                        />
                    </div>
                    </div>

                    {/* remember */}
                    <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-400">
                        <input
                        type="checkbox"
                        className="accent-cyan-400"
                        />
                        Remember me
                    </label>

                    <button
                        type="button"
                        className="text-cyan-400 hover:underline"
                    >
                        Forgot Password?
                    </button>
                    </div>

                    {/* button */}
                    <button
                    type="submit"
                    onClick={handleUserSubmit}
                    className="w-full mt-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 transition-all text-white font-semibold py-5 rounded-2xl flex items-center justify-center gap-3 text-xl shadow-[0_0_35px_rgba(0,255,255,0.2)]"
                    >
                    Login Account
                    <MdArrowForward size={24} />
                    </button>

                    {/* register */}
                    <p className="text-center text-gray-400 text-lg pt-2">
                    Don't have an account?{" "}
                    <span className="text-cyan-400 cursor-pointer hover:underline">
                        <Link to="/register"> Register</Link>
                       
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