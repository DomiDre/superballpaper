import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { LogXLogYGraphComponent } from './components/logxlogygraph/logxlogygraph.component';
import { CallbackFilterPipe } from './pipes/callback-filter.pipe';

@NgModule({
  declarations: [
    LogXLogYGraphComponent,
    CallbackFilterPipe,
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
    CallbackFilterPipe
  ]
})
export class SharedModule { }
