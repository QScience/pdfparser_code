/*
 Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Copyright 2011, Tim Down
 Licensed under the MIT license.
 Version: 1.1
 Build date: 14 February 2011
*/
var rangy=function(){function l(o,r){var z=typeof o[r];return z=="function"||!!(z=="object"&&o[r])||z=="unknown"}function F(o,r){return!!(typeof o[r]=="object"&&o[r])}function G(o,r){return typeof o[r]!="undefined"}function x(o){return function(r,z){for(var N=z.length;N--;)if(!o(r,z[N]))return false;return true}}function C(o){window.alert("Rangy not supported in your browser. Reason: "+o);u.initialized=true;u.supported=false}function J(){if(!u.initialized){var o,r=false,z=false;if(l(document,"createRange")){o=
document.createRange();if(v(o,i)&&t(o,O))r=true;o.detach()}if((o=F(document,"body")?document.body:document.getElementsByTagName("body")[0])&&l(o,"createTextRange")){o=o.createTextRange();if(v(o,n)&&t(o,p))z=true}!r&&!z&&C("Neither Range nor TextRange are implemented");u.initialized=true;u.features={implementsDomRange:r,implementsTextRange:z};r=f.concat(e);z=0;for(o=r.length;z<o;++z)try{r[z](u)}catch(N){F(window,"console")&&l(window.console,"log")&&console.log("Init listener threw an exception. Continuing.",
N)}}}function H(o){this.name=o;this.supported=this.initialized=false}var O=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer","START_TO_START","START_TO_END","END_TO_START","END_TO_END"],i=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],
p=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],n=["collapse","compareEndPoints","duplicate","getBookmark","moveToBookmark","moveToElementText","parentElement","pasteHTML","select","setEndPoint"],v=x(l),y=x(F),t=x(G),u={initialized:false,supported:true,util:{isHostMethod:l,isHostObject:F,isHostProperty:G,areHostMethods:v,areHostObjects:y,areHostProperties:t},features:{},modules:{},config:{alertOnWarn:false}};u.fail=C;u.warn=function(o){o="Rangy warning: "+o;if(u.config.alertOnWarn)window.alert(o);
else typeof window.console!="undefined"&&typeof window.console.log!="undefined"&&window.console.log(o)};u.init=J;var e=[],f=[];u.addInitListener=function(o){u.initialized?o(u):e.push(o)};var j=[];u.addCreateMissingNativeApiListener=function(o){j.push(o)};u.createMissingNativeApi=function(o){o=o||window;J();for(var r=0,z=j.length;r<z;++r)j[r](o)};H.prototype.fail=function(o){this.initialized=true;this.supported=false;throw Error("Module '"+this.name+"' failed to load: "+o);};H.prototype.createError=
function(o){return Error("Error in Rangy "+this.name+" module: "+o)};u.createModule=function(o,r){var z=new H(o);u.modules[o]=z;f.push(function(N){r(N,z);z.initialized=true;z.supported=true})};u.requireModules=function(o){for(var r=0,z=o.length,N,S;r<z;++r){S=o[r];N=u.modules[S];if(!N||!(N instanceof H))throw Error("Module '"+S+"' not found");if(!N.supported)throw Error("Module '"+S+"' not supported");}};var q=false;y=function(){if(!q){q=true;u.initialized||J()}};if(typeof window=="undefined")C("No window found");
else if(typeof document=="undefined")C("No document found");else{l(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",y,false);if(l(window,"addEventListener"))window.addEventListener("load",y,false);else l(window,"attachEvent")?window.attachEvent("onload",y):C("Window does not have required addEventListener or attachEvent method");return u}}();
rangy.createModule("DomUtil",function(l,F){function G(e){for(var f=0;e=e.previousSibling;)f++;return f}function x(e,f){var j=[],q;for(q=e;q;q=q.parentNode)j.push(q);for(q=f;q;q=q.parentNode)if(u(j,q))return q;return null}function C(e,f,j){for(j=j?e:e.parentNode;j;){e=j.parentNode;if(e===f)return j;j=e}return null}function J(e){e=e.nodeType;return e==3||e==4||e==8}function H(e,f){var j=f.nextSibling,q=f.parentNode;j?q.insertBefore(e,j):q.appendChild(e);return e}function O(e){if(e.nodeType==9)return e;
else if(typeof e.ownerDocument!="undefined")return e.ownerDocument;else if(typeof e.document!="undefined")return e.document;else if(e.parentNode)return O(e.parentNode);else throw Error("getDocument: no document found for node");}function i(e){if(!e)return"[No node]";return J(e)?'"'+e.data+'"':e.nodeType==1?"<"+e.nodeName+(e.id?' id="'+e.id+'"':"")+">["+e.childNodes.length+"]":e.nodeName}function p(e){this._next=this.root=e}function n(e,f){this.node=e;this.offset=f}function v(e){this.code=this[e];
this.codeName=e;this.message="DOMException: "+this.codeName}var y=l.util;y.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||F.fail("document missing a Node creation method");y.isHostMethod(document,"getElementsByTagName")||F.fail("document missing getElementsByTagName method");var t=document.createElement("div");y.areHostMethods(t,["insertBefore","appendChild","cloneNode"])||F.fail("Incomplete Element implementation");t=document.createTextNode("test");y.areHostMethods(t,
["splitText","deleteData","insertData","appendData","cloneNode"])||F.fail("Incomplete Text Node implementation");var u=function(e,f){for(var j=e.length;j--;)if(e[j]===f)return true;return false};p.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var e=this._current=this._next,f;if(this._current)if(f=e.firstChild)this._next=f;else{for(f=null;e!==this.root&&!(f=e.nextSibling);)e=e.parentNode;this._next=f}return this._current},detach:function(){this._current=this._next=
this.root=null}};n.prototype={equals:function(e){return this.node===e.node&this.offset==e.offset},inspect:function(){return"[DomPosition("+i(this.node)+":"+this.offset+")]"}};v.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11};v.prototype.toString=function(){return this.message};l.dom={arrayContains:u,getNodeIndex:G,getCommonAncestor:x,isAncestorOf:function(e,f,j){for(f=j?f:f.parentNode;f;)if(f===
e)return true;else f=f.parentNode;return false},getClosestAncestorIn:C,isCharacterDataNode:J,insertAfter:H,splitDataNode:function(e,f){var j;if(e.nodeType==3)j=e.splitText(f);else{j=e.cloneNode();j.deleteData(0,f);e.deleteData(0,e.length-f);H(j,e)}return j},getDocument:O,getWindow:function(e){e=O(e);if(typeof e.defaultView!="undefined")return e.defaultView;else if(typeof e.parentWindow!="undefined")return e.parentWindow;else throw Error("Cannot get a window object for node");},getIframeWindow:function(e){if(typeof e.contentWindow!=
"undefined")return e.contentWindow;else if(typeof e.contentDocument!="undefined")return e.contentDocument.defaultView;else throw Error("getIframeWindow: No Window object found for iframe element");},getIframeDocument:function(e){if(typeof e.contentDocument!="undefined")return e.contentDocument;else if(typeof e.contentWindow!="undefined")return e.contentWindow.document;else throw Error("getIframeWindow: No Document object found for iframe element");},getBody:function(e){return y.isHostObject(e,"body")?
e.body:e.getElementsByTagName("body")[0]},comparePoints:function(e,f,j,q){var o;if(e==j)return f===q?0:f<q?-1:1;else if(o=C(j,e,true))return f<=G(o)?-1:1;else if(o=C(e,j,true))return G(o)<q?-1:1;else{f=x(e,j);e=e===f?f:C(e,f,true);j=j===f?f:C(j,f,true);if(e===j)throw Error("comparePoints got to case 4 and childA and childB are the same!");else{for(f=f.firstChild;f;){if(f===e)return-1;else if(f===j)return 1;f=f.nextSibling}throw Error("Should not be here!");}}},inspectNode:i,createIterator:function(e){return new p(e)},
DomPosition:n};l.DOMException=v});
rangy.createModule("DomRange",function(l){function F(b,h){this.range=b;this.clonePartiallySelectedTextNodes=h;if(!b.collapsed){this.sc=b.startContainer;this.so=b.startOffset;this.ec=b.endContainer;this.eo=b.endOffset;var w=b.commonAncestorContainer;if(this.sc===this.ec&&s.isCharacterDataNode(this.sc)){this.isSingleCharacterDataNode=true;this._first=this._last=this._next=this.sc}else{this._first=this._next=this.sc===w&&!s.isCharacterDataNode(this.sc)?this.sc.childNodes[this.so]:s.getClosestAncestorIn(this.sc,
w,true);this._last=this.ec===w&&!s.isCharacterDataNode(this.ec)?this.ec.childNodes[this.eo-1]:s.getClosestAncestorIn(this.ec,w,true)}}}function G(b){this.code=this[b];this.codeName=b;this.message="RangeException: "+this.codeName}function x(b){return s.getDocument(b.startContainer)}function C(b,h,w){if(h=b._listeners[h])for(var A=0,K=h.length;A<K;++A)h[A].call(b,{target:b,args:w})}function J(b){return new a(b.parentNode,s.getNodeIndex(b))}function H(b){return new a(b.parentNode,s.getNodeIndex(b)+1)}
function O(b){return s.isCharacterDataNode(b)?b.length:b.childNodes?b.childNodes.length:0}function i(b,h,w){var A=b.nodeType==11?b.firstChild:b;if(s.isCharacterDataNode(h))w==h.length?s.insertAfter(b,h):h.parentNode.insertBefore(b,w==0?h:s.splitDataNode(h,w));else w>=h.childNodes.length?h.appendChild(b):h.insertBefore(b,h.childNodes[w]);return A}function p(b){for(var h,w,A=x(b.range).createDocumentFragment();w=b.next();){h=b.isPartiallySelectedSubtree();w=w.cloneNode(!h);if(h){h=b.getSubtreeIterator();
w.appendChild(p(h));h.detach(true)}if(w.nodeType==10)throw new d("HIERARCHY_REQUEST_ERR");A.appendChild(w)}return A}function n(b,h,w){var A,K;for(w=w||{stop:false};A=b.next();)if(b.isPartiallySelectedSubtree())if(h(A)===false){w.stop=true;return}else{A=b.getSubtreeIterator();n(A,h,w);A.detach(true);if(w.stop)return}else for(A=s.createIterator(A);K=A.next();)if(h(K)===false){w.stop=true;return}}function v(b){for(var h;b.next();)if(b.isPartiallySelectedSubtree()){h=b.getSubtreeIterator();v(h);h.detach(true)}else b.remove()}
function y(b){for(var h,w=x(b.range).createDocumentFragment(),A;h=b.next();){if(b.isPartiallySelectedSubtree()){h=h.cloneNode(false);A=b.getSubtreeIterator();h.appendChild(y(A));A.detach(true)}else b.remove();if(h.nodeType==10)throw new d("HIERARCHY_REQUEST_ERR");w.appendChild(h)}return w}function t(b,h,w){var A=!!(h&&h.length),K,U=!!w;if(A)K=RegExp("^("+h.join("|")+")$");var aa=[];n(new F(b,false),function(ba){if((!A||K.test(ba.nodeType))&&(!U||w(ba)))aa.push(ba)});return aa}function u(b){return"["+
(typeof b.getName=="undefined"?"Range":b.getName())+"("+s.inspectNode(b.startContainer)+":"+b.startOffset+", "+s.inspectNode(b.endContainer)+":"+b.endOffset+")]"}function e(b,h,w){this.nodes=t(b,h,w);this._next=this.nodes[0];this._pointer=0}function f(b,h){return b.nodeType!=3&&(s.isAncestorOf(b,h.startContainer,true)||s.isAncestorOf(b,h.endContainer,true))}function j(b){return function(h,w){for(var A,K=w?h:h.parentNode;K;){A=K.nodeType;if(s.arrayContains(b,A))return K;K=K.parentNode}return null}}
function q(b){for(var h;h=b.parentNode;)b=h;return b}function o(b,h){if(na(b,h))throw new G("INVALID_NODE_TYPE_ERR");}function r(b){if(!b.startContainer)throw new d("INVALID_STATE_ERR");}function z(b,h){if(!s.arrayContains(h,b.nodeType))throw new G("INVALID_NODE_TYPE_ERR");}function N(b,h){if(h<0||h>(s.isCharacterDataNode(b)?b.length:b.childNodes.length))throw new d("INDEX_SIZE_ERR");}function S(b,h){if(V(b,true)!==V(h,true))throw new d("WRONG_DOCUMENT_ERR");}function W(b){if(oa(b,true))throw new d("NO_MODIFICATION_ALLOWED_ERR");
}function Y(b,h){if(!b)throw new d(h);}function L(b){if(!V(b.startContainer,true)||!V(b.endContainer,true)||!(b.startOffset<=(s.isCharacterDataNode(b.startContainer)?b.startContainer.length:b.startContainer.childNodes.length))||!(b.endOffset<=(s.isCharacterDataNode(b.endContainer)?b.endContainer.length:b.endContainer.childNodes.length)))throw Error("Range Range error: Range is no longer valid after DOM mutation ("+b.inspect()+")");}function Z(b){b.START_TO_START=ea;b.START_TO_END=ha;b.END_TO_END=
pa;b.END_TO_START=ia;b.NODE_BEFORE=ja;b.NODE_AFTER=ka;b.NODE_BEFORE_AND_AFTER=la;b.NODE_INSIDE=fa}function D(b){Z(b);Z(b.prototype)}function $(b,h,w){function A(c,g){return function(m){r(this);z(m,k);z(q(m),E);m=(c?J:H)(m);(g?K:U)(this,m.node,m.offset)}}function K(c,g,m){var B=c.endContainer,I=c.endOffset;if(g!==c.startContainer||m!==this.startOffset){if(q(g)!=q(B)||s.comparePoints(g,m,B,I)==1){B=g;I=m}h(c,g,m,B,I)}}function U(c,g,m){var B=c.startContainer,I=c.startOffset;if(g!==c.endContainer||m!==
this.endOffset){if(q(g)!=q(B)||s.comparePoints(g,m,B,I)==-1){B=g;I=m}h(c,B,I,g,m)}}function aa(c,g,m){if(g!==c.startContainer||m!==this.startOffset||g!==c.endContainer||m!==this.endOffset)h(c,g,m,g,m)}function ba(c){return function(){r(this);L(this);var g=this.startContainer,m=this.startOffset,B=this.commonAncestorContainer,I=new F(this,true);if(g!==B){g=s.getClosestAncestorIn(g,B,true);m=H(g);g=m.node;m=m.offset}n(I,W);I.reset();B=c(I);I.detach();h(this,g,m,g,m);return B}}b.prototype={attachListener:function(c,
g){this._listeners[c].push(g)},setStart:function(c,g){r(this);o(c,true);N(c,g);K(this,c,g)},setEnd:function(c,g){r(this);o(c,true);N(c,g);U(this,c,g)},setStartBefore:A(true,true),setStartAfter:A(false,true),setEndBefore:A(true,false),setEndAfter:A(false,false),collapse:function(c){r(this);L(this);c?h(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):h(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(c){r(this);o(c,true);
h(this,c,0,c,O(c))},selectNode:function(c){r(this);o(c,false);z(c,k);var g=J(c);c=H(c);h(this,g.node,g.offset,c.node,c.offset)},compareBoundaryPoints:function(c,g){r(this);L(this);S(this.startContainer,g.startContainer);var m=c==ia||c==ea?"start":"end",B=c==ha||c==ea?"start":"end";return s.comparePoints(this[m+"Container"],this[m+"Offset"],g[B+"Container"],g[B+"Offset"])},insertNode:function(c){r(this);L(this);z(c,M);W(this.startContainer);if(s.isAncestorOf(c,this.startContainer,true))throw new d("HIERARCHY_REQUEST_ERR");
this.setStartBefore(i(c,this.startContainer,this.startOffset))},cloneContents:function(){r(this);L(this);var c,g;if(this.collapsed)return x(this).createDocumentFragment();else{if(this.startContainer===this.endContainer&&s.isCharacterDataNode(this.startContainer)){c=this.startContainer.cloneNode(true);c.data=c.data.slice(this.startOffset,this.endOffset);g=x(this).createDocumentFragment();g.appendChild(c);return g}else{g=new F(this,true);c=p(g);g.detach()}return c}},extractContents:ba(y),deleteContents:ba(v),
canSurroundContents:function(){r(this);L(this);W(this.startContainer);W(this.endContainer);var c=new F(this,true),g=c._first&&f(c._first,this)||c._last&&f(c._last,this);c.detach();return!g},surroundContents:function(c){z(c,Q);if(!this.canSurroundContents())throw new G("BAD_BOUNDARYPOINTS_ERR");var g=this.extractContents();if(c.hasChildNodes())for(;c.lastChild;)c.removeChild(c.lastChild);i(c,this.startContainer,this.startOffset);c.appendChild(g);this.selectNode(c)},cloneRange:function(){r(this);L(this);
for(var c=new P(x(this)),g=ga.length,m;g--;){m=ga[g];c[m]=this[m]}return c},detach:function(){w(this)},toString:function(){r(this);L(this);var c=this.startContainer;if(c===this.endContainer&&s.isCharacterDataNode(c))return c.nodeType==3||c.nodeType==4?c.data.slice(this.startOffset,this.endOffset):"";else{var g=[];c=new F(this,true);n(c,function(m){if(m.nodeType==3||m.nodeType==4)g.push(m.data)});c.detach();return g.join("")}},compareNode:function(c){r(this);L(this);var g=c.parentNode,m=s.getNodeIndex(c);
if(!g)throw new d("NOT_FOUND_ERR");c=this.comparePoint(g,m);g=this.comparePoint(g,m+1);return c<0?g>0?la:ja:g>0?ka:fa},comparePoint:function(c,g){r(this);L(this);Y(c,"HIERARCHY_REQUEST_ERR");S(c,this.startContainer);if(s.comparePoints(c,g,this.startContainer,this.startOffset)<0)return-1;else if(s.comparePoints(c,g,this.endContainer,this.endOffset)>0)return 1;return 0},createContextualFragment:function(c){r(this);var g=x(this),m=g.createElement("div");m.innerHTML=c;for(c=g.createDocumentFragment();g=
m.firstChild;)c.appendChild(g);return c},intersectsNode:function(c,g){r(this);L(this);Y(c,"NOT_FOUND_ERR");if(s.getDocument(c)!==x(this))return false;var m=c.parentNode,B=s.getNodeIndex(c);Y(m,"NOT_FOUND_ERR");var I=s.comparePoints(m,B,this.endContainer,this.endOffset);m=s.comparePoints(m,B+1,this.startContainer,this.startOffset);return g?I<=0&&m>=0:I<0&&m>0},isPointInRange:function(c,g){r(this);L(this);Y(c,"HIERARCHY_REQUEST_ERR");S(c,this.startContainer);return s.comparePoints(c,g,this.startContainer,
this.startOffset)>=0&&s.comparePoints(c,g,this.endContainer,this.endOffset)<=0},intersectsRange:function(c){r(this);L(this);if(x(c)!=x(this))throw new d("WRONG_DOCUMENT_ERR");return s.comparePoints(this.startContainer,this.startOffset,c.endContainer,c.endOffset)<0&&s.comparePoints(this.endContainer,this.endOffset,c.startContainer,c.startOffset)>0},intersection:function(c){if(this.intersectsRange(c)){var g=s.comparePoints(this.startContainer,this.startOffset,c.startContainer,c.startOffset),m=s.comparePoints(this.endContainer,
this.endOffset,c.endContainer,c.endOffset),B=this.cloneRange();g==-1&&B.setStart(c.startContainer,c.startOffset);m==1&&B.setEnd(c.endContainer,c.endOffset);return B}return null},containsNode:function(c,g){return g?this.intersectsNode(c,false):this.compareNode(c)==fa},containsNodeContents:function(c){return this.comparePoint(c,0)>=0&&this.comparePoint(c,O(c))<=0},splitBoundaries:function(){r(this);L(this);var c=this.startContainer,g=this.startOffset,m=this.endContainer,B=this.endOffset,I=c===m;s.isCharacterDataNode(m)&&
B<m.length&&s.splitDataNode(m,B);if(s.isCharacterDataNode(c)&&g>0){c=s.splitDataNode(c,g);if(I){B-=g;m=c}g=0}h(this,c,g,m,B)},normalizeBoundaries:function(){r(this);L(this);var c=this.startContainer,g=this.startOffset,m=this.endContainer,B=this.endOffset,I=function(T){var R=T.nextSibling;if(R&&R.nodeType==T.nodeType){m=T;B=T.length;T.appendData(R.data);R.parentNode.removeChild(R)}},ma=function(T){var R=T.previousSibling;if(R&&R.nodeType==T.nodeType){c=T;g=R.length;T.insertData(0,R.data);R.parentNode.removeChild(R);
if(c==m){B+=g;m=c}}},ca=true;if(s.isCharacterDataNode(m))m.length==B&&I(m);else{if(B>0)(ca=m.childNodes[B-1])&&s.isCharacterDataNode(ca)&&I(ca);ca=!this.collapsed}if(ca)if(s.isCharacterDataNode(c))g==0&&ma(c);else{if(g<c.childNodes.length)(I=c.childNodes[g])&&s.isCharacterDataNode(I)&&ma(I)}else{c=m;g=B}h(this,c,g,m,B)},createNodeIterator:function(c,g){r(this);L(this);return new e(this,c,g)},getNodes:function(c,g){r(this);L(this);return t(this,c,g)},collapseToPoint:function(c,g){r(this);L(this);o(c,
true);N(c,g);aa(this,c,g)},collapseBefore:function(c){r(this);this.setEndBefore(c);this.collapse(false)},collapseAfter:function(c){r(this);this.setStartAfter(c);this.collapse(true)},getName:function(){return"DomRange"},equals:function(c){return P.rangesEqual(this,c)},inspect:function(){return u(this)}};D(b)}function da(b){b.collapsed=b.startContainer===b.endContainer&&b.startOffset===b.endOffset;b.commonAncestorContainer=b.collapsed?b.startContainer:s.getCommonAncestor(b.startContainer,b.endContainer)}
function X(b,h,w,A,K){var U=b.startContainer!==h||b.startOffset!==w,aa=b.endContainer!==A||b.endOffset!==K;b.startContainer=h;b.startOffset=w;b.endContainer=A;b.endOffset=K;da(b);C(b,"boundarychange",{startMoved:U,endMoved:aa})}function P(b){this.startContainer=b;this.startOffset=0;this.endContainer=b;this.endOffset=0;this._listeners={boundarychange:[],detach:[]};da(this)}l.requireModules(["DomUtil"]);var s=l.dom,a=s.DomPosition,d=l.DOMException;F.prototype={_current:null,_next:null,_first:null,_last:null,
isSingleCharacterDataNode:false,reset:function(){this._current=null;this._next=this._first},hasNext:function(){return!!this._next},next:function(){var b=this._current=this._next;if(b){this._next=b!==this._last?b.nextSibling:null;if(s.isCharacterDataNode(b)&&this.clonePartiallySelectedTextNodes){if(b===this.ec)(b=b.cloneNode(true)).deleteData(this.eo,b.length-this.eo);if(this._current===this.sc)(b=b.cloneNode(true)).deleteData(0,this.so)}}return b},remove:function(){var b=this._current,h,w;if(s.isCharacterDataNode(b)&&
(b===this.sc||b===this.ec)){h=b===this.sc?this.so:0;w=b===this.ec?this.eo:b.length;h!=w&&b.deleteData(h,w-h)}else b.parentNode&&b.parentNode.removeChild(b)},isPartiallySelectedSubtree:function(){return f(this._current,this.range)},getSubtreeIterator:function(){var b;if(this.isSingleCharacterDataNode){b=this.range.cloneRange();b.collapse()}else{b=new P(x(this.range));var h=this._current,w=h,A=0,K=h,U=O(h);if(s.isAncestorOf(h,this.sc,true)){w=this.sc;A=this.so}if(s.isAncestorOf(h,this.ec,true)){K=this.ec;
U=this.eo}X(b,w,A,K,U)}return new F(b,this.clonePartiallySelectedTextNodes)},detach:function(b){b&&this.range.detach();this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};G.prototype={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2};G.prototype.toString=function(){return this.message};e.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){this._current=this._next;this._next=this.nodes[++this._pointer];return this._current},
detach:function(){this._current=this._next=this.nodes=null}};var k=[1,3,4,5,7,8,10],E=[2,9,11],M=[1,3,4,5,7,8,10,11],Q=[1,3,4,5,7,8],V=j([9,11]),oa=j([5,6,10,12]),na=j([6,10,12]),ga=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],ea=0,ha=1,pa=2,ia=3,ja=0,ka=1,la=2,fa=3;$(P,X,function(b){r(b);b.startContainer=b.startOffset=b.endContainer=b.endOffset=null;b.collapsed=b.commonAncestorContainer=null;C(b,"detach",null);b._listeners=null});P.fromRange=function(b){var h=
new P(x(b));X(h,b.startContainer,b.startOffset,b.endContainer,b.endOffset);return h};P.rangeProperties=ga;P.RangeIterator=F;P.copyComparisonConstants=D;P.createPrototypeRange=$;P.inspect=u;P.getRangeDocument=x;P.rangesEqual=function(b,h){return b.startContainer===h.startContainer&&b.startOffset===h.startOffset&&b.endContainer===h.endContainer&&b.endOffset===h.endOffset};P.getEndOffset=O;l.DomRange=P;l.RangeException=G});
rangy.createModule("WrappedRange",function(l){function F(i,p,n,v){var y=i.duplicate();y.collapse(n);var t=y.parentElement();C.isAncestorOf(p,t,true)||(t=p);if(!t.canHaveHTML)return new J(t.parentNode,C.getNodeIndex(t));p=C.getDocument(t).createElement("span");var u,e=n?"StartToStart":"StartToEnd";do{t.insertBefore(p,p.previousSibling);y.moveToElementText(p)}while((u=y.compareEndPoints(e,i))>0&&p.previousSibling);e=p.nextSibling;if(u==-1&&e&&C.isCharacterDataNode(e)){y.setEndPoint(n?"EndToStart":"EndToEnd",
i);if(/[\r\n]/.test(e.data)){t=y.duplicate();n=t.text.replace(/\r\n/g,"\r").length;for(n=t.moveStart("character",n);t.compareEndPoints("StartToEnd",t)==-1;){n++;t.moveStart("character",1)}}else n=y.text.length;t=new J(e,n)}else{e=(v||!n)&&p.previousSibling;t=(n=(v||n)&&p.nextSibling)&&C.isCharacterDataNode(n)?new J(n,0):e&&C.isCharacterDataNode(e)?new J(e,e.length):new J(t,C.getNodeIndex(p))}p.parentNode.removeChild(p);return t}function G(i,p){var n,v,y=i.offset,t=C.getDocument(i.node),u=t.body.createTextRange(),
e=C.isCharacterDataNode(i.node);if(e){n=i.node;v=n.parentNode}else{n=i.node.childNodes;n=y<n.length?n[y]:null;v=i.node}t=t.createElement("span");t.innerHTML="&#feff;";n?v.insertBefore(t,n):v.appendChild(t);u.moveToElementText(t);u.collapse(!p);v.removeChild(t);if(e)u[p?"moveStart":"moveEnd"]("character",y);return u}l.requireModules(["DomUtil","DomRange"]);var x,C=l.dom,J=C.DomPosition,H=l.DomRange;if(l.features.implementsDomRange)(function(){function i(f){for(var j=n.length,q;j--;){q=n[j];f[q]=f.nativeRange[q]}}
var p,n=H.rangeProperties,v,y;x=function(f){if(!f)throw Error("Range must be specified");this.nativeRange=f;i(this)};H.createPrototypeRange(x,function(f,j,q,o,r){var z=f.startContainer!==j||f.startOffset!=q;(f.endContainer!==o||f.endOffset!=r)&&f.setEnd(o,r);z&&f.setStart(j,q)},function(f){f.nativeRange.detach();f.detached=true;for(var j=n.length,q;j--;){q=n[j];f[q]=null}});p=x.prototype;p.selectNode=function(f){this.nativeRange.selectNode(f);i(this)};p.deleteContents=function(){this.nativeRange.deleteContents();
i(this)};p.extractContents=function(){var f=this.nativeRange.extractContents();i(this);return f};p.cloneContents=function(){return this.nativeRange.cloneContents()};p.surroundContents=function(f){this.nativeRange.surroundContents(f);i(this)};p.collapse=function(f){this.nativeRange.collapse(f);i(this)};p.cloneRange=function(){return new x(this.nativeRange.cloneRange())};p.refresh=function(){i(this)};p.toString=function(){return this.nativeRange.toString()};var t=document.createTextNode("test");C.getBody(document).appendChild(t);
var u=document.createRange();u.setStart(t,0);u.setEnd(t,0);try{u.setStart(t,1);v=true;p.setStart=function(f,j){this.nativeRange.setStart(f,j);i(this)};p.setEnd=function(f,j){this.nativeRange.setEnd(f,j);i(this)};y=function(f){return function(j){this.nativeRange[f](j);i(this)}}}catch(e){v=false;p.setStart=function(f,j){try{this.nativeRange.setStart(f,j)}catch(q){this.nativeRange.setEnd(f,j);this.nativeRange.setStart(f,j)}i(this)};p.setEnd=function(f,j){try{this.nativeRange.setEnd(f,j)}catch(q){this.nativeRange.setStart(f,
j);this.nativeRange.setEnd(f,j)}i(this)};y=function(f,j){return function(q){try{this.nativeRange[f](q)}catch(o){this.nativeRange[j](q);this.nativeRange[f](q)}i(this)}}}p.setStartBefore=y("setStartBefore","setEndBefore");p.setStartAfter=y("setStartAfter","setEndAfter");p.setEndBefore=y("setEndBefore","setStartBefore");p.setEndAfter=y("setEndAfter","setStartAfter");u.selectNodeContents(t);p.selectNodeContents=u.startContainer==t&&u.endContainer==t&&u.startOffset==0&&u.endOffset==t.length?function(f){this.nativeRange.selectNodeContents(f);
i(this)}:function(f){this.setStart(f,0);this.setEnd(f,H.getEndOffset(f))};u.selectNodeContents(t);u.setEnd(t,3);v=document.createRange();v.selectNodeContents(t);v.setEnd(t,4);v.setStart(t,2);p.compareBoundaryPoints=u.compareBoundaryPoints(u.START_TO_END,v)==-1&&u.compareBoundaryPoints(u.END_TO_START,v)==1?function(f,j){j=j.nativeRange||j;if(f==j.START_TO_END)f=j.END_TO_START;else if(f==j.END_TO_START)f=j.START_TO_END;return this.nativeRange.compareBoundaryPoints(f,j)}:function(f,j){return this.nativeRange.compareBoundaryPoints(f,
j.nativeRange||j)};C.getBody(document).removeChild(t);u.detach();v.detach()})();else if(l.features.implementsTextRange){x=function(i){this.textRange=i;this.refresh()};x.prototype=new H(document);x.prototype.refresh=function(){var i,p,n=this.textRange;i=n.parentElement();var v=n.duplicate();v.collapse(true);p=v.parentElement();v=n.duplicate();v.collapse(false);n=v.parentElement();p=p==n?p:C.getCommonAncestor(p,n);p=p==i?p:C.getCommonAncestor(i,p);if(this.textRange.compareEndPoints("StartToEnd",this.textRange)==
0)p=i=F(this.textRange,p,true,true);else{i=F(this.textRange,p,true,false);p=F(this.textRange,p,false,false)}this.setStart(i.node,i.offset);this.setEnd(p.node,p.offset)};x.rangeToTextRange=function(i){if(i.collapsed)return G(new J(i.startContainer,i.startOffset),true,true);else{var p=G(new J(i.startContainer,i.startOffset),true,false),n=G(new J(i.endContainer,i.endOffset),false,false);i=C.getDocument(i.startContainer).body.createTextRange();i.setEndPoint("StartToStart",p);i.setEndPoint("EndToEnd",
n);return i}};H.copyComparisonConstants(x);var O=function(){return this}();if(typeof O.Range=="undefined")O.Range=x}x.prototype.getName=function(){return"WrappedRange"};l.WrappedRange=x;l.createNativeRange=function(i){i=i||document;if(l.features.implementsDomRange)return i.createRange();else if(l.features.implementsTextRange)return i.body.createTextRange()};l.createRange=function(i){i=i||document;return new x(l.createNativeRange(i))};l.createRangyRange=function(i){i=i||document;return new H(i)};l.createIframeRange=
function(i){return l.createRange(C.getIframeDocument(i))};l.createIframeRangyRange=function(i){return l.createRangyRange(C.getIframeDocument(i))};l.addCreateMissingNativeApiListener(function(i){i=i.document;if(typeof i.createRange=="undefined")i.createRange=function(){return l.createRange(this)};i=i=null})});
rangy.createModule("WrappedSelection",function(l,F){function G(a,d,k){var E=k?"end":"start";k=k?"start":"end";a.anchorNode=d[E+"Container"];a.anchorOffset=d[E+"Offset"];a.focusNode=d[k+"Container"];a.focusOffset=d[k+"Offset"]}function x(a){a.anchorNode=a.focusNode=null;a.anchorOffset=a.focusOffset=0;a.rangeCount=0;a.isCollapsed=true;a._ranges.length=0}function C(a){var d;if(a instanceof y){d=a._selectionNativeRange;if(!d){d=l.createNativeRange(n.getDocument(a.startContainer));d.setEnd(a.endContainer,
a.endOffset);d.setStart(a.startContainer,a.startOffset);a._selectionNativeRange=d;a.attachListener("detach",function(){this._selectionNativeRange=null})}}else if(a instanceof t)d=a.nativeRange;else if(window.Range&&a instanceof Range)d=a;return d}function J(a){var d=a.getNodes(),k;a:if(!d.length||d[0].nodeType!=1)k=false;else{k=1;for(var E=d.length;k<E;++k)if(!n.isAncestorOf(d[0],d[k])){k=false;break a}k=true}if(!k)throw Error("getSingleElementFromRange: range "+a.inspect()+" did not consist of a single element");
return d[0]}function H(a){a._ranges.length=0;if(a.nativeSelection.type=="None")x(a);else{var d=a.nativeSelection.createRange();a.rangeCount=d.length;for(var k,E=n.getDocument(d.item(0)),M=0;M<a.rangeCount;++M){k=l.createRange(E);k.selectNode(d.item(M));a._ranges.push(k)}a.isCollapsed=a.rangeCount==1&&a._ranges[0].collapsed;G(a,a._ranges[a.rangeCount-1],false)}}function O(a){this.nativeSelection=a;this._ranges=[];this.refresh()}function i(a,d){if(a.anchorNode&&n.getDocument(a.anchorNode)!==n.getDocument(d))throw new u("WRONG_DOCUMENT_ERR");
}function p(a){var d=[],k=new e(a.anchorNode,a.anchorOffset),E=new e(a.focusNode,a.focusOffset),M=typeof a.getName=="function"?a.getName():"Selection";if(typeof a.rangeCount!="undefined")for(var Q=0,V=a.rangeCount;Q<V;++Q)d[Q]=y.inspect(a.getRangeAt(Q));return"["+M+"(Ranges: "+d.join(", ")+")(anchor: "+k.inspect()+", focus: "+E.inspect()+"]"}l.requireModules(["DomUtil","DomRange","WrappedRange"]);l.config.checkSelectionRanges=true;var n=l.dom,v=l.util,y=l.DomRange,t=l.WrappedRange,u=l.DOMException,
e=n.DomPosition,f,j;if(l.util.isHostMethod(window,"getSelection"))f=function(a){return(a||window).getSelection()};else if(l.util.isHostObject(document,"selection"))f=function(a){return(a||window).document.selection};else F.fail("No means of obtaining a selection object");l.getNativeSelection=f;var q=f(),o=l.createNativeRange(document),r=n.getBody(document),z=v.areHostObjects(q,v.areHostProperties(q,["anchorOffset","focusOffset"]));l.features.selectionHasAnchorAndFocus=z;var N=v.isHostMethod(q,"extend");
l.features.selectionHasExtend=N;var S=typeof q.rangeCount=="number";l.features.selectionHasRangeCount=S;var W=false,Y=true;v.areHostMethods(q,["addRange","getRangeAt","removeAllRanges"])&&typeof q.rangeCount=="number"&&l.features.implementsDomRange&&function(){var a=r.appendChild(document.createTextNode("One")),d=r.appendChild(document.createTextNode("Two")),k=l.createNativeRange(document);k.selectNodeContents(a);var E=l.createNativeRange(document);E.selectNodeContents(d);q.removeAllRanges();q.addRange(k);
q.addRange(E);W=q.rangeCount==2;q.removeAllRanges();a.parentNode.removeChild(a);d.parentNode.removeChild(d);a=document.createElement("p");a.contentEditable=false;d=a.appendChild(document.createTextNode("test"));r.appendChild(a);k=l.createRange();k.collapseToPoint(d,1);q.addRange(k.nativeRange);Y=q.rangeCount==1;q.removeAllRanges();r.removeChild(a)}();l.features.selectionSupportsMultipleRanges=W;l.features.collapsedNonEditableSelectionsSupported=Y;var L=v.isHostProperty(q,"type"),Z=false,D;if(r&&v.isHostMethod(r,
"createControlRange")){D=r.createControlRange();if(v.areHostProperties(D,["item","add"]))Z=true}l.features.implementsControlRange=Z;j=z?function(a){return a.anchorNode===a.focusNode&&a.anchorOffset===a.focusOffset}:function(a){return a.rangeCount?a.getRangeAt(a.rangeCount-1).collapsed:false};var $;if(v.isHostMethod(q,"getRangeAt"))$=function(a,d){try{return a.getRangeAt(d)}catch(k){return null}};else if(z)$=function(a){var d=n.getDocument(a.anchorNode);d=l.createRange(d);d.setStart(a.anchorNode,a.anchorOffset);
d.setEnd(a.focusNode,a.focusOffset);if(d.collapsed!==this.isCollapsed){d.setStart(a.focusNode,a.focusOffset);d.setEnd(a.anchorNode,a.anchorOffset)}return d};l.getSelection=function(a){a=a||window;var d=a._rangySelection;if(d){d.nativeSelection=f(a);d.refresh()}else{d=new O(f(a));a._rangySelection=d}return d};l.getIframeSelection=function(a){return l.getSelection(n.getIframeWindow(a))};D=O.prototype;if(z&&v.areHostMethods(q,["removeAllRanges","addRange"])){D.removeAllRanges=function(){this.nativeSelection.removeAllRanges();
x(this)};var da=function(a,d){var k=y.getRangeDocument(d);k=l.createRange(k);k.collapseToPoint(d.endContainer,d.endOffset);a.nativeSelection.addRange(C(k));a.nativeSelection.extend(d.startContainer,d.startOffset);a.refresh()};D.addRange=S?function(a,d){if(d&&N)da(this,a);else{var k;if(W)k=this.rangeCount;else{this.removeAllRanges();k=0}this.nativeSelection.addRange(C(a));this.rangeCount=this.nativeSelection.rangeCount;if(this.rangeCount==k+1){if(l.config.checkSelectionRanges)if((k=$(this.nativeSelection,
this.rangeCount-1))&&!y.rangesEqual(k,a))a=new t(k);this._ranges[this.rangeCount-1]=a;G(this,a,s(this.nativeSelection));this.isCollapsed=j(this)}else this.refresh()}}:function(a,d){if(d&&N)da(this,a);else{this.nativeSelection.addRange(C(a));this.refresh()}};D.setRanges=function(a){this.removeAllRanges();for(var d=0,k=a.length;d<k;++d)this.addRange(a[d])}}else if(v.isHostMethod(q,"empty")&&v.isHostMethod(o,"select")&&L&&Z){D.removeAllRanges=function(){try{this.nativeSelection.empty();if(this.nativeSelection.type!=
"None"){var a;if(this.anchorNode)a=n.getDocument(this.anchorNode);else if(this.nativeSelection.type=="Control"){var d=this.nativeSelection.createRange();if(d.length)a=n.getDocument(d.item(0)).body.createTextRange()}if(a){a.body.createTextRange().select();this.nativeSelection.empty()}}}catch(k){}x(this)};D.addRange=function(a){if(this.nativeSelection.type=="Control"){var d=this.nativeSelection.createRange();a=J(a);var k=n.getDocument(d.item(0));k=n.getBody(k).createControlRange();for(var E=0,M=d.length;E<
M;++E)k.add(d.item(E));try{k.add(a)}catch(Q){throw Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");}k.select();H(this)}else{t.rangeToTextRange(a).select();this._ranges[0]=a;this.rangeCount=1;this.isCollapsed=this._ranges[0].collapsed;G(this,a,false)}};D.setRanges=function(a){this.removeAllRanges();var d=a.length;if(d>1){var k=n.getDocument(a[0].startContainer);k=n.getBody(k).createControlRange();for(var E=0,M;E<d;++E){M=J(a[E]);
try{k.add(M)}catch(Q){throw Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");}}k.select();H(this)}else d&&this.addRange(a[0])}}else{F.fail("No means of selecting a Range or TextRange was found");return false}D.getRangeAt=function(a){if(a<0||a>=this.rangeCount)throw new u("INDEX_SIZE_ERR");else return this._ranges[a]};var X;if(v.isHostMethod(q,"getRangeAt")&&typeof q.rangeCount=="number")X=function(a){a._ranges.length=
a.rangeCount=a.nativeSelection.rangeCount;if(a.rangeCount){for(var d=0,k=a.rangeCount;d<k;++d)a._ranges[d]=new l.WrappedRange(a.nativeSelection.getRangeAt(d));G(a,a._ranges[a.rangeCount-1],s(a.nativeSelection));a.isCollapsed=j(a)}else x(a)};else if(z&&typeof q.isCollapsed=="boolean"&&typeof o.collapsed=="boolean"&&l.features.implementsDomRange)X=function(a){var d;d=a.nativeSelection;if(d.anchorNode){d=$(d,0);a._ranges=[d];a.rangeCount=1;d=a.nativeSelection;a.anchorNode=d.anchorNode;a.anchorOffset=
d.anchorOffset;a.focusNode=d.focusNode;a.focusOffset=d.focusOffset;a.isCollapsed=j(a)}else x(a)};else if(v.isHostMethod(q,"createRange")&&l.features.implementsTextRange)X=function(a){var d=a.nativeSelection.createRange();if(a.nativeSelection.type=="Control")H(a);else if(d&&typeof d.text!="undefined"){d=new t(d);a._ranges=[d];G(a,d,false);a.rangeCount=1;a.isCollapsed=d.collapsed}else x(a)};else{F.fail("No means of obtaining a Range or TextRange from the user's selection was found");return false}D.refresh=
function(a){var d=a?this._ranges.slice(0):null;X(this);if(a){a=d.length;if(a!=this._ranges.length)return false;for(;a--;)if(!y.rangesEqual(d[a],this._ranges[a]))return false;return true}};var P=function(a,d){var k=a.getAllRanges(),E=false;a.removeAllRanges();for(var M=0,Q=k.length;M<Q;++M)if(E||d!==k[M])a.addRange(k[M]);else E=true;a.rangeCount||x(a)};D.removeRange=L&&Z?function(a){if(this.nativeSelection.type=="Control"){var d=this.nativeSelection.createRange();a=J(a);var k=n.getDocument(d.item(0));
k=n.getBody(k).createControlRange();for(var E,M=false,Q=0,V=d.length;Q<V;++Q){E=d.item(Q);if(E!==a||M)k.add(d.item(Q));else M=true}k.select();H(this)}else P(this,a)}:function(a){P(this,a)};var s;if(z&&l.features.implementsDomRange){s=function(a){var d=false;if(a.anchorNode)d=n.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset)==1;return d};D.isBackwards=function(){return s(this)}}else s=D.isBackwards=function(){return false};D.toString=function(){for(var a=[],d=0,k=this.rangeCount;d<
k;++d)a[d]=""+this._ranges[d];return a.join("")};D.collapse=function(a,d){i(this,a);var k=l.createRange(n.getDocument(a));k.collapseToPoint(a,d);this.removeAllRanges();this.addRange(k);this.isCollapsed=true};D.collapseToStart=function(){if(this.rangeCount){var a=this._ranges[0];this.collapse(a.startContainer,a.startOffset)}else throw new u("INVALID_STATE_ERR");};D.collapseToEnd=function(){if(this.rangeCount){var a=this._ranges[this.rangeCount-1];this.collapse(a.endContainer,a.endOffset)}else throw new u("INVALID_STATE_ERR");
};D.selectAllChildren=function(a){i(this,a);var d=l.createRange(n.getDocument(a));d.selectNodeContents(a);this.removeAllRanges();this.addRange(d)};D.deleteFromDocument=function(){if(this.rangeCount){var a=this.getAllRanges();this.removeAllRanges();for(var d=0,k=a.length;d<k;++d)a[d].deleteContents();this.addRange(a[k-1])}};D.getAllRanges=function(){return this._ranges.slice(0)};D.setSingleRange=function(a){this.setRanges([a])};D.containsNode=function(a,d){for(var k=0,E=this._ranges.length;k<E;++k)if(this._ranges[k].containsNode(a,
d))return true;return false};D.getName=function(){return"WrappedSelection"};D.inspect=function(){return p(this)};D.detach=function(){if(this.anchorNode)n.getWindow(this.anchorNode)._rangySelection=null};O.inspect=p;l.Selection=O;l.addCreateMissingNativeApiListener(function(a){if(typeof a.getSelection=="undefined")a.getSelection=function(){return l.getSelection(this)};a=null})});