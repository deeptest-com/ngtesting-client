import * as _ from 'lodash';

import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CONSTANT } from '../../../../../utils/constant';
import { UserService } from '../../../../../service/user';
import { RunEditService } from './run-edit.service';

@Component({
  selector: 'run-edit',
  templateUrl: './run-edit.html',
  styleUrls: ['./styles.scss'],
})
export class RunEditComponent implements OnInit {
  projectId: number;

  searchModel: any = {};
  searchResult: any[];
  selectedModels: any[] = [];
  model: any = { envId: null };
  suites: any[] = [];
  envs: any[] = [];

  form: FormGroup;

  disabled: boolean = false;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
              public runEditService: RunEditService, public userService: UserService ) {

  }

  ngOnInit(): any {
    this.projectId = this.model.projectId;

    this.buildForm();
    this.suites.forEach((suite) => {
      suite.selecting = false;
    });
  }

  save(): any {
    const userIds: string[] = [];
    this.selectedModels.forEach(item => { userIds.push(item.id); });

    this.model.userIds = userIds;
    this.activeModal.close({ act: 'save', data: this.model });
  }

  dismiss(): any {
    this.activeModal.dismiss({ act: 'cancel' });
  }

  select(key: string) {
    const val = key === 'all' ? true : false;
    for (const suite of this.suites) {
      suite.selecting = val;
    }
  }

  buildForm(): void {
    this.form = this.fb.group(
      {
        'name': ['', [Validators.required]],
        'envId': ['', []],
      }, {},
    );
    _.forEach(this.suites, (suite: any, index: number) => {
      this.form.addControl('suite-' + suite.id, new FormControl('', []));
    });

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.query(data));
  }

  query(data?: any) {

  }

  changeSearch(searchModel: any): void {
    const ids = [];
    this.selectedModels.forEach(item => { ids.push(item.id); });

    this.userService.search(CONSTANT.CURR_ORG_ID, searchModel.keywords, ids).subscribe((json: any) => {
      if (json.data.length == 0) {
        this.searchResult = null;
      } else {
        this.searchResult = json.data;
      }
    });
  }

  selectSuite (item: any, status: any) {
    console.log('===', item, status);
    this.suites.forEach(suite => {
      if (suite.caseProjectId != item.caseProjectId) {
        suite.selecting = false;
      }
    });
  }

  formErrors = [];
  validateMsg = {
    'name': {
      'required': '名称不能为空',
    },
  };
}
