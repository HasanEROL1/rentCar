import { FC } from "react"
import Car from './../../types/index';
import { motion } from "motion/react";

interface Props{
    car:Car
}

const Info:FC<Props> = ({car}) => {
  const arr =[ {
    icon: "/steering-wheel.svg",
    text:car.trany
  },

  {
    icon:"/tire.svg",
    text:car.drive
  },
{
  icon:"/calendar.svg",
  text:car.trany
},
]

  const navVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.4,
        ease: "easeOut" as any,
      },
    }),
  };
  return (
    <div className="w-full flex justify-between">
      {arr.map(({icon,text},i) =>(
<motion.div 
  key={i}
  custom={i}
  variants={navVariants}
  initial="hidden"
  whileInView="visible"
  className="flex-center flex-col items-start ">
  <img src={icon} className="size-6.25 brightness-60" />
  <p className="text-center text-xs mt-1 text-gray-600 ">{text}</p>
</motion.div>
      ))}

    </div>
  )
}

export default Info