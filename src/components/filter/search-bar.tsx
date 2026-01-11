import { FC, useState, FormEvent, useEffect } from "react";
import { makes } from "../../utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

export const SearchBar: FC = () => {
  

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    // URL parametrelerinden (varsa) başlangıç değerlerini al
    const initialMake = searchParams.get("make") || ""
    const initialModel = searchParams.get("model") || "";

    const [selectedMake, setSelectedMake] = useState<SelectOption | null>(
        initialMake ? { value: initialMake, label: initialMake } : null
    );

const [model, setModel] = useState<string>(initialModel ||"")
 
// url state senkronu
useEffect(()=> {
    const makeFromUrl = searchParams.get("make")
    const modelFromUrl = searchParams.get("model")

    setSelectedMake(
        
        makeFromUrl ? {value:makeFromUrl, label:makeFromUrl} :null
    )
    setModel(modelFromUrl || "")
},[searchParams] )

    // makes array'ini map'le dönüp string-object olarak gönderilir
    const makesOptions: SelectOption[] = makes.map((make) => ({
        value: make,
        label: make,
    }));

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
      
        // Mevcut URL parametrelerini koru ve yeni değerleri ekle
        const params = new URLSearchParams(searchParams)
     
        if (selectedMake?.value) {
            params.set("make", selectedMake.value)
        }else{
            params.delete("make")
        }
        if (model) {
            params.set("model", model)
        }else{
            params.delete("model")
        }

        params.set("page", "1")

        // URL'yi güncelle ve sayfayı yeniden yönlendir
        navigate(`?${params.toString()}`)
    };

    return (
        <form onSubmit={handleSubmit}
        className="searchbar flex gap-3 items-center justify-start">
            <div className="searchbar-item items-start gap-4">
                <div className="w-full flex flex-col">
                    <label htmlFor="make">Marka</label>
                    <div className="mt-2">
                        <Select
                            className="w-full text-black"
                            name="make"
                            options={makesOptions}
                            value={selectedMake}
                            onChange={(option) => {
                                setSelectedMake(option as SelectOption | null);
                                setModel("");
                            }}
                            inputId="make"
                            classNamePrefix="select"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: '#e4e4e7',
                                    borderColor: '#d4d4d8',
                                    '&:hover': {
                                        borderColor: '#d4d4d8',
                                    },
                                }),
                            }}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <label htmlFor="model">Model</label>
                    <div className="w-full relative mt-2">
                        <img src="/model-icon.png" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-10 pointer-events-none" />
                    

                        <input
                            type="text" 
                            name="model" 
                            id="model" 
                            placeholder="Tam model adı giriniz" 
                            className="searchbar-input rounded-2xl w-full pl-14 pr-14 bg-zinc-200 text-black"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            disabled={!selectedMake}
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition duration-300 hover:scale-105 cursor-pointer z-10">
                            <img src="/search.svg" alt="Ara" className="w-6 h-6" />
                        </button>
                    </div>
                 
                </div>
            </div>
        </form>
    )
}