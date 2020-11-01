FileReadLine, topX, config.txt, 1
FileReadLine, topY, config.txt, 2
FileReadLine, ruta, config.txt, 3
FileReadLine, user, config.txt, 4
FileReadLine, pass, config.txt, 5
FileReadLine, Champ, config.txt, 6
Run, %ruta%
Process, Wait, RiotClientUx.exe
sleep 1000
IfWinActive, Riot Client
{
	sleep 1000
		send, %user%
		Send, `t
		send, %pass%
		send, {Enter}
}
a := 0
While(a == 0){
	IfWinActive, League of Legends
	{
		a := 1
	}
}
sleep 10000
Click, 209, 26
sleep 2000
while(jugarcolor != 0xD2E6F0){
	PixelGetColor, jugarcolor, 100, 33
}
sleep 5000
Click, 100, 33
sleep 1000
Click, 598, 448
sleep 1500
MouseMove 213, 79
while(jugarcolor != 0x2A96CA){
	PixelGetColor, jugarcolor, 260, 80
}
Click, 213, 79
sleep 1000
MouseMove, 497, 171
while(jugarcolor != 0x88C1DC){
	PixelGetColor, jugarcolor, 474, 174
}
Click, 497, 171
sleep 1000
MouseMove, 391, 550
while(jugarcolor != 0x3CA0CD){
	PixelGetColor, jugarcolor, 425, 549
}
Click, 391, 550
while(jugarcolor != 0xD2E6F0){
	PixelGetColor, jugarcolor, 425, 549
}
Click, 391, 550
sleep 10000
Click, 633, 81
send, %champ%
sleep 1000
click, 307, 128
sleep 1000
click, 515, 484