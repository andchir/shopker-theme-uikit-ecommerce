
// Shopping cart edit
let shoppingCartEdit;
if (document.getElementById('shoppingCartContainer')) {
    shoppingCartEdit = new ShoppingCart({
        baseUrl: '/',
        connectorUrl: 'shop_cart/action',
        selector: '#shoppingCartContainer',
        productFormSelector: '.js-shopping-cart-product form',
        hiddenClassName: 'uk-hidden',
        autoUpdateElements: true
    });
}

// Checkout form
if (document.getElementById('form-checkout-contacts')) {
    const shippingSelect = document.getElementById('order_deliveryName');
    function onCheckoutFormUpdate() {
        const paymentSelect = document.getElementById('order_paymentName');
        const sectionShipping = document.getElementById('form-checkout-shipping');
        const checkoutFormDataPayment = document.getElementById('checkoutFormDataPayment');
        const checkoutFormDataShipping = document.getElementById('checkoutFormDataShipping');
        checkoutFormDataShipping.innerText = Array.from(shippingSelect.querySelectorAll('option'))[parseInt(shippingSelect.value)].innerText;
        checkoutFormDataPayment.innerText = Array.from(paymentSelect.querySelectorAll('option'))[parseInt(paymentSelect.value)].innerText;
        if (parseInt(shippingSelect.value) === 0) {
            sectionShipping.style.display = 'none';
        } else {
            sectionShipping.style.display = 'block';
            // TODO: update shopping cart
        }
    }
    shippingSelect.addEventListener('change', onCheckoutFormUpdate);
    onCheckoutFormUpdate();
}
