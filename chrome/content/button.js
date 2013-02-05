/* (c) 2009, TaleStudio, Valera Chevtaev, http://chupakabr.ru */
/* © 2012, Avatar Blueray*/


var  vk_player_control = {
	played : false,
	
	createIdBySize: function(idSuffix, size){
		var ids = {
			
		};
		
		var sizeDuffix = ()
		return ids
	},
	
	init:function(extensions){
		var extension = extensions.get("ffvcontactecontrol@killbar.org");
 
		if (extension.firstRun)
			vk_player_control.installButton();
			
  var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                                     .getService(Components.interfaces.nsIPrefService)
                                     .getBranch("extensions.vk_player_control_panel.");
						 
  var bigicon = prefService.getBoolPref("big_size");


	if (bigicon){

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
		var id='';
		var size = '';

Firebug.Console.log(prefService.getBoolPref("big_size"));
Firebug.Console.log(cName)
		
		var button = document.getElementById('ffvcontacte_control-play');
		id = 'ffvcontacte_control-play';
		size  = 'big';
		
		if ( button == null ) {
			var button = document.getElementById('ffvcontacte_control-play_s');
			id = 'ffvcontacte_control-play_s';
			size = 'small';
		}

		if ( button == null ) {
			var button = document.getElementById('ffvcontacte_control-pause_s');
			id = 'ffvcontacte_control-pause_s';
			size = 'small';
		}

		if ( button == null ) {
			var button = document.getElementById('ffvcontacte_control-pause');
			id = 'ffvcontacte_control-pause';
			size ='big';
		}

		if (cName.match('playing')) {
		//
					if (!vk_player_control.played) {
						vk_player_control.played = true;
						if ( size == 'big') {
							button.setAttribute ("id",'ffvcontacte_control-pause');
						}else{
							button.setAttribute ("id",'ffvcontacte_control-pause_s');
						}
					} else {
						vk_player_control.played = false;
						if ( size == 'big') {
							button.setAttribute ("id",'ffvcontacte_control-play');
						}else{
							button.setAttribute ("id",'ffvcontacte_control-play_s');
						}
					}
		}else if(){
			
		};
		if (cName == "prev") {
		
			vk_player_control.played = true;
			if ( size == 'big') {
				button.setAttribute ("id",'ffvcontacte_control-pause');
			}else{
				button.setAttribute ("id",'ffvcontacte_control-pause_s');
			}
		};
		if (cName == "next") {
		
			vk_player_control.played = true;
			if ( size == 'big') {
				button.setAttribute ("id",'ffvcontacte_control-pause');
			}else{
				button.setAttribute ("id",'ffvcontacte_control-pause_s');
			}
		};
		
		var cId  = event.target.getAttribute("id");
		
		
		if (cId == "ffvcontacte_control-prev") {
			vk_player_control.played = true;
			if ( size == 'big') {
				button.setAttribute ("id",'ffvcontacte_control-pause');
			}else{
				button.setAttribute ("id",'ffvcontacte_control-pause_s');
			}
		};		
		
		if (cId == "ffvcontacte_control-next") {
		
			vk_player_control.played = true;
			if ( size == 'big') {
				button.setAttribute ("id",'ffvcontacte_control-pause');
			}else{
				button.setAttribute ("id",'ffvcontacte_control-pause_s');
			}
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


