import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService, NameData } from '../data.service';
import { ConfigService } from '../config.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit, OnDestroy {
  data: NameData[];
  boundaries: any;
  total: any;
  inputBegin = 2015;
  inputEnd = 2015;
  private dataSource: Subscription;
  private subscription: Subscription;

  constructor(private dataService: DataService, private configService: ConfigService,
              private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.dataSource = this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('y')) {
        this.inputBegin = this.inputEnd = parseInt(params.get('y'), 0);
      } else if (params.get('b') && params.get('e')) {
        this.inputBegin = parseInt(params.get('b'), 0);
        this.inputEnd = parseInt(params.get('e'), 0);
      } else {
        this.inputBegin = this.inputEnd = 2015;
      }
      this._refresh();
    });
    this.subscription = this.configService.getChangeEmitter().subscribe(() => {
      this._refresh();
    });
  }

  update() {
    if (this.inputBegin === this.inputEnd) {
      this.router.navigate(['/year', this.inputBegin]);
    } else {
      this.router.navigate(['/year', this.inputBegin, this.inputEnd]);
    }
  }

  _refresh() {
    this.dataService.getByYears(this.inputBegin, this.inputEnd)
    .then((data) => {
      this.data = data.filter((item) => item.times > 0);
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

  ngOnDestroy() {
    this.dataSource.unsubscribe();
    this.subscription.unsubscribe();
  }

}
