const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');


function scrapePage () {
    const books = [];
    for(let i=1;i<51;i++){
        let pageURL = `http://books.toscrape.com/catalogue/page-${i}.html`;
        //make an HTTP request for the page to be scraped
        request(pageURL, function(error, response, responseHtml){   
    
            //create the cheerio object
            const $ = cheerio.load(responseHtml);

                $('.product_pod').each((index,element)=>{
                    const title = $(element)
                    .children('h3')
                    .first().text();

                    const price =$(element)
                    .children('.product_price')
                    .find('.price_color').text();

                    const stockStat = $(element)
                    .children('.product_price')
                    .find(".instock").text().trim();

                    books.push({title,price,stockStat});
 
             });

             fs.writeFileSync(__dirname+'/HTML/product.json',JSON.stringify(books),(err)=>{
                console.log(err);
                });
        });      
    };     
};
//scrape the page
scrapePage();
            
        