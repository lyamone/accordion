const basicAccordion = new Accordion('basic-accordion');

const customAccordionCreator = document.getElementById('custom-accordion-btn');

customAccordionCreator.addEventListener('click', () => {
    var acc = document.querySelector('#custom-accordion');  
    var fc = acc.firstChild;

    while( fc ) {
        acc.removeChild( fc );
        fc = acc.firstChild;
    }
    const customAccordion = new Accordion('custom-accordion',{
        quantity:  document.getElementById('custom-accordion-quantity').value
    });
});

const newsAccordion = new NewsAccordion('ajax-accordion');