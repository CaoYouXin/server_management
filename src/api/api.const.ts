export class API {

  static mode: string;
  static api = {
    "server/list": {
      "prod": "http://server.caols.tech:9000/server/list",
      "dev": "http://localhost:8080/servers/server/list"
    },
    "server/manipulation": {
      "prod": function (aDo, at) {
        return `http://server.caols.tech:9000/server/manipulation?do=${aDo}&at=${at}`;
      },
      "dev": function (aDo, at) {
        return `http://localhost:8080/servers/server/manipulation?do=${aDo}&at=${at}`;
      }
    },
    "server/config": {
      "prod": "http://server.caols.tech:9000/server/config",
      "dev": "http://localhost:8080/servers/server/config"
    },
    "server/config/get": {
      "prod": function (serverName) {
        return `http://server.caols.tech:9000/server/config/get?serverName=${serverName}`;
      },
      "dev": function (serverName) {
        return `http://localhost:8080/servers/server/config/get?serverName=${serverName}`;
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
