if (Application.extensions)
    vk_player_control.init(Application.extensions);
else
    Application.getExtensions(vk_player_control.init);

	window.addEventListener("click", function(e){vk_player_control.onclick(e);}, false);