import { Injectable, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { FuncModel } from '@shared/models/funcModel.model';
import { Curve } from '@shared/models/curve.model';
import { FitStatistics } from '@shared/models/fitstatistics.model';

@Injectable({
  providedIn: 'root'
})
export class FittingService {
  // for compatibility with rusfun code, store data in Float64Arrays
  curve1: Curve = { x: new Float64Array([]), y: new Float64Array([])};
  curve2: Curve = { x: new Float64Array([]), y: new Float64Array([])};


  models!: FuncModel[];
  // currently selected model
  selectedModel!: FuncModel;

  // map which parameters of current model can generally be fitted
  // extracted from the default values
  fittableParameters: { [key: string]: boolean } = {};

  // selected data file
  selectedXYFile!: Blob;

  // in case a fit was performed, for display of fit statistics
  fitStatistics!: FitStatistics;

  // FormGroup to control the linspace if no data is present
  linspaceForm!: FormGroup;

  // FormGroup to control the parameters of a set model
  parameterForm!: FormGroup;

  checkboxKey = 'checkboxes';

  fitWorker!: Worker;
  fitRunning = false;
  fitT0!: number;

  calculated_points: number = 0;
  isCalculating: boolean = false;
  // Observable string sources
  private refreshPlotSubject = new Subject<any>();
  refreshPlotCalled$ = this.refreshPlotSubject.asObservable();

  constructor(
    private formBuilder: FormBuilder) {
    if (typeof Worker !== 'undefined') {
      // initialize a worker from adder.worker.ts
      this.initWorker();
    } else {
      console.log('Web Workers are not supported in this environment');
    }
  }

  initWorker() {
    this.fitWorker = new Worker(
      new URL('src/app/shared/workers/superball.worker', import.meta.url),
      { type: "module" });

    // define behaviour when worker posts a message
    this.fitWorker.onmessage = ({ data }) => {
      if (data.task === 'fit') { // worker reports about afit
        // this.eval_fit_result(data.result);
      } else if (data.task === 'model') { // worker calculated a datapoint
        this.curve1.y[data.result.x] = data.result.y;
        this.calculated_points += 1;
        this.callRefreshPlot();
        if (this.calculated_points === this.curve1.x.length) {
          this.isCalculating = false;
        }
      }
    };
  }

  callRefreshPlot() {
    // Service message commands
    this.refreshPlotSubject.next();
  }

  setModels(models: FuncModel[]) {
    this.models = models;
  }

  calc_model(modelName: string, p: Float64Array, x: Float64Array) {
    this.isCalculating = true;
    this.calculated_points = 0;
    let y = new Float64Array(this.curve1.x.length).fill(NaN);
    y[0] = this.curve1.y[0];
    y[this.curve1.x.length-1] = this.curve1.y[this.curve1.x.length-1];
    this.curve1.y = y;

    this.fitWorker.postMessage({
      task: 'model',
      modelName,
      p,
      x,
    });
  }

  eval_model_calc(result: any) {

  }

  modelSelected() {
    // when the user selects a model, initalize the FormGroup for the parameters
    // This function does not initiate a first calculation! Call setFunction() for this
    const paramGroup: { [key: string]: any }  = {};
    const checkboxGroup: { [key: string]: any } = {};
    for (const param of this.selectedModel.parameters) {
      paramGroup[param.name] = [
        param.value,
        [
          Validators.required,
          Validators.min(param.min),
          Validators.max(param.max),
        ]
      ];
      checkboxGroup[param.name] = [
        {value: param.vary, disabled: !param.vary},
        Validators.required];
      this.fittableParameters[param.name] = param.vary;
    }
    paramGroup[this.checkboxKey] = this.formBuilder.group(checkboxGroup);
    this.parameterForm = this.formBuilder.group(
      paramGroup
    );

    // when parameters are changed by the user
    // update internal parameters and update the plot
    this.parameterForm.valueChanges
    .subscribe(val => {
      if (this.isCalculating) {
        // reset worker
        this.fitWorker.terminate();
        this.initWorker();
      }
      if (this.selectedModel && this.parameterForm.valid) {
        for (const param of this.selectedModel.parameters) {
          let newValue = this.parameterForm.value[param.name];
          if( param.name.startsWith("Gauss") ){
            newValue = Math.round(newValue);
          }
          param.value = newValue;
          param.vary = this.parameterForm.value.checkboxes[param.name];
        }
        this.setFunction();
      }
    });
  }

  setFunction() {
    // calls function from wasm and sets result in y
    // this.calculate_linspace();
    const p = new Float64Array(this.selectedModel.parameters.length);
    for (const idx in this.selectedModel.parameters) {
      if (this.selectedModel.parameters[idx]) {
        const param = this.selectedModel.parameters[idx];
        p[idx] = param.value * param.unitValue;
      }
    }
    const x = new Float64Array(this.curve1.x);

    this.calc_model(this.selectedModel.name, p, x);
  }

  linspace(xMin: number, xMax: number, N: number) {
    // calculate the linspace for given xMin, xMax and number of steps
    const x = [];
    const step = (xMax - xMin) / (N - 1);
    for (let i = 0; i < N; i++) {
      x.push(xMin + i * step);
    }
    this.curve1.x = new Float64Array(x);
  }

}
