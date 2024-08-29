"use client";

import Button from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import getRoomId from "@/services/getRoomId";
import socket from "@/services/socket";
import clsx from "clsx";
import { Keyboard, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Hero = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [roomID, setRoomID] = useState("");
   const handleNewRoom = () => {
      setLoading(true);
      const roomId: string = getRoomId();
      socket.emit("create-room", { roomId: roomId });
      router.push(`/${roomId}`);
   };
   
   const handleExistingRoom = (e: any) => {
      e.preventDefault();
      setLoading(true);
      router.push(`/${roomID}`);
   };
   useEffect(() => {
      if (loading) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "auto";
      }

      // Cleanup on component unmount
      return () => {
         document.body.style.overflow = "auto";
      };
   }, [loading]);
   return (
      <div className="flex items-center justify-center">
         <div className="h-[calc(100vh-80px)] lg:grid lg:gap-x-56 grid-cols-2 items-center place-items-center">
            <div
               className={clsx(
                  "fixed h-screen top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/90 text-gray-400 text-3xl z-10 transition-opacity duration-[3000] ease-in-out",
                  !loading && "opacity-0 pointer-events-none"
               )}
            >
               Joining...
            </div>

            <div className="py-8 mx-auto mb-20 lg:mb-4 text-center lg:text-left lg:self-end flex flex-col items-center max-w-xl border-b border-gray-500 lg:items-start">
               <p className="text-[40px] leading-tight mb-2">
                  Video calls and meetings for everyone
               </p>
               <p className="text-gray-500 text-2xl mb-6">
                  Connect, collaborate, and celebrate from anywhere with Google
                  Meet
               </p>
               <div className="w-full flex flex-col gap-5 items-start sm:flex-row">
                  <Button
                     onClick={handleNewRoom}
                     className="bg-blue-600 text-white px-3 py-3 rounded-[4px] flex whitespace-nowrap"
                  >
                     <Video />
                     <span className="ml-2 font-normal">New meeting</span>
                  </Button>
                  <div className="flex gap-2 w-full">
                     <InputField
                        onSubmit={handleExistingRoom}
                        placeholder="Enter meeting ID"
                        className="flex border border-gray-500 px-3 items-center rounded-[4px]"
                        value={roomID}
                        onChange={(e) => setRoomID(e.target.value)}
                     >
                        <Keyboard className="mr-2 text-gray-500" />
                     </InputField>
                     <Button
                        onClick={handleExistingRoom}
                        className="py-3 px-5 text-blue-600 font-medium hover:bg-blue-50"
                     >
                        Join
                     </Button>
                  </div>
               </div>
            </div>
            <div className="flex flex-col items-center mb-8 col-start-2  row-start-1 row-end-3">
               <Image
                  src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
                  alt="hero"
                  width={250}
                  height={250}
               />
               <p className="mt-14 mb-2 text-2xl text-gray-900">
                  Get a link you can share
               </p>
               <p className="text-gray-700 text-center lg:max-w-[350px]">
                  Click <span className="font-semibold">New meeting</span> to
                  get a link you can send to people you want to meet with
               </p>
            </div>
            <div className="text-gray-500 lg:self-start">
               <Link
                  href="https://github.com/pranav50034/google-meet-clone/tree/master"
                  className="text-blue-600"
               >
                  Learn more
               </Link>{" "}
               (Source code) about Google Meet Clone
            </div>
         </div>
      </div>
   );
   
};

export default Hero;
