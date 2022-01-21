const puppeteer = require("puppeteer");

const PAGE_URL =
  "https://www.hansimmo.be/appartement-te-koop-in-borgerhout/10335";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(PAGE_URL);

  const items = await page.evaluate(() => {
    // write your querySelectors here 
    let price = document.querySelector('.price').innerHTML
    price = price.replace(/\D/g, ''); // remove non number chars from string
    let address = document.querySelector('.address').innerHTML
    let description = document.querySelector('#description').innerHTML
    let title = document.querySelector('#detail-description-container h2').innerHTML

    return {
      description: description,
      title: title,
      price: price,
      address: address,
    };
  });

  console.log(items);

  return items;
};

main().then((data) => console.log(data));
main().then((data) => {
  var fs = require('fs');
  fs.writeFile("./data.json", JSON.stringify(data), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  }); 
})