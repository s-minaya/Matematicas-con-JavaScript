"use strict";

/* ----------------------------------
        PRICES AND DISCOUNTS
---------------------------------- */

/*
  Formula:
  (price * (100 - discount)) / 100
*/

/*---------PERCENT---------*/

const btnPercent = document.querySelector(".js_calculatePercent");
const inputPricePercent = document.querySelector(".js_pricePercent");
const inputDiscountPercent = document.querySelector(".js_discountPercent");
const pResultPercent = document.querySelector(".js_pResultPercent");
const btnClearPercent = document.querySelector(".js_clearPercent");

btnPercent.addEventListener("click", calculatePriceWithDiscount);
btnClearPercent.addEventListener("click", clearPercent);

/*Calculates the final price after applying a discount percentage*/

function calculatePriceWithDiscount() {
  const price = Number(inputPricePercent.value);
  const discount = Number(inputDiscountPercent.value);

  if (!price || !discount) {
    pResultPercent.innerText = "Por favor, rellena el formulario";
    return;
  }
  if (discount > 100) {
    pResultPercent.innerText = "El descuento no puede ser mayor que 100";
    return;
  }

  const newPrice = (price * (100 - discount)) / 100;
  pResultPercent.innerText = `El nuevo precio con descuento es ${newPrice}€`;
}

/*Clears all form fields and resets the result message*/

function clearPercent() {
  inputPricePercent.value = "";
  inputDiscountPercent.value = "";
  pResultPercent.innerText = "";
}

/*---------COUPON---------*/

const btnCoupon = document.querySelector(".js_calculateCoupon");
const inputPriceCoupon = document.querySelector(".js_priceCoupon");
const inputDiscountCoupon = document.querySelector(".js_discountCoupon");
const pResultCoupon = document.querySelector(".js_pResultCoupon");
const btnClearCoupon = document.querySelector(".js_clearCoupon");

btnCoupon.addEventListener("click", calculatePriceCoupon);
btnClearCoupon.addEventListener("click", clearCoupon);

/*---------OPTION with Object---------*/

// const couponsObj = {
//   MINAYADEAL: 30,
//   MINAYA_POWER: 50,
//   SOFI_DEV: 75,
// };

const couponsList = [];
couponsList.push({
  name: "MINAYADEAL",
  discount: 30,
});
couponsList.push({
  name: "MINAYA_POWER",
  discount: 50,
});
couponsList.push({
  name: "SOFI_DEV",
  discount: 75,
});
console.group("Cupones Disponibles");
couponsList.forEach((coupon) => {
  console.log(`${coupon.name} → ${coupon.discount}%`);
});
console.groupEnd();

function calculatePriceCoupon() {
  const price = Number(inputPriceCoupon.value);
  const coupon = inputDiscountCoupon.value;
  if (!price || !coupon) {
    pResultCoupon.innerText = "Por favor, rellena el formulario";
    return;
  }

  let discount;
  function isCouponInArray(couponElement) {
    //{name, discount}
    return couponElement.name === coupon;
  }

  const couponInArray = couponsList.find(isCouponInArray);

  if (couponInArray) {
    //discount?
    discount = couponInArray.discount;
  } else {
    pResultCoupon.innerText = "El cupón no es válido";
    return;
  }
  /*---------OPTION with Object---------*/
  //   if (couponsObj[coupon]) {
  //     discount = couponsObj[coupon];
  //   } else {
  //     pResultCoupon.innerText = "El cupón no es válido";
  //     return;
  //   }

  /*---------OPTION B---------*/

  //   switch (coupon) {
  //     case "MINAYADEAL":
  //       discount = 30;
  //       break;
  //     case "MINAYA_POWER":
  //       discount = 50;
  //       break;

  //     default:
  //       pResultCoupon.innerText = "El cupón no es válido";
  //       return;
  //   }

  /*---------OPTION C---------*/

  //   if (!price || !coupon) {
  //     pResultCoupon.innerText = "Por favor, rellena el formulario";
  //     return;
  //   }
  //   let discount;

  //   if (coupon === "MINAYADEAL") {
  //     discount = 30;
  //   } else if (coupon === "MINAYA_POWER") {
  //     discount = 50;
  //   } else {
  //     pResultCoupon.innerText = "El cupón no es válido";
  //     return;
  //   }

  const newPriceCoupon = (price * (100 - discount)) / 100;
  pResultCoupon.innerText = `El nuevo precio con descuento es ${newPriceCoupon}€`;
}

function clearCoupon() {
  inputPriceCoupon.value = "";
  inputDiscountCoupon.value = "";
  pResultCoupon.innerText = "";
}
