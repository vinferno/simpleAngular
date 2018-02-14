import { Injectable } from '@angular/core';
import {ReadDirService} from './read-dir/read-dir.service';
import {ReadfileService} from './read-file/read-file.service';
import {WriteFileService} from './write-file/read-file.service';

@Injectable()
export class ApiExplorerService {

  constructor(
    public readDir: ReadDirService,
    public readFile: ReadfileService,
    public writeFile: WriteFileService,
  ) { }

}

export const ApiServicesExplorer = [ApiExplorerService, ReadDirService, ReadfileService, WriteFileService];
