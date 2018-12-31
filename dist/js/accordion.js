/**
 * @class Accordion
 * @description
 * Accordion class in pure JS.
 * @param {string} container The container element ID where the accordion will be rendered.
 * @param {object} options Options object  
 * @param {number} [options.quantity] Quantity of sections to show
 * @param {object} [options.sections] Array of sections 
*/
class Accordion {
    
    constructor(container,options){
        if(!container) {
            console.log('You must provide at least an accordion container id');
            return;
        }
        
        this.options = {
            quantity: options && options.quantity || 3,
            sections: options && options.sections || undefined
        }

        this.accordionClass = {
            container: 'Accordion-container',
            title: 'Accordion-title',
            section: 'Accordion-section',
            state:{
                open: 'is-open',
                active: 'is-active',
                close: 'ís-close'
            }
        };

        this.items=0;
        this.createList(container);

        this.renderItems();        
    }

    createList (container){
        this.accordionContainer = document.getElementById(container);
        this.accordionContainer.classList.add(this.accordionClass.container);
        this.accordionList = document.createElement('dl');
        this.accordionList.className='Accordion';
        this.accordionContainer.appendChild(this.accordionList);

        this.boundHandleClick = e => this.handleClick(e);
        this.accordionList.addEventListener('click', this.boundHandleClick);
    }

    renderItems(){
        if(this.options.sections) {
            for( var key of Object.keys(this.options.sections)){
                // let section in this.options.sections){
                this.addItem(this.options.sections[key].title, this.options.sections[key].description);
            }
        } else {
            while (this.items < this.options.quantity) {
                this.addItem();
            }
        }
    }

    /**
     * Handles clicks on the accordion list container.
     *
     * @param {object} e - Element the click occured on.
    */
    handleClick (e){
        const el = e.target;
        
        if (el.className.indexOf(this.accordionClass.title) === -1) {
            return;
        }
        const hasToOpen = !this.has(el, this.accordionClass.state.active);
        
        this.closeAllSections();
        
        if(hasToOpen) {
            this.openSection(el);
        }
    }

    openSection(el){
        this.remove(el.parentNode.nextElementSibling, this.accordionClass.state.close);
        this.add(el,this.accordionClass.state.active);
        this.add(el.parentNode.nextElementSibling,this.accordionClass.state.open);
    }

    has (el, className){
        return el.classList.contains(className);
    }

    add (el, className) {
        el.classList.add(className);
    }

    remove (el, className){
        el.classList.remove(className);
    }

    addItem (title, section) {
        this.items++;
        this.createSection(title, section);
    }

    createSection (title,section) {
        const titleElement = document.createElement('dt');
        const titleContent = document.createElement('a');
        titleContent.className = this.accordionClass.title;
        titleContent.innerText = typeof title == 'string'? title : 'Title ' + this.items;
        titleElement.appendChild(titleContent);
        this.accordionList.appendChild(titleElement);

        const sectionElement = document.createElement('dd');
        sectionElement.className = this.accordionClass.section;

        const sectionTextElement = document.createElement('p');
        sectionTextElement.innerText = typeof section == 'string'? section : `Section ${this.items}`
        sectionElement.appendChild(sectionTextElement);

        this.accordionList.appendChild(sectionElement);
        
    }
    
    closeAllSections() {
        const sections = this.accordionList.querySelectorAll('.' + this.accordionClass.section);
        for(let section of sections) {
            this.remove(section, this.accordionClass.state.open);
            this.add(section, this.accordionClass.state.close)
        }

        const titles = this.accordionList.querySelectorAll('.' + this.accordionClass.state.active);
        for(let title of titles) {
            this.remove(title, this.accordionClass.state.active);
        }
    }
}

/**
 * @class NewsAccordion
 * @description
 * Accordion News class in pure JS. 
 * Get real time news from the ABC API.
 * @param {string} container The container element ID where the accordion will be rendered.

*/
class NewsAccordion {
    constructor(container){
        this.apiKey = 'bdd70497149d4e8a8bed701a0e0ac411';
        this.news = [];
        this.getNews(container);
    }

    getNews(container){
        fetch(`https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=${this.apiKey}`
                )
        .then(response => {
            response.json().then(json => {
                this.news = json.articles;
                new Accordion(container,{
                    quantity: 10,
                    sections: this.news
                })
            });
        })
        .catch(err => {
            console.log("Error gettin news")
        });
    }
}

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