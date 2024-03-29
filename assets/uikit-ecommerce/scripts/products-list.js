
if (!window.shk) {
    window.shk = new Shopkeeper();
}

window.shk.onAfterInit(function() {
    window.shk.filtersInit(true);
});

let shkFiltersApplyTimer;
window.shk.onFilterChange = function(element) {
    const onFilterChangeElements = document.querySelectorAll('.shk-onfilter-change');
    onFilterChangeElements.forEach(function(el) {
        el.style.display = 'block';
        el.style.top = ((element.tagName === 'DIV' ? element : element.parentNode).offsetTop - 20) + 'px';
    });
    clearTimeout(shkFiltersApplyTimer);
    shkFiltersApplyTimer = setTimeout(function() {
        onFilterChangeElements.forEach(function(el) {
            el.style.display = 'none';
        });
    }, 4000);
};

// Filters accordion
UIkit.util
    .on('.js-accordion-section', 'shown', function (e) {
        let openIndex = 0;
        e.detail[0].items.forEach(function(item, ind) {
            if (item.classList.contains('uk-open')) {
                openIndex = ind;
            }
        });
        window.shk.setCookie('filtersAccordionOpen', openIndex, 7);
    });

if (window.shk.getCookie('filtersAccordionOpen')) {
    UIkit.accordion(document.querySelector('.js-accordion-section').parentNode)
        .toggle(parseInt(window.shk.getCookie('filtersAccordionOpen')), false);
}

// View list switch
if (document.querySelectorAll('#shkNavListType a').length > 0) {
    document.querySelectorAll('#shkNavListType a').forEach(function(buttonEl) {
        buttonEl.addEventListener('click', function(event){
            event.preventDefault();
            const targetEl = event.currentTarget || event.target;
            window.shk.catalogListChange(targetEl.dataset.view);
        }, false);
    });
}

// Sorting
if (document.querySelectorAll('#shkNavSortBy a').length > 0) {
    // selectEl.addEventListener('change', function(){
    //     shk.orderByChange(shkCurrentUrl, this.value, '{{ pagesOptions.orderByVar }}');
    // }, false);
    document.querySelectorAll('#shkNavSortBy a').forEach(function(buttonEl) {
        buttonEl.addEventListener('click', function(event){
            event.preventDefault();
            const orderByVar = document.getElementById('shkNavSortBy').dataset.sortvar;
            const targetEl = event.currentTarget || event.target;
            window.shk.orderByChange('', targetEl.dataset.sort, orderByVar);
        }, false);
    });
}
