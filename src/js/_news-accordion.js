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
