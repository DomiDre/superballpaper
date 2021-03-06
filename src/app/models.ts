import { FuncModel } from '@shared/models/funcModel.model';

// list of all available models, their parameters, default start values
// an description text and which function to call to calculate said model
export const models: FuncModel[] = [
  {
    name: 'sphere',
    displayName: 'Sphere',
    parameters: [{
      name: 'I0',
      value: 1,
      vary: true,
      unitName: 'cm⁻¹',
      unitValue: 1,
      min: 0,
      max: 10,
      stepSize: 1
    }, {
      name: 'R',
      value: 50,
      vary: true,
      unitName: 'Å',
      unitValue: 1,
      min: 1,
      max: 100,
      stepSize: 1
    }, {
      name: 'σ_R',
      value: 10,
      vary: true,
      unitName: '%',
      unitValue: 1e-2,
      min: 0,
      max: 30,
      stepSize: 1
    }, {
      name: 'SLD_sphere',
      value: 40,
      vary: false,
      unitName: '10⁻⁶ Å⁻²',
      unitValue: 1e-6,
      min: -100,
      max: 100,
      stepSize: 1
    }, {
      name: 'SLD_matrix',
      value: 10,
      vary: false,
      unitName: '10⁻⁶ Å⁻²',
      unitValue: 1e-6,
      min: -100,
      max: 100,
      stepSize: 1
    }, {
      name: 'Gauss-Hermite Degree',
      value: 10,
      vary: false,
      unitName: '',
      unitValue: 1,
      min: 1,
      max: 100,
      stepSize: 1
    }],
    infoText: 'Function:\n P(q) = ΔSLD²·∫V²·F(q)² g(R, σ_R) dR\nF(q) = 3[sin(qR) - qRcos(qR)]/(qR)³\ng(μ, σ): Lognormal Distr.',
  },
  {
    name: 'cube',
    displayName: 'Cube',
    parameters: [{
      name: 'I0',
      value: 1,
      vary: true,
      unitName: 'cm⁻¹',
      unitValue: 1,
      min: 0,
      max: 10,
      stepSize: 1
    }, {
      name: 'a',
      value: 50,
      vary: true,
      unitName: 'Å',
      unitValue: 1,
      min: 1,
      max: 100,
      stepSize: 1
    }, {
      name: 'σ_a',
      value: 10,
      vary: true,
      unitName: '%',
      unitValue: 1e-2,
      min: 0,
      max: 30,
      stepSize: 1
    }, {
      name: 'SLD_cube',
      value: 40,
      vary: false,
      unitName: '10⁻⁶ Å⁻²',
      unitValue: 1e-6,
      min: -100,
      max: 100,
      stepSize: 1
    }, {
      name: 'SLD_matrix',
      value: 10,
      vary: false,
      unitName: '10⁻⁶ Å⁻²',
      unitValue: 1e-6,
      min: -100,
      max: 100,
      stepSize: 1
    }, {
      name: 'Gauss-Legendre Degree',
      value: 20,
      vary: false,
      unitName: '',
      unitValue: 1,
      min: 1,
      max: 100,
      stepSize: 1
    }, {
      name: 'Gauss-Hermite Degree',
      value: 20,
      vary: false,
      unitName: '',
      unitValue: 1,
      min: 1,
      max: 100,
      stepSize: 1
    }],
    infoText: 'Function:\n P(q) = ΔSLD²·∫V²·F(q)²·g(a, σ_a) da\nF(q) = ∫∫ sinc(q_x·a)·sinc(q_y·a)·sinc(q_z·a)dΩ\ng(μ, σ): Lognormal Distr.',
  },
  {
    name: 'superball',
    displayName: 'Superball',
    parameters: [{
      name: 'I0',
      value: 1,
      vary: false,
      unitName: 'cm⁻¹',
      unitValue: 1,
      min: 0,
      max: 10,
      stepSize: 0.1
    }, {
      name: 'r',
      value: 50,
      vary: true,
      unitName: 'Å',
      unitValue: 1,
      min: 1,
      max: 100,
      stepSize: 0.1
    }, {
      name: 'σ_a',
      value: 10,
      vary: true,
      unitName: '%',
      unitValue: 1e-2,
      min: 0,
      max: 20,
      stepSize: 0.1
    }, {
      name: 'p',
      value: 1,
      vary: true,
      unitName: '',
      unitValue: 1,
      min: 1,
      max: 10,
      stepSize: 0.1
    }, {
      name: 'Contrast',
      value: 30,
      vary: true,
      unitName: '10⁻⁶ Å⁻²',
      unitValue: 1e-6,
      min: 0,
      max: 100,
      stepSize: 1
    }, {
      name: 'SLD_m',
      value: 0,
      vary: false,
      unitName: '10⁻⁶ Å⁻²',
      unitValue: 1e-6,
      min: 0,
      max: 100,
      stepSize: 1
    }, {
      name: 'Gauss-Legendre',
      value: 20,
      vary: false,
      unitName: '',
      unitValue: 1,
      min: 1,
      max: 30,
      stepSize: 1
    }, {
      name: 'Gauss-Hermite',
      value: 20,
      vary: false,
      unitName: '',
      unitValue: 1,
      min: 1,
      max: 30,
      stepSize: 1
    }],
    infoText: 'Function:\n P(q) = ΔSLD²·∫V²·F(q)²·g(a, σ_a) da\nF(q) = ∫∫ sinc(q_x·a)·sinc(q_y·a)·sinc(q_z·a)dΩ\ng(μ, σ): Lognormal Distr.',
  }
];
