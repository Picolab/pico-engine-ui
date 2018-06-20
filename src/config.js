export function getEngineLoc(){
  if(!localStorage.getItem('engine_loc')){
    localStorage.setItem('engine_loc', 'http://localhost:8080')
  }
  return localStorage.getItem('engine_loc')
}

export const UIRulesetUrl = "https://raw.githubusercontent.com/Picolab/pico-engine-ui/master/krl/io.picolabs.ui";

export function getEntryHost(){
  return localStorage.getItem('entry_host')
}

export function setEntryHost(host){
  localStorage.setItem('entry_host', host)
}

export function getEntryDID(){
  return localStorage.getItem('entry_DID')
}

export function setEntryDID(did){
  localStorage.setItem('entry_DID', did)
}

//more validity checking should be added...
export function validEntryHost(){
  let entry_DID = localStorage.getItem('entry_host')
  if(entry_DID && entry_DID !== ''){
    return true;
  }
  return false
}

//more validity checking should be added...
export function validEntryDID() {
  let entry_DID = localStorage.getItem('entry_DID')
  if(entry_DID && entry_DID !== ''){
    return true;
  }
  return false
}

//A developer is considered logged in if they have a valid entry host and DID
export function isLoggedIn(){
  if(validEntryHost() && validEntryDID()){
    return true;
  }
  return false;
}
