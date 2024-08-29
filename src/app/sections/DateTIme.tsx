"use client";

import { useState, useEffect } from "react";

const DateTime = () => {
   const [currentTime, setCurrentTime] = useState(new Date());

   useEffect(() => {
      const updateTime = () => {
         setCurrentTime(new Date());
      };

      // Calculate the delay until the next full minute
      const delay =
         60000 -
         (currentTime.getSeconds() * 1000 + currentTime.getMilliseconds());

      const timeoutId = setTimeout(() => {
         updateTime();
         const intervalId = setInterval(updateTime, 60000);

         // Clear the interval when the component unmounts
         return () => clearInterval(intervalId);
      }, delay);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
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
