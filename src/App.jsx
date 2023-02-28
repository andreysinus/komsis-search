import { useEffect, useState } from "react";
import axios from "axios";
import BottomBar from "./components/bottomBar/bottomBar";
import "./App.scss";
import SearchPage from "./screen/searchPage";
import BucketPage from "./screen/bucketPage";

function App() {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filterModal, setFilterModal] = useState(false)

  useEffect(() => {
    if (value.length > 2) {
      var data = getReqData(value);
      setLoading(true);
      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://89.223.127.242:9200/products/_search",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          setSearchResults(response.data["hits"]["hits"]);
          console.log(response.data["hits"]["hits"]);
        })
        .catch(function (error) {
          console.log(error);
        });
      setLoading(false);
    } else setSearchResults([]);
  }, [value]);

  return (
    <div className="App">
      <BottomBar page={page} setPage={setPage}/>
      {page === 1 ? (
        <SearchPage searchResults={searchResults} setValue={setValue} value={value}/>
      ) : (
        <BucketPage />
      )}
    </div>
  );
}

export default App;

const getReqData = (value) => {
  return JSON.stringify({
    fields: [
      "title",
      "brand.title",
      "price",
      "countVologda",
      "countCherepovets",
      "slug",
    ],
    query: {
      bool: {
        should: [
          {
            match: {
              code: {
                query: value,
                boost: "9",
              },
            },
          },
          {
            match: {
              title_upper: {
                query: value,
                boost: "7",
              },
            },
          },
          {
            match: {
              title: {
                query: value,
                boost: "4",
                fuzziness: "AUTO:4,6",
              },
            },
          },
          {
            match: {
              category_root: {
                query: value,
                boost: "5",
                fuzziness: "AUTO:4,6",
              },
            },
          },
          {
            match: {
              brand__title: {
                query: value,
                boost: "5",
              },
            },
          },
        ],
      },
    },
  });
};
