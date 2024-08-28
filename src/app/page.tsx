import MaxWidthWrapper from "@/app/components/MixWidthWrapper";
import Hero from "@/app/sections/Hero";
import Header from "./components/Header";

export default function Home() {
   return (
      <>
         <Header />
         <MaxWidthWrapper>
            <Hero />
         </MaxWidthWrapper>
      </>
   );
}
