/* tslint:disable */
/* eslint-disable */
/**
* Calls Rust defined model functions by their function name for given parameters and a domain
* @param {string} function_name
* @param {Float64Array} p
* @param {Float64Array} x
* @returns {Float64Array}
*/
export function superball_model(function_name: string, p: Float64Array, x: Float64Array): Float64Array;
/**
*/
export function init_panic_hook(): void;
/**
* Calls Rust defined model functions by their function name for given parameters and a domain
* @param {string} function_name
* @param {Float64Array} p
* @param {Float64Array} x
* @returns {Float64Array}
*/
export function model(function_name: string, p: Float64Array, x: Float64Array): Float64Array;
/**
* Fit using the LM algorithm for model named model_name using initial
* parameters p, data (x, y, sy), fitting only where there is a non-zero
* value in vary_p
* @param {string} model_name
* @param {Float64Array} p
* @param {Float64Array} x
* @param {Float64Array} y
* @param {Float64Array} sy
* @param {Uint8Array} vary_p
* @returns {FitResult}
*/
export function fit(model_name: string, p: Float64Array, x: Float64Array, y: Float64Array, sy: Float64Array, vary_p: Uint8Array): FitResult;
/**
* The returned fit result from a fit() call
* Fields need to be accessed in JS by their getter functions that have the same name
*/
export class FitResult {
  free(): void;
/**
* @returns {Float64Array}
*/
  parameters(): Float64Array;
/**
* @returns {Float64Array}
*/
  parameter_std_errors(): Float64Array;
/**
* @returns {Float64Array}
*/
  fitted_model(): Float64Array;
/**
* @returns {number}
*/
  num_func_evaluation(): number;
/**
* @returns {number}
*/
  chi2(): number;
/**
* @returns {number}
*/
  redchi2(): number;
/**
* @returns {number}
*/
  R2(): number;
/**
* @returns {string}
*/
  convergence_message(): string;
}
