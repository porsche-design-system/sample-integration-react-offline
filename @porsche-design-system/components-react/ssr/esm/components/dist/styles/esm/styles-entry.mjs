function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof$1(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof$1(document)) === 'object' && document.nodeType === 9;

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var plainObjectConstrurctor = {}.constructor;
function cloneStyle(style) {
  if (style == null || typeof style !== 'object') return style;
  if (Array.isArray(style)) return style.map(cloneStyle);
  if (style.constructor !== plainObjectConstrurctor) return style;
  var newStyle = {};

  for (var name in style) {
    newStyle[name] = cloneStyle(style[name]);
  }

  return newStyle;
}

/**
 * Create a rule instance.
 */

function createRule(name, decl, options) {
  if (name === void 0) {
    name = 'unnamed';
  }

  var jss = options.jss;
  var declCopy = cloneStyle(decl);
  var rule = jss.plugins.onCreateRule(name, declCopy, options);
  if (rule) return rule; // It is an at-rule and it has no instance.

  if (name[0] === '@') ;

  return null;
}

var join = function join(value, by) {
  var result = '';

  for (var i = 0; i < value.length; i++) {
    // Remove !important from the value, it will be readded later.
    if (value[i] === '!important') break;
    if (result) result += by;
    result += value[i];
  }

  return result;
};
/**
 * Converts JSS array value to a CSS string.
 *
 * `margin: [['5px', '10px']]` > `margin: 5px 10px;`
 * `border: ['1px', '2px']` > `border: 1px, 2px;`
 * `margin: [['5px', '10px'], '!important']` > `margin: 5px 10px !important;`
 * `color: ['red', !important]` > `color: red !important;`
 */


var toCssValue = function toCssValue(value) {
  if (!Array.isArray(value)) return value;
  var cssValue = ''; // Support space separated values via `[['5px', '10px']]`.

  if (Array.isArray(value[0])) {
    for (var i = 0; i < value.length; i++) {
      if (value[i] === '!important') break;
      if (cssValue) cssValue += ', ';
      cssValue += join(value[i], ' ');
    }
  } else cssValue = join(value, ', '); // Add !important, because it was ignored.


  if (value[value.length - 1] === '!important') {
    cssValue += ' !important';
  }

  return cssValue;
};

function getWhitespaceSymbols(options) {
  if (options && options.format === false) {
    return {
      linebreak: '',
      space: ''
    };
  }

  return {
    linebreak: '\n',
    space: ' '
  };
}

/**
 * Indent a string.
 * http://jsperf.com/array-join-vs-for
 */

function indentStr(str, indent) {
  var result = '';

  for (var index = 0; index < indent; index++) {
    result += '  ';
  }

  return result + str;
}
/**
 * Converts a Rule to CSS string.
 */


function toCss(selector, style, options) {
  if (options === void 0) {
    options = {};
  }

  var result = '';
  if (!style) return result;
  var _options = options,
      _options$indent = _options.indent,
      indent = _options$indent === void 0 ? 0 : _options$indent;
  var fallbacks = style.fallbacks;

  if (options.format === false) {
    indent = -Infinity;
  }

  var _getWhitespaceSymbols = getWhitespaceSymbols(options),
      linebreak = _getWhitespaceSymbols.linebreak,
      space = _getWhitespaceSymbols.space;

  if (selector) indent++; // Apply fallbacks first.

  if (fallbacks) {
    // Array syntax {fallbacks: [{prop: value}]}
    if (Array.isArray(fallbacks)) {
      for (var index = 0; index < fallbacks.length; index++) {
        var fallback = fallbacks[index];

        for (var prop in fallback) {
          var value = fallback[prop];

          if (value != null) {
            if (result) result += linebreak;
            result += indentStr(prop + ":" + space + toCssValue(value) + ";", indent);
          }
        }
      }
    } else {
      // Object syntax {fallbacks: {prop: value}}
      for (var _prop in fallbacks) {
        var _value = fallbacks[_prop];

        if (_value != null) {
          if (result) result += linebreak;
          result += indentStr(_prop + ":" + space + toCssValue(_value) + ";", indent);
        }
      }
    }
  }

  for (var _prop2 in style) {
    var _value2 = style[_prop2];

    if (_value2 != null && _prop2 !== 'fallbacks') {
      if (result) result += linebreak;
      result += indentStr(_prop2 + ":" + space + toCssValue(_value2) + ";", indent);
    }
  } // Allow empty style in this case, because properties will be added dynamically.


  if (!result && !options.allowEmpty) return result; // When rule is being stringified before selector was defined.

  if (!selector) return result;
  indent--;
  if (result) result = "" + linebreak + result + linebreak;
  return indentStr("" + selector + space + "{" + result, indent) + indentStr('}', indent);
}

var escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
var nativeEscape = typeof CSS !== 'undefined' && CSS.escape;
var escape = (function (str) {
  return nativeEscape ? nativeEscape(str) : str.replace(escapeRegex, '\\$1');
});

var BaseStyleRule =
/*#__PURE__*/
function () {
  function BaseStyleRule(key, style, options) {
    this.type = 'style';
    this.isProcessed = false;
    var sheet = options.sheet,
        Renderer = options.Renderer;
    this.key = key;
    this.options = options;
    this.style = style;
    if (sheet) this.renderer = sheet.renderer;else if (Renderer) this.renderer = new Renderer();
  }
  /**
   * Get or set a style property.
   */


  var _proto = BaseStyleRule.prototype;

  _proto.prop = function prop(name, value, options) {
    // It's a getter.
    if (value === undefined) return this.style[name]; // Don't do anything if the value has not changed.

    var force = options ? options.force : false;
    if (!force && this.style[name] === value) return this;
    var newValue = value;

    if (!options || options.process !== false) {
      newValue = this.options.jss.plugins.onChangeValue(value, name, this);
    }

    var isEmpty = newValue == null || newValue === false;
    var isDefined = name in this.style; // Value is empty and wasn't defined before.

    if (isEmpty && !isDefined && !force) return this; // We are going to remove this value.

    var remove = isEmpty && isDefined;
    if (remove) delete this.style[name];else this.style[name] = newValue; // Renderable is defined if StyleSheet option `link` is true.

    if (this.renderable && this.renderer) {
      if (remove) this.renderer.removeProperty(this.renderable, name);else this.renderer.setProperty(this.renderable, name, newValue);
      return this;
    }

    var sheet = this.options.sheet;

    if (sheet && sheet.attached) ;

    return this;
  };

  return BaseStyleRule;
}();
var StyleRule =
/*#__PURE__*/
function (_BaseStyleRule) {
  _inheritsLoose(StyleRule, _BaseStyleRule);

  function StyleRule(key, style, options) {
    var _this;

    _this = _BaseStyleRule.call(this, key, style, options) || this;
    var selector = options.selector,
        scoped = options.scoped,
        sheet = options.sheet,
        generateId = options.generateId;

    if (selector) {
      _this.selectorText = selector;
    } else if (scoped !== false) {
      _this.id = generateId(_assertThisInitialized(_assertThisInitialized(_this)), sheet);
      _this.selectorText = "." + escape(_this.id);
    }

    return _this;
  }
  /**
   * Set selector string.
   * Attention: use this with caution. Most browsers didn't implement
   * selectorText setter, so this may result in rerendering of entire Style Sheet.
   */


  var _proto2 = StyleRule.prototype;

  /**
   * Apply rule to an element inline.
   */
  _proto2.applyTo = function applyTo(renderable) {
    var renderer = this.renderer;

    if (renderer) {
      var json = this.toJSON();

      for (var prop in json) {
        renderer.setProperty(renderable, prop, json[prop]);
      }
    }

    return this;
  }
  /**
   * Returns JSON representation of the rule.
   * Fallbacks are not supported.
   * Useful for inline styles.
   */
  ;

  _proto2.toJSON = function toJSON() {
    var json = {};

    for (var prop in this.style) {
      var value = this.style[prop];
      if (typeof value !== 'object') json[prop] = value;else if (Array.isArray(value)) json[prop] = toCssValue(value);
    }

    return json;
  }
  /**
   * Generates a CSS string.
   */
  ;

  _proto2.toString = function toString(options) {
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    var opts = link ? _extends({}, options, {
      allowEmpty: true
    }) : options;
    return toCss(this.selectorText, this.style, opts);
  };

  _createClass(StyleRule, [{
    key: "selector",
    set: function set(selector) {
      if (selector === this.selectorText) return;
      this.selectorText = selector;
      var renderer = this.renderer,
          renderable = this.renderable;
      if (!renderable || !renderer) return;
      var hasChanged = renderer.setSelector(renderable, selector); // If selector setter is not implemented, rerender the rule.

      if (!hasChanged) {
        renderer.replaceRule(renderable, this);
      }
    }
    /**
     * Get selector string.
     */
    ,
    get: function get() {
      return this.selectorText;
    }
  }]);

  return StyleRule;
}(BaseStyleRule);
var pluginStyleRule = {
  onCreateRule: function onCreateRule(key, style, options) {
    if (key[0] === '@' || options.parent && options.parent.type === 'keyframes') {
      return null;
    }

    return new StyleRule(key, style, options);
  }
};

var defaultToStringOptions = {
  indent: 1,
  children: true
};
var atRegExp = /@([\w-]+)/;
/**
 * Conditional rule for @media, @supports
 */

var ConditionalRule =
/*#__PURE__*/
function () {
  function ConditionalRule(key, styles, options) {
    this.type = 'conditional';
    this.isProcessed = false;
    this.key = key;
    var atMatch = key.match(atRegExp);
    this.at = atMatch ? atMatch[1] : 'unknown'; // Key might contain a unique suffix in case the `name` passed by user was duplicate.

    this.query = options.name || "@" + this.at;
    this.options = options;
    this.rules = new RuleList(_extends({}, options, {
      parent: this
    }));

    for (var name in styles) {
      this.rules.add(name, styles[name]);
    }

    this.rules.process();
  }
  /**
   * Get a rule.
   */


  var _proto = ConditionalRule.prototype;

  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  }
  /**
   * Get index of a rule.
   */
  ;

  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  }
  /**
   * Create and register rule, run plugins.
   */
  ;

  _proto.addRule = function addRule(name, style, options) {
    var rule = this.rules.add(name, style, options);
    if (!rule) return null;
    this.options.jss.plugins.onProcessRule(rule);
    return rule;
  }
  /**
   * Replace rule, run plugins.
   */
  ;

  _proto.replaceRule = function replaceRule(name, style, options) {
    var newRule = this.rules.replace(name, style, options);
    if (newRule) this.options.jss.plugins.onProcessRule(newRule);
    return newRule;
  }
  /**
   * Generates a CSS string.
   */
  ;

  _proto.toString = function toString(options) {
    if (options === void 0) {
      options = defaultToStringOptions;
    }

    var _getWhitespaceSymbols = getWhitespaceSymbols(options),
        linebreak = _getWhitespaceSymbols.linebreak;

    if (options.indent == null) options.indent = defaultToStringOptions.indent;
    if (options.children == null) options.children = defaultToStringOptions.children;

    if (options.children === false) {
      return this.query + " {}";
    }

    var children = this.rules.toString(options);
    return children ? this.query + " {" + linebreak + children + linebreak + "}" : '';
  };

  return ConditionalRule;
}();
var keyRegExp = /@container|@media|@supports\s+/;
var pluginConditionalRule = {
  onCreateRule: function onCreateRule(key, styles, options) {
    return keyRegExp.test(key) ? new ConditionalRule(key, styles, options) : null;
  }
};

var defaultToStringOptions$1 = {
  indent: 1,
  children: true
};
var nameRegExp = /@keyframes\s+([\w-]+)/;
/**
 * Rule for @keyframes
 */

var KeyframesRule =
/*#__PURE__*/
function () {
  function KeyframesRule(key, frames, options) {
    this.type = 'keyframes';
    this.at = '@keyframes';
    this.isProcessed = false;
    var nameMatch = key.match(nameRegExp);

    if (nameMatch && nameMatch[1]) {
      this.name = nameMatch[1];
    } else {
      this.name = 'noname';
    }

    this.key = this.type + "-" + this.name;
    this.options = options;
    var scoped = options.scoped,
        sheet = options.sheet,
        generateId = options.generateId;
    this.id = scoped === false ? this.name : escape(generateId(this, sheet));
    this.rules = new RuleList(_extends({}, options, {
      parent: this
    }));

    for (var name in frames) {
      this.rules.add(name, frames[name], _extends({}, options, {
        parent: this
      }));
    }

    this.rules.process();
  }
  /**
   * Generates a CSS string.
   */


  var _proto = KeyframesRule.prototype;

  _proto.toString = function toString(options) {
    if (options === void 0) {
      options = defaultToStringOptions$1;
    }

    var _getWhitespaceSymbols = getWhitespaceSymbols(options),
        linebreak = _getWhitespaceSymbols.linebreak;

    if (options.indent == null) options.indent = defaultToStringOptions$1.indent;
    if (options.children == null) options.children = defaultToStringOptions$1.children;

    if (options.children === false) {
      return this.at + " " + this.id + " {}";
    }

    var children = this.rules.toString(options);
    if (children) children = "" + linebreak + children + linebreak;
    return this.at + " " + this.id + " {" + children + "}";
  };

  return KeyframesRule;
}();
var keyRegExp$1 = /@keyframes\s+/;
var refRegExp$1 = /\$([\w-]+)/g;

var findReferencedKeyframe = function findReferencedKeyframe(val, keyframes) {
  if (typeof val === 'string') {
    return val.replace(refRegExp$1, function (match, name) {
      if (name in keyframes) {
        return keyframes[name];
      }
      return match;
    });
  }

  return val;
};
/**
 * Replace the reference for a animation name.
 */


var replaceRef = function replaceRef(style, prop, keyframes) {
  var value = style[prop];
  var refKeyframe = findReferencedKeyframe(value, keyframes);

  if (refKeyframe !== value) {
    style[prop] = refKeyframe;
  }
};

var pluginKeyframesRule = {
  onCreateRule: function onCreateRule(key, frames, options) {
    return typeof key === 'string' && keyRegExp$1.test(key) ? new KeyframesRule(key, frames, options) : null;
  },
  // Animation name ref replacer.
  onProcessStyle: function onProcessStyle(style, rule, sheet) {
    if (rule.type !== 'style' || !sheet) return style;
    if ('animation-name' in style) replaceRef(style, 'animation-name', sheet.keyframes);
    if ('animation' in style) replaceRef(style, 'animation', sheet.keyframes);
    return style;
  },
  onChangeValue: function onChangeValue(val, prop, rule) {
    var sheet = rule.options.sheet;

    if (!sheet) {
      return val;
    }

    switch (prop) {
      case 'animation':
        return findReferencedKeyframe(val, sheet.keyframes);

      case 'animation-name':
        return findReferencedKeyframe(val, sheet.keyframes);

      default:
        return val;
    }
  }
};

var KeyframeRule =
/*#__PURE__*/
function (_BaseStyleRule) {
  _inheritsLoose(KeyframeRule, _BaseStyleRule);

  function KeyframeRule() {
    return _BaseStyleRule.apply(this, arguments) || this;
  }

  var _proto = KeyframeRule.prototype;

  /**
   * Generates a CSS string.
   */
  _proto.toString = function toString(options) {
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    var opts = link ? _extends({}, options, {
      allowEmpty: true
    }) : options;
    return toCss(this.key, this.style, opts);
  };

  return KeyframeRule;
}(BaseStyleRule);
var pluginKeyframeRule = {
  onCreateRule: function onCreateRule(key, style, options) {
    if (options.parent && options.parent.type === 'keyframes') {
      return new KeyframeRule(key, style, options);
    }

    return null;
  }
};

var FontFaceRule =
/*#__PURE__*/
function () {
  function FontFaceRule(key, style, options) {
    this.type = 'font-face';
    this.at = '@font-face';
    this.isProcessed = false;
    this.key = key;
    this.style = style;
    this.options = options;
  }
  /**
   * Generates a CSS string.
   */


  var _proto = FontFaceRule.prototype;

  _proto.toString = function toString(options) {
    var _getWhitespaceSymbols = getWhitespaceSymbols(options),
        linebreak = _getWhitespaceSymbols.linebreak;

    if (Array.isArray(this.style)) {
      var str = '';

      for (var index = 0; index < this.style.length; index++) {
        str += toCss(this.at, this.style[index]);
        if (this.style[index + 1]) str += linebreak;
      }

      return str;
    }

    return toCss(this.at, this.style, options);
  };

  return FontFaceRule;
}();
var keyRegExp$2 = /@font-face/;
var pluginFontFaceRule = {
  onCreateRule: function onCreateRule(key, style, options) {
    return keyRegExp$2.test(key) ? new FontFaceRule(key, style, options) : null;
  }
};

var ViewportRule =
/*#__PURE__*/
function () {
  function ViewportRule(key, style, options) {
    this.type = 'viewport';
    this.at = '@viewport';
    this.isProcessed = false;
    this.key = key;
    this.style = style;
    this.options = options;
  }
  /**
   * Generates a CSS string.
   */


  var _proto = ViewportRule.prototype;

  _proto.toString = function toString(options) {
    return toCss(this.key, this.style, options);
  };

  return ViewportRule;
}();
var pluginViewportRule = {
  onCreateRule: function onCreateRule(key, style, options) {
    return key === '@viewport' || key === '@-ms-viewport' ? new ViewportRule(key, style, options) : null;
  }
};

var SimpleRule =
/*#__PURE__*/
function () {
  function SimpleRule(key, value, options) {
    this.type = 'simple';
    this.isProcessed = false;
    this.key = key;
    this.value = value;
    this.options = options;
  }
  /**
   * Generates a CSS string.
   */
  // eslint-disable-next-line no-unused-vars


  var _proto = SimpleRule.prototype;

  _proto.toString = function toString(options) {
    if (Array.isArray(this.value)) {
      var str = '';

      for (var index = 0; index < this.value.length; index++) {
        str += this.key + " " + this.value[index] + ";";
        if (this.value[index + 1]) str += '\n';
      }

      return str;
    }

    return this.key + " " + this.value + ";";
  };

  return SimpleRule;
}();
var keysMap = {
  '@charset': true,
  '@import': true,
  '@namespace': true
};
var pluginSimpleRule = {
  onCreateRule: function onCreateRule(key, value, options) {
    return key in keysMap ? new SimpleRule(key, value, options) : null;
  }
};

var plugins = [pluginStyleRule, pluginConditionalRule, pluginKeyframesRule, pluginKeyframeRule, pluginFontFaceRule, pluginViewportRule, pluginSimpleRule];

var defaultUpdateOptions = {
  process: true
};
var forceUpdateOptions = {
  force: true,
  process: true
  /**
   * Contains rules objects and allows adding/removing etc.
   * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
   */

};

var RuleList =
/*#__PURE__*/
function () {
  // Rules registry for access by .get() method.
  // It contains the same rule registered by name and by selector.
  // Original styles object.
  // Used to ensure correct rules order.
  function RuleList(options) {
    this.map = {};
    this.raw = {};
    this.index = [];
    this.counter = 0;
    this.options = options;
    this.classes = options.classes;
    this.keyframes = options.keyframes;
  }
  /**
   * Create and register rule.
   *
   * Will not render after Style Sheet was rendered the first time.
   */


  var _proto = RuleList.prototype;

  _proto.add = function add(name, decl, ruleOptions) {
    var _this$options = this.options,
        parent = _this$options.parent,
        sheet = _this$options.sheet,
        jss = _this$options.jss,
        Renderer = _this$options.Renderer,
        generateId = _this$options.generateId,
        scoped = _this$options.scoped;

    var options = _extends({
      classes: this.classes,
      parent: parent,
      sheet: sheet,
      jss: jss,
      Renderer: Renderer,
      generateId: generateId,
      scoped: scoped,
      name: name,
      keyframes: this.keyframes,
      selector: undefined
    }, ruleOptions); // When user uses .createStyleSheet(), duplicate names are not possible, but
    // `sheet.addRule()` opens the door for any duplicate rule name. When this happens
    // we need to make the key unique within this RuleList instance scope.


    var key = name;

    if (name in this.raw) {
      key = name + "-d" + this.counter++;
    } // We need to save the original decl before creating the rule
    // because cache plugin needs to use it as a key to return a cached rule.


    this.raw[key] = decl;

    if (key in this.classes) {
      // E.g. rules inside of @media container
      options.selector = "." + escape(this.classes[key]);
    }

    var rule = createRule(key, decl, options);
    if (!rule) return null;
    this.register(rule);
    var index = options.index === undefined ? this.index.length : options.index;
    this.index.splice(index, 0, rule);
    return rule;
  }
  /**
   * Replace rule.
   * Create a new rule and remove old one instead of overwriting
   * because we want to invoke onCreateRule hook to make plugins work.
   */
  ;

  _proto.replace = function replace(name, decl, ruleOptions) {
    var oldRule = this.get(name);
    var oldIndex = this.index.indexOf(oldRule);

    if (oldRule) {
      this.remove(oldRule);
    }

    var options = ruleOptions;
    if (oldIndex !== -1) options = _extends({}, ruleOptions, {
      index: oldIndex
    });
    return this.add(name, decl, options);
  }
  /**
   * Get a rule by name or selector.
   */
  ;

  _proto.get = function get(nameOrSelector) {
    return this.map[nameOrSelector];
  }
  /**
   * Delete a rule.
   */
  ;

  _proto.remove = function remove(rule) {
    this.unregister(rule);
    delete this.raw[rule.key];
    this.index.splice(this.index.indexOf(rule), 1);
  }
  /**
   * Get index of a rule.
   */
  ;

  _proto.indexOf = function indexOf(rule) {
    return this.index.indexOf(rule);
  }
  /**
   * Run `onProcessRule()` plugins on every rule.
   */
  ;

  _proto.process = function process() {
    var plugins = this.options.jss.plugins; // We need to clone array because if we modify the index somewhere else during a loop
    // we end up with very hard-to-track-down side effects.

    this.index.slice(0).forEach(plugins.onProcessRule, plugins);
  }
  /**
   * Register a rule in `.map`, `.classes` and `.keyframes` maps.
   */
  ;

  _proto.register = function register(rule) {
    this.map[rule.key] = rule;

    if (rule instanceof StyleRule) {
      this.map[rule.selector] = rule;
      if (rule.id) this.classes[rule.key] = rule.id;
    } else if (rule instanceof KeyframesRule && this.keyframes) {
      this.keyframes[rule.name] = rule.id;
    }
  }
  /**
   * Unregister a rule.
   */
  ;

  _proto.unregister = function unregister(rule) {
    delete this.map[rule.key];

    if (rule instanceof StyleRule) {
      delete this.map[rule.selector];
      delete this.classes[rule.key];
    } else if (rule instanceof KeyframesRule) {
      delete this.keyframes[rule.name];
    }
  }
  /**
   * Update the function values with a new data.
   */
  ;

  _proto.update = function update() {
    var name;
    var data;
    var options;

    if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
      name = arguments.length <= 0 ? undefined : arguments[0];
      data = arguments.length <= 1 ? undefined : arguments[1];
      options = arguments.length <= 2 ? undefined : arguments[2];
    } else {
      data = arguments.length <= 0 ? undefined : arguments[0];
      options = arguments.length <= 1 ? undefined : arguments[1];
      name = null;
    }

    if (name) {
      this.updateOne(this.get(name), data, options);
    } else {
      for (var index = 0; index < this.index.length; index++) {
        this.updateOne(this.index[index], data, options);
      }
    }
  }
  /**
   * Execute plugins, update rule props.
   */
  ;

  _proto.updateOne = function updateOne(rule, data, options) {
    if (options === void 0) {
      options = defaultUpdateOptions;
    }

    var _this$options2 = this.options,
        plugins = _this$options2.jss.plugins,
        sheet = _this$options2.sheet; // It is a rules container like for e.g. ConditionalRule.

    if (rule.rules instanceof RuleList) {
      rule.rules.update(data, options);
      return;
    }

    var style = rule.style;
    plugins.onUpdate(data, rule, sheet, options); // We rely on a new `style` ref in case it was mutated during onUpdate hook.

    if (options.process && style && style !== rule.style) {
      // We need to run the plugins in case new `style` relies on syntax plugins.
      plugins.onProcessStyle(rule.style, rule, sheet); // Update and add props.

      for (var prop in rule.style) {
        var nextValue = rule.style[prop];
        var prevValue = style[prop]; // We need to use `force: true` because `rule.style` has been updated during onUpdate hook, so `rule.prop()` will not update the CSSOM rule.
        // We do this comparison to avoid unneeded `rule.prop()` calls, since we have the old `style` object here.

        if (nextValue !== prevValue) {
          rule.prop(prop, nextValue, forceUpdateOptions);
        }
      } // Remove props.


      for (var _prop in style) {
        var _nextValue = rule.style[_prop];
        var _prevValue = style[_prop]; // We need to use `force: true` because `rule.style` has been updated during onUpdate hook, so `rule.prop()` will not update the CSSOM rule.
        // We do this comparison to avoid unneeded `rule.prop()` calls, since we have the old `style` object here.

        if (_nextValue == null && _nextValue !== _prevValue) {
          rule.prop(_prop, null, forceUpdateOptions);
        }
      }
    }
  }
  /**
   * Convert rules to a CSS string.
   */
  ;

  _proto.toString = function toString(options) {
    var str = '';
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;

    var _getWhitespaceSymbols = getWhitespaceSymbols(options),
        linebreak = _getWhitespaceSymbols.linebreak;

    for (var index = 0; index < this.index.length; index++) {
      var rule = this.index[index];
      var css = rule.toString(options); // No need to render an empty rule.

      if (!css && !link) continue;
      if (str) str += linebreak;
      str += css;
    }

    return str;
  };

  return RuleList;
}();

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(styles, options) {
    this.attached = false;
    this.deployed = false;
    this.classes = {};
    this.keyframes = {};
    this.options = _extends({}, options, {
      sheet: this,
      parent: this,
      classes: this.classes,
      keyframes: this.keyframes
    });

    if (options.Renderer) {
      this.renderer = new options.Renderer(this);
    }

    this.rules = new RuleList(this.options);

    for (var name in styles) {
      this.rules.add(name, styles[name]);
    }

    this.rules.process();
  }
  /**
   * Attach renderable to the render tree.
   */


  var _proto = StyleSheet.prototype;

  _proto.attach = function attach() {
    if (this.attached) return this;
    if (this.renderer) this.renderer.attach();
    this.attached = true; // Order is important, because we can't use insertRule API if style element is not attached.

    if (!this.deployed) this.deploy();
    return this;
  }
  /**
   * Remove renderable from render tree.
   */
  ;

  _proto.detach = function detach() {
    if (!this.attached) return this;
    if (this.renderer) this.renderer.detach();
    this.attached = false;
    return this;
  }
  /**
   * Add a rule to the current stylesheet.
   * Will insert a rule also after the stylesheet has been rendered first time.
   */
  ;

  _proto.addRule = function addRule(name, decl, options) {
    var queue = this.queue; // Plugins can create rules.
    // In order to preserve the right order, we need to queue all `.addRule` calls,
    // which happen after the first `rules.add()` call.

    if (this.attached && !queue) this.queue = [];
    var rule = this.rules.add(name, decl, options);
    if (!rule) return null;
    this.options.jss.plugins.onProcessRule(rule);

    if (this.attached) {
      if (!this.deployed) return rule; // Don't insert rule directly if there is no stringified version yet.
      // It will be inserted all together when .attach is called.

      if (queue) queue.push(rule);else {
        this.insertRule(rule);

        if (this.queue) {
          this.queue.forEach(this.insertRule, this);
          this.queue = undefined;
        }
      }
      return rule;
    } // We can't add rules to a detached style node.
    // We will redeploy the sheet once user will attach it.


    this.deployed = false;
    return rule;
  }
  /**
   * Replace a rule in the current stylesheet.
   */
  ;

  _proto.replaceRule = function replaceRule(nameOrSelector, decl, options) {
    var oldRule = this.rules.get(nameOrSelector);
    if (!oldRule) return this.addRule(nameOrSelector, decl, options);
    var newRule = this.rules.replace(nameOrSelector, decl, options);

    if (newRule) {
      this.options.jss.plugins.onProcessRule(newRule);
    }

    if (this.attached) {
      if (!this.deployed) return newRule; // Don't replace / delete rule directly if there is no stringified version yet.
      // It will be inserted all together when .attach is called.

      if (this.renderer) {
        if (!newRule) {
          this.renderer.deleteRule(oldRule);
        } else if (oldRule.renderable) {
          this.renderer.replaceRule(oldRule.renderable, newRule);
        }
      }

      return newRule;
    } // We can't replace rules to a detached style node.
    // We will redeploy the sheet once user will attach it.


    this.deployed = false;
    return newRule;
  }
  /**
   * Insert rule into the StyleSheet
   */
  ;

  _proto.insertRule = function insertRule(rule) {
    if (this.renderer) {
      this.renderer.insertRule(rule);
    }
  }
  /**
   * Create and add rules.
   * Will render also after Style Sheet was rendered the first time.
   */
  ;

  _proto.addRules = function addRules(styles, options) {
    var added = [];

    for (var name in styles) {
      var rule = this.addRule(name, styles[name], options);
      if (rule) added.push(rule);
    }

    return added;
  }
  /**
   * Get a rule by name or selector.
   */
  ;

  _proto.getRule = function getRule(nameOrSelector) {
    return this.rules.get(nameOrSelector);
  }
  /**
   * Delete a rule by name.
   * Returns `true`: if rule has been deleted from the DOM.
   */
  ;

  _proto.deleteRule = function deleteRule(name) {
    var rule = typeof name === 'object' ? name : this.rules.get(name);

    if (!rule || // Style sheet was created without link: true and attached, in this case we
    // won't be able to remove the CSS rule from the DOM.
    this.attached && !rule.renderable) {
      return false;
    }

    this.rules.remove(rule);

    if (this.attached && rule.renderable && this.renderer) {
      return this.renderer.deleteRule(rule.renderable);
    }

    return true;
  }
  /**
   * Get index of a rule.
   */
  ;

  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  }
  /**
   * Deploy pure CSS string to a renderable.
   */
  ;

  _proto.deploy = function deploy() {
    if (this.renderer) this.renderer.deploy();
    this.deployed = true;
    return this;
  }
  /**
   * Update the function values with a new data.
   */
  ;

  _proto.update = function update() {
    var _this$rules;

    (_this$rules = this.rules).update.apply(_this$rules, arguments);

    return this;
  }
  /**
   * Updates a single rule.
   */
  ;

  _proto.updateOne = function updateOne(rule, data, options) {
    this.rules.updateOne(rule, data, options);
    return this;
  }
  /**
   * Convert rules to a CSS string.
   */
  ;

  _proto.toString = function toString(options) {
    return this.rules.toString(options);
  };

  return StyleSheet;
}();

var PluginsRegistry =
/*#__PURE__*/
function () {
  function PluginsRegistry() {
    this.plugins = {
      internal: [],
      external: []
    };
    this.registry = {};
  }

  var _proto = PluginsRegistry.prototype;

  /**
   * Call `onCreateRule` hooks and return an object if returned by a hook.
   */
  _proto.onCreateRule = function onCreateRule(name, decl, options) {
    for (var i = 0; i < this.registry.onCreateRule.length; i++) {
      var rule = this.registry.onCreateRule[i](name, decl, options);
      if (rule) return rule;
    }

    return null;
  }
  /**
   * Call `onProcessRule` hooks.
   */
  ;

  _proto.onProcessRule = function onProcessRule(rule) {
    if (rule.isProcessed) return;
    var sheet = rule.options.sheet;

    for (var i = 0; i < this.registry.onProcessRule.length; i++) {
      this.registry.onProcessRule[i](rule, sheet);
    }

    if (rule.style) this.onProcessStyle(rule.style, rule, sheet);
    rule.isProcessed = true;
  }
  /**
   * Call `onProcessStyle` hooks.
   */
  ;

  _proto.onProcessStyle = function onProcessStyle(style, rule, sheet) {
    for (var i = 0; i < this.registry.onProcessStyle.length; i++) {
      rule.style = this.registry.onProcessStyle[i](rule.style, rule, sheet);
    }
  }
  /**
   * Call `onProcessSheet` hooks.
   */
  ;

  _proto.onProcessSheet = function onProcessSheet(sheet) {
    for (var i = 0; i < this.registry.onProcessSheet.length; i++) {
      this.registry.onProcessSheet[i](sheet);
    }
  }
  /**
   * Call `onUpdate` hooks.
   */
  ;

  _proto.onUpdate = function onUpdate(data, rule, sheet, options) {
    for (var i = 0; i < this.registry.onUpdate.length; i++) {
      this.registry.onUpdate[i](data, rule, sheet, options);
    }
  }
  /**
   * Call `onChangeValue` hooks.
   */
  ;

  _proto.onChangeValue = function onChangeValue(value, prop, rule) {
    var processedValue = value;

    for (var i = 0; i < this.registry.onChangeValue.length; i++) {
      processedValue = this.registry.onChangeValue[i](processedValue, prop, rule);
    }

    return processedValue;
  }
  /**
   * Register a plugin.
   */
  ;

  _proto.use = function use(newPlugin, options) {
    if (options === void 0) {
      options = {
        queue: 'external'
      };
    }

    var plugins = this.plugins[options.queue]; // Avoids applying same plugin twice, at least based on ref.

    if (plugins.indexOf(newPlugin) !== -1) {
      return;
    }

    plugins.push(newPlugin);
    this.registry = [].concat(this.plugins.external, this.plugins.internal).reduce(function (registry, plugin) {
      for (var name in plugin) {
        if (name in registry) {
          registry[name].push(plugin[name]);
        }
      }

      return registry;
    }, {
      onCreateRule: [],
      onProcessRule: [],
      onProcessStyle: [],
      onProcessSheet: [],
      onChangeValue: [],
      onUpdate: []
    });
  };

  return PluginsRegistry;
}();

/**
 * Sheets registry to access all instances in one place.
 */

var SheetsRegistry =
/*#__PURE__*/
function () {
  function SheetsRegistry() {
    this.registry = [];
  }

  var _proto = SheetsRegistry.prototype;

  /**
   * Register a Style Sheet.
   */
  _proto.add = function add(sheet) {
    var registry = this.registry;
    var index = sheet.options.index;
    if (registry.indexOf(sheet) !== -1) return;

    if (registry.length === 0 || index >= this.index) {
      registry.push(sheet);
      return;
    } // Find a position.


    for (var i = 0; i < registry.length; i++) {
      if (registry[i].options.index > index) {
        registry.splice(i, 0, sheet);
        return;
      }
    }
  }
  /**
   * Reset the registry.
   */
  ;

  _proto.reset = function reset() {
    this.registry = [];
  }
  /**
   * Remove a Style Sheet.
   */
  ;

  _proto.remove = function remove(sheet) {
    var index = this.registry.indexOf(sheet);
    this.registry.splice(index, 1);
  }
  /**
   * Convert all attached sheets to a CSS string.
   */
  ;

  _proto.toString = function toString(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        attached = _ref.attached,
        options = _objectWithoutPropertiesLoose(_ref, ["attached"]);

    var _getWhitespaceSymbols = getWhitespaceSymbols(options),
        linebreak = _getWhitespaceSymbols.linebreak;

    var css = '';

    for (var i = 0; i < this.registry.length; i++) {
      var sheet = this.registry[i];

      if (attached != null && sheet.attached !== attached) {
        continue;
      }

      if (css) css += linebreak;
      css += sheet.toString(options);
    }

    return css;
  };

  _createClass(SheetsRegistry, [{
    key: "index",

    /**
     * Current highest index number.
     */
    get: function get() {
      return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
    }
  }]);

  return SheetsRegistry;
}();

/**
 * This is a global sheets registry. Only DomRenderer will add sheets to it.
 * On the server one should use an own SheetsRegistry instance and add the
 * sheets to it, because you need to make sure to create a new registry for
 * each request in order to not leak sheets across requests.
 */

var sheets = new SheetsRegistry();

/* eslint-disable */

/**
 * Now that `globalThis` is available on most platforms
 * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis#browser_compatibility)
 * we check for `globalThis` first. `globalThis` is necessary for jss
 * to run in Agoric's secure version of JavaScript (SES). Under SES,
 * `globalThis` exists, but `window`, `self`, and `Function('return
 * this')()` are all undefined for security reasons.
 *
 * https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
 */
var globalThis$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' && window.Math === Math ? window : typeof self !== 'undefined' && self.Math === Math ? self : Function('return this')();

var ns = '2f1acc6c3a606b082e5eef5e54414ffb';
if (globalThis$1[ns] == null) globalThis$1[ns] = 0; // Bundle may contain multiple JSS versions at the same time. In order to identify
// the current version with just one short number and use it for classes generation
// we use a counter. Also it is more accurate, because user can manually reevaluate
// the module.

var moduleId = globalThis$1[ns]++;
/**
 * Returns a function which generates unique class names based on counters.
 * When new generator function is created, rule counter is reseted.
 * We need to reset the rule counter for SSR for each request.
 */

var createGenerateId = function createGenerateId(options) {
  if (options === void 0) {
    options = {};
  }

  var ruleCounter = 0;

  var generateId = function generateId(rule, sheet) {
    ruleCounter += 1;

    var jssId = '';
    var prefix = '';

    if (sheet) {
      if (sheet.options.classNamePrefix) {
        prefix = sheet.options.classNamePrefix;
      }

      if (sheet.options.jss.id != null) {
        jssId = String(sheet.options.jss.id);
      }
    }

    if (options.minify) {
      // Using "c" because a number can't be the first char in a class name.
      return "" + (prefix || 'c') + moduleId + jssId + ruleCounter;
    }

    return prefix + rule.key + "-" + moduleId + (jssId ? "-" + jssId : '') + "-" + ruleCounter;
  };

  return generateId;
};

/**
 * Cache the value from the first time a function is called.
 */

var memoize = function memoize(fn) {
  var value;
  return function () {
    if (!value) value = fn();
    return value;
  };
};
/**
 * Get a style property value.
 */


var getPropertyValue = function getPropertyValue(cssRule, prop) {
  try {
    // Support CSSTOM.
    if (cssRule.attributeStyleMap) {
      return cssRule.attributeStyleMap.get(prop);
    }

    return cssRule.style.getPropertyValue(prop);
  } catch (err) {
    // IE may throw if property is unknown.
    return '';
  }
};
/**
 * Set a style property.
 */


var setProperty = function setProperty(cssRule, prop, value) {
  try {
    var cssValue = value;

    if (Array.isArray(value)) {
      cssValue = toCssValue(value);
    } // Support CSSTOM.


    if (cssRule.attributeStyleMap) {
      cssRule.attributeStyleMap.set(prop, cssValue);
    } else {
      var indexOfImportantFlag = cssValue ? cssValue.indexOf('!important') : -1;
      var cssValueWithoutImportantFlag = indexOfImportantFlag > -1 ? cssValue.substr(0, indexOfImportantFlag - 1) : cssValue;
      cssRule.style.setProperty(prop, cssValueWithoutImportantFlag, indexOfImportantFlag > -1 ? 'important' : '');
    }
  } catch (err) {
    // IE may throw if property is unknown.
    return false;
  }

  return true;
};
/**
 * Remove a style property.
 */


var removeProperty = function removeProperty(cssRule, prop) {
  try {
    // Support CSSTOM.
    if (cssRule.attributeStyleMap) {
      cssRule.attributeStyleMap.delete(prop);
    } else {
      cssRule.style.removeProperty(prop);
    }
  } catch (err) {
  }
};
/**
 * Set the selector.
 */


var setSelector = function setSelector(cssRule, selectorText) {
  cssRule.selectorText = selectorText; // Return false if setter was not successful.
  // Currently works in chrome only.

  return cssRule.selectorText === selectorText;
};
/**
 * Gets the `head` element upon the first call and caches it.
 * We assume it can't be null.
 */


var getHead = memoize(function () {
  return document.querySelector('head');
});
/**
 * Find attached sheet with an index higher than the passed one.
 */

function findHigherSheet(registry, options) {
  for (var i = 0; i < registry.length; i++) {
    var sheet = registry[i];

    if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }

  return null;
}
/**
 * Find attached sheet with the highest index.
 */


function findHighestSheet(registry, options) {
  for (var i = registry.length - 1; i >= 0; i--) {
    var sheet = registry[i];

    if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }

  return null;
}
/**
 * Find a comment with "jss" inside.
 */


function findCommentNode(text) {
  var head = getHead();

  for (var i = 0; i < head.childNodes.length; i++) {
    var node = head.childNodes[i];

    if (node.nodeType === 8 && node.nodeValue.trim() === text) {
      return node;
    }
  }

  return null;
}
/**
 * Find a node before which we can insert the sheet.
 */


function findPrevNode(options) {
  var registry = sheets.registry;

  if (registry.length > 0) {
    // Try to insert before the next higher sheet.
    var sheet = findHigherSheet(registry, options);

    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element
      };
    } // Otherwise insert after the last attached.


    sheet = findHighestSheet(registry, options);

    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element.nextSibling
      };
    }
  } // Try to find a comment placeholder if registry is empty.


  var insertionPoint = options.insertionPoint;

  if (insertionPoint && typeof insertionPoint === 'string') {
    var comment = findCommentNode(insertionPoint);

    if (comment) {
      return {
        parent: comment.parentNode,
        node: comment.nextSibling
      };
    } // If user specifies an insertion point and it can't be found in the document -
  }

  return false;
}
/**
 * Insert style element into the DOM.
 */


function insertStyle(style, options) {
  var insertionPoint = options.insertionPoint;
  var nextNode = findPrevNode(options);

  if (nextNode !== false && nextNode.parent) {
    nextNode.parent.insertBefore(style, nextNode.node);
    return;
  } // Works with iframes and any node types.


  if (insertionPoint && typeof insertionPoint.nodeType === 'number') {
    var insertionPointElement = insertionPoint;
    var parentNode = insertionPointElement.parentNode;
    if (parentNode) parentNode.insertBefore(style, insertionPointElement.nextSibling);
    return;
  }

  getHead().appendChild(style);
}
/**
 * Read jss nonce setting from the page if the user has set it.
 */


var getNonce = memoize(function () {
  var node = document.querySelector('meta[property="csp-nonce"]');
  return node ? node.getAttribute('content') : null;
});

var _insertRule = function insertRule(container, rule, index) {
  try {
    if ('insertRule' in container) {
      container.insertRule(rule, index);
    } // Keyframes rule.
    else if ('appendRule' in container) {
        container.appendRule(rule);
      }
  } catch (err) {
    return false;
  }

  return container.cssRules[index];
};

var getValidRuleInsertionIndex = function getValidRuleInsertionIndex(container, index) {
  var maxIndex = container.cssRules.length; // In case previous insertion fails, passed index might be wrong

  if (index === undefined || index > maxIndex) {
    // eslint-disable-next-line no-param-reassign
    return maxIndex;
  }

  return index;
};

var createStyle = function createStyle() {
  var el = document.createElement('style'); // Without it, IE will have a broken source order specificity if we
  // insert rules after we insert the style tag.
  // It seems to kick-off the source order specificity algorithm.

  el.textContent = '\n';
  return el;
};

var DomRenderer =
/*#__PURE__*/
function () {
  // Will be empty if link: true option is not set, because
  // it is only for use together with insertRule API.
  function DomRenderer(sheet) {
    this.getPropertyValue = getPropertyValue;
    this.setProperty = setProperty;
    this.removeProperty = removeProperty;
    this.setSelector = setSelector;
    this.hasInsertedRules = false;
    this.cssRules = [];
    // There is no sheet when the renderer is used from a standalone StyleRule.
    if (sheet) sheets.add(sheet);
    this.sheet = sheet;

    var _ref = this.sheet ? this.sheet.options : {},
        media = _ref.media,
        meta = _ref.meta,
        element = _ref.element;

    this.element = element || createStyle();
    this.element.setAttribute('data-jss', '');
    if (media) this.element.setAttribute('media', media);
    if (meta) this.element.setAttribute('data-meta', meta);
    var nonce = getNonce();
    if (nonce) this.element.setAttribute('nonce', nonce);
  }
  /**
   * Insert style element into render tree.
   */


  var _proto = DomRenderer.prototype;

  _proto.attach = function attach() {
    // In the case the element node is external and it is already in the DOM.
    if (this.element.parentNode || !this.sheet) return;
    insertStyle(this.element, this.sheet.options); // When rules are inserted using `insertRule` API, after `sheet.detach().attach()`
    // most browsers create a new CSSStyleSheet, except of all IEs.

    var deployed = Boolean(this.sheet && this.sheet.deployed);

    if (this.hasInsertedRules && deployed) {
      this.hasInsertedRules = false;
      this.deploy();
    }
  }
  /**
   * Remove style element from render tree.
   */
  ;

  _proto.detach = function detach() {
    if (!this.sheet) return;
    var parentNode = this.element.parentNode;
    if (parentNode) parentNode.removeChild(this.element); // In the most browsers, rules inserted using insertRule() API will be lost when style element is removed.
    // Though IE will keep them and we need a consistent behavior.

    if (this.sheet.options.link) {
      this.cssRules = [];
      this.element.textContent = '\n';
    }
  }
  /**
   * Inject CSS string into element.
   */
  ;

  _proto.deploy = function deploy() {
    var sheet = this.sheet;
    if (!sheet) return;

    if (sheet.options.link) {
      this.insertRules(sheet.rules);
      return;
    }

    this.element.textContent = "\n" + sheet.toString() + "\n";
  }
  /**
   * Insert RuleList into an element.
   */
  ;

  _proto.insertRules = function insertRules(rules, nativeParent) {
    for (var i = 0; i < rules.index.length; i++) {
      this.insertRule(rules.index[i], i, nativeParent);
    }
  }
  /**
   * Insert a rule into element.
   */
  ;

  _proto.insertRule = function insertRule(rule, index, nativeParent) {
    if (nativeParent === void 0) {
      nativeParent = this.element.sheet;
    }

    if (rule.rules) {
      var parent = rule;
      var latestNativeParent = nativeParent;

      if (rule.type === 'conditional' || rule.type === 'keyframes') {
        var _insertionIndex = getValidRuleInsertionIndex(nativeParent, index); // We need to render the container without children first.


        latestNativeParent = _insertRule(nativeParent, parent.toString({
          children: false
        }), _insertionIndex);

        if (latestNativeParent === false) {
          return false;
        }

        this.refCssRule(rule, _insertionIndex, latestNativeParent);
      }

      this.insertRules(parent.rules, latestNativeParent);
      return latestNativeParent;
    }

    var ruleStr = rule.toString();
    if (!ruleStr) return false;
    var insertionIndex = getValidRuleInsertionIndex(nativeParent, index);

    var nativeRule = _insertRule(nativeParent, ruleStr, insertionIndex);

    if (nativeRule === false) {
      return false;
    }

    this.hasInsertedRules = true;
    this.refCssRule(rule, insertionIndex, nativeRule);
    return nativeRule;
  };

  _proto.refCssRule = function refCssRule(rule, index, cssRule) {
    rule.renderable = cssRule; // We only want to reference the top level rules, deleteRule API doesn't support removing nested rules
    // like rules inside media queries or keyframes

    if (rule.options.parent instanceof StyleSheet) {
      this.cssRules.splice(index, 0, cssRule);
    }
  }
  /**
   * Delete a rule.
   */
  ;

  _proto.deleteRule = function deleteRule(cssRule) {
    var sheet = this.element.sheet;
    var index = this.indexOf(cssRule);
    if (index === -1) return false;
    sheet.deleteRule(index);
    this.cssRules.splice(index, 1);
    return true;
  }
  /**
   * Get index of a CSS Rule.
   */
  ;

  _proto.indexOf = function indexOf(cssRule) {
    return this.cssRules.indexOf(cssRule);
  }
  /**
   * Generate a new CSS rule and replace the existing one.
   */
  ;

  _proto.replaceRule = function replaceRule(cssRule, rule) {
    var index = this.indexOf(cssRule);
    if (index === -1) return false;
    this.element.sheet.deleteRule(index);
    this.cssRules.splice(index, 1);
    return this.insertRule(rule, index);
  }
  /**
   * Get all rules elements.
   */
  ;

  _proto.getRules = function getRules() {
    return this.element.sheet.cssRules;
  };

  return DomRenderer;
}();

var instanceCounter = 0;

var Jss =
/*#__PURE__*/
function () {
  function Jss(options) {
    this.id = instanceCounter++;
    this.version = "10.10.0";
    this.plugins = new PluginsRegistry();
    this.options = {
      id: {
        minify: false
      },
      createGenerateId: createGenerateId,
      Renderer: isBrowser ? DomRenderer : null,
      plugins: []
    };
    this.generateId = createGenerateId({
      minify: false
    });

    for (var i = 0; i < plugins.length; i++) {
      this.plugins.use(plugins[i], {
        queue: 'internal'
      });
    }

    this.setup(options);
  }
  /**
   * Prepares various options, applies plugins.
   * Should not be used twice on the same instance, because there is no plugins
   * deduplication logic.
   */


  var _proto = Jss.prototype;

  _proto.setup = function setup(options) {
    if (options === void 0) {
      options = {};
    }

    if (options.createGenerateId) {
      this.options.createGenerateId = options.createGenerateId;
    }

    if (options.id) {
      this.options.id = _extends({}, this.options.id, options.id);
    }

    if (options.createGenerateId || options.id) {
      this.generateId = this.options.createGenerateId(this.options.id);
    }

    if (options.insertionPoint != null) this.options.insertionPoint = options.insertionPoint;

    if ('Renderer' in options) {
      this.options.Renderer = options.Renderer;
    } // eslint-disable-next-line prefer-spread


    if (options.plugins) this.use.apply(this, options.plugins);
    return this;
  }
  /**
   * Create a Style Sheet.
   */
  ;

  _proto.createStyleSheet = function createStyleSheet(styles, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        index = _options.index;

    if (typeof index !== 'number') {
      index = sheets.index === 0 ? 0 : sheets.index + 1;
    }

    var sheet = new StyleSheet(styles, _extends({}, options, {
      jss: this,
      generateId: options.generateId || this.generateId,
      insertionPoint: this.options.insertionPoint,
      Renderer: this.options.Renderer,
      index: index
    }));
    this.plugins.onProcessSheet(sheet);
    return sheet;
  }
  /**
   * Detach the Style Sheet and remove it from the registry.
   */
  ;

  _proto.removeStyleSheet = function removeStyleSheet(sheet) {
    sheet.detach();
    sheets.remove(sheet);
    return this;
  }
  /**
   * Create a rule without a Style Sheet.
   * [Deprecated] will be removed in the next major version.
   */
  ;

  _proto.createRule = function createRule$1(name, style, options) {
    if (style === void 0) {
      style = {};
    }

    if (options === void 0) {
      options = {};
    }

    // Enable rule without name for inline styles.
    if (typeof name === 'object') {
      return this.createRule(undefined, name, style);
    }

    var ruleOptions = _extends({}, options, {
      name: name,
      jss: this,
      Renderer: this.options.Renderer
    });

    if (!ruleOptions.generateId) ruleOptions.generateId = this.generateId;
    if (!ruleOptions.classes) ruleOptions.classes = {};
    if (!ruleOptions.keyframes) ruleOptions.keyframes = {};

    var rule = createRule(name, style, ruleOptions);

    if (rule) this.plugins.onProcessRule(rule);
    return rule;
  }
  /**
   * Register plugin. Passed function will be invoked with a rule instance.
   */
  ;

  _proto.use = function use() {
    var _this = this;

    for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins[_key] = arguments[_key];
    }

    plugins.forEach(function (plugin) {
      _this.plugins.use(plugin);
    });
    return this;
  };

  return Jss;
}();

var createJss = function createJss(options) {
  return new Jss(options);
};

/**
 * SheetsManager is like a WeakMap which is designed to count StyleSheet
 * instances and attach/detach automatically.
 * Used in react-jss.
 */

var SheetsManager =
/*#__PURE__*/
function () {
  function SheetsManager() {
    this.length = 0;
    this.sheets = new WeakMap();
  }

  var _proto = SheetsManager.prototype;

  _proto.get = function get(key) {
    var entry = this.sheets.get(key);
    return entry && entry.sheet;
  };

  _proto.add = function add(key, sheet) {
    if (this.sheets.has(key)) return;
    this.length++;
    this.sheets.set(key, {
      sheet: sheet,
      refs: 0
    });
  };

  _proto.manage = function manage(key) {
    var entry = this.sheets.get(key);

    if (entry) {
      if (entry.refs === 0) {
        entry.sheet.attach();
      }

      entry.refs++;
      return entry.sheet;
    }
    return undefined;
  };

  _proto.unmanage = function unmanage(key) {
    var entry = this.sheets.get(key);

    if (entry) {
      if (entry.refs > 0) {
        entry.refs--;
        if (entry.refs === 0) entry.sheet.detach();
      }
    }
  };

  _createClass(SheetsManager, [{
    key: "size",
    get: function get() {
      return this.length;
    }
  }]);

  return SheetsManager;
}();

/**
* Export a constant indicating if this browser has CSSTOM support.
* https://developers.google.com/web/updates/2018/03/cssom
*/
var hasCSSTOMSupport = typeof CSS === 'object' && CSS != null && 'number' in CSS;

/**
 * Extracts a styles object with only props that contain function values.
 */
function getDynamicStyles(styles) {
  var to = null;

  for (var key in styles) {
    var value = styles[key];
    var type = typeof value;

    if (type === 'function') {
      if (!to) to = {};
      to[key] = value;
    } else if (type === 'object' && value !== null && !Array.isArray(value)) {
      var extracted = getDynamicStyles(value);

      if (extracted) {
        if (!to) to = {};
        to[key] = extracted;
      }
    }
  }

  return to;
}

/**
 * A better abstraction over CSS.
 *
 * @copyright Oleg Isonen (Slobodskoi) / Isonen 2014-present
 * @website https://github.com/cssinjs/jss
 * @license MIT
 */
var index = createJss();

var jss_esm = /*#__PURE__*/Object.freeze({
  __proto__: null,
  RuleList: RuleList,
  SheetsManager: SheetsManager,
  SheetsRegistry: SheetsRegistry,
  create: createJss,
  createGenerateId: createGenerateId,
  createRule: createRule,
  default: index,
  getDynamicStyles: getDynamicStyles,
  hasCSSTOMSupport: hasCSSTOMSupport,
  sheets: sheets,
  toCssValue: toCssValue
});

var at = '@global';
var atPrefix = '@global ';

var GlobalContainerRule =
/*#__PURE__*/
function () {
  function GlobalContainerRule(key, styles, options) {
    this.type = 'global';
    this.at = at;
    this.isProcessed = false;
    this.key = key;
    this.options = options;
    this.rules = new RuleList(_extends({}, options, {
      parent: this
    }));

    for (var selector in styles) {
      this.rules.add(selector, styles[selector]);
    }

    this.rules.process();
  }
  /**
   * Get a rule.
   */


  var _proto = GlobalContainerRule.prototype;

  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  }
  /**
   * Create and register rule, run plugins.
   */
  ;

  _proto.addRule = function addRule(name, style, options) {
    var rule = this.rules.add(name, style, options);
    if (rule) this.options.jss.plugins.onProcessRule(rule);
    return rule;
  }
  /**
   * Replace rule, run plugins.
   */
  ;

  _proto.replaceRule = function replaceRule(name, style, options) {
    var newRule = this.rules.replace(name, style, options);
    if (newRule) this.options.jss.plugins.onProcessRule(newRule);
    return newRule;
  }
  /**
   * Get index of a rule.
   */
  ;

  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  }
  /**
   * Generates a CSS string.
   */
  ;

  _proto.toString = function toString(options) {
    return this.rules.toString(options);
  };

  return GlobalContainerRule;
}();

var GlobalPrefixedRule =
/*#__PURE__*/
function () {
  function GlobalPrefixedRule(key, style, options) {
    this.type = 'global';
    this.at = at;
    this.isProcessed = false;
    this.key = key;
    this.options = options;
    var selector = key.substr(atPrefix.length);
    this.rule = options.jss.createRule(selector, style, _extends({}, options, {
      parent: this
    }));
  }

  var _proto2 = GlobalPrefixedRule.prototype;

  _proto2.toString = function toString(options) {
    return this.rule ? this.rule.toString(options) : '';
  };

  return GlobalPrefixedRule;
}();

var separatorRegExp$1 = /\s*,\s*/g;

function addScope(selector, scope) {
  var parts = selector.split(separatorRegExp$1);
  var scoped = '';

  for (var i = 0; i < parts.length; i++) {
    scoped += scope + " " + parts[i].trim();
    if (parts[i + 1]) scoped += ', ';
  }

  return scoped;
}

function handleNestedGlobalContainerRule(rule, sheet) {
  var options = rule.options,
      style = rule.style;
  var rules = style ? style[at] : null;
  if (!rules) return;

  for (var name in rules) {
    sheet.addRule(name, rules[name], _extends({}, options, {
      selector: addScope(name, rule.selector)
    }));
  }

  delete style[at];
}

function handlePrefixedGlobalRule(rule, sheet) {
  var options = rule.options,
      style = rule.style;

  for (var prop in style) {
    if (prop[0] !== '@' || prop.substr(0, at.length) !== at) continue;
    var selector = addScope(prop.substr(at.length), rule.selector);
    sheet.addRule(selector, style[prop], _extends({}, options, {
      selector: selector
    }));
    delete style[prop];
  }
}
/**
 * Convert nested rules to separate, remove them from original styles.
 */


function jssGlobal() {
  function onCreateRule(name, styles, options) {
    if (!name) return null;

    if (name === at) {
      return new GlobalContainerRule(name, styles, options);
    }

    if (name[0] === '@' && name.substr(0, atPrefix.length) === atPrefix) {
      return new GlobalPrefixedRule(name, styles, options);
    }

    var parent = options.parent;

    if (parent) {
      if (parent.type === 'global' || parent.options.parent && parent.options.parent.type === 'global') {
        options.scoped = false;
      }
    }

    if (!options.selector && options.scoped === false) {
      options.selector = name;
    }

    return null;
  }

  function onProcessRule(rule, sheet) {
    if (rule.type !== 'style' || !sheet) return;
    handleNestedGlobalContainerRule(rule, sheet);
    handlePrefixedGlobalRule(rule, sheet);
  }

  return {
    onCreateRule: onCreateRule,
    onProcessRule: onProcessRule
  };
}

var separatorRegExp = /\s*,\s*/g;
var parentRegExp = /&/g;
var refRegExp = /\$([\w-]+)/g;
/**
 * Convert nested rules to separate, remove them from original styles.
 */

function jssNested() {
  // Get a function to be used for $ref replacement.
  function getReplaceRef(container, sheet) {
    return function (match, key) {
      var rule = container.getRule(key) || sheet && sheet.getRule(key);

      if (rule) {
        return rule.selector;
      }
      return key;
    };
  }

  function replaceParentRefs(nestedProp, parentProp) {
    var parentSelectors = parentProp.split(separatorRegExp);
    var nestedSelectors = nestedProp.split(separatorRegExp);
    var result = '';

    for (var i = 0; i < parentSelectors.length; i++) {
      var parent = parentSelectors[i];

      for (var j = 0; j < nestedSelectors.length; j++) {
        var nested = nestedSelectors[j];
        if (result) result += ', '; // Replace all & by the parent or prefix & with the parent.

        result += nested.indexOf('&') !== -1 ? nested.replace(parentRegExp, parent) : parent + " " + nested;
      }
    }

    return result;
  }

  function getOptions(rule, container, prevOptions) {
    // Options has been already created, now we only increase index.
    if (prevOptions) return _extends({}, prevOptions, {
      index: prevOptions.index + 1
    });
    var nestingLevel = rule.options.nestingLevel;
    nestingLevel = nestingLevel === undefined ? 1 : nestingLevel + 1;

    var options = _extends({}, rule.options, {
      nestingLevel: nestingLevel,
      index: container.indexOf(rule) + 1 // We don't need the parent name to be set options for chlid.

    });

    delete options.name;
    return options;
  }

  function onProcessStyle(style, rule, sheet) {
    if (rule.type !== 'style') return style;
    var styleRule = rule;
    var container = styleRule.options.parent;
    var options;
    var replaceRef;

    for (var prop in style) {
      var isNested = prop.indexOf('&') !== -1;
      var isNestedConditional = prop[0] === '@';
      if (!isNested && !isNestedConditional) continue;
      options = getOptions(styleRule, container, options);

      if (isNested) {
        var selector = replaceParentRefs(prop, styleRule.selector); // Lazily create the ref replacer function just once for
        // all nested rules within the sheet.

        if (!replaceRef) replaceRef = getReplaceRef(container, sheet); // Replace all $refs.

        selector = selector.replace(refRegExp, replaceRef);
        var name = styleRule.key + "-" + prop;

        if ('replaceRule' in container) {
          // for backward compatibility
          container.replaceRule(name, style[prop], _extends({}, options, {
            selector: selector
          }));
        } else {
          container.addRule(name, style[prop], _extends({}, options, {
            selector: selector
          }));
        }
      } else if (isNestedConditional) {
        // Place conditional right after the parent rule to ensure right ordering.
        container.addRule(prop, {}, options).addRule(styleRule.key, style[prop], {
          selector: styleRule.selector
        });
      }

      delete style[prop];
    }

    return style;
  }

  return {
    onProcessStyle: onProcessStyle
  };
}

/* eslint-disable no-var, prefer-template */
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function toHyphenLower(match) {
  return '-' + match.toLowerCase()
}

function hyphenateStyleName(name) {
  if (cache.hasOwnProperty(name)) {
    return cache[name]
  }

  var hName = name.replace(uppercasePattern, toHyphenLower);
  return (cache[name] = msPattern.test(hName) ? '-' + hName : hName)
}

/**
 * Convert camel cased property names to dash separated.
 */

function convertCase(style) {
  var converted = {};

  for (var prop in style) {
    var key = prop.indexOf('--') === 0 ? prop : hyphenateStyleName(prop);
    converted[key] = style[prop];
  }

  if (style.fallbacks) {
    if (Array.isArray(style.fallbacks)) converted.fallbacks = style.fallbacks.map(convertCase);else converted.fallbacks = convertCase(style.fallbacks);
  }

  return converted;
}
/**
 * Allow camel cased property names by converting them back to dasherized.
 */


function camelCase() {
  function onProcessStyle(style) {
    if (Array.isArray(style)) {
      // Handle rules like @font-face, which can have multiple styles in an array
      for (var index = 0; index < style.length; index++) {
        style[index] = convertCase(style[index]);
      }

      return style;
    }

    return convertCase(style);
  }

  function onChangeValue(value, prop, rule) {
    if (prop.indexOf('--') === 0) {
      return value;
    }

    var hyphenatedProp = hyphenateStyleName(prop); // There was no camel case in place

    if (prop === hyphenatedProp) return value;
    rule.prop(hyphenatedProp, value); // Core will ignore that property value we set the proper one above.

    return null;
  }

  return {
    onProcessStyle: onProcessStyle,
    onChangeValue: onChangeValue
  };
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			var isInstance = false;
      try {
        isInstance = this instanceof a;
      } catch {}
			if (isInstance) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var _tslib = {};

var hasRequired_tslib;

function require_tslib () {
	if (hasRequired_tslib) return _tslib;
	hasRequired_tslib = 1;
	(function (exports) {

		Object.defineProperty(exports, '__esModule', { value: true });

		/*! *****************************************************************************
		Copyright (c) Microsoft Corporation.

		Permission to use, copy, modify, and/or distribute this software for any
		purpose with or without fee is hereby granted.

		THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
		REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
		AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
		INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
		LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
		OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
		PERFORMANCE OF THIS SOFTWARE.
		***************************************************************************** */

		exports.__assign = function () {
			exports.__assign =
				Object.assign ||
				function __assign(t) {
					for (var s, i = 1, n = arguments.length; i < n; i++) {
						s = arguments[i];
						for (var p in s)
							if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
					}
					return t;
				};
			return exports.__assign.apply(this, arguments);
		}; 
	} (_tslib));
	return _tslib;
}

var require$$1 = /*@__PURE__*/getAugmentedNamespace(jss_esm);

var sortCssMediaQueries;
var hasRequiredSortCssMediaQueries;

function requireSortCssMediaQueries () {
	if (hasRequiredSortCssMediaQueries) return sortCssMediaQueries;
	hasRequiredSortCssMediaQueries = 1;

	/**
	 * The custom `sort` method for
	 * for the [`css-mqpacker`](https://www.npmjs.com/package/css-mqpacker) or
	 * [`pleeease`](https://www.npmjs.com/package/pleeease) which using `css-mqpacker`
	 * or, perhaps, something else ))
	 *
	 * @module sort-css-media-queries
	 * @author Oleg Dutchenko <dutchenko.o.wezom@gmail.com>
	 * @version 1.5.0
	 */

	// ----------------------------------------
	// Private
	// ----------------------------------------

	const minMaxWidth = /(!?\(\s*min(-device-)?-width)(.|\n)+\(\s*max(-device)?-width/i;
	const minWidth = /\(\s*min(-device)?-width/i;
	const maxMinWidth = /(!?\(\s*max(-device)?-width)(.|\n)+\(\s*min(-device)?-width/i;
	const maxWidth = /\(\s*max(-device)?-width/i;

	const isMinWidth = _testQuery(minMaxWidth, maxMinWidth, minWidth);
	const isMaxWidth = _testQuery(maxMinWidth, minMaxWidth, maxWidth);

	const minMaxHeight = /(!?\(\s*min(-device)?-height)(.|\n)+\(\s*max(-device)?-height/i;
	const minHeight = /\(\s*min(-device)?-height/i;
	const maxMinHeight = /(!?\(\s*max(-device)?-height)(.|\n)+\(\s*min(-device)?-height/i;
	const maxHeight = /\(\s*max(-device)?-height/i;

	const isMinHeight = _testQuery(minMaxHeight, maxMinHeight, minHeight);
	const isMaxHeight = _testQuery(maxMinHeight, minMaxHeight, maxHeight);

	const isPrint = /print/i;
	const isPrintOnly = /^print$/i;

	const maxValue = Number.MAX_VALUE;

	/**
	 * Obtain the length of the media request in pixels.
	 * Copy from original source `function inspectLength (length)`
	 * {@link https://github.com/hail2u/node-css-mqpacker/blob/master/index.js#L58}
	 * @private
	 * @param {string} length
	 * @return {number}
	 */
	function _getQueryLength (length) {
	  length = /(-?\d*\.?\d+)(ch|em|ex|px|rem)/.exec(length);

	  if (length === null) {
	    return maxValue
	  }

	  let number = length[1];
	  const unit = length[2];

	  switch (unit) {
	    case 'ch':
	      number = parseFloat(number) * 8.8984375;
	      break

	    case 'em':
	    case 'rem':
	      number = parseFloat(number) * 16;
	      break

	    case 'ex':
	      number = parseFloat(number) * 8.296875;
	      break

	    case 'px':
	      number = parseFloat(number);
	      break
	  }

	  return +number
	}

	/**
	 * Wrapper for creating test functions
	 * @private
	 * @param {RegExp} doubleTestTrue
	 * @param {RegExp} doubleTestFalse
	 * @param {RegExp} singleTest
	 * @return {Function}
	 */
	function _testQuery (doubleTestTrue, doubleTestFalse, singleTest) {
	  /**
	   * @param {string} query
	   * @return {boolean}
	   */
	  return function (query) {
	    if (doubleTestTrue.test(query)) {
	      return true
	    } else if (doubleTestFalse.test(query)) {
	      return false
	    }
	    return singleTest.test(query)
	  }
	}

	/**
	 * @private
	 * @param {string} a
	 * @param {string} b
	 * @return {number|null}
	 */
	function _testIsPrint (a, b) {
	  const isPrintA = isPrint.test(a);
	  const isPrintOnlyA = isPrintOnly.test(a);

	  const isPrintB = isPrint.test(b);
	  const isPrintOnlyB = isPrintOnly.test(b);

	  if (isPrintA && isPrintB) {
	    if (!isPrintOnlyA && isPrintOnlyB) {
	      return 1
	    }
	    if (isPrintOnlyA && !isPrintOnlyB) {
	      return -1
	    }
	    return a.localeCompare(b)
	  }
	  if (isPrintA) {
	    return 1
	  }
	  if (isPrintB) {
	    return -1
	  }

	  return null
	}

	// ----------------------------------------
	// Public
	// ----------------------------------------

	/**
	 * Sorting an array with media queries
	 * according to the mobile-first methodology.
	 * @param {string} a
	 * @param {string} b
	 * @return {number} 1 / 0 / -1
	 */
	function sortCSSmq (a, b) {
	  const testIsPrint = _testIsPrint(a, b);
	  if (testIsPrint !== null) {
	    return testIsPrint
	  }

	  const minA = isMinWidth(a) || isMinHeight(a);
	  const maxA = isMaxWidth(a) || isMaxHeight(a);

	  const minB = isMinWidth(b) || isMinHeight(b);
	  const maxB = isMaxWidth(b) || isMaxHeight(b);

	  if (minA && maxB) {
	    return -1
	  }
	  if (maxA && minB) {
	    return 1
	  }

	  let lengthA = _getQueryLength(a);
	  let lengthB = _getQueryLength(b);

	  if (lengthA === maxValue && lengthB === maxValue) {
	    return a.localeCompare(b)
	  } else if (lengthA === maxValue) {
	    return 1
	  } else if (lengthB === maxValue) {
	    return -1
	  }

	  if (lengthA > lengthB) {
	    if (maxA) {
	      return -1
	    }
	    return 1
	  }

	  if (lengthA < lengthB) {
	    if (maxA) {
	      return 1
	    }
	    return -1
	  }

	  return a.localeCompare(b)
	}

	/**
	 * Sorting an array with media queries
	 * according to the desktop-first methodology.
	 * @param {string} a
	 * @param {string} b
	 * @return {number} 1 / 0 / -1
	 */
	sortCSSmq.desktopFirst = function (a, b) {
	  const testIsPrint = _testIsPrint(a, b);
	  if (testIsPrint !== null) {
	    return testIsPrint
	  }

	  const minA = isMinWidth(a) || isMinHeight(a);
	  const maxA = isMaxWidth(a) || isMaxHeight(a);

	  const minB = isMinWidth(b) || isMinHeight(b);
	  const maxB = isMaxWidth(b) || isMaxHeight(b);

	  if (minA && maxB) {
	    return 1
	  }
	  if (maxA && minB) {
	    return -1
	  }

	  const lengthA = _getQueryLength(a);
	  const lengthB = _getQueryLength(b);

	  if (lengthA === maxValue && lengthB === maxValue) {
	    return a.localeCompare(b)
	  } else if (lengthA === maxValue) {
	    return 1
	  } else if (lengthB === maxValue) {
	    return -1
	  }

	  if (lengthA > lengthB) {
	    if (maxA) {
	      return -1
	    }
	    return 1
	  }

	  if (lengthA < lengthB) {
	    if (maxA) {
	      return 1
	    }
	    return -1
	  }

	  return -(a.localeCompare(b))
	};

	// ----------------------------------------
	// Exports
	// ----------------------------------------

	sortCssMediaQueries = sortCSSmq;
	return sortCssMediaQueries;
}

var dist;
var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;

	var _tslib = require_tslib();
	var jss = require$$1;
	var sortCSSmq = requireSortCssMediaQueries();

	function _interopDefaultLegacy(e) {
		return e && typeof e === 'object' && 'default' in e ? e : { default: e };
	}

	var sortCSSmq__default = /*#__PURE__*/ _interopDefaultLegacy(sortCSSmq);

	function isPlainObject(sample) {
		return (
			sample !== null && typeof sample === 'object' && Array.isArray(sample) === false
		);
	}
	var UN_QUERIED = '__UN_QUERIED';
	function recursiveInnerAndGetQueries(pluginOptions, rules) {
		var queries = {
			groups: {},
			groupsSortNames: []
		};
		for (var index = 0; index < rules.length; index++) {
			var rule = rules[index];
			var query =
				rule.type === 'conditional' && typeof rule.query === 'string'
					? rule.query
					: UN_QUERIED;
			if (!queries.groups.hasOwnProperty(query)) {
				queries.groupsSortNames.push(query);
				queries.groups[query] = [];
			}
			queries.groups[query].push(index);
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			recursive(pluginOptions, rule);
		}
		queries.groupsSortNames.sort(function (a, b) {
			var aWeight = a === UN_QUERIED ? 0 : a.length;
			var bWeight = b === UN_QUERIED ? 0 : b.length;
			if (aWeight > 0 && bWeight > 0) {
				if (pluginOptions.desktopFirst) {
					return sortCSSmq__default['default'].desktopFirst(a, b);
				} else {
					return sortCSSmq__default['default'](a, b);
				}
			} else {
				return aWeight - bWeight;
			}
		});
		return queries;
	}
	function recursive(pluginOptions, data) {
		if (isPlainObject(data) && data.rules instanceof jss.RuleList) {
			data.rules.toString = function (options) {
				if (options === void 0) {
					options = {};
				}
				var str = '';
				var sheet = this.options.sheet;
				var link = sheet ? sheet.options.link : false;
				var _a = recursiveInnerAndGetQueries(pluginOptions, this.index),
					groups = _a.groups,
					groupsSortNames = _a.groupsSortNames;
				for (var i = 0; i < groupsSortNames.length; i++) {
					var groupName = groupsSortNames[i];
					var group = groups[groupsSortNames[i]];
					if (groupName !== UN_QUERIED && pluginOptions.combineMediaQueries) {
						str += '\n' + groupName + ' {';
						for (var i_1 = 0; i_1 < group.length; i_1++) {
							var rule = this.index[group[i_1]];
							var css = rule.rules.toString(
								_tslib.__assign(_tslib.__assign({}, options), {
									indent: (options.indent || 0) + 1
								})
							);
							if (!css && !link) continue;
							if (str) str += '\n';
							str += css;
						}
						str += '\n}\n';
					} else {
						for (var i_2 = 0; i_2 < group.length; i_2++) {
							var rule = this.index[group[i_2]];
							var css = rule.toString(options);
							if (!css && !link) continue;
							if (str) str += '\n';
							str += css;
						}
					}
				}
				return str;
			};
		}
	}
	function jssCombineAndSortMQ(options) {
		if (options === void 0) {
			options = {};
		}
		return {
			onProcessSheet: function (sheet) {
				recursive(options, sheet);
			}
		};
	}

	dist = jssCombineAndSortMQ;
	return dist;
}

var distExports = requireDist();
var jssPluginSortMediaQueries = /*@__PURE__*/getDefaultExportFromCjs(distExports);

const isDisabledOrLoading = (disabled, loading) => {
    return disabled || loading;
};

const hasWindow = typeof window !== 'undefined';

const isHighContrastMode = hasWindow && window.matchMedia?.('(forced-colors: active)').matches;

const lighten = (hsl) => {
    return changeColor(hsl, 15);
};
const darken = (hsl) => {
    return changeColor(hsl, -15);
};
const changeColor = (hsl, lightness) => {
    return hsl.replace(/\s(\d+)(%?)\//, (_, p1, p2) => {
        return ` ${Math.min(Math.max(Number.parseInt(p1, 10) + lightness, 0), 100)}${p2}/`;
    });
};

const borderRadiusSmall = '4px';

const borderRadiusMedium = '8px';

const borderRadiusLarge = '12px';

const borderWidthBase = '2px';

const _dropShadowBackgroundColor = 'rgba(0, 0, 0, 0.16)';

const dropShadowLowStyle = {
    boxShadow: `0px 3px 8px ${_dropShadowBackgroundColor}`, // filter: drop-shadow() causes visual glitches in Firefox in combination with frostedGlassStyle
};

const dropShadowHighStyle = {
    boxShadow: `0px 8px 40px ${_dropShadowBackgroundColor}`, // filter: drop-shadow() causes visual glitches in Firefox in combination with frostedGlassStyle
};

const fontFamily = "'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif";

const fontHyphenationStyle = {
    overflowWrap: 'break-word',
    hyphens: 'auto',
};

const fontLineHeight = 'calc(6px + 2.125ex)';

const fontSizeTextXXSmall = '.75rem';

const fontSizeTextXSmall = 'clamp(0.81rem, 0.23vw + 0.77rem, 0.88rem)';

const fontSizeTextSmall = '1rem';

const fontSizeTextMedium = 'clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)';

const fontSizeTextLarge = 'clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)';

const fontSizeTextXLarge = 'clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)';

const fontSizeText = {
    xxSmall: fontSizeTextXXSmall,
    xSmall: fontSizeTextXSmall,
    small: fontSizeTextSmall,
    medium: fontSizeTextMedium,
    large: fontSizeTextLarge,
    xLarge: fontSizeTextXLarge,
};

const fontSizeHeadingSmall = fontSizeTextSmall;

const fontSizeHeadingMedium = fontSizeTextMedium;

const fontSizeHeadingLarge = fontSizeTextLarge;

const fontSizeHeadingXLarge = fontSizeTextXLarge;

const fontSizeHeadingXXLarge = 'clamp(1.6rem, 1.56vw + 1.29rem, 3.16rem)';

const fontSizeDisplaySmall = 'clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem)';

const fontSizeDisplayMedium = 'clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem)';

const fontSizeDisplayLarge = 'clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem)';

const fontWeightRegular = 400;

const fontWeightSemiBold = 600;

const fontWeightBold = 700;

const fontStyleNormal = 'normal';

const fontVariant = 'normal';

const backdropFilter = 'blur(32px)';
const frostedGlassStyle = {
    WebkitBackdropFilter: backdropFilter,
    backdropFilter,
};

const _gradient = 'hsla(0, 0%, 0%, 0.80) 0%,' +
    'hsla(0, 0%, 0%, 0.80) 8.1%,' +
    'hsla(0, 0%, 0%, 0.80) 15.5%,' +
    'hsla(0, 0%, 0%, 0.80) 22.5%,' +
    'hsla(0, 0%, 0%, 0.78) 29%,' +
    'hsla(0, 0%, 0%, 0.73) 35.3%,' +
    'hsla(0, 0%, 0%, 0.67) 41.2%,' +
    'hsla(0, 0%, 0%, 0.60) 47.1%,' +
    'hsla(0, 0%, 0%, 0.52) 52.9%,' +
    'hsla(0, 0%, 0%, 0.44) 58.8%,' +
    'hsla(0, 0%, 0%, 0.33) 64.7%,' +
    'hsla(0, 0%, 0%, 0.22) 71%,' +
    'hsla(0, 0%, 0%, 0.12) 77.5%,' +
    'hsla(0, 0%, 0%, 0.05) 84.5%,' +
    'hsla(0, 0%, 0%, 0.011) 91.9%,' +
    'hsla(0, 0%, 0%, 0)';

const gradientToBottomStyle = {
    background: `linear-gradient(to bottom, ${_gradient} 100%);`,
};

const gradientToTopStyle = {
    background: `linear-gradient(to top, ${_gradient} 100%);`,
};

const breakpointBase = 0;

const breakpointXS = 480;

const breakpointS = 760;

const breakpointM = 1000;

const breakpointL = 1300;

const breakpointXL = 1760;

const breakpointXXL = 1920;

const breakpoint = {
    base: breakpointBase,
    xs: breakpointXS,
    s: breakpointS,
    m: breakpointM,
    l: breakpointL,
    xl: breakpointXL,
    xxl: breakpointXXL,
};

function getMediaQueryMin(min) {
    return `@media(min-width:${breakpoint[min]}px)`;
}

const spacingFluidMedium = 'clamp(16px, 1.25vw + 12px, 36px)';

const gridGap = spacingFluidMedium;

const _gridWidthMax = '2560px';
// fluid sizing calculated by https://fluidtypography.com/#app-get-started
const _gridSafeZoneBase = 'max(22px, 10.625vw - 12px)'; // viewport-width range = 320 - 760px / size range = 22 - 68.75px
const _gridSafeZoneS = 'calc(5vw - 16px)'; // viewport-width range = 760 - 1920px / size range = 22(22.75) - 80(79.71)px
const _gridSafeZoneXXL = 'min(50vw - 880px, 400px)'; // viewport-width range = 1920 - 2560px / size range = 80(79.71)px - 400(399.71)px

const columnMap = {
    narrow: 4,
    basic: 2,
    extended: 1,
};
const gridColumnWidthS = `calc((100vw - ${_gridSafeZoneS} * 2 - ${gridGap} * 15) / 16)`;
const gridColumnWidthXXL = `calc((min(100vw, ${_gridWidthMax}) - ${_gridSafeZoneXXL} * 2 - ${gridGap} * 15) / 16)`;
const _gridPadding = `max(0px, 50vw - ${_gridWidthMax} / 2)`;
const _getGridOffsetS = (width) => `calc(${_gridSafeZoneS} + (${gridGap} + ${gridColumnWidthS}) * ${columnMap[width]})`;
const _getGridOffsetXXL = (width) => `calc(${_gridPadding} + ${_gridSafeZoneXXL} + (${gridGap} + ${gridColumnWidthXXL}) * ${columnMap[width]})`;

const gridFullOffset = _gridPadding;

const gridExtendedOffsetBase = _gridSafeZoneBase;

const gridExtendedOffsetS = _getGridOffsetS('extended');

const gridExtendedOffsetXXL = _getGridOffsetXXL('extended');

const gridExtendedOffset = {
    base: gridExtendedOffsetBase,
    s: gridExtendedOffsetS,
    xxl: gridExtendedOffsetXXL,
};

const gridBasicOffsetBase = _gridSafeZoneBase;

const gridBasicOffsetS = _getGridOffsetS('basic');

const gridBasicOffsetXXL = _getGridOffsetXXL('basic');

const gridBasicOffset = {
    base: gridBasicOffsetBase,
    s: gridBasicOffsetS,
    xxl: gridBasicOffsetXXL,
};

const gridNarrowOffsetBase = _gridSafeZoneBase;

const gridNarrowOffsetS = _getGridOffsetS('narrow');

const gridNarrowOffsetXXL = _getGridOffsetXXL('narrow');

const gridNarrowOffset = {
    base: gridNarrowOffsetBase,
    s: gridNarrowOffsetS,
    xxl: gridNarrowOffsetXXL,
};

const motionDurationShort = '0.25s';

const motionEasingBase = 'cubic-bezier(0.25,0.1,0.25,1)';

const breakpoints = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

function getMediaQueryMax(max) {
    return `@media(max-width:${breakpoint[max] - 1}px)`;
}

const motionDurationLong = '0.6s';

const motionDurationModerate = '0.4s';

const motionDurationVeryLong = '1.2s';

const motionEasingIn = 'cubic-bezier(0,0,0.2,1)';

const motionEasingOut = 'cubic-bezier(0.4,0,0.5,1)';

const spacingStaticXSmall = '4px';

const spacingStaticSmall = '8px';

const spacingStaticMedium = '16px';

const spacingStaticLarge = '32px';

const spacingFluidXSmall = 'clamp(4px, 0.25vw + 3px, 8px)';

const spacingFluidSmall = 'clamp(8px, 0.5vw + 6px, 16px)';

const spacingFluidLarge = 'clamp(32px, 2.75vw + 23px, 76px)';

const _displayFontPartA = `${fontStyleNormal} ${fontVariant} ${fontWeightRegular} `;
const _displayFontPartB = `/${fontLineHeight} ${fontFamily}`;

const displayMediumStyle = {
    font: `${_displayFontPartA}${fontSizeDisplayMedium}${_displayFontPartB}`,
};

const displayLargeStyle = {
    font: `${_displayFontPartA}${fontSizeDisplayLarge}${_displayFontPartB}`,
};

const _headingFontPartA = `${fontStyleNormal} ${fontVariant} ${fontWeightSemiBold} `;
const _headingFontPartB = `/${fontLineHeight} ${fontFamily}`;

const headingSmallStyle = {
    font: `${_headingFontPartA}${fontSizeHeadingSmall}${_headingFontPartB}`,
};

const headingMediumStyle = {
    font: `${_headingFontPartA}${fontSizeHeadingMedium}${_headingFontPartB}`,
};

const headingLargeStyle = {
    font: `${_headingFontPartA}${fontSizeHeadingLarge}${_headingFontPartB}`,
};

const headingXLargeStyle = {
    font: `${_headingFontPartA}${fontSizeHeadingXLarge}${_headingFontPartB}`,
};

const headingXXLargeStyle = {
    font: `${_headingFontPartA}${fontSizeHeadingXXLarge}${_headingFontPartB}`,
};

const _textFontPartA = `${fontStyleNormal} ${fontVariant} ${fontWeightRegular} `;
const _textFontPartB = `/${fontLineHeight} ${fontFamily}`;

const textXXSmallStyle = {
    font: `${_textFontPartA}${fontSizeTextXXSmall}${_textFontPartB}`,
    ...fontHyphenationStyle,
};

const textXSmallStyle = {
    font: `${_textFontPartA}${fontSizeTextXSmall}${_textFontPartB}`,
    ...fontHyphenationStyle,
};

const textSmallStyle = {
    font: `${_textFontPartA}${fontSizeTextSmall}${_textFontPartB}`,
    ...fontHyphenationStyle,
};

const textMediumStyle = {
    font: `${_textFontPartA}${fontSizeTextMedium}${_textFontPartB}`,
    ...fontHyphenationStyle,
};

const textLargeStyle = {
    font: `${_textFontPartA}${fontSizeTextLarge}${_textFontPartB}`,
    ...fontHyphenationStyle,
};

/* Auto Generated Start */
const themeLight = {
    primaryColor: '#010205',
    primaryColorDarken: '#000000',
    backgroundColor: '#FFF',
    backgroundColorDarken: '#E0E0E0',
    backgroundColorLighten: '#FFFFFF',
    backgroundSurfaceColor: '#EEEFF2',
    backgroundSurfaceColorDarken: '#CBCED7',
    backgroundSurfaceColorLighten: '#FFFFFF',
    backgroundShadingColor: 'rgba(1, 2, 5, 0.67)',
    backgroundFrostedColor: 'hsl(240 4% 85%/35%)',
    contrastLowColor: '#D8D8DB',
    contrastMediumColor: '#6B6D70',
    contrastHighColor: '#535457',
    contrastHighColorDarken: '#353638',
    contrastHighColorLighten: '#717276',
    hoverColor: 'rgba(148, 149, 152, .18)',
    hoverColorDarken: '#75767A',
    activeColor: 'rgba(148, 149, 152, 0.20)',
    focusColor: '#1A44EA',
    disabledColor: '#949598',
    errorColor: '#CC1922',
    errorColorDarken: '#951219',
    errorSoftColor: '#FFE2E4',
    errorSoftColorDarken: '#F4CED1',
    errorSoftColorLighten: '#FFFFFF',
    successColor: '#197E10',
    successColorDarken: '#0E4809',
    successSoftColor: '#E4FFEC',
    successSoftColorDarken: '#D0F4DB',
    successSoftColorLighten: '#FFFFFF',
    warningColor: '#F3BE00',
    warningSoftColor: '#FFF4D2',
    warningSoftColorDarken: '#F1E5C1',
    warningSoftColorLighten: '#FCFAF3',
    infoColor: '#2762EC',
    infoSoftColor: '#D3E1FF',
    infoSoftColorDarken: '#C2D1F1',
    infoSoftColorLighten: '#F4F7FD'
};
const themeDark = {
    primaryColor: '#FBFCFF',
    primaryColorDarken: '#BECEFF',
    backgroundColor: '#0E0E12',
    backgroundColorDarken: '#000000',
    backgroundColorLighten: '#292934',
    backgroundSurfaceColor: '#212225',
    backgroundSurfaceColorDarken: '#040405',
    backgroundSurfaceColorLighten: '#3E4045',
    backgroundShadingColor: 'rgba(38, 38, 41, 0.67)',
    backgroundFrostedColor: 'hsl(240 3% 26%/35%)',
    contrastLowColor: '#404044',
    contrastMediumColor: '#88898C',
    contrastHighColor: '#AFB0B3',
    contrastHighColorDarken: '#909195',
    contrastHighColorLighten: '#CECFD1',
    hoverColor: 'rgba(148, 149, 152, .18)',
    hoverColorDarken: '#75767A',
    activeColor: 'rgba(126, 127, 130, 0.20)',
    focusColor: '#1A44EA',
    disabledColor: '#7E7F82',
    errorColor: '#FC4040',
    errorColorDarken: '#FB0404',
    errorSoftColor: '#3A0F0F',
    errorSoftColorDarken: '#1A1111',
    errorSoftColorLighten: '#3F2828',
    successColor: '#09D087',
    successColorDarken: '#069561',
    successSoftColor: '#003320',
    successSoftColorDarken: '#04110C',
    successSoftColorLighten: '#0F432F',
    warningColor: '#F7CB47',
    warningSoftColor: '#362B0A',
    warningSoftColorDarken: '#16130B',
    warningSoftColorLighten: '#3E3720',
    infoColor: '#178BFF',
    infoSoftColor: '#04294E',
    infoSoftColorDarken: '#0C1A27',
    infoSoftColorLighten: '#1A3856'
};
const themeAuto = {
    ...themeLight,
};
const themes = {
    'light': themeLight,
    'dark': themeDark,
    'auto': themeAuto
};
/* Auto Generated End */
const schemeHighContrastMerged = {
    disabledColor: 'GrayText',
    focusColor: 'Highlight',
};
const schemeHighContrast = {
    canvasColor: 'Canvas',
    canvasTextColor: 'CanvasText',
    highlightColor: 'Highlight',
    linkColor: 'LinkText',
};
const getThemedColors = (theme) => {
    return isHighContrastMode ? { ...themes[theme], ...schemeHighContrastMerged } : themes[theme];
};
const getHighContrastColors = () => {
    return schemeHighContrast;
};
const getInvertedThemedColors = (theme) => {
    return getThemedColors(isThemeDark(theme) ? 'light' : 'dark');
};

const motionDurationMap = {
    short: motionDurationShort,
    moderate: motionDurationModerate,
    long: motionDurationLong,
    veryLong: motionDurationVeryLong,
};
const motionEasingMap = {
    base: motionEasingBase,
    in: motionEasingIn,
    out: motionEasingOut,
    linear: 'linear',
};
/**
 * Base value used for spacing calculations
 *
 * This constant defines the base value of 16 pixels, which serves as a
 * standard unit for calculating relative sizes. By multiplying this base
 * value with scaling factors and proportions, you can derive consistent
 * and proportional dimensions and spacings throughout the design.
 *
 * Example:
 * const spacing = scalingFactor * proportion * SCALING_BASE_VALUE;
 */
const SCALING_BASE_VALUE = '16px';
const dismissButtonJssStyle = {
    '--p-internal-button-scaling': 0,
};
const cssVariableTransitionDuration = '--p-transition-duration';
const cssVariableAnimationDuration = '--p-animation-duration';
const getAnimation = (name, duration = 'short', easing = 'base') => {
    return `${name} var(${cssVariableAnimationDuration}, ${motionDurationMap[duration]}) ${motionEasingMap[easing]}`;
};
const getTransition = (cssProperty, duration = 'short', easing = 'base', delay) => {
    return `${cssProperty} var(${cssVariableTransitionDuration}, ${motionDurationMap[duration]}) ${motionEasingMap[easing]}${''}`;
};
const addImportantToRule = (value) => `${value} !important`;
const addImportantToEachRule = (input) => {
    return Object.entries(input).reduce((result, [key, value]) => value === null
        ? result
        : // @ts-expect-error: Type string can't be used to index type JssStyle
            ((result[key] =
                // biome-ignore lint/complexity/noCommaOperator: to be refactored
                typeof value === 'object' ? addImportantToEachRule(value) : addImportantToRule(value)),
                result), {});
};
// TODO: this is workaround, in order the colors to be bundled in the main bundle, we need to have at least one function here, which is used in project and which calls "getThemedColors"
// TODO: This mechanism needs to be investigated as part of refactoring
const doGetThemedColors = (theme = 'light') => {
    return getThemedColors(theme);
};
const getFocusJssStyle = (theme, opts) => {
    const { offset = '2px', slotted = '', pseudo = false } = opts || {};
    const { focusColor } = getThemedColors(theme);
    const { focusColor: focusColorDark } = getThemedColors('dark');
    const slottedSelector = slotted && slotted !== true ? slotted : '';
    return {
        [`&${slotted ? '(' : ''}${slottedSelector}::-moz-focus-inner${slotted ? ')' : ''}`]: {
            border: 0, // reset ua-style (for FF)
        },
        [`&${slotted ? '(' : ''}${slottedSelector}:focus${slotted ? ')' : ''}`]: {
            outline: 0, // reset ua-style (for older browsers)
        },
        ...(pseudo && {
            [`&${slotted ? '(' : ''}${slottedSelector}:focus-visible${slotted ? ')' : ''}`]: {
                outline: 0, // reset ua-style (for modern browsers)
            },
        }),
        [`&${slotted ? '(' : ''}${slottedSelector}:focus-visible${slotted ? ')' : ''}${pseudo ? '::before' : ''}`]: {
            outline: `${borderWidthBase} solid ${focusColor}`,
            outlineOffset: offset,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                outlineColor: focusColorDark,
            }),
        },
    };
};
// reset initial styles, e.g. in case link-pure is used with slotted anchor and nested within e.g. an accordion
const getResetInitialStylesForSlottedAnchor = {
    margin: 0,
    padding: 0,
    outline: 0, // reset native blue outline
    borderRadius: 0,
    background: 'transparent',
};
/**
 * Returns a JSS style object that can be used to visually hide text in the browser, while still allowing it to be accessed by screen readers.
 * @param {boolean} isHidden - A boolean value indicating whether the text should be hidden or not. Defaults to true.
 * @param {JssStyle} isShownJssStyle - Additional styles applied when isHidden = false
 * @returns {JssStyle} - A JSS style object containing styles depending on the value of isHidden and isShownJssStyle.
 */
const getHiddenTextJssStyle = (isHidden = true, isShownJssStyle) => {
    return isHidden
        ? {
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
        }
        : {
            position: 'static',
            width: 'auto',
            height: 'auto',
            padding: 0,
            margin: 0,
            overflow: 'visible',
            clip: 'auto',
            whiteSpace: 'normal',
            ...isShownJssStyle,
        };
};

const hostHiddenStyles = {
    '&([hidden])': {
        display: 'none',
    },
};

const colorSchemeStyles = {
    colorScheme: 'light dark',
};

/**
 * utility to wrap jss styles parameter in `@media (hover: hover)`
 * which is used to not have hover styles on touch devices
 */
const hoverMediaQuery = (style) => ({ '@media(hover:hover)': style });

const prefersColorSchemeDarkMediaQuery = (theme, style) => {
    return isThemeAuto(theme) && { '@media (prefers-color-scheme: dark)': style };
};

const preventFoucOfNestedElementsStyles = {
    ':not(:defined,[data-ssr])': {
        visibility: 'hidden',
    },
};

const getSchemedHighContrastMediaQuery = (light, dark) => {
    return {
        '@media (forced-colors: active) and (prefers-color-scheme: light)': light,
        '@media (forced-colors: active) and (prefers-color-scheme: dark)': dark,
    };
};

const forcedColorsMediaQuery = (style) => {
    return { '@media (forced-colors: active)': style };
};

const parseJSON = (prop) => {
    if (typeof prop === 'string') {
        try {
            // prop is potentially JSON parsable string, e.g. "{ base: 'block', l: 'inline' }" or "true" or "false"
            return JSON.parse(prop
                .replace(/'/g, '"') // convert single quotes to double quotes
                .replace(/[\s"]?([a-z]+)[\s"]?:([^//])/g, '"$1":$2') // wrap keys in double quotes if they don't have them but ignore potential urls
            );
        }
        catch {
            // prop is string, e.g. "block" or "inline"
            return prop;
        }
    }
    else {
        // prop is object, e.g. { base: 'block', l: 'inline' } or number, e.g. 123 or boolean, e.g. true
        return prop;
    }
};

// NOTE: handpicked selection of plugins from jss-preset-default
const jss = createJss({
    plugins: [
        jssGlobal(),
        jssNested(),
        camelCase(),
        jssPluginSortMediaQueries({ combineMediaQueries: true }),
    ],
});
const getCss = (jssStyles) => jss
    .createStyleSheet(jssStyles, {
    generateId: (rule) => rule.key,
})
    .toString();
const supportsConstructableStylesheets = () => {
    try {
        return typeof new CSSStyleSheet().replaceSync === 'function';
    }
    catch {
        return false;
    }
};
// determine it once
supportsConstructableStylesheets();
const buildResponsiveStyles = (rawValue, getJssStyle) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const value = parseJSON(rawValue);
    return typeof value === 'object'
        ? Object.keys(value)
            // base styles are applied on root object, responsive styles are nested within
            // hence it is used as the initial object within reduce function
            .filter((key) => key !== 'base')
            .reduce((result, breakpointValue) => ({
            ...result,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            [getMediaQueryMin(breakpointValue)]: getJssStyle(value[breakpointValue]),
        }), getJssStyle(value.base))
        : getJssStyle(value);
};
const isObject = (obj) => typeof obj === 'object' && !Array.isArray(obj);
// NOTE: taken from https://stackoverflow.com/a/48218209
const mergeDeep = (...objects) => {
    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach((key) => {
            const pVal = prev[key];
            const oVal = obj[key];
            if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            }
            else {
                prev[key] = oVal;
            }
        });
        return prev;
    }, {});
};

// TODO: Use function from ./jss (Causes bundling issues)
(() => {
    try {
        return typeof new CSSStyleSheet().replaceSync === 'function';
    }
    catch {
        return false;
    }
})(); // determine it once

const attributeMutationMap = new Map();
hasWindow &&
    new MutationObserver((mutations) => {
        for (const mutation of mutations
            // reduce array to only entries that have really a changed value
            .filter((mutation) => mutation.oldValue !== mutation.target.getAttribute(mutation.attributeName))
            // remove duplicates so we execute callback only once per node
            .filter((mutation, idx, arr) => arr.findIndex((m) => m.target === mutation.target) === idx)) {
            attributeMutationMap.get(mutation.target)?.();
        }
    });

const mediaQueries = Object.values(breakpoint).map((v) => `(min-width:${v}px)`);
hasWindow && window.matchMedia ? mediaQueries.map(window.matchMedia) : [];

Object.entries(breakpoint).reduce((result, [key, val]) => ({ ...result, [`${val}px`]: key }), {});

const hasVisibleIcon = (iconName, iconSource) => {
    return iconName !== 'none' || !!iconSource;
};

/**
 * Map of observed nodes and their corresponding callback functions.
 */
const observedNodesMap = new Map();
/**
 * Mutation observer for observing changes in the children of observed nodes.
 */
hasWindow &&
    new MutationObserver((mutations) => {
        // there may be race conditions in jsdom-polyfill tests  where the map is already empty when a mutation happens
        if (observedNodesMap.size > 0) {
            const observedNodes = Array.from(observedNodesMap.keys());
            // remove duplicates so we execute callback only once per node
            for (const mutation of mutations.filter((mutation, idx, arr) => arr.findIndex((m) => m.target === mutation.target) === idx)) {
                for (const node of observedNodes.filter((node) => node.contains(mutation.target))) {
                    observedNodesMap.get(node)?.();
                }
            }
        }
    });

const getCDNBaseURL = () => "./assets";

// index.ts
var MODEL_SIGNATURES_MANIFEST = { "718": { "src": "718.493a9e3.svg", "width": 79, "height": 26 }, "911": { "src": "911.b68f913.svg", "width": 94, "height": 25 }, "boxster": { "src": "boxster.c321738.svg", "width": 239, "height": 26 }, "cayenne": { "src": "cayenne.2556201.svg", "width": 245, "height": 35 }, "cayman": { "src": "cayman.cc89196.svg", "width": 229, "height": 35 }, "macan": { "src": "macan.a1844f4.svg", "width": 196, "height": 26 }, "panamera": { "src": "panamera.6dae809.svg", "width": 260, "height": 25 }, "taycan": { "src": "taycan.df444c6.svg", "width": 167, "height": 36 }, "turbo-s": { "src": "turbo-s.73f1e10.svg", "width": 199, "height": 25 }, "turbo": { "src": "turbo.6a4084a.svg", "width": 143, "height": 25 } };

const hasDocument = typeof document !== 'undefined';

const hasShowPickerSupport = () => (hasDocument &&
    'showPicker' in HTMLInputElement.prototype &&
    CSS.supports('selector(::-webkit-calendar-picker-indicator)'));

/**
 * Applies a style only on Chromium based browsers by using a media query which is only supported there.
 * https://browserstack.com/guide/create-browser-specific-css
 *
 * @param {JssStyle} style - The style to be applied when the Chromium media query is supported.
 * @returns {JssStyle} - The Chromium media query containing the style.
 */
const supportsChromiumMediaQuery = (style) => ({
    '@media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm)': style,
});

const isThemeAuto = (theme) => {
    return theme === 'auto';
};

const isThemeDark = (theme) => {
    return theme === 'dark';
};

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const headerSlot = 'header';
const anchorSlot = 'anchor';

const formatObjectOutput = (value) => {
    return JSON.stringify(value)
        .replace(/"([a-zA-Z?]+)":/g, '$1:') // remove double quotes from keys
        .replace(/([,:{])/g, '$1 ') // add space after following: ,:{
        .replace(/(})/g, ' $1') // add space before following: }
        .replace(/^"(.+)"$/, '$1'); // remove wrapping double quotes
};
`value, ${formatObjectOutput(breakpoints.reduce((prev, key) => ({ ...prev, [key + (key !== 'base' ? '?' : '')]: 'value' }), {})).replace(/"/g, '')}`;

const OPTION_LIST_SAFE_ZONE = 6;

const getComponentCss$1l = (size, compact, open, theme, sticky) => {
    const { primaryColor, hoverColor, contrastLowColor, backgroundColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, hoverColor: hoverColorDark, contrastLowColor: contrastLowColorDark, backgroundColor: backgroundColorDark, } = getThemedColors('dark');
    const cssVariablePositionStickyTop = '--p-accordion-position-sticky-top';
    const positionStickyTopFallback = '0';
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...(compact
                        ? { transform: 'translate3d(0,0,0)' } // relevant for custom click-area in compact variant
                        : {
                            borderBottom: `1px solid ${contrastLowColor}`,
                            ...prefersColorSchemeDarkMediaQuery(theme, {
                                borderColor: contrastLowColorDark,
                            }),
                        }),
                    '&(:only-of-type)': { borderBottom: 0 },
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            button: {
                display: 'flex',
                position: 'relative',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                textDecoration: 'none',
                border: 0,
                margin: 0, // Removes default button margin on safari 15
                gap: '24px',
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'start',
                color: primaryColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: primaryColorDark,
                }),
                ...textSmallStyle,
                fontWeight: fontWeightSemiBold,
                ...buildResponsiveStyles(size, (s) => ({
                    fontSize: s === 'medium' ? fontSizeTextMedium : fontSizeTextSmall,
                    padding: `${compact ? '4px' : s === 'medium' ? '20px' : '15px'} 0`,
                })),
                // mergeDeep needed because of hoverMediaQuery in certain modes not wrapping keys and therefore overriding "&::before" key
                ...mergeDeep({
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        borderRadius: borderRadiusSmall,
                        left: '-4px',
                        right: '-4px',
                        ...(compact
                            ? {
                                top: '2px',
                                bottom: '2px',
                            }
                            : {
                                top: '6px',
                                bottom: '6px',
                            }),
                    },
                }, hoverMediaQuery({
                    '&::before': {
                        transition: getTransition('background-color'),
                    },
                    '&:hover::before': {
                        background: hoverColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            background: hoverColorDark,
                        }),
                    },
                })),
                ...getFocusJssStyle(theme, { pseudo: true, offset: '-2px' }),
            },
        },
        heading: {
            margin: 0,
            ...(sticky && {
                position: 'sticky',
                top: `var(${cssVariablePositionStickyTop}, ${positionStickyTopFallback})`,
                zIndex: 1, // to be on top of the collapsible
                backgroundColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    backgroundColor: backgroundColorDark,
                }),
            }),
        },
        'icon-container': {
            height: fontLineHeight,
            width: fontLineHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        icon: {
            width: fontLineHeight,
            height: fontLineHeight,
            fontSize: fontSizeTextXXSmall,
            transform: open ? 'rotate3d(0)' : 'rotate3d(0,0,1,90deg)',
            transition: getTransition('transform'),
        },
        collapsible: {
            color: primaryColor, // enables color inheritance for slotted content
            ...prefersColorSchemeDarkMediaQuery(theme, {
                color: primaryColorDark,
            }),
            display: 'grid',
            ...(sticky && {
                position: 'relative',
                zIndex: 0, // to be below the heading
            }),
            ...(open
                ? {
                    gridTemplateRows: '1fr',
                    visibility: 'inherit',
                    transition: getTransition('grid-template-rows'),
                    paddingBottom: compact ? spacingStaticSmall : '24px',
                }
                : {
                    gridTemplateRows: '0fr',
                    visibility: 'hidden',
                    transition: `${getTransition('grid-template-rows')}, visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationShort})`,
                }),
            '& div': {
                overflow: open ? 'visible' : 'hidden',
                // Fix overflow issues for overlapping content (e.g. select dropdown)
                animation: open ? `$overflow var(${cssVariableTransitionDuration},${motionDurationShort})` : 'none',
                // Necessary to make focus outlines fully visible
                padding: '4px',
                margin: '-4px',
                // Fix scrollbar issues when slotted content includes .sr-only styles (see issue #3042)
                transform: 'translate3d(0,0,0)',
                zIndex: 1,
            },
        },
        '@keyframes overflow': {
            from: { overflow: 'hidden' },
            to: { overflow: 'hidden' },
        },
    });
};

const TOAST_Z_INDEX = 999999;
const BANNER_Z_INDEX = 99;

const getBannerPopoverResetStyles = () => {
    return {
        position: 'fixed',
        margin: 0,
        padding: 0,
        inset: 'auto', // ua popover reset
        width: 'auto', // ua popover reset
        height: 'auto', // ua popover reset
        maxWidth: '100%', // If component is wrapped in container with maxWidth
        border: '0', // ua popover reset
        outline: '0', // ua popover reset
        overflow: 'visible', // ua popover reset
    };
};

/**
 * @css-variable {"name": "--p-banner-position-top", "description": "Position top of banner", "defaultValue": "56px"}
 * @css-variable {"name": "--p-banner-position-bottom", "description": "Position bottom of banner. Only has an effect below breakpoint 's'.", "defaultValue": "56px"}
 */
const cssVariableTop = '--p-banner-position-top';
const cssVariableBottom = '--p-banner-position-bottom';
const cssVariableZIndex = '--p-internal-banner-z-index';
const topBottomFallback = '56px';
const getComponentCss$1k = (isOpen) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...getBannerPopoverResetStyles(),
                    bottom: `var(${cssVariableBottom},${topBottomFallback})`,
                    left: gridExtendedOffsetBase,
                    right: gridExtendedOffsetBase,
                    zIndex: `var(${cssVariableZIndex},${BANNER_Z_INDEX})`,
                    ...dropShadowHighStyle,
                    borderRadius: borderRadiusSmall, // needed for rounded box-shadow
                    '&::backdrop': {
                        display: 'none',
                    },
                    ...(isOpen
                        ? {
                            opacity: 1,
                            visibility: 'inherit',
                            pointerEvents: 'inherit',
                            transform: 'translate3d(0,0,0)',
                            transition: `${getTransition('transform', 'moderate', 'in')}, ${getTransition('opacity', 'moderate', 'in')}`,
                        }
                        : {
                            opacity: 0,
                            visibility: 'hidden',
                            pointerEvents: 'none',
                            transform: `translate3d(0,calc(var(${cssVariableBottom},${topBottomFallback}) + 100%),0)`,
                            '&(.hydrated),&(.ssr)': {
                                transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationLong}), ${getTransition('transform', 'moderate', 'out')}, ${getTransition('opacity', 'moderate', 'out')}`,
                                // during transition the element will be removed from top-layer immediately, resulting in other elements laying over (as of Mai 2024 only Chrome is fixed by this)
                                '@supports (transition-behavior: allow-discrete)': {
                                    transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationLong}), ${getTransition('transform', 'moderate', 'out')}, ${getTransition('opacity', 'moderate', 'out')}, overlay var(${cssVariableTransitionDuration}, ${motionDurationModerate}) ${motionEasingOut} allow-discrete`,
                                },
                            },
                        }),
                    [getMediaQueryMin('s')]: {
                        top: `var(${cssVariableTop},${topBottomFallback})`,
                        bottom: 'auto',
                        left: gridExtendedOffsetS,
                        right: gridExtendedOffsetS,
                        // space before and after "-" is crucial)
                        ...(!isOpen && { transform: `translate3d(0,calc(-100% - var(${cssVariableTop},${topBottomFallback})),0)` }),
                    },
                    [getMediaQueryMin('xxl')]: {
                        left: gridExtendedOffsetXXL,
                        right: gridExtendedOffsetXXL,
                    },
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
        },
    });
};

const groupDirectionJssStyles = {
    column: {
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    row: {
        flexFlow: 'row wrap',
        alignItems: 'center',
    },
};
const getGroupDirectionJssStyles = (direction) => {
    return groupDirectionJssStyles[direction];
};

const getComponentCss$1j = (direction) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            div: {
                display: 'flex',
                gap: spacingFluidSmall,
                ...buildResponsiveStyles(direction, getGroupDirectionJssStyles),
            },
        },
    });
};

const fontSizeTextMap = {
    'xx-small': fontSizeTextXXSmall,
    'x-small': fontSizeTextXSmall,
    small: fontSizeTextSmall,
    medium: fontSizeTextMedium,
    large: fontSizeTextLarge,
    'x-large': fontSizeTextXLarge,
    inherit: 'inherit',
};
const getFontSizeText = (size) => {
    return fontSizeTextMap[size];
};

// Needed for slotted anchor and hidden label, which then enlarges the hidden label to equal host size and indents the text to be visually hidden.
const getVisibilityJssStyle = (hideLabel) => {
    return hideLabel
        ? {
            whiteSpace: 'nowrap',
            textIndent: '-999999px', // Needed because standard sr-only classes don't work here due that we need a bounding box for the focus style
            overflow: 'hidden',
        }
        : {
            whiteSpace: 'inherit',
            textIndent: 0,
            overflow: 'visible',
        };
};
const offsetVertical = '-2px';
const offsetHorizontal = '-4px';
const getLinkButtonPureStyles = (icon, iconSource, active, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, underline, hasSlottedAnchor, theme) => {
    const { primaryColor, disabledColor, hoverColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, disabledColor: disabledColorDark, hoverColor: hoverColorDark, } = getThemedColors('dark');
    const hasIcon = hasVisibleIcon(icon, iconSource);
    return {
        '@global': {
            ':host': {
                ...addImportantToEachRule({
                    transform: 'translate3d(0,0,0)', // creates new stacking context
                    outline: 0, // custom element is able to delegate the focus
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
                ...buildResponsiveStyles(stretch, (responsiveStretch) => ({
                    display: responsiveStretch ? 'block' : 'inline-block',
                    width: responsiveStretch ? '100%' : 'auto', // prevents adjusting its size when used as flex or grid child
                    ...(!responsiveStretch && { verticalAlign: 'top' }),
                })),
            },
            ...preventFoucOfNestedElementsStyles,
        },
        root: {
            display: 'flex',
            width: '100%',
            padding: 0,
            margin: 0, // Removes default button margin on safari 15
            color: isDisabledOrLoading ? disabledColor : primaryColor,
            textDecoration: underline ? 'underline' : 'none',
            ...prefersColorSchemeDarkMediaQuery(theme, {
                color: isDisabledOrLoading ? disabledColorDark : primaryColorDark,
            }),
            ...textSmallStyle,
            ...mergeDeep(buildResponsiveStyles(hideLabel, (hidelabelValue) => ({
                gap: hidelabelValue ? 0 : spacingStaticXSmall,
            })), buildResponsiveStyles(stretch, (stretchValue) => ({
                justifyContent: stretchValue ? 'space-between' : 'flex-start',
                alignItems: stretchValue ? 'center' : 'flex-start',
            })), buildResponsiveStyles(size, (sizeValue) => ({
                fontSize: getFontSizeText(sizeValue),
            }))),
            '&::before': {
                content: '""',
                position: 'absolute', // mobile Safari -> prevent lagging active state
                top: offsetVertical,
                bottom: offsetVertical,
                ...buildResponsiveStyles(hideLabel, (hideLabelValue) => ({
                    right: hideLabelValue ? offsetVertical : offsetHorizontal,
                    left: hideLabelValue ? offsetVertical : offsetHorizontal,
                })),
                borderRadius: borderRadiusSmall,
                transition: getTransition('background-color'),
                ...(active && {
                    ...frostedGlassStyle,
                    backgroundColor: hoverColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        backgroundColor: hoverColorDark,
                    }),
                }),
            },
            ...(!isDisabledOrLoading &&
                hoverMediaQuery({
                    '&:hover::before': {
                        ...frostedGlassStyle,
                        backgroundColor: hoverColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            backgroundColor: hoverColorDark,
                        }),
                    },
                })),
            ...(!hasSlottedAnchor && getFocusJssStyle(theme, { pseudo: true, offset: '-2px' })),
        },
        ...(hasIcon
            ? {
                icon: {
                    position: 'relative',
                    flexShrink: '0',
                    width: fontLineHeight,
                    height: fontLineHeight,
                    // workaround for Safari to optimize vertical alignment of icons
                    // TODO: check if this is still needed after optimized icons are included
                    '@supports (width: round(down, 1px, 1px))': {
                        width: `round(down, ${fontLineHeight}, 1px)`,
                        height: `round(down, ${fontLineHeight}, 1px)`,
                    },
                },
                label: mergeDeep({ zIndex: '1' }, // fix Firefox bug on :hover (#2583) & pure-link with nested anchor & hidden label (#3349)
                buildResponsiveStyles(hideLabel, getVisibilityJssStyle), buildResponsiveStyles(alignLabel, (alignLabelValue) => ({
                    // TODO: we should remove 'left' here and map the value in the component class already to 'start' but might be difficult due to breakpoint customizable prop value
                    order: alignLabelValue === 'left' || alignLabelValue === 'start' ? -1 : 0,
                }))),
            }
            : {
                label: {
                    position: 'relative', // needed for hover state when icon="none" is set
                },
            }),
    };
};

const getFunctionalComponentLoadingMessageStyles = () => {
    return {
        loading: getHiddenTextJssStyle(),
    };
};

const getComponentCss$1i = (icon, iconSource, active, isLoading, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, underline, theme) => {
    const hasIcon = hasVisibleIcon(icon, iconSource);
    return getCss(mergeDeep(getLinkButtonPureStyles(icon, iconSource, active, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, underline, false, theme), {
        root: {
            WebkitAppearance: 'none', // iOS safari
            appearance: 'none',
            background: 'transparent',
            textAlign: 'start',
            border: 0,
            cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
        },
        ...(!hasIcon &&
            isLoading && {
            label: {
                opacity: 0, // use opacity for smooth transition between states and to keep accessible name available
            },
            icon: {
                position: 'absolute',
                top: 0,
                left: `calc(50% - ${fontLineHeight} / 2)`,
                width: fontLineHeight,
                height: fontLineHeight,
            },
        }),
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
    }));
};

const fontWeightMap = {
    regular: fontWeightRegular,
    'semi-bold': fontWeightSemiBold,
    bold: fontWeightBold,
};
const getFontWeight = (weight) => {
    return fontWeightMap[weight];
};

const getComponentCss$1h = (isDisabledOrLoading, aspectRatio, size, weight, background, align, compact, hasGradient, isDisabled) => {
    const isTopAligned = align === 'top';
    return getCss({
        '@global': {
            ':host': {
                display: 'block', // `display: flex` would be more ideal, but doesn't work in Safari in all cases
                hyphens: 'auto', // TODO: shouldn't we expose a CSS variable instead?
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            slot: {
                display: 'block',
                '&:not([name])': {
                    width: '100%',
                    height: '100%',
                    transition: getTransition('transform', 'moderate'),
                },
                '&[name="header"]': {
                    gridArea: `${isTopAligned ? 4 : 2}/2`,
                    zIndex: 3,
                },
            },
            '::slotted(:is(img,picture,video))': addImportantToEachRule({
                display: 'block',
                width: '100%',
                height: '100%',
            }),
            '::slotted(:is(img,video))': addImportantToEachRule({
                objectFit: 'cover',
            }),
            a: {
                gridArea: '1/1/-1 /-1',
                zIndex: 4,
                outline: 0, // reset focus style since this element is used to improve mouse interaction only
            },
            p: {
                ...textMediumStyle,
                zIndex: 3,
                margin: 0, // reset ua-style
                maxWidth: '34.375rem',
                hyphens: 'inherit',
                ...mergeDeep(buildResponsiveStyles(size, (sizeValue) => ({
                    fontSize: getFontSizeText(sizeValue === 'default' ? 'medium' : sizeValue), // mapping of the deprecated size 'default'
                })), buildResponsiveStyles(weight, (weightValue) => ({
                    fontWeight: getFontWeight(weightValue),
                })), buildResponsiveStyles(background, (backgroundValue) => ({
                    color: getThemedColors(backgroundValue).primaryColor,
                }))),
            },
        },
        root: {
            ...buildResponsiveStyles(aspectRatio, (aspectRatioValue) => ({
                aspectRatio: aspectRatioValue.replace(':', '/'), // mapping of the deprecated aspect-ratio with ':'
            })),
            cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
            width: '100%', // necessary in case tile content overflows in grid or flex context
            height: '100%', // necessary in case tile content overflows in grid or flex context
            display: 'grid',
            gridTemplate: `${spacingFluidMedium} auto minmax(0px, 1fr) auto ${spacingFluidMedium}/${spacingFluidMedium} minmax(0px, 1fr) ${spacingFluidMedium}`,
            ...(hasGradient &&
                isThemeDark(background) && {
                '&::after': {
                    content: '""',
                    zIndex: 2,
                    ...(isTopAligned
                        ? {
                            gridArea: '1/1/3/-1',
                            ...gradientToBottomStyle,
                            marginBottom: `calc(${spacingFluidLarge} * -1)`, // to increase the gradient area without reserving additional layout space
                            borderStartStartRadius: borderRadiusLarge,
                            borderStartEndRadius: borderRadiusLarge,
                        }
                        : {
                            gridArea: '4/1/6/-1',
                            ...gradientToTopStyle,
                            marginTop: `calc(${spacingFluidLarge} * -1)`, // to increase the gradient area without reserving additional layout space
                            borderEndStartRadius: borderRadiusLarge,
                            borderEndEndRadius: borderRadiusLarge,
                        }),
                    ...forcedColorsMediaQuery({
                        background: 'rgba(0,0,0,0.7)',
                    }),
                },
            }),
            ...(!isDisabled &&
                hoverMediaQuery({
                    '&:hover slot:not([name])': {
                        transform: 'scale3d(1.05,1.05,1.05)',
                    },
                })),
        },
        media: {
            position: 'relative', // necessary if custom `position: absolute` style is added to media elements
            gridArea: '1/1/-1 /-1',
            zIndex: 1,
            overflow: 'hidden', // relevant for scaling of nested image
            borderRadius: borderRadiusLarge,
        },
        footer: {
            gridArea: `${isTopAligned ? 2 : 4}/2`,
            display: 'flex',
            gap: spacingStaticMedium,
            justifyContent: 'space-between',
            ...buildResponsiveStyles(compact, (compactValue) => compactValue
                ? {
                    alignItems: 'center',
                    flexDirection: 'row',
                }
                : {
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                }),
        },
        'link-or-button-pure': {
            zIndex: 5,
            ...buildResponsiveStyles(compact, (compactValue) => ({
                display: compactValue ? 'inline-block' : 'none',
            })),
        },
        'link-or-button': {
            minHeight: '54px', // prevent content shift
            zIndex: 5,
            ...buildResponsiveStyles(compact, (compactValue) => ({
                display: compactValue ? 'none' : 'inline-block',
            })),
        },
    });
};

const { primaryColor: darkThemePrimaryColor } = getThemedColors('dark');
const { primaryColor: lightThemePrimaryColor } = getThemedColors('light');
const getVariantColors = (variant, theme) => {
    const { primaryColor, contrastHighColor, contrastMediumColor, hoverColor, backgroundFrostedColor } = getThemedColors(theme);
    const { canvasColor } = getHighContrastColors();
    const colors = {
        primary: {
            textColor: theme === 'dark' ? lightThemePrimaryColor : darkThemePrimaryColor,
            borderColor: primaryColor,
            borderColorHover: contrastHighColor,
            backgroundColor: primaryColor,
            backgroundColorHover: contrastHighColor,
        },
        secondary: {
            textColor: primaryColor,
            borderColor: primaryColor,
            borderColorHover: contrastMediumColor,
            backgroundColor: isHighContrastMode ? canvasColor : 'transparent',
            backgroundColorHover: hoverColor,
        },
        ghost: {
            textColor: primaryColor,
            borderColor: backgroundFrostedColor,
            borderColorHover: theme === 'dark' ? lighten(backgroundFrostedColor) : darken(backgroundFrostedColor),
            backgroundColor: backgroundFrostedColor,
            backgroundColorHover: theme === 'dark' ? lighten(backgroundFrostedColor) : darken(backgroundFrostedColor),
        },
    };
    return colors[variant === 'tertiary' ? 'secondary' : variant];
};
const getLinkButtonStyles = (icon, iconSource, variant, hideLabel, isDisabledOrLoading, hasSlottedAnchor, compact, cssVariableInternalScaling, theme) => {
    const isPrimary = variant === 'primary';
    const { textColor, borderColor, borderColorHover, backgroundColor, backgroundColorHover } = getVariantColors(variant, theme);
    const { textColor: textColorDark, borderColor: borderColorDark, borderColorHover: borderColorHoverDark, backgroundColor: backgroundColorDark, backgroundColorHover: backgroundColorHoverDark, } = getVariantColors(variant, 'dark');
    const { focusColor } = getThemedColors(theme);
    const hasIcon = hasVisibleIcon(icon, iconSource) || hideLabel;
    const scalingVar = `var(${cssVariableInternalScaling}, var(--p-internal-scaling-factor))`;
    const borderCompensation = variant === 'ghost' ? `+ ${borderWidthBase}` : ''; // Compensate for missing border in ghost variant (Fixes border backdrop-filter blur rendering issue in safari)
    const paddingBlock = `calc(${scalingVar} * 0.8125 * ${SCALING_BASE_VALUE} ${borderCompensation})`; // 0.8125 * SCALING_BASE_VALUE corresponds to 13px
    const paddingInline = `max(calc(${scalingVar} * 1.625 * ${SCALING_BASE_VALUE} ${borderCompensation}), ${variant === 'ghost' ? '6px' : '4px'})`; // 1.625 * SCALING_BASE_VALUE corresponds to 26px
    const gap = `clamp(2px, calc(${scalingVar} * 0.5 * ${SCALING_BASE_VALUE}), 16px)`; // 0.5 * SCALING_BASE_VALUE corresponds to 8px
    const iconMarginInlineStart = `clamp(-16px, calc(${scalingVar} * -0.5 * ${SCALING_BASE_VALUE}), -2px)`; // -0.5 * SCALING_BASE_VALUE corresponds to -8px
    return {
        '@global': {
            ':host': {
                display: 'inline-block',
                ...addImportantToEachRule({
                    verticalAlign: 'top',
                    outline: 0, // custom element is able to delegate the focus
                    borderRadius: borderRadiusSmall,
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
        },
        root: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '100%', // Allows for setting a width on the host
            minWidth: 'min-content', // Do not shrink beyond icon size + padding + border + label
            boxSizing: 'border-box',
            textAlign: 'start',
            WebkitAppearance: 'none', // iOS safari
            appearance: 'none',
            textDecoration: 'none',
            ...textSmallStyle,
            ...(variant === 'ghost'
                ? { ...frostedGlassStyle, border: 'none' } // We can't use a border in the ghost variant due to rendering issues with backdrop-filter in safari
                : { border: `${borderWidthBase} solid ${borderColor}` }),
            borderRadius: borderRadiusSmall,
            transform: 'translate3d(0,0,0)', // creates new stacking context (for slotted anchor + focus)
            backgroundColor,
            color: textColor,
            ...buildResponsiveStyles(compact, (compactValue) => ({
                '--p-internal-scaling-factor': compactValue ? 'calc(4 / 13)' : 1, // Compact mode needs to have 4px paddingBlock thus this scaling factor
            })),
            transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
            ...buildResponsiveStyles(hideLabel, (hideLabelValue) => ({
                padding: hideLabelValue ? paddingBlock : `${paddingBlock} ${paddingInline}`,
                gap: hideLabelValue ? 0 : gap,
            })),
            ...(!hasSlottedAnchor && getFocusJssStyle(theme)),
            ...(!isDisabledOrLoading &&
                hoverMediaQuery({
                    '&:hover': {
                        backgroundColor: backgroundColorHover,
                        borderColor: isHighContrastMode ? focusColor : borderColorHover,
                        ...(!isPrimary && frostedGlassStyle),
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            backgroundColor: backgroundColorHoverDark,
                            borderColor: borderColorHoverDark,
                        }),
                    },
                })),
            ...prefersColorSchemeDarkMediaQuery(theme, {
                borderColor: borderColorDark,
                backgroundColor: backgroundColorDark,
                color: textColorDark,
            }),
        },
        label: buildResponsiveStyles(hideLabel, getHiddenTextJssStyle),
        ...(hasIcon && {
            icon: {
                width: fontLineHeight, // ensure space is already reserved until icon component is loaded (ssr)
                height: fontLineHeight, // ensure space is already reserved until icon component is loaded (ssr)
                ...buildResponsiveStyles(hideLabel, (hideLabelValue) => ({
                    marginInlineStart: hideLabelValue ? 0 : iconMarginInlineStart, // compensate white space of svg icon and optimize visual alignment
                })),
            },
        }),
    };
};

const cssVariableInternalButtonScaling = '--p-internal-button-scaling';
const getDisabledColors = (variant, loading, theme) => {
    const { contrastMediumColor, contrastHighColor, disabledColor, hoverColor, backgroundFrostedColor } = getThemedColors(theme);
    const { canvasColor } = getHighContrastColors();
    const colors = {
        primary: {
            textColor: isHighContrastMode ? disabledColor : contrastHighColor,
            borderColor: isHighContrastMode ? disabledColor : loading ? contrastHighColor : disabledColor,
            backgroundColor: isHighContrastMode ? canvasColor : loading ? contrastHighColor : disabledColor,
        },
        secondary: {
            textColor: disabledColor,
            borderColor: isHighContrastMode ? disabledColor : loading ? contrastMediumColor : disabledColor,
            backgroundColor: isHighContrastMode ? canvasColor : loading ? hoverColor : 'transparent',
        },
        ghost: {
            textColor: disabledColor,
            borderColor: isHighContrastMode ? disabledColor : loading ? backgroundFrostedColor : backgroundFrostedColor,
            backgroundColor: isHighContrastMode ? canvasColor : loading ? backgroundFrostedColor : backgroundFrostedColor,
        },
    };
    return colors[variant === 'tertiary' ? 'secondary' : variant];
};
const getComponentCss$1g = (icon, iconSource, variant, hideLabel, disabled, loading, compact, theme) => {
    const disabledOrLoading = isDisabledOrLoading(disabled, loading);
    const { textColor, borderColor, backgroundColor } = getDisabledColors(variant, loading, theme);
    const { textColor: textColorDark, borderColor: borderColorDark, backgroundColor: backgroundColorDark, } = getDisabledColors(variant, loading, 'dark');
    const isPrimary = variant === 'primary';
    return getCss(mergeDeep(getLinkButtonStyles(icon, iconSource, variant, hideLabel, disabledOrLoading, false, compact, cssVariableInternalButtonScaling, theme), {
        root: {
            cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
            ...(disabledOrLoading && {
                backgroundColor,
                borderColor,
                color: textColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    backgroundColor: backgroundColorDark,
                    borderColor: borderColorDark,
                    color: textColorDark,
                }),
            }),
            ...(loading && !isPrimary && frostedGlassStyle),
            margin: 0, // Removes default button margin on safari 15
        },
        ...(loading && {
            spinner: {
                width: fontLineHeight,
                height: fontLineHeight,
                pointerEvents: 'none',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                ...(isPrimary && !isHighContrastMode && { filter: 'invert(1)' }),
            },
        }),
        label: {
            transition: getTransition('opacity'),
            ...(loading && {
                opacity: 0, // use opacity for smooth transition between states
            }),
        },
        icon: {
            transition: getTransition('opacity'),
            ...(!disabled &&
                isPrimary &&
                !isHighContrastMode && {
                filter: 'invert(1)',
            }),
            ...(loading && {
                opacity: 0, // use opacity for smooth transition between states
            }),
        },
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
    }));
};

// public css classes
const cssClassGrid = '-p-canvas-grid';
// public css variables
const cssVarSidebarStartWidth = '--p-canvas-sidebar-start-width';
const cssVarSidebarEndWidth = '--p-canvas-sidebar-end-width';
// default values for public css variables
const sidebarStartWidth = `var(${cssVarSidebarStartWidth},320px)`;
const sidebarEndWidth = `var(${cssVarSidebarEndWidth},320px)`;
// private css variables
const cssVarColorPrimary$1 = '--_a';
const cssVarColorBackgroundBase$1 = '--_b';
const cssVarColorBackgroundSurface$1 = '--_c';
const cssVarColorContrastLow = '--_d';
const cssVarColorFooterGradient = '--_e';
const cssVarTemplateSidebarStartWidth = '--_f';
const cssVarTemplateSidebarEndWidth = '--_g';
// media queries
const mediaQueryS$1 = getMediaQueryMin('s');
const mediaQueryM = getMediaQueryMin('m');
// others
const spacingBase = gridGap.replace('36px', '24px');
const getComponentCss$1f = (theme, isSidebarStartOpen, isSidebarEndOpen) => {
    const { primaryColor, backgroundColor, backgroundSurfaceColor, contrastLowColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark, backgroundSurfaceColor: backgroundSurfaceColorDark, contrastLowColor: contrastLowColorDark, } = getThemedColors('dark');
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            slot: {
                '&:not([name]),&[name="footer"]': {
                    [`&::slotted(.${cssClassGrid})`]: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
                        columnGap: spacingBase,
                        marginInline: 'auto',
                        containerType: 'inline-size',
                    },
                },
                '&[name="title"]::slotted': {
                    '&(a)': {
                        textDecoration: 'none',
                        color: 'inherit',
                        borderRadius: borderRadiusSmall,
                    },
                    ...getFocusJssStyle(theme, { slotted: 'a' }),
                },
                '&[name="sidebar-end-header"]': {
                    display: 'block', // ensures header section of sidebar-end area is aligned correctly
                },
                '&[name="background"]': {
                    zIndex: 3,
                    display: 'block',
                    gridArea: '1/1/-1/-1',
                    position: 'sticky',
                    top: 0,
                    height: '100dvh',
                    pointerEvents: 'none',
                    overflow: 'hidden',
                    transform: 'translate3d(0,0,0)', // needed for Safari to force GPU acceleration
                    [mediaQueryS$1]: {
                        gridColumn: '2/3',
                    },
                    '&::slotted(video),&::slotted(img)': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: getTransition('opacity', 'veryLong'),
                        pointerEvents: 'none',
                    },
                },
            },
            h2: {
                font: textXSmallStyle.font,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                margin: 0,
                padding: '4px', // preserve enough spacing for focus state
                textTransform: 'uppercase',
                letterSpacing: '2px',
            },
        },
        root: {
            [cssVarColorPrimary$1]: primaryColor,
            [cssVarColorBackgroundBase$1]: backgroundColor,
            [cssVarColorBackgroundSurface$1]: backgroundSurfaceColor,
            [cssVarColorContrastLow]: contrastLowColor,
            [cssVarColorFooterGradient]: `0,0%,${isThemeDark(theme) ? '0%' : '100%'}`,
            [cssVarTemplateSidebarStartWidth]: isSidebarStartOpen ? sidebarStartWidth : '0px',
            [cssVarTemplateSidebarEndWidth]: isSidebarEndOpen ? sidebarEndWidth : '0px',
            display: 'grid',
            gridTemplateRows: 'auto minmax(0,1fr) auto',
            gridTemplateAreas: '"header" "main" "footer"',
            minWidth: '320px',
            minHeight: '100dvh',
            font: textSmallStyle.font,
            color: `var(${cssVarColorPrimary$1})`,
            background: `var(${cssVarColorBackgroundBase$1})`,
            transition: getTransition('grid-template-columns'),
            ...prefersColorSchemeDarkMediaQuery(theme, {
                [cssVarColorPrimary$1]: primaryColorDark,
                [cssVarColorBackgroundBase$1]: backgroundColorDark,
                [cssVarColorBackgroundSurface$1]: backgroundSurfaceColorDark,
                [cssVarColorContrastLow]: contrastLowColorDark,
                [cssVarColorFooterGradient]: '0,0%,0%',
            }),
            [mediaQueryS$1]: {
                gridTemplateColumns: `var(${cssVarTemplateSidebarStartWidth}) minmax(0,1fr)`,
                gridTemplateAreas: '"sidebar-start header" "sidebar-start main" "sidebar-start footer"',
            },
            [mediaQueryM]: {
                gridTemplateColumns: `var(${cssVarTemplateSidebarStartWidth}) minmax(0,1fr) var(${cssVarTemplateSidebarEndWidth})`,
                gridTemplateAreas: '"sidebar-start header sidebar-end" "sidebar-start main sidebar-end" "sidebar-start footer sidebar-end"',
            },
            '&::after': {
                [mediaQueryM]: {
                    content: '""',
                    zIndex: 2,
                    gridArea: '1/2/-1/3',
                    boxShadow: `1px 0 0 0 var(${cssVarColorContrastLow})`,
                    background: `var(${cssVarColorBackgroundBase$1})`,
                    pointerEvents: 'none',
                },
            },
        },
        header: {
            zIndex: 6,
            gridArea: 'header',
            containerType: 'inline-size',
            position: 'sticky',
            top: 0,
            minHeight: '56px',
            boxSizing: 'border-box',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)',
            gap: spacingBase,
            alignItems: 'center',
            paddingBlock: spacingStaticSmall,
            paddingInline: spacingBase,
            '&__area': {
                display: 'flex',
                gap: spacingStaticSmall,
                alignItems: 'center',
                '&--start': {
                    justifyContent: 'flex-start',
                },
                '&--end': {
                    justifyContent: 'flex-end',
                },
            },
            '&__crest': {
                [`@container(min-width:${breakpointS}px)`]: {
                    display: 'none',
                },
            },
            '&__wordmark': {
                height: '10px',
                [`@container(max-width:${breakpointS - 1}px)`]: {
                    display: 'none',
                },
            },
            '&:focus': {
                outline: 'none',
            },
        },
        blur: {
            zIndex: -1,
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            '& > div': {
                position: 'absolute',
                inset: 0,
            },
            '& > div:nth-of-type(1)': {
                zIndex: 1,
                WebkitBackdropFilter: 'blur(64px)',
                backdropFilter: 'blur(64px)',
                WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,100%) 0%,rgba(0,0,0,1) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,0) 37.5%)',
                maskImage: 'linear-gradient(to bottom,rgba(0,0,0,100%) 0%,rgba(0,0,0,1) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,0) 37.5%)',
            },
            '& > div:nth-of-type(2)': {
                zIndex: 2,
                WebkitBackdropFilter: 'blur(32px)',
                backdropFilter: 'blur(32px)',
                WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,0) 50%)',
                maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 12.5%,rgba(0,0,0,1) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,0) 50%)',
            },
            '& > div:nth-of-type(3)': {
                zIndex: 3,
                WebkitBackdropFilter: 'blur(16px)',
                backdropFilter: 'blur(16px)',
                WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,0) 62.5%)',
                maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 25%,rgba(0,0,0,1) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,0) 62.5%)',
            },
            '& > div:nth-of-type(4)': {
                zIndex: 4,
                WebkitBackdropFilter: 'blur(8px)',
                backdropFilter: 'blur(8px)',
                WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,0) 75%)',
                maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 37.5%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,0) 75%)',
            },
            '& > div:nth-of-type(5)': {
                zIndex: 5,
                WebkitBackdropFilter: 'blur(4px)',
                backdropFilter: 'blur(4px)',
                WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,0) 87.5%)',
                maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 50%,rgba(0,0,0,1) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,0) 87.5%)',
            },
            '& > div:nth-of-type(6)': {
                zIndex: 6,
                WebkitBackdropFilter: 'blur(2px)',
                backdropFilter: 'blur(2px)',
                WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 62.5%,rgba(0,0,0,1) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,0) 100%)',
            },
            '& > div:nth-of-type(7)': {
                zIndex: 7,
                WebkitBackdropFilter: 'blur(1px)',
                backdropFilter: 'blur(1px)',
                WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,1) 100%)',
                maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 75%,rgba(0,0,0,1) 87.5%,rgba(0,0,0,1) 100%)',
            },
            '& > div:nth-of-type(8)': {
                zIndex: 8,
                WebkitBackdropFilter: 'blur(.5px)',
                backdropFilter: 'blur(.5px)',
                WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 87.5%,rgba(0,0,0,1) 100%)',
                maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 87.5%,rgba(0,0,0,1) 100%)',
            },
        },
        main: {
            zIndex: 4,
            gridArea: 'main',
            padding: spacingBase,
        },
        footer: {
            zIndex: 5,
            gridArea: 'footer',
            padding: `${spacingBase} ${spacingBase} ${spacingFluidSmall}`,
            position: 'sticky',
            bottom: 0,
            '&::before': {
                content: '""',
                zIndex: -1,
                position: 'absolute',
                inset: '-140px 0 0',
                pointerEvents: 'none',
                background: `linear-gradient(to bottom,hsla(var(${cssVarColorFooterGradient}),0) 0%,hsla(var(${cssVarColorFooterGradient}),0.013) 8.1%,hsla(var(${cssVarColorFooterGradient}),0.049) 15.5%,hsla(var(${cssVarColorFooterGradient}),0.104) 22.5%,hsla(var(${cssVarColorFooterGradient}),0.175) 29%,hsla(var(${cssVarColorFooterGradient}),0.259) 35.3%,hsla(var(${cssVarColorFooterGradient}),0.352) 41.2%,hsla(var(${cssVarColorFooterGradient}),0.45) 47.1%,hsla(var(${cssVarColorFooterGradient}),0.55) 52.9%,hsla(var(${cssVarColorFooterGradient}),0.648) 58.8%,hsla(var(${cssVarColorFooterGradient}),0.741) 64.7%,hsla(var(${cssVarColorFooterGradient}),0.825) 71%,hsla(var(${cssVarColorFooterGradient}),0.896) 77.5%,hsla(var(${cssVarColorFooterGradient}),0.951) 84.5%,hsla(var(${cssVarColorFooterGradient}),0.987) 91.9%,hsl(var(${cssVarColorFooterGradient})) 100%)`,
            },
        },
        sidebar: {
            position: 'sticky',
            top: 0,
            height: '100dvh',
            '&--start': {
                zIndex: 7,
                gridArea: 'sidebar-start',
                justifySelf: 'flex-end',
                width: sidebarStartWidth,
                backgroundColor: `var(${cssVarColorBackgroundSurface$1})`,
                '&::before': {
                    content: '""',
                    zIndex: -1,
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    right: '-16px',
                    height: '32px',
                    width: '16px',
                    pointerEvents: 'none',
                    top: 0,
                    borderTopLeftRadius: '16px',
                    boxShadow: `0 -16px 0 0 var(${cssVarColorBackgroundSurface$1})`,
                },
            },
            '&--end': {
                zIndex: 1,
                gridArea: 'sidebar-end',
                justifySelf: 'flex-end',
                width: sidebarEndWidth,
                backgroundColor: `var(${cssVarColorBackgroundBase$1})`,
            },
            '&__scroller': {
                position: 'absolute',
                inset: 0,
                overflow: 'hidden auto',
                overscrollBehaviorY: 'contain',
                background: 'inherit', // ensures correct scrollbar coloring in light / dark mode
            },
            '&__header': {
                zIndex: 1,
                display: 'flex',
                gap: spacingStaticSmall,
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                padding: `${spacingStaticSmall} ${spacingBase}`,
                minHeight: '56px',
                boxSizing: 'border-box',
                '&--start': {
                    justifyContent: 'flex-start',
                    '&::before': {
                        background: `linear-gradient(180deg,var(${cssVarColorBackgroundSurface$1}) 0%,var(${cssVarColorBackgroundSurface$1}) 65%,transparent 100%)`,
                    },
                },
                '&--end': {
                    justifyContent: 'space-between',
                    '&::before': {
                        background: `linear-gradient(180deg,var(${cssVarColorBackgroundBase$1}) 0%,var(${cssVarColorBackgroundBase$1}) 65%,transparent 100%)`,
                    },
                },
                '&::before': {
                    content: '""',
                    zIndex: -1,
                    position: 'absolute',
                    inset: '0 0 -8px',
                    pointerEvents: 'none',
                },
            },
            '&__content': {
                position: 'relative', // needed for z-index to work
                zIndex: 0, // ensures slotted dom nodes can't be on top of sidebar header
                display: 'block',
                padding: spacingBase,
            },
            '&:focus': {
                outline: 'none',
            },
        },
        'flyout-start': {
            '--p-flyout-width': '100dvw',
            '--p-flyout-max-width': sidebarStartWidth,
        },
        'flyout-end': {
            '--p-flyout-width': '100dvw',
            '--p-flyout-max-width': sidebarEndWidth,
        },
    });
};

/**
 * @css-variable {"name": "--p-carousel-prev-next-filter", "description": "CSS Filter applied to the navigation (prev/next buttons)", "defaultValue": "none"}
 */
const cssVariablePrevNextFilter = '--p-carousel-prev-next-filter';
const cssVariableGradientColorWidth = '--p-gradient-color-width';
const carouselTransitionDuration = motionDurationModerate;
const paginationInfiniteStartCaseClass = 'pagination--infinite';
const bulletClass = 'bullet';
const bulletActiveClass = 'bullet--active';
const bulletInfiniteClass = 'bullet--infinite';
const paginationVisibleBulletCount = 5;
const paginationBulletSize = '8px';
const paginationInfiniteBulletSize = '4px';
const paginationActiveBulletSize = '20px';
const paginationGap = '8px';
const paginationWidth = `calc(${paginationActiveBulletSize} + ${paginationBulletSize} * ${paginationVisibleBulletCount - 1} + ${paginationGap} * ${paginationVisibleBulletCount - 1})`; // Width for one active bullet + width of inactive bullets + spacing
const paginationInset = '8px'; // Used to increase clickable area on touch devices
const paginationGapLarge = '16px';
const paginationWidthLarge = `calc(${paginationActiveBulletSize} + ${paginationBulletSize} * ${paginationVisibleBulletCount - 1} + ${paginationGapLarge} * ${paginationVisibleBulletCount - 1} + 2 * ${paginationInset})`; // Width for one active bullet + width of inactive bullets + spacing
const selectorHeading = '.heading';
const selectorDescription = 'p,::slotted([slot="description"])';
const mediaQueryS = getMediaQueryMin('s');
const mediaQueryXXL = getMediaQueryMin('xxl');
const mediaQueryPointerCoarse = '@media (pointer: coarse)';
const spacingMap = {
    basic: gridBasicOffset,
    extended: gridExtendedOffset,
};
const backfaceVisibilityJssStyle = {
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
};
const gradientColorLight = {
    'background-base': '255,255,255',
    'background-surface': '238,239,242',
    none: '',
};
const gradientColorDark = {
    'background-base': '14,14,18',
    'background-surface': '33,34,37',
    none: '',
};
const gradientColorMap = {
    auto: gradientColorLight,
    light: gradientColorLight,
    dark: gradientColorDark,
};
const getGradient = (theme, gradientColorTheme) => {
    const gradientColor = gradientColorMap[theme][gradientColorTheme];
    return (`rgba(${gradientColor},1) 20%,` +
        `rgba(${gradientColor},0.6) 48%,` +
        `rgba(${gradientColor},0.3) 68%,` +
        `rgba(${gradientColor},0)`);
};
const getComponentCss$1e = (gradientColor, hasHeading, hasDescription, hasControlsSlot, headingSize, width, hasPagination, isInfinitePagination, alignHeader, theme, hasNavigation, alignControls) => {
    const { primaryColor, contrastMediumColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');
    const { canvasTextColor } = getHighContrastColors();
    const isHeaderAlignCenter = alignHeader === 'center';
    const getGradientStyles = (direction) => gradientColor
        ? {
            [direction === 'left' ? 'right' : 'left']: 0,
            background: `linear-gradient(to ${direction}, ${getGradient(theme, gradientColor)} 100%)`,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                background: `linear-gradient(to ${direction}, ${getGradient('dark', gradientColor)} 100%)`,
            }),
        }
        : {};
    return getCss({
        '@global': {
            ':host': {
                display: 'flex',
                ...addImportantToEachRule({
                    gap: spacingFluidMedium, // TODO: maybe it's better to style by margin on .splide, then styles would be part of shadow dom
                    flexDirection: 'column',
                    boxSizing: 'content-box', // ensures padding is added to host instead of subtracted
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            ...(hasControlsSlot && {
                'slot[name="controls"]': {
                    display: 'block',
                    gridColumn: '1/-1',
                    gridRowStart: 3,
                    alignSelf: 'center', // ensures vertical alignment to prev/next buttons
                    justifySelf: alignControls !== 'auto' ? alignControls : isHeaderAlignCenter ? 'center' : 'start',
                    [mediaQueryS]: {
                        gridColumn: alignControls !== 'center' && hasNavigation ? '1/2' : '1/-1',
                        justifySelf: alignControls !== 'auto' ? alignControls : isHeaderAlignCenter && !hasNavigation ? 'center' : 'start',
                    },
                },
            }),
            ...addImportantToEachRule({
                '::slotted': {
                    '&(*)': {
                        borderRadius: `var(--p-carousel-border-radius, ${borderRadiusLarge})`,
                    },
                },
                // TODO: maybe it's better to style with slot[name="heading"] and slot[name="description"] instead, then styles would be part of shadow dom
                // .heading,p,::slotted([slot=description])
                ...((hasHeading || hasDescription) && {
                    [`${selectorHeading},${selectorDescription}`]: {
                        gridColumn: '1/-1',
                        color: primaryColor,
                        ...(isHeaderAlignCenter && {
                            textAlign: 'center', // relevant in case heading or description becomes multiline
                            justifySelf: 'center', // relevant for horizontal alignment of heading and description in case max-width applies
                        }),
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            color: primaryColorDark,
                        }),
                    },
                }),
                ...(hasHeading && {
                    [selectorHeading]: {
                        maxWidth: '56.25rem',
                        margin: `0 0 ${hasDescription ? 0 : spacingFluidMedium}`,
                        ...(headingSize === 'xx-large' ? headingXXLargeStyle : headingXLargeStyle),
                    },
                    '::slotted([slot=heading])': {
                        margin: 0, // reset ua-style
                        ...(headingSize === 'xx-large' ? headingXXLargeStyle : headingXLargeStyle),
                    },
                }),
                // p,::slotted([slot=description])
                ...(hasDescription && {
                    [selectorDescription]: {
                        maxWidth: '34.375rem',
                        margin: `${spacingFluidSmall} 0 ${spacingFluidMedium}`,
                        ...textSmallStyle,
                    },
                }),
            }),
        },
        header: {
            display: 'grid',
            padding: `0 ${spacingMap[width].base}`,
            [mediaQueryS]: {
                gridTemplateColumns: 'minmax(0px, 1fr) auto',
                padding: `0 ${spacingMap[width].s}`,
                ...(hasNavigation && { columnGap: spacingStaticMedium }),
            },
            [mediaQueryXXL]: {
                padding: `0 ${spacingMap[width].xxl}`,
            },
        },
        nav: {
            display: 'none',
            [mediaQueryS]: {
                gridRowStart: '3',
                gridColumnEnd: '-1',
                display: 'flex',
                gap: spacingStaticXSmall,
                alignSelf: 'flex-start', // relevant in case slot="header" becomes higher than nav group
            },
            filter: `var(${cssVariablePrevNextFilter}, none)`,
        },
        btn: {
            padding: spacingStaticSmall,
        },
        'skip-link': {
            // :focus must be used in this case, because :focus-visible is just matched on the focusable element itself, not on the host element.
            '&:not(:focus)': {
                opacity: 0,
                pointerEvents: 'none',
            },
        },
        splide: {
            overflow: 'hidden',
            padding: '4px 0', // for slide focus outline
            margin: '-4px 0', // for slide focus outline
            '&__track': {
                position: 'relative',
                // !important is necessary to override inline styles set by splide library
                ...addImportantToEachRule({
                    padding: `0 ${spacingMap[width].base}`,
                    [mediaQueryS]: {
                        padding: `0 ${spacingMap[width].s}`,
                    },
                    [mediaQueryXXL]: {
                        padding: `0 ${spacingMap[width].xxl}`,
                    },
                }),
                '&--draggable': {
                    cursor: 'grab',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                },
                ...(gradientColor &&
                    gradientColor !== 'none' && {
                    '&::before, &::after': {
                        content: '""',
                        position: 'absolute',
                        zIndex: 1,
                        top: 0,
                        height: '100%',
                        width: `var(${cssVariableGradientColorWidth}, 33%)`,
                    },
                    '&::before': getGradientStyles('right'),
                    '&::after': getGradientStyles('left'),
                }),
            },
            '&__list': {
                ...backfaceVisibilityJssStyle,
                display: 'flex',
            },
            '&__slide': {
                ...backfaceVisibilityJssStyle,
                flexShrink: 0,
                transform: 'translateZ(0)', // fixes mobile safari flickering, https://github.com/nolimits4web/swiper/issues/3527#issuecomment-609088939
                borderRadius: `var(--p-carousel-border-radius, ${borderRadiusLarge})`,
                ...getFocusJssStyle(theme),
            },
            '&__sr': getHiddenTextJssStyle(), // appears in the DOM when sliding
            ...(isHeaderAlignCenter && {
                '&:not(.is-overflow) .splide__list': {
                    justifyContent: 'center',
                },
                '&:not(.is-overflow) .splide__slide:last-child': {
                    marginInlineEnd: addImportantToRule('0'),
                },
            }),
        },
        ...(hasPagination && {
            'pagination-container': {
                ...buildResponsiveStyles(hasPagination, (hasPaginationValue) => ({
                    display: hasPaginationValue ? 'flex' : 'none',
                })),
                position: 'relative',
                justifyContent: isInfinitePagination ? 'flex-start' : 'center',
                width: paginationWidth,
                left: `calc(50% - (${paginationWidth}) / 2)`,
                [mediaQueryPointerCoarse]: {
                    width: paginationWidthLarge,
                    left: `calc(50% - ${paginationWidthLarge} / 2)`,
                },
                overflowX: 'hidden',
            },
            pagination: {
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                height: paginationBulletSize, // Needed to avoid jumping when rewinding dynamically added slides
                gap: paginationGap,
                [mediaQueryPointerCoarse]: {
                    height: `calc(${paginationBulletSize} + 2 * ${paginationInset})`,
                    gap: paginationGapLarge,
                },
                transition: `transform ${carouselTransitionDuration}`,
            },
            [bulletClass]: {
                // Increase clickable area on touch devices
                [mediaQueryPointerCoarse]: {
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: `-${paginationInset}`,
                    },
                    position: 'relative',
                },
                borderRadius: borderRadiusSmall,
                ...(isHighContrastMode
                    ? {
                        background: canvasTextColor,
                    }
                    : {
                        background: contrastMediumColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            background: contrastMediumColorDark,
                        }),
                    }),
                ...(isInfinitePagination
                    ? {
                        width: '0px',
                        height: '0px',
                        transition: `background-color ${carouselTransitionDuration}, width ${carouselTransitionDuration}, height ${carouselTransitionDuration}`,
                    }
                    : {
                        width: paginationBulletSize,
                        height: paginationBulletSize,
                        transition: `background-color ${carouselTransitionDuration}, width ${carouselTransitionDuration}`,
                    }),
                ...hoverMediaQuery({
                    cursor: 'pointer',
                }),
            },
            ...(isInfinitePagination && {
                [paginationInfiniteStartCaseClass]: {
                    [`& > .${bulletClass}:nth-child(-n+4)`]: {
                        width: paginationBulletSize,
                        height: paginationBulletSize,
                    },
                },
                [bulletInfiniteClass]: {
                    // Necessary to override the bulletActiveClass sibling selector
                    ...addImportantToEachRule({
                        width: paginationInfiniteBulletSize,
                        height: paginationInfiniteBulletSize,
                    }),
                    [`& ~ .${bulletClass}`]: {
                        width: paginationBulletSize,
                        height: paginationBulletSize,
                    },
                    [`& ~ .${bulletInfiniteClass} ~ .${bulletClass}`]: {
                        width: '0px',
                        height: '0px',
                    },
                },
            }),
            [bulletActiveClass]: {
                ...(isHighContrastMode
                    ? {
                        background: canvasTextColor,
                    }
                    : {
                        background: primaryColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            background: primaryColorDark,
                        }),
                    }),
                height: paginationBulletSize,
                width: addImportantToRule(paginationActiveBulletSize),
                ...(isInfinitePagination && {
                    [`& ~ .${bulletClass}`]: {
                        width: paginationBulletSize,
                        height: paginationBulletSize,
                    },
                    [`& ~ .${bulletInfiniteClass} ~ .${bulletClass}`]: {
                        width: '0px',
                        height: '0px',
                    },
                }),
            },
        }),
    });
};

const getThemedFormStateColors = (theme, state) => {
    const themedColors = getThemedColors(theme);
    return {
        formStateColor: themedColors[`${state}Color`],
        formStateHoverColor: themedColors[`${state}ColorDarken`],
    };
};

// TODO: move to form-styles.ts
const getSlottedCheckboxRadioButtonStyles = (state, isDisabled, isLoading, theme) => {
    const { primaryColor, contrastMediumColor, contrastHighColor, disabledColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, contrastMediumColor: contrastMediumColorDark, contrastHighColor: contrastHighColorDark, disabledColor: disabledColorDark, } = getThemedColors('dark');
    const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
    const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors('dark', state);
    const { canvasTextColor } = getHighContrastColors();
    const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);
    // TODO: needs to be extracted into a color function
    const uncheckedColor = disabledOrLoading ? disabledColor : formStateColor || contrastMediumColor;
    const uncheckedColorDark = disabledOrLoading ? disabledColorDark : formStateColorDark || contrastMediumColorDark;
    const uncheckedHoverColor = formStateHoverColor || primaryColor;
    const uncheckedHoverColorDark = formStateHoverColorDark || primaryColorDark;
    const checkedColor = isHighContrastMode
        ? canvasTextColor
        : disabledOrLoading
            ? disabledColor
            : formStateColor || primaryColor;
    const checkedColorDark = isHighContrastMode
        ? canvasTextColor
        : disabledOrLoading
            ? disabledColorDark
            : formStateColorDark || primaryColorDark;
    const checkedHoverColor = formStateHoverColor || contrastHighColor;
    const checkedHoverColorDark = formStateHoverColorDark || contrastHighColorDark;
    return {
        '::slotted': {
            '&(input)': {
                width: fontLineHeight,
                height: fontLineHeight,
                font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
                display: 'block',
                margin: 0,
                padding: 0,
                WebkitAppearance: 'none', // iOS safari
                appearance: 'none',
                boxSizing: 'content-box',
                background: `transparent 0% 0% / ${fontLineHeight}`,
                transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
                border: `${borderWidthBase} solid ${uncheckedColor}`,
                outline: 0, // TODO: only relevant for VRT testing with forced states - prevents :focus style (in case getFocusJssStyle() condition is not matching)
                ...(disabledOrLoading
                    ? {
                        pointerEvents: 'none', // to prevent form element becomes clickable/toggleable
                    }
                    : {
                        cursor: 'pointer',
                    }),
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    borderColor: uncheckedColorDark,
                }),
            },
            '&(input:checked)': {
                // background-image is merged in later
                borderColor: checkedColor,
                backgroundColor: checkedColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    borderColor: checkedColorDark,
                    backgroundColor: checkedColorDark,
                }),
            },
            ...(!disabledOrLoading &&
                !isHighContrastMode &&
                hoverMediaQuery({
                    '&(input:hover),label:hover~.wrapper &(input)': {
                        borderColor: uncheckedHoverColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            borderColor: uncheckedHoverColorDark,
                        }),
                    },
                    '&(input:checked:hover),label:hover~.wrapper &(input:checked)': {
                        borderColor: checkedHoverColor,
                        backgroundColor: checkedHoverColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            borderColor: checkedHoverColorDark,
                            backgroundColor: checkedHoverColorDark,
                        }),
                    },
                    'label:hover~.wrapper &(input)': supportsChromiumMediaQuery({
                        transition: 'unset', // Fixes chrome bug where transition properties are stuck on hover
                    }),
                })),
            ...(!isDisabled && getFocusJssStyle(theme, { slotted: 'input' })),
        },
    };
};

const escapeHashCharacter = (colorString) => {
    return colorString.replace('#', '%23');
};

const getInlineSVGBackgroundImage = (path) => {
    return `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${path}</svg>')`;
};

const getFunctionalComponentRequiredStyles = () => {
    return {
        required: {
            userSelect: 'none',
        },
    };
};

const getFunctionalComponentLabelStyles = (isDisabledOrLoading, hideLabel, theme, additionalDefaultJssStyle, additionalIsShownJssStyle) => {
    const { primaryColor, disabledColor, contrastHighColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, disabledColor: disabledColorDark, contrastHighColor: contrastHighColorDark, } = getThemedColors('dark');
    return {
        label: {
            ...textSmallStyle,
            cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
            justifySelf: 'flex-start', // ensures label is not getting stretched by flex or grid context of its parent
            color: isDisabledOrLoading ? disabledColor : primaryColor,
            transition: getTransition('color'), // for smooth transitions between e.g. disabled state
            ...buildResponsiveStyles(hideLabel, (isHidden) => getHiddenTextJssStyle(isHidden, additionalIsShownJssStyle)),
            ...prefersColorSchemeDarkMediaQuery(theme, {
                color: isDisabledOrLoading ? disabledColorDark : primaryColorDark,
            }),
            '&:empty': {
                display: 'none', // prevents outer spacing caused by parents grid gap, in case no label value is defined (although it has to be set to be a11y compliant)
            },
            '&+&': {
                cursor: 'unset',
                marginTop: `-${spacingStaticXSmall}`,
                fontSize: fontSizeTextXSmall,
                ...(!isDisabledOrLoading && {
                    color: contrastHighColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: contrastHighColorDark,
                    }),
                }),
            },
            ...additionalDefaultJssStyle,
        },
        // .required
        ...getFunctionalComponentRequiredStyles(),
    };
};

const getFunctionalComponentStateMessageStyles = (theme, state, additionalDefaultJssStyle) => {
    return {
        message: {
            display: 'flex',
            gap: spacingStaticXSmall,
            ...textSmallStyle,
            color: getThemedFormStateColors(theme, state).formStateColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                color: getThemedFormStateColors('dark', state).formStateColor,
            }),
            transition: `${getTransition('color')}, ${getTransition('opacity')}`,
            ...additionalDefaultJssStyle,
            '&:empty': {
                opacity: '0',
                position: 'absolute',
            },
        },
    };
};

const getCheckedSVGBackgroundImage$2 = (fill) => {
    return getInlineSVGBackgroundImage(`<path fill="${fill}" d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`);
};
const getIndeterminateSVGBackgroundImage$1 = (fill) => {
    return getInlineSVGBackgroundImage(`<path fill="${fill}" d="m20,11v2H4v-2h16Z"/>`);
};
const getComponentCss$1d = (hideLabel, state, isDisabled, isLoading, theme) => {
    const checkedIconColor = escapeHashCharacter(getInvertedThemedColors(theme).primaryColor);
    const checkedIconColorDark = escapeHashCharacter(getInvertedThemedColors('dark').primaryColor);
    const indeterminateIconColor = escapeHashCharacter(getThemedColors(theme).primaryColor);
    const indeterminateIconColorDark = escapeHashCharacter(getThemedColors('dark').primaryColor);
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            // ::slotted(input)
            ...addImportantToEachRule(mergeDeep(getSlottedCheckboxRadioButtonStyles(state, isDisabled, isLoading, theme), {
                '::slotted': {
                    '&(input)': {
                        gridArea: '1/1',
                        borderRadius: borderRadiusSmall,
                    },
                    // TODO: is it somehow useful possible to make following styles configurable by parameter?
                    ...(!isLoading && {
                        '&(input:checked)': {
                            backgroundImage: getCheckedSVGBackgroundImage$2(checkedIconColor),
                            ...prefersColorSchemeDarkMediaQuery(theme, {
                                backgroundImage: getCheckedSVGBackgroundImage$2(checkedIconColorDark),
                            }),
                            // This is a workaround for Blink based browsers, which do not reflect the high contrast system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
                            ...(isHighContrastMode &&
                                getSchemedHighContrastMediaQuery({
                                    backgroundImage: getCheckedSVGBackgroundImage$2('white'),
                                }, {
                                    backgroundImage: getCheckedSVGBackgroundImage$2('black'),
                                })),
                        },
                        '&(input:indeterminate)': {
                            backgroundImage: getIndeterminateSVGBackgroundImage$1(indeterminateIconColor),
                            ...prefersColorSchemeDarkMediaQuery(theme, {
                                backgroundImage: getIndeterminateSVGBackgroundImage$1(indeterminateIconColorDark),
                            }),
                            // This is a workaround for Blink based browsers, which do not reflect the high contrast system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
                            ...(isHighContrastMode &&
                                getSchemedHighContrastMediaQuery({
                                    backgroundImage: getIndeterminateSVGBackgroundImage$1('black'),
                                }, {
                                    backgroundImage: getIndeterminateSVGBackgroundImage$1('white'),
                                })),
                        },
                    }),
                },
            })),
        },
        root: {
            display: 'grid',
            gridTemplateColumns: 'auto minmax(0, 1fr)',
            rowGap: spacingStaticXSmall,
        },
        wrapper: {
            display: 'grid',
            gridArea: '1/1',
            alignSelf: 'flex-start', // in case label becomes multiline
            ...(isDisabledOrLoading(isDisabled, isLoading) && {
                // TODO: maybe .wrapper should handle it for all form components while pointer-events: none is set to input
                cursor: 'not-allowed',
            }),
        },
        ...(isLoading && {
            // TODO: extract for checkbox-wrapper and radio-button-wrapper (not gridArea and placeSelf)
            spinner: {
                position: 'relative', // ensure correct stacking, can be removed as soon as focus for input is handled with outline
                gridArea: '1/1',
                placeSelf: 'center',
                width: fontLineHeight,
                height: fontLineHeight,
                font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
                pointerEvents: 'none',
            },
        }),
        // .label / .required
        ...getFunctionalComponentLabelStyles(isDisabled || isLoading, hideLabel, theme, {
            gridArea: '1/2',
        }, {
            paddingTop: '2px', // compensate vertical alignment
            paddingInlineStart: spacingStaticSmall, // asymmetric padding used instead of gap to prevent not clickable area between label and input
        }),
        // .message
        ...getFunctionalComponentStateMessageStyles(theme, state, {
            gridColumn: '1/3',
        }),
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
    });
};

const cssVarInternalCheckboxScaling = '--p-internal-checkbox-scaling';
const getCheckboxBaseStyles = (theme, isDisabled, isLoading, state, compact) => {
    const { contrastMediumColor, disabledColor } = getThemedColors(theme);
    const { contrastMediumColor: contrastMediumColorDark, disabledColor: disabledColorDark } = getThemedColors('dark');
    const { formStateColor } = getThemedFormStateColors(theme, state);
    const { formStateColor: formStateColorDark } = getThemedFormStateColors('dark', state);
    const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);
    // TODO: needs to be extracted into a color function
    const uncheckedColor = disabledOrLoading ? disabledColor : formStateColor || contrastMediumColor;
    const uncheckedColorDark = disabledOrLoading ? disabledColorDark : formStateColorDark || contrastMediumColorDark;
    const background = `transparent 0% 0% / ${fontLineHeight}`;
    const minimumTouchTargetSize = '24px'; // Minimum touch target size to comply with accessibility guidelines.
    const scalingVar = `var(${cssVarInternalCheckboxScaling}, ${compact ? 0.6668 : 1})`;
    // Determines the scaling factor for the checkbox size. In "compact" mode, it uses 0.6668 to achieve a 20px checkbox (compact size).
    // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalCheckboxScaling`.
    const dimension = `calc(max(${SCALING_BASE_VALUE} * 0.75, ${scalingVar} * ${fontLineHeight}))`;
    // Calculates the checkbox size and ensures a minimum size of 12px (0.75 * SCALING_BASE_VALUE).
    // Scales proportionally with the line height and the scaling factor.
    const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the checkbox including its borders.
    const touchTargetSizeDiff = `calc(${minimumTouchTargetSize} - ${dimensionFull})`; // Difference between the minimum touch target size and the checkbox full size.
    const inset = `calc(-${borderWidthBase} - max(0px, ${touchTargetSizeDiff} / 2))`; // Positions the checkbox ::before pseudo-element with a negative offset to align it with the touch target.
    return {
        position: 'relative',
        '&::before': {
            // Ensures the touch target is at least 24px, even if the checkbox is smaller than the minimum touch target size.
            // This pseudo-element expands the clickable area without affecting the visual size of the checkbox itself.
            content: '""',
            position: 'absolute',
            inset,
        },
        width: dimension,
        height: dimension,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
        display: 'block',
        margin: 0,
        padding: 0,
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        boxSizing: 'content-box',
        background,
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        border: `${borderWidthBase} solid ${uncheckedColor}`,
        outline: 0, // TODO: only relevant for VRT testing with forced states - prevents :focus style (in case getFocusJssStyle() condition is not matching)
        ...(disabledOrLoading
            ? {
                pointerEvents: 'none', // to prevent form element becomes clickable/toggleable
            }
            : {
                cursor: 'pointer',
            }),
        ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: uncheckedColorDark,
        }),
        gridArea: '1/1',
        borderRadius: borderRadiusSmall,
        ...addImportantToEachRule({
            backgroundSize: 'cover',
        }),
    };
};

const getCheckedSVGBackgroundImage$1 = (fill) => {
    return getInlineSVGBackgroundImage(`<path fill="${fill}" d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`);
};
const getCheckboxCheckedBaseStyles = (theme, isDisabled, isLoading, state) => {
    const { primaryColor, disabledColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, disabledColor: disabledColorDark } = getThemedColors('dark');
    const { formStateColor } = getThemedFormStateColors(theme, state);
    const { formStateColor: formStateColorDark } = getThemedFormStateColors('dark', state);
    const { canvasTextColor } = getHighContrastColors();
    const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);
    // TODO: needs to be extracted into a color function
    const checkedColor = isHighContrastMode
        ? canvasTextColor
        : disabledOrLoading
            ? disabledColor
            : formStateColor || primaryColor;
    const checkedColorDark = isHighContrastMode
        ? canvasTextColor
        : disabledOrLoading
            ? disabledColorDark
            : formStateColorDark || primaryColorDark;
    const checkedIconColor = escapeHashCharacter(getInvertedThemedColors(theme).primaryColor);
    const checkedIconColorDark = escapeHashCharacter(getInvertedThemedColors('dark').primaryColor);
    return {
        borderColor: checkedColor,
        backgroundColor: checkedColor,
        backgroundImage: getCheckedSVGBackgroundImage$1(checkedIconColor),
        ...prefersColorSchemeDarkMediaQuery(theme, {
            backgroundImage: getCheckedSVGBackgroundImage$1(checkedIconColorDark),
            borderColor: checkedColorDark,
            backgroundColor: checkedColorDark,
        }),
        // This is a workaround for Blink based browsers, which do not reflect the high contrast system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
        ...(isHighContrastMode &&
            getSchemedHighContrastMediaQuery({
                backgroundImage: getCheckedSVGBackgroundImage$1('white'),
            }, {
                backgroundImage: getCheckedSVGBackgroundImage$1('black'),
            })),
    };
};

const getIndeterminateSVGBackgroundImage = (fill) => {
    return getInlineSVGBackgroundImage(`<path fill="${fill}" d="m20,11v2H4v-2h16Z"/>`);
};
const getComponentCss$1c = (hideLabel, state, isDisabled, isLoading, compact, theme) => {
    const { primaryColor, contrastMediumColor, contrastHighColor, disabledColor, focusColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, contrastMediumColor: contrastMediumColorDark, contrastHighColor: contrastHighColorDark, disabledColor: disabledColorDark, focusColor: focusColorDark, } = getThemedColors('dark');
    const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
    const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors('dark', state);
    const { canvasTextColor } = getHighContrastColors();
    const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);
    // TODO: needs to be extracted into a color function
    const uncheckedColor = disabledOrLoading ? disabledColor : formStateColor || contrastMediumColor;
    const uncheckedColorDark = disabledOrLoading ? disabledColorDark : formStateColorDark || contrastMediumColorDark;
    const uncheckedHoverColor = formStateHoverColor || primaryColor;
    const uncheckedHoverColorDark = formStateHoverColorDark || primaryColorDark;
    const checkedColor = isHighContrastMode
        ? canvasTextColor
        : disabledOrLoading
            ? disabledColor
            : formStateColor || primaryColor;
    const checkedColorDark = isHighContrastMode
        ? canvasTextColor
        : disabledOrLoading
            ? disabledColorDark
            : formStateColorDark || primaryColorDark;
    const checkedHoverColor = formStateHoverColor || contrastHighColor;
    const checkedHoverColorDark = formStateHoverColorDark || contrastHighColorDark;
    const indeterminateIconColor = escapeHashCharacter(disabledOrLoading ? disabledColorDark : formStateColor || primaryColor);
    const indeterminateIconColorDark = escapeHashCharacter(formStateColorDark || primaryColorDark);
    const indeterminateIconHoverColor = escapeHashCharacter(formStateHoverColor || primaryColor);
    const indeterminateIconHoverColorDark = escapeHashCharacter(formStateHoverColorDark || primaryColorDark);
    const background = `transparent 0% 0% / ${fontLineHeight}`;
    const minimumTouchTargetSize = '24px'; // Minimum touch target size to comply with accessibility guidelines.
    const scalingVar = `var(${cssVarInternalCheckboxScaling}, ${compact ? 0.6668 : 1})`;
    const dimension = `calc(max(${SCALING_BASE_VALUE} * 0.75, ${scalingVar} * ${fontLineHeight}))`;
    const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the checkbox including its borders.
    const touchTargetSizeDiff = `calc(${minimumTouchTargetSize} - ${dimensionFull})`; // Difference between the minimum touch target size and the checkbox full size.
    const paddingInlineStart = `calc(${spacingStaticSmall} - (max(0px, ${touchTargetSizeDiff})))`;
    const paddingTop = `calc((${dimensionFull} - ${fontLineHeight}) / 2)`; // Vertically centers the checkbox label relative to the checkbox size.
    const height = `calc(max(${fontLineHeight}, ${dimensionFull}))`; // Ensures the wrapper height matches either the font's line height or the full size of the checkbox, whichever is larger.
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            input: getCheckboxBaseStyles(theme, isDisabled, isLoading, state, compact),
            ...(isLoading
                ? {
                    'input:checked': {
                        // background-image is merged in later
                        borderColor: checkedColor,
                        backgroundColor: checkedColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            borderColor: checkedColorDark,
                            backgroundColor: checkedColorDark,
                        }),
                    },
                }
                : {
                    'input:checked': getCheckboxCheckedBaseStyles(theme, isDisabled, isLoading, state),
                    'input:indeterminate': {
                        background, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
                        borderColor: uncheckedColor, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
                        backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColor),
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            backgroundImage: getIndeterminateSVGBackgroundImage(disabledOrLoading ? indeterminateIconColor : indeterminateIconColorDark),
                            borderColor: uncheckedColorDark, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
                            backgroundColor: 'transparent', // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
                        }),
                        // This is a workaround for Blink based browsers, which do not reflect the high contrast system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
                        ...(isHighContrastMode &&
                            getSchemedHighContrastMediaQuery({
                                backgroundImage: getIndeterminateSVGBackgroundImage('black'),
                            }, {
                                backgroundImage: getIndeterminateSVGBackgroundImage('white'),
                            })),
                    },
                }),
            ...(!disabledOrLoading &&
                !isHighContrastMode &&
                hoverMediaQuery({
                    'input:hover,label:hover~.wrapper input': {
                        borderColor: uncheckedHoverColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            borderColor: uncheckedHoverColorDark,
                        }),
                    },
                    'input:checked:hover,label:hover~.wrapper input:checked': {
                        borderColor: checkedHoverColor,
                        backgroundColor: checkedHoverColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            borderColor: checkedHoverColorDark,
                            backgroundColor: checkedHoverColorDark,
                        }),
                    },
                    'input:indeterminate:hover,label:hover~.wrapper input:indeterminate': {
                        background, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
                        borderColor: uncheckedHoverColor, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
                        backgroundImage: getIndeterminateSVGBackgroundImage(escapeHashCharacter(indeterminateIconHoverColor)),
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            backgroundImage: getIndeterminateSVGBackgroundImage(escapeHashCharacter(indeterminateIconHoverColorDark)),
                            borderColor: uncheckedHoverColorDark, // Safari fix: ensures proper rendering of 'indeterminate' mode
                            backgroundColor: 'transparent',
                        }),
                    },
                    'label:hover~.wrapper input': supportsChromiumMediaQuery({
                        transition: 'unset', // Fixes chrome bug where transition properties are stuck on hover
                    }),
                })),
            ...(!isDisabled && {
                'input::-moz-focus-inner': {
                    border: 0, // reset ua-style (for FF)
                },
                'input:focus': {
                    outline: 0, // reset ua-style (for older browsers)
                },
                'input:focus-visible': {
                    outline: `${borderWidthBase} solid ${focusColor}`,
                    outlineOffset: '2px',
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        outlineColor: focusColorDark,
                    }),
                },
            }),
        },
        root: {
            display: 'grid',
            gridTemplateColumns: 'auto minmax(0, 1fr)',
            rowGap: spacingStaticXSmall,
            ...(disabledOrLoading && {
                cursor: 'not-allowed',
            }),
        },
        wrapper: {
            ...textSmallStyle,
            minWidth: minimumTouchTargetSize,
            minHeight: minimumTouchTargetSize,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'grid',
            gridArea: '1/1',
            alignSelf: 'flex-start', // in case label becomes multiline
            height,
        },
        ...(isLoading && {
            spinner: {
                position: 'relative', // ensure correct stacking, can be removed as soon as focus for input is handled with outline
                gridArea: '1/1',
                placeSelf: 'center',
                width: dimension,
                height: dimension,
                font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
                pointerEvents: 'none',
            },
        }),
        // .label / .required
        ...getFunctionalComponentLabelStyles(isDisabled || isLoading, hideLabel, theme, {
            gridArea: '1/2',
            ...(isLoading && { pointerEvents: 'none' }), // prevent default htmlFor behavior. TODO: Remove as soon as label component for custom form components exists.
        }, {
            paddingTop,
            paddingInlineStart,
        }),
        // .message
        ...getFunctionalComponentStateMessageStyles(theme, state, {
            gridColumn: '1/3',
        }),
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
    });
};

const getSlottedTextFieldTextareaSelectStyles = (child, state, isLoading, theme, additionalDefaultJssStyle) => {
    const { primaryColor, contrastLowColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, contrastLowColor: contrastLowColorDark, contrastMediumColor: contrastMediumColorDark, disabledColor: disabledColorDark, } = getThemedColors('dark');
    const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
    const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors('dark', state);
    return {
        [`::slotted(${child})`]: {
            display: 'block',
            width: '100%',
            height: child !== 'textarea'
                ? `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)` // we need 10px additionally so input height becomes 54px
                : 'auto',
            margin: 0,
            outline: 0,
            WebkitAppearance: 'none', // iOS safari
            appearance: 'none',
            boxSizing: 'border-box',
            border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
            borderRadius: borderRadiusSmall,
            background: 'transparent',
            font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
            textIndent: 0,
            color: primaryColor,
            transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
            ...prefersColorSchemeDarkMediaQuery(theme, {
                borderColor: formStateColorDark || contrastMediumColorDark,
                color: primaryColorDark,
            }),
            ...additionalDefaultJssStyle,
        },
        '::slotted(:not(input[type="password"]))': {
            textOverflow: 'ellipsis',
        },
        ...(!isLoading &&
            hoverMediaQuery({
                // with the media query the selector has higher priority and overrides disabled styles
                [`::slotted(${child}:not(:disabled):not(:focus):not([readonly]):hover),label:hover~.wrapper ::slotted(${child}:not(:disabled):not(:focus):not([readonly]))${child === 'select' ? ',label:hover~.wrapper ::part(select-wrapper-dropdown)' : ''}`]: {
                    borderColor: formStateHoverColor || primaryColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        borderColor: formStateHoverColorDark || primaryColorDark,
                    }),
                },
            })),
        // TODO: getFocusJssStyle() can't be re-used because focus style differs for form elements
        [`::slotted(${child}:focus)`]: {
            borderColor: primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                borderColor: primaryColorDark,
            }),
        },
        [`::slotted(${child}:disabled)`]: {
            cursor: 'not-allowed',
            color: disabledColor,
            borderColor: disabledColor,
            WebkitTextFillColor: disabledColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                color: disabledColorDark,
                borderColor: disabledColorDark,
                WebkitTextFillColor: disabledColorDark,
            }),
        },
        ...(child !== 'select' && {
            [`::slotted(${child}[readonly])`]: {
                borderColor: contrastLowColor,
                background: contrastLowColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    borderColor: contrastLowColorDark,
                    background: contrastLowColorDark,
                }),
            },
        }),
    };
};
const formElementLayeredGap = '9px'; // to have same distance vertically and horizontally for e.g. button/icon within form element
const formElementLayeredSafeZone = `calc(${formElementLayeredGap} + ${borderWidthBase})`;
// TODO: basic button/icon padding can already be set within style function instead of on component style level
const formButtonOrIconPadding = spacingStaticXSmall;
// TODO: if we'd use 12px instead, it wouldn't be necessary for textarea to have a custom vertical padding,
//  unfortunately line-height alignment breaks for a select element for some reasons then
// TODO: basic form element padding can already be set within style function instead of on component style level
const formElementPaddingVertical = spacingStaticSmall;
// TODO: basic form element padding can already be set within style function instead of on component style level
const formElementPaddingHorizontal = spacingStaticMedium;
const getCalculatedFormElementPaddingHorizontal = (buttonOrIconAmount) => {
    // when applied, font-family and font-size needs to be set too for correct calculation of ex-unit ($fontLineHeight)
    return `calc(${formElementLayeredGap} + ${formElementPaddingHorizontal} / 2 + (${fontLineHeight} + ${formButtonOrIconPadding} * 2) * ${buttonOrIconAmount})`;
};
// TODO: re-use in textarea-wrapper not only in text-field-wrapper
const getUnitCounterJssStyle = (isDisabled, isReadonly, theme) => {
    const { disabledColor, contrastMediumColor, contrastHighColor } = getThemedColors(theme);
    const { disabledColor: disabledColorDark, contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');
    return {
        pointerEvents: 'none',
        maxWidth: '100%',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        font: textSmallStyle.font,
        color: contrastMediumColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrastMediumColorDark,
        }),
        ...(isDisabled && {
            color: disabledColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                color: disabledColorDark,
            }),
        }),
        ...(isReadonly && {
            color: contrastHighColor,
        }),
    };
};

const cssVarInternalInputBaseScaling = '--p-internal-input-base-scaling';
// Determines the scaling factor for the input-number size. In "compact" mode, it uses 0.5 to achieve a 36px input-number (compact size).
// Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalInputBaseScaling`.
const getScalingVar = (compact) => `var(${cssVarInternalInputBaseScaling}, ${compact ? 0.5 : 1})`;
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
const cssVarButtonPurePadding = '--ref-p-input-slotted-padding';
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
const cssVarButtonPureMargin = '--ref-p-input-slotted-margin';
const getFunctionalComponentInputBaseStyles = (disabled, loading, hideLabel, state, compact, readOnly, theme, additionalInputJssStyle) => {
    const scalingVar = getScalingVar(compact);
    const paddingBlock = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
    const paddingInline = `max(2px, ${formElementPaddingHorizontal} * ${scalingVar})`;
    const height = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;
    const gap = `max(4px, calc(${spacingStaticMedium} * ${scalingVar}))`;
    // This will return 0 for <= 0.5, ~4 for 1 and ~8 for 2 scaling...
    const buttonCompensation = `clamp(0, 6.42 * pow(calc(${scalingVar} - 0.5), 0.6826), 12)`;
    const { primaryColor, contrastLowColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, contrastLowColor: contrastLowColorDark, contrastMediumColor: contrastMediumColorDark, disabledColor: disabledColorDark, } = getThemedColors('dark');
    const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
    const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors('dark', state);
    const hoverStyles = {
        borderColor: formStateHoverColor || primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: formStateHoverColorDark || primaryColorDark,
        }),
    };
    return {
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                    [`${cssVarButtonPurePadding}`]: `calc(1px * ${buttonCompensation})`,
                    [`${cssVarButtonPureMargin}`]: `calc(-1px * ${buttonCompensation})`,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            input: {
                all: 'unset',
                flex: 1,
                font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is aligned with how Safari visualize date/time input highlighting
                height,
                paddingBlock,
                color: primaryColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: primaryColorDark,
                }),
                width: '100%',
                minWidth: '2rem',
                ...(disabled && {
                    color: disabledColor,
                    WebkitTextFillColor: disabledColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: disabledColorDark,
                        WebkitTextFillColor: disabledColorDark,
                    }),
                }),
                ...additionalInputJssStyle,
            },
        },
        root: {
            display: 'grid',
            gap: spacingStaticXSmall,
        },
        wrapper: {
            border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
            borderRadius: borderRadiusSmall,
            paddingInline,
            display: 'flex',
            alignItems: 'center',
            gap,
            transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                borderColor: formStateColorDark || contrastMediumColorDark,
            }),
            ...(!disabled &&
                !readOnly && {
                '&:has(input:focus)': {
                    borderColor: primaryColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        borderColor: primaryColorDark,
                    }),
                },
                ...hoverMediaQuery({
                    '&:hover:not(:has(.button:hover, input:focus ))': hoverStyles,
                }),
            }),
            ...(disabled && {
                cursor: 'not-allowed',
                borderColor: disabledColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    borderColor: disabledColorDark,
                }),
            }),
            ...(readOnly && {
                cursor: 'text',
                borderColor: contrastLowColor,
                background: contrastLowColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    borderColor: contrastLowColorDark,
                    background: contrastLowColorDark,
                }),
            }),
        },
        ...(loading && {
            spinner: {
                font: textSmallStyle.font,
                width: fontLineHeight,
                height: fontLineHeight,
            },
        }),
        // .label / .required
        ...getFunctionalComponentLabelStyles(disabled, hideLabel, theme, !disabled &&
            !readOnly &&
            hoverMediaQuery({
                '&:hover~.wrapper': hoverStyles,
            })),
        // .message
        ...getFunctionalComponentStateMessageStyles(theme, state),
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
    };
};

const getButtonJssStyle = (componentName, isOpen, isDisabled, state, cssVarScaling, theme) => {
    const cssVarBackgroundColor = `--p-${componentName}-background-color`;
    const cssVarTextColor = `--p-${componentName}-text-color`;
    const cssVarBorderColor = `--p-${componentName}-border-color`;
    const { primaryColor, disabledColor, contrastMediumColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, disabledColor: disabledColorDark, contrastMediumColor: contrastMediumColorDark, } = getThemedColors('dark');
    const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
    const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors('dark', state);
    return {
        all: 'unset',
        display: 'flex',
        alignItems: 'center',
        gap: `max(4px, ${cssVarScaling} * 12px)`,
        padding: `max(2px, ${cssVarScaling} * ${formElementPaddingVertical}) max(4px, ${cssVarScaling} * ${formElementPaddingHorizontal})`,
        minWidth: 0,
        height: `max(${fontLineHeight}, ${cssVarScaling} * (${fontLineHeight} + 10px))`,
        boxSizing: 'content-box', // ensures height calculation is based on content, not including padding
        font: textSmallStyle.font,
        cursor: 'pointer',
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
        color: `var(${cssVarTextColor}, ${primaryColor})`,
        backgroundColor: `var(${cssVarBackgroundColor}, transparent)`,
        border: `${borderWidthBase} solid var(${cssVarBorderColor}, ${isOpen ? primaryColor : formStateColor || contrastMediumColor})`,
        borderRadius: borderRadiusSmall,
        ...(isDisabled && {
            cursor: 'not-allowed',
            color: disabledColor,
            borderColor: disabledColor,
        }),
        ...prefersColorSchemeDarkMediaQuery(theme, {
            color: `var(${cssVarTextColor}, ${primaryColorDark})`,
            backgroundColor: `var(${cssVarBackgroundColor}, transparent)`,
            border: `${borderWidthBase} solid var(${cssVarBorderColor}, ${isOpen ? primaryColorDark : formStateColorDark || contrastMediumColorDark})`,
            ...(isDisabled && {
                color: disabledColorDark,
                borderColor: disabledColorDark,
            }),
        }),
        ...(!isDisabled && {
            ...hoverMediaQuery({
                '&:hover,label:hover~&': {
                    borderColor: `var(${cssVarBorderColor}, ${isOpen ? primaryColor : formStateHoverColor || primaryColor})`,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        borderColor: `var(${cssVarBorderColor}, ${isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark})`,
                    }),
                },
            }),
            ...getFocusJssStyle(theme),
        }),
    };
};

const getButtonImageJssStyle = {
    font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct calculations based on ex-unit
    width: 'auto',
    height: fontLineHeight,
    borderRadius: borderRadiusSmall,
};

const getButtonLabelJssStyle = {
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

const getFilterJssStyle = (scalingVar, theme) => {
    const { backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);
    const { backgroundSurfaceColor: backgroundSurfaceColorDark } = getThemedColors('dark');
    return {
        position: 'sticky',
        top: `calc(max(2px, ${scalingVar} * 6px) * -1)`,
        padding: `max(2px, ${scalingVar} * 6px)`,
        margin: `calc(max(2px, ${scalingVar} * 6px) * -1)`,
        background: isThemeDark(theme) ? backgroundSurfaceColor : backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
            background: backgroundSurfaceColorDark,
        }),
        zIndex: 1,
    };
};

const getIconJssStyle = (componentName, isOpen) => {
    const cssVarIconFilter = `--p-${componentName}-icon-filter`;
    return {
        marginInlineEnd: '-3px', // to temporarily align with multi-select and select-wrapper
        pointerEvents: 'none',
        transform: `rotate3d(0,0,1,${isOpen ? '180' : '0.0001'}deg)`, // needs to be a little more than 0 for correct direction in safari
        transition: getTransition('transform'),
        ...(!isHighContrastMode && {
            filter: `var(${cssVarIconFilter})`,
        }),
    };
};

const getOptionJssStyle = (componentName, cssVarScaling, // "1" is needed for components not yet supporting compact mode
theme) => {
    const { primaryColor: primaryColorDark, contrastHighColor: contrastHighColorDark, disabledColor: disabledColorDark, contrastLowColor: contrastLowColorDark, } = getThemedColors('dark');
    const { primaryColor, contrastLowColor, contrastHighColor, disabledColor } = getThemedColors(theme);
    const { highlightColor } = getHighContrastColors();
    const gap = `max(4px, ${cssVarScaling} * 12px)`;
    const paddingBlock = `max(2px, ${cssVarScaling} * ${spacingStaticSmall})`;
    const paddingInline = `max(4px, ${cssVarScaling} * var(--p-internal-${componentName}-padding-left, 12px)) max(4px, ${cssVarScaling} * 12px)`;
    return {
        display: 'flex',
        gap,
        paddingBlock,
        paddingInline,
        minHeight: fontLineHeight, // preserves height for empty option
        ...textSmallStyle,
        color: contrastHighColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrastHighColorDark,
        }),
        cursor: 'pointer',
        textAlign: 'start',
        wordBreak: 'break-word',
        boxSizing: 'content-box',
        borderRadius: borderRadiusSmall,
        transition: `${getTransition('background-color')}, ${getTransition('color')}`,
        '&--highlighted': {
            background: contrastLowColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                background: contrastLowColorDark,
            }),
        },
        '&--highlighted, &--selected': {
            color: isHighContrastMode ? highlightColor : primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                color: isHighContrastMode ? highlightColor : primaryColorDark,
            }),
        },
        '&--disabled': {
            cursor: 'not-allowed',
            color: disabledColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                color: disabledColorDark,
            }),
        },
        '&--hidden': {
            display: 'none',
        },
    };
};

const getOptionsJssStyle = (scalingVar) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        gap: `max(2px, ${scalingVar} * ${spacingStaticSmall})`,
    };
};

const keyframesName = 'fade-in';
const getPopoverKeyframesStyles = {
    [`@keyframes ${keyframesName}`]: {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    },
};
const getPopoverJssStyle = (isOpen, cssVarScaling, // "1" is needed for components not yet supporting compact mode
optionHeight, theme) => {
    const { contrastLowColor, backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);
    const { contrastLowColor: contrastLowColorDark, backgroundSurfaceColor: backgroundSurfaceColorDark } = getThemedColors('dark');
    const minHeightOptionList = `calc(${4.5 * (optionHeight + 8) + 6 + 2}px)`; // 4.5 options * option height + 8px gap + additional spacing (6px = padding, 2px = border)
    return {
        all: 'unset',
        position: 'absolute',
        zIndex: 99, // needed for backwards compatibility, to enable browsers not supporting #top-layer
        padding: `max(2px, ${cssVarScaling} * 6px)`,
        display: isOpen ? 'flex' : 'none', // needed for backwards compatibility, otherwise 'flex' would be enough
        flexDirection: 'column',
        gap: `max(2px, ${cssVarScaling} * ${spacingStaticSmall})`,
        maxHeight: `max(${minHeightOptionList}, calc(50vh - 54px / 2 - ${OPTION_LIST_SAFE_ZONE}px * 2))`,
        boxSizing: 'border-box',
        overflow: 'hidden auto',
        scrollbarWidth: 'thin', // firefox
        scrollbarColor: 'auto', // firefox
        animation: `var(${cssVariableAnimationDuration}, ${motionDurationShort}) ${keyframesName} ${motionEasingBase} forwards`,
        filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.15))',
        background: isThemeDark(theme) ? backgroundSurfaceColor : backgroundColor,
        border: `1px solid ${contrastLowColor}`,
        borderRadius: borderRadiusMedium,
        ...prefersColorSchemeDarkMediaQuery(theme, {
            background: backgroundSurfaceColorDark,
            borderColor: contrastLowColorDark,
        }),
        '&:not(:popover-open)': {
            display: 'none',
        },
    };
};

const getFunctionalComponentNoResultsOptionStyles = (componentName, cssVarScaling, // "1" is needed for components not yet supporting compact mode
theme) => {
    const { contrastMediumColor } = getThemedColors(theme);
    const { contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');
    return {
        'no-results': {
            ...getOptionJssStyle(componentName, cssVarScaling, theme),
            '&[role=option]': {
                cursor: 'not-allowed',
            },
            color: contrastMediumColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                color: contrastMediumColorDark,
            }),
        },
        'sr-only': getHiddenTextJssStyle(),
    };
};

const widthMap = {
    narrow: gridNarrowOffset,
    basic: gridBasicOffset,
    extended: gridExtendedOffset,
};
const getComponentCss$1b = (width) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
        },
        root: {
            minWidth: 0, // needed for some flex context
            ...(['full', 'fluid'].includes(width)
                ? {
                    padding: `0 ${gridFullOffset}`,
                }
                : {
                    padding: `0 ${widthMap[width].base}`,
                    [getMediaQueryMin('s')]: {
                        padding: `0 ${widthMap[width].s}`,
                    },
                    [getMediaQueryMin('xxl')]: {
                        padding: `0 ${widthMap[width].xxl}`,
                    },
                }),
        },
    });
};

const crestSize = {
    width: 30,
    height: 40,
};

const { width, height } = crestSize;
const getDimensionStyle = {
    maxWidth: `${width}px`,
    maxHeight: `${height}px`,
    width: 'inherit',
    height: 'inherit',
};
const getComponentCss$1a = () => {
    return getCss({
        '@global': {
            ':host': {
                position: 'relative',
                display: 'inline-block',
                verticalAlign: 'top',
                ...addImportantToEachRule({
                    outline: 0, // TODO: is it still necessary?
                    boxSizing: 'content-box', // needed for correct height calculation when padding is set on host (e.g. custom click area)
                    ...getDimensionStyle,
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            a: {
                display: 'block',
                textDecoration: 'none',
                ...getDimensionStyle,
                '&::before': {
                    // needs to be defined always to have correct custom click area
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '1px',
                },
                ...getFocusJssStyle('light', { pseudo: true }), // TODO: we need to support theme
            },
            picture: {
                display: 'block',
                width: `min(${width}px, 100%)`,
                height: `min(${height}px, 100%)`,
            },
            img: {
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
            },
        },
    });
};

const DISPLAY_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const getThemedTypographyColor = (theme, textColor // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents
) => {
    const themedColors = getThemedColors(theme);
    const colorMap = {
        primary: themedColors.primaryColor,
        default: themedColors.primaryColor, // deprecated but part of HeadlineColor
        'contrast-low': themedColors.contrastLowColor,
        'contrast-medium': themedColors.contrastMediumColor,
        'contrast-high': themedColors.contrastHighColor,
        'notification-success': themedColors.successColor,
        'notification-warning': themedColors.warningColor,
        'notification-error': themedColors.errorColor,
        'notification-info': themedColors.infoColor,
        inherit: 'currentColor',
    };
    return colorMap[textColor];
};

const getTypographyRootJssStyle = (baseTextStyle, responsiveStyle, align, // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents
color, // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents
ellipsis, theme) => {
    return {
        margin: 0,
        padding: 0,
        ...baseTextStyle,
        color: getThemedTypographyColor(theme, color),
        ...prefersColorSchemeDarkMediaQuery(theme, {
            color: getThemedTypographyColor('dark', color),
        }),
        textAlign: align,
        letterSpacing: 'normal',
        listStyleType: 'none',
        whiteSpace: 'inherit',
        ...(ellipsis && {
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }),
        ...responsiveStyle,
    };
};
const getTypographySlottedJssStyle = () => {
    return {
        all: 'unset',
    };
};

const sizeMap$5 = {
    small: fontSizeDisplaySmall,
    medium: fontSizeDisplayMedium,
    large: fontSizeDisplayLarge,
};
const getComponentCss$19 = (size, align, color, ellipsis, theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            [`::slotted(:is(${DISPLAY_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
        },
        root: getTypographyRootJssStyle(displayLargeStyle, buildResponsiveStyles(size, (sizeValue) => ({
            fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap$5[sizeValue],
        })), align, color, ellipsis, theme),
    });
};

const getComponentCss$18 = (color, orientation, theme) => {
    const { contrastLowColor, contrastMediumColor, contrastHighColor } = getThemedColors(theme);
    const { contrastLowColor: contrastLowColorDark, contrastMediumColor: contrastMediumColorDark, contrastHighColor: contrastHighColorDark, } = getThemedColors('dark');
    const colorMap = {
        'contrast-low': contrastLowColor,
        'contrast-medium': contrastMediumColor,
        'contrast-high': contrastHighColor,
    };
    const colorMapDark = {
        'contrast-low': contrastLowColorDark,
        'contrast-medium': contrastMediumColorDark,
        'contrast-high': contrastHighColorDark,
    };
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            hr: {
                margin: 0,
                padding: 0,
                border: 'none',
                textAlign: 'start',
                ...(isHighContrastMode
                    ? {
                        background: getHighContrastColors().canvasTextColor,
                    }
                    : {
                        background: colorMap[color],
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            background: colorMapDark[color],
                        }),
                    }),
                ...buildResponsiveStyles(orientation, (o) => o === 'horizontal' ? { height: '1px', width: '100%' } : { height: '100%', width: '1px' }),
            },
        },
    });
};

// public css variables
const cssVariableGridTemplate = '--p-drilldown-grid-template';
const cssVariableGap = '--p-drilldown-gap';
// private css variables
const cssVarColorPrimary = '--_p-a';
const cssVarColorBackgroundBase = '--_p-b';
const cssVarColorBackgroundSurface = '--_p-c';
const cssVarColorBackgroundShading = '--_p-d';
const cssVarColorBackgroundScroller = '--_p-f';
const scrollerWidthDesktop = 'clamp(338px, 210px + 18vw, 640px)';
const mediaQueryMobile = getMediaQueryMax('s');
const mediaQueryDesktop = getMediaQueryMin('s');
const dialogDurationOpen = 'moderate';
const backdropDurationOpen = 'long';
const easingOpen = 'in';
const dialogDurationClose = 'short';
const backdropDurationClose = 'moderate';
const easingClose = 'out';
const getComponentCss$17 = (isOpen, isPrimary, isSecondaryScrollerVisible, theme) => {
    const { primaryColor, backgroundColor, backgroundSurfaceColor, backgroundShadingColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark, backgroundSurfaceColor: backgroundSurfaceColorDark, backgroundShadingColor: backgroundShadingColorDark, } = getThemedColors('dark');
    return getCss({
        '@global': {
            '@keyframes slide-up-mobile': {
                from: { transform: `translate3d(0,${spacingFluidMedium},0)` },
                to: { transform: 'translate3d(0,0,0)' },
            },
            // unfortunately, it's not possible to use transform animation like in mobile view
            // because then a new stacking context within scroll container would be initialized
            // causing the slotted scroll container to become invisible
            '@keyframes slide-up-desktop': {
                from: { marginBlockStart: spacingFluidMedium },
                to: { marginBlockStart: '0px' },
            },
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    [cssVarColorPrimary]: primaryColor,
                    [cssVarColorBackgroundBase]: backgroundColor,
                    [cssVarColorBackgroundSurface]: backgroundSurfaceColor,
                    [cssVarColorBackgroundShading]: backgroundShadingColor,
                    [cssVarColorBackgroundScroller]: theme === 'dark' ? 'rgba(0,0,0,.01)' : 'rgba(255,255,255,.01)', // ensures that the scrollbar color is mostly set correctly
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        [cssVarColorPrimary]: primaryColorDark,
                        [cssVarColorBackgroundBase]: backgroundColorDark,
                        [cssVarColorBackgroundSurface]: backgroundSurfaceColorDark,
                        [cssVarColorBackgroundShading]: backgroundShadingColorDark,
                        [cssVarColorBackgroundScroller]: 'rgba(0,0,0,.01)', // ensures that the scrollbar color is mostly set correctly
                    }),
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            '::slotted(*)': {
                [cssVariableGridTemplate]: 'auto/auto', // reset css variable to prevent inheritance
                [cssVariableGap]: spacingFluidXSmall, // reset css variable to prevent inheritance
            },
            dialog: {
                all: 'unset',
                position: 'fixed',
                inset: 0,
                zIndex: 999999999, // fallback when dialog isn't rendered on #top-layer, e.g. relevant in ssr context or fade-out transition in Safari or Firefox
                outline: 0, // prevents outline in case dialog becomes focusable
                ...(isOpen
                    ? {
                        visibility: 'inherit',
                        ...frostedGlassStyle,
                        background: `var(${cssVarColorBackgroundShading})`,
                        transition: `${getTransition('background', backdropDurationOpen, easingOpen)}, ${getTransition('backdrop-filter', backdropDurationOpen, easingOpen)}, ${getTransition('-webkit-backdrop-filter', backdropDurationOpen, easingOpen)}`,
                    }
                    : {
                        visibility: 'hidden',
                        transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationMap[backdropDurationClose]}), ${getTransition('overlay', backdropDurationClose, easingClose)} allow-discrete, ${getTransition('background', backdropDurationClose, easingClose)}, ${getTransition('backdrop-filter', backdropDurationClose, easingClose)}, ${getTransition('-webkit-backdrop-filter', backdropDurationClose, easingClose)}`,
                    }),
                '&::backdrop': {
                    display: 'none',
                },
            },
            slot: {
                [mediaQueryMobile]: {
                    display: 'contents',
                    ...(!isSecondaryScrollerVisible && {
                        gridArea: '4/2/auto/-2',
                        zIndex: 0,
                        display: 'grid',
                        gridTemplate: `var(${cssVariableGridTemplate},auto/auto)`,
                        gap: `var(${cssVariableGap},${spacingFluidXSmall})`,
                        alignContent: 'start',
                        alignItems: 'start',
                        boxSizing: 'border-box',
                        minHeight: '100%',
                        height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
                        paddingBlockEnd: spacingFluidLarge,
                        ...(isPrimary && {
                            animation: getAnimation('slide-up-mobile', 'moderate', 'base'),
                        }),
                    }),
                },
                [mediaQueryDesktop]: {
                    ...(isPrimary && {
                        gridArea: '3/2/auto/-2',
                        display: 'grid',
                        gridTemplate: `var(${cssVariableGridTemplate},auto/auto)`,
                        gap: `var(${cssVariableGap},${isPrimary ? spacingFluidXSmall : spacingFluidMedium})`,
                        alignContent: 'start',
                        alignItems: 'start',
                        boxSizing: 'border-box',
                        minHeight: '100%',
                        height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
                        paddingBlockEnd: spacingFluidLarge,
                        animation: getAnimation('slide-up-desktop', 'moderate', 'base'),
                    }),
                },
            },
            ...(isSecondaryScrollerVisible && {
                '::slotted(*:not([primary],[secondary],[cascade]))': {
                    [mediaQueryMobile]: addImportantToEachRule({
                        display: 'none',
                    }),
                },
                '::slotted(*:not([primary],[cascade]))': addImportantToEachRule({
                    [mediaQueryDesktop]: {
                        ...(!isPrimary && {
                            display: 'none',
                        }),
                    },
                }),
            }),
        },
        drawer: {
            position: 'absolute',
            inset: 0,
            display: 'grid',
            ...(isOpen
                ? {
                    opacity: 1,
                    transform: 'translate3d(0,0,0)',
                    transition: `${getTransition('opacity', dialogDurationOpen, easingOpen)}, ${getTransition('transform', dialogDurationOpen, easingOpen)}`,
                }
                : {
                    opacity: 0,
                    transform: 'translate3d(-100%,0,0)',
                    transition: `${getTransition('opacity', dialogDurationClose, easingClose)}, ${getTransition('transform', dialogDurationClose, easingClose)}`,
                    '&:dir(rtl)': {
                        transform: 'translate3d(100%,0,0)',
                    },
                }),
            [mediaQueryMobile]: {
                gridTemplate: `${spacingFluidMedium} auto ${spacingFluidLarge} minmax(0, 1fr)/${spacingFluidLarge} auto minmax(0, 1fr) auto ${spacingFluidLarge}`,
                background: `var(${cssVarColorBackgroundBase})`,
            },
            [mediaQueryDesktop]: {
                width: isSecondaryScrollerVisible ? `calc(${scrollerWidthDesktop} * 2)` : scrollerWidthDesktop,
                gridTemplate: `${spacingFluidMedium} auto minmax(0, 1fr)/repeat(${isSecondaryScrollerVisible ? 2 : 1}, ${spacingFluidLarge} minmax(0, 1fr) ${spacingFluidLarge})`,
                background: `var(${cssVarColorBackgroundBase})`,
                ...(isSecondaryScrollerVisible && {
                    background: `linear-gradient(90deg,var(${cssVarColorBackgroundBase}) 0%,var(${cssVarColorBackgroundBase}) 50%,var(${cssVarColorBackgroundSurface}) 50%,var(${cssVarColorBackgroundSurface}) 100%)`,
                    '&:dir(rtl)': {
                        background: `linear-gradient(90deg,var(${cssVarColorBackgroundSurface}) 0%,var(${cssVarColorBackgroundSurface}) 50%,var(${cssVarColorBackgroundBase}) 50%,var(${cssVarColorBackgroundBase}) 100%)`,
                    },
                }),
            },
            '&::before, &::after': {
                content: '""',
                position: 'relative',
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0,
            },
            '&::before': {
                [mediaQueryMobile]: {
                    gridArea: '1/1/-1/-1',
                    background: `var(${cssVarColorBackgroundBase})`,
                },
                [mediaQueryDesktop]: {
                    gridArea: '1/1/-1/4',
                    background: `var(${cssVarColorBackgroundBase})`,
                },
            },
            '&::after': {
                [mediaQueryMobile]: {
                    gridArea: '1/1/-1/-1',
                    background: `var(${cssVarColorBackgroundBase})`,
                },
                [mediaQueryDesktop]: {
                    gridArea: '1/4/-1/-1',
                    background: `var(${cssVarColorBackgroundSurface})`,
                },
            },
        },
        scroller: {
            display: 'contents',
            overflow: 'hidden auto',
            // scrollBehavior: 'smooth', // when defined, `.scrollTo()` isn't applied immediately
            // overscrollBehaviorY: 'none', // when defined, rubber band scroll effect is getting lost on iOS Safari
            // WebkitOverflowScrolling: 'touch', // when defined, secondary scroller might not be show in iOS Safari on iPhone only
            background: `var(${cssVarColorBackgroundScroller})`,
            [mediaQueryMobile]: {
                ...(!isSecondaryScrollerVisible && {
                    gridArea: '1/1/-1/-1',
                    display: 'grid',
                    gridTemplateRows: 'subgrid',
                    gridTemplateColumns: 'subgrid',
                    '&::before': {
                        content: '""',
                        position: 'sticky',
                        top: 0,
                        gridArea: '1/1/4/-1',
                        zIndex: 1,
                        background: `linear-gradient(180deg,var(${cssVarColorBackgroundBase}) 0%,var(${cssVarColorBackgroundBase}) 65%,transparent 100%)`,
                    },
                }),
            },
            [mediaQueryDesktop]: {
                gridArea: '1/1/-1/4',
                display: 'grid',
                gridTemplateRows: 'subgrid',
                gridTemplateColumns: 'subgrid',
            },
        },
        'dismiss-mobile': {
            [mediaQueryMobile]: {
                ...dismissButtonJssStyle,
                width: 'fit-content',
                height: 'fit-content',
                placeSelf: 'start end',
                gridArea: '2/4',
                zIndex: 3, // ensures dismiss button is on top of opacity animation handled by ::before/::after
                marginInlineEnd: '-1px', // improve visual alignment and compensate white space of close icon
            },
            [mediaQueryDesktop]: {
                display: 'none',
            },
        },
        'dismiss-desktop': {
            [mediaQueryMobile]: {
                display: 'none',
            },
            [mediaQueryDesktop]: {
                '--p-internal-icon-filter': 'invert(1)',
                position: 'absolute',
                insetInlineStart: `calc(100% + ${spacingFluidSmall})`,
                insetBlockStart: spacingFluidSmall,
                padding: spacingStaticSmall,
            },
        },
        back: {
            display: 'none',
            ...(isSecondaryScrollerVisible &&
                isPrimary && {
                [mediaQueryMobile]: {
                    display: 'block',
                    marginTop: '2px', // compensate negative margin of ::pseudo background of button-pure
                    gridArea: '2/2',
                    width: 'fit-content',
                    height: 'fit-content',
                    placeSelf: 'start',
                    zIndex: 2,
                },
            }),
        },
    });
};

const getComponentCss$16 = (isPrimary, isSecondary, isCascade) => {
    return getCss({
        '@global': {
            '@keyframes slide-up-mobile': {
                from: { transform: `translate3d(0,${spacingFluidMedium},0)` },
                to: { transform: 'translate3d(0,0,0)' },
            },
            '@keyframes slide-up-desktop-primary': {
                from: { marginBlockStart: spacingFluidMedium },
                to: { marginBlockStart: '0px' },
            },
            '@keyframes slide-up-desktop-secondary': {
                from: { marginBlockStart: spacingFluidMedium },
                to: { marginBlockStart: '0px' },
            },
            ':host': {
                display: 'contents',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            slot: {
                '&[name="header"]': {
                    display: 'none',
                    [mediaQueryMobile]: {
                        ...(isSecondary && {
                            gridArea: '2/3',
                            display: 'grid',
                            placeItems: 'center',
                            zIndex: 2,
                        }),
                    },
                },
                '&[name="button"]': {
                    ...((isPrimary || isCascade) && {
                        display: 'none',
                    }),
                    [mediaQueryMobile]: {
                        ...(isSecondary && {
                            display: 'none',
                        }),
                    },
                },
                '&:not([name])': {
                    display: 'none',
                    [mediaQueryMobile]: {
                        ...(isSecondary && {
                            gridArea: '4/2/auto/-2',
                            zIndex: 0,
                            display: 'grid',
                            gridTemplate: `var(${cssVariableGridTemplate},auto/auto)`,
                            gap: `var(${cssVariableGap},${spacingFluidXSmall})`,
                            alignContent: 'start',
                            alignItems: 'start',
                            boxSizing: 'border-box',
                            minHeight: '100%',
                            height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
                            paddingBlockEnd: spacingFluidLarge,
                            animation: getAnimation('slide-up-mobile', 'moderate', 'base'),
                        }),
                        ...((isPrimary || isCascade) && {
                            display: 'contents',
                        }),
                    },
                    [mediaQueryDesktop]: {
                        ...((isPrimary || isSecondary) && {
                            gridArea: '3/2/auto/-2',
                            display: 'grid',
                            gridTemplate: `var(${cssVariableGridTemplate},auto/auto)`,
                            gap: `var(${cssVariableGap},${spacingFluidXSmall})`,
                            alignContent: 'start',
                            alignItems: 'start',
                            boxSizing: 'border-box',
                            minHeight: '100%',
                            height: 'fit-content', // ensures padding bottom is added instead of subtracted because of grid context
                            paddingBlockEnd: spacingFluidLarge,
                            animation: getAnimation(`slide-up-desktop-${isPrimary ? 'primary' : 'secondary'}`, 'moderate', 'base'),
                        }),
                        ...(isSecondary && {
                            gridArea: '2/2/auto/-2',
                            paddingBlockEnd: spacingFluidLarge,
                        }),
                        ...(isCascade && {
                            display: 'contents',
                        }),
                    },
                },
            },
            h2: {
                display: 'none',
                [mediaQueryMobile]: {
                    ...(isSecondary && {
                        ...headingSmallStyle,
                        display: 'block',
                        gridArea: '2/3',
                        placeSelf: 'center',
                        zIndex: 2,
                        margin: 0,
                        paddingInline: spacingStaticMedium,
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: `var(${cssVarColorPrimary})`, // enables color inheritance for slotted content
                    }),
                },
            },
            // If cascade we need to hide all children which are not primary or another cascade (e.g. all siblings of the primary or cascade item)
            ...(isCascade && {
                '::slotted(*:not([primary],[cascade]))': addImportantToEachRule({
                    display: 'none',
                }),
            }),
            ...(isPrimary && {
                '::slotted(*:not([secondary]))': addImportantToEachRule({
                    [mediaQueryMobile]: {
                        display: 'none',
                    },
                }),
            }),
            '::slotted(*)': {
                [cssVariableGridTemplate]: 'auto/auto', // reset css variable to prevent inheritance
                [cssVariableGap]: spacingFluidXSmall, // reset css variable to prevent inheritance
            },
        },
        // drawer subgrid in combination with scroller grid ensures no content squeezing during slide up animation, potentially caused by scrollbar
        drawer: {
            [mediaQueryMobile]: {
                display: 'none',
                ...((isPrimary || isSecondary || isCascade) && {
                    display: 'contents',
                }),
            },
            [mediaQueryDesktop]: {
                display: 'none',
                ...(isSecondary && {
                    position: 'absolute', // enables to break out of scroll area
                    inset: 0,
                    insetInlineStart: scrollerWidthDesktop,
                    display: 'grid',
                    gridTemplate: `${spacingFluidMedium} minmax(0, 1fr)/${spacingFluidLarge} minmax(0, 1fr) ${spacingFluidLarge}`,
                }),
                ...((isPrimary || isCascade) && {
                    display: 'contents',
                }),
            },
        },
        scroller: {
            display: 'none',
            overflow: 'hidden auto',
            // scrollBehavior: 'smooth', // when defined, `.scrollTo()` isn't applied immediately
            // overscrollBehaviorY: 'none', // when defined, rubber band scroll effect is getting lost on iOS Safari
            // WebkitOverflowScrolling: 'touch', // when defined, secondary scroller might not be show in iOS Safari on iPhone only
            background: `var(${cssVarColorBackgroundScroller})`,
            [mediaQueryMobile]: {
                ...(isSecondary && {
                    display: 'grid',
                    gridTemplateRows: 'subgrid',
                    gridTemplateColumns: 'subgrid',
                    gridArea: '1/1/-1/-1',
                    '&::before': {
                        zIndex: 1,
                        content: '""',
                        position: 'sticky',
                        top: 0,
                        gridArea: '1/1/4/-1',
                        background: `linear-gradient(180deg,var(${cssVarColorBackgroundBase}) 0%,var(${cssVarColorBackgroundBase}) 65%,transparent 100%)`,
                    },
                }),
                ...((isPrimary || isCascade) && {
                    display: 'contents',
                }),
            },
            [mediaQueryDesktop]: {
                ...(isSecondary && {
                    gridArea: '1/1/-1/-1',
                    display: 'grid',
                    gridTemplateRows: 'subgrid',
                    gridTemplateColumns: 'subgrid',
                }),
                ...((isPrimary || isCascade) && {
                    display: 'contents',
                }),
            },
        },
        button: {
            ...((isPrimary || isCascade) && {
                display: 'none',
            }),
            [mediaQueryMobile]: {
                ...(isSecondary && {
                    display: 'none',
                }),
            },
            ...(!isPrimary &&
                !isCascade && {
                // TODO: not sure if this is ideal, since the consumer won't be able to change it when used with a custom
                //  grid-template, maybe <p-drilldown-button slot="button" /> would be an option, similar to <p-drilldown-link />
                gridColumn: '1/-1',
                padding: spacingFluidSmall,
                margin: `0 calc(${spacingFluidSmall} * -1)`,
            }),
        },
        back: {
            ...(!isPrimary && {
                display: 'none',
            }),
            ...(isPrimary && {
                [mediaQueryMobile]: {
                    gridArea: '2/2',
                    marginTop: '2px', // compensate negative margin of ::pseudo background of button-pure
                    width: 'fit-content',
                    height: 'fit-content',
                    placeSelf: 'start',
                    zIndex: 2,
                },
                [mediaQueryDesktop]: {
                    gridArea: '2/2',
                    marginBottom: spacingFluidMedium,
                    width: 'fit-content',
                    height: 'fit-content',
                    marginInlineStart: '-4px', // improve visual alignment and compensate white space of arrow-left icon
                },
            }),
        },
    });
};

const getComponentCss$15 = (hasSlottedAnchor, isActive) => {
    const anchorJssStyle = {
        all: 'unset',
        padding: `calc(${spacingFluidSmall} + 2px) calc(${spacingFluidSmall} + 4px)`, // aligned with link-pure
        margin: `-2px calc(${spacingFluidSmall} * -1 - 4px)`, // aligned with link-pure
        borderRadius: borderRadiusSmall, // needed for focus outline
        font: textMediumStyle.font,
        color: `var(${cssVarColorPrimary})`,
        textDecoration: 'underline',
        textDecorationColor: isActive ? 'inherit' : 'transparent',
        cursor: isActive ? 'default' : 'pointer',
        transition: getTransition('text-decoration-color'),
    };
    return getCss({
        '@global': {
            ':host': {
                display: 'grid',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            ...(hasSlottedAnchor
                ? {
                    '::slotted': addImportantToEachRule({
                        '&(a)': anchorJssStyle,
                        ...hoverMediaQuery({
                            '&(a:hover)': {
                                textDecorationColor: 'inherit',
                            },
                        }),
                        // TODO: focus color is the same for all themes but could change in the future
                        ...getFocusJssStyle('light', { slotted: 'a', offset: '-2px' }),
                    }),
                }
                : {
                    a: {
                        ...anchorJssStyle,
                        ...hoverMediaQuery({
                            '&:hover': {
                                textDecorationColor: 'inherit',
                            },
                        }),
                        // TODO: focus color is the same for all themes but could change in the future
                        ...getFocusJssStyle('light', { offset: '-2px' }),
                    },
                }),
        },
    });
};

const getComponentCss$14 = (state, labelSize, hasLabel, theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            fieldset: {
                margin: 0,
                padding: 0,
                border: 'none',
            },
            ...(hasLabel && {
                legend: {
                    margin: `0 0 ${spacingStaticMedium}`,
                    padding: 0,
                    color: getThemedColors(theme).primaryColor,
                    ...(labelSize === 'small' ? headingSmallStyle : headingMediumStyle),
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: getThemedColors('dark').primaryColor,
                    }),
                },
            }),
        },
        ...getFunctionalComponentRequiredStyles(),
        ...mergeDeep(getFunctionalComponentStateMessageStyles(theme, state), {
            message: {
                marginTop: spacingStaticMedium,
            },
        }),
    });
};

const getComponentCss$13 = (state, labelSize, hasLabel, theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            fieldset: {
                margin: 0,
                padding: 0,
                border: 'none',
            },
            ...(hasLabel && {
                legend: {
                    margin: `0 0 ${spacingStaticMedium}`,
                    padding: 0,
                    color: getThemedColors(theme).primaryColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: getThemedColors('dark').primaryColor,
                    }),
                    ...(labelSize === 'small' ? headingSmallStyle : headingMediumStyle),
                },
            }),
        },
        ...getFunctionalComponentRequiredStyles(),
        ...mergeDeep(getFunctionalComponentStateMessageStyles(theme, state), {
            message: {
                marginTop: spacingStaticMedium,
            },
        }),
    });
};

const sizeMap$4 = {
    'xx-small': fontSizeTextXXSmall,
    'x-small': fontSizeTextXSmall,
    small: fontSizeTextSmall,
    medium: fontSizeTextMedium,
    large: fontSizeTextLarge,
    'x-large': fontSizeTextXLarge,
};
const getComponentCss$12 = (size) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'inline-block',
                verticalAlign: 'top',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            img: {
                display: 'block', // without display, img tag gets some extra spacing
                margin: 0,
                padding: '1px', // add safe-zone to be visually in sync with <p-icon />
                boxSizing: 'border-box',
                pointerEvents: 'none', // disable dragging/ghosting of images
                ...(size === 'inherit'
                    ? {
                        width: size,
                        height: size,
                    }
                    : {
                        width: fontLineHeight,
                        height: fontLineHeight,
                        font: `${sizeMap$4[size]} ${fontFamily}`,
                    }),
            },
        },
    });
};

const flexItemWidths = {
    none: 0,
    'one-quarter': 25,
    'one-third': 33.333333,
    half: 50,
    'two-thirds': 66.666667,
    'three-quarters': 75,
    full: 100,
    auto: 'auto',
};
const getComponentCss$11 = (width, offset, alignSelf, grow, shrink, flex) => {
    return getCss({
        '@global': {
            ':host': addImportantToEachRule({
                boxSizing: 'border-box',
                ...hostHiddenStyles,
                ...mergeDeep(buildResponsiveStyles(width, (widthResponsive) => ({
                    width: `${flexItemWidths[widthResponsive]}%`,
                })), buildResponsiveStyles(offset, (offsetResponsive) => ({
                    marginLeft: `${flexItemWidths[offsetResponsive]}%`,
                })), buildResponsiveStyles(alignSelf, (alignSelfResponsive) => ({
                    alignSelf: alignSelfResponsive,
                })), flex !== 'initial' // flex shorthand conflicts with grow and shrink, which means even default grow or shrink props would override flex
                    ? buildResponsiveStyles(flex, (flexResponsive) => ({
                        flex: flexResponsive === 'equal' ? '1 1 0' : flexResponsive,
                    }))
                    : mergeDeep(buildResponsiveStyles(grow, (flexGrow) => ({ flexGrow })), buildResponsiveStyles(shrink, (flexShrink) => ({ flexShrink })))),
            }),
        },
    });
};

const getComponentCss$10 = (inline, wrap, direction, justifyContent, alignItems, alignContent) => {
    return getCss({
        '@global': {
            ':host': {
                ...buildResponsiveStyles(inline, (inlineResponsive) => ({
                    display: inlineResponsive ? 'inline-flex' : 'flex',
                })),
                ...addImportantToEachRule(mergeDeep(colorSchemeStyles, hostHiddenStyles, buildResponsiveStyles(wrap, (flexWrapResponsive) => ({ flexWrap: flexWrapResponsive })), buildResponsiveStyles(direction, (flexDirectionResponsive) => ({
                    flexDirection: flexDirectionResponsive,
                })), buildResponsiveStyles(justifyContent, (justifyContentResponsive) => ({
                    justifyContent: justifyContentResponsive,
                })), buildResponsiveStyles(alignItems, (alignItemsResponsive) => ({
                    alignItems: alignItemsResponsive,
                })), buildResponsiveStyles(alignContent, (alignContentResponsive) => ({
                    alignContent: alignContentResponsive,
                })))),
            },
        },
    });
};

const headingTags = 'h1,h2,h3,h4,h5,h6';
const dialogHostJssStyle = {
    '--pds-internal-grid-outer-column': `calc(${spacingFluidLarge} - ${gridGap})`,
    '--pds-internal-grid-margin': `calc(${spacingFluidLarge} * -1)`,
    '--pds-internal-grid-width-min': 'auto',
    '--pds-internal-grid-width-max': 'none',
};
const getDialogJssStyle = (isVisible, theme, backdrop = 'blur') => {
    return {
        ...dialogBackdropResetJssStyle,
        ...getDialogBackdropTransitionJssStyle(isVisible, theme, backdrop),
    };
};
const dialogBackdropResetJssStyle = {
    position: 'fixed', // ua-style
    inset: 0, // ua-style
    margin: 0, // ua-style
    padding: 0, // ua-style
    border: 0, // ua-style
    width: '100dvw', // ua-style
    height: '100dvh', // ua-style
    maxWidth: '100dvw', // ua-style
    maxHeight: '100dvh', // ua-style
    overflow: 'hidden', // ua-style
    display: 'block', // ua-style
    outline: 0, // ua-style (we always expect a focusable element to be within the dialog)
    '&::backdrop': {
        display: 'none', // ua-style (we can't use it atm because it's not animatable in all browsers)
    },
};
const getDialogBackdropTransitionJssStyle = (isVisible, theme, backdrop = 'blur') => {
    const isBackdropBlur = backdrop === 'blur';
    const { backgroundShadingColor } = getThemedColors(theme);
    const { backgroundShadingColor: backgroundShadingColorDark } = getThemedColors('dark');
    const duration = isVisible ? 'long' : 'moderate';
    const easing = isVisible ? 'in' : 'out';
    // as soon as all browsers are supporting `allow-discrete`, visibility transition shouldn't be necessary anymore
    const transition = `visibility 0s linear var(${cssVariableTransitionDuration}, ${isVisible ? '0s' : motionDurationMap[duration]}), ${getTransition('background-color', duration, easing)}, ${getTransition('-webkit-backdrop-filter', duration, easing)}, ${getTransition('backdrop-filter', duration, easing)}`;
    return {
        zIndex: 9999999, // fallback for fade out stacking until `overlay` + `allow-discrete` is supported in all browsers. It tries to mimic #top-layer positioning hierarchy.
        ...(isVisible
            ? {
                visibility: 'inherit',
                pointerEvents: 'auto',
                background: backgroundShadingColor,
                ...(isBackdropBlur && frostedGlassStyle),
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    background: backgroundShadingColorDark,
                }),
            }
            : {
                visibility: 'hidden', // element shall not be tabbable with keyboard after fade out transition has finished
                pointerEvents: 'none', // element can't be interacted with mouse
                background: 'transparent',
            }),
        transition,
        // `allow-discrete` transition for ua-style `overlay` (supported browsers only) ensures dialog is rendered on
        // #top-layer as long as fade-in or fade-out transition/animation is running
        '@supports (transition-behavior: allow-discrete)': {
            transition: `${transition}, ${getTransition('overlay', duration, easing)} allow-discrete`,
        },
    };
};
const getScrollerJssStyle = (position, theme) => {
    // ensures scrollbar color is set correctly (e.g. when scrollbar is shown on backdrop, on flyout/modal surface or with Auto Dark Mode)
    const backgroundLight = 'rgba(255,255,255,.01)';
    const backgroundDark = 'rgba(0,0,0,.01)';
    const background = {
        light: backgroundLight,
        dark: backgroundDark,
        auto: backgroundLight,
    };
    return {
        position: 'absolute',
        isolation: 'isolate', // creates new stacking context to show scrollbars on top of header/footer areas (on iOS/iPadOS)
        display: 'grid',
        ...(position === 'fullscreen'
            ? {
                inset: 0,
            }
            : {
                insetBlock: 0,
                [position === 'start' ? 'insetInlineStart' : 'insetInlineEnd']: 0,
            }),
        overflow: 'hidden auto',
        overscrollBehaviorY: 'none',
        // TODO: check if smooth scrolling on iOS is given?
        background: background[theme],
        ...prefersColorSchemeDarkMediaQuery(theme, {
            background: background.dark,
        }),
    };
};
const dialogPaddingBlock = `calc(${spacingFluidSmall} + ${spacingFluidMedium})`;
const dialogGridJssStyle = {
    display: 'grid',
    gridTemplate: `auto/${spacingFluidSmall} minmax(0,1fr) ${spacingFluidSmall}`,
    gap: `${spacingFluidMedium} calc(${spacingFluidLarge} - ${spacingFluidSmall})`,
    paddingBlock: dialogPaddingBlock,
    alignContent: 'flex-start',
};
const getDialogColorJssStyle = (theme) => {
    const { primaryColor, backgroundColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark } = getThemedColors('dark');
    return {
        color: primaryColor, // enables color inheritance for slots
        background: backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
            background: backgroundColorDark,
        }),
    };
};
const getDialogTransitionJssStyle = (isVisible, slideIn) => {
    const duration = isVisible ? 'moderate' : 'short';
    const easing = isVisible ? 'in' : 'out';
    return {
        // transition offset relies vertically on viewport (vh) because the dialog height can be infinite, while horizontally
        // it relies on the dialog width (%) which has a max-width
        ...(isVisible
            ? {
                opacity: 1,
                transform: 'initial',
            }
            : {
                opacity: 0,
                transform: slideIn === '^' ? 'translateY(25vh)' : `translateX(${slideIn === '>' ? '-' : ''}100%)`,
                '&:dir(rtl)': {
                    transform: slideIn === '^' ? 'translateY(25vh)' : `translateX(${slideIn === '>' ? '' : '-'}100%)`,
                },
            }),
        transition: `${getTransition('opacity', duration, easing)}, ${getTransition('transform', duration, easing)}`,
    };
};
const getDialogStickyAreaJssStyle = (area, theme) => {
    const { backgroundColor } = getThemedColors(theme);
    const { backgroundColor: backgroundColorDark } = getThemedColors('dark');
    const scrollShadowColor = 'rgba(204, 204, 204, 0.35)';
    const scrollShadowColorDark = 'rgba(0, 0, 0, 0.6)';
    const isAreaHeader = area === 'header';
    const boxShadowDimension = `0 ${isAreaHeader ? 5 : -5}px 10px`;
    return {
        position: 'sticky',
        [isAreaHeader ? 'top' : 'bottom']: '-.1px', // necessary for `IntersectionObserver` to detect if sticky element is stuck or not. Float value is used, so that sticky area isn't moved out visually by e.g. 1px when container gets scrolled.
        transform: 'translateZ(0)', // prevents slightly squeezed elements within sticky area for some browsers (e.g. Firefox) caused by float value of sticky top position
        padding: `${spacingStaticMedium} ${spacingFluidLarge}`,
        marginBlock: `${isAreaHeader ? `calc((${spacingFluidSmall} + ${spacingFluidMedium}) * -1)` : `-${spacingStaticMedium}`} -${spacingStaticMedium}`,
        background: backgroundColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
            background: backgroundColorDark,
        }),
        clipPath: `inset(${isAreaHeader ? '0 0 -20px 0' : '-20px 0 0 0'})`, // crop leaking box-shadow on left and right side
        transition: `${getTransition('box-shadow')}`,
        '&[data-stuck]': {
            boxShadow: `${isThemeDark(theme) ? scrollShadowColorDark : scrollShadowColor} ${boxShadowDimension}`,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                boxShadow: `${scrollShadowColorDark} ${boxShadowDimension}`,
            }),
        },
    };
};

/**
 * @css-variable {"name": "--p-flyout-width", "description": "Width of the flyout.", "defaultValue": "auto"}
 */
const cssVariableWidth$2 = '--p-flyout-width';
/**
 * @css-variable {"name": "--ref-p-flyout-pt", "description": "Exposes the internally used padding-top of the Flyout as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the top of the Flyout."}
 */
const cssVarRefPaddingTop = '--ref-p-flyout-pt';
/**
 * @css-variable {"name": "--ref-p-flyout-px", "description": "Exposes the internally used padding-inline of the Flyout as read only CSS variable. When slotting e.g. a media container, this variable can be used to stretch the element to the full horizontal size of the Flyout."}
 */
const cssVarRefPaddingInline = '--ref-p-flyout-px';
// TODO: we shouldn't expose --p-flyout-max-width
const cssVariableMaxWidth = '--p-flyout-max-width';
const getComponentCss$$ = (isOpen, position, hasHeader, hasFooter, hasSubFooter, footerBehavior, theme) => {
    const isPositionStart = position === 'start' || position === 'left';
    const isFooterFixed = footerBehavior === 'fixed';
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...dialogHostJssStyle,
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                    [`${cssVarRefPaddingTop}`]: dialogPaddingBlock,
                    [`${cssVarRefPaddingInline}`]: spacingFluidLarge,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            slot: {
                display: 'block',
                '&:first-of-type': {
                    gridRowStart: 1,
                },
                '&:not([name])': {
                    gridColumn: '2/3',
                    zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
                    ...(isFooterFixed &&
                        hasHeader && {
                        gridRow: 2,
                    }),
                },
                ...(hasHeader && {
                    '&[name=header]': {
                        ...getDialogStickyAreaJssStyle('header', theme),
                        gridColumn: '1/-1',
                        zIndex: 3, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
                        ...(isFooterFixed && {
                            gridRow: 1,
                        }),
                        marginBlockStart: 0,
                    },
                }),
                ...(hasFooter && {
                    '&[name=footer]': {
                        ...getDialogStickyAreaJssStyle('footer', theme),
                        gridColumn: '1/-1',
                        zIndex: 2, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
                        ...(isFooterFixed && {
                            gridRow: hasHeader ? 3 : 2,
                            ...(!hasSubFooter && {
                                marginBlockEnd: '.3px', // lets the footer shadow disappear when flyout is scrolled to the bottom
                            }),
                        }),
                    },
                }),
                ...(hasSubFooter && {
                    '&[name=sub-footer]': {
                        gridColumn: '2/3',
                        zIndex: 1, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
                    },
                }),
            },
            dialog: getDialogJssStyle(isOpen, theme),
        },
        scroller: {
            ...getScrollerJssStyle(isPositionStart ? 'start' : 'end', theme),
            // compared to Modal, the transition is handled on the scroller to have correct stucked behaviour (visibility of drop shadow)
            // for sticky header area while transitioned
            ...getDialogTransitionJssStyle(isOpen, isPositionStart ? '>' : '<'),
            // Though this might be an accessibility issue, we don't want an outline to be rendered until we have a proper design solution
            '&:focus-visible': {
                outline: 'none',
            },
        },
        flyout: {
            ...dialogGridJssStyle,
            ...getDialogColorJssStyle(theme),
            width: `var(${cssVariableWidth$2},auto)`,
            minWidth: '320px',
            maxWidth: `var(${cssVariableMaxWidth},1180px)`,
            ...(hasHeader && {
                paddingBlockStart: 0,
            }),
            ...(isFooterFixed &&
                !hasSubFooter && {
                paddingBlockEnd: 0,
            }),
            ...(isFooterFixed && {
                gridTemplateRows: hasHeader ? 'auto 1fr auto' : '1fr',
                '&::before': {
                    content: '""',
                    minHeight: hasHeader ? '100dvh' : `calc(100dvh - ${dialogPaddingBlock})`,
                    gridArea: `1/1/${hasHeader ? '4' : '3'}/-1`,
                    pointerEvents: 'none',
                },
            }),
        },
        dismiss: {
            ...dismissButtonJssStyle,
            gridArea: '1/3',
            zIndex: 4, // ensures dismiss button is above everything
            position: 'sticky',
            insetBlockStart: spacingFluidSmall,
            insetInlineEnd: spacingFluidSmall,
            marginBlockStart: `calc(${spacingFluidMedium} * -1)`,
            placeSelf: 'flex-start flex-end',
        },
    });
};

const gutter$1 = `calc(${gridGap} / 2)`;
const gridItemWidths = [
    0, 8.333333, 16.666667, 25, 33.333333, 41.666667, 50, 58.333333, 66.666667, 75, 83.333333, 91.666667, 100,
];
const getComponentCss$_ = (size, offset) => {
    return getCss({
        '@global': {
            ':host': addImportantToEachRule({
                paddingLeft: gutter$1,
                paddingRight: gutter$1,
                boxSizing: 'border-box',
                ...hostHiddenStyles,
                ...mergeDeep(buildResponsiveStyles(size, (sizeResponsive) => ({
                    width: `${gridItemWidths[sizeResponsive]}%`,
                    minWidth: `${gridItemWidths[sizeResponsive]}%`,
                })), buildResponsiveStyles(offset, (offsetResponsive) => ({
                    marginLeft: `${gridItemWidths[offsetResponsive]}%`,
                }))),
            }),
        },
    });
};

const gutter = `calc(${gridGap} / -2)`;
const getComponentCss$Z = (direction, wrap) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'flex',
                ...addImportantToEachRule({
                    flex: 'auto',
                    width: 'auto',
                    marginLeft: gutter,
                    marginRight: gutter,
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                    ...mergeDeep(buildResponsiveStyles(direction, (flexDirection) => ({ flexDirection })), buildResponsiveStyles(wrap, (flexWrap) => ({ flexWrap }))),
                }),
            },
        },
    });
};

const sizeMap$3 = {
    small: fontSizeHeadingSmall,
    medium: fontSizeHeadingMedium,
    large: fontSizeHeadingLarge,
    'x-large': fontSizeHeadingXLarge,
    'xx-large': fontSizeHeadingXXLarge,
};
const getComponentCss$Y = (size, align, color, ellipsis, theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            [`::slotted(:is(${HEADING_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
        },
        root: getTypographyRootJssStyle(headingXXLargeStyle, buildResponsiveStyles(size, (sizeValue) => ({
            fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap$3[sizeValue],
        })), align, color, ellipsis, theme),
    });
};

const HEADLINE_VARIANTS = [
    'large-title',
    'headline-1',
    'headline-2',
    'headline-3',
    'headline-4',
    'headline-5',
];
const HEADLINE_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const isValidVariantType = (variant) => {
    return HEADLINE_VARIANTS.includes(variant);
};

const headlineSizeMap = {
    'headline-1': fontSizeHeadingXXLarge,
    'headline-2': fontSizeHeadingXLarge,
    'headline-3': fontSizeHeadingLarge,
    'headline-4': fontSizeHeadingMedium,
    'headline-5': fontSizeHeadingSmall,
};
const getHeadlineVariantJssStyle = (variant) => {
    return {
        ...(variant === 'large-title'
            ? displayMediumStyle
            : {
                fontSize: headlineSizeMap[variant],
            }),
    };
};
const textSizeMap = {
    'xx-small': fontSizeTextXXSmall,
    'x-small': fontSizeTextXSmall,
    small: fontSizeTextSmall,
    medium: fontSizeTextMedium,
    large: fontSizeTextLarge,
    'x-large': fontSizeTextXLarge,
};
const getTextSizeJssStyle = (textSize) => {
    return {
        fontSize: textSize === 'inherit' ? textSize : textSizeMap[textSize],
    };
};
const getComponentCss$X = (variant, align, color, ellipsis, theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            '::slotted': {
                [HEADLINE_TAGS.map((i) => `&(${i})`).join()]: addImportantToEachRule(getTypographySlottedJssStyle()),
            },
        },
        root: getTypographyRootJssStyle(headingXXLargeStyle, isValidVariantType(variant)
            ? getHeadlineVariantJssStyle(variant)
            : buildResponsiveStyles(variant, getTextSizeJssStyle), align, color, ellipsis, theme),
    });
};

const toFilter = (values) => `invert(${values[0]}%) sepia(${values[1]}%) saturate(${values[2]}%) hue-rotate(${values[3]}deg) brightness(${values[4]}%) contrast(${values[5]}%)`;

const filterLightContrastLow = toFilter([93, 11, 36, 201, 89, 102]);
const filterLightContrastMedium = toFilter([45, 6, 235, 177, 91, 85]);
const filterLightContrastHigh = toFilter([40, 2, 686, 187, 80, 94]);
const filterDarkContrastLow = toFilter([20, 7, 421, 202, 97, 82]);
const filterDarkContrastMedium = toFilter([66, 3, 333, 187, 82, 86]);
const filterDarkContrastHigh = toFilter([68, 6, 108, 187, 104, 88]);

const filterLightDisabled = toFilter([63, 8, 108, 188, 94, 86]);
const filterDarkDisabled = toFilter([52, 6, 135, 187, 94, 89]);

const filterLightNotificationSuccess = toFilter([28, 89, 572, 71, 111, 98]);
const filterLightNotificationWarning = toFilter([58, 53, 820, 12, 112, 103]);
const filterLightNotificationError = toFilter([14, 75, 4140, 347, 100, 97]);
const filterLightNotificationInfo = toFilter([44, 100, 492, 195, 86, 221]);
const filterDarkNotificationSuccess = toFilter([60, 71, 512, 106, 91, 97]);
const filterDarkNotificationWarning = toFilter([75, 39, 759, 350, 109, 94]);
const filterDarkNotificationError = toFilter([64, 91, 5857, 336, 98, 102]);
const filterDarkNotificationInfo = toFilter([56, 77, 4175, 198, 104, 98]);

const filterLightPrimary = toFilter([3, 7, 2930, 188, 91, 103]);
const filterDarkPrimary = toFilter([100, 91, 38, 254, 110, 110]);

const sizeMap$2 = {
    'xx-small': fontSizeTextXXSmall,
    'x-small': fontSizeTextXSmall,
    small: fontSizeTextSmall,
    medium: fontSizeTextMedium,
    large: fontSizeTextLarge,
    'x-large': fontSizeTextXLarge,
};
const filterLight = {
    primary: filterLightPrimary,
    'state-disabled': filterLightDisabled,
    'contrast-low': filterLightContrastLow,
    'contrast-medium': filterLightContrastMedium,
    'contrast-high': filterLightContrastHigh,
    'notification-success': filterLightNotificationSuccess,
    'notification-warning': filterLightNotificationWarning,
    'notification-error': filterLightNotificationError,
    'notification-info': filterLightNotificationInfo,
};
const filterDark = {
    primary: filterDarkPrimary,
    'state-disabled': filterDarkDisabled,
    'contrast-low': filterDarkContrastLow,
    'contrast-medium': filterDarkContrastMedium,
    'contrast-high': filterDarkContrastHigh,
    'notification-success': filterDarkNotificationSuccess,
    'notification-warning': filterDarkNotificationWarning,
    'notification-error': filterDarkNotificationError,
    'notification-info': filterDarkNotificationInfo,
};
const filterMap = {
    auto: filterLight,
    light: filterLight,
    dark: filterDark,
};
const forceRerenderAnimationStyle = {
    '0%': {
        transform: 'rotateZ(0)',
    },
    '100%': {
        transform: 'rotateZ(0)',
    },
};
const keyFramesLight = 'rerender-light';
const keyFramesDark = 'rerender-dark';
const cssVariableFilter = '--p-internal-icon-filter';
const isFlippableIcon = (name, source) => {
    return (!source &&
        (name === 'arrow-compact-left' ||
            name === 'arrow-compact-right' ||
            name === 'arrow-double-left' ||
            name === 'arrow-double-right' ||
            name === 'arrow-first' ||
            name === 'arrow-head-left' ||
            name === 'arrow-head-right' ||
            name === 'arrow-last' ||
            name === 'arrow-left' ||
            name === 'arrow-right' ||
            name === 'chart' ||
            name === 'chat' ||
            name === 'external' ||
            name === 'increase' ||
            name === 'list' ||
            name === 'logout' ||
            name === 'return' ||
            name === 'send'));
};
const getComponentCss$W = (name, source, color, size, theme) => {
    const isColorInherit = color === 'inherit';
    const isSizeInherit = size === 'inherit';
    const isDark = isThemeDark(theme);
    const animationName = `${isDark ? keyFramesDark : keyFramesLight}-${color}`;
    return getCss({
        '@global': {
            ':host': {
                display: 'inline-block',
                verticalAlign: 'top',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            img: {
                display: 'block', // without display, img tag gets some extra spacing
                margin: 0,
                padding: 0,
                pointerEvents: 'none', // disable dragging/ghosting of images
                ...(!isColorInherit && {
                    filter: `var(${cssVariableFilter},${filterMap[theme][color]})`,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        filter: `var(${cssVariableFilter},${filterMap.dark[color]})`,
                    }),
                    ...(isHighContrastMode &&
                        getSchemedHighContrastMediaQuery({
                            filter: filterMap.light[color],
                        }, {
                            filter: filterMap.dark[color],
                        })),
                    WebkitAnimation: `${animationName} 1ms`, // needed to enforce repaint in Safari if theme is switched programmatically
                }),
                ...(isSizeInherit
                    ? {
                        width: size,
                        height: size,
                    }
                    : {
                        width: fontLineHeight,
                        height: fontLineHeight,
                        font: `${sizeMap$2[size]} ${fontFamily}`,
                    }),
                ...(isFlippableIcon(name, source) && {
                    '&:dir(rtl)': {
                        transform: 'scaleX(-1)',
                    },
                }),
            },
            ...(!isColorInherit && {
                [`@keyframes ${animationName}`]: forceRerenderAnimationStyle,
            }),
        },
    });
};

const mediaQueryMinS$1 = getMediaQueryMin('s');
const mediaQueryMaxS$2 = getMediaQueryMax('s');
const getBackgroundColor = (state, theme) => {
    const { infoSoftColor, successSoftColor, errorSoftColor, warningSoftColor } = getThemedColors(theme);
    const colorMap = {
        neutral: infoSoftColor, // deprecated
        info: infoSoftColor,
        warning: warningSoftColor,
        success: successSoftColor,
        error: errorSoftColor,
    };
    return colorMap[state];
};
const getNotificationRootJssStyle = (state, hasAction, hasClose, theme) => {
    return {
        // display: 'grid', // NOTE: display property is moved into component styled to not apply !important keyword
        // 2 columns for content and optional close button
        gridTemplateColumns: `minmax(auto, 1fr)${hasClose ? ' auto' : ''}`,
        gap: spacingStaticMedium,
        placeItems: 'start',
        padding: spacingStaticMedium,
        background: getBackgroundColor(state, theme),
        ...prefersColorSchemeDarkMediaQuery(theme, {
            background: getBackgroundColor(state, 'dark'),
        }),
        borderRadius: borderRadiusSmall,
        ...(isHighContrastMode && {
            outline: '1px solid transparent',
        }),
        [mediaQueryMinS$1]: {
            // 4 columns are for icon, content, optional action button and optional close button
            gridTemplateColumns: `auto minmax(auto, 1fr)${hasAction ? ' auto' : ''}${hasClose ? ' auto' : ''}`,
        },
    };
};
const getNotificationIconJssStyle = () => ({
    marginTop: '2px', // To be center aligned with close button
    [mediaQueryMaxS$2]: {
        display: 'none',
    },
});
const getNotificationContentJssStyle = () => ({
    display: 'grid',
    gap: spacingStaticXSmall,
    maxWidth: '50rem',
    marginTop: '2px', // To be center aligned with close button
    [mediaQueryMinS$1]: {
        marginLeft: `-${spacingStaticSmall}`,
    },
});

const mediaQueryMaxS$1 = getMediaQueryMax('s');
const getTextJssStyle = (theme) => ({
    margin: 0,
    color: getThemedColors(theme).primaryColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
        color: getThemedColors('dark').primaryColor,
    }),
});
const getHeadingJssStyle = (theme) => ({
    ...headingSmallStyle,
    ...getTextJssStyle(theme),
});
const getComponentCss$V = (state, hasAction, hasClose, theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'grid',
                ...addImportantToEachRule({
                    ...getNotificationRootJssStyle(state, hasAction, hasClose, theme),
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            [`::slotted(:is(${HEADING_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
            'slot[name="heading"]': getHeadingJssStyle(theme),
        },
        heading: getHeadingJssStyle(theme),
        description: {
            ...textSmallStyle,
            ...getTextJssStyle(theme),
        },
        icon: getNotificationIconJssStyle(),
        content: getNotificationContentJssStyle(),
        ...(hasAction && {
            action: {
                marginTop: borderWidthBase, // To visually align with close button
                [mediaQueryMaxS$1]: {
                    gridRowStart: 2,
                },
            },
        }),
        close: {
            ...dismissButtonJssStyle,
            mixBlendMode: isThemeDark(theme) ? 'plus-lighter' : 'multiply',
            ...prefersColorSchemeDarkMediaQuery(theme, {
                mixBlendMode: 'plus-lighter',
            }),
        },
    });
};

// CSS Variables defined in base input
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
const getComponentCss$U = (disabled, loading, hideLabel, state, compact, readOnly, theme) => {
    return getCss({
        ...getFunctionalComponentInputBaseStyles(disabled, loading, hideLabel, state, compact, readOnly, theme, {
            textOverflow: 'ellipsis',
            MozAppearance: 'textfield',
            '&::-webkit-calendar-picker-indicator': {
                display: 'none',
            },
        }),
        button: {
            padding: `var(${cssVarButtonPurePadding})`,
            margin: `var(${cssVarButtonPureMargin})`,
        },
    });
};

// CSS Variables defined in base input
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
const getComponentCss$T = (disabled, loading, hideLabel, state, compact, readOnly, theme) => {
    return getCss({
        ...getFunctionalComponentInputBaseStyles(disabled, loading, hideLabel, state, compact, readOnly, theme, {
            textOverflow: 'ellipsis',
            MozAppearance: 'textfield',
            '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
            },
        }),
        'sr-only': getHiddenTextJssStyle(),
    });
};

// CSS Variables defined in base input
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
const getComponentCss$S = (disabled, loading, hideLabel, state, compact, readOnly, theme, controls) => {
    return getCss({
        ...getFunctionalComponentInputBaseStyles(disabled, loading, hideLabel, state, compact, readOnly, theme, {
            textOverflow: 'ellipsis',
            MozAppearance: 'textfield',
            '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
            },
        }),
        ...(controls && {
            button: {
                padding: `var(${cssVarButtonPurePadding})`,
                margin: `var(${cssVarButtonPureMargin})`,
            },
        }),
    });
};

// CSS Variables defined in base input
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
const getComponentCss$R = (disabled, loading, hideLabel, state, toggle, compact, readOnly, theme) => {
    return getCss({
        ...getFunctionalComponentInputBaseStyles(disabled, loading, hideLabel, state, compact, readOnly, theme, {
            '&[type="text"]': {
                textOverflow: 'ellipsis',
            },
        }),
        ...(toggle && {
            button: {
                padding: `var(${cssVarButtonPurePadding})`,
                margin: `var(${cssVarButtonPureMargin})`,
            },
        }),
    });
};

// CSS Variables defined in base input
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
const getComponentCss$Q = (disabled, loading, hideLabel, state, compact, readOnly, theme, clear) => {
    return getCss({
        ...getFunctionalComponentInputBaseStyles(disabled, loading, hideLabel, state, compact, readOnly, theme, {
            textOverflow: 'ellipsis',
            '&[type="search"]::-webkit-search-cancel-button': {
                display: 'none',
            },
        }),
        ...(clear && {
            button: {
                padding: `var(${cssVarButtonPurePadding})`,
                margin: `var(${cssVarButtonPureMargin})`,
            },
        }),
    });
};

// CSS Variables defined in base input
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
const getComponentCss$P = (disabled, loading, hideLabel, state, compact, readOnly, theme) => {
    return getCss({
        ...getFunctionalComponentInputBaseStyles(disabled, loading, hideLabel, state, compact, readOnly, theme, {
            textOverflow: 'ellipsis',
            MozAppearance: 'textfield',
            '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
            },
        }),
        'sr-only': getHiddenTextJssStyle(),
    });
};

// CSS Variables defined in base input
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
const getComponentCss$O = (disabled, loading, hideLabel, state, compact, readOnly, theme, counter) => {
    return getCss({
        ...getFunctionalComponentInputBaseStyles(disabled, loading, hideLabel, state, compact, readOnly, theme, {
            textOverflow: 'ellipsis',
            MozAppearance: 'textfield',
            '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
            },
        }),
        ...(counter && {
            counter: {
                ...getUnitCounterJssStyle(disabled, readOnly, theme),
                cursor: 'text',
            },
        }),
        'sr-only': getHiddenTextJssStyle(),
    });
};

// CSS Variables defined in base input
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
const getComponentCss$N = (disabled, loading, hideLabel, state, compact, readOnly, theme) => {
    return getCss({
        ...getFunctionalComponentInputBaseStyles(disabled, loading, hideLabel, state, compact, readOnly, theme, {
            textOverflow: 'ellipsis',
            MozAppearance: 'textfield',
            '&::-webkit-calendar-picker-indicator': {
                display: 'none',
            },
        }),
        button: {
            padding: `var(${cssVarButtonPurePadding})`,
            margin: `var(${cssVarButtonPureMargin})`,
        },
    });
};

// CSS Variables defined in base input
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */
const getComponentCss$M = (disabled, loading, hideLabel, state, compact, readOnly, theme) => {
    return getCss({
        ...getFunctionalComponentInputBaseStyles(disabled, loading, hideLabel, state, compact, readOnly, theme, {
            textOverflow: 'ellipsis',
            MozAppearance: 'textfield',
            '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
            },
        }),
        'sr-only': getHiddenTextJssStyle(),
    });
};

const getComponentCss$L = (icon, iconSource, active, stretch, size, hideLabel, alignLabel, underline, hasSlottedAnchor, theme) => {
    return getCss(mergeDeep(getLinkButtonPureStyles(icon, iconSource, active, false, stretch, size, hideLabel, alignLabel, underline, hasSlottedAnchor, theme), hasSlottedAnchor && {
        '@global': addImportantToEachRule({
            '::slotted': {
                '&(a)': {
                    ...getResetInitialStylesForSlottedAnchor,
                    textDecoration: underline ? 'underline' : 'none',
                    font: 'inherit',
                    color: 'inherit',
                },
                // The clickable area for Safari < ~15 (<= release date: 2021-10-28) is reduced to the slotted anchor itself,
                // since Safari prior to this major release does not support pseudo-elements in the slotted context
                // (https://bugs.webkit.org/show_bug.cgi?id=178237)
                '&(a)::before': {
                    content: '""',
                    position: 'fixed',
                    insetBlock: offsetVertical,
                    borderRadius: borderRadiusSmall,
                    ...buildResponsiveStyles(hideLabel, (hideLabelValue) => ({
                        insetInline: hideLabelValue ? offsetVertical : offsetHorizontal,
                    })),
                },
                ...getFocusJssStyle(theme, { slotted: 'a', pseudo: true, offset: '-2px' }),
            },
        }),
    }));
};

const cssVariableInternalLinkScaling = '--p-internal-link-scaling';
const getComponentCss$K = (icon, iconSource, variant, hideLabel, hasSlottedAnchor, compact, theme) => {
    const { linkColor } = getHighContrastColors();
    const isPrimary = variant === 'primary';
    return getCss(mergeDeep(getLinkButtonStyles(icon, iconSource, variant, hideLabel, false, hasSlottedAnchor, compact, cssVariableInternalLinkScaling, theme), {
        label: {
            clip: addImportantToRule('unset'), // to overrule breakpoint customizable hide-label style
        },
        ...(isPrimary &&
            !isHighContrastMode && {
            icon: {
                filter: 'invert(1)',
            },
        }),
    }, hasSlottedAnchor && {
        ...(isHighContrastMode && {
            root: {
                borderColor: linkColor,
            },
        }),
        '@global': addImportantToEachRule({
            '::slotted': {
                '&(a)': {
                    ...getResetInitialStylesForSlottedAnchor,
                    textDecoration: 'none',
                    font: 'inherit',
                    color: 'inherit',
                },
                // The clickable area for Safari < ~15 (<= release date: 2021-10-28) is reduced to the slotted anchor itself,
                // since Safari prior to this major release does not support pseudo-elements in the slotted context
                // (https://bugs.webkit.org/show_bug.cgi?id=178237)
                '&(a)::before': {
                    content: '""',
                    position: 'fixed',
                    inset: variant === 'ghost' ? '0px' : '-2px', // Variant ghost has no border to compensate
                    borderRadius: borderRadiusSmall,
                },
                ...getFocusJssStyle(theme, { slotted: 'a', pseudo: true }),
            },
        }),
    }));
};

const getComponentCss$J = (aspectRatio, weight, // to get deprecated semibold typed
direction, hasDescription) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block', // `display: flex` would be more ideal, but doesn't work in Safari in all cases
                hyphens: 'auto', // TODO: shouldn't we expose a CSS variable instead?
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            slot: {
                '&:not([name])': {
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    transition: getTransition('transform', 'moderate'),
                },
                '&[name=primary]': {
                    pointerEvents: 'auto',
                },
                '&[name=secondary]': {
                    pointerEvents: 'auto',
                },
            },
            '::slotted(:is(img,picture,video))': addImportantToEachRule({
                display: 'block',
                width: '100%',
                height: '100%',
            }),
            '::slotted(:is(img,video))': addImportantToEachRule({
                objectFit: 'cover',
            }),
            a: {
                gridArea: '1/1/-1 /-1',
                zIndex: 4,
                outline: 0, // reset focus style since this element is used to improve mouse interaction only
            },
            'h1,h2,h3,h4,h5,h6': {
                margin: 0,
                zIndex: 3,
                maxWidth: '34.375rem',
                ...textLargeStyle,
                hyphens: 'inherit',
                color: getThemedColors('dark').primaryColor,
                ...buildResponsiveStyles(weight, (w) => ({ fontWeight: getFontWeight(w) })),
            },
            ...(hasDescription && {
                p: {
                    margin: '-12px 0 0 ',
                    zIndex: 3,
                    maxWidth: '34.375rem',
                    ...textSmallStyle,
                    color: getThemedColors('dark').primaryColor,
                    hyphens: 'inherit',
                },
            }),
        },
        root: {
            ...buildResponsiveStyles(aspectRatio, (aspectRatioValue) => ({
                aspectRatio: aspectRatioValue.replace(':', '/'), // mapping of the deprecated aspect-ratio with ':'
            })),
            width: '100%', // necessary in case tile content overflows in grid or flex context
            height: '100%', // necessary in case tile content overflows in grid or flex context
            display: 'grid',
            gridTemplate: `${spacingFluidMedium} auto minmax(0px, 1fr) auto ${spacingFluidMedium}/${spacingFluidMedium} minmax(0px, 1fr) ${spacingFluidMedium}`,
            '&::after': {
                content: '""',
                zIndex: 2,
                gridArea: '4/1/6/-1',
                ...gradientToTopStyle,
                marginTop: `calc(${spacingFluidLarge} * -1)`, // to increase the gradient area without reserving additional layout space
                borderEndStartRadius: borderRadiusLarge,
                borderEndEndRadius: borderRadiusLarge,
                ...forcedColorsMediaQuery({
                    background: 'rgba(0,0,0,0.7)',
                }),
            },
            ...hoverMediaQuery({
                '&:hover slot:not([name])': {
                    transform: 'scale3d(1.05,1.05,1.05)',
                },
            }),
        },
        header: {
            gridArea: '2/2',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: spacingFluidSmall,
        },
        media: {
            position: 'relative', // necessary if custom `position: absolute` style is added to media elements
            gridArea: '1/1/-1 /-1',
            zIndex: 1,
            overflow: 'hidden', // relevant for scaling of nested image
            borderRadius: borderRadiusLarge,
        },
        footer: {
            gridArea: '4/2',
            display: 'flex',
            gap: spacingStaticMedium,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexDirection: 'column',
        },
        'link-group': {
            zIndex: 5,
            display: 'flex',
            width: '100%',
            pointerEvents: 'none',
            gap: spacingFluidSmall,
            ...buildResponsiveStyles(direction, getGroupDirectionJssStyles),
        },
    });
};

const slottedAnchorSelector = `a[slot='${anchorSlot}']`;
const anchorJssStyle = {
    position: 'absolute',
    inset: 0,
    zIndex: 1, // necessary to be on top of img
    borderRadius: borderRadiusMedium,
};
const getMultilineEllipsis = (lineClamp) => {
    return {
        display: '-webkit-box',
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    };
};
const getComponentCss$I = (hasLikeButton, hasSlottedAnchor, hasPriceOriginal, hasDescription, aspectRatio, theme) => {
    const { primaryColor, contrastHighColor, contrastMediumColor, backgroundSurfaceColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, contrastHighColor: contrastHighColorDark, contrastMediumColor: contrastMediumColorDark, backgroundSurfaceColor: backgroundSurfaceColorDark, } = getThemedColors('dark');
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                position: 'relative', // needed for ::slotted(a) to overlay correctly
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            [`slot[name="${headerSlot}"]`]: {
                display: 'block', // to ensure correct like button positioning when slot is unused
            },
            ...addImportantToEachRule({
                '::slotted': {
                    ...(hasSlottedAnchor && {
                        [`&(${slottedAnchorSelector})`]: {
                            ...anchorJssStyle,
                            textIndent: '-999999px', // hide anchor label visually but still usable for a11y (only works in RTL-mode because of `overflow: hidden;` parent)
                        },
                        ...getFocusJssStyle(theme, { slotted: slottedAnchorSelector }),
                    }),
                    [`&([slot="${headerSlot}"])`]: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: spacingFluidXSmall,
                    },
                    '&(img), &(picture)': {
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: borderRadiusLarge,
                        overflow: 'hidden', // needed for picture > img to have correct border-radius
                    },
                },
            }),
            ...(hasPriceOriginal && {
                s: {
                    color: contrastMediumColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: contrastMediumColorDark,
                    }),
                },
            }),
        },
        root: {
            display: 'flex',
            flexDirection: 'column',
            aspectRatio: '3/4',
            overflow: 'hidden', // TODO: discussable if we should prevent text to overflow .root, – e.g. it also prevents a popover from being shown correctly
            boxSizing: 'border-box',
            borderRadius: borderRadiusMedium,
            padding: spacingFluidSmall,
            color: primaryColor,
            backgroundColor: backgroundSurfaceColor,
            ...buildResponsiveStyles(aspectRatio, (ratio) => ({
                aspectRatio: ratio.replace(':', '/'),
            })),
            ...prefersColorSchemeDarkMediaQuery(theme, {
                color: primaryColorDark,
                backgroundColor: backgroundSurfaceColorDark,
            }),
        },
        ...(!hasSlottedAnchor && {
            anchor: {
                ...anchorJssStyle,
                ...getFocusJssStyle(theme),
            },
        }),
        header: {
            display: 'flex',
            gap: spacingFluidSmall,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        ...(hasLikeButton && {
            button: {
                position: 'relative',
                zIndex: 2, // Necessary to be on top of anchor link
            },
        }),
        image: {
            aspectRatio: '8/9',
            margin: `${spacingFluidSmall} auto ${spacingFluidXSmall}`,
            overflow: 'hidden',
            transition: getTransition('transform', 'moderate'),
            [getMediaQueryMin('s')]: {
                padding: `0 ${spacingFluidMedium}`, // ensures image is not getting to large
            },
            ...hoverMediaQuery({
                '.root:hover &': {
                    transform: 'scale3d(1.05,1.05,1.05)',
                },
            }),
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            textAlign: 'center',
        },
        heading: {
            margin: '0 0 2px', // ua-style reset
            ...headingSmallStyle,
            ...fontHyphenationStyle,
            ...getMultilineEllipsis(3),
        },
        price: {
            margin: 0, // ua-style reset
            ...textXSmallStyle,
            ...(hasPriceOriginal && {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                columnGap: spacingFluidXSmall,
            }),
        },
        ...(hasDescription && {
            description: {
                margin: 0, // ua-style reset
                ...textXXSmallStyle,
                ...getMultilineEllipsis(2),
                color: contrastHighColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: contrastHighColorDark,
                }),
            },
        }),
        ...(hasPriceOriginal && {
            'sr-only': getHiddenTextJssStyle(),
        }),
    });
};

const getComponentCss$H = (aspectRatio, size, weight, // to get deprecated semibold typed
background, align, compact, hasGradient, isDisabled) => {
    const isTopAligned = align === 'top';
    return getCss({
        '@global': {
            ':host': {
                display: 'block', // `display: flex` would be more ideal, but doesn't work in Safari in all cases
                hyphens: 'auto', // TODO: shouldn't we expose a CSS variable instead?
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            slot: {
                display: 'block',
                '&:not([name])': {
                    width: '100%',
                    height: '100%',
                    transition: getTransition('transform', 'moderate'),
                },
                '&[name="header"]': {
                    gridArea: `${isTopAligned ? 4 : 2}/2`,
                    zIndex: 3,
                },
            },
            '::slotted(:is(img,picture,video))': addImportantToEachRule({
                display: 'block',
                width: '100%',
                height: '100%',
            }),
            '::slotted(:is(img,video))': addImportantToEachRule({
                objectFit: 'cover',
            }),
            a: {
                gridArea: '1/1/-1 /-1',
                zIndex: 4,
                outline: 0, // reset focus style since this element is used to improve mouse interaction only
            },
            p: {
                ...textMediumStyle,
                zIndex: 3,
                margin: 0, // reset ua-style
                maxWidth: '34.375rem',
                hyphens: 'inherit',
                ...mergeDeep(buildResponsiveStyles(size, (sizeValue) => ({
                    fontSize: getFontSizeText(sizeValue === 'default' ? 'medium' : sizeValue), // mapping of the deprecated size 'default'
                })), buildResponsiveStyles(weight, (weightValue) => ({
                    fontWeight: getFontWeight(weightValue === 'semibold' ? 'semi-bold' : weightValue), // mapping of the deprecated weight 'semibold'
                })), buildResponsiveStyles(background, (backgroundValue) => ({
                    color: getThemedColors(backgroundValue).primaryColor,
                }))),
            },
        },
        root: {
            ...buildResponsiveStyles(aspectRatio, (aspectRatioValue) => ({
                aspectRatio: aspectRatioValue.replace(':', '/'), // mapping of the deprecated aspect-ratio with ':'
            })),
            width: '100%', // necessary in case tile content overflows in grid or flex context
            height: '100%', // necessary in case tile content overflows in grid or flex context
            display: 'grid',
            gridTemplate: `${spacingFluidMedium} auto minmax(0px, 1fr) auto ${spacingFluidMedium}/${spacingFluidMedium} minmax(0px, 1fr) ${spacingFluidMedium}`,
            ...(hasGradient &&
                isThemeDark(background) && {
                '&::after': {
                    content: '""',
                    zIndex: 2,
                    ...(isTopAligned
                        ? {
                            gridArea: '1/1/3/-1',
                            ...gradientToBottomStyle,
                            marginBottom: `calc(${spacingFluidLarge} * -1)`, // to increase the gradient area without reserving additional layout space
                            borderStartStartRadius: borderRadiusLarge,
                            borderStartEndRadius: borderRadiusLarge,
                        }
                        : {
                            gridArea: '4/1/6/-1',
                            ...gradientToTopStyle,
                            marginTop: `calc(${spacingFluidLarge} * -1)`, // to increase the gradient area without reserving additional layout space
                            borderEndStartRadius: borderRadiusLarge,
                            borderEndEndRadius: borderRadiusLarge,
                        }),
                    ...forcedColorsMediaQuery({
                        background: 'rgba(0,0,0,0.7)',
                    }),
                },
            }),
            ...(hoverMediaQuery({
                    '&:hover slot:not([name])': {
                        transform: 'scale3d(1.05,1.05,1.05)',
                    },
                })),
        },
        media: {
            position: 'relative', // necessary if custom `position: absolute` style is added to media elements
            gridArea: '1/1/-1 /-1',
            zIndex: 1,
            overflow: 'hidden', // relevant for scaling of nested image
            borderRadius: borderRadiusLarge,
        },
        footer: {
            gridArea: `${isTopAligned ? 2 : 4}/2`,
            display: 'flex',
            gap: spacingStaticMedium,
            justifyContent: 'space-between',
            ...buildResponsiveStyles(compact, (compactValue) => compactValue
                ? {
                    alignItems: 'center',
                    flexDirection: 'row',
                }
                : {
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                }),
        },
        'link-or-button-pure': {
            zIndex: 5,
            ...buildResponsiveStyles(compact, (compactValue) => ({
                display: compactValue ? 'inline-block' : 'none',
            })),
        },
        'link-or-button': {
            minHeight: '54px', // prevent content shift
            zIndex: 5,
            ...buildResponsiveStyles(compact, (compactValue) => ({
                display: compactValue ? 'none' : 'inline-block',
            })),
        },
    });
};

const baseSizes = {
    small: {
        width: '100px',
        height: '60px',
    },
    medium: {
        width: '120px',
        height: '72px',
    },
};
const getComponentCss$G = (size) => {
    return getCss({
        '@global': {
            ':host': {
                position: 'relative',
                display: 'inline-flex',
                verticalAlign: 'top',
                ...addImportantToEachRule({
                    outline: 0,
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            a: {
                display: 'block',
                textDecoration: 'none',
                outline: 0,
                '&::before': {
                    // needs to be defined always to have correct custom click area
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '1px',
                },
                ...getFocusJssStyle('light', { pseudo: true }), // TODO: we need to support theme
            },
            picture: {
                display: 'block',
                ...(size === 'responsive'
                    ? {
                        ...baseSizes.small,
                        [getMediaQueryMin('l')]: baseSizes.medium,
                    }
                    : baseSizes[size]),
            },
            img: {
                display: 'block',
                width: '100%',
                height: 'auto',
            },
        },
    });
};

/**
 * @css-variable {"name": "--p-modal-width", "description": "Width of the modal.", "defaultValue": "auto"}
 * @css-variable {"name": "--p-modal-spacing-top", "description": "Spacing of the modal to the top.", "defaultValue": "clamp(16px, 10vh, 192px)"}
 * @css-variable {"name": "--p-modal-spacing-bottom", "description": "Spacing of the modal to the bottom.", "defaultValue": "clamp(16px, 10vh, 192px)"}
 */
const cssVariableWidth$1 = '--p-modal-width';
const cssVariableSpacingTop = '--p-modal-spacing-top'; // TODO: maybe --p-modal-spacing-block-start would be more precise?
const cssVariableSpacingBottom = '--p-modal-spacing-bottom'; // TODO: maybe --p-modal-spacing-block-end would be more precise?
const safeZoneVertical = `calc(${spacingFluidSmall} + ${spacingFluidMedium})`;
const safeZoneHorizontal = `${spacingFluidLarge}`;
const cssClassNameStretchToFullModalWidth = 'stretch-to-full-modal-width';
const getComponentCss$F = (isOpen, backdrop, fullscreen, hasDismissButton, hasHeader, hasFooter, theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...dialogHostJssStyle,
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            // TODO: why not available to Flyout too?
            // TODO: discussable if so many styles are a good thing, since we could also expose one or two CSS variables with which a stretch to full width is possible too
            '::slotted': addImportantToEachRule(mergeDeep({
                [`&(.${cssClassNameStretchToFullModalWidth})`]: {
                    display: 'block',
                    margin: `0 calc(${safeZoneHorizontal} * -1)`,
                    width: `calc(100% + calc(${safeZoneHorizontal} * 2))`,
                },
                ...(!hasHeader && {
                    [`&(.${cssClassNameStretchToFullModalWidth}:first-child)`]: {
                        marginBlockStart: `calc(${safeZoneVertical} * -1)`,
                    },
                }),
                ...(!hasFooter && {
                    [`&(.${cssClassNameStretchToFullModalWidth}:last-child)`]: {
                        marginBlockEnd: `calc(${safeZoneVertical} * -1)`,
                    },
                }),
            }, buildResponsiveStyles(fullscreen, (fullscreenValue) => ({
                [`&(.${cssClassNameStretchToFullModalWidth}:first-child)`]: {
                    borderTopLeftRadius: fullscreenValue ? 0 : borderRadiusMedium,
                    borderTopRightRadius: fullscreenValue ? 0 : borderRadiusMedium,
                },
                [`&(.${cssClassNameStretchToFullModalWidth}:last-child)`]: {
                    borderBottomLeftRadius: fullscreenValue ? 0 : borderRadiusMedium,
                    borderBottomRightRadius: fullscreenValue ? 0 : borderRadiusMedium,
                },
            })))),
            slot: {
                display: 'block',
                '&:first-of-type': {
                    gridRowStart: 1,
                },
                '&:not([name])': {
                    gridColumn: '2/3',
                    zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
                },
                ...(hasHeader && {
                    '&[name=header]': {
                        gridColumn: '2/3',
                        zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
                    },
                }),
                ...(hasFooter && {
                    '&[name=footer]': {
                        ...getDialogStickyAreaJssStyle('footer', theme),
                        gridColumn: '1/-1',
                        zIndex: 1, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
                    },
                }),
            },
            ...(hasHeader && {
                // TODO: we should either deprecate heading slot + pre-styled headings or implement it in flyout too
                [`slot[name=heading],${headingTags}`]: {
                    gridRowStart: 1,
                    gridColumn: '2/3',
                    zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
                    ...headingLargeStyle,
                    margin: 0, // relevant for shadowed h1,h2,h3,…
                },
                [`:is(${headingTags}) ~ slot:first-of-type`]: {
                    gridRowStart: 'auto',
                },
                [`::slotted([slot="heading"]:is(${headingTags}))`]: {
                    margin: 0, // ua-style (relevant for e.g. <h3 slot="heading"/>)
                },
            }),
            dialog: getDialogJssStyle(isOpen, theme, backdrop),
        },
        scroller: getScrollerJssStyle('fullscreen', theme),
        modal: {
            ...dialogGridJssStyle,
            ...getDialogColorJssStyle(theme),
            ...getDialogTransitionJssStyle(isOpen, '^'),
            // TODO: maybe we should deprecate the fullscreen property and force the modal to be fullscreen on mobile only
            ...buildResponsiveStyles(fullscreen, (fullscreenValue) => fullscreenValue
                ? {
                    width: 'auto',
                    minWidth: 'auto',
                    maxWidth: 'none',
                    placeSelf: 'stretch',
                    margin: 0,
                    borderRadius: 0,
                }
                : {
                    width: `var(${cssVariableWidth$1},auto)`,
                    minWidth: '276px', // to be in sync with "Porsche Grid" on viewport = 320px: calc(${gridColumnWidthBase} * 6 + ${gridGap} * 5)
                    maxWidth: '1535.5px', // to be in sync with "Porsche Grid" on viewport >= 1920px: `calc(${gridColumnWidthXXL} * 14 + ${gridGap} * 13)`
                    placeSelf: 'center',
                    margin: `var(${cssVariableSpacingTop},clamp(16px, 10vh, 192px)) ${gridExtendedOffsetBase} var(${cssVariableSpacingBottom},clamp(16px, 10vh, 192px))`, // horizontal margin is needed to ensure modal is placed on "Porsche Grid" when slotted content is wider than the viewport width
                    borderRadius: borderRadiusMedium,
                }),
        },
        ...(hasDismissButton && {
            dismiss: {
                ...dismissButtonJssStyle,
                gridArea: '1/3',
                zIndex: 2, // ensures dismiss button is above sticky footer, header and content
                position: 'sticky',
                insetBlockStart: spacingFluidSmall,
                marginBlockStart: `calc(${spacingFluidMedium} * -1)`,
                marginInlineEnd: spacingFluidSmall,
                placeSelf: 'flex-start flex-end',
            },
        }),
    });
};

const getSvgUrl = (model) => {
    return `${getCDNBaseURL()}/porsche-design-system/model-signatures/${MODEL_SIGNATURES_MANIFEST[model].src}`;
};

const cssVariableWidth = '--p-model-signature-width';
const cssVariableHeight = '--p-model-signature-height';
const cssVariableColor = '--p-model-signature-color';
const { canvasTextColor: canvasTextColor$1 } = getHighContrastColors();
const getThemedColor = (color, themedColors) => {
    const colorMap = {
        primary: themedColors.primaryColor,
        inherit: 'black',
        'contrast-low': themedColors.contrastLowColor,
        'contrast-medium': themedColors.contrastMediumColor,
        'contrast-high': themedColors.contrastHighColor,
    };
    return colorMap[color];
};
const getComponentCss$E = (model, safeZone, size, color, theme) => {
    const { width, height } = MODEL_SIGNATURES_MANIFEST[model];
    const isSizeInherit = size === 'inherit';
    return getCss({
        '@global': {
            ':host': {
                display: 'inline-block',
                verticalAlign: 'top',
                maxWidth: '100%',
                maxHeight: '100%',
                // width + height style can't be !important atm to be backwards compatible with e.g. `<p-model-signature size="inherit" style="height: 50px"/>`
                width: `var(${cssVariableWidth},${isSizeInherit ? 'auto' : `${width}px`})`,
                height: `var(${cssVariableHeight},auto)`,
                ...addImportantToEachRule({
                    mask: `url(${getSvgUrl(model)}) no-repeat left top / contain`,
                    aspectRatio: `${width} / ${safeZone ? 36 : height}`, // 36px is the max-height for SVG model signature creation
                    background: `var(${cssVariableColor},${getThemedColor(color, getThemedColors(theme))})`,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        background: `var(${cssVariableColor},${getThemedColor(color, getThemedColors('dark'))})`,
                    }),
                    ...forcedColorsMediaQuery({
                        background: canvasTextColor$1,
                    }),
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            '::slotted(:is(img,video))': addImportantToEachRule({
                display: 'block', // prevents unintended bottom white-space
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }),
            // the <img /> is only needed for a11y compliance because of alt text and to handle the fetch priority
            img: {
                position: 'absolute', // prevents unintended bottom white-space
                opacity: 0,
                width: '1px',
                height: '1px',
            },
        },
    });
};

const cssVarInternalMultiSelectOptionScaling = '--p-internal-multi-select-option-scaling';
const getComponentCss$D = (theme, isDisabled, selected) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    scrollMarginBlockStart: `calc(max(2px, var(${cssVarInternalMultiSelectOptionScaling}, 1) * 6px) + 36px)`, // 36px input height + 6px padding
                    scrollMarginBlockEnd: `max(2px, var(${cssVarInternalMultiSelectOptionScaling}, 1) * 6px)`, // Aligns option when list is scrolled by navigating with keyboard
                    ...hostHiddenStyles,
                    [`${cssVarInternalCheckboxScaling}`]: `var(${cssVarInternalMultiSelectOptionScaling})`,
                }),
            },
            slot: {
                display: 'block',
            },
        },
        option: getOptionJssStyle('multi-select-option', `var(${cssVarInternalMultiSelectOptionScaling}, 1)`, theme),
        'checkbox-wrapper': {
            fontFamily: fontFamily,
            fontSize: fontSizeTextSmall,
            height: fontLineHeight,
            display: 'flex',
            alignItems: 'center',
        },
        checkbox: {
            flexShrink: 0,
            ...getCheckboxBaseStyles(theme, isDisabled),
            ...(selected && getCheckboxCheckedBaseStyles(theme, isDisabled)),
        },
    });
};

const cssVarInternalOptgroupScaling = '--p-internal-optgroup-scaling';
const scalingVar = `var(${cssVarInternalOptgroupScaling}, 1)`;
const getComponentCss$C = (isDisabled, theme) => {
    const { primaryColor, disabledColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, disabledColor: disabledColorDark } = getThemedColors('dark');
    const padding = `max(2px, ${scalingVar} * ${spacingStaticSmall}) max(4px, ${scalingVar} * 12px)`;
    const gap = `max(2px, ${scalingVar} * ${spacingStaticSmall})`;
    return getCss({
        '@global': {
            ':host': addImportantToEachRule({
                ...colorSchemeStyles,
                ...hostHiddenStyles,
            }),
            '::slotted(*)': {
                '--p-internal-select-option-padding-left': '28px',
                '--p-internal-multi-select-option-padding-left': '28px',
            },
            '[role="group"]': {
                display: 'flex',
                flexDirection: 'column',
                gap,
            },
            '[role="presentation"]': {
                padding,
                font: textXSmallStyle.font.replace(' 400 ', ` ${fontWeightSemiBold} `),
                color: primaryColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: primaryColorDark,
                }),
                ...(isDisabled && {
                    color: disabledColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: disabledColorDark,
                    }),
                }),
            },
        },
    });
};

const cssVarInternalMultiSelectScaling = '--p-internal-multi-select-scaling';
const getComponentCss$B = (isOpen, isDisabled, hideLabel, state, compact, theme) => {
    const scalingVar = `var(${cssVarInternalMultiSelectScaling}, ${compact ? 0.5 : 1})`;
    return getCss({
        '@global': {
            // @keyframes fade-in
            ...getPopoverKeyframesStyles,
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                    [`${cssVarInternalMultiSelectOptionScaling}`]: scalingVar,
                    [`${cssVarInternalOptgroupScaling}`]: scalingVar,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            button: {
                ...getButtonJssStyle('multi-select', isOpen, isDisabled, state, scalingVar, theme),
                '& span': getButtonLabelJssStyle,
            },
            '[popover]': getPopoverJssStyle(isOpen, scalingVar, 44, theme),
        },
        root: {
            display: 'grid',
            gap: `max(2px, ${scalingVar} * ${spacingStaticXSmall})`,
            // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
            minWidth: `calc(1rem + ${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(2)})`,
        },
        filter: getFilterJssStyle(scalingVar, theme),
        options: getOptionsJssStyle(scalingVar),
        icon: getIconJssStyle('multi-select', isOpen),
        // .no-results / .sr-only
        ...getFunctionalComponentNoResultsOptionStyles('multi-select-option', scalingVar, theme),
        // .label / .required
        ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
        // .message
        ...getFunctionalComponentStateMessageStyles(theme, state),
    });
};

const mediaQueryMinS = getMediaQueryMin('s');
const mediaQueryMaxS = getMediaQueryMax('s');
// button size needs to be fluid between 320px and 360px viewport width, so that the pagination fits into 320px viewport
// and text scale 200% works (almost) on mobile viewports too
const buttonSize = `clamp(36px, calc(${fontLineHeight} + 10vw - 20px), 40px)`;
const disabledCursorStyle = {
    cursor: 'default',
    pointerEvents: 'none', // prevents :hover (has no effect when forced), maybe we can remove it since CSS selectors already cover desired behavior
};
const hiddenStyle = { display: 'none' };
const getComponentCss$A = (activePage, pageTotal, showLastPage, theme) => {
    const { primaryColor, disabledColor, hoverColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, disabledColor: disabledColorDark, hoverColor: hoverColorDark, } = getThemedColors('dark');
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            nav: {
                display: 'flex',
                justifyContent: 'center',
                userSelect: 'none',
            },
            ul: {
                display: 'flex',
                gap: spacingStaticXSmall,
                margin: 0,
                padding: 0,
                [mediaQueryMinS]: {
                    gap: spacingStaticSmall,
                },
            },
            li: {
                listStyleType: 'none',
                ...(pageTotal > 5 && {
                    // max 5 items including ellipsis at the same time on mobile
                    [mediaQueryMaxS]: {
                        [activePage < 4
                            ? // we are at the start, so let's hide start ellipsis and 2 items before end ellipsis
                                '&.ellip-start,&:nth-child(6),&:nth-child(7),&:not(.ellip):nth-child(8)'
                            : pageTotal - activePage < 3
                                ? // we are at the end, so let's hide end ellipsis and 2 items after start ellipsis
                                    '&.ellip-end, &.ellip-start + &:not(.current), &.ellip-start + &:not(.current) + &:not(.current)'
                                : // we are at in the middle, so let's hide elements after start and before end ellipsis
                                    '&.ellip-start + &:not(.current), &.current-1, &.current\\+1, &.current\\+1 + &:not(.ellip)']: hiddenStyle,
                        // without last page we need to adjust end page handling
                        ...(!showLastPage &&
                            (pageTotal - activePage < 2
                                ? { [`&.current-2${pageTotal - activePage === 1 ? ',&.current-1' : ''}`]: hiddenStyle }
                                : activePage > 2 && {
                                    '&.current\\+1,&.current\\+2': hiddenStyle,
                                    '&.ellip-end': { display: 'initial' },
                                })),
                    },
                }),
                [mediaQueryMinS]: {
                    // prev
                    '&:first-child': { marginInlineEnd: spacingStaticSmall },
                    // next
                    '&:last-child': { marginInlineStart: spacingStaticSmall },
                    ...(pageTotal < 8
                        ? { '&.ellip': hiddenStyle }
                        : // max 7 items including ellipsis at the same time on tablet
                            {
                                // we are at the start, so let's hide start ellipsis
                                ...(activePage <= 4 && { '&.ellip-start': hiddenStyle }),
                                // we are at the end, so let's hide end ellipsis
                                ...(pageTotal - activePage < 4 && { '&.ellip-end:nth-last-child(3)': hiddenStyle }),
                                // we are at the end without last page, so let's hide end ellipsis
                                ...(pageTotal - activePage < 3 && { '&.ellip-end:nth-last-child(2)': hiddenStyle }),
                            }),
                },
            },
            span: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transition between states
                position: 'relative',
                width: buttonSize,
                height: buttonSize,
                boxSizing: 'border-box',
                ...textSmallStyle,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                color: primaryColor,
                borderRadius: borderRadiusSmall,
                borderColor: 'transparent', // default value is needed for smooth transition
                outline: 0, // TODO: only relevant for VRT testing with forced states - prevents :focus style
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: primaryColorDark,
                }),
                ...hoverMediaQuery({
                    '&:not([aria-disabled]):not(.ellipsis):hover': {
                        ...frostedGlassStyle,
                        background: hoverColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            background: hoverColorDark,
                        }),
                    },
                }),
                '&[aria-current]': {
                    ...disabledCursorStyle,
                    color: primaryColor,
                    border: `${borderWidthBase} solid ${primaryColor}`,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: primaryColorDark,
                        borderColor: primaryColorDark,
                    }),
                },
                '&[aria-disabled]': {
                    ...disabledCursorStyle,
                    color: disabledColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: disabledColorDark,
                    }),
                },
                // TODO :not(.ellipsis) is only needed for VRT states tests to work properly
                '&:not(.ellipsis)': getFocusJssStyle(theme),
            },
        },
        ellipsis: {
            ...disabledCursorStyle,
            '&::after': {
                content: '"…"',
            },
        },
    });
};

const removeSlottedSelector = (styles) => Object.fromEntries(Object.entries(styles).map(([key, value]) => {
    value = typeof value === 'object' ? removeSlottedSelector(value) : value;
    return [key.replace(/::slotted\(([^,]+)\)/g, '$1'), value];
}));
const removeStyles = (selector, styles) => Object.fromEntries(Object.entries(styles)
    .filter(([key]) => key !== selector)
    .map(([key, value]) => {
    value = typeof value === 'object' ? removeStyles(selector, value) : value;
    return [key, value];
}));

const getComponentCss$z = (hideLabel, state, isDisabled, isLoading, length, theme) => {
    const inputSize = `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`; // equivalent to calculation of input height within form-styles
    const inputStyles = removeStyles('input[readonly]', removeSlottedSelector(getSlottedTextFieldTextareaSelectStyles('input', state, isLoading, theme, {
        // TODO: move into getSlottedTextFieldTextareaSelectStyles()
        padding: `${formElementPaddingVertical} ${spacingStaticXSmall}`,
        // TODO: move into getSlottedTextFieldTextareaSelectStyles() via parameter, e.g. textAlign=center|start
        textAlign: 'center',
        // TODO: move into getSlottedTextFieldTextareaSelectStyles() via parameter, e.g. size=max|min
        maxWidth: inputSize,
        // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least.
        minWidth: `calc(1rem + ${borderWidthBase}*2 + ${spacingStaticSmall}*2)`,
        ...(length > 4 && {
            [getMediaQueryMax('xs')]: {
                // TODO: instead of having dedicated css rules depending on length we should try to implement a fluid one fits all solution
                maxWidth: 'auto',
                width: `calc((276px - (${spacingStaticSmall} * ${length - 1})) / ${length})`, // calculate the max with of the inputs that fit into grid in viewport base (276px)
            },
        }),
        // TODO: move into getSlottedTextFieldTextareaSelectStyles() via parameter, e.g. isLoading
        ...(isLoading && {
            opacity: 0.2, // TODO: not in sync with e.g. checkbox/radio-button loading style
            cursor: 'not-allowed',
        }),
        // since @playwright/test@1.40.1 this does not work anymore in Webkit browser engine for unknown reasons
        /* ...Object.fromEntries(
          Array.from(Array(length)).map((_, i) => {
            return [`&:nth-of-type(${i + 1})`, { gridArea: `1/${i + 1}` }];
          })
        ),*/
        '&:nth-of-type(1)': { gridArea: '1/1' },
        '&:nth-of-type(2)': { gridArea: '1/2' },
        '&:nth-of-type(3)': { gridArea: '1/3' },
        '&:nth-of-type(4)': { gridArea: '1/4' },
        '&:nth-of-type(5)': { gridArea: '1/5' },
        '&:nth-of-type(6)': { gridArea: '1/6' },
    })));
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            // input
            ...inputStyles,
        },
        root: {
            display: 'grid',
            gap: spacingStaticXSmall,
        },
        wrapper: {
            display: 'grid',
            gridTemplateColumns: `repeat(${length}, minmax(auto, 1fr))`,
            justifySelf: 'flex-start',
            gap: spacingStaticSmall,
        },
        ...(isLoading && {
            spinner: {
                gridArea: '1/1/1/-1',
                placeSelf: 'center',
                width: inputSize,
                height: inputSize,
                pointerEvents: 'none',
            },
        }),
        // .label / .required
        ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
        // .message
        ...getFunctionalComponentStateMessageStyles(theme, state),
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
    });
};

const POPOVER_SAFE_ZONE = 8;

const { canvasTextColor } = getHighContrastColors();
const getComponentCss$y = (theme) => {
    const { hoverColor, backgroundColor, primaryColor, backgroundSurfaceColor } = getThemedColors(theme);
    const { hoverColor: hoverColorDark, primaryColor: primaryColorDark, backgroundSurfaceColor: backgroundSurfaceColorDark, } = getThemedColors('dark');
    const shadowColor = 'rgba(0,0,0,0.3)';
    return getCss({
        '@global': {
            '@keyframes fade-in': {
                from: {
                    opacity: 0,
                },
                to: {
                    opacity: 1,
                },
            },
            ':host': {
                position: 'relative', // ensures correct reference for floating ui fallback positioning in older browsers
                display: 'inline-block',
                verticalAlign: 'top',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            'slot[name="button"]': {
                display: 'block',
            },
            ...preventFoucOfNestedElementsStyles,
            p: {
                ...textSmallStyle,
                margin: 0,
            },
            button: {
                all: 'unset',
                display: 'block',
                font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width/height definition based on ex-unit
                width: fontLineHeight, // width needed to improve ssr support
                height: fontLineHeight, // height needed to improve ssr support
                borderRadius: '50%',
                cursor: 'pointer',
                ...hoverMediaQuery({
                    transition: getTransition('background-color'),
                    '&:hover': {
                        ...frostedGlassStyle,
                        backgroundColor: hoverColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            backgroundColor: hoverColorDark,
                        }),
                    },
                }),
                ...getFocusJssStyle(theme, { offset: 0 }),
            },
            '[popover]': {
                all: 'unset',
                position: 'absolute',
                pointerEvents: 'none',
                filter: `drop-shadow(0 0 16px ${shadowColor})`,
                backdropFilter: 'drop-shadow(0 0 transparent)', // workaround for Firefox bug not rendering PDS frosted glass correctly when nested inside CSS filter: https://bugzilla.mozilla.org/show_bug.cgi?id=1797051
                animation: `var(${cssVariableAnimationDuration}, ${motionDurationShort}) fade-in ${motionEasingBase} forwards`,
                '&:not(:popover-open)': {
                    display: 'none', // ensures popover is not flickering when closed in some situations
                },
            },
        },
        label: getHiddenTextJssStyle(),
        icon: {
            transform: 'translate3d(0,0,0)', // Fixes movement on hover in Safari
        },
        arrow: {
            position: 'absolute',
            width: '24px',
            height: '12px',
            clipPath: 'polygon(50% 0, 100% 110%, 0 110%)',
            ...(isHighContrastMode
                ? {
                    background: canvasTextColor,
                }
                : {
                    background: isThemeDark(theme) ? backgroundSurfaceColor : backgroundColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        background: backgroundSurfaceColorDark,
                    }),
                }),
        },
        content: {
            maxWidth: `min(calc(100dvw - ${POPOVER_SAFE_ZONE * 2}px), 48ch)`,
            width: 'max-content', // ensures in older browsers correct width
            boxSizing: 'border-box',
            padding: `${spacingStaticSmall} ${spacingStaticMedium}`,
            pointerEvents: 'auto',
            borderRadius: borderRadiusSmall,
            ...(isHighContrastMode && {
                outline: `1px solid ${canvasTextColor}`,
            }),
            ...textSmallStyle,
            background: isThemeDark(theme) ? backgroundSurfaceColor : backgroundColor,
            color: primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                background: backgroundSurfaceColorDark,
                color: primaryColorDark,
            }),
        },
    });
};

const getCheckedSVGBackgroundImage = (fill) => {
    return getInlineSVGBackgroundImage(`<circle fill="${fill}" cx="12" cy="12" r="6"/>`);
};
const getComponentCss$x = (hideLabel, state, isDisabled, isLoading, theme) => {
    const checkedIconColor = escapeHashCharacter(getInvertedThemedColors(theme).primaryColor);
    const checkedIconColorDark = escapeHashCharacter(getInvertedThemedColors('dark').primaryColor);
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            // ::slotted(input)
            ...addImportantToEachRule(mergeDeep(getSlottedCheckboxRadioButtonStyles(state, isDisabled, isLoading, theme), {
                '::slotted': {
                    '&(input)': {
                        gridArea: '1/1',
                        borderRadius: '50%',
                    },
                    // TODO: is it somehow useful possible to make following styles configurable by paramter?
                    ...(!isLoading && {
                        '&(input:checked)': {
                            backgroundImage: getCheckedSVGBackgroundImage(checkedIconColor),
                            ...prefersColorSchemeDarkMediaQuery(theme, {
                                backgroundImage: getCheckedSVGBackgroundImage(checkedIconColorDark),
                            }),
                            // This is a workaround for Blink based browsers, which do not reflect the high contrast system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
                            ...(isHighContrastMode &&
                                getSchemedHighContrastMediaQuery({
                                    backgroundImage: getCheckedSVGBackgroundImage('white'),
                                }, {
                                    backgroundImage: getCheckedSVGBackgroundImage('black'),
                                })),
                        },
                    }),
                },
            })),
        },
        root: {
            display: 'grid',
            gridTemplateColumns: 'auto minmax(0, 1fr)',
            rowGap: spacingStaticXSmall,
        },
        wrapper: {
            display: 'grid',
            gridArea: '1/1',
            alignSelf: 'flex-start', // in case label becomes multiline
            ...(isDisabledOrLoading(isDisabled, isLoading) && {
                // TODO: maybe .wrapper should handle it for all form components while pointer-events: none is set to input
                cursor: 'not-allowed',
            }),
        },
        ...(isLoading && {
            // TODO: extract for checkbox-wrapper and radio-button-wrapper (not gridArea and placeSelf)
            spinner: {
                position: 'relative', // ensure correct stacking, can be removed as soon as focus for input is handled with outline
                gridArea: '1/1',
                placeSelf: 'center',
                width: fontLineHeight,
                height: fontLineHeight,
                font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
                pointerEvents: 'none',
            },
        }),
        // .label / .required
        ...getFunctionalComponentLabelStyles(isDisabled || isLoading, hideLabel, theme, {
            gridArea: '1/2',
        }, {
            paddingTop: '2px', // compensate vertical alignment
            paddingInlineStart: spacingStaticSmall, // asymmetric padding used instead of gap to prevent not clickable area between label and input
        }),
        // .message
        ...getFunctionalComponentStateMessageStyles(theme, state, {
            gridColumn: '1/3',
        }),
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
    });
};

const prevNextWrapperWidth = `calc(${fontLineHeight} + 24px)`;
const getComponentCss$w = (isNextHidden, isPrevHidden, alignScrollIndicator, hasScrollbar, theme) => {
    const actionPrevNextStyles = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        direction: 'ltr',
        width: prevNextWrapperWidth,
        padding: '4px 0',
        display: 'flex',
        alignItems: alignScrollIndicator === 'center' ? 'center' : 'flex-start',
    };
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    height: 'inherit',
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
        },
        root: {
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `${prevNextWrapperWidth} minmax(0, 1fr) ${prevNextWrapperWidth}`,
            margin: '0 -4px',
            height: 'inherit',
        },
        'scroll-area': {
            gridArea: '1 / 1 / 1 / -1',
            padding: '4px',
            overflow: 'auto hidden',
            ...((!isPrevHidden || !isNextHidden) && {
                mask: isNextHidden
                    ? 'linear-gradient(90deg,#0000 8px,#000 40px) alpha'
                    : isPrevHidden
                        ? 'linear-gradient(90deg,#000 calc(100% - 40px), #0000 calc(100% - 8px)) alpha'
                        : 'linear-gradient(90deg,#0000 8px,#000 40px calc(100% - 40px),#0000 calc(100% - 8px)) alpha',
            }),
            ...(!hasScrollbar && {
                // If scrollbar is disabled - hide scrollbar
                msOverflowStyle: 'none' /* IE and Edge */,
                scrollbarWidth: 'none' /* Firefox */,
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }),
        },
        // Extra wrapper needed to compensate different offset parent calculation depending on browser.
        // Needed for position of status bar.
        'scroll-wrapper': {
            position: 'relative',
            display: 'inline-flex',
            minHeight: '28px',
            minWidth: '100%',
            verticalAlign: 'top',
            borderRadius: borderRadiusSmall,
            ...getFocusJssStyle(theme),
        },
        trigger: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '1px',
            visibility: 'hidden',
            '&:first-of-type': {
                left: 0,
            },
            '&:last-of-type': {
                right: 0,
            },
        },
        'action-prev': {
            ...actionPrevNextStyles,
            left: '-1px', // ensures that the gradient always overlays the content (e.g. when zoomed)
            justifyContent: 'flex-start',
            visibility: isPrevHidden ? 'hidden' : 'inherit',
            '& .action-button': {
                marginLeft: '8px',
                // hide buttons on mobile (actually devices not supporting hover)
                ...hoverMediaQuery({
                    visibility: isPrevHidden ? 'hidden' : 'inherit',
                }),
            },
        },
        'action-next': {
            ...actionPrevNextStyles,
            right: '-1px', // ensures that the gradient always overlays the content (e.g. when zoomed)
            justifyContent: 'flex-end',
            visibility: isNextHidden ? 'hidden' : 'inherit',
            '& .action-button': {
                marginRight: '8px',
                // hide buttons on mobile (actually devices not supporting hover)
                ...hoverMediaQuery({
                    visibility: isNextHidden ? 'hidden' : 'inherit',
                }),
            },
        },
        'action-button': {
            ...dismissButtonJssStyle,
            ...(!isThemeDark(theme) && dropShadowLowStyle),
        },
        icon: {
            '&:dir(rtl)': {
                transform: 'scaleX(-1)',
            },
        },
    });
};

const ITEM_PADDING = '17px';
const { font: BUTTON_FONT } = textSmallStyle;
const ICON_SIZE = '1.5rem';
const ICON_MARGIN = '.25rem';
const getColors$2 = (isDisabled, isSelected, theme) => {
    const { primaryColor, contrastMediumColor, disabledColor, contrastLowColor } = getThemedColors(theme);
    const { highlightColor } = getHighContrastColors();
    return {
        buttonColor: isDisabled ? disabledColor : primaryColor,
        labelColor: isDisabled ? disabledColor : contrastMediumColor,
        borderColor: isSelected
            ? isDisabled
                ? disabledColor
                : isHighContrastMode
                    ? highlightColor
                    : primaryColor
            : contrastLowColor,
        hoverBorderColor: primaryColor,
    };
};
const getItemPadding = (hasIconAndSlottedContent) => hasIconAndSlottedContent ? `13px ${ITEM_PADDING} 13px 13px` : `13px ${ITEM_PADDING}`;
const getComponentCss$v = (isDisabled, isSelected, hasIcon, hasSlottedContent, theme) => {
    const { buttonColor, labelColor, borderColor, hoverBorderColor } = getColors$2(isDisabled, isSelected, theme);
    const { buttonColor: buttonColorDark, labelColor: labelColorDark, borderColor: borderColorDark, hoverBorderColor: hoverBorderColorDark, } = getColors$2(isDisabled, isSelected, 'dark');
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    outline: 0,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            // All width relevant styling has to be kept in sync with the tempDiv of the p-segmented-control utils
            button: {
                position: 'relative',
                display: 'block',
                height: '100%',
                width: '100%',
                padding: getItemPadding(hasIcon && hasSlottedContent),
                margin: 0, // Removes default button margin on safari 15
                border: `${borderWidthBase} solid ${borderColor}`,
                borderRadius: borderRadiusSmall,
                background: 'transparent',
                color: buttonColor,
                ...textSmallStyle,
                ...(isDisabled
                    ? {
                        cursor: 'not-allowed',
                    }
                    : {
                        cursor: 'pointer',
                        ...(!isSelected &&
                            hoverMediaQuery({
                                transition: getTransition('border-color'),
                                '&:hover': {
                                    borderColor: hoverBorderColor,
                                    ...prefersColorSchemeDarkMediaQuery(theme, {
                                        borderColor: hoverBorderColorDark,
                                    }),
                                },
                            })),
                    }),
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    borderColor: borderColorDark,
                    color: buttonColorDark,
                }),
                ...getFocusJssStyle(theme),
            },
            // label
            span: {
                display: 'block',
                ...textXSmallStyle,
                overflowWrap: 'normal',
                color: labelColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: labelColorDark,
                }),
            },
        },
        ...(hasIcon && {
            icon: {
                height: ICON_SIZE,
                width: ICON_SIZE,
                ...(hasSlottedContent && {
                    marginInlineEnd: ICON_MARGIN,
                }),
            },
        }),
    });
};
const getComponentCss$u = (maxWidth, columns) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'grid',
                ...addImportantToEachRule({
                    gridAutoRows: '1fr', // for equal height
                    ...buildResponsiveStyles(columns, (col) => ({
                        gridTemplateColumns: col === 'auto'
                            ? `repeat(auto-fit, ${maxWidth}px)`
                            : `repeat(${col}, minmax(0, 1fr))`,
                    })),
                    gap: '6px',
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
        },
    });
};

const getButtonStyles = (isOpen, state, theme) => {
    const { primaryColor, disabledColor, contrastMediumColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, disabledColor: disabledColorDark, contrastMediumColor: contrastMediumColorDark, } = getThemedColors('dark');
    const { formStateHoverColor, formStateColor } = getThemedFormStateColors(theme, state);
    const { formStateHoverColor: formStateHoverColorDark, formStateColor: formStateColorDark } = getThemedFormStateColors('dark', state);
    return {
        '@global': {
            // TODO: extract generic default button/anchor reset style
            button: {
                position: 'absolute',
                inset: 0,
                width: '100%', // fixes Firefox positioning issue
                height: '100%', // fixes Firefox positioning issue
                margin: 0,
                padding: 0,
                background: 'transparent',
                border: `${borderWidthBase} solid ${isOpen ? primaryColor : formStateColor || contrastMediumColor}`, // using border of styled select below for label:hover selector
                borderRadius: borderRadiusSmall,
                outline: '0',
                cursor: 'pointer',
                transition: getTransition('border-color'), // background and text color are handled on select
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    borderColor: isOpen ? primaryColorDark : formStateColorDark || contrastMediumColorDark,
                }),
                '&:disabled': {
                    cursor: 'not-allowed',
                    borderColor: disabledColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        borderColor: disabledColorDark,
                    }),
                },
                ...hoverMediaQuery({
                    '&:not(:disabled):hover': {
                        borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            borderColor: isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark,
                        }),
                    },
                }),
                ...getFocusJssStyle(theme),
            },
        },
    };
};
const getFilterStyles = (isOpen, state, disabled, theme) => {
    const { primaryColor, backgroundColor, disabledColor, contrastMediumColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark, disabledColor: disabledColorDark, contrastMediumColor: contrastMediumColorDark, } = getThemedColors('dark');
    const { formStateHoverColor, formStateColor } = getThemedFormStateColors(theme, state);
    const { formStateHoverColor: formStateHoverColorDark, formStateColor: formStateColorDark } = getThemedFormStateColors('dark', state);
    const placeHolderJssStyle = {
        opacity: 1,
        color: disabled ? disabledColor : primaryColor,
    };
    const placeHolderDarkJssStyle = {
        opacity: 1,
        color: disabled ? disabledColorDark : primaryColorDark,
    };
    return {
        '@global': {
            input: {
                display: 'block',
                position: 'absolute',
                inset: borderWidthBase,
                width: 'calc(100% - 4px)', // fixes Firefox positioning issue, 4px = 2 x borderWidthBase
                height: 'calc(100% - 4px)', // fixes Firefox positioning issue, 4px = 2 x borderWidthBase
                zIndex: 1,
                font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is alig
                margin: 0, // necessary reset for iOS Safari 15 (and maybe other browsers)
                // TODO: could be done with css subgrid much more elegant in the near future
                //  or move input into select-wrapper and handle it the same like multi-select
                padding: `${formElementPaddingVertical} ${formElementPaddingHorizontal}`,
                paddingInlineEnd: getCalculatedFormElementPaddingHorizontal(1),
                outline: '0',
                WebkitAppearance: 'none', // iOS safari
                appearance: 'none',
                boxSizing: 'border-box',
                border: '0', // done via span
                borderRadius: borderRadiusSmall, // for white corners
                opacity: 0, // is used to overlay input on focus
                ...textSmallStyle,
                textIndent: 0,
                cursor: disabled ? 'not-allowed' : 'text',
                color: primaryColor,
                background: backgroundColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: primaryColorDark,
                    background: backgroundColorDark,
                }),
                '&::placeholder': {
                    ...placeHolderJssStyle,
                    ...prefersColorSchemeDarkMediaQuery(theme, placeHolderDarkJssStyle),
                },
                '&::-webkit-input-placeholder': {
                    ...placeHolderJssStyle,
                    ...prefersColorSchemeDarkMediaQuery(theme, placeHolderDarkJssStyle),
                },
                '&::-moz-placeholder': {
                    ...placeHolderJssStyle,
                    ...prefersColorSchemeDarkMediaQuery(theme, placeHolderDarkJssStyle),
                },
                '&:not(:disabled):focus': {
                    opacity: 1, // to display value while typing
                    '&+span, &~ ul': {
                        borderColor: primaryColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            borderColor: primaryColorDark,
                        }),
                    },
                },
                ...hoverMediaQuery({
                    '&:not(:disabled)': {
                        '&+span:hover': {
                            borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
                            ...prefersColorSchemeDarkMediaQuery(theme, {
                                borderColor: isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark,
                            }),
                        },
                        '&:hover': {
                            '&+span, &~ul': {
                                borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
                                ...prefersColorSchemeDarkMediaQuery(theme, {
                                    borderColor: isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark,
                                }),
                            },
                        },
                    },
                }),
                // TODO: we should try to get rid of the span and apply the border-styles on either select or input
                '&+span': {
                    // for focus outline and clicking arrow since input ends left of the icon
                    position: 'absolute',
                    inset: 0,
                    transition: getTransition('border-color'),
                    pointerEvents: 'all',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    border: `${borderWidthBase} solid ${isOpen ? primaryColor : formStateColor || contrastMediumColor}`,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        borderColor: isOpen ? primaryColorDark : formStateColorDark || contrastMediumColorDark,
                    }),
                    borderRadius: borderRadiusSmall,
                },
            },
        },
    };
};
const getListStyles = (isOpen, theme) => {
    const { primaryColor, disabledColor, hoverColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, disabledColor: disabledColorDark, hoverColor: hoverColorDark, } = getThemedColors('dark');
    const { highlightColor } = getHighContrastColors();
    return {
        '@global': {
            // @keyframes fade-in
            ...getPopoverKeyframesStyles,
            '[popover]': getPopoverJssStyle(isOpen, 1, 40, theme),
        },
        option: {
            ...getOptionJssStyle('select-wrapper', 1, theme),
            ...hoverMediaQuery({
                '&:not([aria-disabled]):not(.option--disabled):not([role=status]):hover': {
                    color: isHighContrastMode ? highlightColor : primaryColor,
                    background: hoverColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: isHighContrastMode ? highlightColor : primaryColorDark,
                        background: hoverColorDark,
                    }),
                },
            }),
            '&--selected': {
                background: hoverColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    background: hoverColorDark,
                }),
            },
            '&--indent': {
                paddingLeft: '28px',
            },
        },
        icon: {
            marginInlineStart: 'auto',
        },
        optgroup: {
            '&--hidden': {
                display: 'none',
            },
            '&--disabled': {
                color: disabledColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: disabledColorDark,
                }),
            },
            color: primaryColor,
            display: 'block',
            padding: `${spacingStaticSmall} 12px`,
            fontSize: fontSizeTextXSmall,
            fontWeight: fontWeightSemiBold,
            ...prefersColorSchemeDarkMediaQuery(theme, {
                color: primaryColorDark,
            }),
        },
        // .no-results / .sr-only
        ...getFunctionalComponentNoResultsOptionStyles('select-wrapper', 1, theme),
    };
};
const getComponentCss$t = (isOpen, state, disabled, filter, theme) => {
    return getCss(
    // merge because of global styles
    mergeDeep({
        '@global': {
            ':host': {
                display: 'block',
                position: 'relative',
            },
            ...preventFoucOfNestedElementsStyles,
        },
        'sr-text': {
            display: 'none',
        },
    }, filter ? getFilterStyles(isOpen, state, disabled, theme) : getButtonStyles(isOpen, state, theme), getListStyles(isOpen, theme)));
};

const getComponentCss$s = (isDisabled, hasCustomDropdown, hideLabel, state, theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            // ::slotted(select)
            ...addImportantToEachRule(getSlottedTextFieldTextareaSelectStyles('select', state, false, theme, {
                gridArea: '1/1/1/-1',
                position: 'static',
                zIndex: 0, // TODO: overrides global style.css in e2e and vrts
                cursor: 'pointer',
                // TODO: move into getSlottedTextFieldTextareaSelectStyles()
                padding: `${formElementPaddingVertical} ${formElementPaddingHorizontal}`,
                paddingInlineEnd: getCalculatedFormElementPaddingHorizontal(1),
                // TODO: needs to be aligned with multi-select
                ...(hasCustomDropdown && !isDisabled && { borderColor: 'transparent' }),
            })),
        },
        root: {
            display: 'grid',
            gap: spacingStaticXSmall,
            // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
            minWidth: `calc(1rem + ${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(1)})`,
        },
        wrapper: {
            display: 'grid',
            gridTemplateColumns: `minmax(0, 1fr) auto ${formElementLayeredSafeZone}`,
        },
        // TODO: extract for multi-select, select-wrapper and text-field (not gridArea and placeSelf)
        icon: {
            gridArea: '1/2',
            placeSelf: 'center',
            position: 'relative',
            zIndex: 2, // ensures icon is above input or button of select dropdown
            pointerEvents: 'none',
            padding: formButtonOrIconPadding,
            transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
            transition: getTransition('transform'),
            '&--open': {
                transform: 'rotate3d(0,0,1,180deg)',
            },
        },
        dropdown: {
            gridArea: '1/1/1/-1',
        },
        // .label / .required
        ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
        // .message
        ...getFunctionalComponentStateMessageStyles(theme, state),
    });
};

const cssVarInternalSelectOptionScaling = '--p-internal-select-option-scaling';
const getComponentCss$r = (theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
            },
            ...addImportantToEachRule({
                ':host': {
                    scrollMarginBlockStart: `calc(max(2px, var(${cssVarInternalSelectOptionScaling}, 1) * 6px) + 36px)`, // 36px input height + 6px padding
                    scrollMarginBlockEnd: `max(2px, var(${cssVarInternalSelectOptionScaling}, 1) * 6px)`, // Aligns option when list is scrolled by navigating with keyboard
                    ...hostHiddenStyles,
                },
                '::slotted(img)': getButtonImageJssStyle,
            }),
            ...preventFoucOfNestedElementsStyles,
        },
        option: getOptionJssStyle('select-option', `var(${cssVarInternalSelectOptionScaling}, 1)`, theme),
        icon: {
            marginInlineStart: 'auto',
        },
    });
};

const cssVarInternalSelectScaling = '--p-internal-select-scaling';
const getComponentCss$q = (isOpen, isDisabled, hideLabel, state, compact, theme) => {
    const scalingVar = `var(${cssVarInternalSelectScaling}, ${compact ? 0.5 : 1})`;
    return getCss({
        '@global': {
            // @keyframes fade-in
            ...getPopoverKeyframesStyles,
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                    [`${cssVarInternalSelectOptionScaling}`]: scalingVar,
                    [`${cssVarInternalOptgroupScaling}`]: scalingVar,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            button: {
                ...getButtonJssStyle('select', isOpen, isDisabled, state, scalingVar, theme),
                '& img': getButtonImageJssStyle,
                '& span': getButtonLabelJssStyle,
            },
            '[popover]': getPopoverJssStyle(isOpen, scalingVar, 40, theme),
        },
        root: {
            display: 'grid',
            gap: `max(2px, ${scalingVar} * ${spacingStaticXSmall})`,
            // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
            minWidth: `calc(1rem + ${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(1)})`,
        },
        filter: getFilterJssStyle(scalingVar, theme),
        options: getOptionsJssStyle(scalingVar),
        icon: getIconJssStyle('select', isOpen),
        // .no-results / .sr-only
        ...getFunctionalComponentNoResultsOptionStyles('select-option', scalingVar, theme),
        // .label / .required
        ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
        // .message
        ...getFunctionalComponentStateMessageStyles(theme, state),
    });
};

const getComponentCss$p = (isOpen, hasDismissButton, theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...dialogHostJssStyle,
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            slot: {
                display: 'block',
                gridColumn: '2/3',
                zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
            },
            dialog: getDialogJssStyle(isOpen, theme, 'shading'),
        },
        scroller: getScrollerJssStyle('fullscreen', theme),
        sheet: {
            ...dialogGridJssStyle,
            ...getDialogColorJssStyle(theme),
            ...getDialogTransitionJssStyle(isOpen, '^'),
            width: '100%',
            alignSelf: 'flex-end',
            marginBlockStart: spacingFluidLarge, // ensures minimal space at the top to visualize paper sheet like border top radius in case sheet becomes scrollable
            borderTopLeftRadius: borderRadiusLarge,
            borderTopRightRadius: borderRadiusLarge,
        },
        ...(hasDismissButton && {
            dismiss: {
                ...dismissButtonJssStyle,
                gridArea: '1/3',
                zIndex: 2, // ensures dismiss button is above header and content
                position: 'sticky',
                insetBlockStart: spacingFluidSmall,
                marginBlockStart: `calc(${spacingFluidMedium} * -1)`,
                marginInlineEnd: spacingFluidSmall,
                placeSelf: 'flex-start flex-end',
            },
        }),
    });
};

const sizeSmall = '48px';
const sizeMedium = '72px';
const sizeLarge = '104px';
const sizeMap$1 = {
    small: { height: sizeSmall, width: sizeSmall },
    medium: { height: sizeMedium, width: sizeMedium },
    large: { height: sizeLarge, width: sizeLarge },
    inherit: { height: 'inherit', width: 'inherit' },
};
const getComponentCss$o = (size, theme) => {
    const strokeDasharray = '57'; // C = 2πR
    const animationDuration = `var(${cssVariableAnimationDuration}, ${motionDurationVeryLong})`;
    const { primaryColor, contrastMediumColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');
    const { canvasColor, canvasTextColor } = getHighContrastColors();
    const firstHighContrastStrokeColor = isHighContrastMode && canvasTextColor;
    const lastHighContrastStrokeColor = isHighContrastMode && canvasColor;
    return getCss({
        '@global': {
            ':host': {
                display: 'inline-flex',
                ...addImportantToEachRule({
                    verticalAlign: 'top',
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            svg: {
                display: 'block', // for correct vertical alignment
                fill: 'none',
                animation: `$rotate ${animationDuration} steps(50) infinite`,
            },
            circle: {
                '&:first-child': {
                    // TODO: High Contrast Mode should be handled within a local color helper function
                    stroke: firstHighContrastStrokeColor || contrastMediumColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        stroke: firstHighContrastStrokeColor || contrastMediumColorDark,
                    }),
                },
                '&:last-child': {
                    animation: `$dash ${animationDuration} steps(50) infinite`,
                    // TODO: High Contrast Mode should be handled within a local color helper function
                    stroke: lastHighContrastStrokeColor || primaryColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        stroke: lastHighContrastStrokeColor || primaryColorDark,
                    }),
                    strokeDasharray: strokeDasharray
                        ,
                    strokeLinecap: 'round',
                },
            },
            '@keyframes rotate': {
                '0%': {
                    transform: 'rotateZ(0deg)',
                },
                '100%': {
                    transform: 'rotateZ(360deg)',
                },
            },
            '@keyframes dash': {
                '0%': {
                    strokeDashoffset: 57,
                    transform: 'rotateZ(0)',
                },
                '50%, 75%': {
                    strokeDashoffset: 20,
                    transform: 'rotateZ(80deg)',
                },
                '100%': {
                    strokeDashoffset: 57,
                    transform: 'rotateZ(360deg)',
                },
            },
        },
        root: {
            display: 'block',
            ...buildResponsiveStyles(size, (s) => sizeMap$1[s]),
            strokeWidth: 1.5,
        },
        'sr-only': getHiddenTextJssStyle(),
    });
};

const getSVGPath = (stepCount, numberedCircleColors, isStateCurrent) => {
    // # of the hex color starts a fragment identifier in URLs, so we have to replace it with the escaped value of # = %23
    const escapedNumberedCircleColors = Object.entries(numberedCircleColors).reduce((result, [key, value]) => ({ ...result, [key]: escapeHashCharacter(value) }), {});
    const { disabledColor, invertedBaseColor, primaryColor } = escapedNumberedCircleColors;
    const fillColor = isStateCurrent ? invertedBaseColor : disabledColor;
    const svgCirclePath = `<circle fill="${isStateCurrent ? primaryColor : 'none'}"${isStateCurrent ? '' : ` stroke="${fillColor}"`} stroke-width="1px" cx="12" cy="12" r="9"/>`;
    // Full SVG is provided by design (./numbers_raw.svg), created with illustrator and optimized with ImageOptim.
    // The optimized file can be found in ./numbers_optim.svg.
    // TODO: could certainly be optimized size wise by exporting icons larger and having less decimals
    const svgNumberedCirclePaths = [
        `${svgCirclePath}<path fill="${fillColor}" d="m12.33 8.67-2.43.91v-.94l2.6-1.03h.85v8.78h-1.02z"/>`,
        `${svgCirclePath}<path fill="${fillColor}" d="m9.46 15.58c0-1.35.73-2.07 1.7-2.72l.95-.63c.78-.52 1.57-1.05 1.57-2.24 0-1.12-.62-1.58-1.7-1.58s-1.68.48-1.78 1.97h-.96c.06-1.82.78-2.91 2.74-2.91s2.72.92 2.72 2.52-.92 2.23-1.79 2.8l-.95.63c-1.11.75-1.52 1.18-1.52 2.01v.16h4.17v.81h-5.15v-.81z"/>`,
        `${svgCirclePath}<path fill="${fillColor}" d="m10.1 13.73c.1 1.43.63 2 1.92 2 1.2 0 1.8-.49 1.8-1.68 0-1.08-.51-1.66-1.8-1.66h-.89v-.9h.83c1.12 0 1.66-.56 1.66-1.53 0-1.08-.64-1.55-1.73-1.55s-1.69.49-1.79 1.97h-.97c.1-1.79.84-2.91 2.76-2.91s2.74.92 2.74 2.49c0 .79-.38 1.54-1.16 1.9.84.28 1.36.92 1.36 2.19 0 1.54-.97 2.49-2.81 2.49-1.96 0-2.8-.9-2.88-2.81z"/>`,
        `${svgCirclePath}<path fill="${fillColor}" d="m8.87 13.6 3.54-5.99h1.43v5.89h1.25v.86h-1.25v2.02h-.99v-2.02h-3.98zm3.98-.1v-4.98l-2.91 4.98z"/>`,
        `${svgCirclePath}<path fill="${fillColor}" d="m9.34 12.45.42-4.83h4.71v.94h-3.9l-.26 2.95c.38-.43 1-.68 1.79-.68 1.86 0 2.76.9 2.76 2.81 0 2.06-1.03 2.91-2.86 2.91s-2.74-.84-2.81-2.51h.97c.06 1.13.57 1.7 1.84 1.7 1.39 0 1.85-.68 1.85-2.06s-.48-2-1.85-2c-1.07 0-1.54.42-1.75 1.17h-.91v-.39z"/>`,
        `${svgCirclePath}<path fill="${fillColor}" d="m9.97 11.02 2.22-3.4h1.1l-2.27 3.44c.33-.16.69-.23 1.1-.23 1.84 0 2.76.9 2.76 2.81 0 2.06-1.04 2.91-2.86 2.91s-2.87-.85-2.87-2.91c0-1.08.3-1.8.83-2.61zm2.05 4.71c1.38 0 1.84-.68 1.84-2.05s-.47-2.01-1.84-2.01-1.85.64-1.85 2.01.46 2.05 1.85 2.05z"/>`,
        `${svgCirclePath}<path fill="${fillColor}" d="m9.21 7.61h5.57v.74l-3.58 8.04h-1.05l3.54-7.84h-4.49v-.94z"/>`,
        `${svgCirclePath}<path fill="${fillColor}" d="m10.47 11.94c-.65-.33-1.13-.92-1.13-2.01 0-1.53.85-2.47 2.66-2.47s2.66.94 2.66 2.47c0 1.08-.47 1.68-1.15 2.01.92.35 1.34 1.07 1.34 2.11 0 1.73-.99 2.49-2.86 2.49s-2.86-.76-2.86-2.49c0-1.04.41-1.76 1.33-2.11zm1.53 3.78c1.27 0 1.85-.51 1.85-1.69 0-1.1-.58-1.61-1.85-1.61s-1.85.52-1.85 1.61c0 1.18.58 1.69 1.85 1.69zm1.65-5.76c0-1.1-.56-1.56-1.65-1.56s-1.65.47-1.65 1.56c0 1 .46 1.6 1.65 1.6s1.65-.6 1.65-1.6z"/>`,
        `${svgCirclePath}<path fill="${fillColor}" d="m9.16 10.33c0-2.03 1.02-2.86 2.83-2.86s2.82.81 2.82 2.85c0 1.11-.3 1.82-.81 2.64l-2.18 3.44h-1.1l2.18-3.37c-.31.14-.65.2-1.01.2-1.82 0-2.74-.99-2.74-2.9zm4.65 0c0-1.23-.47-1.92-1.81-1.92s-1.81.69-1.81 1.92c0 1.37.49 2.05 1.81 2.05s1.81-.68 1.81-2.05z"/>`,
    ];
    return svgNumberedCirclePaths[stepCount];
};
const getComponentCss$n = (state, disabled, theme) => {
    const { primaryColor, hoverColor, disabledColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, hoverColor: hoverColorDark, disabledColor: disabledColorDark, } = getThemedColors('dark');
    const isStateCurrent = state === 'current';
    const isStateCurrentOrUndefined = !state || isStateCurrent;
    const isDisabled = !state || disabled;
    return getCss({
        '@global': {
            ':host': {
                ...(isStateCurrentOrUndefined &&
                    Array.from(new Array(9)).reduce((result, _, i) => ({
                        ...result,
                        [`&(:nth-of-type(${i + 1})) $button::before`]: {
                            backgroundImage: getInlineSVGBackgroundImage(getSVGPath(i, {
                                primaryColor,
                                invertedBaseColor: getInvertedThemedColors(theme).primaryColor,
                                disabledColor,
                            }, isStateCurrent)),
                            ...prefersColorSchemeDarkMediaQuery(theme, {
                                backgroundImage: getInlineSVGBackgroundImage(getSVGPath(i, {
                                    primaryColor: primaryColorDark,
                                    invertedBaseColor: getInvertedThemedColors('dark').primaryColor,
                                    disabledColor: disabledColorDark,
                                }, isStateCurrent)),
                            }),
                        },
                    }), {})),
                ...addImportantToEachRule({
                    fontSize: 'inherit',
                    ...hostHiddenStyles,
                    '&(:not(:last-of-type))': {
                        marginInlineEnd: spacingFluidXSmall,
                    },
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            button: {
                display: 'flex',
                position: 'relative',
                gap: '3px',
                color: isDisabled ? disabledColor : primaryColor,
                padding: '4px 10px 4px 6px',
                margin: 0, // Removes default button margin on safari 15
                background: 0,
                border: 0,
                ...textSmallStyle,
                fontSize: 'inherit',
                width: 'max-content',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                borderRadius: borderRadiusSmall,
                ...(isStateCurrent && {
                    ...frostedGlassStyle,
                    background: hoverColor,
                }),
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: isDisabled ? disabledColorDark : primaryColorDark,
                    ...(isStateCurrent && {
                        background: hoverColorDark,
                    }),
                }),
                ...(!isDisabled &&
                    hoverMediaQuery({
                        transition: getTransition('background-color'),
                        '&:hover': {
                            ...frostedGlassStyle,
                            background: hoverColor,
                            ...prefersColorSchemeDarkMediaQuery(theme, {
                                background: hoverColorDark,
                            }),
                        },
                    })),
                ...(isStateCurrentOrUndefined && {
                    // counter
                    // Pseudo element is needed to center the counter to the text, as it is not working optimal directly on the button
                    '&::before': {
                        content: '""',
                        height: fontLineHeight,
                        width: fontLineHeight,
                    },
                }),
                ...getFocusJssStyle(theme, { offset: '-2px' }),
            },
        },
        ...(!isStateCurrentOrUndefined && {
            // complete / warning icons via icon component
            icon: {
                height: fontLineHeight,
                width: fontLineHeight,
            },
        }),
        'sr-only': getHiddenTextJssStyle(),
    });
};

const getComponentCss$m = (size) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
        },
        scroller: {
            ...textSmallStyle,
            ...buildResponsiveStyles(size, (s) => ({ fontSize: fontSizeText[s] })),
        },
    });
};

const cssVarInternalSwitchScaling = '--p-internal-switch-scaling';
const getColors$1 = (checked, disabled, loading, theme) => {
    const { primaryColor, contrastMediumColor, successColor, successColorDarken, disabledColor } = getThemedColors(theme);
    const { backgroundColor: lightThemeBackgroundColor } = getThemedColors('light');
    const { canvasColor, canvasTextColor } = getHighContrastColors();
    const checkedColor = isHighContrastMode ? canvasTextColor : successColor;
    const disabledOrLoadingColor = isDisabledOrLoading(disabled, loading) && disabledColor;
    return {
        buttonBorderColor: disabledOrLoadingColor || (checked ? checkedColor : contrastMediumColor),
        buttonBorderColorHover: checked ? (isHighContrastMode ? primaryColor : successColorDarken) : primaryColor,
        buttonBackgroundColor: checked ? disabledOrLoadingColor || checkedColor : 'transparent',
        buttonBackgroundColorHover: checked ? (isHighContrastMode ? checkedColor : successColorDarken) : 'transparent',
        toggleBackgroundColor: (loading && 'transparent') ||
            (disabled && !checked && disabledColor) ||
            (checked
                ? isHighContrastMode
                    ? canvasColor
                    : lightThemeBackgroundColor
                : isHighContrastMode
                    ? canvasTextColor
                    : primaryColor),
        toggleBackgroundColorHover: checked
            ? lightThemeBackgroundColor
            : isHighContrastMode
                ? canvasTextColor
                : primaryColor,
        textColor: disabledOrLoadingColor || primaryColor,
    };
};
const getComponentCss$l = (alignLabel, hideLabel, stretch, checked, disabled, loading, compact, theme) => {
    const { buttonBorderColor, buttonBorderColorHover, buttonBackgroundColor, buttonBackgroundColorHover, toggleBackgroundColor, toggleBackgroundColorHover, textColor, } = getColors$1(checked, disabled, loading, theme);
    const { buttonBorderColor: buttonBorderColorDark, buttonBorderColorHover: buttonBorderColorHoverDark, buttonBackgroundColor: buttonBackgroundColorDark, buttonBackgroundColorHover: buttonBackgroundColorHoverDark, toggleBackgroundColor: toggleBackgroundColorDark, toggleBackgroundColorHover: toggleBackgroundColorHoverDark, textColor: textColorDark, } = getColors$1(checked, disabled, loading, 'dark');
    const minimumTouchTargetSize = '24px'; // Minimum touch target size to comply with accessibility guidelines.
    const scalingVar = `var(${cssVarInternalSwitchScaling}, ${compact ? 0.6668 : 1})`;
    // Determines the scaling factor for the switch size. In "compact" mode, it uses 0.6668 to achieve a 20px switch (compact size).
    // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalSwitchScaling`.
    const dimension = `calc(max(${SCALING_BASE_VALUE} * 0.75, ${scalingVar} * ${fontLineHeight}))`;
    // Calculates the switch size and ensures a minimum size of 12px (0.75 * SCALING_BASE_VALUE).
    // Scales proportionally with the line height and the scaling factor.
    const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the switch including its borders.
    const touchTargetSizeDiff = `calc(${minimumTouchTargetSize} - ${dimensionFull})`; // Difference between the minimum touch target size and the switch full size.
    const gap = `max(${spacingStaticXSmall}, calc(${spacingStaticSmall} - (max(0px, ${touchTargetSizeDiff}))))`;
    // Adjusts padding to maintain consistent spacing when the switch is smaller than the minimum touch target size.
    // Uses asymmetric padding instead of `gap` to ensure there is no non-clickable area between the label and the input.
    const marginTop = `max(0px, calc((${fontLineHeight} - ${dimensionFull}) / 2))`; // Vertically centers the switch label relative to the switch size (depending on which is smaller).
    const paddingTop = `max(0px, calc((${dimensionFull} - ${fontLineHeight}) / 2))`; // Vertically centers the switch label relative to the switch size (depending on which is smaller).
    const inset = `calc(-${borderWidthBase} - max(0px, ${touchTargetSizeDiff} / 2))`; // Positions the switch ::before pseudo-element with a negative offset to align it with the touch target.
    return getCss({
        '@global': {
            ':host': {
                ...buildResponsiveStyles(stretch, (stretchValue) => ({
                    display: stretchValue ? 'flex' : 'inline-flex',
                })),
                ...addImportantToEachRule({
                    outline: 0, // custom element is able to delegate the focus
                    font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct gap definition based on ex-unit
                    gap,
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                    ...buildResponsiveStyles(stretch, (stretchValue) => ({
                        justifyContent: stretchValue ? 'space-between' : 'flex-start',
                        width: stretchValue ? '100%' : 'auto', // prevents adjusting its size when used as flex or grid child
                        ...(!stretchValue && { verticalAlign: 'top' }),
                    })),
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            button: {
                position: 'relative', // ensures relative positioning for ::before pseudo element
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                width: `calc(${dimension} * 2 - ${borderWidthBase} * 2)`,
                height: dimension,
                font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
                boxSizing: 'content-box',
                border: `${borderWidthBase} solid ${buttonBorderColor}`,
                borderRadius: `calc((${dimension} + ${borderWidthBase} * 2) / 2)`,
                backgroundColor: buttonBackgroundColor,
                cursor: isDisabledOrLoading(disabled, loading) ? 'not-allowed' : 'pointer',
                transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    borderColor: buttonBorderColorDark,
                    backgroundColor: buttonBackgroundColorDark,
                }),
                margin: 0, // Removes default button margin on safari 15
                padding: 0,
                marginTop,
                WebkitAppearance: 'none', // iOS safari
                appearance: 'none',
                ...(!isDisabledOrLoading(disabled, loading) &&
                    hoverMediaQuery({
                        '&:hover': {
                            borderColor: buttonBorderColorHover,
                            backgroundColor: buttonBackgroundColorHover,
                            ...prefersColorSchemeDarkMediaQuery(theme, {
                                borderColor: buttonBorderColorHoverDark,
                                backgroundColor: buttonBackgroundColorHoverDark,
                            }),
                            '& .toggle': {
                                backgroundColor: toggleBackgroundColorHover,
                                ...prefersColorSchemeDarkMediaQuery(theme, {
                                    backgroundColor: toggleBackgroundColorHoverDark,
                                }),
                            },
                        },
                    })),
                ...getFocusJssStyle(theme),
                '&::before': {
                    // Ensures the touch target is at least 24px, even if the switch is smaller than the minimum touch target size.
                    // This pseudo-element expands the clickable area without affecting the visual size of the switch itself.
                    content: '""',
                    position: 'absolute',
                    inset,
                },
            },
            label: {
                ...textSmallStyle,
                minWidth: 0, // prevents flex child to overflow max available parent size
                minHeight: 0, // prevents flex child to overflow max available parent size
                cursor: isDisabledOrLoading(disabled, loading) ? 'not-allowed' : 'pointer',
                color: textColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: textColorDark,
                }),
                ...mergeDeep(buildResponsiveStyles(alignLabel, (alignLabelValue) => ({
                    // TODO: we should remove 'left' here and map the value in the component class already to 'start' but might be difficult due to breakpoint customizable prop value
                    order: alignLabelValue === 'left' || alignLabelValue === 'start' ? -1 : 0,
                })), buildResponsiveStyles(hideLabel, (isHidden) => getHiddenTextJssStyle(isHidden, {
                    paddingTop,
                }))),
            },
        },
        toggle: {
            display: 'flex',
            placeItems: 'center',
            placeContent: 'center',
            width: `calc(${dimension} - ${borderWidthBase} * 2)`,
            height: `calc(${dimension} - ${borderWidthBase} * 2)`,
            borderRadius: '50%',
            backgroundColor: toggleBackgroundColor,
            transition: `${getTransition('background-color')}, ${getTransition('transform')}`,
            transform: `translate3d(${checked ? `calc(100% + ${borderWidthBase})` : borderWidthBase}, 0, 0)`,
            '&:dir(rtl)': {
                transform: `translate3d(calc(${checked ? `calc(100% + ${borderWidthBase})` : borderWidthBase} * -1), 0, 0)`,
            },
            ...prefersColorSchemeDarkMediaQuery(theme, {
                backgroundColor: toggleBackgroundColorDark,
            }),
        },
        ...(loading && {
            spinner: {
                width: dimensionFull,
                height: dimensionFull,
            },
        }),
        // .loading
        ...getFunctionalComponentLoadingMessageStyles(),
    });
};

const getComponentCss$k = () => {
    return getCss({
        '@global': {
            ':host': {
                display: 'table-row-group',
                ...addImportantToEachRule(hostHiddenStyles),
            },
        },
    });
};

const cssVariableTablePadding = '--p-internal-table-padding';
const cssVariableTableHoverColor = '--p-internal-table-hover-color';
const cssVariableTableBorderColor = '--p-internal-table-border-color';
const cssVariableTableBorderWidth = '--p-internal-table-border-width';
const cssVariableTableHeadCellIconFilter = '--p-internal-table-head-cell-icon-filter';
const getComponentCss$j = (compact, layout, theme) => {
    const { primaryColor, hoverColor, contrastLowColor } = doGetThemedColors(theme);
    const { primaryColor: primaryColorDark, hoverColor: hoverColorDark, contrastLowColor: contrastLowColorDark, } = doGetThemedColors('dark');
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...textSmallStyle,
                    color: primaryColor,
                    textAlign: 'start',
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: primaryColorDark,
                    }),
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            '::slotted(*)': addImportantToEachRule({
                ...(compact && { [cssVariableTablePadding]: spacingStaticSmall }),
                [cssVariableTableHoverColor]: hoverColor,
                [cssVariableTableBorderColor]: contrastLowColor,
                [cssVariableTableHeadCellIconFilter]: isThemeDark(theme) ? 'invert(100%)' : 'none',
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    [cssVariableTableHoverColor]: hoverColorDark,
                    [cssVariableTableBorderColor]: contrastLowColorDark,
                    [cssVariableTableHeadCellIconFilter]: 'invert(100%)',
                }),
                ...(isHighContrastMode &&
                    getSchemedHighContrastMediaQuery({
                        [cssVariableTableHeadCellIconFilter]: 'none',
                    }, {
                        [cssVariableTableHeadCellIconFilter]: 'invert(100%)',
                    })),
            }),
        },
        caption: {
            marginBottom: spacingFluidMedium,
        },
        table: {
            display: 'table',
            borderCollapse: 'collapse',
            // with table-layout: fixed, width: 100% crops border-bottom of p-table-row when scrollable
            // also relative width units (%, vw) don't work as expected when scrollable or combined with auto columns
            ...(layout === 'fixed'
                ? {
                    tableLayout: 'fixed',
                    minWidth: '100%',
                }
                : { width: '100%' }),
            whiteSpace: 'nowrap', // shouldn't be inherited for caption, that's why it's defined here
        },
    });
};

const getComponentCss$i = (multiline) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'table-cell',
                verticalAlign: 'middle',
                ...addImportantToEachRule({
                    padding: `var(${cssVariableTablePadding}, ${spacingFluidSmall})`,
                    margin: 0,
                    whiteSpace: multiline ? 'normal' : 'nowrap',
                    ...hostHiddenStyles,
                }),
            },
        },
    });
};

const isDirectionAsc = (dir) => dir === 'asc';
const isSortable = (active, direction) => {
    return active !== undefined && direction !== undefined;
};

const { hoverColor } = getThemedColors('light'); // hover color and focus color are the same for light and dark
const buttonBeforeOffsetVertical = '-2px';
const buttonBeforeOffsetHorizontal = '-4px';
const getComponentCss$h = (active, direction, hideLabel, multiline) => {
    const sortable = isSortable(active, direction);
    return getCss({
        '@global': {
            ':host': {
                display: 'table-cell',
                ...addImportantToEachRule({
                    padding: `2px var(${cssVariableTablePadding}, ${spacingFluidSmall}) var(${cssVariableTablePadding}, ${spacingFluidSmall})`,
                    verticalAlign: 'bottom',
                    whiteSpace: multiline ? 'normal' : 'nowrap',
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            ...(sortable
                ? {
                    button: {
                        position: 'relative',
                        display: 'flex',
                        gap: spacingStaticXSmall,
                        width: 'auto',
                        margin: 0, // Removes default button margin on safari 15
                        padding: 0,
                        font: 'inherit',
                        color: 'inherit',
                        alignItems: 'flex-end',
                        WebkitAppearance: 'none', // iOS safari
                        appearance: 'none',
                        background: 'transparent',
                        textAlign: 'start',
                        border: 0,
                        zIndex: 0,
                        cursor: 'pointer',
                        // TODO: re-think if ::before is still needed
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: `${buttonBeforeOffsetVertical} ${buttonBeforeOffsetHorizontal}`,
                            borderRadius: borderRadiusSmall,
                            zIndex: -1, // needed so that text behind element is selectable and/or visible
                            transition: getTransition('background-color'),
                        },
                        ...hoverMediaQuery({
                            '&:hover, &:focus-visible': {
                                '& .icon': {
                                    opacity: 1,
                                },
                            },
                            '&:hover::before': {
                                ...frostedGlassStyle,
                                backgroundColor: hoverColor,
                            },
                        }),
                        // TODO: to be future proof, we need to pass theme parameter
                        ...getFocusJssStyle('light', { pseudo: true, offset: '-2px' }),
                    },
                }
                : hideLabel && {
                    span: {
                        ...getHiddenTextJssStyle(),
                        display: 'block',
                        border: 0,
                    },
                }),
        },
        ...(sortable && {
            icon: {
                transition: getTransition('opacity'),
                opacity: active ? 1 : 0,
                transform: `rotate3d(0,0,1,${isDirectionAsc(direction) ? 0 : 180}deg)`,
                transformOrigin: '50% 50%', // for iOS
                filter: `var(${cssVariableTableHeadCellIconFilter})`,
            },
        }),
    });
};

const getComponentCss$g = () => {
    return getCss({
        '@global': {
            ':host': {
                display: 'table-row',
                ...addImportantToEachRule(hostHiddenStyles),
            },
        },
    });
};

const getComponentCss$f = () => {
    return getCss({
        '@global': {
            ':host': {
                display: 'table-header-group',
                ...addImportantToEachRule({
                    fontSize: fontSizeTextXSmall,
                    lineHeight: fontLineHeight,
                    fontWeight: fontWeightSemiBold,
                    borderBottom: `1px solid var(${cssVariableTableBorderColor})`,
                    ...hostHiddenStyles,
                }),
            },
            '::slotted(*)': addImportantToEachRule({
                [cssVariableTableBorderWidth]: '0px',
                [cssVariableTableHoverColor]: 'none',
            }),
        },
    });
};

const getComponentCss$e = () => {
    return getCss({
        '@global': {
            ':host': {
                display: 'table-row',
                ...addImportantToEachRule({
                    borderBottom: `var(${cssVariableTableBorderWidth},1px) solid var(${cssVariableTableBorderColor})`,
                    transition: getTransition('background'),
                    ...hostHiddenStyles,
                    ...hoverMediaQuery({
                        '&(:hover)': {
                            // ...frostedGlassStyle, // will result in not smooth transition when applied
                            background: `var(${cssVariableTableHoverColor})`,
                        },
                    }),
                }),
            },
        },
    });
};

const scrollerAnimatedCssClass = 'scroller--animated';
const targetSelectors = ['a', 'button'];
const transformSelector = (selector) => targetSelectors.map((tag) => selector.replace(/\[role]/g, tag)).join();
const getComponentCss$d = (size, weight, theme) => {
    const { primaryColor, hoverColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, hoverColor: hoverColorDark } = getThemedColors('dark');
    const barJssStyle = {
        position: 'absolute',
        height: '2px',
        left: 0,
        ...(isHighContrastMode
            ? {
                background: getHighContrastColors().canvasTextColor,
            }
            : {
                background: primaryColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    background: primaryColorDark,
                }),
            }),
    };
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    position: 'relative',
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            ...addImportantToEachRule({
                '::slotted': {
                    // TODO: produces duplicated css code in SSR context, we should try to make use of multiple selector like
                    //  `::slotted(:is(a,button))`.
                    ...getFocusJssStyle(theme, { slotted: 'a', offset: '1px' }),
                    ...getFocusJssStyle(theme, { slotted: 'button', offset: '1px' }),
                },
                // would be nice to use shared selector like '::slotted([role])'
                // but this doesn't work reliably when rendering in browser
                [transformSelector('::slotted([role])')]: {
                    ...getResetInitialStylesForSlottedAnchor,
                    display: 'inline-block',
                    position: 'relative',
                    margin: '0 0 4px 0',
                    verticalAlign: 'top',
                    // TODO: can we use `all: 'inherit'` instead?
                    fontFamily: 'inherit',
                    fontStyle: 'inherit',
                    fontVariant: 'inherit',
                    fontWeight: 'inherit',
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    WebkitAppearance: 'none', // iOS safari
                    appearance: 'none',
                    outlineOffset: '1px',
                    textDecoration: 'none',
                    textAlign: 'start',
                    border: 0,
                    color: primaryColor,
                    cursor: 'pointer',
                    borderRadius: borderRadiusSmall,
                    zIndex: 0, // needed for ::before pseudo element to be visible
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: primaryColorDark,
                    }),
                    ...hoverMediaQuery({
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: '-2px -4px',
                            borderRadius: borderRadiusSmall,
                            zIndex: -1, // Stack the pseudo-element behind the button to avoid overlay of frosted-glass effect with label text
                            transition: getTransition('background-color'),
                        },
                    }),
                },
                ...hoverMediaQuery({
                    [transformSelector('::slotted([role]:hover)::before')]: {
                        ...frostedGlassStyle,
                        background: hoverColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            background: hoverColorDark,
                        }),
                    },
                }),
                // basic invisible bar, that will be delayed via transition: visibility
                [transformSelector('::slotted([role])::after')]: {
                    content: '""',
                    visibility: 'hidden',
                },
                // visible bar for selected tab
                [transformSelector('::slotted([role][aria-selected="true"])::after, ::slotted([role][aria-current="true"])::after')]: {
                    ...barJssStyle,
                    right: '0px',
                    bottom: isHighContrastMode ? '-4px' : '-6px',
                    visibility: 'inherit',
                },
                [transformSelector('::slotted([role]:not(:last-child))')]: {
                    marginInlineEnd: spacingStaticMedium,
                },
            }),
        },
        scroller: {
            ...textSmallStyle,
            fontWeight: getFontWeight(weight),
            ...buildResponsiveStyles(size, (s) => ({ fontSize: fontSizeText[s] })),
        },
        // conditionally applied and removed based on if activeTabIndex exists
        [scrollerAnimatedCssClass]: {
            [`& ${transformSelector('::slotted([role][aria-selected="true"])::after, ::slotted([role][aria-current="true"])::after')}`]: {
                transition: addImportantToRule(`visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationModerate})`), // bar appears after transition
            },
        },
        // moving bar
        bar: {
            ...barJssStyle,
            width: 0, // actual width and transform is set via inline css
            bottom: isHighContrastMode ? '0' : '-2px',
            visibility: 'inherit',
            transition: `${getTransition('transform', 'moderate')}, ${getTransition('width', 'moderate')}`,
            animation: `$hide 0s var(${cssVariableAnimationDuration},0.5s) forwards`, // auto hide bar after transition, needs to be a little longer in Safari
        },
        '@keyframes hide': {
            to: {
                visibility: 'hidden',
            },
        },
    });
};

const getComponentCss$c = (theme) => {
    const { primaryColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark } = getThemedColors('dark');
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    color: primaryColor, // enables color inheritance for e.g. slotted anchor
                    borderRadius: '2px',
                    ...hostHiddenStyles,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: primaryColorDark,
                    }),
                    ...getFocusJssStyle(theme, { slotted: true }),
                }),
            },
        },
    });
};

const getComponentCss$b = () => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
        },
        root: {
            marginBottom: '8px',
        },
    });
};

const getThemedBackgroundColor = (tagColor, themedColors) => {
    const colorMap = {
        'background-base': themedColors.backgroundColor,
        'background-surface': themedColors.backgroundSurfaceColor,
        'background-frosted': themedColors.backgroundFrostedColor,
        primary: themedColors.primaryColor,
        'notification-info-soft': themedColors.infoSoftColor,
        'notification-warning-soft': themedColors.warningSoftColor,
        'notification-success-soft': themedColors.successSoftColor,
        'notification-error-soft': themedColors.errorSoftColor,
    };
    return colorMap[tagColor];
};

const getComponentCss$a = (color, hasLabel, theme) => {
    const themedColors = getThemedColors(theme);
    const themedColorsDark = getThemedColors('dark');
    const { primaryColor, hoverColor, contrastHighColor } = themedColors;
    const { primaryColor: primaryColorDark, hoverColor: hoverColorDark, contrastHighColor: contrastHighColorDark, } = themedColorsDark;
    const backgroundColor = getThemedBackgroundColor(color, themedColors);
    const backgroundColorDark = getThemedBackgroundColor(color, themedColorsDark);
    return getCss({
        '@global': {
            ':host': {
                display: 'inline-block',
                verticalAlign: 'top',
                ...addImportantToEachRule({
                    outline: 0,
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            button: {
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                gap: '12px',
                minHeight: '54px',
                padding: '4px 12px',
                margin: 0, // Removes default button margin on safari 15
                borderRadius: borderRadiusSmall,
                border: 0,
                cursor: 'pointer',
                background: backgroundColor,
                color: primaryColor,
                textAlign: 'start',
                ...textSmallStyle,
                ...(isHighContrastMode && {
                    // TODO: using border would increase the dimension but using outline interferes with the focus style
                    outline: '1px solid transparent',
                }),
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    background: backgroundColorDark,
                    color: primaryColorDark,
                }),
                ...hoverMediaQuery({
                    '&:hover > .icon': {
                        backgroundColor: hoverColor,
                        ...prefersColorSchemeDarkMediaQuery(theme, {
                            backgroundColor: hoverColorDark,
                        }),
                    },
                }),
                ...getFocusJssStyle(theme),
            },
        },
        ...(hasLabel && {
            label: {
                display: 'block',
                marginBottom: '-4px',
                color: contrastHighColor,
                fontSize: fontSizeTextXSmall,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: contrastHighColorDark,
                }),
            },
        }),
        icon: {
            padding: '4px',
            marginInlineEnd: '-2px', // compensate white space of svg icon and optimize visual alignment
            transition: getTransition('background-color'),
            borderRadius: borderRadiusSmall,
        },
        'sr-only': getHiddenTextJssStyle(),
    });
};

const getThemedBackgroundHoverColor = (tagColor, themedColors, theme) => {
    const isDark = isThemeDark(theme);
    const keySuffix = isDark ? 'Lighten' : 'Darken';
    const colorMap = {
        'background-base': themedColors[`backgroundColor${keySuffix}`],
        'background-surface': themedColors[`backgroundSurfaceColor${keySuffix}`],
        'background-frosted': isDark
            ? lighten(themedColors.backgroundFrostedColor)
            : darken(themedColors.backgroundFrostedColor),
        primary: isDark ? themedColors.contrastHighColorLighten : themedColors.contrastHighColor,
        'notification-info-soft': themedColors[`infoSoftColor${keySuffix}`],
        'notification-success-soft': themedColors[`successSoftColor${keySuffix}`],
        'notification-error-soft': themedColors[`errorSoftColor${keySuffix}`],
        'notification-warning-soft': themedColors[`warningSoftColor${keySuffix}`],
    };
    return colorMap[tagColor];
};

const getColors = (tagColor, theme) => {
    const themedColors = getThemedColors(theme);
    const { primaryColor } = tagColor === 'primary' ? getInvertedThemedColors(theme) : themedColors;
    return {
        textColor: primaryColor,
        backgroundColor: getThemedBackgroundColor(tagColor, themedColors),
        backgroundHoverColor: getThemedBackgroundHoverColor(tagColor, themedColors, theme),
    };
};
const getComponentCss$9 = (tagColor, compact, isFocusable, hasIcon, theme) => {
    const { textColor, backgroundColor, backgroundHoverColor } = getColors(tagColor, theme);
    const { textColor: textColorDark, backgroundColor: backgroundColorDark, backgroundHoverColor: backgroundHoverColorDark, } = getColors(tagColor, 'dark');
    const isBackgroundFrosted = tagColor === 'background-frosted';
    return getCss({
        '@global': {
            ':host': {
                display: 'inline-flex',
                verticalAlign: 'top', // TODO: should we set this CSS style at all?
                whiteSpace: 'nowrap', // TODO: should either be exposed by a controlled CSS variable or a component prop or whitelist as supported custom styles
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            span: {
                position: 'relative', // necessary as relative anchor to ensure click area of optional slotted focusable element is in sync
                display: 'flex',
                gap: '2px',
                padding: compact ? '1px 6px' : `${spacingStaticXSmall} 9px`,
                borderRadius: borderRadiusSmall,
                font: textXSmallStyle.font,
                color: textColor,
                background: backgroundColor,
                ...(isBackgroundFrosted && frostedGlassStyle),
                ...(isHighContrastMode && {
                    outline: '1px solid transparent',
                }),
                transition: `${getTransition('color')}, ${getTransition('background-color')}, ${getTransition('backdrop-filter')}`, // transition style should always be applied to have a smooth color change in case color prop gets updated during runtime
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: textColorDark,
                    background: backgroundColorDark,
                }),
                ...(isFocusable &&
                    hoverMediaQuery({
                        '&:hover': {
                            background: backgroundHoverColor,
                            ...prefersColorSchemeDarkMediaQuery(theme, {
                                background: backgroundHoverColorDark,
                            }),
                        },
                    })),
            },
            '::slotted': addImportantToEachRule({
                '&(a),&(button)': {
                    all: 'unset', // resets any ua-style + custom style set in light dom
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    font: 'inherit',
                    color: 'inherit',
                },
                '&(a)::before,&(button)::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '4px',
                },
                ...getFocusJssStyle(theme, { slotted: 'a', pseudo: true }),
                ...getFocusJssStyle(theme, { slotted: 'button', pseudo: true }),
                '&(br)': {
                    display: 'none',
                },
            }),
        },
        ...(hasIcon && {
            icon: {
                marginInlineStart: '-2px', // compensate white space of svg icon and optimize visual alignment
                ...(!isHighContrastMode &&
                    tagColor === 'primary' && {
                    filter: 'invert(1)',
                }),
            },
        }),
    });
};

const isType = (inputType, typeToValidate) => inputType === typeToValidate;
const showCustomCalendarOrTimeIndicator = (isCalendar, isTime) => {
    return hasShowPickerSupport() && (isCalendar || isTime);
};

const cssVariableInputPaddingStart = '--p-internal-text-field-input-padding-start';
const cssVariableInputPaddingEnd = '--p-internal-text-field-input-padding-end';
const cssVarInternalTextFieldScaling = '--p-internal-text-field-scaling';
const getComponentCss$8 = (isDisabled, isReadonly, hideLabel, state, hasUnitOrVisibleCounter, unitPosition, inputType, showPasswordToggle, isWithinForm, hasSubmitButton, theme, unitLength) => {
    const isSearch = isType(inputType, 'search');
    const isPassword = isType(inputType, 'password');
    const isNumber = isType(inputType, 'number');
    const isCalendar = isType(inputType, 'date') || isType(inputType, 'week') || isType(inputType, 'month');
    const isTime = isType(inputType, 'time');
    const isSearchOrPassword = isSearch || (isPassword && showPasswordToggle);
    const isSearchWithoutFormOrSubmitButton = isSearch && (!isWithinForm || !hasSubmitButton);
    const isSearchWithForm = isSearch && isWithinForm;
    const isCalendarOrTimeWithCustomIndicator = showCustomCalendarOrTimeIndicator(isCalendar, isTime);
    const counterCharacterLengthCssVar = 'var(--p-internal-counter-character-length)';
    const paddingInlineIfUnitOrCounter = hasUnitOrVisibleCounter &&
        `calc(${formElementLayeredGap} + ${formElementPaddingHorizontal} + ${borderWidthBase} + ${counterCharacterLengthCssVar} * 1ch * log(2.6))`;
    // Determines the scaling factor for the text field size. In "compact" mode, it uses 0.5 to achieve a 36px text field (compact size).
    // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalTextFieldScaling`.
    const scalingVar = `var(${cssVarInternalTextFieldScaling}, 1)`;
    const paddingBlock = `max(2px, ${formElementPaddingVertical} * ${scalingVar})`;
    const paddingInline = `max(4px, ${formElementPaddingHorizontal} * ${scalingVar})`;
    const height = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            // ::slotted(input)
            ...addImportantToEachRule({
                ...getSlottedTextFieldTextareaSelectStyles('input', state, false, theme, {
                    gridArea: '1/1/1/-1',
                    paddingBlock,
                    paddingInline,
                    width: 'auto',
                    height,
                    boxSizing: 'content-box',
                    paddingInlineStart: hasUnitOrVisibleCounter && unitPosition === 'prefix'
                        ? paddingInlineIfUnitOrCounter
                        : `var(${cssVariableInputPaddingStart})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
                    paddingInlineEnd: hasUnitOrVisibleCounter && unitPosition === 'suffix'
                        ? paddingInlineIfUnitOrCounter
                        : `var(${cssVariableInputPaddingEnd})`, // iOS Safari 14.5 can't handle padding-inline shorthand with css variables
                    // TODO: move into getSlottedTextFieldTextareaSelectStyles()
                    ...(isNumber && {
                        MozAppearance: 'textfield', // hides up/down spin button for Firefox
                    }),
                    ...((isCalendar || isTime) && {
                        // for native placeholder color in safari, background has to be a special value, `transparent` or `rgba(0,0,0,0)` won't work
                        // this works nice for `theme="light"`, but for `theme="dark"` placeholder appears blue which is still better
                        // than having invisible dots or colons for data/time or not seeing the value at all after selection
                        // found on https://browserstrangeness.bitbucket.io/css_hacks.html#safari
                        '@supports (-webkit-hyphens: none)': {
                            background: 'rgba(0,0,1,0)',
                            color: isThemeDark(theme) ? getThemedColors(theme).primaryColor : 'initial',
                        },
                    }),
                }),
                // TODO: move into getSlottedTextFieldTextareaSelectStyles()
                '::slotted': {
                    '&(input:-internal-autofill-selected),&(input:-internal-autofill-previewed),&(input:-webkit-autofill),&(input:-webkit-autofill:focus)': {
                        WebkitBackgroundClip: 'padding-box', // reset webkit autofill styles
                    },
                    '&(input[type="email"]),&(input[type="tel"])': {
                        direction: 'ltr', // fixes specific input types in RTL mode. Should always be LTR. See https://rtlstyling.com/posts/rtl-styling#form-inputs
                    },
                },
            }),
        },
        root: {
            [cssVariableInputPaddingStart]: isSearchWithoutFormOrSubmitButton
                ? getCalculatedFormElementPaddingHorizontal(1)
                : paddingInline,
            [cssVariableInputPaddingEnd]: isSearchOrPassword || isCalendarOrTimeWithCustomIndicator
                ? getCalculatedFormElementPaddingHorizontal(isSearchWithForm && hasSubmitButton ? 2 : 1)
                : paddingInline,
            display: 'grid',
            gap: spacingStaticXSmall,
            // min width is needed for showing at least 1 character in very narrow containers. The "2rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
            minWidth: `calc(2rem + ${formElementPaddingHorizontal} + ${borderWidthBase}*2 + ${hasUnitOrVisibleCounter || isSearch || isPassword || isCalendarOrTimeWithCustomIndicator ? getCalculatedFormElementPaddingHorizontal(isSearch ? 2 : 1) : '0px'})`,
        },
        wrapper: {
            display: 'grid',
            gridTemplateColumns: `${formElementLayeredSafeZone} auto minmax(0, 1fr) auto auto ${formElementLayeredSafeZone}`,
        },
        ...((isSearchOrPassword || isCalendarOrTimeWithCustomIndicator) && {
            // TODO: extract for multi-select, select-wrapper and text-field (not gridArea and placeSelf) like done for unit class
            button: {
                gridArea: '1/5',
                placeSelf: 'center',
                padding: formButtonOrIconPadding,
                // TODO: maybe we should render hidden button conditionally, needs to be checked if a11y compliant
                '&:not([hidden])~.button': {
                    gridArea: '1/4',
                },
            },
        }),
        ...(isSearchWithoutFormOrSubmitButton && {
            // TODO: extract for multi-select, select-wrapper and text-field (not gridArea and placeSelf) like done for unit class
            icon: {
                gridArea: '1/2',
                placeSelf: 'center',
                padding: formButtonOrIconPadding,
                pointerEvents: 'none',
            },
        }),
        ...(hasUnitOrVisibleCounter && {
            'unit-counter': {
                ...getUnitCounterJssStyle(isDisabled, isReadonly, theme),
                gridArea: `1/${unitPosition === 'suffix' ? 5 : 1}/1/${unitPosition === 'suffix' ? 7 : 3}`,
                placeSelf: 'center',
                paddingInline: unitPosition === 'suffix'
                    ? `${formElementLayeredGap} calc(${formElementPaddingHorizontal} + ${borderWidthBase})`
                    : `calc(${formElementPaddingHorizontal} + ${borderWidthBase}) ${formElementLayeredGap}`, // padding needed for correct input padding synchronisation
            },
        }),
        // TODO: maybe we should extract it as functional component too
        'sr-only': getHiddenTextJssStyle(),
        // .label / .required
        ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
        // .message
        ...getFunctionalComponentStateMessageStyles(theme, state),
    });
};

/** @deprecated */
const isListTypeOrdered = (type) => type !== 'unordered';
const isListTypeNumbered = (type) => type === 'numbered';

const cssVariablePaddingTop = '--p-internal-text-list-padding-top';
const cssVariablePaddingBottom = '--p-internal-text-list-padding-bottom';
const cssVariablePseudoSpace = '--p-internal-text-list-pseudo-space';
const cssVariableUnorderedGridColumn = '--p-internal-text-list-unordered-grid-column';
const cssVariableUnorderedPseudoContent = '--p-internal-text-list-unordered-pseudo-content';
const cssVariableOrderedGridColumn = '--p-internal-text-list-ordered-grid-column';
const cssVariableOrderedPseudoSuffix = '--p-internal-text-list-ordered-pseudo-suffix';
const counter = 'p-text-list-counter';
const getComponentCss$7 = (type, theme) => {
    const isOrderedList = isListTypeOrdered(type);
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    counterReset: counter,
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            'ol,ul': {
                ...textSmallStyle,
                margin: 0,
                padding: `var(${cssVariablePaddingTop},0) 0 var(${cssVariablePaddingBottom},0) 0`,
                listStyleType: 'none',
                color: getThemedColors(theme).primaryColor,
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    color: getThemedColors('dark').primaryColor,
                }),
            },
            // css selector for text-list-item
            '::slotted(*)': addImportantToEachRule({
                [cssVariablePaddingTop]: spacingStaticXSmall, // padding top for nested list
                [cssVariablePaddingBottom]: spacingStaticMedium, // padding bottom for nested list, TODO: in case it's last root list item with a nested list it would result in outer spacing which is not desired
                [cssVariablePseudoSpace]: isOrderedList
                    ? `var(${cssVariableOrderedGridColumn},1.5rem)`
                    : `var(${cssVariableUnorderedGridColumn},.375rem)`,
                '&::before': isOrderedList
                    ? {
                        content: `counters(${counter},'.',${isListTypeNumbered(type) ? 'decimal' : 'lower-latin'}) var(${cssVariableOrderedPseudoSuffix},'.')`,
                        counterIncrement: counter,
                        justifySelf: 'flex-end',
                        whiteSpace: 'nowrap',
                    }
                    : {
                        content: `var(${cssVariableUnorderedPseudoContent},'•')`,
                    },
            }),
        },
    });
};

const getComponentCss$6 = () => {
    return getCss({
        '@global': {
            ':host': {
                display: 'grid',
                ...addImportantToEachRule({
                    gridTemplateColumns: `var(${cssVariablePseudoSpace}) 1fr`,
                    columnGap: spacingStaticMedium,
                    font: 'inherit', // ensures style can't be overwritten from outside
                    color: 'inherit', // ensures style can't be overwritten from outside
                    ...hostHiddenStyles,
                }),
            },
            ...addImportantToEachRule({
                '::slotted(*)': {
                    [cssVariableUnorderedGridColumn]: '.625rem', // reserves space for ::before (nested unordered list)
                    [cssVariableUnorderedPseudoContent]: '"–"', // custom ::before char "–" (nested unordered list)
                    [cssVariableOrderedGridColumn]: '2rem', // reserves space for ::before (nested ordered list)
                    [cssVariableOrderedPseudoSuffix]: '""', // don't show ::before suffix "." (nested ordered list)
                },
                '::slotted(*:last-child)': {
                    gridColumn: 2,
                },
            }),
        },
    });
};

const TEXT_TAGS = ['p', 'span', 'div', 'address', 'blockquote', 'figcaption', 'cite', 'time', 'legend'];

const sizeMap = {
    'xx-small': fontSizeTextXXSmall,
    'x-small': fontSizeTextXSmall,
    small: fontSizeTextSmall,
    medium: fontSizeTextMedium,
    large: fontSizeTextLarge,
    'x-large': fontSizeTextXLarge,
};
const getComponentCss$5 = (size, weight, align, color, ellipsis, theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            [`::slotted(:is(${TEXT_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
        },
        root: getTypographyRootJssStyle(textSmallStyle, buildResponsiveStyles(size, (sizeValue) => ({
            fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap[sizeValue],
            fontWeight: getFontWeight(weight),
        })), align, color, ellipsis, theme),
    });
};

const getComponentCss$4 = (isDisabled, isReadonly, hideLabel, state, hasCounter, theme) => {
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            // ::slotted(textarea)
            ...mergeDeep(addImportantToEachRule(getSlottedTextFieldTextareaSelectStyles('textarea', state, false, theme, {
                gridArea: '1/1',
                // TODO: move into getSlottedTextFieldTextareaSelectStyles()
                font: textSmallStyle.font, // to override line-height
                // TODO: move into getSlottedTextFieldTextareaSelectStyles()
                padding: hasCounter
                    ? `12px ${formElementPaddingHorizontal} ${spacingStaticLarge}`
                    : `12px ${formElementPaddingHorizontal}`,
            })), {
                // TODO: is it possible to move into getSlottedTextFieldTextareaSelectStyles()?
                '::slotted(textarea)': {
                    height: 'auto', // removes !important from getBaseChildStyles
                    minHeight: '200px', // min-height should be overridable
                    resize: 'vertical', // overridable, too
                },
            }),
        },
        root: {
            display: 'grid',
            gap: spacingStaticXSmall,
            // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character.
            minWidth: `calc(1rem + ${formElementPaddingHorizontal}*2 + ${borderWidthBase}*2)`,
        },
        wrapper: {
            display: 'grid',
        },
        ...(hasCounter && {
            counter: {
                ...getUnitCounterJssStyle(isDisabled, isReadonly, theme),
                gridArea: '1/1',
                placeSelf: 'flex-end',
                padding: `6px calc(${formElementPaddingHorizontal} + ${borderWidthBase})`,
            },
            // TODO: maybe we should extract it as functional component too
            'sr-only': getHiddenTextJssStyle(),
        }),
        // .label / .required
        ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
        // .message
        ...getFunctionalComponentStateMessageStyles(theme, state),
    });
};

const getComponentCss$3 = (isDisabled, isReadonly, hideLabel, state, counter, resize, theme) => {
    const { primaryColor, contrastLowColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
    const { primaryColor: primaryColorDark, contrastLowColor: contrastLowColorDark, contrastMediumColor: contrastMediumColorDark, disabledColor: disabledColorDark, } = getThemedColors('dark');
    const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
    const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors('dark', state);
    return getCss({
        '@global': {
            ':host': {
                display: 'block',
                ...addImportantToEachRule({
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            ...preventFoucOfNestedElementsStyles,
            textarea: {
                resize,
                display: 'block',
                width: '100%',
                height: 'auto',
                margin: 0,
                outline: 0,
                WebkitAppearance: 'none', // iOS safari
                appearance: 'none',
                boxSizing: 'border-box',
                border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
                borderRadius: borderRadiusSmall,
                background: 'transparent',
                textIndent: 0,
                color: primaryColor,
                // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character.
                minWidth: `calc(1rem + ${formElementPaddingHorizontal}*2 + ${borderWidthBase}*2)`,
                transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
                ...prefersColorSchemeDarkMediaQuery(theme, {
                    borderColor: formStateColorDark || contrastMediumColorDark,
                    color: primaryColorDark,
                }),
                gridArea: '1/1',
                font: textSmallStyle.font, // to override line-height
                padding: counter
                    ? `12px ${formElementPaddingHorizontal} ${spacingStaticLarge}`
                    : `12px ${formElementPaddingHorizontal}`,
                // TODO: getFocusJssStyle() can't be re-used because focus style differs for form elements
                '&:focus': {
                    borderColor: primaryColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        borderColor: primaryColorDark,
                    }),
                },
                '&:disabled': {
                    cursor: 'not-allowed',
                    color: disabledColor,
                    borderColor: disabledColor,
                    WebkitTextFillColor: disabledColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        color: disabledColorDark,
                        borderColor: disabledColorDark,
                        WebkitTextFillColor: disabledColorDark,
                    }),
                },
                '&[readonly]': {
                    borderColor: contrastLowColor,
                    background: contrastLowColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        borderColor: contrastLowColorDark,
                        background: contrastLowColorDark,
                    }),
                },
            },
            ...hoverMediaQuery({
                // with the media query the selector has higher priority and overrides disabled styles
                'textarea:not(:disabled):not(:focus):not([readonly]):hover,label:hover~.wrapper textarea:not(:disabled):not(:focus):not([readonly])': {
                    borderColor: formStateHoverColor || primaryColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        borderColor: formStateHoverColorDark || primaryColorDark,
                    }),
                },
            }),
        },
        root: {
            display: 'grid',
            gap: spacingStaticXSmall,
        },
        wrapper: {
            display: 'grid',
        },
        ...(counter && {
            counter: {
                ...getUnitCounterJssStyle(isDisabled, isReadonly, theme),
                gridArea: '1/1',
                placeSelf: 'flex-end',
                padding: `6px calc(${formElementPaddingHorizontal} + ${borderWidthBase})`,
            },
            // TODO: maybe we should extract it as functional component too
            'sr-only': getHiddenTextJssStyle(),
        }),
        // .label / .required
        ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
        // .message
        ...getFunctionalComponentStateMessageStyles(theme, state),
    });
};

/**
 * @css-variable {"name": "--p-toast-position-bottom", "description": "Defines the spacing between the toast and the bottom edge of its container.", "defaultValue": "56px"}
 */
const cssVariablePositionBottom = '--p-toast-position-bottom'; // CSS custom property exposed as public interface
const cssVariablePositionBottomInternal = '--p-internal-toast-position-bottom';
const ANIMATION_DURATION = motionDurationModerate;
const duration = ANIMATION_DURATION;
const getKeyframes = (direction, outsideStyle) => {
    const insideStyle = { opacity: 1, transform: 'translate3d(0,0,0)' };
    return direction === 'in'
        ? {
            from: outsideStyle,
            to: insideStyle,
        }
        : {
            from: insideStyle,
            to: outsideStyle,
        };
};
const getKeyframesMobile = (direction, bottomVar) => getKeyframes(direction, {
    opacity: 0,
    transform: `translate3d(0,calc(var(${bottomVar}) + 100%),0)`, // space before and after "+" is crucial
});
const toastCloseClassName = 'close';
const getComponentCss$1 = () => {
    return getCss({
        '@global': {
            ':host': addImportantToEachRule({
                position: 'fixed', // fallback for older browsers without native `popover` support
                insetInline: gridExtendedOffsetBase,
                // Needs a not overridable internal css variable to cover default position depending on viewport size and to handle animation properly.
                // In addition, a public css variable can be passed to overwrite the default position.
                [cssVariablePositionBottomInternal]: `var(${cssVariablePositionBottom}, 56px)`,
                bottom: `var(${cssVariablePositionBottomInternal})`,
                zIndex: TOAST_Z_INDEX, // fallback for older browsers without native `popover` support
                [getMediaQueryMin('s')]: {
                    insetInline: '64px auto',
                    maxWidth: 'min(42rem, calc(100vw - 64px * 2))',
                    [cssVariablePositionBottomInternal]: `var(${cssVariablePositionBottom}, 64px)`,
                    bottom: `var(${cssVariablePositionBottomInternal})`,
                },
                ...colorSchemeStyles,
                ...hostHiddenStyles,
            }),
            ...preventFoucOfNestedElementsStyles,
            '@keyframes in': getKeyframesMobile('in', cssVariablePositionBottomInternal),
            '@keyframes out': getKeyframesMobile('out', cssVariablePositionBottomInternal),
        },
        hydrated: {
            animation: `${duration} $in ${motionEasingIn} forwards`,
        },
        [toastCloseClassName]: {
            animation: addImportantToRule(`${ANIMATION_DURATION} $out ${motionEasingOut} forwards`),
        },
    });
};

const getComponentCss = (size, theme) => {
    return getCss({
        '@global': {
            ':host': {
                position: 'relative',
                display: 'inline-block',
                verticalAlign: 'top',
                ...addImportantToEachRule({
                    outline: 0,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    boxSizing: 'content-box', // needed for correct height calculation when padding is set on host (e.g. custom click area)
                    ...(size !== 'inherit' && {
                        height: 'clamp(0.63rem, 0.42vw + 0.5rem, 1rem)',
                        // workaround for Safari to optimize image rendering
                        '@supports (height: round(down, 1px, 1px))': {
                            height: 'round(down, clamp(0.63rem, 0.42vw + 0.5rem, 1rem), 1px)',
                        },
                    }),
                    ...colorSchemeStyles,
                    ...hostHiddenStyles,
                }),
            },
            'a, svg': {
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
                height: 'inherit',
            },
            a: {
                textDecoration: 'none',
                '&::before': {
                    // needs to be defined always to have correct custom click area
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '1px',
                },
                ...getFocusJssStyle('light', { pseudo: true }), // TODO: we need to support theme
            },
            svg: isHighContrastMode
                ? {
                    fill: getHighContrastColors().canvasTextColor,
                }
                : {
                    fill: getThemedColors(theme).primaryColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                        fill: getThemedColors('dark').primaryColor,
                    }),
                },
        },
    });
};

export { cssVarButtonPureMargin, cssVarButtonPurePadding, cssVarInternalInputBaseScaling, getComponentCss$1l as getAccordionCss, getComponentCss$1k as getBannerCss, getComponentCss$1g as getButtonCss, getComponentCss$1j as getButtonGroupCss, getComponentCss$1i as getButtonPureCss, getComponentCss$1h as getButtonTileCss, getComponentCss$1f as getCanvasCss, getComponentCss$1e as getCarouselCss, getComponentCss$1c as getCheckboxCss, getComponentCss$1d as getCheckboxWrapperCss, getComponentCss$1b as getContentWrapperCss, getComponentCss$1a as getCrestCss, getComponentCss$19 as getDisplayCss, getComponentCss$18 as getDividerCss, getComponentCss$17 as getDrilldownCss, getComponentCss$16 as getDrilldownItemCss, getComponentCss$15 as getDrilldownLinkCss, getComponentCss$13 as getFieldsetCss, getComponentCss$14 as getFieldsetWrapperCss, getComponentCss$12 as getFlagCss, getComponentCss$10 as getFlexCss, getComponentCss$11 as getFlexItemCss, getComponentCss$$ as getFlyoutCss, getFunctionalComponentInputBaseStyles, getFunctionalComponentLabelStyles, getFunctionalComponentLoadingMessageStyles, getFunctionalComponentNoResultsOptionStyles, getFunctionalComponentRequiredStyles, getFunctionalComponentStateMessageStyles, getComponentCss$Z as getGridCss, getComponentCss$_ as getGridItemCss, getComponentCss$Y as getHeadingCss, getComponentCss$X as getHeadlineCss, getComponentCss$W as getIconCss, getComponentCss$V as getInlineNotificationCss, getComponentCss$U as getInputDateCss, getComponentCss$T as getInputEmailCss, getComponentCss$S as getInputNumberCss, getComponentCss$R as getInputPasswordCss, getComponentCss$Q as getInputSearchCss, getComponentCss$P as getInputTelCss, getComponentCss$O as getInputTextCss, getComponentCss$N as getInputTimeCss, getComponentCss$M as getInputUrlCss, getComponentCss$K as getLinkCss, getComponentCss$L as getLinkPureCss, getComponentCss$K as getLinkSocialCss, getComponentCss$H as getLinkTileCss, getComponentCss$J as getLinkTileModelSignatureCss, getComponentCss$I as getLinkTileProductCss, getComponentCss$G as getMarqueCss, getComponentCss$F as getModalCss, getComponentCss$E as getModelSignatureCss, getComponentCss$B as getMultiSelectCss, getComponentCss$D as getMultiSelectOptionCss, getComponentCss$C as getOptgroupCss, getComponentCss$A as getPaginationCss, getComponentCss$z as getPinCodeCss, getComponentCss$y as getPopoverCss, getComponentCss$x as getRadioButtonWrapperCss, getScalingVar, getComponentCss$w as getScrollerCss, getComponentCss$u as getSegmentedControlCss, getComponentCss$v as getSegmentedControlItemCss, getComponentCss$q as getSelectCss, getComponentCss$r as getSelectOptionCss, getComponentCss$s as getSelectWrapperCss, getComponentCss$t as getSelectWrapperDropdownCss, getComponentCss$p as getSheetCss, getComponentCss$o as getSpinnerCss, getComponentCss$m as getStepperHorizontalCss, getComponentCss$n as getStepperHorizontalItemCss, getComponentCss$l as getSwitchCss, getComponentCss$k as getTableBodyCss, getComponentCss$i as getTableCellCss, getComponentCss$j as getTableCss, getComponentCss$h as getTableHeadCellCss, getComponentCss$f as getTableHeadCss, getComponentCss$g as getTableHeadRowCss, getComponentCss$e as getTableRowCss, getComponentCss$d as getTabsBarCss, getComponentCss$b as getTabsCss, getComponentCss$c as getTabsItemCss, getComponentCss$9 as getTagCss, getComponentCss$a as getTagDismissibleCss, getComponentCss$5 as getTextCss, getComponentCss$8 as getTextFieldWrapperCss, getComponentCss$7 as getTextListCss, getComponentCss$6 as getTextListItemCss, getComponentCss$3 as getTextareaCss, getComponentCss$4 as getTextareaWrapperCss, getComponentCss$1 as getToastCss, getComponentCss as getWordmarkCss };
