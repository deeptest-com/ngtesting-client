import { Input, Component, OnInit, AfterViewInit, EventEmitter, Output, Inject, Compiler, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Utils, Deferred } from '../../../../../../utils/utils';
import { PhoneValidator } from '../../../../../../validator';

import { FieldShowService } from './field-show.service';

@Component({
  selector: 'field-show',
  templateUrl: './field-show.html',
  styleUrls: ['./styles.scss'],
  providers: [FieldShowService],
})
export class FieldShowComponent implements OnInit {

  @Input()
  public model: any = {};
  @Input()
  public prop: string;
  @Input()
  public type: string;
  @Input()
  public required: boolean;

  @Output() onSave = new EventEmitter<any>();
  public form: any;

  public status: string = 'view';
  public temp: string;

  public constructor(@Inject(FieldShowService) private fieldShowService: FieldShowService, private fb: FormBuilder,
                     private compiler: Compiler, private modalService: NgbModal) {

  }

  public ngOnInit(): void {
    this.form = this.fb.group({});

    const validators = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    if (this.type == 'email') {
      validators.push(Validators.email);
    } else if (this.type == 'number') {
      validators.push(Validators.pattern('^[1-9]*$'));
    } else if (this.type == 'phone') {
      validators.push(PhoneValidator.validate());
    }

    const control: FormControl = new FormControl(this.prop);
    control.setValidators(Validators.compose(validators));
    this.form.addControl(this.prop, control);
  }

  edit(event: any, format?: string) {
    event.preventDefault();
    event.stopPropagation();

      this.status = 'edit';
      this.temp = this.model[this.prop];
  }

  save(event?: any) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const deferred = new Deferred();
    deferred.promise.then((data) => {
      this.status = 'view';
    }).catch((err) => { console.log('err', err); });

    if (this.model[this.prop] != this.temp) {
      this.onSave.emit({ deferred: deferred,
        data: { prop: this.prop, value: this.model[this.prop] } });
    } else {
      this.cancel(event);
    }
  }
  cancel(event: any) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.status = 'view';
    this.model[this.prop] = this.temp;
  }

  onEditorKeyup() {
    console.log('onEditorKeyup');
  }

}
