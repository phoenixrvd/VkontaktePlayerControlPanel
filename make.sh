#!/bin/bash


#zip -r test.xpi *

rsync -avrz . ~/.mozilla/firefox/bhyickmc.default/extensions/ffvcontactecontrol@killbar.org
wmctrl -c Firefox
sleep 2
firefox &
