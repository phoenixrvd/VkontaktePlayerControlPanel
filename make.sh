#!/bin/bash


zip -r ffvcontactecontrol_$1.xpi * -x .git \*.xpi \*.bat \*.sh \*~

exit;

rsync -avrz . ~/.mozilla/firefox/bhyickmc.default/extensions/ffvcontactecontrol@killbar.org
wmctrl -c Firefox
sleep 2
firefox &
