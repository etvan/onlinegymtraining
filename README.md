ONLINE GYM TRAINING

Docs/Tutorial

1) Install Node.js

Link : https://nodejs.org/

2) Configuration of npm

Create a new folder
Open the cmd and go in your new folder with "cd"
Type "npm init" to init npm
Type "npm install express" to install this package : https://www.npmjs.com/package/express
Type "npm install socket.io@0.9.6" to install this package : https://www.npmjs.com/package/socket.io with the version 0.9.6

3) Run the Server

In your folder, paste webrtc.js, Signaling-Server.js, index.html and static folder
With the cmd(always in your folder), type "node webrtc.js"
Open an other cmd and type "ipconfig", look at the IPv4 Address
In Firefox, use the URL : http://YourIPv4Address:8090
If you want to be the coach, use this URL : http://YourIPv4Address:8090/?coach
8090 is the port

4) Configuration of the server

For use an other port, you just need to change the variable PORTT in webrtc.js

