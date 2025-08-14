"use client";

import React from "react";
import SimpleMapDisplay from "../components/Worldmap";

export default function Map() {
  return (
    <div className="py-10">
      <div className="rounded-xl overflow-hidden shadow-lg mx-auto w-[300vw] md:w-[90vw]">
        <SimpleMapDisplay />
      </div>
    </div>
  );
}
