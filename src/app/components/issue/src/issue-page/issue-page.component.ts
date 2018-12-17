import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { GlobalState } from '../../../../global.state';

import { RouteService } from '../../../../service/route';

import { PrivilegeService } from '../../../../service/privilege';
import { IssueService } from '../../../../service/client/issue';

import { IssueEditService } from '../issue-edit/issue-edit.service';
import { IssueAssignService } from '../issue-assign/issue-assign.service';
import { IssueWatchService } from '../issue-watch/issue-watch.service';
import { IssueTagService } from '../issue-tag/issue-tag.service';
import { IssueLinkService } from '../issue-link/issue-link.service';

import { PopDialogComponent } from '../../../pop-dialog';

declare var jQuery;

@Component({
  selector: 'issue-page',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./style.scss', '../../../comments/comment-edit/src/styles.scss'],
  templateUrl: './issue-page.html',
})
export class IssuePage implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssuePage';
  canEdit: boolean;

  form: any;
  tab: string = 'comments';

  issueEditModal: any;
  issueAssignModal: any;
  issueWatchModal: any;
  issueTagModal: any;
  issueLinkModal: any;

  @ViewChild('deleteModalWrapper') deleteModalWrapper: PopDialogComponent;

  @Input() page: any = {};
  @Input() issuePropMap: any = {};
  @Output() optEvent = new EventEmitter<any>();

  _issue: any = {};
  @Input() set issue(val) {
    this._issue = val;
  }

  get issue() {
    return this._issue;
  }

  constructor(private _routeService: RouteService, private _route: ActivatedRoute, private _state: GlobalState,
              private fb: FormBuilder, private toastyService: ToastyService, private privilegeService: PrivilegeService,
              private issueService: IssueService, private issueEditService: IssueEditService,
              private issueAssignService: IssueAssignService, private issueWatchService: IssueWatchService,
              private issueTagService: IssueTagService, private issueLinkService: IssueLinkService, ) {

    this.canEdit = this.privilegeService.hasPrivilege('issue-maintain');

    this.buildForm();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  saveField($event: any) {
    console.log($event);

    this.issueService.updateField(this._issue.id, $event.data).subscribe((json: any) => {
      if (json.code == 1) {
        $event.deferred.resolve();
      }
    });
  }

  tabChange(event: any) {
    this.tab = event.nextId;
  }

  edit() {
    this.issueEditModal = this.issueEditService.genPage(this._issue.id);

    this.issueEditModal.result.then((result) => {
      console.log('result', result);
      if (result.success) {
        this.optEvent.emit(result);
      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  assign() {
    this.issueAssignModal = this.issueAssignService.genPage(this._issue, this.issuePropMap.assigneeId);

    this.issueAssignModal.result.then((result) => {
      console.log('result', result);
      if (result.success) {
        this.optEvent.emit(result);
      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  watchList() {
    this.issueWatchModal = this.issueWatchService.genPage(this._issue.id);

    this.issueWatchModal.result.then((result) => {
      console.log('result', result);
      if (result.success) {
        this.optEvent.emit(result);
      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  tag() {
    this.issueTagModal = this.issueTagService.genPage(this._issue);

    this.issueTagModal.result.then((result) => {
      console.log('result', result);
      if (result.success) {
        this.optEvent.emit(result);
      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  link() {
    this.issueLinkModal = this.issueLinkService.genPage(this._issue);

    this.issueLinkModal.result.then((result) => {
      console.log('result', result);
      if (result.success) {
        this.optEvent.emit(result);
      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  showDeleteModal() {
    this.deleteModalWrapper.showModal();
  }

  delete() {
    this.issueService.delete(this._issue.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.deleteModalWrapper.closeModal();
        this.optEvent.emit({ act: 'delete' });
      }
    });
  }

  ngOnDestroy(): void {

  }

  buildForm() {
    this.form = this.fb.group({});
  }

}

