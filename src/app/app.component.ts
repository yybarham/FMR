import { Component } from '@angular/core';
import { DataService } from './service/data.service';

export class Stock {
  symbol: string;
  name: string;
}
import { FormControl, FormGroup } from '@angular/forms';
//import { ChangeDetectorRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, count } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  myStocks: string[] = [];
  myStocksQuote: any[] = [];
  rows: any[] = [];
  updateid = 0;
  timerId;
  counter = 5;

  formGroup = new FormGroup({ search: new FormControl() });

  constructor(private dataService: DataService) {

    this.formGroup.controls.search.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(res => {
        this.getStocks(res)
        //console.log(111, res);
      });

    

    setInterval(() => {
      this.counter--;
      if (this.counter < 0)
        this.counter = 5;
    }, 1000)

  }


  getStocks(search) {
    this.dataService.getStocks(search).then((res) => {
      //console.log(100, res);
      this.rows = res;//.ArrayOfStockData.StockData;
    });
  }

  updateMyStocks() {

    if (this.myStocks.length > 0) {

      // Set Timer to refresh
    clearInterval(this.timerId);
    this.counter = 5
    this.timerId = setInterval(() => {
      this.updateMyStocks();
    }, 5 * 1000);

      const ids = this.myStocksQuote.map(q=>q.UpdateId)
      this.updateid = Math.max(...ids);
      //console.log('updateid', ids,this.updateid);

      this.dataService.getStocksData(this.myStocks, this.updateid).then(res => {
        this.myStocksQuote = res.ArrayOfStockData.StockData;
        //console.log(this.myStocksQuote)
      });
    }
  }

  addToList(symbol) {
    if (this.myStocks.indexOf(symbol) >= 0) {
      alert('Already Exist')
    } else {
      this.myStocks.push(symbol);
      this.updateMyStocks();
    }
  }

  removeMe(symbol) {
    this.myStocks = this.myStocks.filter(s => s !== symbol);
  }



}
