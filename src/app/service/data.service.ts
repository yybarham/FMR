import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class DataService {

    ApiUrl = environment.ApiUrl;
    
    id: number;
    myStocks: string[];

    constructor(private http: HttpClient) {
    }

    getStocks(search) {
       console.log('searchURL', this.ApiUrl + search)
        search = search.toUpperCase();
        // return this.http.get(this.ApiUrl + search).toPromise();
        let data = this.getFixedData();
        let d = data.ArrayOfStockData.StockData;
        return Promise.resolve(d.filter(l=>l.Symbol && l.Symbol.indexOf(search)>=0));
    }

    getStocksData(list:string[], updateid){
      const url = "https://mobiledev.ordernet.co.il/api/stocks?symbols=GOOG,FB,MSFT&updateid=9000"
      const newUrl = url + list.join(',') + '&updateid=' +  updateid;
      //return this.http.get(newUrl).toPromise();
      console.log('Quote Data', newUrl)
      const data = this.getfixedStocks();
      data.ArrayOfStockData.StockData.forEach(item =>{
          item.UpdateId = (Math.ceil( 100000 * Math.random())).toString();
      })
      return Promise.resolve(data);
    }
     

    getFixedData(){
        return {
            "ArrayOfStockData": {
              "StockData": [
                {
                  "Name": "Golub Capital Bdc",
                  "Symbol": "GBDC"
                },
                {
                  "Name": "Golden Enterprises",
                  "Symbol": "GLDC"
                },
                {
                  "Name": "Golar Lng Limited",
                  "Symbol": "GLNG"
                },
                {
                  "Name": "Gordmans Stores",
                  "Symbol": "GMAN"
                },
                {
                  "Name": "Golar Lng Partners Lp",
                  "Symbol": "GMLP"
                },
                {
                  "Name": "Randgold Resources Limited",
                  "Symbol": "GOLD"
                },
                {
                  "Name": "Gladstone Commercial Corp.",
                  "Symbol": "GOOD"
                },
                {
                  "Name": "Gladstone Commercial Corporatio",
                  "Symbol": "GOODN"
                },
                {
                  "Name": "Gladstone Commercial Corp.",
                  "Symbol": "GOODO"
                },
                {
                  "Name": "Gladstone Commercial Corp.",
                  "Symbol": "GOODP"
                },
                {
                  "Name": "Google Inc.",
                  "Symbol": "GOOG"
                },
                {
                  "Name": ""
                }
              ]
            },
          }
    }

    getfixedStocks(){
      return {
        "ArrayOfStockData": {
          "StockData": [
            {
              "Ask": "364.99073745915234",
              "AskSize": "198",
              "BasePrice": "931.63447963615624",
              "Bid": "38.757030404525352",
              "BidSize": "284",
              "LastPrice": "925.9757916098348",
              "Name": "Google Inc.",
              "Symbol": "GOOG",
              "UpdateId": "1644827592"
            },
            {
              "Ask": "207.894430592607",
              "AskSize": "166",
              "BasePrice": "40.502577107633734",
              "Bid": "475.76351858478205",
              "BidSize": "20",
              "LastPrice": "348.55390915114151",
              "Name": "Facebook Inc",
              "Symbol": "FB",
              "UpdateId": "1644827678"
            },
            {
              "Ask": "680.612187218206",
              "AskSize": "336",
              "BasePrice": "388.00113107450358",
              "Bid": "392.97829446987168",
              "BidSize": "204",
              "LastPrice": "525.21787142624044",
              "Name": "Microsoft Corp.",
              "Symbol": "MSFT",
              "UpdateId": "1644822093"
            }
          ]
        },
      }
    }
    

}


