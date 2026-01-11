import { FC } from "react"
import Car from "../../types"
import Images from "./images"
import formatData from "../../utils/formatData"
import { createPortal } from "react-dom"
interface Props{
    isOpen:boolean
    close: () =>void
    car:Car
}

const Modal:FC<Props> = ({isOpen, close, car}) => {
 
  if (!isOpen) return null;

  return createPortal(
 <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] grid place-items-center z-50 text-accent-dark"> 
      <div className="bg-white p-6 relative w-full sm:max-w-md md:max-w-lg lg:max-w-xl  max-h-[90vh] rounded-2xl flex flex-col gap-5 shadow-xl overflow-auto">
        <button onClick={close} className="cursor-pointer absolute right-2 top-2 z-60 bg-white p-1 rounded-full">
          <img src="/close.svg" alt="" />
        </button >

        {/* Fotoğraflar */}
      <div className="relative z-10">
          <Images car={car} />
      </div>

        {/* bilgiler */}
        {formatData(car).map(([key,value])=>(
       <p key={key}
       className=" text-sm flex justify-between gap-20"> 
            <span className="capitalize">{key} :</span>
            <span className="font-extrabold capitalize">{value ==="Y"?"Var" : value==="N" ? "Yok" : value } </span>
       </p>
        ))}
      </div>
    </div>,
    document.getElementById("modal-root")!
  )


}

export default Modal
