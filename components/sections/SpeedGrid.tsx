"use client";

import { useTheme } from "@/hooks/useTheme";

export function SpeedGrid() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section 
      className="py-24 flex justify-center items-center w-full"
      style={{ backgroundColor: isDark ? '#000000' : '#f8fafc' }}
    >
      <div className="w-[95vmin] md:w-[70vmin] h-auto md:h-[70vmin] [container-type:inline-size]">
        <div className="relative h-full w-full grid gap-4 transition-all duration-500 ease-in-out md:grid-cols-[30cqmin_30cqmin_30cqmin] has-[>div:nth-child(1):hover]:md:grid-cols-[60cqmin_15cqmin_15cqmin] has-[>div:nth-child(2):hover]:md:grid-cols-[15cqmin_60cqmin_15cqmin] has-[>div:nth-child(3):hover]:md:grid-cols-[15cqmin_15cqmin_60cqmin] group before:bg-white/15 before:absolute before:inset-0 before:blur-[80px] hover:before:bg-white/5 before:transition-all before:ease-in-out before:duration-500 before:delay-300 before:rounded-xl pl-4 pt-4 pb-4 md:pb-0">

          {/* Column 1 */}
          <div className="grid gap-4 transition-all duration-500 ease-in-out grid-rows-[30cqmin_30cqmin_30cqmin] has-[article:nth-child(1):hover]:grid-rows-[60cqmin_15cqmin_15cqmin] has-[article:nth-child(2):hover]:grid-rows-[15cqmin_60cqmin_15cqmin] has-[article:nth-child(3):hover]:grid-rows-[15cqmin_15cqmin_60cqmin]">

            <article className="relative overflow-hidden rounded-xl cursor-pointer h-full shadow-2xl">
              <img className="w-full h-full object-cover transition-all duration-500 ease-in-out blur-0 group-hover:blur-[0.5px] group-hover:hover:blur-0 brightness-100 group-hover:brightness-50 group-hover:hover:brightness-100 contrast-100 group-hover:contrast-[1.2] group-hover:hover:contrast-110 saturate-[0.2] group-hover:saturate-0 group-hover:hover:saturate-100 scale-100 group-hover:scale-100 group-hover:hover:scale-[1.2] group-hover:delay-300" src="https://assets.codepen.io/9981/Snapinst.app_474703130_1074255131170575_7813879863249717559_n_1080.jpg" alt="Gallery Image 1" />              
            </article>

            <article className="relative overflow-hidden rounded-xl cursor-pointer h-full shadow-2xl">
              <img className="w-full h-full object-cover transition-all duration-500 ease-in-out blur-0 group-hover:blur-[0.5px] group-hover:hover:blur-0 brightness-100 group-hover:brightness-50 group-hover:hover:brightness-100 contrast-100 group-hover:contrast-[1.2] group-hover:hover:contrast-110 saturate-[0.2] group-hover:saturate-0 group-hover:hover:saturate-100 scale-100 group-hover:scale-100 group-hover:hover:scale-[1.2] group-hover:delay-300" src="https://assets.codepen.io/9981/Snapinst.app_474685614_913157441006845_7706257443765070079_n_1080.jpg" alt="Gallery Image 2" />              
            </article>

            <article className="relative overflow-hidden rounded-xl cursor-pointer h-full shadow-2xl">
              <img className="w-full h-full object-cover transition-all duration-500 ease-in-out blur-0 group-hover:blur-[0.5px] group-hover:hover:blur-0 brightness-100 group-hover:brightness-50 group-hover:hover:brightness-100 contrast-100 group-hover:contrast-[1.2] group-hover:hover:contrast-110 saturate-[0.2] group-hover:saturate-0 group-hover:hover:saturate-100 scale-100 group-hover:scale-100 group-hover:hover:scale-[1.2] group-hover:delay-300" src="https://assets.codepen.io/9981/Snapinst.app_474955123_1118457346195432_8407562107755590864_n_1080.jpg" alt="Gallery Image 3" />              
            </article>
          </div>

          {/* Column 2 */}
          <div className="grid gap-4 transition-all duration-500 ease-in-out grid-rows-[30cqmin_30cqmin_30cqmin] has-[article:nth-child(1):hover]:grid-rows-[60cqmin_15cqmin_15cqmin] has-[article:nth-child(2):hover]:grid-rows-[15cqmin_60cqmin_15cqmin] has-[article:nth-child(3):hover]:grid-rows-[15cqmin_15cqmin_60cqmin]">

            <article className="relative overflow-hidden rounded-xl cursor-pointer h-full shadow-2xl">
              <img className="w-full h-full object-cover transition-all duration-500 ease-in-out blur-0 group-hover:blur-[0.5px] group-hover:hover:blur-0 brightness-100 group-hover:brightness-50 group-hover:hover:brightness-100 contrast-100 group-hover:contrast-[1.2] group-hover:hover:contrast-110 saturate-[0.2] group-hover:saturate-0 group-hover:hover:saturate-100 scale-100 group-hover:scale-100 group-hover:hover:scale-[1.2] group-hover:delay-300" src="https://assets.codepen.io/9981/Snapinst.app_474677240_1268003614486776_456741030303072845_n_1080.jpg" alt="Gallery Image 4" />
            </article>

            <article className="relative overflow-hidden rounded-xl cursor-pointer h-full grid container-[inline-size] shadow-2xl">
              <img className="absolute w-[80%] place-self-center z-10" src="https://www.manthey-racing.com/themes/custom/grounded_manthey/src/images/manthey-logo.svg" alt="MANTHEY" />
              <video autoPlay loop muted className="object-cover w-full h-full brightness-50 contrast-150 saturate-0">
                <source src="https://www.manthey-racing.com/sites/default/files/2024-04/Manthey_Update_short_V3.mp4" type="video/mp4" />
              </video>
            </article>

            <article className="relative overflow-hidden rounded-xl cursor-pointer h-full shadow-2xl">
              <img className="w-full h-full object-cover transition-all duration-500 ease-in-out blur-0 group-hover:blur-[0.5px] group-hover:hover:blur-0 brightness-100 group-hover:brightness-50 group-hover:hover:brightness-100 contrast-100 group-hover:contrast-[1.2] group-hover:hover:contrast-110 saturate-[0.2] group-hover:saturate-0 group-hover:hover:saturate-100 scale-100 group-hover:scale-100 group-hover:hover:scale-[1.2] group-hover:delay-300" src="https://assets.codepen.io/9981/Snapinst.app_474735095_1311604690170181_7376274983407848913_n_1080.jpg" alt="Gallery Image 5" />
            </article>
          </div>

          {/* Column 3 */}
          <div className="grid gap-4 transition-all duration-500 ease-in-out grid-rows-[30cqmin_30cqmin_30cqmin] has-[article:nth-child(1):hover]:grid-rows-[60cqmin_15cqmin_15cqmin] has-[article:nth-child(2):hover]:grid-rows-[15cqmin_60cqmin_15cqmin] has-[article:nth-child(3):hover]:grid-rows-[15cqmin_15cqmin_60cqmin]">

            <article className="relative overflow-hidden rounded-xl cursor-pointer h-full shadow-2xl">
              <img className="w-full h-full object-cover transition-all duration-500 ease-in-out blur-0 group-hover:blur-[0.5px] group-hover:hover:blur-0 brightness-100 group-hover:brightness-50 group-hover:hover:brightness-100 contrast-100 group-hover:contrast-[1.2] group-hover:hover:contrast-110 saturate-[0.2] group-hover:saturate-0 group-hover:hover:saturate-100 scale-100 group-hover:scale-100 group-hover:hover:scale-[1.2] group-hover:delay-300" 
                             src="https://assets.codepen.io/9981/Snapinst.app_474664158_1140519330780041_2621674573390078013_n_1080.jpg" alt="Gallery Image 6" />
            </article>

            <article className="relative overflow-hidden rounded-xl cursor-pointer h-full shadow-2xl">
              <img className="w-full h-full object-cover transition-all duration-500 ease-in-out blur-0 group-hover:blur-[0.5px] group-hover:hover:blur-0 brightness-100 group-hover:brightness-50 group-hover:hover:brightness-100 contrast-100 group-hover:contrast-[1.2] group-hover:hover:contrast-110 saturate-[0.2] group-hover:saturate-0 group-hover:hover:saturate-100 scale-100 group-hover:scale-100 group-hover:hover:scale-[1.2] group-hover:delay-300" 
                             src="https://assets.codepen.io/9981/Snapinst.app_474936904_1319019109218596_4259404602282464492_n_1080.jpg" alt="Gallery Image 7" />
            </article>

            <article className="relative overflow-hidden rounded-xl cursor-pointer h-full shadow-2xl">
              <img className="w-full h-full object-cover transition-all duration-500 ease-in-out blur-0 group-hover:blur-[0.5px] group-hover:hover:blur-0 brightness-100 group-hover:brightness-50 group-hover:hover:brightness-100 contrast-100 group-hover:contrast-[1.2] group-hover:hover:contrast-110 saturate-[0.2] group-hover:saturate-0 group-hover:hover:saturate-100 scale-100 group-hover:scale-100 group-hover:hover:scale-[1.2] group-hover:delay-300" 
                             src="https://assets.codepen.io/9981/Snapinst.app_474666412_8965167266866326_3117562484452043322_n_1080.jpg" alt="Gallery Image 8" />
            </article>

          </div>
        </div>
      </div>
    </section>
  );
}
