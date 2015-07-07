!function(t,e){if("function"==typeof define&&define.amd)define(["exports"],e);else if("undefined"!=typeof exports)e(exports);else{var n={exports:{}};e(n.exports),t.napoleon=n.exports}}(this,function(t){"use strict";function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function t(n){var r=this;e(this,t);var o=n.match(/.*?\/\/.*?\//),a=o?o[0]:"/";n=n.replace(a,"/");var i=n.match(/(.*?)($|\?(.*))/),u=i[1],l=i[3];this.url=n,this.components=u.split("/").filter(function(t){return t.length>0}),this.querystring={},null!=l&&l.split("&").forEach(function(t){var e=t.split("="),n=e[0],o=e[1];r.querystring[n]=decodeURIComponent(o)})}return t.getComponentKey=function(t){var e=null;return"{"===t.charAt(0)&&"}"===t.charAt(t.length-1)&&(e=t.slice(1,-1)),e},t.prototype.applyState=function(e){for(var n=[],r=this.components.reduce(function(r,o){var a=t.getComponentKey(o);if(n.push(a),null!=a){var i=e[a];null!=i&&(r+="/"+i)}else r+="/"+o;return r},""),o=[],a=Object.keys(e),i=0;i<a.length;i++){var u=a[i];if(-1===n.indexOf(u)){var l=e[u];o.push(u+"="+encodeURIComponent(l))}}return o.length>0&&(r+="?"+o.join("&")),r},t.prototype.extractParameters=function(e){var n=new t(e),r={};this.components.forEach(function(e,o){var a=t.getComponentKey(e);null!=a&&(r[a]=n.components[o])});var o=Object.keys(n.querystring);return o.forEach(function(t){if(!r.hasOwnProperty(t)){var e=n.querystring[t];r[t]=e}}),r},t}();t.URLStructure=n;var r="?dynamic?",o=function(){function t(){e(this,t),this.leaf=null,this.children={}}return t.prototype.addRoute=function(e,o){var a=void 0===arguments[2]?0:arguments[2],i=o.components[a];if(null==i){if(null!=this.leaf)throw new Error("Route "+o.path+" already mounted: "+this.leaf.urlStructure.path);this.leaf={urlStructure:o,handler:e}}else{var u=n.getComponentKey(i),l=null==u?i:r;this.children.hasOwnProperty(l)||(this.children[l]=new t),this.children[l].addRoute(e,o,a+1)}},t.prototype.matchPath=function(t){var e=void 0===arguments[1]?0:arguments[1],n=null;if(e===t.components.length)n=this.leaf;else{var o=t.components[e];this.children.hasOwnProperty(o)&&(n=this.children[o].matchPath(t,e+1)),null==n&&this.children.hasOwnProperty(r)&&(n=this.children[r].matchPath(t,e+1))}return n},t}(),a=function(){function t(){e(this,t),this.trees={GET:new o,POST:new o,PUT:new o,DELETE:new o}}return t.prototype.mount=function(t,e,r){if("GET"!==t&&"POST"!==t&&"PUT"!==t&&"DELETE"!==t)throw new Error("Route method must be either GET, POST, PUT, or DELETE");var o=new n(e);this.trees[t].addRoute(r,o)},t.prototype.matchRoute=function(t,e){if("GET"!==t&&"POST"!==t)throw new Error("Route method must be either GET or POST");var r=new n(e);return this.trees[t].matchPath(r)},t.prototype.route=function(t,e){var n=this.matchRoute(t,e);if(null!=n){var r=n.urlStructure.extractParameters(e);n.handler(e,r)}},t}();t.Router=a;var i=function(){var t=null,e=null,r={isNapoleon:!0,url:{},extras:{}},o=function(){r=null==window.history.state||window.history.state.isNapoleon!==!0?{isNapoleon:!0,url:t.extractParameters(location.href),extras:{}}:window.history.state;var n=r.url,o=r.extras;e({url:n,extras:o})};return{attach:function(r){var a=r.url,i=r.onStateChange;if(null==a)throw new Error("Missing `url` in Napoleon config");if(null==i)throw new Error("Missing `onStateChange` in Napoleon config");t=new n(a),e=i,window.addEventListener("popstate",o),o()},modifyState:function(e){var n=e.url,a=e.extras,i=e.replace;if(null!=n)for(var u in n)if(n.hasOwnProperty(u)){var l=n[u];null==l?delete r.url[u]:r.url[u]=l}if(null!=a)for(var u in a)if(a.hasOwnProperty(u)){var l=a[u];null==l?delete r.extras[u]:r.extras[u]=l}i===!0?window.history.replaceState(r,"",t.applyState(r.url)):window.history.pushState(r,"",t.applyState(r.url)),o()}}}(void 0);t["default"]=i});