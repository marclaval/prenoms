import { Component, OnInit } from '@angular/core';
import { DataService, NameData } from '../data.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {
  data: NameData[];
  boundaries: any;
  total: any;
  inputBegin = 2015;
  inputEnd = 2015;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.update();
  }

  update() {
    this.dataService.getByYears(this.inputBegin, this.inputEnd)
    .then((data) => {
      this.data = data;
      return Promise.all([
        this.dataService.getBoundaries(),
        this.dataService.getStats()
      ])
    })
    .then(([boundaries, stats]) => {
      this.boundaries = boundaries;
      let sum = 0;
      for (let i = this.inputBegin - boundaries['begin']; i <= this.inputEnd - boundaries['begin']; i++) {
        sum += <any>stats[i];
      }
      this.total = sum;
    });
  }

}
