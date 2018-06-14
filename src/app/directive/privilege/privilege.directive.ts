import { Directive, ElementRef, Inject, Renderer, Input, OnInit, SimpleChanges, OnDestroy } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { PrivilegeService } from '../../service/privilege';

@Directive({
  selector: '[privilege]',
})
export class PrivilegeDirective implements OnInit, OnDestroy {
  eventCode: string = 'PrivilegeDirective';

  private elem: Element;
  @Input() privs: string;
  @Input() myPrivs: any;

  public constructor(private _privilegeService: PrivilegeService,
                     @Inject(ElementRef) public element: ElementRef, @Inject(Renderer) private renderer: Renderer) {
    this.elem = element.nativeElement;
  }

  public ngOnInit(): void {
      this.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.myPrivs) {
      this.update();
    }
  }

  update(): void {
    if (!this.myPrivs || this.myPrivs.length == 0) {
      this.myPrivs = CONSTANT.PRJ_PRIVILEGES;
    }
    console.log('===', CONSTANT.PRJ_PRIVILEGES);
    const ret = this._privilegeService.hasPrivilege(this.privs, this.myPrivs);
    if (!ret) {
      this.renderer.setElementStyle(this.elem, 'display', 'none');
    } else {
      this.renderer.setElementStyle(this.elem, 'display', 'inline');
    }
  }

  ngOnDestroy(): void {

  }
}
