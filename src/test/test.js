import __polyfill from "babel-polyfill";
import should from "should";
import lib from "../isotropy-http-in-app";

describe("Isotropy IncomingMessage", () => {

  it("Gets created", () => {
    const req = new lib.IncomingMessage();
    req.should.not.be.empty();
  });

  it("Triggers an event", () => {
    const req = new lib.IncomingMessage({ host: "www.example.com", method: "GET" });
    return new Promise((resolve, reject) => {
      req.on("someevent", function() {
        resolve();
      })
      req.emit("someevent");
    });
  });

  it("Sets headers", () => {
    const req = new lib.IncomingMessage({ host: "www.example.com", method: "GET" });
    req.headers = { "Accept": "text/plain" };
    req.headers["Accept"].should.equal("text/plain");
  });

  it("Sets raw headers", () => {
    const req = new lib.IncomingMessage({ host: "www.example.com", method: "GET" });
    req.headers = { "Accept": "text/plain", "Accept-Encoding": "gzip, deflate" };
    req.rawHeaders.length.should.equal(4);
    req.rawHeaders[0].should.equal("Accept");
    req.rawHeaders[1].should.equal("text/plain");
  });

  it("Sets body", () => {
    const req = new lib.IncomingMessage({ host: "www.example.com", method: "GET" });
    req.__setBody([
      { fieldname: "upload1", filename: "hello.txt", file: "foobar" },
      { fieldname: "upload2", filename: "world.txt", file: "barbaz" },
      { fieldname: "field1", value: "val1" },
      { fieldname: "field2", value: "val2" }
    ]);
    const parts = req.__getBody();
    parts.length.should.equal(4);
    parts[0].fieldname.should.equal("upload1");
    parts[0].filename.should.equal("hello.txt");
    parts[1].fieldname.should.equal("upload2");
    parts[2].fieldname.should.equal("field1");
    parts[2].value.should.equal("val1");
  });

  it("Calls cb() on setTimeout", () => {
    const req = new lib.IncomingMessage({ host: "www.example.com", method: "GET" });
    return new Promise((resolve, reject) => {
      req.setTimeout(10, () => {
        resolve();
      });
    });
  });
});

describe("Isotropy ServerResponse", () => {
  it("Gets created", () => {
    const res = new lib.ServerResponse();
    res.should.not.be.empty();
  });

  it("Sets the header", () => {
    const res = new lib.ServerResponse({ body: "hello world" });
    res.setHeader("Cache-Control", "max-age=3600");
    const header = res.getHeader("Cache-Control");
    header.should.equal("max-age=3600");
  });

  it("Deletes the header", () => {
    const res = new lib.ServerResponse({ body: "hello world" });
    res.setHeader("Cache-Control", "max-age=3600");
    res.removeHeader("Cache-Control");
    should.not.exist(res._headers["Cache-Control"]);
  });

  it("Triggers an event", () => {
    const res = new lib.ServerResponse({ body: "hello world" });
    return new Promise((resolve, reject) => {
      res.on("someevent", function() {
        resolve();
      })
      res.emit("someevent");
    });
  });

  it("Triggers end", () => {
    const res = new lib.ServerResponse({ body: "hello world" });
    return new Promise((resolve, reject) => {
      res.on("end", function() {
        res.finished.should.be.true();
        resolve();
      });
      res.end();
    });
  });

  it("Calls cb() on setTimeout", () => {
    const res = new lib.ServerResponse({ body: "hello world" });
    return new Promise((resolve, reject) => {
      res.setTimeout(10, () => {
        resolve();
      });
    });
  });

});
