import { FC, useState, memo } from "react";
import Car from "../../types";
import calcPrice from "../../utils/calcPrice";
import Info from "./info";
import { motion } from "motion/react";
import Button from "../button";
import Modal from "../modal";
import generateimage from "../../utils/generateimage";

interface Props {
  car: Car;
}

const Card: FC<Props> = ({ car }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="car-card group">
      {/* Araba İsmi */}
      <h2 className="car-card-content-title  ">
        {car.make} {car.model}
      </h2>
      {/* Araba Fiyatı */}
      <div className="flex mt-6 text-[19px]">
        <span className="font-semibold">₺</span>
        <span className="text-[32px]">{calcPrice(car)}</span>
        <span className="font-semibold self-end">/gün</span>
      </div>

      {/* Araç Resmi */}
      <div>
        <img
          src={generateimage(car)}
          alt={car.model}
          className="w-full h-full object-contain min-h-62.5"
        />
      </div>

      {/* Temel Bilgiler */}

      <div className="w-full mt-2 flex flex-col gap-2">
        <div className="hidden md:block  group-hover:hidden">
          <Info car={car} />
        </div>
        <div className="md:hidden">
          <Info car={car} />
        </div>

        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          className="hidden group-hover:block"
        >
          <Button
            text="Daha Fazla"
            designs="w-full text-white mt-[0.5px]"
            fn={() => setIsOpen(true)}
          />{" "}
        </motion.div>
      </div>

      <Modal isOpen={isOpen} car={car} close={() => setIsOpen(false)} />
    </div>
  );
};

export default memo(Card);
