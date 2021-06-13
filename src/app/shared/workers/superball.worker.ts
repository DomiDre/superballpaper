/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  import('superball')
  .then(module => {
    if (data.task === 'fit') {
      const fitResult = module.fit(
        data.modelName,
        data.p,
        data.x,
        data.y,
        data.sy,
        data.varyP);

      postMessage({
        task: 'fit',
        result: {
          params: fitResult.parameters(),
          errors: fitResult.parameter_std_errors(),
          chi2: fitResult.chi2(),
          redchi2: fitResult.redchi2(),
          R2: fitResult.R2(),
          fittedModel: fitResult.fitted_model(),
          numFuncEvaluations: fitResult.num_func_evaluation(),
          convergenceMessage: fitResult.convergence_message()
        }
      });
    } else if (data.task === 'model') {
      // web worker calc model sequentially and report every result
      // allows to report progress of calculation
      for (let x_val in data.x) {
        const result = module.superball_model(
          data.modelName,
          data.p,
          new Float64Array([data.x[x_val]]));

          postMessage({
            task: 'model',
            result: {x: x_val, y: result[0]}
          });
      }
    }
  });
});
