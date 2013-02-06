/* (c) 2009, TaleStudio, Valera Chevtaev, http://chupakabr.ru */
/* © 2012, Avatar Blueray*/


var  vk_player_control = {
	played : false,
	bigIcon: false,
	
	createIdBySize: function(idSuffix){
		var ids = {
			"play": "ffvcontacte_control-play",
			"prev": "ffvcontacte_control-prev",
			"next": "ffvcontacte_control-next",
			"add": "ffvcontacte_control-add",
			"pause": "ffvcontacte_control-pause"
		};
		
	  	var prefService = Components.classes["@mozilla.org/preferences-service;1"]
		                                     .getService(Components.interfaces.nsIPrefService)
		                                     .getBranch("extensions.vk_player_control_panel.");
								 
	  	var bigicon = vk_player_control.bigIcon;
		var sizeSuffix = "";
		if(vk_player_control.bigIcon){
			sizeSuffix = "_s";
		};
		
		var id = ids[idSuffix]+sizeSuffix;
		return id;
	},
	
	init:function(extensions){
		var extension = extensions.get("ffvcontactecontrol@killbar.org");
 
		if (extension.firstRun)
			vk_player_control.installButton();
			
	  	var prefService = Components.classes["@mozilla.org/preferences-service;1"]
		                                     .getService(Components.interfaces.nsIPrefService)
		                                     .getBranch("extensions.vk_player_control_panel.");
		vk_player_control.bigIcon = prefService.getBoolPref("big_size");


		if (vk_player_control.bigIcon){
	
			var button = document.getElementById('ffvcontacte_control-play');
				if ( button != null)button.setAttribute ("id", "ffvcontacte_control-play_s");
			var button = document.getElementById('ffvcontacte_control-prev');
				if ( button != null)button.setAttribute ("id", "ffvcontacte_control-prev_s");
			var button = document.getElementById('ffvcontacte_control-next');
				if ( button != null)button.setAttribute ("id", "ffvcontacte_control-next_s");
			var button = document.getElementById('ffvcontacte_control-add');
				if ( button != null)button.setAttribute ("id", "ffvcontacte_control-add_s");
			var button = document.getElementById('ffvcontacte_control-pause');
				if ( button != null)button.setAttribute ("id", "ffvcontacte_control-pause_s");	
		}else{
	
			var button = document.getElementById('ffvcontacte_control-play_s');
				if ( button != null)button.setAttribute ("id", "ffvcontacte_control-play");
			var button = document.getElementById('ffvcontacte_control-prev_s');
				if ( button != null)button.setAttribute ("id", "ffvcontacte_control-prev");
			var button = document.getElementById('ffvcontacte_control-next_s');
				if ( button != null)button.setAttribute ("id", "ffvcontacte_control-next");
			var button = document.getElementById('ffvcontacte_control-add_s');
				if ( button != null)button.setAttribute ("id", "ffvcontacte_control-add");
			var button = document.getElementById('ffvcontacte_control-pause_s');
				if ( button != null)button.setAttribute ("id", "ffvcontacte_control-pause");	
		};
	
	},
	
	onclick:function(event){

		var cName = event.target.className;
		var idName = event.target.id;

		
		var playId = vk_player_control.createIdBySize("play");
		var pauseId = vk_player_control.createIdBySize("pause");
		var button = document.getElementById(playId);

		if ( button == null ) {
			button = document.getElementById(pauseId);
		};

		// Playliste or new VK-Buttons clicked
		if (cName.match(/play_new/) || idName.match(/_pause|_play/)) {
			if (!vk_player_control.played) {
				vk_player_control.played = true;
				button.setAttribute ("id", pauseId);
			} else if(!cName.match(/playing/)){
				vk_player_control.played = false;
				button.setAttribute ("id", playId);
			}
		};
		
		
		if (
			(cName.match(/prev|next/) && cName.match(/ctrl/)) // Not a vk_player_control-Buttons
			 || cName.match(/_prev|_next/) // Neue VK-Buttons
			) {
				vk_player_control.played = true;
				button.setAttribute ("id", pauseId);
		};

	},
	
	dispatch:function(classname){
	
		var tabbrowser = gBrowser;
		var current = gBrowser.selectedTab;

		// Check each tab of this browser instance
		var numTabs = tabbrowser.browsers.length;

		for (var index = 0; index < numTabs; index++) {
		
			var currentBrowser = tabbrowser.getBrowserAtIndex(index);
			var s = currentBrowser.currentURI.spec;
			var patt=/vk\.com|vkontakte\.ru/g;

			if (patt.test(s)) {

			// The URL is already opened. Select this tab.
				tabbrowser.selectedTab = tabbrowser.tabContainer.childNodes[index];
		
				var elem = window.content.document.getElementById(classname);
				
				if ( elem ) {
					elem.click();
					break;
				}
			}
		}
			tabbrowser.selectedTab = current;
	

	},

	prev:function () {
		vk_player_control.dispatch("ac_prev");
	},
	
	next :function(){
		vk_player_control.dispatch("ac_next");
	},
	
	add :function(){
		vk_player_control.dispatch("ac_add");
	},
	
	stop:function(){
		vk_player_control.dispatch("ac_play");
	},
	
	play:function(){
		vk_player_control.dispatch("ac_play");
	},
	
	toggle : function() {
		vk_player_control.play();
	},
	test:function(){
		var toolbarId = "nav-bar";
		var toolbar = document.getElementById(toolbarId);
		var child = toolbar.firstChild;
					while (child) {
						alert(child.id);
						child = child.nextSibling;
					}
		
	},
	
	
	installButton:function (){
	
		var toolbarId = "nav-bar";
	
		var toolbar = document.getElementById(toolbarId);
		
		var before = toolbar.lastChild;
        
            let elem = document.getElementById('search-container');
            if (elem && elem.parentNode == toolbar)
                before = elem.previousElementSibling;
       
	
		//add the button at the end of the navigation toolbar	
		//toolbar.insertItem("ffvcontacte_control-prev", toolbar.lastChild);
		toolbar.insertItem("ffvcontacte_control-prev", before);
		toolbar.insertItem("ffvcontacte_control-play", before);
		toolbar.insertItem("ffvcontacte_control-next", before);
		toolbar.insertItem("ffvcontacte_control-add", before);
	
		toolbar.setAttribute("currentset", toolbar.currentSet);
		document.persist(toolbar.id, "currentset");
	
		//if the navigation toolbar is hidden, 
		//show it, so the user can see your button
		toolbar.collapsed = false;
	},

  /** Invoke option dialog */
  keyset: function(evt) {
   window.openDialog("chrome://vk_player_control_panel/content/options.xul", "keyconfig-options-dialog", "centerscreen,chrome,modal,resizable");
   
   vk_cp_keyconfig.getPreferences();
   
  var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                                     .getService(Components.interfaces.nsIPrefService)
                                     .getBranch("extensions.vk_player_control_panel.");
						 
  var bigicon = prefService.getBoolPref("big_size");



	if (bigicon){

		var button = document.getElementById('ffvcontacte_control-play');
			if ( button != null) button.setAttribute ("id", "ffvcontacte_control-play_s");
		var button = document.getElementById('ffvcontacte_control-prev');
			if ( button != null) button.setAttribute ("id", "ffvcontacte_control-prev_s");
		var button = document.getElementById('ffvcontacte_control-next');
			if ( button != null) button.setAttribute ("id", "ffvcontacte_control-next_s");
		var button = document.getElementById('ffvcontacte_control-add');
			if ( button != null) button.setAttribute ("id", "ffvcontacte_control-add_s");
		var button = document.getElementById('ffvcontacte_control-pause');
			if ( button != null) button.setAttribute ("id", "ffvcontacte_control-pause_s");			
	}else{

		var button = document.getElementById('ffvcontacte_control-play_s');
		    if ( button != null) button.setAttribute ("id", "ffvcontacte_control-play");
		var button = document.getElementById('ffvcontacte_control-prev_s');
			if ( button != null) button.setAttribute ("id", "ffvcontacte_control-prev");
		var button = document.getElementById('ffvcontacte_control-next_s');
			if ( button != null) button.setAttribute ("id", "ffvcontacte_control-next");
		var button = document.getElementById('ffvcontacte_control-add_s');
			if ( button != null) button.setAttribute ("id", "ffvcontacte_control-add");
		var button = document.getElementById('ffvcontacte_control-pause_s');
			if ( button != null) button.setAttribute ("id", "ffvcontacte_control-pause");		
	};
	
	
  }
		
}


