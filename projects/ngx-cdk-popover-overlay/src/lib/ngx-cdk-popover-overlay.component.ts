import { Component, OnInit } from '@angular/core';
import { PopoverContent, PopoverRef } from './ngx-cdk-popover-overlay-ref';

@Component({
  selector: 'ngx-cdk-popover-overlay',
  template: `<ng-container *ngComponentOutlet="content"></ng-container>`,
  styleUrls: ['./ngx-cdk-popover-overlay.component.css']
})
export class NgxCdkPopoverOverlayComponent implements OnInit {

  content: PopoverContent;

  constructor(private popoverRef: PopoverRef) { }

  ngOnInit() {
    this.content = this.popoverRef.content;
  }

}
