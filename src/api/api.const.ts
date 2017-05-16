export class API {

  static mode: string;
  static api = {
    "server/list": {
      "prod": "/server_management/server/list",
      "dev": "http://localhost:8080/server_management/server/list"
    },
    "server/manipulation": {
      "prod": function (aDo, at) {
        return `/server_management/server/manipulation?do=${aDo}&at=${at}`;
      },
      "dev": function (aDo, at) {
        return `http://localhost:8080/server_management/server/manipulation?do=${aDo}&at=${at}`;
      }
    },
    "server/config": {
      "prod": "/server_management/server/config",
      "dev": "http://localhost:8080/server_management/server/config"
    },
    "server/config/get": {
      "prod": function (serverName) {
        return `/server_management/server/config/get?serverName=${serverName}`;
      },
      "dev": function (serverName) {
        return `http://localhost:8080/server_management/server/config/get?serverName=${serverName}`;
      }
    }
  };

  static setProductMode(mode: boolean) {
    API.mode = mode ? 'prod' : 'dev';
  }

  static getAPI(name: string) {
    return API.api[name][API.mode];
  }

}
