//!APPLE PRODUCTS SHOPPING CART

//* obtiene el total del carrito en la sesion */
updateCartTotal();

//* event listeners */
document.getElementById("emptyCart").addEventListener("click", emptyCart);
let btns = document.getElementsByClassName('addToCart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () { addToCart(this); });
}

//* funcion ADD TO CART*/

function addToCart(element) {
    //*inicio
    let bro = [];
    let obtPrecio;
    let obtProductoNombre;
    let cart = [];
    let stringCart;

    while (element = element.previousSibling) {
        if (element.nodeType === 3) continue; // text node
        if (element.className == "precio") {
            obtPrecio = element.innerText;
        }
        if (element.className == "productoNombre") {
            obtProductoNombre = element.innerText;
        }
        bro.push(element);
    }
    //*crea objeto del producto
    let producto = {
        productoNombre: obtProductoNombre,
        precio: obtPrecio
    };
    //* convierte datos de productos a json para almacenarlo
    let stringProducto = JSON.stringify(producto);
    //*envia datos del producto al session storage */

    if (!sessionStorage.getItem('cart')) {
        //*agrega el objeto json del producto al array del carrito
        cart.push(stringProducto);
        //*cart par json 
        stringCart = JSON.stringify(cart);
        //*crea item del carrito en session storage
        sessionStorage.setItem('cart', stringCart);
        agregadoCart(obtProductoNombre);
        updateCartTotal();
    }
    else {
        //*toma informacion data del carrito del storage y la convierte en array 
        cart = JSON.parse(sessionStorage.getItem('cart'));
        //*agrega nuevo objeto de producto json 
        cart.push(stringProducto);
        //*cart devuelta a json
        stringCart = JSON.stringify(cart);
        //*sobreescribe los datos del cart en session storage  
        sessionStorage.setItem('cart', stringCart);
        agregadoCart(obtProductoNombre);
        updateCartTotal();
    }
}
//* Calcula total carrito */
function updateCartTotal() {
    //*inicio
    let total = 0;
    let precio = 0;
    let items = 0;
    let productoNombre = "";
    let cartTabla = "";
    if (sessionStorage.getItem('cart')) {
        //*toma data del carrito y lo parsea array 
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        //*obtiene el numero de articulos del cart 
        items = cart.length;
        //*loop sobre matriz del cart
        for (var i = 0; i < items; i++) {
            //*convierte cada producto json en matriz de nuevo en objeto
            let x = JSON.parse(cart[i]);
            //*obtener el valor de la propiedad precio
            precio = parseFloat(x.precio.split('$')[1]);
            productoNombre = x.productoNombre;
            //*agregar precio al total
            cartTabla += "<tr><td>" + productoNombre + "</td><td>$" + precio.toFixed(2) + "</td></tr>";
            total += precio;
        }
    }
    //*actualiza el total en sitio html
    document.getElementById("total").innerHTML = total.toFixed(2);
    //*insertar productos guardados en la tabla del cart
    document.getElementById("cartTabla").innerHTML = cartTabla;
    //*actualiza items de cart en sitio html
    document.getElementById("itemsQuantity").innerHTML = items;
}
//*comenta al usuario sobre adicion exitosa de producto al cart
function agregadoCart(pName) {
    let mensaje = pName + " was added to the cart";
    let alerts = document.getElementById("alerts");
    alerts.innerHTML = mensaje;
    if (!alerts.classList.contains("mensaje")) {
        alerts.classList.add("mensaje");
    }
}
//* Usuario vacia el cart */
function emptyCart() {
    //*elimina cart session storage object y actualiza el total del carrito 
    if (sessionStorage.getItem('cart')) {
        sessionStorage.removeItem('cart');
        updateCartTotal();
        //*limpia el mensaje y elimina class style
        let alerts = document.getElementById("alerts");
        alerts.innerHTML = "";
        if (alerts.classList.contains("mensaje")) {
            alerts.classList.remove("mensaje");
        }
    }
}