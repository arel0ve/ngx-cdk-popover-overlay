import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { NgxCdkPopoverOverlayComponent } from './ngx-cdk-popover-overlay.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [
    NgxCdkPopoverOverlayComponent
  ],
  exports: [
    OverlayModule,
    NgxCdkPopoverOverlayComponent
  ],
  entryComponents: [
    NgxCdkPopoverOverlayComponent
  ]
})
export class NgxCdkPopoverOverlayModule { }
