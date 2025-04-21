import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../src/utensis/Axious";

const Sidenav = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[240px] bg-[#1F1E24] border-r border-zinc-800 p-4 transition-all duration-300 z-[90] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <i className="text-[#6656CD] ri-tv-fill text-2xl"></i>
            <span className="text-[#6656CD] text-xl font-bold">Danflex</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white p-2"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <nav className="space-y-6">
          <div>
            <h2 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-4">
              New feed
            </h2>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/trending"
                  className="flex items-center gap-3 text-zinc-400 hover:bg-[#6656CD] hover:text-white rounded-lg p-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="text-red-500 ri-fire-fill"></i>
                  <span>Trending</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/popular"
                  className="flex items-center gap-3 text-zinc-400 hover:bg-[#6656CD] hover:text-white rounded-lg p-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="text-red-500 ri-line-chart-line"></i>
                  <span>Popular</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/top-rated"
                  className="flex items-center gap-3 text-zinc-400 hover:bg-[#6656CD] hover:text-white rounded-lg p-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="text-yellow-500 ri-star-fill"></i>
                  <span>Top rated</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/upcoming"
                  className="flex items-center gap-3 text-zinc-400 hover:bg-[#6656CD] hover:text-white rounded-lg p-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="text-blue-500 ri-calendar-line"></i>
                  <span>Upcoming</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/people"
                  className="flex items-center gap-3 text-zinc-400 hover:bg-[#6656CD] hover:text-white rounded-lg p-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="text-green-500 ri-user-fill"></i>
                  <span>People</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tv-shows"
                  className="flex items-center gap-3 text-zinc-400 hover:bg-[#6656CD] hover:text-white rounded-lg p-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="text-purple-500 ri-tv-fill"></i>
                  <span>TV Shows</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <h2 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Website Information
            </h2>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/about"
                  className="flex items-center gap-3 text-zinc-400 hover:bg-[#6656CD] hover:text-white rounded-lg p-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="text-blue-500 ri-information-line"></i>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center gap-3 text-zinc-400 hover:bg-[#6656CD] hover:text-white rounded-lg p-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="text-blue-500 ri-phone-fill"></i>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[80]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidenav;
