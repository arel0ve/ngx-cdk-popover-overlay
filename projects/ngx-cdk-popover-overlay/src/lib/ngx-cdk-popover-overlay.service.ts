import { Injectable, Injector } from '@angular/core';
import { ConnectionPositionPair, Overlay, OverlayConfig, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { PopoverContent, PopoverRef } from './ngx-cdk-popover-overlay-ref';
import { NgxCdkPopoverOverlayComponent } from './ngx-cdk-popover-overlay.component';

export interface PopoverParams<T> {
  origin: HTMLElement;
  content: PopoverContent;
  data?: T;
  width: string | number;
  height?: string | number;
  hasBackdrop: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NgxCdkPopoverOverlayService {
  constructor(private readonly overlay: Overlay,
              private readonly injector: Injector) { }

  open<T>({ origin, content, data, width, height, hasBackdrop }: PopoverParams<T>): PopoverRef<T> {
    const overlayRef = this.overlay.create(this.getOverlayConfig({ origin, width, height, hasBackdrop }));
    const popoverRef = new PopoverRef<T>(overlayRef, content, data);

    const injector = this.createInjector(popoverRef, this.injector);
    overlayRef.attach(new ComponentPortal(NgxCdkPopoverOverlayComponent, null, injector));

    return popoverRef;
  }

  createInjector(popoverRef: PopoverRef, injector: Injector) {
    const tokens = new WeakMap([[PopoverRef, popoverRef]]);
    return new PortalInjector(injector, tokens);
  }

  private getOverlayConfig({ origin, width, height, hasBackdrop }): OverlayConfig {
    return new OverlayConfig({
      width,
      height,
      hasBackdrop: true,
      backdropClass: hasBackdrop ? 'popover-backdrop' : 'transparent-backdrop',
      positionStrategy: this.getOverlayPosition(origin),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

  private getOverlayPosition(origin: HTMLElement): PositionStrategy {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions(this.getPositions())
      .withPush(false);

    return positionStrategy;
  }

  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
      }
    ];
  }

}
