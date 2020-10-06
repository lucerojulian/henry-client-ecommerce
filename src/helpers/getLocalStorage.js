function getOrCreateLocalStorage() {
  //Obtengo del localStorage el item Cart
  var cart = localStorage.getItem("Cart");

  //Si no existe lo creo
  if (cart === null) {
    localStorage.setItem("Cart", JSON.stringify([]));
    cart = localStorage.getItem("Cart");
  }
  return JSON.parse(cart);
}

export default getOrCreateLocalStorage;
