"use client";

import { useState, useEffect } from "react";

const DateTime = () => {
   const [currentTime, setCurrentTime] = useState(new Date());

   useEffect(() => {
      const updateTime = () => setCurrentTime(new Date());

      // Calculate the delay until the next full minute
      const now = new Date();
      const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

      // Set timeout to update time at the start of the next minute
      const timeoutId = setTimeout(() => {
         updateTime();
         const intervalId = setInterval(updateTime, 60000);

         return () => clearInterval(intervalId); // Cleanup on unmount
      }, delay);

      return () => clearTimeout(timeoutId); // Cleanup on unmount
   }, []);

   return (
      <div className="hidden sm:flex items-center text-[#676B6E] gap-1 text-lg">
         <p>
            {currentTime.toLocaleTimeString("en-US", {
               hour: "2-digit",
               minute: "2-digit",
            })}
         </p>
         •
         <p>
            {currentTime.toLocaleDateString("en-US", {
               weekday: "short",
               month: "short",
               day: "numeric",
            })}
         </p>
      </div>
   );
};

export default DateTime;
