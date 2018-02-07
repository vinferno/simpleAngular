import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'vf-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  public breadCrumb = '/';
  public filePath = '';
  public dirs = [];
  public fileText;

  public object = JSON.stringify({});

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.readDir(this.breadCrumb);
  }

  readDir(path) {
    console.log('path', path)
    this.api.explorer.readDir.post({path }).subscribe( res => {
      console.log('res', res);
      this.dirs = res;
    });
  }

  clickFolder(folder) {
    if (this.breadCrumb.length > 1) {
      this.breadCrumb = this.breadCrumb + '/' + folder;
    } else {
      this.breadCrumb = this.breadCrumb  + folder;
    }
    this.readDir(this.breadCrumb);
  }

  back() {
    const breadCrumbArray = this.breadCrumb.split('/');
    breadCrumbArray.pop();
    this.breadCrumb = breadCrumbArray.join('/');
    this.readDir(this.breadCrumb);
  }

  readFile(path) {
    if (this.breadCrumb.length > 1) {
      this.filePath = this.breadCrumb + '/' + path;
    } else {
      this.filePath = this.breadCrumb  + path;
    }
    this.api.explorer.readFile.post({path: this.filePath }).subscribe( res => {
      console.log('res', res);
      this.fileText = res;

      const testString = 'export const defaultState = ';
      if (res.includes(testString)) {
        console.log('includess');
        this.object = res.substring(testString.length, res.length);
      } else {
        console.log('does not')
      }
    });
  }

}
