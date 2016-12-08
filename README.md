## ONLINE GYM TRAINING

# Tutorial

# Install Node.js

1. Link : https://nodejs.org/

# Configuration of npm

1. Create a new folder
2. Open the cmd and go in your new folder with "cd"
3. Type "npm init" to init npm
4. Type "npm install express" to install this package : https://www.npmjs.com/package/express
5. Type "npm install socket.io@0.9.6" to install this package : https://www.npmjs.com/package/socket.io with the version 0.9.6

# Run the server

1. In your folder, paste webrtc.js, Signaling-Server.js, index.html and static folder
2. With the cmd(always in your folder), type "node webrtc.js"
3. Open an other cmd and type "ipconfig", look at the IPv4 Address
4. In Firefox, use the URL : http://YourIPv4Address:8090
5. If you want to be the coach, use this URL : http://YourIPv4Address:8090/?coach
6. 8090 is the port

# Configuration of the server

1. For use an other port, you just need to change the variable PORTT in webrtc.js
2. MP3 index.html : For use the mp3, add each musics between the &#60;select&#62;&#60;/select&#62; and the value of each music must be his name in the folder and in &#60;source&#62; you must change "src" by the link of one of your music
3. MP3 code.js : For use the mp3, change the link of the folder by yours at the lines 384, 401 and 407

