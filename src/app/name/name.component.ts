import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService , NameData} from '../data.service';
import { ConfigService } from '../config.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit, OnDestroy {
  data: NameData[];
  boundaries: any;
  stats: any[];
  input = '';
  private dataSource: Subscription;
  private subscription: Subscription;

  constructor(private dataService: DataService, private configService: ConfigService,
              private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.dataSource = this.route.paramMap.subscribe((params: ParamMap) => {
      this.input = params.get('n') || 'Marc';
      this._refresh();
    });
    this.subscription = this.configService.getChangeEmitter().subscribe(() => {
      this._refresh();
    });
  }

  update() {
    this.router.navigate(['/name', this.input]);
  }

  _refresh() {
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

  ngOnDestroy() {
    this.dataSource.unsubscribe();
    this.subscription.unsubscribe();
  }

}
