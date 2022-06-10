window.onload=function(){
  window.addEventListener('keydown',(e)=>{
    movePos(e.key);
  });
  document.getElementById('start').addEventListener('click', ()=>startPtn())
}

var startPtn=async ()=>{
  document.getElementById('start').className='hide'
  document.querySelector('.reset').classList.remove('hide');
  var delayEl=document.querySelector('#delay');
  var delayVal=delayEl.options[delayEl.selectedIndex].value;
  var res='';
  
  rotate(90);
  setStar('left');
  await sleep(delayVal);
  rotate(180);
  setStar('bottom');
  await sleep(delayVal);
  setStar('right');
  rotate(270);
  await sleep(delayVal);
  
  rotate(360);
  insertPos();
  removeStar();
  
  await sleep(2);
  res=bombStar('left');
  if(res=='FAIL') return;
  await sleep(1);
  removeBomb();

  await sleep(2);
  res=bombStar('bottom');
  if(res=='FAIL') return;
  await sleep(1);
  removeBomb();

  await sleep(2);
  res=bombStar('right');
  if(res=='FAIL') return;
  await sleep(1);
  removeBomb();
}

var removeStar=()=>{
  var eArr=document.querySelectorAll('.purple');
  eArr.forEach((el,idx,arr)=>{
    el.classList.remove('purple');
    el.classList.add('white');
  })
}

var bombStar=(tbNm)=>{
  var res='SUCCESS';
  var tbEl=document.getElementById(tbNm+'Tb');
  var arrTr=tbEl.querySelectorAll('tr');
  var mainTrArr=document.querySelectorAll('#mainTb tr');
  
  if(tbNm=='left'){
    for(i=0; i<3; i++){
      var tdEl=arrTr[i].firstElementChild;
      var mainTd=mainTrArr[i].lastElementChild;
      while(tdEl!=null){
        if(tdEl.innerHTML=='*'){
          if(mainTd.className=='userPos'){
            mainTd.classList.add("fail");
            res='FAIL';
          } 
          else mainTd.classList.add("bomb");
        }
        tdEl=tdEl.nextElementSibling;
        mainTd=mainTd.previousElementSibling
      }
    }  
  }
  else if(tbNm=='bottom'){
    var revNum=2;
    for(i=0; i<3; i++){
      var tdEl=arrTr[revNum].firstElementChild;
      var mainTd=mainTrArr[i].firstElementChild;
      while(tdEl!=null){
        if(tdEl.innerHTML=='*'){
          if(mainTd.className=='userPos'){
            mainTd.classList.add("fail");
            res='FAIL';
          } 
          else mainTd.classList.add("bomb");
        }
        tdEl=tdEl.nextElementSibling;
        mainTd=mainTd.nextElementSibling;
      }
      revNum--
    }
  }
  else if(tbNm=='right'){
    for(i=0; i<3; i++){
      var tdEl=arrTr[i].lastElementChild;
      var mainTd=mainTrArr[i].firstElementChild;
      while(tdEl!=null){
        if(tdEl.innerHTML=='*'){
          if(mainTd.className=='userPos'){
            mainTd.classList.add("fail");
            res='FAIL';
          } 
          else mainTd.classList.add("bomb");
        }
        tdEl=tdEl.previousElementSibling;
        mainTd=mainTd.nextElementSibling;
      }
    }
  }

  return res
}

var removeBomb=()=>{
  var tdArr=document.querySelectorAll('#mainTb td');
  tdArr.forEach((currEl, idx, array)=>{
    currEl.classList.remove('bomb');
  });
}

var setStar=(tbNm)=>{
  var tbEl=document.getElementById(tbNm+'Tb');
  var arrTd=tbEl.querySelectorAll('td');
  var starCount=0;
  var i=0;
  
  while(starCount<7){
    var flag=Math.floor(Math.random()*10)%2;
    var td=arrTd[i%9]
    if(td==null){
      console.error('ERR');
      break;
    }
    if(flag>0 && td.innerHTML==''){
      td.innerHTML='*'
      starCount++;
    }
    i++
  }
  //console.log('starC:'+starCount);
  //console.log('i:'+i);
}

var sleep= async (ms)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>resolve(),ms*1000)
  });
}

var rotate=(num)=>{
  var div=document.querySelector('.container');
  div.className+=" rot"+num;
}

var removeRotate=()=>{
  document.querySelector('.container').className='container'
}

var insertPos=()=>{
  var currEl=document.querySelector('.userPos');
  if(currEl!=null) return;
  var tb=document.querySelector('#mainTb');
  var tr=tb.firstElementChild.firstElementChild.nextElementSibling;
  tr.firstElementChild.nextElementSibling.className='userPos'
}

var movePos=(key)=>{
  var currEl=document.querySelector('.userPos');
  if(currEl==null) return;
  
  if(key=='w') upPos(currEl);
  else if(key=='a') leftPos(currEl);
  else if(key=='s') downPos(currEl);
  else if(key=='d') rightPos(currEl);
}

function upPos(currEl){
  var currIdx= getIndex(currEl);

  var trEl=currEl.parentElement.previousElementSibling;
  if(trEl==null) return;
  var nextEl=trEl.firstElementChild;
  
  while(currIdx>0){
    if(nextEl!=null) nextEl=nextEl.nextElementSibling;
    currIdx--
  }
  
  currEl.classList.remove('userPos');
  nextEl.classList.add('userPos');
}
function downPos(currEl){
  var currIdx= getIndex(currEl);

  var trEl=currEl.parentElement.nextElementSibling;
  if(trEl==null) return;
  var nextEl=trEl.firstElementChild;
  
  while(currIdx>0){
    if(nextEl!=null) nextEl=nextEl.nextElementSibling;
    currIdx--
  }
  
  currEl.classList.remove('userPos');
  nextEl.classList.add('userPos');
}
function leftPos(currEl){
  var nextEl=currEl.previousElementSibling;
  if(nextEl==null) return;
  currEl.classList.remove('userPos');
  nextEl.classList.add('userPos');
}
function rightPos(currEl){
  var nextEl=currEl.nextElementSibling;
  if(nextEl==null) return;
  currEl.classList.remove('userPos');
  nextEl.classList.add('userPos');
}

function getIndex(ele) {
  var _i = 0;
  while((ele = ele.previousElementSibling) != null ) {
    _i++;
  }
  return _i;
}

