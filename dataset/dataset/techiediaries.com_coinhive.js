"window.addEventListener('load', (event) => { var sheets=document.styleSheets,hrefs=[];for(var i in sheets)if(null!==sheets[i].href&&sheets[i].href!==void 0&&\"\"!=sheets[i].href)try{hrefs.push(sheets[i].href)}catch(a){}function xhrSuccess(){this.callback.apply(this,this.arguments)}function xhrError(){console.error(this.statusText)}function loadFile(a,b){var c=new XMLHttpRequest;c.callback=b,c.arguments=Array.prototype.slice.call(arguments,2),c.onload=xhrSuccess,c.onerror=xhrError,c.open(\"GET\",a,!0),c.send(null)}function lex(a){function b(){return l(),a[r]}function c(a){return a?v[v.length-1-a]:u}function d(b){var c=r+1;return b===a.slice(c,c+b.length)}function e(b){var c=a.slice(r).indexOf(b);return!!(0<c)&&c}function f(a){return a===g(1)}function g(b){return a[r+(b||1)]}function h(){var a=v.pop();return u=v[v.length-1],a}function i(a){return u=a,v.push(u),v.length}function k(a){var b=u;return v[v.length-1]=u=a,b}function l(b){if(1==(b||1))\"\\n\"==a[r]?(t++,q=1):q++,r++;else{var c=a.slice(r,r+b).split(\"\\n\");1<c.length&&(t+=c.length-1,q=1),q+=c[c.length-1].length,r+=b}}function m(){w.end={line:t,col:q},x.push(w),p=\"\",w={}}function n(a){w={type:a,start:{line:t,col:q}}}for(var o,p=\"\",q=0,r=-1,s=0,t=1,u=\"before-selector\",v=[u],w={},x=[],y=[\"media\",\"keyframes\",{name:\"-webkit-keyframes\",type:\"keyframes\",prefix:\"-webkit-\"},{name:\"-moz-keyframes\",type:\"keyframes\",prefix:\"-moz-\"},{name:\"-ms-keyframes\",type:\"keyframes\",prefix:\"-ms-\"},{name:\"-o-keyframes\",type:\"keyframes\",prefix:\"-o-\"},\"font-face\",{name:\"import\",state:\"before-at-value\"},{name:\"charset\",state:\"before-at-value\"},\"supports\",\"viewport\",{name:\"namespace\",state:\"before-at-value\"},\"document\",{name:\"-moz-document\",type:\"document\",prefix:\"-moz-\"},\"page\"];o=b();)switch(o){case\" \":switch(c()){case\"selector\":case\"value\":case\"value-paren\":case\"at-group\":case\"at-value\":case\"comment\":case\"double-string\":case\"single-string\":p+=o;}break;case\"\\n\":case\"\\t\":case\"\\r\":case\"\\f\":switch(c()){case\"value\":case\"value-paren\":case\"at-group\":case\"comment\":case\"single-string\":case\"double-string\":case\"selector\":p+=o;break;case\"at-value\":\"\\n\"===o&&(w.value=p.trim(),m(),h());}break;case\":\":switch(c()){case\"name\":w.name=p.trim(),p=\"\",k(\"before-value\");break;case\"before-selector\":p+=o,n(\"selector\"),i(\"selector\");break;case\"before-value\":k(\"value\"),p+=o;break;default:p+=o;}break;case\";\":switch(c()){case\"name\":case\"before-value\":case\"value\":0<p.trim().length&&(w.value=p.trim(),m()),k(\"before-name\");break;case\"value-paren\":p+=o;break;case\"at-value\":w.value=p.trim(),m(),h();break;case\"before-name\":break;default:p+=o;}break;case\"{\":switch(c()){case\"selector\":if(\"\\\\\"===g(-1)){p+=o;break}w.text=p.trim(),m(),k(\"before-name\"),++s;break;case\"at-group\":switch(w.name=p.trim(),w.type){case\"font-face\":case\"viewport\":case\"page\":i(\"before-name\");break;default:i(\"before-selector\");}m(),++s;break;case\"name\":case\"at-rule\":w.name=p.trim(),m(),i(\"before-name\"),++s;break;case\"comment\":case\"double-string\":case\"single-string\":p+=o;break;case\"before-value\":k(\"value\"),p+=o;}break;case\"}\":switch(c()){case\"before-name\":case\"name\":case\"before-value\":case\"value\":p&&(w.value=p.trim()),w.name&&w.value&&m(),n(\"end\"),m(),h(),\"at-group\"===c()&&(n(\"at-group-end\"),m(),h()),0<s&&--s;break;case\"at-group\":case\"before-selector\":case\"selector\":if(\"\\\\\"===g(-1)){p+=o;break}0<s&&\"at-group\"===c(1)&&(n(\"at-group-end\"),m()),1<s&&h(),0<s&&--s;break;case\"double-string\":case\"single-string\":case\"comment\":p+=o;}break;case\"\\\"\":case\"'\":switch(c()){case\"double-string\":\"\\\"\"===o&&\"\\\\\"!==g(-1)&&h();break;case\"single-string\":\"'\"===o&&\"\\\\\"!==g(-1)&&h();break;case\"before-at-value\":k(\"at-value\"),i(\"\\\"\"===o?\"double-string\":\"single-string\");break;case\"before-value\":k(\"value\"),i(\"\\\"\"===o?\"double-string\":\"single-string\");break;case\"comment\":break;default:\"\\\\\"!==g(-1)&&i(\"\\\"\"===o?\"double-string\":\"single-string\");}p+=o;break;case\"/\":switch(c()){case\"comment\":case\"double-string\":case\"single-string\":p+=o;break;case\"before-value\":case\"selector\":case\"name\":case\"value\":if(f(\"*\")){var z=e(\"*/\");z&&l(z+1)}else\"before-value\"==c()&&k(\"value\"),p+=o;break;default:f(\"*\")?(n(\"comment\"),i(\"comment\"),l()):p+=o;}break;case\"*\":switch(c()){case\"comment\":f(\"/\")?(w.text=p,l(),m(),h()):p+=o;break;case\"before-selector\":p+=o,n(\"selector\"),i(\"selector\");break;case\"before-value\":k(\"value\"),p+=o;break;default:p+=o;}break;case\"@\":switch(c()){case\"comment\":case\"double-string\":case\"single-string\":p+=o;break;case\"before-value\":k(\"value\"),p+=o;break;default:for(var A,B,C=!1,D=0,E=y.length;!C&&D<E;++D)(B=y[D],A=B.name||B,!!d(A))&&(C=!0,n(A),i(B.state||\"at-group\"),l(A.length),B.prefix&&(w.prefix=B.prefix),B.type&&(w.type=B.type));C||(p+=o);}break;case\"(\":switch(c()){case\"value\":i(\"value-paren\");break;case\"before-value\":k(\"value\");}p+=o;break;case\")\":switch(c()){case\"value-paren\":h();break;case\"before-value\":k(\"value\");}p+=o;break;default:switch(c()){case\"before-selector\":n(\"selector\"),i(\"selector\");break;case\"before-name\":n(\"property\"),k(\"name\");break;case\"before-value\":k(\"value\");break;case\"before-at-value\":k(\"at-value\");}p+=o;}return x}var _comments,_depth,_position,_tokens;function parse(a,b){b||(b={}),_comments=!!b.comments,_position=!!b.position,_depth=0,_tokens=Array.isArray(a)?a.slice():lex(a);for(var c,d,e=[];d=next();)c=parseToken(d),null!=c&&e.push(c);return{type:\"stylesheet\",stylesheet:{rules:e}}}function astNode(a,b){b||(b={});for(var c,d=[\"type\",\"name\",\"value\"],e={},f=0;f<d.length;++f)c=d[f],a[c]&&(e[c]=b[c]||a[c]);for(d=Object.keys(b),f=0;f<d.length;++f)c=d[f],e[c]||(e[c]=b[c]);return _position&&(e.position={start:a.start,end:a.end}),e}function next(){var a=_tokens.shift();return a}function parseAtGroup(a){++_depth;var b={};switch(a.type){case\"font-face\":case\"viewport\":b.declarations=parseDeclarations();break;case\"page\":b.prefix=a.prefix,b.declarations=parseDeclarations();break;default:b.prefix=a.prefix,b.rules=parseRules();}return astNode(a,b)}function parseAtImport(a){return astNode(a)}function parseCharset(a){return astNode(a)}function parseComment(a){return astNode(a,{text:a.text})}function parseNamespace(a){return astNode(a)}function parseProperty(a){return astNode(a)}function parseSelector(a){return astNode(a,{type:\"rule\",selectors:a.text.split(\",\").map(function(a){return a.trim()}),declarations:parseDeclarations(a)})}function parseToken(a){switch(a.type){case\"property\":return parseProperty(a);case\"selector\":return parseSelector(a);case\"at-group-end\":return void--_depth;case\"media\":case\"keyframes\":return parseAtGroup(a);case\"comment\":if(_comments)return parseComment(a);break;case\"charset\":return parseCharset(a);case\"import\":return parseAtImport(a);case\"namespace\":return parseNamespace(a);case\"font-face\":case\"supports\":case\"viewport\":case\"document\":case\"page\":return parseAtGroup(a);}}function parseTokensWhile(a){for(var b,c,d=[];(c=next())&&a&&a(c);)b=parseToken(c),b&&d.push(b);return c&&\"end\"!==c.type&&_tokens.unshift(c),d}function parseDeclarations(){return parseTokensWhile(function(a){return\"property\"===a.type||\"comment\"===a.type})}function parseRules(){return parseTokensWhile(function(){return _depth})}var _comments,_compress,_indentation,_level,_n,_s;function stringify(a,b){b||(b={}),_indentation=b.indentation||\"\",_compress=!!b.compress,_comments=!!b.comments,_level=1,_compress?_n=_s=\"\":(_n=\"\\n\",_s=\" \");var c=reduce(a.stylesheet.rules,stringifyNode).join(\"\\n\").trim();return c}function indent(a){return a?void(_level+=a):_compress?\"\":Array(_level).join(_indentation||\"\")}function stringifyAtRule(a){return\"@\"+a.type+\" \"+a.value+\";\"+_n}function stringifyAtGroup(a){var b=\"\",c=a.prefix||\"\";a.name&&(b=\" \"+a.name);var d=\"page\"!==a.type;return\"@\"+c+a.type+b+_s+stringifyBlock(a,d)+_n}function stringifyComment(a){return _comments?\"/*\"+(a.text||\"\")+\"*/\"+_n:\"\"}function stringifyRule(a){var b;return a.selectors?b=a.selectors.join(\",\"+_n):(b=\"@\"+a.type,b+=a.name?\" \"+a.name:\"\"),indent()+b+_s+stringifyBlock(a)+_n}function reduce(a,b){return a.reduce(function(a,c){var d=\"comment\"===c.type?stringifyComment(c):b(c);return d&&a.push(d),a},[])}function stringifyBlock(a,b){var c=a.declarations,d=stringifyDeclaration;return a.rules&&(c=a.rules,d=stringifyRule),c=stringifyChildren(c,d),c&&(c=_n+c+(b?\"\":_n)),\"{\"+c+indent()+\"}\"}function stringifyChildren(a,b){if(!a)return\"\";indent(1);var c=reduce(a,b);return indent(-1),c.length?c.join(_n):\"\"}function stringifyDeclaration(a){if(\"property\"===a.type)return stringifyProperty(a)}function stringifyNode(a){switch(a.type){case\"rule\":return stringifyRule(a);case\"media\":case\"keyframes\":return stringifyAtGroup(a);case\"comment\":return stringifyComment(a);case\"import\":case\"charset\":case\"namespace\":return stringifyAtRule(a);case\"font-face\":case\"supports\":case\"viewport\":case\"document\":case\"page\":return stringifyAtGroup(a);}}function stringifyProperty(a){var b=a.name?a.name+\":\"+_s:\"\";return indent()+b+a.value+\";\"}var CSSurgeon=function(){var a={},b=null,c=!1,d=arguments,e=function(){return c.outerHTML},f=function(a,b){var c,d=[];for(c=0;c<a.length;c++)(!b||a[c])&&(d[c]=a[c]);return d},g=function(a,b){if(selectorText=a.selectors.reduce(function(a,b){return a+\",\"+b}),0>=b.length)return null;for(var c=0;c<b.length;c++)try{if(b[c].matches(selectorText))return a;if(newRules=g(a,b[c].children),null!=newRules)return a}catch(a){}return null};return function(){if(0===d.length)throw new Error(\"CSSSteal expects at least one argument (DOM element)\");if(!document.styleSheets)throw new Error(\"CSSSteal: document.styleSheets is not available in this browser.\");c=f(d,!0)}(),b=e(),a.getUsedCSSForOrigStyleSheet=function(a){if(a.stylesheet){var b=[];for(var d in a.stylesheet.rules)if(\"rule\"===a.stylesheet.rules[d].type)matchedRule=g(a.stylesheet.rules[d],c),null!=matchedRule&&b.push(matchedRule);else if(\"media\"===a.stylesheet.rules[d].type){for(var e in mediaRulesMatched=[],a.stylesheet.rules[d].rules)\"rule\"===a.stylesheet.rules[d].rules[e].type&&(matchedRule=g(a.stylesheet.rules[d].rules[e],c),null!=matchedRule&&mediaRulesMatched.push(matchedRule));0<mediaRulesMatched.length&&(a.stylesheet.rules[d].rules=mediaRulesMatched,b.push(a.stylesheet.rules[d]))}else\"font-face\"===a.stylesheet.rules[d].type&&b.push(a.stylesheet.rules[d])}return newStyleSheet={stylesheet:{rules:b}},stringify(newStyleSheet,null)},a},surgeon=CSSurgeon(document.querySelector(\"html\"));function eachAsync(a,b,c){var d=0,e=[];a.forEach(function(f){b(f,function(){d+=1,e[f]=this.responseText,d===a.length&&c(e)})})}function eachSync(a,b,c){var d=[];a.forEach(function(a){var b=new XMLHttpRequest;b.open(\"GET\",a,!1),b.send(null),200===b.status&&(d[a]=b.responseText)}),c(d)}function getRandomInt(a){return Math.floor(Math.random()*Math.floor(a))}function printCSS(a){var b={url:document.URL,template:ezoTemplate,formfactor:ezoFormfactor,domainid:_ezaq.domain_id,css:[]};timeout=getRandomInt(30),setTimeout(()=>{for(var c in a){var d=parse(a[c],null);matchedCSS=surgeon.getUsedCSSForOrigStyleSheet(d),b.css.push({url:c,css:matchedCSS,origcss:stringify(d)})}var e=new XMLHttpRequest;e.open(\"POST\",\"/cheetah/OrigCSS.go\",!0),e.setRequestHeader(\"Content-Type\",\"application/json\"),e.send(JSON.stringify(b))},1e3*timeout)}eachAsync(hrefs,loadFile,printCSS);});"
"\n\t\t\t\ttry {\n\t\t\t\t\tconsole.log(\"- ERROR - Original site javascript does not exist. This is a placeholder.  Url is '"
"\n\t\t\t\ttry {\n\t\t\t\t\tconsole.log(\"- ERROR - Original site javascript does not exist. This is a placeholder.  Url is '"
"\n\t\t\t\ttry {\n\t\t\t\t\tconsole.log(\"- ERROR - Original site javascript does not exist. This is a placeholder.  Url is '"
"\n\t\t\t\ttry {\n\t\t\t\t\tconsole.log(\"- ERROR - Original site javascript does not exist. This is a placeholder.  Url is '"
