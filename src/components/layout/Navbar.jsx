import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import { logout } from "../../Redux/Slices/AuthSlice";

import { RiShieldCheckFill } from "react-icons/ri";

import {
  MdMenu,
  MdClose,
} from "react-icons/md";

import {
  HiOutlineUser,
  HiOutlineUserAdd,
} from "react-icons/hi";



// NAV LINKS
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "about" },
  { label: "Features", href: "features" },
  { label: "How It Works", href: "how-it-works" },
  { label: "Contact", href: "contact" },
];



// LOGO
const Logo = () => {

  return (

    <Link
      to="/"
      className="flex items-center gap-3 group"
    >

      {/* icon */}
      <div
        className="
          relative
          w-10
          h-10
          rounded-xl
          flex
          items-center
          justify-center
        "
        style={{
          background:
            "linear-gradient(135deg, rgba(0,255,255,0.15), rgba(14,165,233,0.08))",

          border:
            "1px solid rgba(0,255,255,0.35)",

          boxShadow:
            "0 0 18px rgba(0,255,255,0.15)",
        }}
      >

        <RiShieldCheckFill
          className="text-cyan-400"
          size={20}
        />

      </div>



      {/* text */}
      <div>

        <div className="flex items-center gap-1">

          <span className="text-white font-extrabold text-xl">
            Pharma
          </span>

          <span
            className="font-extrabold text-xl"
            style={{
              background:
                "linear-gradient(90deg,#00ffff,#0ea5e9)",

              WebkitBackgroundClip:
                "text",

              WebkitTextFillColor:
                "transparent",
            }}
          >
            Track
          </span>

        </div>



        <p
          className="
            text-[10px]
            tracking-[3px]
            uppercase
            text-slate-500
          "
        >
          AI-Powered Blockchain Supply Chain
        </p>

      </div>

    </Link>
  );
};



// NAV LINK
const NavLink = ({
  label,
  href,
  active,
}) => {

  return (

    <a
      href={href}
      className="
        relative
        text-sm
        font-medium
        transition-all
        duration-300
        group
      "
      style={{
        color: active
          ? "#00ffff"
          : "#94a3b8",
      }}
    >

      {label}



      {/* active underline */}
      <span
        className="
          absolute
          -bottom-1
          left-0
          h-[1.5px]
          rounded-full
          transition-all
          duration-300
        "
        style={{
          width:
            active
              ? "100%"
              : "0%",

          background:
            "linear-gradient(90deg,#00ffff,#0ea5e9)",
        }}
      />



      {/* hover underline */}
      <span
        className="
          absolute
          -bottom-1
          left-0
          h-[1.5px]
          w-0
          group-hover:w-full
          rounded-full
          transition-all
          duration-300
        "
        style={{
          background:
            "linear-gradient(90deg,#00ffff,#0ea5e9)",
        }}
      />

    </a>
  );
};



// NAVBAR
export default function Navbar({
  collapsed,
}) {

  const [scrolled, setScrolled] =
    useState(false);

  const [activeLink, setActiveLink] =
    useState("Home");



  useEffect(() => {

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);




  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    isLoggedIn,
    data,
  } = useSelector(
    (state) => state.auth
  );



  function handleLogout() {

    dispatch(logout());

    toast.success(
      "Logged out successfully"
    );

    navigate("/login");
  }



  return (

    <motion.header

      initial={{
        y: -80,
        opacity: 0,
      }}

      animate={{
        y: 0,
        opacity: 1,
      }}

      transition={{
        duration: 0.5,
      }}

      className={`
        fixed
        top-0
        right-0
        z-30
        transition-all
        duration-300

        ${
          collapsed
            ? "lg:left-[72px]"
            : "lg:left-[270px]"
        }

        left-0
      `}

      style={{
        background:
          scrolled
            ? "rgba(5,12,28,0.88)"
            : "rgba(5,12,28,0.45)",

        backdropFilter:
          "blur(20px)",

        borderBottom:
          scrolled
            ? "1px solid rgba(0,255,255,0.1)"
            : "1px solid rgba(255,255,255,0.04)",

        boxShadow:
          scrolled
            ? "0 4px 40px rgba(0,0,0,0.4)"
            : "none",
      }}
    >

      {/* glow */}
      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-[1px]
        "
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(0,255,255,0.5),rgba(14,165,233,0.5),transparent)",
        }}
      />



      {/* navbar inner */}
      <div
        className="
          w-full
          px-6
          lg:px-8
          h-16
          flex
          items-center
          justify-between
        "
      >

        {/* logo */}
        <Logo />



        {/* desktop nav */}
        <nav
          className="
            hidden
            md:flex
            items-center
            gap-8
          "
        >

          {
            NAV_LINKS.map((link) => (

              <div
                key={link.label}
                onClick={() =>
                  setActiveLink(
                    link.label
                  )
                }
              >

                <NavLink
                  label={link.label}
                  href={link.href}
                  active={
                    activeLink ===
                    link.label
                  }
                />

              </div>
            ))
          }

        </nav>



        {/* buttons */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-3
          "
        >

          {
            !isLoggedIn ? (

              <>
                {/* login */}
                <Link to="/login">

                  <motion.button

                    whileHover={{
                      scale: 1.04,
                    }}

                    whileTap={{
                      scale: 0.96,
                    }}

                    className="
                      flex
                      items-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-xl
                      text-slate-300
                      border
                      border-white/10
                    "

                    style={{
                      background:
                        "rgba(255,255,255,0.03)",
                    }}
                  >

                    <HiOutlineUser size={16} />

                    Login

                  </motion.button>

                </Link>



                {/* register */}
                <Link to="/register">

                  <motion.button

                    whileHover={{
                      scale: 1.04,
                    }}

                    whileTap={{
                      scale: 0.96,
                    }}

                    className="
                      flex
                      items-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-xl
                      text-black
                      font-semibold
                    "

                    style={{
                      background:
                        "linear-gradient(135deg,#00ffff,#0ea5e9)",

                      boxShadow:
                        "0 0 18px rgba(0,255,255,0.25)",
                    }}
                  >

                    <HiOutlineUserAdd size={16} />

                    Register

                  </motion.button>

                </Link>
              </>

            ) : (

              <>
                {/* username */}
                <p className="text-cyan-400 font-medium">
                  {data?.name}
                </p>



                {/* logout */}
                <motion.button

                  onClick={handleLogout}

                  whileHover={{
                    scale: 1.04,
                  }}

                  whileTap={{
                    scale: 0.96,
                  }}

                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    text-white
                    font-semibold
                  "

                  style={{
                    background:
                      "linear-gradient(135deg,#ef4444,#dc2626)",

                    boxShadow:
                      "0 0 18px rgba(239,68,68,0.25)",
                  }}
                >

                  Logout

                </motion.button>
              </>
            )
          }

        </div>

      </div>

    </motion.header>
  );
}