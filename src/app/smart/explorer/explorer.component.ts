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
  public actionFileCreated = '';
  public reducerFileCreated = '';
  public mainFileCreated = '';
  public object = JSON.stringify({});
  public objectKeys = [];
  public slices;
  public sliceText;
  public newDataName = '';
  public sliceNames = [];
  constructor(public api: ApiService) { }
  ngOnInit() {
    this.readDir(this.breadCrumb);
    this.getSlices();
  }
  readDir(path) {
    this.api.explorer.readDir.post({path }).subscribe( (res: any) => {
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
      this.fileText = res;
      let testJson;
      try {
        testJson = JSON.parse(this.fileText);
      } catch (e) {
        console.log('not json');
        return;
      }
      if (testJson) {
        this.object = JSON.stringify(testJson);
      }
      this.newDataName = this.currentFile;
    });
  }
  createActionFile() {


    this.actionFileCreated = '';
    this.reducerFileCreated = '';
    this.mainFileCreated = '';
    let testJson;
    try {
      testJson = JSON.parse(this.object);
    } catch (e) {
      console.log('not json');
      return;
    }
    if (testJson) {
      this.object = JSON.stringify(testJson);
    }
    if (!this.object) { return; }
    this.objectKeys = Object.keys(JSON.parse(this.object));
    this.actionFileCreated = 'import * as defaultState from \'./index.json\';';
    this.fileCreateSpace();
    this.fileCreateConsts();
    this.fileLineBreak();
    this.fileCreateTypes();
    this.fileLineBreak();
    this.fileCreateActions();
    this.fileCreateSpace();
    this.fileCreateReducer();

    this.createFiles();
  }
  validJson() {
    let testJson = '';
    try {
      testJson = JSON.parse(this.object);
    } catch (e) {
      console.log('not json');
      return;
    }
    return true;
  }
  fileLineBreak() {
    this.actionFileCreated += '\n';
  }
  fileCreateSpace() {
    this.actionFileCreated += '\n\n';
  }
  fileCreateConsts() {
    this.objectKeys.forEach( key => {
      this.actionFileCreated += 'export const ' + this.newDataName.toUpperCase() + '_UPDATE_' + key.toUpperCase();
    this.actionFileCreated += ' = \'[' + this.newDataName.toLowerCase() + ']' + ' update ' + key.toLowerCase() + '\';';this.fileLineBreak();
    });
  }
  fileCreateTypes() {
    this.actionFileCreated += 'const types = {\n';
    this.objectKeys.forEach( key => {
      this.actionFileCreated += '\t' + this.newDataName.toUpperCase() + '_UPDATE_' + key.toUpperCase() + ',\n';
    });
    this.actionFileCreated += '};\n';
  }
  fileCreateActions() {
    this.actionFileCreated += 'export const ' + this.newDataName.toLowerCase() + 'Actions = {';
    this.fileLineBreak();
    this.objectKeys.forEach( key => {
      this.actionFileCreated += '\tupdate' + key.toUpperCase().substring(0, 1) + key.toLowerCase().substring(1, key.length );
      this.actionFileCreated += ' : (payload: any) => {';
      this.fileLineBreak();
      this.actionFileCreated += '\t\treturn { type: ' + this.newDataName.toUpperCase() + '_UPDATE_' + key.toUpperCase() + ',';
      this.actionFileCreated += ' payload: payload };';
      this.fileLineBreak();
      this.actionFileCreated += '\t},\n';
    });
    this.actionFileCreated += '\ttypes,\n';
    this.actionFileCreated += '};';
  }
  fileCreateReducer () {
    this.actionFileCreated += `export function ${this.newDataName.toLowerCase()}Reducer (state: any = defaultState, action: any) {`;
    this.actionFileCreated += '\n\tswitch( action.type ) {\n';
    this.objectKeys.forEach( key => {
      this.actionFileCreated += '\t\tcase ' + this.newDataName.toUpperCase() + '_UPDATE_' + key.toUpperCase() + ':\n';
      this.actionFileCreated += '\t\t\treturn { ...state, ...{ ' + key + `: action.payload.${key} }, ...{ type: action.type } };\n`;
    });
    this.actionFileCreated += '\t\tdefault:\n';
    this.actionFileCreated += '\t\t\treturn state;\n';
    this.actionFileCreated += '\t}\n};';
  }
  goToSlices() {
    this.breadCrumb = '/src/app/store/slices';
    this.readDir(this.breadCrumb);
  }

  getSlices() {
    const slicePath = '/src/app/store/slices';
    this.api.explorer.readDir.post({path: slicePath }).subscribe( (res: any) => {
      this.sliceNames = res.map( slice => {
        return slice.key;
      });
    });
  }
  createFiles () {

    this.api.explorer.readDir.post({ path: '/src/app/store/slices' }).subscribe( (res: any) => {

        this.slices = res;
        if (this.newDataName) {
          this.slices.push({key: this.newDataName });
        }
        this.mainFileCreated = '';

        this.slices.forEach( slice => {
          this.mainFileCreated += 'import {';
          this.mainFileCreated += ` ${slice.key}Reducer, ${slice.key}Actions`;
          this.mainFileCreated += ` } from \'./slices/${slice.key}/${slice.key}';\n`;
        });

        this.mainFileCreated += '\n';
        this.mainFileCreated += 'export const reducers = {\n';

        this.slices.forEach( slice => {
          this.mainFileCreated += `\t${slice.key}: ${slice.key}Reducer,\n`;
        });
        this.mainFileCreated += '\n};\n';

        this.mainFileCreated += '\n';
        this.mainFileCreated += 'export const stateActions = {\n';

        this.slices.forEach( slice => {
          this.mainFileCreated += `\t${slice.key}: ${slice.key}Actions,\n`;
        });
        this.mainFileCreated += '\n};\n';
        this.writeSlice();
    });
  }

  isNewSlice() {
    if (this.newDataName) {
      return this.sliceNames.indexOf(this.newDataName) === -1;
    } else {
      return false;
    }
  }

  isOldSlice() {
    if (this.newDataName) {
      return this.sliceNames.indexOf(this.newDataName) !== -1;
    } else {
      return false;
    }
  }

  writeSlice() {
    const payload = {
      object:             JSON.stringify( JSON.parse( this.object ) ),
      newDataName:        this.newDataName,
      actionFileCreated:  this.actionFileCreated,
      reducerFileCreated: this.reducerFileCreated,
      mainFileCreated:    this.mainFileCreated,
    };
    this.api.explorer.writeFile.post( payload ).subscribe( res => {
      console.log('res', res);
    });
  }

}
