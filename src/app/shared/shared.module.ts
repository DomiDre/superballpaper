import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { LogXLogYGraphComponent } from './components/logxlogygraph/logxlogygraph.component';

@NgModule({
  declarations: [
    LogXLogYGraphComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    LogXLogYGraphComponent,
  ]
})
export class SharedModule { }
