import { Subject, Observable } from 'rxjs/Rx';
import { Injectable, Inject, ElementRef } from '@angular/core';

@Injectable()
export class ZtreeService {

  public constructor() {

  }

  selectNode(node: any): any {
    let ztree = jQuery.fn.zTree.getZTreeObj('tree');
    ztree.selectNode(node);
  }

  getNextNode(id: number): any {
    let ztree = jQuery.fn.zTree.getZTreeObj('tree');
    // let nodes = ztree.getNodesByParam("id", id, null);
    // let curr = nodes[0];

    let pass = false;
    const arr: any[] = ztree.transformToArray(ztree.getNodes());
    for (let i = 0; i < arr.length; i++) {
      if (pass && !arr[i].isParent) {
        return arr[i];
      }

      if (arr[i].id == id) {
        pass = true;
      }
    }

    // return this.getNextNodeObject(curr);
  }

  getNextNodeObject(node: any): any {
    if (!node) {
      return null;
    }

    var next = node.getNextNode();
    if (next != null) {
      console.log('next is ', next.name);

      if (!next.isParent) {
        console.log('return leaf', next.name);
        return next;
      } else {
        console.log('find folder', next.name);
        if (next.children == null || next.children.length == 0) {
          return null;
        } else {
          return next.children[0];
        }
      }
    } else {
      let parent = node.getParentNode();
      console.log('parent is ', parent.name);

      return this.getNextNodeObject(parent);
    }
  }
}
