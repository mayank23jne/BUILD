import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private electron: ElectronService) {

  }

  openFile = async() => {
    // Open the Dialog for choosing a file in user's computer.
    const fileNames = await this.electron.remote.dialog.showOpenDialog({
      properties: ['openFile']
    });
    // Check no file was selected.
    if (fileNames === undefined) {
      // Show inform
      this.showNotification("Inform", "No file selected");
      return ''
    } else {
      // return file path.
      return fileNames[0];
    }
  }

  writeFile = (defaultPath, content) => {
    // Open the Dialog for choosing a path in user's computer.
    this.electron.remote.dialog.showSaveDialog({
      // defaultPath is curent path, chose another is "save as"
      defaultPath: defaultPath
    }, (fileName) => {
      // save the file with name is fileName and the content.
      this.electron.fs.writeFile(fileName, content, (err) => {
        if (err) {
          this.showNotification('Error', "An error ocurred creating the file:" + err.message)
          return;
        }
        this.showNotification("Inform", "File is succesfully updated")
      });
    });
  }

  readFile = async(path) => {
    try {
      // try to read the file in current path
      return this.electron.fs.readFileSync(path, 'utf-8');
    } catch (err) {
      this.showNotification('Error', "An error ocurred reading the file:" + err);
    }
  }

  deleteFile = (path) => {
    //  a void function, return nothing.
    // check if the file path is available
    if (this.electron.fs.existsSync(path)) {
      // delete by unlink
      this.electron.fs.unlink(path, (err) => {
        if (err) {
          this.showNotification('Error', "An error ocurred updating the file" + err.message)
          return;
        }
        this.showNotification("Inform", "File succesfully deleted")
      });
    } else {
      this.showNotification('Error', "This file doesn't exist, cannot delete")
    }
  }

  showNotification = (title, content) => {
    // create a desktop notification
    let myNotification = new Notification(title, {
      body: content
    })
  }
}