(()=>{"use strict";var t,e,r,o,s={236:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Generator=void 0;var o=r(168),s=function(){function t(){this.gridSize=9,this.usedNumbers=[],this.shiftRows=[],this.board=[],this.solvedBoard=[],this.solver=new o.Solver}return t.prototype.getSolvedBoard=function(){return this.solvedBoard},t.prototype.generatePresetValues=function(){for(var t=0;t<this.gridSize;t++){t>0&&(this.shiftRows[t]=t%3==0?1:3),this.board[t]=[];for(var e=0;e<this.gridSize;e++)this.board[t][e]=this.generateValue(t,e)}for(var r=0;r<6;r++)this.board=this.randomizeBoard();this.solvedBoard=JSON.parse(JSON.stringify(this.board)),e=null;for(var o=0,s=0,i=Date.now(),a=JSON.parse(JSON.stringify(this.board));o<48&&s<1e3;){a=JSON.parse(JSON.stringify(this.board));var n=Math.floor(9*Math.random()),d=Math.floor(9*Math.random());0!=a[n][d]&&(a[n][d]=0,1==this.solver.solveBoard(a,0,0)&&(this.board[n][d]=0,o++)),s++}return console.log("Time took: "+(Date.now()-i)/1e3+" s"),this.board},t.prototype.randomizeBoard=function(){var t,e=this.board.map((function(t){return t})),r=Math.random();if("shiftRow"==(t=r<.5?"shiftRow":"shiftColumn")||"shiftColumn"==t){var o;o=(r=Math.random())<.33?1:r<.66?4:7;var s;if(s=(r=Math.random())>.5?1:-1,"shiftRow"==t)console.log("Shift row!"),console.log("from:"+o+" to:"+(o+s)),e=this.insertAndShift(e,o,o+s);else{console.log("Shift Column!"),console.log("from:"+o+" to:"+(o+s));for(var i=0;i<this.gridSize;i++)e[i]=this.insertAndShift(e[i],o,o+s)}}return e},t.prototype.insertAndShift=function(t,e,r){var o=t.map((function(t){return t})),s=o.splice(e,1)[0];return o.splice(r,0,s),o},t.prototype.shiftRow=function(){},t.prototype.generateValue=function(t,e){var r=0,o=0,s=!1;if(0!=t){var i=e+this.shiftRows[t];return i>=9&&(i-=9),this.board[t-1][i]}for(;!s&&o<1e5;){if(r=Math.floor(9*Math.random())+1,-1===this.usedNumbers.indexOf(r)&&(this.usedNumbers.push(r),s=!0),s)return r;o++}return r},t}();e.Generator=s},168:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Solver=void 0;var r=function(){function t(){this.solutionCnt=0}return t.prototype.getSolutionCnt=function(){return this.solutionCnt},t.prototype.solveBoard=function(t,e,r,o){if(void 0===o&&(o=0),9==e&&(e=0,9==++r))return 1+o;if(0!=t[e][r])return this.solveBoard(t,e+1,r,o);for(var s=1;s<=9&&o<2;s++)this.isSafe(t,e,r,s)&&(t[e][r]=s,o=this.solveBoard(t,e+1,r,o));return t[e][r]=0,o},t.prototype.isSafe=function(t,e,r,o){for(var s=0;s<9;s++){if(t[e][s]==o)return!1;if(t[s][r]==o)return!1}for(var i=e-e%3,a=r-r%3,n=0;n<3;n++)for(var d=0;d<3;d++)if(t[n+i][d+a]==o)return!1;return!0},t}();e.Solver=r},912:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Storage=void 0;var r=function(){function t(){}return t.prototype.createCookie=function(t,e,r){var o;if(r){var s=new Date;s.setTime(s.getTime()+24*r*60*60*1e3),o="; expires="+s.toUTCString()}else o="";document.cookie=t+"="+e+o+"; path=/"},t.prototype.getCookie=function(t){for(var e=t+"=",r=document.cookie.split(";"),o=0;o<r.length;o++){for(var s=r[o];" "===s.charAt(0);)s=s.substring(1,s.length);if(0===s.indexOf(e))return s.substring(e.length,s.length)}return null},t.prototype.save=function(t){return this.createCookie("sudoku",t,30),!0},t.prototype.load=function(){return this.getCookie("sudoku")},t}();e.Storage=r}},i={};function a(t){var e=i[t];if(void 0!==e)return e.exports;var r=i[t]={exports:{}};return s[t](r,r.exports,a),r.exports}t=a(912),e=a(236),r=a(168),o=function(){function o(){this.used=[],this.shiftRows=[],this.validBoard=!1,this.ts=0,this.storage=new t.Storage,this.generator=new e.Generator,this.solver=new r.Solver,this.reset()}return o.prototype.reset=function(){this.ts=Date.now(),this.board=[],this.solvedBoard=[],this.used=[],this.shiftRows=[],this.validBoard=!1,this.boardEl=document.getElementsByClassName("sudoku")[0],this.createBoard();var t=this;setInterval((function(){t.update()}),1e3)},o.prototype.createBoard=function(){for(var t="",e=0;e<9;e++){t+='<tr class="'+e+'">',this.board[e]=[];for(var r=0;r<9;r++)t+='<td class="'+r+'"><input type="text" class="'+e+"-"+r+'"/></td>',this.board[e][r]=0;t+="</tr>"}this.boardEl.innerHTML=t;var o=this.storage.load(),s=!1;if(o){var i=JSON.parse(o);i.board&&i.solvedBoard&&(s=!0,this.board=i.board.map((function(t){return t})),this.solvedBoard=i.solvedBoard.map((function(t){return t})))}s||(this.board=this.generator.generatePresetValues(),this.solvedBoard=this.generator.getSolvedBoard()),this.updateBoard()},o.prototype.update=function(){var t=Math.floor((Date.now()-this.ts)/1e3);document.getElementsByClassName("time")[0].innerHTML=t.toString()+"sec"},o.prototype.updateBoard=function(){this.boardEl=document.getElementsByClassName("sudoku")[0];for(var t=[],e=0;e<9;e++)for(var r=0;r<9;r++){var o=this.boardEl.querySelector("tr[class='"+e+"'] > td[class='"+r+"'] > input"),s=parseInt(o.value[o.value.length-1]);isNaN(s)?o.value="":this.board[e][r]=s,0!==this.board[e][r]&&(o.value=this.board[e][r].toString()),t[this.board[e][r]]||(t[this.board[e][r]]=0),t[this.board[e][r]]++}for(var i=1;i<=9;i++)t[i]>=9?document.getElementsByClassName("remaining")[0].querySelector('span[class="rm-'+i+'"]').style.visibility="hidden":document.getElementsByClassName("remaining")[0].querySelector('span[class="rm-'+i+'"]').style.visibility="visible";JSON.stringify(this.board)==JSON.stringify(this.solvedBoard)&&(alert("Completed sudoku!"),this.storage.save(""),this.reset());var a={board:this.board,solvedBoard:this.solvedBoard};this.storage.save(JSON.stringify(a))},o.prototype.updateValue=function(t,e){var r=!0,o=this.boardEl.querySelector('input[class="'+t+"-"+e+'"');if(""==o.value)return this.board[t][e]=0,void(o.value="");if(parseInt(o.value)<=0)return this.board[t][e]=0,void(o.value="");if(parseInt(o.value)>9){var s=parseInt(o.value[o.value.length-1]);this.board[t][e]=s,o.value=s.toString()}var i=parseInt(o.value);this.solvedBoard[t][e]>0&&(i!=this.solvedBoard[t][e]&&(r=!1),r?(this.validBoard=!0,o.style.color="#008259"):(this.validBoard=!1,o.style.color="#ff0000"))},o}(),window.onload=function(){for(var t=new o,e=document.querySelectorAll("tr > td > input"),r=0;r<e.length;r++)e[r].addEventListener("keyup",(function(e){var r=e.target.getAttribute("class").split("-");t.updateValue(parseInt(r[0]),parseInt(r[1])),t.updateBoard()}));document.getElementsByClassName("btn-new")[0].addEventListener("click",(function(e){console.log("click!"),this.storage.save(""),t.reset()}))}})();
//# sourceMappingURL=bundle.js.map