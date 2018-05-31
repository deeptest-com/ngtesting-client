import { Component } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: '[pages]',
  template: `
    <ba-page-top></ba-page-top>
    
    <div class="al-main">
      <div class="al-content">
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right" translate>{{'general.created_with'}} <i class="fa fa-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://ngtesting.com" translate>{{'general.ngtesting'}}</a> 2017-2018</div>
        
      </div>
    </footer>
    
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor() {

  }

  ngOnInit() {

  }
}
