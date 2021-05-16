import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    OverlayModule
  ],
  exports: [
    FooterComponent,
  ]
})
export class CoreModule { }
