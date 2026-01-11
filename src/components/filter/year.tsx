import { FC, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Year: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mevcut URL parametrelerini koru
    const params = new URLSearchParams(searchParams);

    // Formdan yıl değerini al
    const formData = new FormData(e.currentTarget);
    const year = formData.get("year") as string;

    // Yıl değeri varsa ekle, yoksa parametreden kaldır
    if (year) {
      params.set("year", year);
    } else {
      params.delete("year");
    }

    // URL'yi güncelle
    navigate(`/?${params.toString()}`);
  };

  return (
    <form
      className="flex flex-col justify-center bg-zinc-100 p-1 rounded shadow mb-2 w-36 "
      onSubmit={handleSubmit}
    >
      <label htmlFor="year" className="mb-1 text-sm font-medium text-gray-700">
        Yıl
      </label>

      <div className="flex">
        <input
          type="number"
          id="year"
          name="year"
          placeholder="2020"
          min={1990}
          max={new Date().getFullYear()}
          className="w-full py-2 px-3 rounded-l-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-zinc-100 rounded px-3 text-blue hover:bg-zinc-300 cursor-pointer"
        >
          🔎
        </button>
      </div>
    </form>
  );
};

export default Year;
