"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    };
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "reset",
    value: function reset() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    }
  }, {
    key: "format",
    value: function format() {
      return this.pad0(this.state.times.minutes) + ":" + this.pad0(this.state.times.seconds) + ":" + this.pad0(Math.floor(this.state.times.miliseconds));
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.setState({
          running: true
        });
        this.watch = setInterval(function () {
          return _this2.step();
        }, 10);
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
    }
  }, {
    key: "calculate",
    value: function calculate() {
      var currentTimes = Object.assign({}, this.state.times);

      currentTimes.miliseconds = currentTimes.miliseconds + 1;
      if (currentTimes.miliseconds >= 100) {
        currentTimes.seconds = currentTimes.seconds + 1;
        currentTimes.miliseconds = 0;
      }
      if (currentTimes.seconds >= 60) {
        currentTimes.minutes = currentTimes.minutes + 1;
        currentTimes.seconds = 0;
      }

      this.setState({
        times: {
          minutes: currentTimes.minutes,
          seconds: currentTimes.seconds,
          miliseconds: currentTimes.miliseconds
        }
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.state.running = false;
      clearInterval(this.watch);
      var newResult = {
        time: this.format(),
        id: Date.now()
      };
      this.setState({
        results: this.state.results.concat(newResult)
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      this.setState({
        results: []
      });
    }
  }, {
    key: "pad0",
    value: function pad0(value) {
      var result = value.toString();
      if (result.length < 2) {
        result = '0' + result;
      }
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "menu" },
          React.createElement(
            "a",
            { onClick: function onClick() {
                return _this3.start();
              }, href: "#", className: "menu__button", id: "start" },
            "start"
          ),
          React.createElement(
            "a",
            { onClick: function onClick() {
                return _this3.stop();
              }, href: "#", className: "menu__button", id: "stop" },
            "stop"
          ),
          React.createElement(
            "a",
            { onClick: function onClick() {
                return _this3.reset();
              }, href: "#", className: "menu__button", id: "reset" },
            "reset"
          ),
          React.createElement(
            "a",
            { onClick: function onClick() {
                return _this3.clear();
              }, href: "#", className: "menu__button", id: "clear" },
            "clear"
          )
        ),
        React.createElement(
          "div",
          { className: "timer" },
          this.format()
        ),
        React.createElement(Results, { results: this.state.results })
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

var Results = function (_React$Component2) {
  _inherits(Results, _React$Component2);

  function Results() {
    _classCallCheck(this, Results);

    return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).apply(this, arguments));
  }

  _createClass(Results, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "ul",
        { className: "results" },
        this.props.results.map(function (result) {
          return React.createElement(
            "li",
            { className: "results__item", key: result.id },
            result.time
          );
        })
      );
    }
  }]);

  return Results;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
