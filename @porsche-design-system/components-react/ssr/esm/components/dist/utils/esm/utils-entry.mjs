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

// NOTE: these utils are in the same file on purpose
// to force them being bundled into our core chunk
const getTagName = (el) => el.tagName.toLowerCase();
const getTagNameWithoutPrefix = (host) => {
    const tagName = getTagName(host);
    const [, tagNameWithoutPrefix = ''] = /^(?:[a-z-]+-)?(p-[a-z-]+)$/.exec(tagName) || [];
    return (tagNameWithoutPrefix || tagName); // return tagName as fallback for default tags
};

/* eslint-disable prefer-arrow/prefer-arrow-functions */
function getClosestHTMLElement(element, selector) {
    return element?.closest(selector);
}

function getHTMLElement(element, selector) {
    return element?.querySelector(selector);
}

const transformSelectorToDirectChildSelector = (selector) => selector
    .split(',')
    .map((part) => `:scope>${part}`)
    .join();

/* eslint-disable prefer-arrow/prefer-arrow-functions */
function getDirectChildHTMLElement(element, selector) {
    // querySelector(All) doesn't work with :scope pseudo class and comma separator in jsdom, yet
    // https://github.com/jsdom/jsdom/issues/3141
    // therefore we got a workaround so it works nicely when consumed from jsdom-polyfill package
    return (transformSelectorToDirectChildSelector(selector)
        .split(',')
        .map((sel) => getHTMLElement(element, sel))
        .filter((x) => x)[0] || null // comma separated selector might return null, so we have to filter
    );
}

const hasSpecificDirectChildTag = (host, tag) => {
    const el = getDirectChildHTMLElement(host, ':only-child');
    return !!el?.matches(tag);
};

const isDisabledOrLoading = (disabled, loading) => {
    return disabled || loading;
};

const isElementOfKind = (element, tagName) => getTagNameWithoutPrefix(element) === tagName;

