"use client";

import React from "react";
import SimpleMapDisplay from "./components/Worldmap";
import { Link } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full overflow-clip">
      <div className="mx-auto w-[300vw] md:w-[90vw]">
        <SimpleMapDisplay />
      </div>

      <div className="text-center flex flex-col items-center">
        <h1 className="p-15 text-2xl font-bold">About this project</h1>
        <p className="max-w-[500px]">
          Our goal with this project is to have a publicly available way to try
          new foods around the world. If you like to contribute please click the
          button bellow.
        </p>
        <Link href="/addish">
          <p className="btn">Contribute</p>
        </Link>
      </div>
    </div>
  );
}
