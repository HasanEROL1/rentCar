import Car from "../types";

type ReturnType =[string, string|number|null][]
export default function formatData(car:Car):ReturnType {
// nesne içerisinden ekrana basacağımız değerleri ayır
const accepted= [
    "make",
    "model",
    "cylinders",
    "drive",
    "fueltype",
    "trany",
    "vclass",
    "year",
    "startstop",
    "co2",
    "displ",
    "atvtype",

]

  
    //değeri döndür
    return Object.entries(car).filter(([key]) => accepted.includes(key));
}