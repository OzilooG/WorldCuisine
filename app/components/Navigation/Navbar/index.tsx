"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="navbar bg-secondary flex items-center justify-center shadow-md">
        <div className="hidden md:flex space-x-6 [&>*]:hover:bg-accent [&>*]:transition-colors">
          <Link className="p-4" href="/">
            Map
          </Link>
          <Link className="p-4" href="/discover">
            Discover
          </Link>
          <Link className="p-4" href="/saveddishes">
            Saved Dishes
          </Link>
          <Link className="p-4" href="/randomizer">
            Randomizer
          </Link>
          <Link className="p-4" href="/adddish">
            Add Dish
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-4 ml-auto cursor-pointer"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button className="cursor-pointer" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          <li>
            <Link href="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/discover" onClick={toggleSidebar}>
              Discover
            </Link>
          </li>
          <li>
            <Link href="/saveddishes" onClick={toggleSidebar}>
              Saved Dishes
            </Link>
          </li>
          <li>
            <Link href="/randomizer" onClick={toggleSidebar}>
              Randomizer
            </Link>
          </li>
          <li>
            <Link href="/adddish" onClick={toggleSidebar}>
              Add Dish
            </Link>
          </li>
        </ul>
      </div>

      {/* Background overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Navbar;
