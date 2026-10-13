'use strict';
// Firebase Auth only: no Analytics, Firestore or desktop data access.
const $=id=>document.getElementById(id);
let authClient,mode='login',busy=false,resetCode=null;
function showStatus(message,error=false){$('status').textContent=message;$('status').classList.toggle('error',error);}
function setMode(next){mode=next;const signup=next==='signup',reset=next==='reset',forgot=next==='forgot';$('account-title').textContent=signup?'A space of your own.':reset?'A fresh password.':forgot?'Let’s get you back in.':'Welcome back.';$('account-intro').textContent=signup?'Create an account to get Nexus Notes for your computer.':reset?'Choose a new password for your website account.':forgot?'We’ll email you a link to reset your password.':'Sign in to find your Nexus Notes downloads.';$('submit').textContent=signup?'Create account ↗':reset?'Save password':forgot?'Send reset link':'Log in ↗';$('email-field').hidden=reset;$('email').required=!reset;$('password-field').hidden=forgot;$('password').required=!forgot;$('password').autocomplete=signup||reset?'new-password':'current-password';$('password').minLength=signup||reset?8:1;$('show-password-label').hidden=forgot;$('signup-note').hidden=!signup;$('account-prompt').hidden=!signup;$('switch-mode').textContent=signup?'Log in':'Create an account';$('forgot').hidden=forgot||reset;$('resend').hidden=true;showStatus('');}

const emailSettings=()=>({url:new URL('account.html',location.href).href});
function authMessage(error){
 const messages={
  'auth/invalid-credential':'Invalid login credentials.',
  'auth/user-not-found':'Invalid login credentials.',
  'auth/wrong-password':'Invalid login credentials.',
  'auth/too-many-requests':'Too many attempts. Please wait before trying again.',
  'auth/network-request-failed':'Could not reach account services. Check your connection and try again.',
  'auth/expired-action-code':'This email link has expired. Request a new one.',
  'auth/invalid-action-code':'This email link is invalid or has already been used. Request a new one.'
 };
 return messages[error.code]||error.message||'Something went wrong. Please try again.';
}
async function initialUser(){
 let unsubscribe;
 try{return await new Promise((resolve,reject)=>{unsubscribe=authClient.onAuthStateChanged(resolve,reject);});}
 finally{if(unsubscribe)unsubscribe();}
}
async function resendVerification(){
 if(busy)return;
 busy=true;
 try{
  const user=authClient.currentUser;
  if(!user)throw Error('Log in with your email and password first to resend verification.');
  await user.reload();
  if(user.emailVerified){location.assign('downloads.html');return;}
  await user.sendEmailVerification(emailSettings());
  showStatus('Check your email for a new verification link.');
 }catch(error){showStatus(authMessage(error),true);}finally{busy=false;}
}
async function startAuth(){
 try{
  if(!window.firebase)throw Error('Account services could not load. Please refresh this page.');
  firebase.initializeApp(window.NEXUS_CONFIG.firebase);
  authClient=firebase.auth();
  await authClient.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const user=await initialUser();
  if(document.body.dataset.page==='account'){
   setMode(new URLSearchParams(location.search).get('mode')==='signup'?'signup':'login');
   $('show-password').addEventListener('change',event=>$('password').type=event.target.checked?'text':'password');
   $('switch-mode').addEventListener('click',()=>{resetCode=null;setMode(mode==='signup'?'login':'signup');});
   $('forgot').addEventListener('click',()=>{resetCode=null;setMode('forgot');});
   $('account-form').addEventListener('submit',submitAccount);
   $('resend').addEventListener('click',resendVerification);
   const params=new URLSearchParams(location.search),action=params.get('mode'),code=params.get('oobCode');
   if(action==='resetPassword'||action==='verifyEmail'){
    // Remove single-use codes from history before further navigation.
    history.replaceState(null,'',location.pathname);
    if(!code)throw Error('This email link is incomplete. Request a new one.');
    if(action==='resetPassword'){
     try{await authClient.verifyPasswordResetCode(code);resetCode=code;setMode('reset');}
     catch(error){setMode('forgot');throw error;}
    }else{
     await authClient.applyActionCode(code);
     if(user){await user.reload();await user.getIdToken(true);}
     showStatus('Email verified. Log in to access your downloads.');
     if(user&&user.emailVerified)location.assign('downloads.html');
    }
   }else if(user&&!user.emailVerified){$('resend').hidden=false;showStatus('Verify your email before accessing downloads.');}
  }else if(document.body.dataset.page==='downloads'){
   $('retry').addEventListener('click',loadNexusDownloads);
   $('logout').addEventListener('click',async()=>{
    try{await authClient.signOut();location.replace('account.html');}
    catch(error){showStatus(authMessage(error),true);}
   });
   if(user){await user.reload();await user.getIdToken(true);}
   if(!user||!user.emailVerified){
    $('login-gate').hidden=false;
    $('logout').hidden=!user;
    showStatus(user?'Verify your email, then log in to continue.':'Sign in to continue.');
    return;
   }
   $('logout').hidden=false;$('downloads').hidden=false;
   authClient.onAuthStateChanged(next=>{
    if(!next||!next.emailVerified){
     $('downloads').hidden=true;$('release-cards').replaceChildren();
     $('login-gate').hidden=false;$('logout').hidden=!next;
     showStatus('Sign in with a verified account to continue.');
    }
   });
   await loadNexusDownloads();
  }
 }catch(error){showStatus(authMessage(error),true);if($('login-gate')){$('downloads').hidden=true;$('login-gate').hidden=false;}}
}
async function submitAccount(event){
 event.preventDefault();if(busy)return;busy=true;$('submit').disabled=true;showStatus('Please wait?');
 try{
  const email=$('email').value.trim(),password=$('password').value;
  if(mode==='signup'){
   const {user}=await authClient.createUserWithEmailAndPassword(email,password);
   // Account creation signs in automatically; downloads still require verification.
   $('resend').hidden=false;
   await user.sendEmailVerification(emailSettings());
   showStatus('Check your email for a verification link. After verifying, log in to access downloads.');
  }else if(mode==='forgot'){
   try{await authClient.sendPasswordResetEmail(email,emailSettings());}
   catch(error){if(error.code!=='auth/user-not-found')throw error;}
   showStatus('If an account exists for that address, a password reset email has been requested.');
  }else if(mode==='reset'){
   if(!resetCode)throw Error('Request a new password reset link.');
   await authClient.confirmPasswordReset(resetCode,password);resetCode=null;
   await authClient.signOut();setMode('login');showStatus('Password updated. Log in with your new password.');
  }else{
   const {user}=await authClient.signInWithEmailAndPassword(email,password);
   await user.reload();
   if(!user.emailVerified){$('resend').hidden=false;showStatus('Verify your email before accessing downloads.',true);return;}
   location.assign('downloads.html');
  }
 }catch(error){showStatus(authMessage(error),true);}
 finally{busy=false;$('submit').disabled=false;}
}
startAuth();
