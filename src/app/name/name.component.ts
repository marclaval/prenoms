import { Component, OnInit } from '@angular/core';
import { DataService , NameData} from '../data.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {
  data: NameData[];
  boundaries: any;
  stats: any[];
  input = 'Louise';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.update();
  }

  update() {
    this.dataService.getByName(this.input)
    .then((data) => {
      this.data = data;
      return Promise.all([
        this.dataService.getBoundaries(),
        this.dataService.getStats()
      ])
    })
    .then(([boundaries, stats]) => {
      this.boundaries = boundaries;
      this.stats = stats;
    });
  }

}
