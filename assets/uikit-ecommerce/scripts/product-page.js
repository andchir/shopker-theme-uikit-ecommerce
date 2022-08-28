
if (!window.shk) {
    window.shk = new Shopkeeper();
}

if (document.getElementById('shk-form')) {
    window.shk.productParametersInit('#shk-form', '.shk-price');
}

// Shopping cart
const shoppingCart = new ShoppingCart({
    baseUrl: '/',
    connectorUrl: 'shop_cart/action',
    selector: '#shoppingCartSmallContainer',
    productFormSelector: '.js-shopping-cart-product form',
    templateName: 'shop_cart',
    autoUpdateElements: true,
    hiddenClassName: 'uk-hidden'
});
shoppingCart
    .addEventListener('formSubmitBefore', function(e) {
        var buttonEl = e.detail.element.querySelector('button[type="submit"]');
        if (buttonEl) {
            buttonEl.setAttribute('disabled', '');
        }
    })
    .addEventListener('load', function(e) {
        if (e.detail.element) {
            var buttonEl = e.detail.element.querySelector('button[type="submit"]');
            if (buttonEl) {
                buttonEl.removeAttribute('disabled');
            }
        }
        if (e.detail.response && e.detail.response.items_total) {
            const message = '<span class="uk-margin-small-right" uk-icon=\'check\'></span>Added to <a href="/shop_cart">shopping cart</a>';
            UIkit.notification({
                message: message,
                pos: 'bottom-right'
            });
        }
        if (e.detail
            && e.detail.response
            && !e.detail.response.success
            && e.detail.response.message) {
            alert(e.detail.response.message);
        }
    });

if (document.getElementById('shoppingCartSmallContainer')) {
    const itemsTotal = document.getElementById('shoppingCartSmallContainer').dataset.itemsTotal;
    shoppingCart.updateData({
        type: 'shop',
        items_total: parseInt(itemsTotal, 10)
    });
    shoppingCart.updateElementsBySelectors();
}

// Favorites
const shoppingCartFavorites = new ShoppingCart({
    baseUrl: '/',
    connectorUrl: 'shop_cart/action',
    selector: '#userFavoritesLink',
    productFormSelector: '.js-shopping-cart-favorites form',
    templateName: 'favorites_link'
});

// Compare items
const shoppingCartCompare = new ShoppingCart({
    baseUrl: '/',
    connectorUrl: 'shop_cart/action',
    selector: '#userCompareLink',
    productFormSelector: '.js-shopping-cart-compare form',
    templateName: 'compare_link'
});

// Reviews
var shkComments;
document.addEventListener('DOMContentLoaded', function() {
    UIkit.util.on('.js-product-switcher', 'shown', function (e) {
        if (e.target.dataset.commentThreadId && !document.getElementById('shk-comments').innerHTML) {
            shkComments = new ShkComments({
                baseUrl: '/comments',
                currentUrl: '',
                threadId: e.target.dataset.commentThreadId,
                selector: '#shk-comments',
                formContainerSelector: '#shk-comments-form',
                loadingClass: 'shopping-cart-loading',
                onAddSuccess: function(data) {
                    if (data.success) {
                        document.getElementById('add_comment_comment').value = '';
                        Array.from(document.querySelectorAll('#add_comment_vote input')).forEach(function(inputEl) {
                            inputEl.checked = false;
                        });
                        UIkit.modal(document.getElementById('reviewModal')).hide();
                        shkComments.getThreadHtml();
                    }
                },
                onAddFail: function(data) {
                    console.log(data);
                }
            });
        }
    });
});
