import { Copy, UserRoundPlus, X } from 'lucide-react'
import React, { useRef } from 'react'
import Button from '../Button';
import { PopupProps } from './type';

const Popup = ({roomId, onclick}: PopupProps) => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const copyToClipboard = async () => {
       if (textRef.current) {
          try {
             await navigator.clipboard.writeText(textRef?.current?.textContent || "");
          } catch (err) {
             alert("Failed to copy text.");
          }
       }
    };
  return (
     <div className="absolute left-8 bottom-24 z-10 p-8 rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
           <p className="text-xl">Your meeting&apos;s ready</p>
           <X onClick={onclick} className="cursor-pointer" />
        </div>
        <Button className="py-3 px-5 bg-blue-600 font-medium hover:bg-white text-white mb-3 hover:text-blue-600 flex gap-2 rounded-full">
           <UserRoundPlus />
           Add other
        </Button>
        <p className="text-md text-[#676B6E] mb-3 max-w-[310px]">
           Or share this meeting link with others you want in the meeting
        </p>
        <div className="flex items-center justify-between mb-r px-4 py-3 rounded-md bg-[#ebebeb] text-lg">
           <p ref={textRef}>localhost:3000/{roomId}</p>
           <div className="relative border self-stretch group">
              <Copy onClick={copyToClipboard} className="cursor-pointer peer" />
              <p className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:delay-300 text-nowrap transition duration-200 origin-bottom text-xs absolute z-10 left-1/2 -translate-x-1/2 bottom-[140%] py-1 px-2 border text-white bg-[#202124] rounded-lg custom-exit-delay">
                 Copy link
              </p>
           </div>
        </div>
     </div>
  );
}

export default Popup
