import { Directive, ElementRef, Inject, Renderer2, OnDestroy, OnInit, AfterViewInit, Input } from '@angular/core';

import * as _ from 'lodash';
declare var jQuery;

import { CONSTANT } from '../../utils/constant';
import { ClientService } from '../../service/client';

@Directive({
  selector: '[resize]',
})
export class ResizeDirective implements OnDestroy, OnInit, AfterViewInit, OnDestroy {

  private elem: Element;

  private container: any;
  private left: any;
  private handle: any;

  private isResizing: boolean;
  private lastDownX: any;

  private disposersForDragListeners: Function[] = [];

  @Input('resize') profileProp: string;

  public constructor(@Inject(ElementRef) public element: ElementRef, @Inject(Renderer2) private renderer: Renderer2,
                     private clientService: ClientService) {
    this.elem = element.nativeElement;
  }

  public ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.container = jQuery(this.elem);

    const left = this.elem.querySelector('.resize-left');
    const handle = this.elem.querySelector('.resize-handle');

    this.left = jQuery(left);
    this.handle = jQuery(handle);

    this.disposersForDragListeners.push(
      this.renderer.listen(handle, 'mousedown', this.onmousedown.bind(this)));
  }

  public ngOnDestroy(): void {
    this.disposersForDragListeners.forEach(dispose => dispose());
  }

  private onmousedown(e): any {
    this.isResizing = true;
    this.lastDownX = e.clientX;

    this.disposersForDragListeners.push(
      this.renderer.listen(this.elem, 'mousemove', this.onmousemove.bind(this)));
    this.disposersForDragListeners.push(
      this.renderer.listen(this.elem, 'mouseup', this.onmouseup.bind(this)));
  }

  private onmousemove(e): any {
    if (!this.isResizing) {
      return;
    }

    this.left.css('width', e.clientX);
    this.handle.css('left', e.clientX);
  }

  private onmouseup(e): any {
    this.isResizing = false;
    _.forEach(this.disposersForDragListeners, (dispose: Function, index: number) => {
      if (index > 0) {
        dispose();
      }
    });

    const left = this.left.css('width').replace('px', '');
    this.clientService.setLeftSize(left, this.profileProp).subscribe((json: any) => {
      CONSTANT.PROFILE.leftSize = { leftSizeCase: json.leftSizeCase, leftSizeIssue: json.leftSizeIssue };
    });
  }
}
