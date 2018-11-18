import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';

import { CONSTANT } from '../../../utils/constant';
import {Utils, VARI} from '../../../utils';

import { configMenu } from './config.menu';
import { BaMenuService } from '../../../theme';

import { ProjectService } from '../../../service/client/project';

@Component({
  selector: 'project-config',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./config.scss'],
  templateUrl: './config.html',
})
export class ProjectConfig implements OnInit, AfterViewInit, OnDestroy {
  projectId: number;

  constructor(private _route: ActivatedRoute, private _menuService: BaMenuService,
              private _projectService: ProjectService) {
    this._route.params.forEach(params => {
      this.projectId = +params['id'];
    });

    console.log('projectId', this.projectId);
  }

  ngOnInit() {
    if (!CONSTANT.WORK_PRJ_NAME) {
      this._projectService.get(this.projectId).subscribe((json: any) => {
        CONSTANT.WORK_PRJ_NAME = json.data.name;
        this.updateMenu();
      });
    } else {
      this.updateMenu();
    }
  }

  updateMenu() {
    this._menuService.updateMenuByRoutes(configMenu(CONSTANT.CURR_ORG_ID, this.projectId,
      CONSTANT.WORK_PRJ_NAME));
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
  }

}

