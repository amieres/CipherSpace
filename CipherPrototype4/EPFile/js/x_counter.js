'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _keyGet = (k,g) => { return { key:k, get  : g }; }
var _keyVal = (k,v) => { return { key:k, value: v }; }

var timer    = Symbol();
var h        = skate.h;
var div      = skate.vdom.builder('div'      )[0];
var xCounter = skate.vdom.builder('x-counter')[0];
var button   = skate.vdom.builder('button'   )[0];

var Counter = function (_skate$Component) {
  _inherits(Counter, _skate$Component);

  function Counter() {
    _classCallCheck(this, Counter);

    return _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).apply(this, arguments));
  }

  _createClass(Counter, [
    _keyVal('connectedCallback',
    function () {
      var _this2 = this;

      // Ensure we call the parent.
      _get(Counter.prototype.__proto__ || Object.getPrototypeOf(Counter.prototype), 'connectedCallback', this).call(this);

      // We use a symbol so we don't pollute the element's namespace.
      this[timer] = setInterval(function () {
        return ++_this2.count;
      }, 1000);
    }
  ), _keyVal('disconnectedCallback',
    function () {
      // Ensure we callback the parent.
      _get(Counter.prototype.__proto__ || Object.getPrototypeOf(Counter.prototype), 'disconnectedCallback', this).call(this);

      // If we didn't clean up after ourselves, we'd continue to render
      // unnecessarily.
      clearInterval(this[timer]);
    }
  ), _keyVal('renderCallback',
    function () {
      // By separating the strings (and not using template literals or string
      // concatenation) it ensures the strings are diffed indepenedently. If
      // you select "Count" with your mouse, it will not deselect whenr endered.
      return skate.h('div', 'Count ', this.count);
    }
  )], [_keyGet('is',
    function () {
      return 'x-counter';
    }
  ), _keyGet('props',
    function () {
      return {
        // By declaring the property an attribute, we can now pass an initial value
        // for the count as part of the HTML.
        count: skate.prop.number({ attribute: true })
      };
    }
  )]);

  return Counter;
}(skate.Component);

customElements.define(Counter.is, Counter);

var Counters = function (_skate$Component) {
  _inherits(Counters, _skate$Component);

  function Counters() {
    _classCallCheck(this, Counters);
    return _possibleConstructorReturn(this, (Counters.__proto__ || Object.getPrototypeOf(Counters)).apply(this, arguments));
  }

  _createClass(Counters, [
    _keyVal('renderCallback', function() { 
        return Array.apply(null, {length: this.n + 1}).map(
            (v,i) => i == 0 ? div('n=', this.n + '. ', button({onClick: ()=> this.n++}, '+'), button({onClick: ()=> this.n--}, '-')) : xCounter({count: i*1000000 })); })
  ], [_keyGet('is', () => 'x-counters')
  , _keyGet('props', function() { return { n: skate.prop.number({ attribute: true }) }; } )
  ]);

  return Counters;
}(skate.Component);

customElements.define(Counters.is, Counters);