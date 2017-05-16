import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DaoUtil} from "../dao/dao.util";
import {API} from "../api/api.const";
import "rxjs/add/operator/map";
import {FileUploader} from "ng2-file-upload";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DaoUtil],
})
export class AppComponent implements OnInit {
  title = '服务器管理器';
  servers = [];
  uploader:FileUploader = new FileUploader({
    url: "http://localhost:8080/server_management/upload",
    isHTML5: true
  });

  @ViewChild("FileInput")
  private fileInput: ElementRef;

  constructor(private dao: DaoUtil) {}

  ngOnInit() {
    API.setProductMode(false);
    this.loadServers(0);
  }

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  loadServers(delay: number) {
    let self = this;
    setTimeout(() => {
      this.dao.get(API.getAPI("server/list"))
        .map(res => res.json())
        .subscribe(ret => {
          if (ret.code === 20000) {
            self.servers = ret.body;
          }
        });
    }, delay * 1000);
  }

  deploy(name: string) {
    let self = this;
    this.dao.get(API.getAPI("server/manipulation")('deploy', name))
      .map(res => res.json())
      .subscribe(ret => {
        if (20000 === ret.code) {
          this.loadServers(2);
        }
      }, error => DaoUtil.logError(error));
  }

  start(name: string) {
    let self = this;
    this.dao.get(API.getAPI("server/manipulation")('start', name))
      .map(res => res.json())
      .subscribe(ret => {
        if (20000 === ret.code) {
          this.loadServers(2);
        }
      }, error => DaoUtil.logError(error));
  }

  stop(name: string) {
    let self = this;
    this.dao.get(API.getAPI("server/manipulation")('stop', name))
      .map(res => res.json())
      .subscribe(ret => {
        if (20000 === ret.code) {
          this.loadServers(2);
        }
      }, error => DaoUtil.logError(error));
  }

  restart(name: string) {
    let self = this;
    this.dao.get(API.getAPI("server/manipulation")('restart', name))
      .map(res => res.json())
      .subscribe(ret => {
        if (20000 === ret.code) {
          this.loadServers(2);
        }
      }, error => DaoUtil.logError(error));
  }

}
