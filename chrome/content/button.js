/* (c) 2009, TaleStudio, Valera Chevtaev, http://chupakabr.ru */
/* © 2012, Avatar Blueray*/


var  vk_player_control = {
	played : false,
	
	idsMap: {
			"play": "ffvcontacte_control-play",
			"prev": "ffvcontacte_control-prev",
			"next": "ffvcontacte_control-next",
			"add": "ffvcontacte_control-add",
			"pause": "ffvcontacte_control-pause",
			"repeat": "ffvcontacte_control-repeat",
			"shuffle": "ffvcontacte_control-shuffle",
			"return": "ffvcontacte_control-return"
	},
	
	init:function(extensions){
		var extension = extensions.get("ffvcontactecontrol@killbar.org");
		if (extension.firstRun)
			vk_player_control.installButton();
	},
	
	onclick:function(event){
		var cName = event.target.className;
		var idName = event.target.id;
		var playId = vk_player_control.idsMap["play"];
		var pauseId = vk_player_control.idsMap["pause"];
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
	
	injectJS: function(eventString){
		var doc = window.content.document;
	    var controlId = "vkControlPanelForFirefox";
	    var control = doc.getElementById(controlId);
	    if(!control){
	        control = doc.createElement("div");
	        control.setAttribute("id", controlId);
	        control.setAttribute("onclick", "javascript:headPlayPause()");
	        doc.body.appendChild(control);
	    }else{
	    	if(eventString == "return"){
	    		var codeString = "audioPlayer.stop();audioPlayer.controls.pd.play.click();";
	    	}else{
		    	var codeString = "audioPlayer.controls.pd."+eventString+".click();";
	    	}
	        control.setAttribute("onclick", "javascript:"+codeString);
	    }
	    control.click();
	},
	
	dispatch:function(eventString){
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
				vk_player_control.injectJS(eventString);
				break;
			}
		}
		tabbrowser.selectedTab = current;
	},

	prev: function () {
		vk_player_control.dispatch("prev");
	},
	
	next: function(){
		vk_player_control.dispatch("next");
	},
	
	add: function(){
		vk_player_control.dispatch("add");
	},
	
	stop: function(){
		vk_player_control.dispatch("stop");
	},
	
	play: function(){
		vk_player_control.dispatch("play");
	},
	
	repeat: function(){
		vk_player_control.dispatch("repeat");
	},
	
	shuffle: function(){
		vk_player_control.dispatch("shuffle");
	},
	
	"return": function() {
		vk_player_control.dispatch("return");
	},
	
	toggle: function() {
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
        var elem = document.getElementById('search-container');
        if (elem && elem.parentNode == toolbar)
            before = elem.previousElementSibling;
	
		//add the button at the end of the navigation toolbar	
		//toolbar.insertItem("ffvcontacte_control-prev", toolbar.lastChild);
		var idsMap = vk_player_control.idsMap;
		for(suffix in idsMap){
			toolbar.insertItem(idsMap[suffix], before);
		}

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
	}
		
}


