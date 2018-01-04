/*! react-checkbox-tree - v0.5.1 | 2017 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactCheckboxTree"] = factory(require("react"));
	else
		root["ReactCheckboxTree"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(12);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeShape = {
	label: _react2.default.PropTypes.string.isRequired,
	value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired,

	icon: _react2.default.PropTypes.node
};

var nodeShapeWithChildren = _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.shape(nodeShape), _react2.default.PropTypes.shape(_extends({}, nodeShape, {
	children: _react2.default.PropTypes.arrayOf(nodeShape).isRequired
}))]);

exports.default = nodeShapeWithChildren;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _shortid = __webpack_require__(6);

var _shortid2 = _interopRequireDefault(_shortid);

var _TreeNode = __webpack_require__(4);

var _TreeNode2 = _interopRequireDefault(_TreeNode);

var _nodeShape = __webpack_require__(2);

var _nodeShape2 = _interopRequireDefault(_nodeShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxTree = function (_React$Component) {
	_inherits(CheckboxTree, _React$Component);

	function CheckboxTree(props) {
		_classCallCheck(this, CheckboxTree);

		var _this = _possibleConstructorReturn(this, (CheckboxTree.__proto__ || Object.getPrototypeOf(CheckboxTree)).call(this, props));

		_this.onCheck = _this.onCheck.bind(_this);
		_this.onExpand = _this.onExpand.bind(_this);

		_this.id = 'rct-' + _shortid2.default.generate();
		return _this;
	}

	_createClass(CheckboxTree, [{
		key: 'onCheck',
		value: function onCheck(node) {
			var _props = this.props;
			var checked = _props.checked;
			var onCheck = _props.onCheck;


			onCheck(this.toggleChecked([].concat(_toConsumableArray(checked)), node, node.checked));
		}
	}, {
		key: 'onExpand',
		value: function onExpand(node) {
			var _props2 = this.props;
			var expanded = _props2.expanded;
			var onExpand = _props2.onExpand;


			onExpand(this.toggleNode([].concat(_toConsumableArray(expanded)), node, node.expanded));
		}
	}, {
		key: 'getFormattedNodes',
		value: function getFormattedNodes(nodes) {
			var _this2 = this;

			var _props3 = this.props;
			var checked = _props3.checked;
			var expanded = _props3.expanded;


			return nodes.map(function (node) {
				var formatted = _extends({}, node);

				formatted.checked = checked.indexOf(node.value) > -1;
				formatted.expanded = expanded.indexOf(node.value) > -1;

				if (Array.isArray(node.children) && node.children.length > 0) {
					formatted.children = _this2.getFormattedNodes(formatted.children);
				} else {
					formatted.children = null;
				}

				return formatted;
			});
		}
	}, {
		key: 'getCheckState',
		value: function getCheckState(node) {
			if (node.children === null) {
				return node.checked ? 1 : 0;
			}

			if (this.isEveryChildChecked(node)) {
				return 1;
			}

			if (this.isSomeChildChecked(node)) {
				return 2;
			}

			return 0;
		}
	}, {
		key: 'toggleChecked',
		value: function toggleChecked(checked, node, isChecked) {
			var _this3 = this;

			if (node.children !== null) {
				// Percolate check status down to all children
				node.children.forEach(function (child) {
					_this3.toggleChecked(checked, child, isChecked);
				});
			} else {
				// Set leaf to check/unchecked state
				this.toggleNode(checked, node, isChecked);
			}

			return checked;
		}
	}, {
		key: 'toggleNode',
		value: function toggleNode(list, node, toggleValue) {
			var index = list.indexOf(node.value);

			if (index > -1 && !toggleValue) {
				list.splice(index, 1);
			} else if (index === -1 && toggleValue) {
				list.push(node.value);
			}

			return list;
		}
	}, {
		key: 'isEveryChildChecked',
		value: function isEveryChildChecked(node) {
			var _this4 = this;

			return node.children.every(function (child) {
				if (child.children !== null) {
					return _this4.isEveryChildChecked(child);
				}

				return child.checked;
			});
		}
	}, {
		key: 'isSomeChildChecked',
		value: function isSomeChildChecked(node) {
			var _this5 = this;

			return node.children.some(function (child) {
				if (child.children !== null) {
					return _this5.isSomeChildChecked(child);
				}

				return child.checked;
			});
		}
	}, {
		key: 'renderTreeNodes',
		value: function renderTreeNodes(nodes) {
			var _this6 = this;

			var treeNodes = nodes.map(function (node, index) {
				var key = index + '-' + node.value;
				var checked = _this6.getCheckState(node);
				var children = _this6.renderChildNodes(node);

				return _react2.default.createElement(
					_TreeNode2.default,
					{
						key: key,
						checked: checked,
						expanded: node.expanded,
						icon: node.icon,
						label: node.label,
						optimisticToggle: _this6.props.optimisticToggle,
						rawChildren: node.children,
						treeId: _this6.id,
						value: node.value,
						onCheck: _this6.onCheck,
						onExpand: _this6.onExpand
					},
					children
				);
			});

			return _react2.default.createElement(
				'ol',
				null,
				treeNodes
			);
		}
	}, {
		key: 'renderChildNodes',
		value: function renderChildNodes(node) {
			if (node.children !== null && node.expanded) {
				return this.renderTreeNodes(node.children);
			}

			return null;
		}
	}, {
		key: 'renderHiddenInput',
		value: function renderHiddenInput() {
			if (this.props.name === undefined) {
				return null;
			}

			if (this.props.nameAsArray) {
				return this.renderArrayHiddenInput();
			}

			return this.renderJoinedHiddenInput();
		}
	}, {
		key: 'renderArrayHiddenInput',
		value: function renderArrayHiddenInput() {
			var _this7 = this;

			return this.props.checked.map(function (value) {
				var name = _this7.props.name + '[]';

				return _react2.default.createElement('input', { key: value, name: name, type: 'hidden', value: value });
			});
		}
	}, {
		key: 'renderJoinedHiddenInput',
		value: function renderJoinedHiddenInput() {
			var checked = this.props.checked.join(',');

			return _react2.default.createElement('input', { name: this.props.name, type: 'hidden', value: checked });
		}
	}, {
		key: 'render',
		value: function render() {
			var nodes = this.getFormattedNodes(this.props.nodes);
			var treeNodes = this.renderTreeNodes(nodes);

			return _react2.default.createElement(
				'div',
				{ className: 'react-checkbox-tree' },
				this.renderHiddenInput(),
				treeNodes
			);
		}
	}]);

	return CheckboxTree;
}(_react2.default.Component);

CheckboxTree.propTypes = {
	nodes: _react2.default.PropTypes.arrayOf(_nodeShape2.default).isRequired,

	checked: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
	expanded: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
	name: _react2.default.PropTypes.string,
	nameAsArray: _react2.default.PropTypes.bool,
	optimisticToggle: _react2.default.PropTypes.bool,
	onCheck: _react2.default.PropTypes.func,
	onExpand: _react2.default.PropTypes.func
};
CheckboxTree.defaultProps = {
	checked: [],
	expanded: [],
	name: undefined,
	nameAsArray: false,
	nodes: [],
	optimisticToggle: true,
	onCheck: function onCheck() {},
	onExpand: function onExpand() {}
};
exports.default = CheckboxTree;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _nodeShape = __webpack_require__(2);

var _nodeShape2 = _interopRequireDefault(_nodeShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = function (_React$Component) {
	_inherits(TreeNode, _React$Component);

	function TreeNode(props) {
		_classCallCheck(this, TreeNode);

		var _this = _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call(this, props));

		_this.onCheck = _this.onCheck.bind(_this);
		_this.onExpand = _this.onExpand.bind(_this);
		return _this;
	}

	_createClass(TreeNode, [{
		key: 'onCheck',
		value: function onCheck() {
			var isChecked = false;

			// Toggle off state to checked
			if (this.props.checked === 0) {
				isChecked = true;
			}

			// Toggle partial state based on model
			if (this.props.checked === 2) {
				isChecked = this.props.optimisticToggle;
			}

			this.props.onCheck({
				value: this.props.value,
				checked: isChecked,
				children: this.props.rawChildren
			});
		}
	}, {
		key: 'onExpand',
		value: function onExpand() {
			this.props.onExpand({
				value: this.props.value,
				expanded: !this.props.expanded
			});
		}
	}, {
		key: 'hasChildren',
		value: function hasChildren() {
			return this.props.rawChildren !== null;
		}
	}, {
		key: 'renderCollapseIcon',
		value: function renderCollapseIcon() {
			if (this.hasChildren()){
				if (!this.props.expanded) {
					return _react2.default.createElement('i', { className: 'rct-icon fa fa-plus', onClick: this.onExpand });
				}

				return _react2.default.createElement('i', { className: 'rct-icon fa fa-minus', onClick: this.onExpand });
			}
		}
	}, {
		key: 'renderChildren',
		value: function renderChildren() {
			if (!this.props.expanded) {
				return null;
			}

			return this.props.children;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var checked = _props.checked;
			var treeId = _props.treeId;
			var label = _props.label;
			var value = _props.value;

			var inputId = treeId + '-' + value;
			var nodeClass = (0, _classnames2.default)({
				'rct-node': true,
				'rct-node-parent': this.hasChildren(),
				'rct-node-leaf': !this.hasChildren()
			});

			return _react2.default.createElement(
				'li',
				{ className: nodeClass },
				_react2.default.createElement(
					'span',
					{ className: 'rct-text checkbox' },
					this.renderCollapseIcon(),
					_react2.default.createElement(
						'label',
						{ htmlFor: inputId },
						_react2.default.createElement('input', { checked: checked === 1, id: inputId, type: 'checkbox', onChange: this.onCheck }),
						label
					)
				),
				this.renderChildren()
			);
		}
	}]);

	return TreeNode;
}(_react2.default.Component);

TreeNode.propTypes = {
	checked: _react2.default.PropTypes.number.isRequired,
	expanded: _react2.default.PropTypes.bool.isRequired,
	label: _react2.default.PropTypes.string.isRequired,
	optimisticToggle: _react2.default.PropTypes.bool.isRequired,
	treeId: _react2.default.PropTypes.string.isRequired,
	value: _react2.default.PropTypes.string.isRequired,
	onCheck: _react2.default.PropTypes.func.isRequired,
	onExpand: _react2.default.PropTypes.func.isRequired,

	children: _react2.default.PropTypes.node,
	icon: _react2.default.PropTypes.node,
	rawChildren: _react2.default.PropTypes.arrayOf(_nodeShape2.default)
};
TreeNode.defaultProps = {
	children: null,
	icon: null,
	rawChildren: null
};
exports.default = TreeNode;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(9);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(11);

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(0);
var encode = __webpack_require__(8);
var decode = __webpack_require__(7);
var isValid = __webpack_require__(10);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(13) || 0;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function generate() {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}


/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}


// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Export default to provide support for non-ES6 solutions
module.exports = __webpack_require__(3).default;

/***/ })
/******/ ]);
});