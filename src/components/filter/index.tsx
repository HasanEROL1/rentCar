import { FC } from "react"
import { SearchBar } from "./search-bar"
import Year from "./year"

const Filter: FC = () => {
  return (
    <div className="mt-12 padding-x padding-y max-width">
          <div className="home-text-container">
              <h1 className="text-4xl font-extrabold"> Araba Kataloğu   </h1>
              <p>
                  Beğenebileceğin Arabaları Keşfet
              </p>
        </div>

        <div className="home-filters">
            <SearchBar />
    
        <div className="home-filter-container">
            <Year />
        </div>
          </div>
    </div>
  )
}

export default Filter