const parseJSONAttribute = (attribute) => {
    // Input is object, e.g. { 'aria-label': 'Some label' }
    if (typeof attribute !== 'string') {
        return attribute;
    }
    return JSON.parse(attribute
        // Convert colon to tmp colon
        .replace(/(?<=['"]\s*\w+[\s\w]*):/g, '__tmp-colon__')
        // Convert single quotes to double quotes except the ones which are escaped by backslash
        .replace(/\\'/g, '__escaped_single_quote__')
        .replace(/'/g, '"')
        .replace(/__escaped_single_quote__/g, "\\'")
        // Remove string escapes except the ones followed by unicode u0027
        .replace(/([^\\])\\(?!u0027)/g, '$1')
        // Wrap keys in double quotes
        .replace(/[\s"]?([\w-]+)[\s"]?:/g, '"$1":')
        // Convert tmp colon to real colon after all other replacements
        .replace(/__tmp-colon__/g, ':'));
};

const hasWindow$1 = typeof window !== 'undefined';
const parseAndGetAriaAttributes = (rawAttributes) => {
    if (rawAttributes) {
        return Object.fromEntries(Object.entries(parseJSONAttribute(rawAttributes)).map(([key, val]) => [
            key,
            // convert booleans to strings so that values are properly set and not just result in attributes without a value when true in jsx
            typeof val === 'boolean' ? `${val}` : val,
        ]));
    }
    return undefined;
};
hasWindow$1 && window.matchMedia?.('(forced-colors: active)').matches;

const getButtonBaseAriaAttributes = (isDisabled, isLoading) => {
    return {
        'aria-disabled': isDisabledOrLoading(isDisabled, isLoading) ? 'true' : null,
    };
};
// TODO: Can this be shared with select-wrapper dropdown?
const getComboboxAriaAttributes = (isOpen, isRequired, labelId, descriptionId, dropdownId) => {
    return {
        'aria-labelledby': labelId || null,
        'aria-describedby': descriptionId || null,
        'aria-haspopup': 'listbox',
        'aria-expanded': isOpen ? 'true' : 'false',
        'aria-required': isRequired ? 'true' : 'false',
        'aria-controls': dropdownId,
    };
};

const borderWidthBase = '2px';

const fontFamily = "'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif";

const fontHyphenationStyle = {
    overflowWrap: 'break-word',
    hyphens: 'auto',
};

const fontLineHeight = 'calc(6px + 2.125ex)';

const fontSizeTextXSmall = 'clamp(0.81rem, 0.23vw + 0.77rem, 0.88rem)';

const fontSizeTextSmall = '1rem';

const fontWeightRegular = 400;

const fontStyleNormal = 'normal';

const fontVariant = 'normal';

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

const breakpoints = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

const _textFontPartA = `${fontStyleNormal} ${fontVariant} ${fontWeightRegular} `;
const _textFontPartB = `/${fontLineHeight} ${fontFamily}`;

const textXSmallStyle = {
    font: `${_textFontPartA}${fontSizeTextXSmall}${_textFontPartB}`,
    ...fontHyphenationStyle,
};

const textSmallStyle = {
    font: `${_textFontPartA}${fontSizeTextSmall}${_textFontPartB}`,
    ...fontHyphenationStyle,
};

// NOTE: handpicked selection of plugins from jss-preset-default
createJss({
    plugins: [
        jssGlobal(),
        jssNested(),
        camelCase(),
        jssPluginSortMediaQueries({ combineMediaQueries: true }),
    ],
});
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
hasWindow$1 &&
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
hasWindow$1 && window.matchMedia ? mediaQueries.map(window.matchMedia) : [];

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
hasWindow$1 &&
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

const isTouchDevice = () => {
    if (!hasWindow$1) {
        return undefined;
    }
    return !!('ontouchstart' in window || window.navigator.maxTouchPoints > 0);
};

const isWithinForm = (host) => !!getClosestHTMLElement(host, 'form');

const getCDNBaseURL = () => "./assets";

// index.ts
var CRESTS_MANIFEST = { "porscheCrest": { "1x": { "png": "porsche-crest.d76137c@1x.png", "webp": "porsche-crest.0d0cc89@1x.webp" }, "2x": { "png": "porsche-crest.8a292fb@2x.png", "webp": "porsche-crest.2245c45@2x.webp" }, "3x": { "png": "porsche-crest.18d6f02@3x.png", "webp": "porsche-crest.19b4292@3x.webp" } } };

// index.ts
var FLAGS_MANIFEST = { "ae": "ae.070e003.svg", "am": "am.b228450.svg", "ar": "ar.d3ecad6.svg", "at": "at.19b8f3c.svg", "au": "au.9ccee18.svg", "az": "az.463b388.svg", "ba": "ba.57e215c.svg", "be": "be.6601715.svg", "bg": "bg.2a1ef06.svg", "bh": "bh.f6ce1b1.svg", "bn": "bn.5bb9faf.svg", "bo": "bo.2a95304.svg", "br": "br.071ef4a.svg", "by": "by.bbe68ec.svg", "ca": "ca.3524ab1.svg", "ch": "ch.1cc9a58.svg", "cl": "cl.7226017.svg", "cn": "cn.3e2e196.svg", "co": "co.40bd283.svg", "cr": "cr.d275fe4.svg", "cw": "cw.2a2e69b.svg", "cy": "cy.eecbae2.svg", "cz": "cz.84fcee1.svg", "de": "de.b575e11.svg", "dk": "dk.8faad28.svg", "do": "do.8cbff53.svg", "dz": "dz.92ac4dd.svg", "ec": "ec.8b790aa.svg", "ee": "ee.0d69319.svg", "eg": "eg.3d6e702.svg", "es": "es.8259527.svg", "fi": "fi.abcdec4.svg", "fr": "fr.e6f575e.svg", "gb": "gb.c8be57d.svg", "ge": "ge.1828ada.svg", "gh": "gh.dcc9966.svg", "gr": "gr.8d404a0.svg", "gt": "gt.d28dda2.svg", "hk": "hk.a791020.svg", "hn": "hn.61767b1.svg", "hr": "hr.09fd51c.svg", "ht": "ht.a0f15d3.svg", "hu": "hu.1e61356.svg", "id": "id.01c0ab3.svg", "ie": "ie.cec77fa.svg", "il": "il.add57d7.svg", "in": "in.15aa313.svg", "is": "is.2d193b5.svg", "it": "it.d26868c.svg", "jm": "jm.6266f91.svg", "jo": "jo.6759235.svg", "jp": "jp.32c39a2.svg", "ke": "ke.96a51ec.svg", "kh": "kh.ac03e8a.svg", "kr": "kr.f9b3228.svg", "kw": "kw.ecb70e0.svg", "kz": "kz.5f31a4b.svg", "lb": "lb.eed52fa.svg", "lk": "lk.1b44ee9.svg", "lt": "lt.5448f1b.svg", "lu": "lu.11992af.svg", "lv": "lv.c45d630.svg", "ma": "ma.37960b7.svg", "md": "md.7ed7b6b.svg", "mk": "mk.08eaad6.svg", "mn": "mn.fd0cde6.svg", "mo": "mo.a7e3c7c.svg", "mq": "mq.f55f7ca.svg", "mt": "mt.1ee108a.svg", "mu": "mu.f901db6.svg", "mx": "mx.c39bf62.svg", "my": "my.b7366cd.svg", "ng": "ng.d1ac1ea.svg", "nl": "nl.0569e12.svg", "no": "no.b4f2c38.svg", "nz": "nz.a70a24d.svg", "om": "om.d63d939.svg", "pa": "pa.f33ec1a.svg", "pe": "pe.2cacc5f.svg", "pf": "pf.50807f4.svg", "ph": "ph.1df49d2.svg", "pk": "pk.86b11da.svg", "pl": "pl.e0ef0ec.svg", "pr": "pr.79d60a1.svg", "pt": "pt.c903b10.svg", "py": "py.e39a820.svg", "qa": "qa.47e5e31.svg", "ro": "ro.9d14812.svg", "rs": "rs.7c7c211.svg", "ru": "ru.eb87254.svg", "sa": "sa.1a8f5b9.svg", "se": "se.f2705e2.svg", "sg": "sg.bca7a48.svg", "si": "si.c018e71.svg", "sk": "sk.d3177a9.svg", "sv": "sv.26aaba9.svg", "th": "th.1c48f08.svg", "tn": "tn.e119e22.svg", "tr": "tr.b4170f9.svg", "tt": "tt.7f3e1df.svg", "ua": "ua.73e5a3e.svg", "us": "us.10d7b02.svg", "uy": "uy.666b0bc.svg", "uz": "uz.8fa8ad3.svg", "ve": "ve.6cd1ec7.svg", "vn": "vn.3e0128f.svg", "za": "za.1bb0840.svg" };

// index.ts
var ICONS_MANIFEST = { "360": "360.0600731.svg", "4-wheel-drive": "4-wheel-drive.9c218bf.svg", "accessibility": "accessibility.087d747.svg", "active-cabin-ventilation": "active-cabin-ventilation.b081399.svg", "add": "add.fac861a.svg", "adjust": "adjust.ca46bd4.svg", "aggregation": "aggregation.96f06e5.svg", "ai-spark": "ai-spark.a134e18.svg", "ai-spark-filled": "ai-spark-filled.2d5d971.svg", "arrow-compact-down": "arrow-compact-down.9b37afe.svg", "arrow-compact-left": "arrow-compact-left.7169de6.svg", "arrow-compact-right": "arrow-compact-right.cc2d1d2.svg", "arrow-compact-up": "arrow-compact-up.36724bb.svg", "arrow-double-down": "arrow-double-down.61ae4d7.svg", "arrow-double-left": "arrow-double-left.1b576eb.svg", "arrow-double-right": "arrow-double-right.dcfabff.svg", "arrow-double-up": "arrow-double-up.fb73db5.svg", "arrow-down": "arrow-down.49c6983.svg", "arrow-first": "arrow-first.beb7d9f.svg", "arrow-head-down": "arrow-head-down.1e3cbb8.svg", "arrow-head-left": "arrow-head-left.cf1395d.svg", "arrow-head-right": "arrow-head-right.304b330.svg", "arrow-head-up": "arrow-head-up.6d3fd23.svg", "arrow-last": "arrow-last.cc24903.svg", "arrow-left": "arrow-left.e03c25b.svg", "arrow-right": "arrow-right.872716b.svg", "arrow-up": "arrow-up.9d294d1.svg", "arrows": "arrows.de040f9.svg", "attachment": "attachment.8f3dd0a.svg", "augmented-reality": "augmented-reality.8b6ce95.svg", "battery-empty": "battery-empty.38b4b15.svg", "battery-empty-co2": "battery-empty-co2.c4cabef.svg", "battery-empty-fuel": "battery-empty-fuel.e833e13.svg", "battery-full": "battery-full.03de75d.svg", "battery-half": "battery-half.11f1ef8.svg", "battery-one-quarter": "battery-one-quarter.91235a0.svg", "battery-three-quarters": "battery-three-quarters.dcf768f.svg", "bell": "bell.1eab3a2.svg", "bookmark": "bookmark.9d6982f.svg", "bookmark-filled": "bookmark-filled.327ac78.svg", "brain": "brain.838387a.svg", "broadcast": "broadcast.0ad5a15.svg", "cabriolet": "cabriolet.ab33aab.svg", "calculator": "calculator.a323a2d.svg", "calendar": "calendar.70a6a12.svg", "camera": "camera.e5e95b9.svg", "car": "car.35229c9.svg", "car-battery": "car-battery.895510f.svg", "card": "card.f284448.svg", "charging-active": "charging-active.c3aa214.svg", "charging-network": "charging-network.a40072f.svg", "charging-state": "charging-state.f56d8df.svg", "charging-station": "charging-station.5ff1ed4.svg", "chart": "chart.c8c32d2.svg", "chat": "chat.7945544.svg", "check": "check.8ba06be.svg", "city": "city.5ae672c.svg", "climate": "climate.a9d5818.svg", "climate-control": "climate-control.ce31939.svg", "clock": "clock.c88a1ef.svg", "close": "close.eec3c5d.svg", "closed-caption": "closed-caption.ceaf6cb.svg", "cloud": "cloud.2c3959e.svg", "co2-class": "co2-class.fc49211.svg", "co2-emission": "co2-emission.c42e7f8.svg", "color-picker": "color-picker.598f402.svg", "compare": "compare.6578829.svg", "compass": "compass.f90f319.svg", "configurate": "configurate.5311c8d.svg", "copy": "copy.0fcd086.svg", "country-road": "country-road.d2bbc5a.svg", "coupe": "coupe.7549e3e.svg", "cubic-capacity": "cubic-capacity.7b0b8c8.svg", "cut": "cut.851e5c2.svg", "delete": "delete.5a8c8ca.svg", "disable": "disable.5918c32.svg", "dislike": "dislike.51614b0.svg", "dislike-filled": "dislike-filled.e1a8c4d.svg", "document": "document.df36b6c.svg", "door": "door.61c32d6.svg", "download": "download.c06f455.svg", "drag": "drag.9e893fd.svg", "duration": "duration.94e5252.svg", "ear": "ear.27a802f.svg", "edit": "edit.330f321.svg", "email": "email.f2530de.svg", "error": "error.b8ae9ad.svg", "error-filled": "error-filled.a4d06ed.svg", "exclamation": "exclamation.46cd17b.svg", "exclamation-filled": "exclamation-filled.9d09ed1.svg", "external": "external.fb677b9.svg", "fast-backward": "fast-backward.a71faae.svg", "fast-forward": "fast-forward.1e6fa9f.svg", "file-csv": "file-csv.4140e24.svg", "file-excel": "file-excel.56d577d.svg", "filter": "filter.610f808.svg", "fingerprint": "fingerprint.6a85170.svg", "flag": "flag.7af5baf.svg", "flash": "flash.88a2ada.svg", "fuel-station": "fuel-station.f7bdf51.svg", "garage": "garage.5014e8d.svg", "genuine-parts": "genuine-parts.6bfddde.svg", "geo-localization": "geo-localization.516d603.svg", "gift": "gift.7beb1eb.svg", "globe": "globe.56cc8fc.svg", "grid": "grid.06bc31a.svg", "grip": "grip.5ec4289.svg", "group": "group.051436a.svg", "hand": "hand.4e85714.svg", "heart": "heart.9a5962e.svg", "heart-filled": "heart-filled.dd7decf.svg", "highway": "highway.bf0eb24.svg", "highway-filled": "highway-filled.38e93fb.svg", "history": "history.f09645c.svg", "home": "home.7b1d1da.svg", "horn": "horn.bf47b1a.svg", "image": "image.b2614f0.svg", "increase": "increase.700012f.svg", "information": "information.da41162.svg", "information-filled": "information-filled.8f08911.svg", "key": "key.ee5d89b.svg", "laptop": "laptop.c422480.svg", "leaf": "leaf.92ca6a6.svg", "leather": "leather.1d2769a.svg", "light": "light.f0eb8e4.svg", "like": "like.a7468cd.svg", "like-filled": "like-filled.a0126c1.svg", "limousine": "limousine.87799d5.svg", "linked": "linked.8f30cb5.svg", "list": "list.411dd00.svg", "locate": "locate.6554f9e.svg", "lock": "lock.243281a.svg", "lock-open": "lock-open.95803d2.svg", "logo-apple-carplay": "logo-apple-carplay.c872af9.svg", "logo-apple-music": "logo-apple-music.1395f37.svg", "logo-apple-podcast": "logo-apple-podcast.09be038.svg", "logo-baidu": "logo-baidu.9e89c7d.svg", "logo-delicious": "logo-delicious.e83f574.svg", "logo-digg": "logo-digg.f096670.svg", "logo-facebook": "logo-facebook.74abe88.svg", "logo-foursquare": "logo-foursquare.d638fd8.svg", "logo-gmail": "logo-gmail.5f96ee2.svg", "logo-google": "logo-google.1dee423.svg", "logo-hatena": "logo-hatena.da509f0.svg", "logo-instagram": "logo-instagram.b916daa.svg", "logo-kaixin": "logo-kaixin.b1211a2.svg", "logo-kakaotalk": "logo-kakaotalk.38f5396.svg", "logo-kununu": "logo-kununu.79344ff.svg", "logo-linkedin": "logo-linkedin.b72559f.svg", "logo-naver": "logo-naver.75588fe.svg", "logo-pinterest": "logo-pinterest.e8f6963.svg", "logo-qq": "logo-qq.6d9b6d9.svg", "logo-qq-share": "logo-qq-share.ee864d9.svg", "logo-reddit": "logo-reddit.da13e44.svg", "logo-skyrock": "logo-skyrock.eb2f28d.svg", "logo-snapchat": "logo-snapchat.ef706a2.svg", "logo-sohu": "logo-sohu.a30c66b.svg", "logo-spotify": "logo-spotify.2ec4b2d.svg", "logo-tecent": "logo-tecent.d119e85.svg", "logo-telegram": "logo-telegram.d151481.svg", "logo-tiktok": "logo-tiktok.2f3a465.svg", "logo-tumblr": "logo-tumblr.c689f44.svg", "logo-twitter": "logo-twitter.5f2490a.svg", "logo-viber": "logo-viber.198bd43.svg", "logo-vk": "logo-vk.37b94e0.svg", "logo-wechat": "logo-wechat.83b2b98.svg", "logo-weibo": "logo-weibo.c8dacee.svg", "logo-whatsapp": "logo-whatsapp.add9a6d.svg", "logo-x": "logo-x.5f2490a.svg", "logo-xing": "logo-xing.3a8df0f.svg", "logo-yahoo": "logo-yahoo.8cbd0ba.svg", "logo-youku": "logo-youku.fe988d0.svg", "logo-youtube": "logo-youtube.da3798f.svg", "logout": "logout.7ec7451.svg", "map": "map.c16f618.svg", "menu-dots-horizontal": "menu-dots-horizontal.788f7fa.svg", "menu-dots-vertical": "menu-dots-vertical.4970a65.svg", "menu-lines": "menu-lines.e332216.svg", "microphone": "microphone.8ecdce6.svg", "minus": "minus.f6d964c.svg", "mobile": "mobile.7f35446.svg", "moon": "moon.5b73246.svg", "new-chat": "new-chat.95ffd2e.svg", "news": "news.5b604b0.svg", "north-arrow": "north-arrow.2da1dbe.svg", "oil-can": "oil-can.cb58fc7.svg", "online-search": "online-search.90e9ab1.svg", "parking-brake": "parking-brake.45704bd.svg", "parking-light": "parking-light.c49a231.svg", "paste": "paste.dd60261.svg", "pause": "pause.e41b935.svg", "phone": "phone.f4f774b.svg", "pin": "pin.3417cec.svg", "pin-filled": "pin-filled.7b8e9ba.svg", "pivot": "pivot.3ae18b8.svg", "play": "play.24226d4.svg", "plug": "plug.c159935.svg", "plus": "plus.319993e.svg", "preheating": "preheating.e2a796f.svg", "price-tag": "price-tag.f0d3917.svg", "printer": "printer.f59b0ee.svg", "purchase": "purchase.9cd6d65.svg", "push-pin": "push-pin.89e4ead.svg", "push-pin-off": "push-pin-off.ba99213.svg", "qr": "qr.87a49a3.svg", "qr-off": "qr-off.64e21b9.svg", "question": "question.3402a63.svg", "question-filled": "question-filled.cf25dd5.svg", "racing-flag": "racing-flag.b7ddcc8.svg", "radar": "radar.de5a6c1.svg", "radio": "radio.2b48e53.svg", "refresh": "refresh.41fd868.svg", "replay": "replay.55a99f2.svg", "reset": "reset.e53d52f.svg", "return": "return.46d30de.svg", "road": "road.bd3d4bc.svg", "roof-closed": "roof-closed.018d021.svg", "roof-open": "roof-open.51c8ee6.svg", "route": "route.f4fbbb4.svg", "rss": "rss.0e77baf.svg", "save": "save.6171ff5.svg", "screen": "screen.420be15.svg", "search": "search.3f0f1ce.svg", "seat": "seat.a3ebc40.svg", "send": "send.b32099c.svg", "service-technician": "service-technician.8749028.svg", "share": "share.a0b30da.svg", "shopping-bag": "shopping-bag.3f91a9b.svg", "shopping-bag-filled": "shopping-bag-filled.abf6c98.svg", "shopping-cart": "shopping-cart.370e224.svg", "shopping-cart-filled": "shopping-cart-filled.e0c3a65.svg", "sidebar": "sidebar.8e43896.svg", "sidelights": "sidelights.65c9dd9.svg", "skip-backward": "skip-backward.cd25ac5.svg", "skip-forward": "skip-forward.001e97f.svg", "snowflake": "snowflake.83907b3.svg", "sort": "sort.92b50bd.svg", "stack": "stack.804af93.svg", "star": "star.4c5bb15.svg", "star-filled": "star-filled.84ef2f6.svg", "steering-wheel": "steering-wheel.4dea19e.svg", "stop": "stop.173b6ac.svg", "stopwatch": "stopwatch.0e048a4.svg", "subtract": "subtract.57eed1d.svg", "success": "success.b16d4c1.svg", "success-filled": "success-filled.1832d98.svg", "sun": "sun.4301cbd.svg", "suv": "suv.33ac4aa.svg", "switch": "switch.66f74c4.svg", "tablet": "tablet.07341ac.svg", "tachometer": "tachometer.3a2fc3c.svg", "theme": "theme.08f6508.svg", "tire": "tire.e5c9372.svg", "trigger-finger": "trigger-finger.65aa6e2.svg", "truck": "truck.2c26c04.svg", "turismo": "turismo.a066b9f.svg", "unlinked": "unlinked.e9afe39.svg", "upload": "upload.d1f5a2a.svg", "user": "user.c18dabe.svg", "user-filled": "user-filled.2ea646d.svg", "user-group": "user-group.79cdf86.svg", "user-manual": "user-manual.470e243.svg", "video": "video.7590689.svg", "view": "view.5b4d7f6.svg", "view-off": "view-off.a4ede54.svg", "volume-off": "volume-off.bcd49e7.svg", "volume-up": "volume-up.2084f60.svg", "warning": "warning.59927e6.svg", "warning-filled": "warning-filled.1f6fe21.svg", "weather": "weather.9c96bd7.svg", "weight": "weight.b57a60d.svg", "wifi": "wifi.e2a8d9c.svg", "work": "work.9dd71a4.svg", "wrench": "wrench.09a2a67.svg", "wrenches": "wrenches.d2ed45d.svg", "zoom-in": "zoom-in.ff299b8.svg", "zoom-out": "zoom-out.ebb6246.svg" };

// index.ts
var MARQUES_MANIFEST = { "porscheMarqueTrademark": { "medium": { "1x": { "png": "porsche-marque-trademark.medium.da07531@1x.png", "webp": "porsche-marque-trademark.medium.5c6af9a@1x.webp" }, "2x": { "png": "porsche-marque-trademark.medium.aa801f4@2x.png", "webp": "porsche-marque-trademark.medium.fff6e9b@2x.webp" }, "3x": { "png": "porsche-marque-trademark.medium.824818d@3x.png", "webp": "porsche-marque-trademark.medium.f67092f@3x.webp" } }, "small": { "1x": { "png": "porsche-marque-trademark.small.020244b@1x.png", "webp": "porsche-marque-trademark.small.7836397@1x.webp" }, "2x": { "png": "porsche-marque-trademark.small.92184fa@2x.png", "webp": "porsche-marque-trademark.small.760a57e@2x.webp" }, "3x": { "png": "porsche-marque-trademark.small.fd545ce@3x.png", "webp": "porsche-marque-trademark.small.1726036@3x.webp" } } }, "porscheMarque": { "medium": { "1x": { "png": "porsche-marque.medium.a986274@1x.png", "webp": "porsche-marque.medium.fa908e4@1x.webp" }, "2x": { "png": "porsche-marque.medium.089d6dd@2x.png", "webp": "porsche-marque.medium.7f0893d@2x.webp" }, "3x": { "png": "porsche-marque.medium.2cb8743@3x.png", "webp": "porsche-marque.medium.3534cf0@3x.webp" } }, "small": { "1x": { "png": "porsche-marque.small.ac20427@1x.png", "webp": "porsche-marque.small.005debe@1x.webp" }, "2x": { "png": "porsche-marque.small.22f1e9d@2x.png", "webp": "porsche-marque.small.df43173@2x.webp" }, "3x": { "png": "porsche-marque.small.4920924@3x.png", "webp": "porsche-marque.small.cfd6149@3x.webp" } } }, "porscheMarque75": { "medium": { "1x": { "png": "porsche-marque75.medium.0a02e22@1x.png", "webp": "porsche-marque75.medium.99b2d65@1x.webp" }, "2x": { "png": "porsche-marque75.medium.1d41ecf@2x.png", "webp": "porsche-marque75.medium.e32580c@2x.webp" }, "3x": { "png": "porsche-marque75.medium.373bcb5@3x.png", "webp": "porsche-marque75.medium.4a003d1@3x.webp" } }, "small": { "1x": { "png": "porsche-marque75.small.f5b37fe@1x.png", "webp": "porsche-marque75.small.146b06c@1x.webp" }, "2x": { "png": "porsche-marque75.small.20d8690@2x.png", "webp": "porsche-marque75.small.025770f@2x.webp" }, "3x": { "png": "porsche-marque75.small.e89b13e@3x.png", "webp": "porsche-marque75.small.a725d2e@3x.webp" } } } };

// index.ts
var MODEL_SIGNATURES_MANIFEST = { "718": { "src": "718.493a9e3.svg", "width": 79, "height": 26 }, "911": { "src": "911.b68f913.svg", "width": 94, "height": 25 }, "boxster": { "src": "boxster.c321738.svg", "width": 239, "height": 26 }, "cayenne": { "src": "cayenne.2556201.svg", "width": 245, "height": 35 }, "cayman": { "src": "cayman.cc89196.svg", "width": 229, "height": 35 }, "macan": { "src": "macan.a1844f4.svg", "width": 196, "height": 26 }, "panamera": { "src": "panamera.6dae809.svg", "width": 260, "height": 25 }, "taycan": { "src": "taycan.df444c6.svg", "width": 167, "height": 36 }, "turbo-s": { "src": "turbo-s.73f1e10.svg", "width": 199, "height": 25 }, "turbo": { "src": "turbo.6a4084a.svg", "width": 143, "height": 25 } };

const hasDocument = typeof document !== 'undefined';

const hasShowPickerSupport = () => (hasDocument &&
    'showPicker' in HTMLInputElement.prototype &&
    CSS.supports('selector(::-webkit-calendar-picker-indicator)'));

// This class is shared since the popover needs to register a scroll listener to this node in order to hide the popover when the table is scrolled
const scrollAreaClass = 'scroll-area';
const isScrollable = (isPrevHidden, isNextHidden) => {
    return !(isPrevHidden && isNextHidden);
};

/**
 * Checks if the current environment supports the native Popover API.
 *
 * @returns {boolean} `true` if the native Popover API is supported, `false` otherwise.
 */
const supportsNativePopover = () => {
    if (!hasWindow$1) {
        return false;
    }
    return Object.hasOwn(HTMLElement.prototype, 'popover');
};
// determine it once
const hasNativePopoverSupport = supportsNativePopover();
// getter for easy mocking
const getHasNativePopoverSupport = () => hasNativePopoverSupport;

/*
 Stencil Client Platform v4.23.0 | MIT Licensed | https://stenciljs.com
 */
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/utils/result.ts
var result_exports = {};
__export(result_exports, {
  err: () => err,
  map: () => map,
  ok: () => ok,
  unwrap: () => unwrap,
  unwrapErr: () => unwrapErr
});
var ok = (value) => ({
  isOk: true,
  isErr: false,
  value
});
var err = (value) => ({
  isOk: false,
  isErr: true,
  value
});
function map(result, fn) {
  if (result.isOk) {
    const val = fn(result.value);
    if (val instanceof Promise) {
      return val.then((newVal) => ok(newVal));
    } else {
      return ok(val);
    }
  }
  if (result.isErr) {
    const value = result.value;
    return err(value);
  }
  throw "should never get here";
}
var unwrap = (result) => {
  if (result.isOk) {
    return result.value;
  } else {
    throw result.value;
  }
};
var unwrapErr = (result) => {
  if (result.isErr) {
    return result.value;
  } else {
    throw result.value;
  }
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
const getButtonPureAriaAttributes = (isDisabled, isLoading, aria) => {
    return {
        ...parseAndGetAriaAttributes(aria),
        ...getButtonBaseAriaAttributes(isDisabled, isLoading),
    };
};

const getButtonAriaAttributes = (isDisabled, isLoading, aria) => {
    return {
        ...parseAndGetAriaAttributes(aria),
        ...getButtonBaseAriaAttributes(isDisabled, isLoading),
    };
};
getMediaQueryMin('s');
getMediaQueryMin('xxl');
['auto', ...Array.from(new Array(10), (_, i) => i + 1)];
// Infinite bullets will be shown if the total number of bullets is greater than this value
const INFINITE_BULLET_THRESHOLD = 5;
const isInfinitePagination = (amountOfPages) => {
    return amountOfPages > INFINITE_BULLET_THRESHOLD;
};

const labelId = 'label';
const descriptionId = 'description';

const buildCrestSrcSet = (format) => {
    return Object.entries(CRESTS_MANIFEST.porscheCrest)
        .map(([resolution, fileName]) => `${getCDNBaseURL()}/porsche-design-system/crest/${fileName[format]} ${resolution}`)
        .join();
};
const buildCrestImgSrc = () => {
    return `${getCDNBaseURL()}/porsche-design-system/crest/${CRESTS_MANIFEST.porscheCrest['2x'].png}`;
};
const crestSize = {
    width: 30,
    height: 40,
};

const DISPLAY_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const displaySizeToTagMap = {
    small: 'h3',
    medium: 'h2',
    large: 'h1',
    inherit: 'h1',
};
const getDisplayTagType = (host, size, tag) => {
    if (hasSpecificDirectChildTag(host, DISPLAY_TAGS.join())) {
        return 'div';
    }
    if (tag) {
        return tag;
    }
    return displaySizeToTagMap[size] || 'h1';
};
/**
 * Updates the state of the drilldown and its children based on the provided activeItem and value.
 *
 * @param {string | undefined} activeItem - The drilldown-item element which is currently active (which has the activeIdentifier as identifier). If undefined, updates the root element.
 * @param {boolean} value - The new state value to apply.
 * @returns {void}
 */
const updateDrilldownItemState = (activeItem, value) => {
    activeItem.secondary = value;
    traverseTreeAndUpdateState(activeItem.parentElement, 'primary', value);
};
/**
 * Recursively updates the state of a drilldown item's parent elements by traversing up the DOM tree.
 *
 * @param {HTMLPDrilldownItemElement} activeItem - The current drilldown item being updated.
 * @param {'primary' | 'secondary' | 'cascade'} prop - The property of the drilldown item to update.
 * @param {boolean} value - The new state value to apply.
 */
const traverseTreeAndUpdateState = (activeItem, prop, value) => {
    if (isElementOfKind(activeItem, 'p-drilldown-item')) {
        activeItem[prop] = value;
        traverseTreeAndUpdateState(activeItem.parentElement, 'cascade', value);
    }
};
const getFieldsetAriaAttributes = (isRequired, isInvalid, aria) => {
    const ariaAttrs = parseAndGetAriaAttributes(aria);
    return {
        ...ariaAttrs,
        ...(isRequired && ariaAttrs?.role === 'radiogroup' && { 'aria-required': 'true' }),
        ...(isInvalid && { 'aria-invalid': 'true' }),
    };
};
const buildFlagUrl = (flagName) => {
    return `${getCDNBaseURL()}/porsche-design-system/flags/${FLAGS_MANIFEST[flagName] || FLAGS_MANIFEST.de}`;
};
const headingSizeToTagMap = {
    small: 'h6',
    medium: 'h5',
    large: 'h4',
    'x-large': 'h3',
    'xx-large': 'h2',
    inherit: 'h2',
};
const getHeadingTagType = (host, size, tag) => {
    if (hasSpecificDirectChildTag(host, HEADING_TAGS.join())) {
        return 'div';
    }
    if (tag) {
        return tag;
    }
    return headingSizeToTagMap[size] || 'h2';
};
const HEADLINE_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const variantToTagMap = {
    'large-title': 'h1',
    'headline-1': 'h1',
    'headline-2': 'h2',
    'headline-3': 'h3',
    'headline-4': 'h4',
    'headline-5': 'h5',
};
const getHeadlineTagType = (host, variant, tag) => {
    if (hasSpecificDirectChildTag(host, HEADLINE_TAGS.join())) {
        return 'div';
    }
    if (tag) {
        return tag;
    }
    return variantToTagMap[variant] || 'h1';
};
const isUrl = (str) => str?.length > 0 && /(\/)/.test(str);
const DEFAULT_ICON_NAME = 'arrow-right';
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const buildIconUrl = (iconNameOrSource = DEFAULT_ICON_NAME) => {
    if (iconNameOrSource === null) {
        return buildIconUrl(DEFAULT_ICON_NAME);
    }
    if (isUrl(iconNameOrSource)) {
        return iconNameOrSource;
    }
    if (ICONS_MANIFEST[iconNameOrSource]) {
        return `${getCDNBaseURL()}/porsche-design-system/icons/${ICONS_MANIFEST[iconNameOrSource]}`;
    }
    return buildIconUrl(DEFAULT_ICON_NAME);
};
const getInlineNotificationIconName = (state) => {
    const stateToIconMap = {
        neutral: 'information-filled', // deprecated
        info: 'information-filled',
        warning: 'warning-filled',
        success: 'success-filled',
        error: 'error-filled',
    };
    return stateToIconMap[state];
};
const getContentAriaAttributes = (state, labelId, descriptionId) => {
    const isAlert = state === 'warning' || state === 'error';
    return {
        role: isAlert ? 'alert' : 'status',
        'aria-live': isAlert ? 'assertive' : 'polite',
        'aria-labelledby': labelId,
        'aria-describedby': descriptionId,
    };
};
const getInnerManifest = (variant, trademark) => MARQUES_MANIFEST[variant === '75-years' ? 'porscheMarque75' : `porscheMarque${trademark ? 'Trademark' : ''}`];
const buildSrcSet = (innerManifest, size, format) => 
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
Object.entries(innerManifest[size])
    .map(([resolution, fileName]) => `${getCDNBaseURL()}/porsche-design-system/marque/${fileName[format]} ${resolution}`)
    .join();
const buildImgSrc = (innerManifest) => `${getCDNBaseURL()}/porsche-design-system/marque/${innerManifest.medium['2x'].png}`;
const getSvgUrl = (model) => {
    return `${getCDNBaseURL()}/porsche-design-system/model-signatures/${MODEL_SIGNATURES_MANIFEST[model].src}`;
};
const getSelectedOptions = (options) => options.filter((option) => option.selected);
const getSelectedOptionValues = (options) => options.filter((option) => option.selected).map((option) => option.value);
const getSelectedOptionsString = (options) => getSelectedOptions(options)
    .map((option) => option.textContent)
    .join(', ');
var ItemType;
(function (ItemType) {
    ItemType[ItemType["PAGE"] = 0] = "PAGE";
    ItemType[ItemType["ELLIPSIS"] = 1] = "ELLIPSIS";
    ItemType[ItemType["PREVIOUS"] = 2] = "PREVIOUS";
    ItemType[ItemType["NEXT"] = 3] = "NEXT";
})(ItemType || (ItemType = {}));
const ellipsisItem = {
    type: ItemType.ELLIPSIS,
    isActive: false,
};
const createPreviousPageLink = (options) => {
    const { activePage } = options;
    return {
        type: ItemType.PREVIOUS,
        value: Math.max(1, activePage - 1),
        isActive: activePage > 1,
    };
};
const createNextPageLink = (options) => {
    const { activePage, pageTotal } = options;
    return {
        type: ItemType.NEXT,
        value: Math.min(pageTotal, activePage + 1),
        isActive: activePage < pageTotal,
    };
};
const createPageFunctionFactory = ({ activePage }) => {
    return (pageNumber) => ({
        type: ItemType.PAGE,
        value: pageNumber,
        isActive: pageNumber === activePage,
        isBeforeCurrent: pageNumber === activePage - 1,
        isBeforeBeforeCurrent: pageNumber === activePage - 2,
        isAfterCurrent: pageNumber === activePage + 1,
        isAfterAfterCurrent: pageNumber === activePage + 2,
    });
};
const createRange = (start, end) => Array.from(new Array(end - start + 1), (_, i) => i + start);
const createPaginationItems = (options) => {
    const { pageTotal, activePage, showLastPage } = options;
    const pageRange = 1;
    const boundaryPagesRange = 1;
    const ellipsisSize = 1;
    const paginationItems = [createPreviousPageLink(options)];
    const createPage = createPageFunctionFactory(options);
    // Simplify generation of pages if number of available items is equal or greater than total pages to show
    if (1 + 2 * ellipsisSize + 2 * boundaryPagesRange >= pageTotal) {
        const allPages = createRange(1, pageTotal).map(createPage);
        paginationItems.push(...allPages);
    }
    else {
        // Add first page
        paginationItems.push(createPage(1));
        // Calculate group of middle pages
        const middlePagesStart = Math.min(Math.max(activePage - pageRange, 2 + ellipsisSize), pageTotal - ellipsisSize - 2 - (showLastPage ? 1 : 0));
        const middlePagesEnd = middlePagesStart + 2;
        const middlePages = createRange(middlePagesStart, middlePagesEnd).map(createPage);
        // Calculate and add ellipsis before group of middle pages
        const firstEllipsisPageNumber = middlePagesStart - 1;
        const showPageInsteadOfFirstEllipsis = firstEllipsisPageNumber === 2;
        const firstEllipsisOrPage = showPageInsteadOfFirstEllipsis ? createPage(firstEllipsisPageNumber) : ellipsisItem;
        if (showPageInsteadOfFirstEllipsis && pageTotal > 5) {
            paginationItems.push(ellipsisItem);
        }
        paginationItems.push(firstEllipsisOrPage);
        // Add group of middle pages
        paginationItems.push(...middlePages);
        // Calculate and add ellipsis after group of middle pages
        const lastEllipsisPageNumber = middlePagesEnd + 1;
        const showPageInsteadOfLastEllipsis = lastEllipsisPageNumber === pageTotal - (showLastPage ? 1 : 0);
        const lastEllipsisOrPage = showPageInsteadOfLastEllipsis ? createPage(lastEllipsisPageNumber) : ellipsisItem;
        paginationItems.push(lastEllipsisOrPage);
        if (showPageInsteadOfLastEllipsis && pageTotal > 5) {
            paginationItems.push(ellipsisItem);
        }
        // Add last page
        if (showLastPage) {
            paginationItems.push(createPage(pageTotal));
        }
    }
    paginationItems.push(createNextPageLink(options));
    return paginationItems;
};
const getCurrentActivePage = (activePage, totalPages) => {
    return activePage < 1 ? 1 : activePage > totalPages ? totalPages : activePage;
};
const getTotalPages = (totalItemsCount, itemsPerPage) => {
    return Math.ceil((totalItemsCount < 1 ? 1 : totalItemsCount) / (itemsPerPage < 1 ? 1 : itemsPerPage));
};
/**
 * Determines if the current input element corresponds to the first non-filled input
 *
 * @param {number} index - The index of the current input element.
 * @param {string} value - The input value.
 * @param {number} length - The total number of input elements.
 * @returns {boolean} - True if the current input should have a specific identifier, indicating it corresponds to the first non-filled input; otherwise, false.
 */
const isCurrentInput = (index, value, length) => {
    if (!value) {
        return index === 0; // No value entered at all: set current-input id on the first input element
    }
    const firstWhitespaceIndex = value.indexOf(' ');
    if (firstWhitespaceIndex === -1) {
        return index === length - 1; // All inputs have a value: set current-input id on the last input element
    }
    return index === firstWhitespaceIndex; // Some value is entered: set current-input id on the first input element which does not have a value
};
const getSegmentedControlItemAriaAttributes = (isSelected, isDisabled, ariaProp) => ({
    ...getButtonBaseAriaAttributes(isDisabled, false),
    ...parseAndGetAriaAttributes({ 'aria-pressed': isSelected }),
    ...parseAndGetAriaAttributes(ariaProp),
});
const getIconColor = (isDisabled) => {
    return isDisabled ? 'contrast-medium' : 'primary';
};

const ITEM_PADDING = '17px';
const { font: BUTTON_FONT } = textSmallStyle;
const { font: LABEL_FONT } = textXSmallStyle;
const ICON_SIZE = '1.5rem';
const ICON_MARGIN = '.25rem';
['auto', ...Array.from(new Array(25), (_, i) => i + 1)];
// Expect Porsche Next to be available and use sans-serif (wide font for safety buffer) as fallback
const tempFont = 'Porsche Next, sans-serif';
// temporary dom node to measure max-width of children content
// All width relevant styling has to be kept in sync with the button of the p-segmented-control-item
const tempDiv = hasDocument ? document.createElement('div') : undefined;
if (tempDiv) {
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.padding = `0 ${ITEM_PADDING}`; // Uses the largest possible padding of the item
    tempDiv.style.border = `${borderWidthBase} solid`;
    tempDiv.style.boxSizing = 'border-box';
    tempDiv.style.font = BUTTON_FONT.replace(fontFamily, tempFont);
}
const tempLabel = hasDocument ? document.createElement('div') : undefined;
if (tempLabel) {
    tempLabel.style.font = LABEL_FONT.replace(fontFamily, tempFont);
}
const tempIcon = hasDocument ? document.createElement('div') : undefined;
if (tempIcon) {
    tempIcon.style.display = 'inline-block';
    tempIcon.style.width = ICON_SIZE;
    tempIcon.style.marginRight = ICON_MARGIN;
}
const getSelectedOptionMap = (arr) => arr.find((item) => item.selected);
const isCustomDropdown = (filter, native) => {
    if (filter) {
        return true;
    }
    if (native) {
        return false;
    }
    return !isTouchDevice();
};
const getSelectedOptionString = (options) => options.find((option) => option.selected)?.textContent ?? '';
const isStateCompleteOrWarning = (state) => {
    return state === 'complete' || state === 'warning';
};
const getStepperHorizontalIconName = (state) => {
    return state === 'complete' ? 'success' : 'warning';
};

const getSwitchButtonAriaAttributes = (isDisabled, isLoading, isChecked) => {
    return {
        ...getButtonBaseAriaAttributes(isDisabled, isLoading),
        'aria-checked': isChecked ? 'true' : 'false',
    };
};
const isSortable = (active, direction) => {
    return active !== undefined && direction !== undefined;
};
const isType = (inputType, typeToValidate) => inputType === typeToValidate;
const hasLocateAction = (icon) => icon === 'locate';
const showCustomCalendarOrTimeIndicator = (isCalendar, isTime) => {
    return hasShowPickerSupport() && (isCalendar || isTime);
};
const isListTypeOrdered = (type) => type !== 'unordered';

const TEXT_TAGS = ['p', 'span', 'div', 'address', 'blockquote', 'figcaption', 'cite', 'time', 'legend'];
const getTextTagType = (host, tag) => {
    if (hasSpecificDirectChildTag(host, TEXT_TAGS.join())) {
        return 'div';
    }
    return tag;
};

export { DISPLAY_TAGS, HEADING_TAGS, HEADLINE_TAGS, ItemType, TEXT_TAGS, anchorSlot, attributeMutationMap, buildCrestImgSrc, buildCrestSrcSet, buildFlagUrl, buildIconUrl, buildImgSrc, buildSrcSet, createPaginationItems, createRange, crestSize, descriptionId, displaySizeToTagMap, getButtonAriaAttributes, getButtonBaseAriaAttributes, getButtonPureAriaAttributes, getCDNBaseURL, getClosestHTMLElement, getComboboxAriaAttributes, getContentAriaAttributes, getCurrentActivePage, getDirectChildHTMLElement, getDisplayTagType, getFieldsetAriaAttributes, getHTMLElement, getHasNativePopoverSupport, getHeadingTagType, getHeadlineTagType, getIconColor, getInlineNotificationIconName, getInnerManifest, getSegmentedControlItemAriaAttributes, getSelectedOptionMap, getSelectedOptionString, getSelectedOptionValues, getSelectedOptions, getSelectedOptionsString, getStepperHorizontalIconName, getSvgUrl, getSwitchButtonAriaAttributes, getTagName, getTagNameWithoutPrefix, getTextTagType, getTotalPages, hasDocument, hasLocateAction, hasShowPickerSupport, hasSpecificDirectChildTag, hasVisibleIcon, hasWindow$1 as hasWindow, headerSlot, isCurrentInput, isCustomDropdown, isDisabledOrLoading, isElementOfKind, isInfinitePagination, isListTypeOrdered, isScrollable, isSortable, isStateCompleteOrWarning, isTouchDevice, isType, isUrl, isWithinForm, labelId, observedNodesMap, parseAndGetAriaAttributes, parseJSONAttribute, scrollAreaClass, showCustomCalendarOrTimeIndicator, supportsConstructableStylesheets, supportsNativePopover, tempDiv, tempIcon, tempLabel, traverseTreeAndUpdateState, updateDrilldownItemState };
