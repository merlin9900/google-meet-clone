import DateTime from '@/app/sections/DateTime';
import { CircleHelp, LayoutGrid, MessageSquareWarning, Settings } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
     <nav className="flex justify-between items-center px-4 text-[#676B6E] h-16">
        <div className="flex items-center gap-1 text-xl">
           <Image
              alt="logo"
              src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png"
              width={124}
              height={40}
           />
           <p className="translate-y-[-1px]">Meet</p>
        </div>
        <div className="flex items-center gap-4">
           <div>
              <DateTime />
           </div>
           <CircleHelp />
           <MessageSquareWarning />
           <Settings />
           <LayoutGrid />
        </div>
     </nav>
  );
}

export default Header