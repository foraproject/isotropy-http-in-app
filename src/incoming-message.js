/* @flow */
import { EventEmitter } from 'events';

export type FormDataEntryType = {
  fieldname: string;
  value?: string;
  filename?: string;
  file?: Object;
  transferEncoding?: string;
  mimeType?: string;
}

export type FormDataType = Array<FormDataEntryType>;

export type BodyType = string | FormDataType;

class IncomingMessage extends EventEmitter {
  statusCode: number;
  statusMessage: string;
  _headers: Object;
  httpVersion: string;
  method: string;
  _rawHeaders: Array<string>;
  url: string;
  __body: BodyType;

  constructor() {
    super();
    this.statusCode = -1;
    this.statusMessage = "";
  }


  get socket() : void {
    throw new Error("Not implemented");
  }


  get headers() : Object {
    return this._headers;
  }
  set headers(val) {
    this._headers = val;

    const rawHeaders = [];
    for (const key in val) {
      rawHeaders.push(key);
      rawHeaders.push(val[key]);
    }
    this._rawHeaders = rawHeaders;
  }


  get rawHeaders() : Array<string> {
    return this._rawHeaders;
  }


  __getBody() : BodyType {
    return this.__body;
  }
  __setBody(val: BodyType) : void {
    this.__body = val;
  }


  setTimeout(msecs: number, cb: Function) : IncomingMessage {
    setTimeout(cb, msecs);
    return this;
  }
}

export default IncomingMessage;
