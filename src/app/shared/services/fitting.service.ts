import { Injectable, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { range, Subject } from 'rxjs';

import { FuncModel } from '@shared/models/funcModel.model';
import { Curve } from '@shared/models/curve.model';

@Injectable({
  providedIn: 'root'
})
export class FittingService {
  // for compatibility with rusfun code, store data in Float64Arrays
  curves: Curve[];
  Ncurves = 2;

  selectedWorker = 0; // which curve parameters are selected
  calculated_points: number[];  // how many points of said worker are calculated
  curveWorkerRunning: boolean[];  // if worker is running currently


  models!: FuncModel[];
  // currently selected model
  selectedModel!: FuncModel;

  // map which parameters of current model can generally be fitted
  // extracted from the default values
  fittableParameters: { [key: string]: boolean } = {};

  // selected data file
  selectedXYFile!: Blob;

  // FormGroup to control the linspace if no data is present
  linspaceForm!: FormGroup;

  // FormGroup to control the parameters of a set model
  parameterForm!: FormGroup;

  checkboxKey = 'checkboxes';


  curveWorkers!: Worker[];
  calculated_points2: number = 0;

  // Observable string sources
  private refreshPlotSubject = new Subject<any>();
  refreshPlotCalled$ = this.refreshPlotSubject.asObservable();

  constructor(
    private formBuilder: FormBuilder) {
    this.curves = new Array(this.Ncurves);
    this.calculated_points = new Array(this.Ncurves);
    this.curveWorkerRunning = new Array(this.Ncurves);
    for (let i = 0; i < this.Ncurves; i++) {
      this.curves[i] = { x: new Float64Array([]), y: new Float64Array([])};
      this.calculated_points[i] = 0;
      this.curveWorkerRunning[i] = false;
    }

    if (typeof Worker !== 'undefined') {
      // initialize the workers
      this.curveWorkers = new Array(this.Ncurves);
      for (let i = 0; i < this.Ncurves; i++) {
        this.initWorker(i);
      }
    } else {
      /// what if workers are not supported? maybe flag this somehow
      console.log('Web Workers are not supported in this environment');
    }
  }

  initWorker(workerNum: number) {
    this.curveWorkers[workerNum] = new Worker(
        new URL('src/app/shared/workers/superball.worker', import.meta.url),
        { type: "module" });

    // define behaviour when worker posts a message
    this.curveWorkers[workerNum].onmessage = ({ data }) => {
      if (data.task === 'model') { // worker calculated a datapoint
        this.curves[workerNum].y[data.result.x] = data.result.y;
        this.calculated_points[workerNum] += 1;
        this.callRefreshPlot();
        if (this.calculated_points[workerNum] === this.curves[workerNum].x.length) {
          this.curveWorkerRunning[workerNum] = false;
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
    this.curveWorkerRunning[this.selectedWorker] = true;
    this.calculated_points[this.selectedWorker] = 0;
    let selectedCurve = this.curves[this.selectedWorker];
    /// init new y vector, keep first and last point to guess y-range
    let y = new Float64Array(this.curves[this.selectedWorker].x.length).fill(NaN);
    y[0] = selectedCurve.y[0];
    y[selectedCurve.x.length-1] = selectedCurve.y[selectedCurve.x.length-1];

    selectedCurve.y = y;

    this.curveWorkers[this.selectedWorker].postMessage({
      task: 'model',
      modelName,
      p,
      x,
    });
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
      this.updateCurve();
    });
  }

  updateCurve() {
    if (this.curveWorkerRunning[this.selectedWorker]) {
      // reset worker
      this.curveWorkers[this.selectedWorker].terminate();
      this.initWorker(this.selectedWorker);
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
  }

  setFunction() {
    // calls function from wasm and sets result in y
    const p = new Float64Array(this.selectedModel.parameters.length);
    for (const idx in this.selectedModel.parameters) {
      if (this.selectedModel.parameters[idx]) {
        const param = this.selectedModel.parameters[idx];
        p[idx] = param.value * param.unitValue;
      }
    }
    const x = new Float64Array(this.curves[this.selectedWorker].x);

    this.calc_model(this.selectedModel.name, p, x);
  }

  linspace(xMin: number, xMax: number, N: number) {
    // calculate the linspace for given xMin, xMax and number of steps
    const x = [];
    const step = (xMax - xMin) / (N - 1);
    for (let i = 0; i < N; i++) {
      x.push(xMin + i * step);
    }
    this.curves[this.selectedWorker].x = new Float64Array(x);
  }

}
