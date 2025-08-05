"use client";

import React from "react";
import SimpleMapDisplay from "./components/Worldmap";

export default function Home() {
  return (
    <div className="w-full overflow-clip">
      <div className="mx-auto w-[300vw] md:w-[90vw]">
        <SimpleMapDisplay />
      </div>

      <div>
        <h1>About this project</h1>
        <p></p>
      </div>
    </div>
  );
}
