import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";

function FilterDialog(props) {
  const [stockCheck, setStockCheck] = useState(props.inStock);
  const [priceFrom, setPriceFrom] = useState(props.filterPrices[0]);
  const [priceTo, setPriceTo] = useState(props.filterPrices[1]);

  return (
    <Dialog
      open={props.filterModal}
      onClose={() => props.setFilterModal(false)}
    >
      <DialogTitle>Фильтрация</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={1}>По цене:</DialogContentText>
        <TextField
          margin="dense"
          id="name"
          value={priceFrom}
          label="Цена от (руб.)"
          type="number"
          fullWidth
          variant="standard"
          onChange={(event) => {
            setPriceFrom(Number(event.target.value));
          }}
        />
        <TextField
          margin="dense"
          id="name"
          value={priceTo}
          label="Цена до (руб.)"
          type="number"
          fullWidth
          variant="standard"
          onChange={(event) => {
            setPriceTo(Number(event.target.value));
          }}
        />
        <DialogContentText marginTop={3}>Другие параметры:</DialogContentText>
        <FormControlLabel
          sx={{ mt: 1 }}
          fullWidth
          control={
            <Switch
              checked={stockCheck}
              onChange={() => {
                setStockCheck(!stockCheck);
              }}
              fullWidth
            />
          }
          label="Только с ценой"
        />
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            props.setFilterPrices([priceFrom, priceTo]);
            props.setInStock(stockCheck);
            props.setFilterModal(false);
          }}
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterDialog;
