import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  MdDashboard,
  MdVerifiedUser,
  MdOutlineInventory2,
  MdShield,
  MdNotificationsActive,
  MdPerson,
  MdSettings,
  MdChevronLeft,
  MdChevronRight,
  MdMenu,
  MdClose,
} from "react-icons/md";

import { BiNetworkChart } from "react-icons/bi";

import { RiShieldCheckFill } from "react-icons/ri";

import { useSelector } from "react-redux";
import {
   useNavigate
} from "react-router-dom";

const navItems = [

  {
    label: "Dashboard",
    path: "/",
    allowedRoles: [
      "manufacturer",
      "retailer",
      "inspector",
      "distributor"
    ],
    icon: <MdDashboard size={20} />,
  },

  {
    label: "Drug Registration",
    path: "/drug-registration",

    allowedRoles: [
      "manufacturer"
    ],

    icon: <MdOutlineInventory2 size={20} />,
  },

  {
    label: "Drug Verification",
    path: "/drug-verification",

    allowedRoles: [
      "inspector",
      "retailer"
    ],

    icon: <MdVerifiedUser size={20} />,
  },

  {
    label: "AI Analysis",
    path: "/ai-analysis",

    allowedRoles: [
      "manufacturer",
      "inspector"
    ],

    icon: <BiNetworkChart size={20} />,
  },

  {
    label: "Supply Chain",
    path: "/supply-chain",

    allowedRoles: [
      "manufacturer",
      "distributor"
    ],

    icon: <MdShield size={20} />,
  },

  {
    label: "Alerts & Reports",
    path: "/reports",

    allowedRoles: [
      "manufacturer",
      "inspector"
    ],

    icon: <MdNotificationsActive size={20} />,
  },

  {
    label: "Profile",
    path: "/profile",

    allowedRoles: [
      "manufacturer",
      "retailer",
      "inspector",
      "distributor"
    ],

    icon: <MdPerson size={20} />,
  },

  {
    label: "Settings",
    path: "/settings",

    allowedRoles: [
      "manufacturer",
      "retailer",
      "inspector",
      "distributor"
    ],

    icon: <MdSettings size={20} />,
  },
];
export default function Sidebar({
  collapsed,
  setCollapsed,
}) {

    const navigate = useNavigate();

    const { role } = useSelector(
   (state) => state.auth
);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [activeItem, setActiveItem] =
    useState("Dashboard");



  const SidebarContent = ({
    isMobile = false,
  }) => (

    <motion.aside

      initial={false}

      animate={{
        width: isMobile
          ? 270
          : collapsed
          ? 72
          : 270,
      }}

      transition={{
        duration: 0.3,
      }}

      className="
        relative
        flex
        flex-col
        h-full
        overflow-hidden
        border-r
        border-cyan-500/10
        bg-[#060f1e]/90
        backdrop-blur-2xl
      "

      style={{
        boxShadow:
          "4px 0 40px rgba(0,229,255,0.04)",
      }}
    >

      {/* top glow */}
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-cyan-400/50
          to-transparent
        "
      />



      {/* top section */}
      <div
        className="
          flex
          items-center
          justify-between
          px-4
          py-5
          border-b
          border-cyan-500/10
        "
      >

        <AnimatePresence mode="wait">

          {
            (!collapsed || isMobile) && (

              <motion.div

                key="brand"

                initial={{
                  opacity: 0,
                  x: -10,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                }}

                exit={{
                  opacity: 0,
                  x: -10,
                }}

                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <div
                  className="
                    w-8
                    h-8
                    rounded-xl
                    bg-cyan-400/15
                    border
                    border-cyan-400/30
                    flex
                    items-center
                    justify-center
                  "
                >
                  <RiShieldCheckFill
                    className="text-cyan-400"
                    size={16}
                  />
                </div>

                <span
                  className="
                    text-white
                    font-bold
                    text-base
                  "
                >
                  PharmaTrack
                </span>

              </motion.div>
            )
          }

        </AnimatePresence>



        {/* collapse button */}
        {
          !isMobile && (

            <button

              onClick={() =>
                setCollapsed(
                  (prev) => !prev
                )
              }

              className="
                w-7
                h-7
                rounded-lg
                flex
                items-center
                justify-center
                text-cyan-400/60
                hover:text-cyan-400
                hover:bg-cyan-400/10
                transition-all
              "
            >

              {
                collapsed
                  ? <MdChevronRight size={18} />
                  : <MdChevronLeft size={18} />
              }

            </button>
          )
        }

      </div>



      {/* nav */}
      <nav
        className="
          flex-1
          px-3
          py-5
          space-y-2
          overflow-y-auto
        "
      >

        {
          navItems
          .filter((item) =>
            item.allowedRoles.includes(role)
            )

          .map((item) => {

            const isActive =
              activeItem === item.label;

            return (

              <motion.button

                key={item.label}

                whileHover={{
                  x: 3,
                }}

                onClick={() => {

                    setActiveItem(item.label);

                    navigate(item.path);

                    if (isMobile)
                        setMobileOpen(false);
                    }}

                className={`
                  relative
                  w-full
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-xl
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-cyan-400/10 border border-cyan-400/20 text-cyan-400"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >

                {
                  isActive && (

                    <motion.div

                      layoutId="activeBar"

                      className="
                        absolute
                        left-0
                        top-1/2
                        -translate-y-1/2
                        w-[3px]
                        h-6
                        rounded-r-full
                        bg-cyan-400
                      "
                    />
                  )
                }

                <span>
                  {item.icon}
                </span>



                <AnimatePresence>

                  {
                    (!collapsed || isMobile) && (

                      <motion.span

                        initial={{
                          opacity: 0,
                        }}

                        animate={{
                          opacity: 1,
                        }}

                        exit={{
                          opacity: 0,
                        }}

                        className="
                          text-sm
                          font-medium
                          whitespace-nowrap
                        "
                      >
                        {item.label}
                      </motion.span>
                    )
                  }

                </AnimatePresence>

              </motion.button>
            );
          })
        }

      </nav>



      {/* bottom */}
      <div
        className="
          px-3
          pb-5
          pt-3
          border-t
          border-cyan-500/10
        "
      >

        <div
          className={`
            flex
            items-center
            gap-2
            rounded-xl
            px-3
            py-3
            bg-cyan-500/10
            border
            border-cyan-500/15

            ${
              collapsed &&
              !isMobile
                ? "justify-center"
                : ""
            }
          `}
        >

          <div
            className="
              w-2
              h-2
              rounded-full
              bg-green-400
            "
          />

          {
            (!collapsed || isMobile) && (

              <span
                className="
                  text-xs
                  text-cyan-300/80
                "
              >
                Blockchain Online
              </span>
            )
          }

        </div>

      </div>

    </motion.aside>
  );



  return (
    <>

      {/* DESKTOP */}
      <div
         className="
            hidden
            lg:flex
            fixed
            top-16
            left-0
            h-[calc(100vh-64px)]
            z-40
                "
      >
        <SidebarContent />
      </div>



      {/* MOBILE BUTTON */}
      <button

        onClick={() =>
          setMobileOpen(true)
        }

        className="
          lg:hidden
          fixed
          top-4
          left-4
          z-50
          w-10
          h-10
          rounded-xl
          flex
          items-center
          justify-center
          bg-[#060f1e]/90
          border
          border-cyan-400/20
          text-cyan-400
        "
      >

        <MdMenu size={20} />

      </button>



      {/* MOBILE DRAWER */}
      <AnimatePresence>

        {
          mobileOpen && (

            <>
              {/* overlay */}
              <motion.div

                initial={{
                  opacity: 0,
                }}

                animate={{
                  opacity: 1,
                }}

                exit={{
                  opacity: 0,
                }}

                onClick={() =>
                  setMobileOpen(false)
                }

                className="
                  lg:hidden
                  fixed
                  inset-0
                  z-40
                  bg-black/60
                  backdrop-blur-sm
                "
              />



              {/* drawer */}
              <motion.div

                initial={{
                  x: -280,
                }}

                animate={{
                  x: 0,
                }}

                exit={{
                  x: -280,
                }}

                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}

                className="
                  lg:hidden
                  fixed
                  left-0
                  top-0
                  bottom-0
                  z-50
                  w-[270px]
                "
              >

                <button

                  onClick={() =>
                    setMobileOpen(false)
                  }

                  className="
                    absolute
                    top-4
                    right-4
                    z-10
                    text-cyan-400/60
                  "
                >

                  <MdClose size={20} />

                </button>

                <SidebarContent isMobile />

              </motion.div>
            </>
          )
        }

      </AnimatePresence>

    </>
  );
}