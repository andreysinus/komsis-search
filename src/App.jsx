import { useEffect, useState } from "react";
import axios from "axios";
import BottomBar from "./components/bottomBar/bottomBar";
import "./App.scss";
import SearchPage from "./screen/searchPage";
import BucketPage from "./screen/bucketPage";
import { Alert, Dialog, Pagination, Snackbar } from "@mui/material";
import FilterDialog from "./components/filterDialog/filterDialog";

let tg = window.Telegram.WebApp;
tg.expand(); 

function App() {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [page, setPage] = useState(1);
  const [resPage, setResPage] = useState(0);
  const [pageQty, setPageQty] = useState(0);
  const [sort, setSort] = useState(0);
  const [filterPrices, setFilterPrices] = useState([0, 9999999]);
  const [inStock, setInStock] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentSlug, setCurrentSlug] = useState('0')
  const [openFrame, setOpenFrame] = useState(false)

  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const updateCartItems = (item, count) => {
    var array=cartItems
    array.push([item['title'], item['price'], count])
    setCartItems(array)
  }

  useEffect(()=>{
    if (currentSlug!=='0')
        setOpenFrame(true)
  }, [currentSlug])

  useEffect(() => {
    if (value.length > 2) {
      var data = getReqData(value, resPage, sort, filterPrices, inStock);
      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://komsises.pilabs.ru/products/_search",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          let pageQuantity = Math.ceil(
            response.data["hits"]["total"]["value"] / 10
          );
          setSearchResults(response.data["hits"]["hits"]);
          setPageQty(pageQuantity);
          if (pageQuantity < resPage) {
            setResPage(pageQuantity);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else setSearchResults([]);
  }, [value, resPage, sort, filterPrices, inStock]);

  return (
    <div className="App">
      <BottomBar page={page} setPage={setPage} />
      {page === 1 ? (
        <div>
          <SearchPage
            searchResults={searchResults}
            setValue={setValue}
            value={value}
            sort={sort}
            setSort={setSort}
            setFilterModal={setFilterModal}
            updateCartItems={updateCartItems}
            setSnackbarOpen={setSnackbarOpen}
            setOpenFrame={setOpenFrame}
            setCurrentSlug={setCurrentSlug}
          />
          {!!pageQty && (
            <Pagination
              className="pagination"
              count={pageQty}
              page={resPage + 1}
              showFirstButton
              showLastButton
              onChange={(_, num) => {
                setResPage(num - 1);
                window.scrollTo(0, 0);
              }}
            />
          )}
        </div>
      ) : (
        <BucketPage cartItems={cartItems}/>
      )}
      <FilterDialog
        filterModal={filterModal}
        setFilterModal={setFilterModal}
        filterPrices={filterPrices}
        setFilterPrices={setFilterPrices}
        inStock={inStock}
        setInStock={setInStock}
      />
      <Dialog fullWidth open={openFrame} onClose={() => setOpenFrame(false)}>
        <iframe title="Карточка товара" is="x-frame-bypass" src={"https://www.komsis.su/product/"+ currentSlug}></iframe>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={snackClose}>
        <Alert onClose={snackClose} severity="info" sx={{ width: '100%' }}>
          Товар добавлен в корзину!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

const getReqData = (value, resPage, sort, filterPrices, inStock) => {
  var priceFrom = filterPrices[0];
  var priceTo = filterPrices[1];
  if (inStock && priceFrom === 0) priceFrom = 0.01;
  var str = JSON.stringify({
    from: resPage * 10,
    size: 10,
    fields: [
      "title",
      "brand.title",
      "price",
      "countVologda",
      "countCherepovets",
      "slug",
    ],
    min_score: 5,
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
                boost: "3",
                fuzziness: "AUTO:4,6",
              },
            },
          },
          {
            match: {
              brand__title: {
                query: value,
                boost: "6",
              },
            },
          },
        ],
        filter: {
          range: {
            price: {
              gte: priceFrom,
              lte: priceTo,
            },
          },
        },
      },
    },
  });
  var newString;
  var returnString;
  if (sort === "2") {
    newString = str.slice(0, -1);
    returnString = newString + ',"sort":[{"price":{"order":"asc"}}]}';
    str = returnString;
  }
  if (sort === "3") {
    newString = str.slice(0, -1);
    returnString = newString + ',"sort":[{"price":{"order":"desc"}}]}';
    str = returnString;
  }
  return str;
};
