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
  public currentFile = '';
  public fileTextCreated = '';

  public object = JSON.stringify({});
  public objectKeys = [];

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.readDir(this.breadCrumb);
  }

  readDir(path) {
    console.log('path', path)
    this.api.explorer.readDir.post({path }).subscribe( (res: any) => {
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

    const breadcrumbArray = this.breadCrumb.split('/');
    this.currentFile = breadcrumbArray.pop();
    if (this.breadCrumb.length > 1) {
      this.filePath = this.breadCrumb + '/' + path;
    } else {
      this.filePath = this.breadCrumb  + path;
    }
    this.api.explorer.readFile.post({path: this.filePath }).subscribe( (res: any) => {
      console.log('res', res);
      this.fileText = res;

      const testString = 'export const defaultState = ';
      let testJson;

      try {
        testJson = JSON.parse(this.fileText);
      } catch (e) {
        console.log('not json');
      }

      if (testJson) {
        this.object = JSON.stringify(testJson);
      }

    });
  }

  createActionFile() {
    this.objectKeys = Object.keys(JSON.parse(this.object));
    this.fileTextCreated = 'import {defaultState} from \'./index\';';
  }

  goToSlices() {
    this.breadCrumb = '/src/app/store/slices';
    this.readDir(this.breadCrumb);
  }

}
