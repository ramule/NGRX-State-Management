import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx-demo';

  constructor() {}

  ngOnInit(): void {
    // const inputArr = [2,3,4];
    // const sumVal = this.addNumbers(1,...inputArr);
    // console.log("Sum Value: ", sumVal);

    let arr = [{"id":1,"city":"c"},{"id":2,"city":"b"},{"id":3,"city":"a"}];
    const sortedArr = this.sortNumbers(arr);
    console.log("sortedArr: ", sortedArr);
  }

  addNumbers(...nums: any) {
    console.log('nums: ', nums);
    const total = nums.reduce((previousVal: number, currentVal: number) => {
      currentVal = currentVal + previousVal;
      return currentVal;
    }, 0);
    return total;
    // var sumval = 0;
    // for(let arg of nums) {
    //   sumval+= arg
    // };
    // return sumval;
  }

  sortNumbers(arr: any[]) {
    console.log(arr);
    let res = arr.sort((a,b): any => {
      console.log("a: ", a);
      console.log("b: ", b);

      let textA = a.city.toUpperCase();
      let textB = b.city.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return res;
  }
}
