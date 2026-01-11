import { FC, useEffect, useMemo, useState } from "react";
import { fetchCars } from "../../utils/service";
import Car from "./../../types/index";
import Warning from "../warning/warning";
import Card from "./card";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import year from "../filter/year";

function List() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [yearState, setYearState] = useState<string>(
    searchParams.get("year")?.trim() || ""
  );
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page") || 1)
  );

  // Url'den parametreleri al
  const make = searchParams.get("make") || "";
  const model = searchParams.get("model") || "";
  const initialYear = searchParams.get("year")?.trim() || "";
  const page = searchParams.get("page") || "1";

  const carlist = useMemo(() => {
    if (!cars) return null;
    return cars.map((car) => <Card key={car.id} car={car} />);
  }, [cars]);
  // Sayfa parametresi reset: yeni filtre seçildiğinde page = 1
  useEffect(() => {
    setCurrentPage(1); // state reset
    searchParams.delete("page"); // URL’den page sil
    searchParams.delete("year"); // yeni arma seçince year de silinsin
    setSearchParams(searchParams);
    setYearState("");
  }, [make, model]); // filtre değiştiğinde tetiklenir

  useEffect(() => {
    let ignore = false;
    setCars(null);
    setIsLoading(true); // Ensure loading state resets on each fetch
    setError(null); // Clear existing errors before new fetch

    // Fix the misuse of get("year" || "") and argument error
    const yearParam = searchParams.get("year")?.trim() || undefined;
    fetchCars(make, model, yearParam, currentPage.toString())
      .then((data) => {
        if (!ignore) {
          setCars(data.results);
          setTotal(data.total_count);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
        setIsLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [make, model, searchParams, currentPage]);

  // Pagination click handler
  const handlePageChange = (e: { selected: number }) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage); // UI hemen güncellenir
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  // Year handler
  const handleYearChange = (newYear: string) => {
    const params = new URLSearchParams(searchParams);

    if (newYear) {
      params.set("year", newYear);
    } else {
      params.delete("year");
    }

    setSearchParams(params);
    setCurrentPage(1); // Pagination reset
  };

  // 1) cars null ise > henüz API dan cevap gelmemiştir
  if (!cars) return <Warning>Yükleniyor...</Warning>;

  // 2) error dolu ise > API dan hatalı cavap gelmiştir
  if (error) return <Warning>{error}</Warning>;

  // 3) cars boş dizi ise > aranılan karakterde veri yoktur
  if (cars.length < 1) return <Warning>Veri Bulunamadı</Warning>;

  // 4) cars dolu ise > API dan veriler gelmiştir

  return (
    <div className="padding-x max-width">
      <section className="home-cars-wrapper">{carlist}</section>
      {typeof total === "number" && total > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(total / 10)}
          forcePage={currentPage - 1}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
        />
      )}
    </div>
  );
}

export default List;
