"use client";

import { useEffect, useState } from "react";
import { Link as LinkScroll, scroller } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const menuItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function CreateMenus({ activeLink, getMenuItems, setActiveLink, mobile = false, closeMobile }) {
  return getMenuItems.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: mobile ? 20 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: mobile ? index * 0.1 : 0 }}
    >
      <LinkScroll
        activeClass="active"
        to={item.id}
        spy={true}
        smooth={true}
        duration={800}
        offset={-80}
        onSetActive={() => setActiveLink(item.id)}
        onClick={mobile ? closeMobile : undefined}
        className={`
          ${mobile 
            ? 'block px-6 py-4 text-lg font-medium rounded-xl transition-all duration-300'
            : 'px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative font-medium transition-all duration-300'
          }
          ${
            activeLink === item.id
              ? mobile 
                ? "bg-primary-500 text-white shadow-green-glow"
                : "text-primary-500 animation-active"
              : mobile
                ? "text-secondary-700 hover:bg-primary-50 hover:text-primary-500"
                : "text-secondary-700 hover:text-primary-500"
          }
        `}
      >
        {item.label}
      </LinkScroll>
    </motion.div>
  ));
}

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrollActive, setScrollActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollActive(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollActive 
            ? "glass-effect shadow-medium backdrop-blur-md" 
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <nav className="container-custom px-6 sm:px-8 lg:px-16 mx-auto">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-green-glow group-hover:shadow-green-md transition-all duration-300">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <span className="text-2xl font-bold text-gradient">ortfolio</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              <CreateMenus
                setActiveLink={setActiveLink}
                activeLink={activeLink}
                getMenuItems={menuItems}
              />
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex">
              <motion.button
                onClick={() => scroller.scrollTo("contact", {
                  duration: 800,
                  delay: 100,
                  smooth: true,
                  offset: -80
                })}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-xl bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-strong p-6 pt-20"
            >
              <div className="flex flex-col space-y-2">
                <CreateMenus
                  setActiveLink={setActiveLink}
                  activeLink={activeLink}
                  getMenuItems={menuItems}
                  mobile={true}
                  closeMobile={closeMobileMenu}
                />
                <motion.button
                  onClick={() => {
                    scroller.scrollTo("contact", {
                      duration: 800,
                      delay: 100,
                      smooth: true,
                      offset: -80
                    });
                    closeMobileMenu();
                  }}
                  className="btn-primary mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Contact Me
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
