"use client";

import React from "react";
import SimpleMapDisplay from './components/Worldmap'; 

export default function Home() {

  return (
    <div className="w-full overflow-clip">
      <div className="w-[300vw] md:w-[90vw]">
        <SimpleMapDisplay/>      
      </div>
    </div>
  );
}