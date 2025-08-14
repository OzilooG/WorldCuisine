"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Compass,
  Heart,
  Shuffle,
  PlusCircle,
  Map as MapIcon,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/map", label: "Map", icon: <MapIcon size={18} /> },
    { href: "/discover", label: "Discover", icon: <Compass size={18} /> },
    { href: "/saveddishes", label: "Saved Dishes", icon: <Heart size={18} /> },
    { href: "/randomizer", label: "Randomizer", icon: <Shuffle size={18} /> },
    {
      href: "/adddish",
      label: "Suggest a Dish",
      icon: <PlusCircle size={18} />,
    },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-secondary text-white shadow-md px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide hover:opacity-90 transition-opacity"
        >
          World Dishes
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-secondary to-accent text-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } rounded-l-2xl`}
      >
        {/* Sidebar Header */}
        <div className="p-5 flex justify-between items-center border-b border-white/20">
          <span className="text-lg font-semibold">Menu</span>
          <button
            className="hover:bg-white/20 p-2 rounded-lg"
            onClick={toggleSidebar}
          >
            <X size={24} className="cursor-pointer" />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col p-4 space-y-3">
          {navLinks.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={toggleSidebar}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Navbar;
