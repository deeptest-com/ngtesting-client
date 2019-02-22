import { Input, Output, Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CONSTANT } from '../../../../utils/constant';
import { GlobalState } from '../../../../global.state';

import { CommentsService } from '../../../../service/client/comments';
import { CommentEditComponent } from '../../comment-edit/src/comment-edit.component';

import * as _ from 'lodash';

@Component({
  selector: 'comment-list',
  styleUrls: ['./styles.scss'],
  templateUrl: './comment-list.html',
})
export class CommentListComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() @Output() model: any = {};
  @Input() modelType: string;
  @Input() viewOnly: boolean = false;
  userId: number;

  @ViewChild('modalWrapper') modalWrapper: CommentEditComponent;
  comment: any = {};
  eventCode: string = 'CommentListComponent';

  constructor(private _state: GlobalState, private modalService: NgbModal,
              private _commentsService: CommentsService) {
  }

  public ngOnInit(): void {
    this.userId = CONSTANT.PROFILE.id;
  }

  ngAfterViewInit() {

  }

  addComments(data?: any) {
    this.modalWrapper.showModal('comment-edit');
    if (data) {
      this.comment = data;
    } else {
      this.comment = { summary: '添加备注' };
    }
  }
  editComments(comment: any, indx: number) {
    this.comment = _.clone(comment);
    this.comment.index = indx;
    this.comment.summary = '修改备注';

    this.modalWrapper.showModal('comment-edit');
  }

  saveComments() {
    const modelId = this.modelType == 'case_in_task' ? this.model.entityId : this.model.id;
    this._commentsService.save(modelId, this.modelType, this.comment).subscribe((json: any) => {
      if (json.code == 1) {
        let index;

        if (this.comment.id != json.data.id) { // 新注释
          index = this.model.comments.length;
        } else {
          index = this.comment.index;
        }
        this.model.comments[index] = json.data;
        this.modalWrapper.closeModal();
      }
    });
  }

  removeComments(comment: any, indx: number) {
    if (!confirm('确认删除' + comment.userName + '的备注？')) {
      return;
    }

    this._commentsService.remove(comment.id, this.modelType).subscribe((json: any) => {
      this.model.comments.splice(indx, 1);
    });
  }

  ngOnDestroy(): void {
  }

}
