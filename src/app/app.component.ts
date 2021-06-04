import { Component, ViewChild } from '@angular/core';
import { FittingService } from '@shared/services/fitting.service';
import { models } from './models';
import {BreakpointObserver} from '@angular/cdk/layout';
import { LogXLogYGraphComponent } from '@shared/components/logxlogygraph/logxlogygraph.component';
import initial_data from '../assets/initial_plot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  @ViewChild('xygraph') plotElement!: LogXLogYGraphComponent;
  public numGridCols: number = 2;

  constructor(
    public fittingService: FittingService,
    public breakpointObserver: BreakpointObserver) {
      breakpointObserver.observe([
        '(max-width: 499px)', '(max-width: 699px)', '(max-width: 899px)'
      ]).subscribe(result => {
        let num_true = 0;
        for (let p in result.breakpoints) {
          if (result.breakpoints.hasOwnProperty(p) && result.breakpoints[p] === true) {
            num_true++;
          }
        }
        console.log(num_true)
        this.numGridCols = 4 - num_true;
      });
    }

    ngOnInit() {
      // on creation of component init linspace formgroup with default values

      // this.fittingService.yData = initial_data.y;
      // this.fittingService.syData = initial_data.sy;
      // set models in fittingService to the module function models
      this.fittingService.linspace(0.01, 0.2, 100);
      this.fittingService.models = models;
      this.fittingService.selectedModel = models.find(x => x.name == 'superball') ?? models[0];
      this.fittingService.modelSelected();
      // set initial data without calculation
      this.fittingService.x = initial_data.x;
      this.fittingService.y = initial_data.y;
    }

    ngAfterViewInit() {
      this.plotElement.updateChart();
    }
}
