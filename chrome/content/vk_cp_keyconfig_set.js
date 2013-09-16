var vk_cp_keyconfig_options = {

 oldkey:null,

 set_bindings:null,

 /** Read key from preferences */
 getini: function(key) {
  var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                                     .getService(Components.interfaces.nsIPrefService)
                                     .getBranch("extensions.vk_player_control_panel.");
  try {
   return prefService.getCharPref(key+"Key");
  } catch (e) {
   return "";
  }
 },

 /** Store key into preferences */
 setini: function(key,value) {
  var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                                     .getService(Components.interfaces.nsIPrefService)
                                     .getBranch("extensions.vk_player_control_panel.");
  return prefService.setCharPref(key+"Key",value);
 },

 /** Store currently edited keyboard shortcut when focus is moved away and on saving */
 store_old: function() {
  if (oldkey==null) return;
  var key=document.getElementById('key').value;
  if (key.length==1) key=key.toLowerCase();
  var mod="";
  if (document.getElementById('ctrl').checked) mod+="Ctrl+";
  if (document.getElementById('alt').checked) mod+="Alt+";
  if (document.getElementById('shift').checked) mod+="Shift+";
  if (document.getElementById('meta').checked) mod+="Meta+";
  if (key!="") key=mod+key;
  var ikey=vk_cp_keyconfig_data.keys[oldkey];
  this.set_bindings[ikey]=key;
 },

 /** Return current value of keyboard shortcut (the once currently edited in dialog) */
 curvalue: function(key) {
  var w=this.set_bindings[key];
  if (w!=undefined && w!=null) return w;
  return vk_cp_keyconfig_options.getini(key);
 },

 /** Called on changing selection in treeview */
 select: function(tr) {
  var i=tr.currentIndex;
  vk_cp_keyconfig_options.store_old();
  var k=vk_cp_keyconfig_data.keys[i];
  var v=vk_cp_keyconfig_options.curvalue(k);
  var key=document.getElementById('key');
  var ctrl=document.getElementById('ctrl');
  var alt=document.getElementById('alt');
  var shift=document.getElementById('shift');
  var meta=document.getElementById('meta');
  if (v.match("^Ctrl\\+"))  {v=v.substring(5);ctrl.checked=true;} else {ctrl.checked=false;}
  if (v.match("^Alt\\+"))   {v=v.substring(4);alt.checked=true;} else {alt.checked=false;}
  if (v.match("^Shift\\+")) {v=v.substring(6);shift.checked=true;} else {shift.checked=false;}
  if (v.match("^Meta\\+"))  {v=v.substring(5);meta.checked=true;} else {meta.checked=false;}
  key.value=v;
  oldkey=i;
 },

 /** Get localized name of action */
 actionName : function(ac) {
  var prop=document.getElementById("keyconfig-string-bundle");
  try {
   var s=prop.getString("keyconfig_"+ac);
   if (s==null || s==undefined || s=="") return ac;
  } catch (e) {
   return ac;
  }
  return s;
 },

 /** Treeview model */
 treeView : {
  rowCount : vk_cp_keyconfig_data.keys.length,
  getCellText : function(row,column){
   var k=vk_cp_keyconfig_data.keys[row]
    if (column.id=="action") return vk_cp_keyconfig_options.actionName(k);
    var v=vk_cp_keyconfig_options.curvalue(k);
    return v;
  },
  setTree: function(treebox){ this.treebox = treebox; },
  isContainer: function(row){ return false; },
  isSeparator: function(row){ return false; },
  isSorted: function(){ return false; },
  getLevel: function(row){ return 0; },
  getImageSrc: function(row,col){ return null; },
  getRowProperties: function(row){ return ""; },
  getCellProperties: function(row,col){ return ""; },
  getColumnProperties: function(colid,col){ return ""; }
 },

 /** Initializes the options */
 initialize: function() {
  oldkey=null;
  this.set_bindings=new Array();
  document.getElementById('keylist').view = vk_cp_keyconfig_options.treeView;
 },

 /** Uninitializes the options */
 uninitialize: function() {
 },

 /** Saves the options from dialog */
 saveOptions: function() {

  vk_cp_keyconfig_options.store_old();
  for (var i=0;i<vk_cp_keyconfig_data.keys.length;i++) {
   var k=vk_cp_keyconfig_data.keys[i];
   var v=this.set_bindings[k];
   if (v==null) continue;
   try {
    vk_cp_keyconfig_options.setini(k,v);
   } catch (e) {
    alert("Exception when saving options:"+e);
   }
  }
			 
  return true;
 }


};
