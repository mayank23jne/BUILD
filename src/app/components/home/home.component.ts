import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { FileService } from '../../services/file.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  text = "";
  name = "";
  constructor(private electron: ElectronService, private fileService: FileService){ }

  ngOnInit() {
  }

  openFile = () => {
    this.fileService.openFile().then((res) => {
       this.name = res;
    })
  }
  
  writeFile = () => {
    this.fileService.writeFile(this.name,this.text);
  }

  readFile = () => {
    this.fileService.readFile(this.name).then((res) => {
      this.text = res;
    })
  }

  deleteFile = () => {
    this.fileService.deleteFile(this.name);
    this.name = '';
    this.text = '';
  }
  
  closeWindow() {
    this.electron.window.close();
  }

  minimizeWindow() {
    this.electron.window.minimize();
  }
}
