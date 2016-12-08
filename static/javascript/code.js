            $('#room').hide();
            $('#slider').hide();
            $('#range').hide();
            $('#callfromclient').hide();
            $('#refresh').hide();
            $('#music').hide();
            $('#listmusics').hide();
            var connection = new RTCMultiConnection();
            connection.socketURL = '/';
            connection.socketMessageEvent = 'video-conference-demo';
            connection.session = {
                audio: true,
                video: { 
                    frameRate: {
                        min: 5,
                        ideal: 25, 
                        max: 30 
                    }
                },
                data: true
            };
            connection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            };
            connection.videosContainer = document.getElementById('videos-container');

            var userstream=[];
            var username=[];
            var coachbool;
            var width;

            document.getElementById('refresh').onclick = function() {
                window.location.reload();
            }

            function refresh() {
                window.location.reload();
            }

            var musicnow =  $("#listmusics").val();

            var CheminComplet = window.location.href;
            if ((CheminComplet.substring(CheminComplet.lastIndexOf( "?coach&" )+1) !== window.location.href)) {
                    document.getElementById('refresh').onclick = function() {
                        refreshclients();
                        refresh();
                    }
                    document.getElementById('musicon').onclick = function() {
                        onmusic();
                    }
                    document.getElementById('musicoff').onclick = function() {
                        offmusic();
                    }
                    document.getElementById('refresh').innerHTML = "Refresh";
                    document.getElementById('music').innerHTML = "Music ";
                    $('#listmusics').show();
                    $('#music').show();
                    $('#navtohide').hide();
                    $('#sectionname').hide();
                    $('#room').show();
                    $('#roomtohide').hide();
                    $('#divstart').hide();
                    connection.openOrJoin("1", function(isRoomExists, roomid) {
                        if(!isRoomExists) {
                            showRoomURL(roomid);
                        }
                    });
                        connection.extra = [(CheminComplet.substring(CheminComplet.lastIndexOf( "&" )+1)),1];
                        coachbool = true;
                        width = parseInt(connection.videosContainer.clientWidth / 2);
                        $('#refresh').show();
                        document.getElementById('titleclic').onclick = function() {
                            window.location.href = '?coach';
                        }
            } else if ((CheminComplet.substring(CheminComplet.lastIndexOf( "?&" )+1) !== window.location.href)){
                document.getElementById('refresh').onclick = function() {
                    refresh();
                }
                document.getElementById('refresh').innerHTML = "Refresh";
                $('#navtohide').hide();
                $('#sectionname').hide();
                    $('#room').show();
                    $('#roomtohide').hide();
                    $('#divstart').hide();
                    connection.openOrJoin("1", function(isRoomExists, roomid) {
                        if(!isRoomExists) {
                            showRoomURL(roomid);
                        }
                    });
                    $('#sectionname').hide();
                    $('#refresh').show();
                    connection.extra = [(CheminComplet.substring(CheminComplet.lastIndexOf( "&" )+1)),0];
                        coachbool = false;
                        width = parseInt(connection.videosContainer.clientWidth) - 20;
                        document.getElementById('titleclic').onclick = function() {
                            window.location.href = '?';
                        }
            } else {

            document.getElementById('signin').onclick = function() {
                if (document.getElementById('nameuser').value === "") {
                    alert("Please enter your name !");
                } else {
                    $('#room').show();
                    $('#roomtohide').hide();
                    $('#divstart').hide();
                    connection.openOrJoin("1", function(isRoomExists, roomid) {
                    if(!isRoomExists) {
                        showRoomURL(roomid);
                    }
                });
                    $('#sectionname').hide();
                    var coach = CheminComplet.substring(CheminComplet.lastIndexOf( "?" )+1 );
                    if (coach === "coach") {
                        connection.extra = [(document.getElementById('nameuser').value),1];
                        coachbool = true;
                        width = parseInt(connection.videosContainer.clientWidth / 2);
                        window.location.href = "?coach&"+document.getElementById('nameuser').value;
                        $('#slider').show();
                        $('#range').show();
                        $('#refresh').show();
                    } else {
                        connection.extra = [(document.getElementById('nameuser').value),0];
                        coachbool = false;
                        width = parseInt(connection.videosContainer.clientWidth) - 20;
                        window.location.href = "?&"+document.getElementById('nameuser').value;
                        $('#refresh').show();
                    }
                }
            };
        }
            var useron = false;
            var ouruserid;
            var useridcall;

            connection.onstream = function(event) {
                if (useron === false) {
                    ouruserid = event.userid;
                    useron=true;
                    console.log('Your userid : '+ouruserid);
                }
                username.push([event.userid,event.extra]);
                console.log(event.extra);
                var mediaElement = getMediaElement(event.mediaElement, {
                    title: event.userid,
                    buttons: ['full-screen'],
                    width: width,
                    showOnMouseEnter: false
                });
                mediaElement.className = 'classmedia col-sm-4 col-md-6';
                //
                var coachalert = document.createElement("DIV");
                coachalert.id = 'alertcoach';
                //
                var center = document.createElement("CENTER");
                var gras = document.createElement("B");
                var text;
                    if (event.extra[1] === 1) {
                        text = 'Coach : ';
                    } else {
                        text = 'Client : ';
                    }
                var txt = document.createTextNode(text+event.extra[0]);
                gras.appendChild(txt);
                if (coachbool === true) {
                //CALL
                var textcall = document.createTextNode('Call');
                var button = document.createElement("BUTTON");
                button.setAttribute("type", "button");
                button.setAttribute("value", "Call");
                button.setAttribute('onclick','call("'+event.userid+'")');
                button.className = 'allcall btn btn-success btn-block';
                button.appendChild(textcall);
                //HANG UP
                var textbuttonall = document.createTextNode('Hang Up');
                var buttonall = document.createElement("BUTTON");
                buttonall.setAttribute("type", "button");
                buttonall.className = 'btn btn-danger btn-block';
                buttonall.setAttribute("value", "Hang Up");
                buttonall.setAttribute('onclick','hangup("'+event.userid+'")');
                buttonall.setAttribute('id',''+event.userid+'');
                buttonall.appendChild(textbuttonall);
                //STOP
                var textstop = document.createTextNode('Stop');
                var stop = document.createElement("BUTTON");
                stop.className = 'btn btn-warning btn-block';
                stop.setAttribute("type", "button");
                stop.setAttribute("value", "Stop");
                stop.setAttribute('onclick','stopsport("'+event.userid+'")');
                stop.appendChild(textstop);
                //FAST
                var textfast = document.createTextNode('Fast');
                var fast = document.createElement("BUTTON");
                fast.className = 'btn btn-info btn-block';
                fast.setAttribute("type", "button");
                fast.setAttribute("value", "Fast");
                fast.setAttribute('onclick','fastsport("'+event.userid+'")');
                fast.appendChild(textfast);
                //CHECKBOX 1
                var l1 = document.createElement("LABEL");
                l1.className = 'checkbox';
                var vid = document.createTextNode('Video');
                var c1 = document.createElement("INPUT");
                c1.setAttribute("type", "checkbox");
                c1.setAttribute('id',''+event.userid+event.userid+'');
                l1.appendChild(c1);
                l1.appendChild(vid);
                //CHECKBOX 2
                var l2 = document.createElement("LABEL");
                l2.className = 'checkbox';
                var aud = document.createTextNode('Audio');
                var c2 = document.createElement("INPUT");
                c2.setAttribute("type", "checkbox");
                c2.setAttribute('id',''+event.userid+event.userid+event.userid+'');
                l2.appendChild(c2);
                l2.appendChild(aud);
                //ROW1
                var r1 = document.createElement("DIV");
                r1.className='row';
                var col1 = document.createElement("DIV");
                col1.className='col-md-4';
                col1.appendChild(l1);
                var col2 = document.createElement("DIV");
                col2.className='col-md-4';
                col2.appendChild(l2);
                var col3 = document.createElement("DIV");
                col3.className='col-md-4';
                col3.appendChild(button);
                col3.appendChild(buttonall);
                r1.appendChild(col1);
                r1.appendChild(col2);
                r1.appendChild(col3);
                //ROW2
                var r2 = document.createElement("DIV");
                r2.className='row';
                var col4 = document.createElement("DIV");
                col4.className = 'col-md-6';
                col4.appendChild(stop);
                var col5 = document.createElement("DIV");
                col5.className = 'col-md-6';
                col5.appendChild(fast);
                r2.appendChild(col4);
                r2.appendChild(col5);
                //APPEND
                center.appendChild(gras);
                center.appendChild(r1);
                center.appendChild(r2);
                mediaElement.appendChild(center);
                connection.videosContainer.appendChild(mediaElement);
                //
                if (username.length === 0 || username.length === 1) {
                    $('.classmedia').width(parseInt(connection.videosContainer.clientWidth));
                } else if (username.length === 2 || username.length === 4) {
                    $('.classmedia').width(parseInt(connection.videosContainer.clientWidth / 2)-50);
                } else {
                    $('.classmedia').width(parseInt(connection.videosContainer.clientWidth / 3)-50);
                }
                //
                } else {
                    if (event.extra[1] === 1) {
                    var textcall = document.createTextNode('Call');
                    var button = document.createElement("BUTTON");
                    button.setAttribute("type", "button");
                    button.setAttribute("value", "Call");
                    button.setAttribute('onclick','callcoach("'+event.userid+'")');
                    button.className = 'allcall btn btn-success btn-block';
                    button.appendChild(textcall);
                        mediaElement.appendChild(coachalert);
                        mediaElement.appendChild(button);
                        center.appendChild(mediaElement);
                        connection.videosContainer.appendChild(center);
                        $('#roomtohide').hide();
                    }
                }
                setTimeout(function() {
                    mediaElement.media.play();
                }, 5000);
                mediaElement.id = event.streamid;
                userstream.push([event.userid,event.streamid]);
                $('#'+event.userid+'').hide();
            };

            var musicison = false;

            //MESSAGE EVERY 0.5 SECOND

            if (coachbool === true) {
            setInterval(function() {
                if (musicison === true) {
                connection.send(['on', musicnow, $('#musicplayed')[0].currentTime]);
                console.log('SEND : CURRENTMUSIC');   
                $('#musicplayed')[0].play();
                }
            }, 500);
            }

            function hangup(param) {
                alert('HANG UP');
                for (i=0;i<userstream.length;i++) {
                        connection.streamEvents[userstream[i][1]].stream.unmute('video');
                        connection.streamEvents[userstream[i][1]].stream.unmute('audio');
                }
                useridcall='';
                $('.allcall').show();
                $('#'+param+'').hide();
            };

            function call(eventparam) {
                alert('CALL');
                var i;
                var j;
                var videoon;
                var audioon;
                useridcall = eventparam;
                if (($('#'+useridcall+useridcall).get(0).checked === true) &&($('#'+useridcall+useridcall+useridcall).get(0).checked === false)) {
                    videoon = true;
                    audioon = false;
                }
                if (($('#'+useridcall+useridcall).get(0).checked === false) &&($('#'+useridcall+useridcall+useridcall).get(0).checked === true)) {
                    videoon = false;
                    audioon = true;
                }
                if (($('#'+useridcall+useridcall).get(0).checked === true) &&($('#'+useridcall+useridcall+useridcall).get(0).checked === true)) {
                    videoon = true;
                    audioon = true;
                }
                if (($('#'+useridcall+useridcall).get(0).checked === false) &&($('#'+useridcall+useridcall+useridcall).get(0).checked === false)) {
                    videoon = false;
                    audioon = false;
                }
                connection.send([''+useridcall,videoon,audioon]);
                console.log(''+videoon+' '+audioon+'');
                for (i=0;i<userstream.length;i++) {
                    if (useridcall !== userstream[i][0]) {
                        if (ouruserid !== userstream[i][0]) {
                            connection.streamEvents[userstream[i][1]].stream.mute('audio');
                        }
                    }
                }
                $('.allcall').hide();
                $('#'+eventparam+'').show();
            };

            function callcoach(eventparam) {
                var useridcall=eventparam;
                connection.send([''+useridcall,'call']);
            };

            var useralert;

            function stopsport(eventparam) {
                useralert = eventparam;
                connection.send([''+useralert,'stop']);
            }

            function fastsport(eventparam) {
                useralert = eventparam;
                connection.send([''+useralert,'fast']);
            }

            function refreshclients() {
                connection.send('refresh');
            }

            function onmusic() {
                offmusic();
                connection.send(['on', musicnow, 0]);
                $('#musicplayed')[0].load();
                $('#musicplayed')[0].play();
                musicison = true;
            }

            function offmusic() {
                connection.send('off');
                $('.classmusic').each(function(index, element) {
                    element.pause();
                });
                musicison = false;
            }

            $('#music').click(function() {
                musicnow = $("#listmusics").val();
                $('#musicsource').attr('src','http://www.musicscreen.be/mp3gallery/content/songs/MP3/Electro/'+musicnow+'.mp3');
                console.log($('#musicplayed')[0].currentTime);
            });

            connection.onmessage = function(event) {
                var e = event.data;
                var u = event.userid;
                var i;
                if (e==='refresh') {
                    setTimeout(function() {
                        refresh();
                    },5000);
                }
                if (e[0]==='on') {
                    //Change 'http://www.musicscreen.be/mp3gallery/content/songs/MP3/Electro/' by the folder with your musics
                    if (e[2] === 0) {
                        offmusic();
                        $('#musicsource').attr('src','http://www.musicscreen.be/mp3gallery/content/songs/MP3/Electro/'+e[1]+'.mp3');
                        $('#musicplayed')[0].load();
                        $('#musicplayed')[0].play();
                        musicison = true;
                    } else {
                        if (musicison === false) {
                        $('#musicsource').attr('src','http://www.musicscreen.be/mp3gallery/content/songs/MP3/Electro/'+e[1]+'.mp3');
                        $('#musicplayed')[0].load();
                        $('#musicplayed')[0].play();
                        $('#musicplayed')[0].currentTime = e[2];
                        console.log('COMMENCEMENT A '+e[2]);
                        musicison = true;
                        }
                    }
                }
                if (e==='off') {
                    console.log('END OF MUSIC');
                    $('.classmusic').each(function(index, element) {
                        element.pause();
                    });
                }
                if (e[0] === ouruserid) {
                    if (e[1] === 'stop') {
                        document.getElementById('alertcoach').innerHTML = "STOP";
                        setTimeout(function() {
                            document.getElementById('alertcoach').innerHTML = "";
                        },5000);
                    }
                    if (e[1] === 'fast') {
                        document.getElementById('alertcoach').innerHTML = "FAST";
                        setTimeout(function() {
                            document.getElementById('alertcoach').innerHTML = "";
                        },5000);
                    }
                    if (e[1] === 'call') {
                        var i;
                        for (i=0;i<username.length;i++) {
                            if (username[i][0] === u) {
                                $('#callfromclient').show();
                                document.getElementById('callfromclient').className = "alert alert-success";
                                document.getElementById('callfromclient').innerHTML = "<b>Dring dring!</b> "+username[i][1][0]+" wants to have a private <b id='mylink'>Call</b> !";
                                $('#mylink').click(function(){ call(u); $('#callfromclient').hide(); return false; });
                                setTimeout(function() {
                                    document.getElementById('callfromclient').innerHTML = "";
                                    $('#callfromclient').hide();
                                },5000);
                            }
                        }
                    }
                }
                console.log(e[0]+' '+u);
                if (e[0] !== ouruserid) {
                    for (i=0;i<userstream.length;i++) {
                        if (u === userstream[i][0]) {
                            if (e[1] === false) {
                                connection.streamEvents[userstream[i][1]].stream.mute('video');
                            }
                            if (e[2] === false) {
                                connection.streamEvents[userstream[i][1]].stream.mute('audio');
                            }
                        }
                    }
                }
            }

            connection.onstreamended = function(event) {
                console.log('USER DISCONNECTED : '+event.userid);
                var i;
                var res;
                for (i=0;i<userstream.length;i++) {
                    if (userstream[i][0] === event.userid) {
                        res = userstream[i][1];
                        ress = username[i][1][0];
                        console.log('USERSTREAM : '+userstream)
                        userstream.splice(i,1);
                        console.log('DELETE FROM USERSTREAM : '+userstream);
                        console.log('USERNAME : '+username)
                        username.splice(i,1);
                        console.log('DELETE FROM USERNAME : '+username);
                        console.log("STREAMID : "+res);
                        var mediaElement = document.getElementById(res);
                        console.log("MEDIAELEMENT : "+mediaElement);
                        $(mediaElement).hide();
                        connection.videosContainer.removeChild(mediaElement);
                    }
                }
            };

            connection.onleave = function(event) {
                var gg = event.userid;
                console.log('USER : '+gg);
                console.log(userstream);
                connection.onstreamended(event);
            };

            function showRoomURL(roomid) {
                var roomHashURL = '#' + roomid;
                var roomQueryStringURL = '?roomid=' + roomid;
                var html = '<h2>You are in the room "<a href="' + roomHashURL + '" target="_blank">' + roomid + '</a>" !</h2><br>';
            }
            (function() {
                var params = {},
                    r = /([^&=]+)=?([^&]*)/g;
                function d(s) {
                    return decodeURIComponent(s.replace(/\+/g, ' '));
                }
                var match, search = window.location.search;
                while (match = r.exec(search.substring(1)))
                    params[d(match[1])] = d(match[2]);
                window.params = params;
            })();
            var roomid = '';
            if (localStorage.getItem(connection.socketMessageEvent)) {
                roomid = localStorage.getItem(connection.socketMessageEvent);
            } else {
                roomid = connection.token();
            }

            roomid="1";

            localStorage.setItem(connection.socketMessageEvent, this.value);
            
            var hashString = location.hash.replace('#', '');
            if(hashString.length && hashString.indexOf('comment-') == 0) {
              hashString = '';
            }
            var roomid = params.roomid;
            if(!roomid && hashString.length) {
                roomid = hashString;
            }
            if(roomid && roomid.length) {
                document.getElementById('room-id').value = roomid;
                localStorage.setItem(connection.socketMessageEvent, roomid);
                // auto-join-room
                (function reCheckRoomPresence() {
                    connection.checkPresence(roomid, function(isRoomExists) {
                        if(isRoomExists) {
                            connection.join(roomid);
                            return;
                        }
                        setTimeout(reCheckRoomPresence, 5000);
                    });
                })();
            }