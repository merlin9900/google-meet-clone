"use client";
import Peer from "simple-peer";
import { setPeer } from "@/redux/modules/peer";
import getIceServers from "@/services/getIceServers";
import socket from "@/services/socket";
import {
   getStream,
   stopStream,
   toggleMic,
   toggleVideo,
} from "@/services/stream";
import { Camera, CameraOff, Mic, MicOff, PhoneCall, ScreenShare } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

const Room = () => {
   const roomId = useParams().meetingId;
   const [stream, setStream] = useState<any>();
   const [screenStream, setScreenStream] = useState<MediaStream | undefined>();
   const userVideo = useRef<HTMLVideoElement>(null);
   const remoteStreamRef = useRef<HTMLVideoElement>(null);
   const { peer } = useSelector((state: any) => state.peer);
   const [isCallAccepted, setIsCallAccepted] = useState(false);
   const [mic, setMic] = useState(true);
   const [video, setVideo] = useState(true);
   const [screenShare, setScreenShare] = useState(false);

   const dispatch = useDispatch();

   const router = useRouter();

   const handleCallUser = useCallback(async () => {
      const iceServers = await getIceServers();
      const peer = new Peer({
         initiator: true,
         trickle: false,
         stream,
         config: {
            iceServers,
         },
      });

      peer.on("error", (err) => {
         console.log(err);
      });

      peer.on("connect", () => {
         console.log("Connected");
         setIsCallAccepted(true);
      });

      peer.on("signal", (data) => {
         console.log("on signal caller side");
         socket.emit("offer", { roomId, from: socket.id, signal: data });
      });

      peer.on("stream", (stream) => {
         console.log("on stream caller side", stream);
         if (remoteStreamRef.current) {
            remoteStreamRef.current.srcObject = stream;
         }
      });

      dispatch(setPeer(peer));
   }, [roomId, stream, dispatch]);

   const handleAcceptCall = useCallback(
      async ({ signal }: { signal: RTCSessionDescription }) => {
         setIsCallAccepted(true);

         const iceServers = await getIceServers();
         const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
            config: {
               iceServers,
            },
         });

         peer.on("error", (err) => {
            console.log(err);
         });

         peer.on("connect", () => {
            console.log("Connected");
            setIsCallAccepted(true);
         });

         peer.signal(signal);

         peer.on("stream", (stream) => {
            console.log("on stream receiver side");
            if (remoteStreamRef.current) {
               remoteStreamRef.current.srcObject = stream;
            }
         });

         peer.on("signal", (data: RTCSessionDescription) => {
            console.log("on signal receiver side");
            socket.emit("answer", { roomId, from: socket.id, signal: data });
         });

         dispatch(setPeer(peer));

         socket.emit("call-accepted", { roomId, from: socket.id });
      },
      [roomId, stream, dispatch]
   );

   const handleEndCall = useCallback(() => {
      if (peer) {
         peer.destroy();
      }

      if (stream) {
         stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }

      if (remoteStreamRef.current) {
         remoteStreamRef.current.srcObject = null;
      }

      socket.emit("end-call", { roomId, from: socket.id });
      router.push(`/`);
   }, [peer, stream, router, roomId]);


   const remoteUserLeft = useCallback(() => {
      console.log("remote user left");

      if (peer) {
         peer.destroy();
      }
      setIsCallAccepted(false);
   }, [peer, setIsCallAccepted]);

   useEffect(() => {
      if (roomId) {
         socket.emit("join-room", { roomId: roomId, userId: socket.id });
      }
   }, [roomId]);

   useEffect(() => {
      const accessStream = async () => {
         const mediaStream = await getStream(userVideo);
         setStream(mediaStream);
         if (userVideo.current) {
            userVideo.current.srcObject = mediaStream;
         }
      };

      accessStream();
   }, []);

   useEffect(() => {
      socket.on("ready-to-call", handleCallUser);
      socket.on("offer", handleAcceptCall);
      socket.on("answer", ({ signal }: { signal: RTCSessionDescription }) => {
         console.log("on answer receiver side");
         if (peer) {
            peer.signal(signal);
         }
      });
      socket.on("call-accepted", ({ userId: otherUserId }) => {
         console.log("call-accepted", otherUserId);
         setIsCallAccepted(true);
      });
      socket.on("call-ended", remoteUserLeft);
      
      return () => {
         socket.off("ready-to-call", handleCallUser);
         socket.off("offer", handleAcceptCall);
         socket.off("answer");
         socket.off("call-accepted");
         socket.off("call-ended", remoteUserLeft);
      };
   }, [handleAcceptCall, handleCallUser, peer, remoteUserLeft]);

   return (
      <div className="w-full h-screen overflow-hidden flex flex-col gap-4 items-center p-4 bg-[#202124]">
         <div className="relative w-[80%] h-[92%]">
            <div className="w-full h-full">
               <video
                  ref={userVideo}
                  muted
                  autoPlay
                  playsInline
                  className={clsx(
                     "transition-all scale-x-[-1] duration-300 z-10 object-cover",
                     isCallAccepted
                        ? "w-1/4 h-1/4 absolute bottom-4 right-2"
                        : "w-full h-full"
                  )}
               />
            </div>

            {isCallAccepted && (
               <video
                  ref={remoteStreamRef}
                  autoPlay
                  playsInline
                  className="w-full h-full"
               />
            )}
         </div>
         <div className="w-full flex items-center justify-between gap-2 border border-red-600 text-white">
            <div className="flex items-center justify-center">{roomId}</div>
            <div className="flex items-center gap-4 justify-center">
               <button
                  className={clsx(
                     "flex items-center justify-center p-3 transition-all duration-300",
                     video
                        ? "bg-[#444746] rounded-full"
                        : "rounded-lg bg-[#E5CDCB]"
                  )}
                  onClick={() => {
                     setVideo(!video);
                     toggleVideo();
                  }}
               >
                  {video ? <Camera /> : <CameraOff className="text-red-900" />}
               </button>
               <button
                  className={clsx(
                     "flex items-center justify-center p-3 transition-all duration-300",
                     mic
                        ? "bg-[#444746] rounded-full"
                        : "rounded-lg bg-[#E5CDCB]"
                  )}
                  onClick={() => {
                     setMic(!mic);
                     toggleMic();
                  }}
               >
                  {mic ? <Mic /> : <MicOff className="text-red-900" />}
               </button>
               <button
                  className="flex items-center justify-center px-8 py-3 bg-red-800 rounded-full"
                  onClick={() => handleEndCall()}
               >
                  <PhoneCall />
               </button>
               {/* <button
                  className={clsx(
                     "flex items-center justify-center p-4 transition-all duration-300",
                     screenShare
                        ? "bg-[#9BBBEF] rounded-full"
                        : "rounded-lg bg-[#444746]"
                  )}
               >
                  <ScreenShare />
               </button> */}
            </div>
            <div></div>
         </div>
      </div>
   );
};

export default Room;
