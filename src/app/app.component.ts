import { Component, ViewChild } from '@angular/core';
import { FittingService } from '@shared/services/fitting.service';
import { models } from './models';
import { LogXLogYGraphComponent } from '@shared/components/logxlogygraph/logxlogygraph.component';
import initial_data from '../assets/initial_plot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  @ViewChild('xygraph') plotElement!: LogXLogYGraphComponent;

  constructor(
    public fittingService: FittingService) { }

    ngOnInit() {
      // on creation of component init linspace formgroup with default values
      // this.fittingService.x = initial_data.x;
      // this.fittingService.y = initial_data.y;
      // this.fittingService.yData = initial_data.y;
      // this.fittingService.syData = initial_data.sy;
      // set models in fittingService to the module function models
      this.fittingService.linspace(0.01, 0.2, 100);
      this.fittingService.models = models;
      this.fittingService.selectedModel = models.find(x => x.name == 'superball') ?? models[0];
      this.fittingService.modelSelected();
    }

    ngAfterViewInit() {
      this.plotElement.updateChart();
    }
}
