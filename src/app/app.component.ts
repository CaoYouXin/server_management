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
  showConfigs = false;
  configServerName: string;

  @ViewChild("FileInput")
  private fileInput: ElementRef;

  @ViewChild("scTextarea")
  private scTextarea: ElementRef;

  private editor: any;

  constructor(private dao: DaoUtil) {}

  ngOnInit() {
    API.setProductMode(false);
    this.loadServers(0);

    this.editor = window['CodeMirror'].fromTextArea(this.scTextarea.nativeElement, {
      lineNumbers: true
    });
    console.log(this.editor);
  }

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  config(name: string) {
    let self = this;
    this.dao.get(API.getAPI("server/config/get")(name))
      .map(res => res.json())
      .subscribe(ret => {
        if (ret.code === 20000) {
          self.showConfigs = true;
          self.editor.getDoc().setValue(ret.body);
          self.configServerName = name;
        } else {
          alert(ret.body);
        }
      }, error => DaoUtil.logError(error));
  }

  submitServerConfigs() {
    let self = this;
    this.dao.post(API.getAPI("server/config"), {
      serverName: this.configServerName,
      configs: self.editor.getDoc().getValue()
    }).map(res => res.json())
      .subscribe(ret => {
        if (ret.code === 20000) {
          self.showConfigs = false;
        } else {
          alert(ret.body);
        }
      }, error => DaoUtil.logError(error));
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
        }, error => DaoUtil.logError(error));
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
