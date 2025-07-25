"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const SimpleMapDisplay: React.FC = () => {
  const pathname = usePathname();
  const [scriptKey, setScriptKey] = useState(0);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Clear previous map DOM on route change
    const mapDiv = document.getElementById("map");
    if (mapDiv) {
      mapDiv.innerHTML = "";
      setMapReady(false);
    }

    // Force re-run of worldmap.js
    const script = document.createElement("script");
    script.src = "/worldmap.js";
    script.async = true;
    script.onload = () => {
      setMapReady(true);
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [pathname]);

  return (
    <>
      <Script
        key={`mapdata-${scriptKey}`}
        src="/mapdata.js"
        strategy="afterInteractive"
      />
      <div
  id="map"
  className="
    my-10
    h-[90vh]
    md:h-[70vh]
    overflow-auto
    touch-pan-x
    touch-pan-y
    mx-auto
    border border-gray-200 
  "
/>

    </>
  );
};

export default SimpleMapDisplay;
