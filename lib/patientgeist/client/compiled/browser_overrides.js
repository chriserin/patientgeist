var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Poltergeist.Browser = (function(_super) {
  __extends(Browser, _super);

  function Browser(owner, width, height) {
    var initialReset, originalResetFunc;
    this.owner = owner;
    this.responseCallback = __bind(this.responseCallback, this);
    this.additionalReset = __bind(this.additionalReset, this);
    originalResetFunc = this.resetPage;
    initialReset = (function(_this) {
      return function() {
        return originalResetFunc.apply(_this);
      };
    })(this);
    this.resetPage = (function(_this) {
      return function() {
        initialReset();
        return _this.additionalReset();
      };
    })(this);
    Browser.__super__.constructor.call(this, this.owner, width, height);
  }

  Browser.prototype.additionalReset = function() {
    this.jsonRequests = [];
    return this.page.onResourceRequested = (function(_this) {
      return function(request) {
        return _this.jsonRequests.push(request.id);
      };
    })(this);
  };

  Browser.prototype.sendResponse = function(response) {
    var callback;
    if (!this.responseCallback(response)) {
      callback = (function(_this) {
        return function() {
          return _this.responseCallback(response);
        };
      })(this);
      return this.responseInterval = setInterval(callback, 10);
    }
  };

  Browser.prototype.responseCallback = function(response) {
    var errors;
    if (this.page.allRequestsReceived(this.jsonRequests) || this.page.errors().count > 0) {
      errors = this.page.errors();
      this.page.clearErrors();
      if (errors.length > 0 && this.js_errors) {
        this.owner.sendError(new Poltergeist.JavascriptError(errors));
        clearInterval(this.responseInterval);
      } else {
        this.owner.sendResponse(response);
        clearInterval(this.responseInterval);
      }
      return true;
    }
    return false;
  };

  return Browser;

})(Poltergeist.Browser);

Poltergeist.WebPage = (function(_super) {
  __extends(WebPage, _super);

  function WebPage() {
    return WebPage.__super__.constructor.apply(this, arguments);
  }

  WebPage.prototype.allRequestsReceived = function(ids) {
    var requestId, _i, _len;
    for (_i = 0, _len = ids.length; _i < _len; _i++) {
      requestId = ids[_i];
      if (this.networkTraffic()[requestId].responseParts.length === 0) {
        return false;
      }
    }
    return true;
  };

  return WebPage;

})(Poltergeist.WebPage);
