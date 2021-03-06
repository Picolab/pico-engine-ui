import axios from 'axios';
import { UIRulesetUrl } from '../config';

export function sky_cloud(host, eci){ return `${host}/sky/cloud/${eci}`};
export function sky_event(host, eci) { return `${host}/sky/event/${eci}`};


function encodeQueryData(data) {
  let ret = [];
  for (let d in data){
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }
  return ret.join('&');
}

export function signalEvent(DID, host, domain, type, attributes, eid){
  eid = eid ? eid : "signaledEvent";
  const attrs = encodeQueryData(attributes);
  return axios.post(`${sky_event(host, DID)}/${eid}/${domain}/${type}?${attrs}`);
}

export function query(DID, host, ruleset, funcName, params){
  const parameters = encodeQueryData(params);
  return axios.get(`${sky_cloud(host, DID)}/${ruleset}/${funcName}/${parameters}`);
}

export function installUIRuleset(DID, host) {
  return signalEvent(DID, host, "wrangler", "install_rulesets_requested", { url: UIRulesetUrl });
}

export function getSettings(DID, host) {
  return query(DID, host, "io.picolabs.ui", "saved_settings", {});
}

export function newSettingsEntry(entryDID, entryHost, picoID, picoDID, picoHost) {
  return signalEvent(entryDID, entryHost, "picolabs_ui", "new_settings_entry", { picoID, host: picoHost, DID: picoDID });
}


export function updateSettingsPosition(entryDID, entryHost, picoID, x, y) {//this function will update the pico's position
  return signalEvent(entryDID, entryHost, "picolabs_ui", "update_settings_position", { picoID, x, y });
}

export function updateSettingsCollapsed(entryDID, entryHost, picoID, collapsed) {
  return signalEvent(entryDID, entryHost, "picolabs_ui", "update_settings_collapsed", { picoID, collapsed });
}

export function updateSettingsTab(entryDID, entryHost, picoID, tab) {
  return signalEvent(entryDID, entryHost, "picolabs_ui", "update_settings_tab", { picoID, tab });
}

export function removeSettingsEntry(entryDID, entryHost, picoID) {
  return signalEvent(entryDID, entryHost, "picolabs_ui", "removed_settings_entry", { picoID });
}

export function getPicoName(DID, host) {
  return query(DID, host, "io.picolabs.wrangler", "name", {});
}

export function getPicoId(DID, host) {
  return query(DID, host, "io.picolabs.wrangler", "id", {});
}

export function getChildren(DID, host) {
  return query(DID, host, "io.picolabs.wrangler", "children", {});
}

export function getSubs(DID, host) {
  return query(DID, host, "io.picolabs.subscription", "established", {});
}
