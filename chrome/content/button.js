/* (c) 2009, TaleStudio, Valera Chevtaev, http://chupakabr.ru */
/* © 2012, Avatar Blueray*/


var  vk_player_control = {
	
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
		var patt=/vk\.com|vkontakte\.ru/g;
		var doc = event.view.document;
		if (doc.location.href.match(patt)){
			vk_player_control.setActiveTab();
		};
	},
	
	injectJS: function(eventString, doc){
	    var controlId = "vkControlPanelForFirefox";
	    var control = doc.getElementById(controlId);
	    if(!control){
	        control = doc.createElement("div");
	        control.setAttribute("id", controlId);
	        doc.getElementById('head_play_btn').click();
	        doc.body.appendChild(control);
	    }else if(eventString == "toggle"){
	    	doc.getElementById('head_play_btn').click();
	    }else{
	    	var codeString = eventString;
	        control.setAttribute("onclick", "javascript:if(audioPlayer){"+codeString+"}");
		    control.click();
	    }
	},
	
	checkPlayButton: function(doc){
		var rtr = false;
		var controlId = "head_play_btn";
		var control = doc.getElementById(controlId);
		if(control && control.getAttribute('class') && control.getAttribute('class').match(/playing/)){
			rtr = true;
		}
		return rtr;
	},
	
	activeTab: null, //Aktuelle Tab, in welchem vkPlayer läuft,
	setActiveTab: function(){
		var patt=/vk\.com|vkontakte\.ru/g;
		var tabbrowser = gBrowser;
		var current = gBrowser.selectedTab;
		var pauseGefunden = false;
		var doc = window.content.document;
		if(doc.location.href.match(patt) && !vk_player_control.vk_player_control){
			if(vk_player_control.checkPlayButton(doc)){
				vk_player_control.activeTab = current;
			}
		}else if(!vk_player_control.activeTab){
			var numTabs = tabbrowser.browsers.length;
			var firstTab = null;
			for (var index = 0; index < numTabs; index++) {
				var currentBrowser = tabbrowser.getBrowserAtIndex(index);
				var s = currentBrowser.currentURI.spec;
				if(s.match(patt)){
					tabbrowser.selectedTab = tabbrowser.tabContainer.childNodes[index];
					doc = window.content.document;
					if(!firstTab){
						firstTab = tabbrowser.selectedTab;
					}
					if(vk_player_control.checkPlayButton(doc)){
						vk_player_control.activeTab = tabbrowser.selectedTab;
						break;
					}
				};
			};
			if(!vk_player_control.activeTab && firstTab){
				vk_player_control.activeTab = firstTab;
			}
		};
		
		var timeout = setTimeout(initPlayButton, 300);
		function initPlayButton(){
			tabbrowser.selectedTab = vk_player_control.activeTab;
			doc = window.content.document;
			var playId = vk_player_control.idsMap["play"];
			var pauseId = vk_player_control.idsMap["pause"];
			var button = document.getElementById(playId);
			if ( button == null ) {
				button = document.getElementById(pauseId);
			};
			var playHead = doc.getElementById("head_play_btn");
			if(vk_player_control.checkPlayButton(doc) && button){
				button.setAttribute ("id", pauseId);
			}else if(button){
				button.setAttribute ("id", playId);
			}
			tabbrowser.selectedTab = current;
		}
		tabbrowser.selectedTab = current;
	},
	
	dispatch: function(eventString){
		if(!vk_player_control.activeTab){
			vk_player_control.setActiveTab();
		}
		var tabbrowser = gBrowser;
		var current = gBrowser.selectedTab;
		tabbrowser.selectedTab = vk_player_control.activeTab;
		var doc = window.content.document;
		vk_player_control.injectJS(eventString, doc);
		tabbrowser.selectedTab = current;
		vk_player_control.setActiveTab();
	},
	
	/**
	vkPlayerEventMap: {
		"audioPlayer.pauseTrack()": "foo"
	},
	*/
	
	prev: function () {
		vk_player_control.dispatch("audioPlayer.prevTrack()");
	},
	
	next: function(){
		vk_player_control.dispatch("audioPlayer.nextTrack()");
	},
	
	add: function(){
		vk_player_control.dispatch("audioPlayer.addCurrentTrack()");
	},
	
	stop: function(){
		vk_player_control.dispatch("audioPlayer.stop()");
	},
	
	play: function(){
		vk_player_control.dispatch("audioPlayer.playTrack()");
	},
	
	repeat: function(){
		vk_player_control.dispatch("audioPlayer.toggleRepeat()");
	},
	
	shuffle: function(){
		vk_player_control.dispatch("audioPlayer.shuffleAudios()");
	},
	
	"return": function() {
		vk_player_control.dispatch("audioPlayer.prevTrack();audioPlayer.nextTrack()");
	},
	
	toggle: function() {
		vk_player_control.dispatch("toggle");
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


