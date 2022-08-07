
if (document.getElementById('shoppingCartContainer')) {
    var shoppingCartEdit = new ShoppingCart({
        baseUrl: '/',
        connectorUrl: 'shop_cart/action',
        selector: '#shoppingCartContainer',
        productFormSelector: '.js-shopping-cart-product form',
        templateName: 'shop_cart_edit'
    });
}

