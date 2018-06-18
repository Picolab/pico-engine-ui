export function getEngineLoc(){
  if(!localStorage.getItem('engine_loc')){
    localStorage.setItem('engine_loc', 'http://localhost:8080')
  }
  return localStorage.getItem('engine_loc')
}
