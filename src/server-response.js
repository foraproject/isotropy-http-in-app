/* @flow */
import { EventEmitter } from 'events';

const isDefined = function(val: any) : boolean {
  return (typeof val !== "undefined" && val !== null);
};

class ServerResponse extends EventEmitter {
  statusCode: number;
  statusMessage: string;
  finished: boolean;
  _headers: Object;
  headersSent: true;
  sendDate: true;
  body: string;

  constructor() {
    super();
    this.statusCode = -1;
    this.statusMessage = "";
    this.finished = false;
    this.headersSent = true;
    this.sendDate = true;
    this.body = "";
    this._headers = {};
  }

  get socket() : void {
    throw new Error("Not implemented");
  }

  addTrailers(headers: Object) {
    this._headers = Object.assign(this._headers, headers);
  }

  removeHeader(name: string) {
    if (isDefined(this._headers[name])) {
      this._headers[name] = undefined;
    }
  }

  getHeader(field: string) : string {
    return this._headers[field];
  }
  setHeader(field: string, val: string) {
    this._headers[field] = val;
  }

  setTimeout(msecs: number, cb: Function) : ServerResponse {
    setTimeout(cb, msecs);
    return this;
  }

  write(data: string) {
    this.body += data;
  }

  writeHeader(args: any) {
    if (args.length === 2) {
      this.statusCode = args[0];
      this._headers = Object.assign(this._headers, args[1]);
    } else if (args.length === 3) {
      this.statusCode = args[0];
      this.statusMessage = args[1];
      this._headers = Object.assign(this._headers, args[2]);
    }
  }

  end(body: string) {
    this.body += body;
    this.finished = true;
    this.emit("end", this.body);
  }
}

export default ServerResponse;
