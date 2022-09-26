"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ModalController = /*#__PURE__*/function () {
  function ModalController() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ModalController);

    this.active = false;
    this.timeout = null;
    this.eventListeners = []; // User settings / defaults 

    this.settings = {
      className: 'modal',
      allowClose: true,
      removeFromDOM: true
    }; // Simple object assign

    for (var key in this.settings) {
      if (this.settings.hasOwnProperty(key) && options.hasOwnProperty(key)) this.settings[key] = options[key];
    }

    this.template = {
      container: document.createElement('div'),
      wrapper: document.createElement('div'),
      content: document.createElement('div')
    }; // Give each item in the template a classname

    for (var _key in this.template) {
      this.template[_key].className = _key == 'container' ? this.settings.className : "".concat(this.settings.className, "__").concat(_key);
    } // Build our modal


    this.template.wrapper.appendChild(this.template.content);
    this.template.container.appendChild(this.template.wrapper); // Hide it

    this.template.container.style.display = 'none';

    if (this.settings.allowClose) {
      window.addEventListener('keydown', function (e) {
        if (_this.active && e.code == 'Escape') _this.close();
      });

      var _loop = function _loop(_key2) {
        _this.template[_key2].addEventListener('click', function (e) {
          if (_this.active && e.target === _this.template[_key2]) _this.close();
        });
      };

      for (var _key2 in this.template) {
        _loop(_key2);
      }
    }

    if (!this.settings.removeFromDOM) {
      document.body.appendChild(this.template.container);
    }
  }

  _createClass(ModalController, [{
    key: "append",
    value: function append(html) {
      var _this2 = this;

      if (!Array.isArray(html)) html = [html];
      html.forEach(function (element) {
        if (typeof element == 'string') _this2.template.content.innerHTML += element; // if we passed in html element
        else if (_typeof(element) == 'object' && element.nodeType) _this2.template.content.appendChild(element); // Tell us we messed up
          else console.warn('This is not valid html or an html element!', element);
      });
      this.callback('append');
    }
  }, {
    key: "empty",
    value: function empty() {
      // Remove all html from the content
      this.template.content.innerHTML = '';
      this.callback('empty');
    }
  }, {
    key: "open",
    value: function open() {
      var _this3 = this;

      if (this.active == false) {
        // Cancel other events
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          if (_this3.settings.removeFromDOM) {
            // Add it to the DOM
            document.body.appendChild(_this3.template.container);
          } // Show it with css


          _this3.template.container.style.display = 'block';
          _this3.timeout = setTimeout(function () {
            // Set it to active
            _this3.active = true; // Add an active class

            _this3.template.container.classList.add("".concat(_this3.settings.className, "--active")); // Callback function


            _this3.callback('open');
          }, 100);
        }, 100);
      }
    }
  }, {
    key: "close",
    value: function close() {
      var _this4 = this;

      if (this.active) {
        // Cancel other events
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          // Hide it
          _this4.template.container.classList.remove("".concat(_this4.settings.className, "--active")); // Remove it


          _this4.timeout = setTimeout(function () {
            // No longer active`
            _this4.active = false; // Hide it with css

            _this4.template.container.style.display = 'none';

            if (_this4.settings.removeFromDOM) {
              // Remove the element
              document.body.removeChild(_this4.template.container);
            } // Callback function


            _this4.callback('close');
          }, 300);
        }, 100);
      }
    }
  }, {
    key: "on",
    value: function on() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // If we passed in an event and a function and we weren't stupid
      if (event != '' && this[event] && event != 'on' && event != 'callback' && func && typeof func === 'function') {
        // make a new callback function
        this.eventListeners.push({
          event: event,
          callback: func
        });
      }
    }
  }, {
    key: "callback",
    value: function callback() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.eventListeners.filter(function (listener) {
        return listener.event == event;
      }).forEach(function (listener) {
        return listener.callback();
      });
    }
  }]);

  return ModalController;
}();

exports["default"] = ModalController;