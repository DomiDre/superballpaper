import { Parameter } from './parameter.model';

export class FitResult {
    params!: Float64Array;
    errors!: Float64Array;
    chi2!: number;
    redchi2!: number;
    R2!: number;
    fitted_model!: Float64Array;
    numFuncEvaluations!: number;
    convergenceMessage!: string;
  }
  