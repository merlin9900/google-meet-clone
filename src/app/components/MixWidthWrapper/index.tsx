import clsx from "clsx";
import {MaxWidthWrapperProps} from "./type";

const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {
   return (
      <div
         className={clsx(
            "mx-auto w-full max-w-screen-2xl px-6 pb-4 md:px-20 h-[calc(100vh-80px)]",
            className
         )}
      >
         {children}
      </div>
   );
};

export default MaxWidthWrapper;
