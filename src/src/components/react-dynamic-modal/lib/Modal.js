'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.ModalManager = exports.Modal = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prefix = require('react-prefixr');

var defaultStyles = {
   overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99999999,
      overflow: 'hidden',
      perspective: 1300,
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
   },

   content: {
      position: 'relative',
      margin: '15% auto',
      width: '30%',
      border: '1px solid rgba(0, 0, 0, .2)',
      background: '#fff',
      overflow: 'auto',
      borderRadius: '4px',
      outline: 'none',
      boxShadow: '0 5px 10px rgba(0, 0, 0, .3)'
   }
};

var defaultTransition = {
   property: 'all',
   duration: 300,
   timingfunction: 'linear'
};

var stopPropagation = function stopPropagation(e) {
   return e.stopPropagation();
};

var onClose = void 0;

var Modal = exports.Modal = function (_Component) {
   _inherits(Modal, _Component);

   function Modal(props) {
      _classCallCheck(this, Modal);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Modal).call(this, props));

      _this.state = {
         open: false
      };
      return _this;
   }

   _createClass(Modal, [{
      key: 'close',
      value: function close() {
         if (!this.props.onRequestClose || this.props.onRequestClose()) {
            ModalManager.close();
         }
      }
   }, {
      key: 'handleKeyDown',
      value: function handleKeyDown(event) {
         if (event.keyCode == 27 /*esc*/) this.close();
      }
   }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
         var _this2 = this;

         var transitionTimeMS = this.getTransitionDuration();
         setTimeout(function () {
            return _this2.setState({ open: true });
         }, 0);
         onClose = function onClose(callback) {
            _this2.setState({ open: false }, function () {
               _this2.closeTimer = setTimeout(callback, transitionTimeMS);
            });
         };
      }
   }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
         onClose = null;
         clearTimeout(this.closeTimer);
      }
   }, {
      key: 'getTransitionDuration',
      value: function getTransitionDuration() {
         var effect = this.props.effect;

         if (!effect.transition) {
            return defaultTransition.duration;
         }
         return effect.transition.duration || defaultTransition.duration;
      }
   }, {
      key: 'render',
      value: function render() {
         var _props = this.props;
         var style = _props.style;
         var effect = _props.effect;
         var open = this.state.open;


         var transition = effect.transition;
         if (!transition) {
            transition = defaultTransition;
         } else {
            transition = (0, _lodash2.default)({}, defaultTransition, transition);
         }
         var transition_style = {
            'transition': transition.property + ' ' + transition.duration / 1000 + 's' + ' ' + transition.timingfunction
         };

         return _react2.default.createElement(
            'div',
            {
               ref: 'overlay',
               style: prefix((0, _lodash2.default)({}, defaultStyles.overlay, style ? style.overlay ? style.overlay : {} : {}, { transition: 'opacity ' + transition.duration / 1000 + 's' + ' linear', opacity: open ? 1 : 0 })),
               onClick: this.close.bind(this) },
            _react2.default.createElement(
               'div',
               {
                  ref: 'content',
                  style: prefix((0, _lodash2.default)({}, defaultStyles.content, style ? style.content ? style.content : {} : {}, transition_style, open ? effect.end : effect.begin)),
                  onClick: stopPropagation,
                  onKeyDown: this.handleKeyDown.bind(this) },
               this.props.children
            )
         );
      }
   }]);

   return Modal;
}(_react.Component);

var node;
var modals = [];

var renderModal = function renderModal() {
   if (modals.length == 0) return;

   var component = modals.shift();
   if (!node) {
      node = document.createElement('div');
      document.body.appendChild(node);
   }
   _reactDom2.default.render(component, node);
};

var ModalManager = exports.ModalManager = {
   open: function open(component) {
      modals.push(component);
      if (modals.length == 1) {
         // render the modal only if there is no other showing modals
         renderModal();
      }
   },
   close: function close() {
      onClose && onClose(function () {
         _reactDom2.default.unmountComponentAtNode(node);
         renderModal(); // render the other modals which are waiting.
      });
   }
};