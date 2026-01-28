"use strict";

/* ----------------------------------
        PRICES AND DISCOUNTS
---------------------------------- */

/* P x (100 - D )
___________________
        100*/

const btn = document.querySelector("#calculate");
const inputPrice = document.querySelector("#price");
const inputDiscount = document.querySelector("#discount");
const pResult = document.querySelector("#result");
const btnClear = document.querySelector("#clear");

btn.addEventListener("click", calculatePriceWithDiscount);
btnClear.addEventListener("click", clearForm);

/*Calculates the final price after applying a discount percentage*/

function calculatePriceWithDiscount() {
  const price = Number(inputPrice.value);
  const discount = Number(inputDiscount.value);

  if (!price || !discount) {
    pResult.innerText = "Por favor, rellena el formulario";
    return;
  }
  if (discount > 100) {
    pResult.innerText = "El descuento no puede ser mayor que 100";
    return;
  }

  const newPrice = (price * (100 - discount)) / 100;
  pResult.innerText = `El nuevo precio con descuento es ${newPrice}€;`;
}

/*Clears all form fields and resets the result message*/

function clearForm() {
  inputPrice.value = "";
  inputDiscount.value = "";
  pResult.innerText = "";
}
