'use strict';
const content = document.getElementById('content');
const recipients = ['Uldana Abdikarim', 'Thomas Poitevin', 'Andrés Ramasco', 'Henrique Santos', 'Abraham Tamru Assefa'];
const normalize = value => value.trim().replace(/\s+/g, ' ').toLowerCase();
let timers = [];
const skull = `<svg class="skull" viewBox="0 0 200 210" role="img" aria-label="Skull"><path fill="currentColor" d="M100 6C43 6 12 43 12 91c0 30 11 51 37 63v25h17v25h68v-25h17v-25c26-12 37-33 37-63C188 43 157 6 100 6Z"/><path fill="#000" d="M38 84c0-14 18-20 38-12l9 31c-25 17-47 5-47-19Zm124 0c0-14-18-20-38-12l-9 31c25 17 47 5 47-19Zm-62 26-16 27h32Zm-24 63h8v31h-8Zm20 0h8v31h-8Zm20 0h8v31h-8Z"/></svg>`;
function home(){
 document.body.classList.remove('dark');
 content.innerHTML = `<div class="cake" aria-hidden="true">🎂</div><div class="eyebrow">The best office award</div><h1>Please enter<br>your name <em>below</em></h1><p>A little birthday cheer, a little appreciation.<br>There’s something here just for you.</p><form><div class="fields"><div><label for="first">First name</label><input id="first" name="first" autocomplete="given-name" placeholder="Your first name" maxlength="100" required></div><div><label for="last">Last name</label><input id="last" name="last" autocomplete="family-name" placeholder="Your last name" maxlength="100" required></div></div><button type="submit">Unwrap your surprise <span aria-hidden="true">↗</span></button></form><p class="small">Made with a little extra appreciation.</p>`;
 content.querySelector('form').addEventListener('submit',event=>{
  event.preventDefault();
  const name = normalize(document.getElementById('first').value+' '+document.getElementById('last').value);
  const recipient = recipients.find(value=>normalize(value)===name);
  history.pushState(null,'',recipient ? '#recipient-'+recipients.indexOf(recipient) : '#not-recognized');
  render();
 });
}
function back(){return '<button class="back" type="button">Back to the celebration</button>'}
function render(){
 timers.forEach(clearTimeout);timers=[];document.body.classList.remove('dark');
 const route=location.hash;
 if(route==='#not-recognized'){
  content.innerHTML='<div class="cake" aria-hidden="true">✉️</div><div class="eyebrow">The best office award</div><h1>You are not a valid recipient of the best office award</h1>'+back();
 }else if(/^#recipient-[0-4]$/.test(route)){
  const name=recipients[Number(route.slice(-1))];
  if(name==='Thomas Poitevin'){
   content.innerHTML='<h1 class="terminal">Malicious file is being downloaded into your phone ....</h1><div class="progress" aria-hidden="true"></div>';
   timers.push(setTimeout(()=>{content.innerHTML='<h1 class="terminal">file successfully downloaded</h1>';timers.push(setTimeout(()=>{document.body.classList.add('dark');content.innerHTML=skull+'<h1>French are down. Game on, Thomas 😈</h1>'+back();bindBack();},1000));},1000));
  }else{
   content.innerHTML='<div class="seal" aria-label="A virtual cookie">🍪</div><div class="eyebrow">A well-deserved treat</div><h1>Thank you,<br><em>'+name+'</em></h1><p>Thank you '+name+' for helping build the culture of the Department of Economics at the University of Notre Dame. Please accept our thanks in the form of this virtual cookie. We hope you have a good day ahead.</p>'+back();
  }
 }else{home();}
 bindBack();window.scrollTo(0,0);
}
function bindBack(){const button=content.querySelector('.back');if(button)button.onclick=()=>{history.pushState(null,'',location.pathname+location.search);render();};}
window.addEventListener('popstate',render);window.addEventListener('hashchange',render);
const confetti=document.querySelector('.confetti');for(let i=0;i<22;i++){const piece=document.createElement('i');piece.style.cssText=`left:${(i*37+5)%100}%;top:${(i*23+6)%100}%;background:${['#e4b9af','#c4cbb4','#dfc17d'][i%3]};transform:rotate(${i*29}deg)`;confetti.appendChild(piece);}
render();
