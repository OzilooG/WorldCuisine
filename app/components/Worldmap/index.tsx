"use client";

import React, {useEffect, useRef, useState} from 'react';
import Script from 'next/script';

declare const simplemaps: any;

interface SimpleMapDisplayProps {

}

const SimpleMapDisplay: React.FC<SimpleMapDisplayProps> = () => {
    const isMapInitialized = useRef(false);

    useEffect (() => {
        if (typeof simplemaps !== 'undefined' && simplemaps.worldmap && isMapInitialized.current){
            isMapInitialized.current = true;
        }
        
    return () => {
        isMapInitialized.current = false;
    };

    }, []);

    const handleScriptLoad = () => {
        console.log('Simplemaps script loaded');
        if (typeof simplemaps !== 'undefined' && simplemaps.worldmap && !isMapInitialized.current){
            try {
                simplemaps.worldmap.init();
                isMapInitialized.current = true;
            } catch (error){
                console.error("Error with Simplemaps: " +  error);
            }
        }
    };

    return (
        <>
        <Script
            src = "/mapdata.js"
            strategy="beforeInteractive"
            onError={(e) => console.error('mapdata.js failed to load', e)}
            suppressHydrationWarning/>
        <Script
            src="/worldmap.js"
            strategy="beforeInteractive"
            onError = {(e) => console.log("Error loading worldmap.js", e)}
            suppressHydrationWarning
        />
        <div id="map"
        className='py-10'>

        </div>
        </>
    );
};
export default SimpleMapDisplay;