const cart=[];
const STORE_WHATSAPP='923172798138';
const drawer=document.getElementById('drawer'),overlay=document.getElementById('overlay'),toast=document.getElementById('toast');
function note(t){toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2000)}
function open(){drawer.classList.add('open');overlay.classList.add('show')}
function close(){drawer.classList.remove('open');overlay.classList.remove('show')}
document.getElementById('bag').onclick=open;
document.getElementById('close').onclick=close;
overlay.onclick=close;
function render(){
 document.getElementById('count').textContent=cart.reduce((a,x)=>a+x.qty,0);
 document.getElementById('total').textContent='Rs. '+cart.reduce((a,x)=>a+x.price*x.qty,0).toLocaleString('en-PK');
 const host=document.getElementById('items');
 if(!cart.length){host.textContent='Your bag is empty.';return}
 host.innerHTML=cart.map((x,i)=>`<div class="line"><span>${x.name} (${x.size}) × ${x.qty}<br>Rs. ${x.price.toLocaleString('en-PK')}</span><button data-del="${i}">REMOVE</button></div>`).join('');
 host.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.del,1);render()});
}
document.querySelectorAll('.photo button').forEach(b=>b.onclick=()=>{
 const card=b.closest('.product');
 let size=card.querySelector('.size-select')?.value || prompt('Enter shoe size (for example 38, 39, 40):');
 if(!size){note('Please select a shoe size');return}
 let x=cart.find(x=>x.name===b.dataset.name&&x.size===size);
 if(x)x.qty++;else cart.push({name:b.dataset.name,price:+b.dataset.price,qty:1,size});
 render();note(b.dataset.name+' added to bag');
});
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.product').forEach(p=>p.style.display=b.dataset.filter==='All'||p.dataset.category===b.dataset.filter?'':'none')});
document.getElementById('hamburger').onclick=()=>document.getElementById('nav').classList.toggle('open');
document.getElementById('search').onclick=()=>{let q=prompt('Search shoes');if(!q)return;let any=false;document.querySelectorAll('.product').forEach(p=>{let yes=p.textContent.toLowerCase().includes(q.toLowerCase());p.style.display=yes?'':'none';any=any||yes});document.getElementById('products').scrollIntoView({behavior:'smooth'});note(any?'Matching products shown':'No matching demo products')};
const checkoutForm=document.getElementById('checkoutForm');
document.getElementById('checkout').onclick=()=>{
 if(!cart.length){note('Your bag is empty');return}
 checkoutForm.classList.toggle('show');
 if(checkoutForm.classList.contains('show')) checkoutForm.scrollIntoView({behavior:'smooth',block:'nearest'});
};
checkoutForm.addEventListener('submit',e=>{
 e.preventDefault();
 if(!cart.length){note('Your bag is empty');return}
 const name=document.getElementById('customerName').value.trim();
 const phone=document.getElementById('customerPhone').value.trim();
 const city=document.getElementById('customerCity').value.trim();
 const address=document.getElementById('customerAddress').value.trim();
 const lines=cart.map((x,i)=>`${i+1}. ${x.name}\n   Size: ${x.size} | Qty: ${x.qty} | Price: Rs. ${x.price.toLocaleString('en-PK')} | Subtotal: Rs. ${(x.price*x.qty).toLocaleString('en-PK')}`);
 const total=cart.reduce((sum,x)=>sum+x.price*x.qty,0);
 const message=`*SOLE HOUSE — NEW ORDER*\n\n*Customer:* ${name}\n*Mobile:* ${phone}\n*City:* ${city}\n*Delivery address:* ${address}\n\n*ORDER ITEMS*\n${lines.join('\n')}\n\n*Total: Rs. ${total.toLocaleString('en-PK')}*\n*Payment: Cash on Delivery*\n\nPlease confirm my order.`;
 // Navigate directly to WhatsApp so mobile browsers and local-file previews do not block a new tab.
 const whatsappUrl=`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
 window.location.href=whatsappUrl;
});
render();
// Category mega menu interactions
const mega=document.getElementById('megaMenu'),megaOverlay=document.getElementById('megaOverlay');
function openMega(menuName,button){mega.classList.add('open');megaOverlay.classList.add('show');mega.setAttribute('aria-hidden','false');document.body.classList.add('menu-open');document.querySelectorAll('.nav-category').forEach(b=>b.classList.toggle('active',b===button));}
function closeMega(){mega.classList.remove('open');megaOverlay.classList.remove('show');mega.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open');document.querySelectorAll('.nav-category').forEach(b=>b.classList.remove('active'));}
document.querySelectorAll('.nav-category').forEach(b=>b.addEventListener('click',()=>{if(mega.classList.contains('open')&&b.classList.contains('active'))closeMega();else openMega(b.dataset.menu,b)}));
document.getElementById('megaClose').addEventListener('click',closeMega);megaOverlay.addEventListener('click',closeMega);
mega.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMega));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMega()});
// Open the main sidebar from the hamburger icon.
document.getElementById('hamburger').addEventListener('click',()=>openMega('main',document.querySelector('.nav-category')));

// View Product modal
const productModal=document.getElementById('productModal');
let activeProductCard=null;
const productDescriptions={
 'Luna Everyday':'A polished everyday style for workdays, weekends and everything in between.',
 'City Classic':'A clean, versatile sneaker made to complement everyday outfits.',
 'Mini Runner':'A playful everyday pair designed for little adventures.',
 'Daisy Step':'A sweet, easy-to-style pair for comfortable everyday moments.'
};
function closeProductModal(){productModal.classList.remove('show');productModal.setAttribute('aria-hidden','true');activeProductCard=null;}
document.querySelectorAll('.product .view-product').forEach(button=>button.addEventListener('click',()=>{
 const card=button.closest('.product');activeProductCard=card;
 const name=card.querySelector('h3').textContent.trim(),price=card.querySelector('.photo button').dataset.price,category=card.dataset.category,image=card.querySelector('.photo img');
 const imageHost=document.getElementById('modalProductImage');imageHost.innerHTML='';
 if(image)imageHost.appendChild(image.cloneNode(true));else imageHost.innerHTML='<div class="modal-girls-art">SOLE HOUSE<br><strong>LITTLE STEPS</strong></div>';
 document.getElementById('modalProductName').textContent=name;
 document.getElementById('modalProductCategory').textContent=category;
 document.getElementById('modalProductPrice').textContent='Rs. '+Number(price).toLocaleString('en-PK');
 document.getElementById('modalProductDescription').textContent=productDescriptions[name]||'A versatile everyday pair, selected for comfort and style.';
 const source=card.querySelector('.size-select'),target=document.getElementById('modalProductSize');target.innerHTML='<option value="">Choose your size</option>';
 [...source.options].filter(o=>o.value).forEach(o=>{const option=document.createElement('option');option.value=o.value;option.textContent=o.value;target.appendChild(option);});
 target.value=source.value||'';productModal.classList.add('show');productModal.setAttribute('aria-hidden','false');
}));
productModal.querySelectorAll('[data-modal-close]').forEach(el=>el.addEventListener('click',closeProductModal));
document.getElementById('modalAddToBag').addEventListener('click',()=>{
 if(!activeProductCard)return;const size=document.getElementById('modalProductSize').value;if(!size){note('Please select a shoe size');return;}
 const addButton=activeProductCard.querySelector('.photo button'),name=addButton.dataset.name,price=Number(addButton.dataset.price),existing=cart.find(x=>x.name===name&&x.size===size);
 if(existing)existing.qty++;else cart.push({name,price,qty:1,size});activeProductCard.querySelector('.size-select').value=size;
 render();closeProductModal();note(name+' added to bag');
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&productModal.classList.contains('show'))closeProductModal()});


// Supabase-powered customer accounts
const accountModal=document.getElementById('accountModal');
const accountTabs=document.getElementById('accountTabs');
const loginForm=document.getElementById('loginForm');
const signupForm=document.getElementById('signupForm');
const resetForm=document.getElementById('resetForm');
const accountTitle=document.getElementById('accountTitle');
const accountSubtitle=document.getElementById('accountSubtitle');
const accountButton=document.getElementById('accountBtn');
const supabaseClient=window.SOLE_HOUSE_SUPABASE;
let currentUser=null;
function openAccount(){accountModal.classList.add('show');accountModal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';showAccountMode(currentUser?'account':'login');}
function closeAccount(){accountModal.classList.remove('show');accountModal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
function showAccountMode(mode){
 accountTabs.hidden=mode==='reset'||mode==='account';loginForm.hidden=mode!=='login';signupForm.hidden=mode!=='signup';resetForm.hidden=mode!=='reset';
 accountTabs.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.accountTab===mode));
 accountTitle.textContent=mode==='signup'?'Create account':mode==='reset'?'Reset password':mode==='account'?'You’re signed in':'Sign in';
 accountSubtitle.textContent=mode==='signup'?'Create your SOLE HOUSE account for a smoother shopping experience.':mode==='reset'?'We’ll help you get back into your account.':mode==='account'?(currentUser?.email||'Your account is active.'):'Access your account and enjoy a smoother shopping experience.';
}
function authError(error){note(error?.message||'Authentication could not be completed. Please try again.');}
function setAuthBusy(form,busy){const button=form.querySelector('[type="submit"]');if(!button)return;button.disabled=busy;button.dataset.originalText??=button.textContent;button.textContent=busy?'PLEASE WAIT…':button.dataset.originalText;}
if(!supabaseClient)console.error('Supabase client missing. Check supabase-config.js and the Supabase CDN connection.');
accountButton.addEventListener('click',openAccount);
accountModal.querySelectorAll('[data-account-close]').forEach(el=>el.addEventListener('click',closeAccount));
accountTabs.querySelectorAll('[data-account-tab]').forEach(b=>b.addEventListener('click',()=>showAccountMode(b.dataset.accountTab)));
document.getElementById('forgotPassword').addEventListener('click',()=>showAccountMode('reset'));
document.getElementById('backToLogin').addEventListener('click',()=>showAccountMode('login'));
loginForm.addEventListener('submit',async e=>{e.preventDefault();if(!supabaseClient){note('Authentication service is not configured.');return;}setAuthBusy(loginForm,true);try{const {data,error}=await supabaseClient.auth.signInWithPassword({email:document.getElementById('loginEmail').value.trim(),password:document.getElementById('loginPassword').value});if(error)throw error;currentUser=data.user;note('Signed in successfully');closeAccount();}catch(error){authError(error);}finally{setAuthBusy(loginForm,false);}});
signupForm.addEventListener('submit',async e=>{e.preventDefault();if(!supabaseClient){note('Authentication service is not configured.');return;}const password=document.getElementById('signupPassword').value;if(password!==document.getElementById('signupConfirm').value){note('Passwords do not match');return;}setAuthBusy(signupForm,true);try{const {data,error}=await supabaseClient.auth.signUp({email:document.getElementById('signupEmail').value.trim(),password,options:{data:{full_name:document.getElementById('signupName').value.trim()}}});if(error)throw error;currentUser=data.user;if(data.session){note('Account created and signed in');closeAccount();}else{note('Account created. Check your email to confirm it, then sign in.');showAccountMode('login');}}catch(error){authError(error);}finally{setAuthBusy(signupForm,false);}});
resetForm.addEventListener('submit',async e=>{e.preventDefault();if(!supabaseClient){note('Authentication service is not configured.');return;}setAuthBusy(resetForm,true);try{const {error}=await supabaseClient.auth.resetPasswordForEmail(document.getElementById('resetEmail').value.trim(),{redirectTo:window.location.href.split('#')[0]});if(error)throw error;note('Password reset email sent. Check your inbox.');showAccountMode('login');}catch(error){authError(error);}finally{setAuthBusy(resetForm,false);}});
if(supabaseClient){supabaseClient.auth.getSession().then(({data,error})=>{if(error){console.error(error);return;}currentUser=data.session?.user||null;accountButton.setAttribute('aria-label',currentUser?'Account signed in':'Open account');});supabaseClient.auth.onAuthStateChange((_event,session)=>{currentUser=session?.user||null;accountButton.setAttribute('aria-label',currentUser?'Account signed in':'Open account');});}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&accountModal.classList.contains('show'))closeAccount();});
