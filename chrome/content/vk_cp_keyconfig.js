var vk_cp_keyconfig = {

 //List of key bindings
 bindings:null,

 //Start of bindable functions

prev: function(){
	vk_player_control.prev();
},
playPause: function(){
	vk_player_control.toggle();
},
next: function(){
	vk_player_control.next();
},
add: function(){
	vk_player_control.add();
},
repeat: function(){
	vk_player_control.repeat();
},
shuffle: function(){
	vk_player_control.shuffle();
},
"return": function(){
	var f = vk_player_control["return"];
	f();
},

 //End of bindable functions

 /** Load preferences from the Mozilla preference system */
 getPreferences: function() {
  var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                                     .getService(Components.interfaces.nsIPrefService)
                                     .getBranch("extensions.vk_player_control_panel.");
  this.bindings=new Array();
  for (var i=0;i<vk_cp_keyconfig_data.keys.length;i++) {
   var k=vk_cp_keyconfig_data.keys[i];
   try {
    var v=prefService.getCharPref(k+"Key");
    if (v==null) continue;
    if (v=="") continue;
    this.bindings[v]=k;
   } catch (e) {
    //this preference does not exist
   }
  }
 },

 /**
  * Returns true if focus is on an element which takes some sort of input. in
  * that case, we do not want to catch key presses.
  */
 inputFocus: function() {
    var focusedEl = document.commandDispatcher.focusedElement;

    // check if focused element takes input
    if (focusedEl) {
      var focusedElLn = focusedEl.localName.toLowerCase();
      if (focusedElLn === "input"
      ||  focusedElLn === "textarea"
      ||  focusedElLn === "select"
      ||  focusedElLn === "button"
      ||  focusedElLn === "isindex") {
        return true;
      } else if (focusedElLn === "div") { // XXX edge-case for the wall input field at facebook
          if (focusedEl.attributes.getNamedItem("contenteditable").nodeValue === "true") {
              return true;
          }
      }
    }

    // check if focused element has designMode="on"
    var focusedWin = document.commandDispatcher.focusedWindow;
    if (focusedWin) {
      if(focusedWin.document.designMode === "on") {
        return true;
      }
    }

    // if we got this far, we should be able to catch key presses without
    // messing up something else; return false
    return false;
  },

  /**
   * Stop an Event from being propagated further. Called when an Event has been
   * handled.
   */
  stopEvent: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  },

  /** Translates keycode to key name */
  tr: function(key) {
   switch(key) {
    case 8:return 'Backspace';
    case 9:return 'Tab';
    case 13:return 'Enter';
    case 19:return 'Pause';
    case 20:return 'CapsLock';
    case 27:return 'Esc';
    case 33:return 'PageUp';
    case 34:return 'PageDown';
    case 35:return 'End';
    case 36:return 'Home';
    case 37:return 'Left';
    case 38:return 'Up';
    case 39:return 'Right';
    case 40:return 'Down';
    case 42:return 'PrintScreen';
    case 45:return 'Insert';
    case 46:return 'Delete';
    case 112:return 'F1';
    case 113:return 'F2';
    case 114:return 'F3';
    case 115:return 'F4';
    case 116:return 'F5';
    case 117:return 'F6';
    case 118:return 'F7';
    case 119:return 'F8';
    case 120:return 'F9';
    case 121:return 'F10';
    case 122:return 'F11';
    case 123:return 'F12';
    case 144:return 'NumLock';
    case 145:return 'ScrollLock';
   }
//   alert("Unknown keycode:"+key);
   return "#"+key;
  },

  /** Handles KeyboardEvents. */
  onKeyPress: function(evt) {

    //vk_cp_keyconfig.getPreferences();
    // if an input element has focus, we want to let the user input text into
    // the element, thus we return before the event is handled.
    //if (vk_cp_keyconfig.inputFocus()) return;

    var key=evt.which;
    var mod="";
    if (evt.ctrlKey) mod+="Ctrl+";
    if (evt.altKey) mod+="Alt+";
    if (evt.shiftKey) mod+="Shift+";
    if (evt.metaKey) mod+="Meta+";
    if (evt.keyCode) {
     key=mod+vk_cp_keyconfig.tr(evt.keyCode);
    } else {
     if (key==32) key="Space";
     else key=String.fromCharCode(key);
     if (key.length==1) key=key.toLowerCase();
     key=mod+key;
    }
    var kb=vk_cp_keyconfig.bindings[key];
    if (kb==undefined) return;
    if (!kb) return;
    vk_cp_keyconfig[kb]();
    vk_cp_keyconfig.stopEvent(evt);
  },

  startup: function() {
    this.getPreferences();
    window.addEventListener("keypress", this.onKeyPress, false);
  }

};

