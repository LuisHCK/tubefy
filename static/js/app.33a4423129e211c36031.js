webpackJsonp([1],[,,,,,,,,,,,,,,function(t,s,e){"use strict";var n=e(105),i=new n.a("wrkstation");i.version(1).stores({songs:"++id, name, url, favorite",playlists:"++id, title, cover, *songs"}),s.a=i},,,,,,,,,,,,,,,,,function(t,s,e){"use strict";var n=e(63),i=e(107),a=e(111);s.a={components:{Player:n.a,Sidebar:i.a,Header:a.a},name:"app"}},function(t,s,e){"use strict";var n=e(65),i=e.n(n),a=e(68),o=e.n(a),r=e(9);e(14);s.a={computed:Object(r.b)({player:function(){return this.$refs.youtube.player},currentSong:function(t){return t.currentSong},queue:function(t){return t.queue},currentVideoId:function(t){return t.currentVideoId},settings:function(t){return t.settings}}),data:function(){return{playerVars:{autoplay:1},songId:null,duration:0,time:0,progress:0,processId:null,hidePlayer:!0,isPlaying:!1}},methods:{playVideo:function(){this.duration=0,this.progress=0,this.isPlaying=!0,this.player.playVideo()},playing:function(){var t=this;return o()(i.a.mark(function s(){var e;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.player.getDuration();case 2:e=s.sent,t.processId=setInterval(function(){t.player.getCurrentTime().then(function(s){var n=s/e*100;t.progress=n<100?n:100,t.updateTime(s+1)})},100),t.isPlaying=!0;case 5:case"end":return s.stop()}},s,t)}))()},updateTime:function(t){t=Math.round(t);var s=Math.floor(t/60),e=t-60*s;e=e<10?"0"+e:e,s=s<10?"0"+s:s,this.time=s+":"+e},changeSong:function(){var t=this,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"next";if(this.settings.random){var e=this.randomize(this.queue);this.$store.commit("setCurrentVideoId",e)}else{var n=this.queue.length,i=void 0;this.queue.map(function(e,a){e===t.currentVideoId?n>a+1&&("next"===s?i=a+1:"prev"===s&&a-1>=0&&(i=a-1)):i=0}),this.$store.commit("setCurrentVideoId",this.queue[i])}},randomize:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t[Math.floor(Math.random()*t.length)]},pauseVideo:function(){this.isPlaying?this.player.pauseVideo():this.playVideo()},paused:function(){this.isPlaying=!1,clearInterval(this.processId)}}}},,,,,,,,,,,,,,function(t,s,e){"use strict";var n=e(109);s.a={methods:{seedPlaylists:function(){Object(n.a)()}}}},function(t,s,e){"use strict";var n=e(9);s.a={computed:Object(n.b)({showNav:function(t){return t.showNav}}),data:function(){return{}},methods:{toggleNav:function(){this.$store.commit("toggleNav")}}}},function(t,s,e){"use strict";var n=e(119),i=e(123),a=e(14),o=e(9),r=new i.a;s.a={components:{PlaylistItem:n.a},computed:Object(o.b)({playlists:function(t){return t.playlists}}),data:function(){return{playlistId:"",playlistTitle:"Youtube playlist",showForm:!1}},methods:{showPlaylistPromt:function(){var t=this;this.$dialog.prompt({message:"Enter YouTube Playlist URL",inputAttrs:{placeholder:"Youtube url"},onConfirm:function(s){return t.createPlaylist(s)}})},createPlaylist:function(t){this.$toast.open("Loading Playlist");var s=this.parseYoutubePlaylist(t);r.getPlaylistDetails(s).then(function(t){console.log(t.data.items[0].snippet.thumbnails.high.url),r.getPlaylistItems(s,void 0,t.data.items[0].snippet.title,t.data.items[0].snippet.thumbnails.high.url)})},getPlaylistsInDB:function(){var t=this;a.a.playlists.toArray().then(function(s){t.$store.commit("setPlaylists",s)}).catch(function(t){return console.log(t)})},parseYoutubePlaylist:function(t){var s=t.split("=");return s.length<2?(alert("Invalid URL"),""):s[1]}},created:function(){this.getPlaylistsInDB()}}},function(t,s,e){"use strict";s.a={props:{title:{type:String},id:{},cover:{}},methods:{showPlaylist:function(){this.$router.push("/playlist/"+this.id)}}}},,,,,,function(t,s,e){"use strict";var n=e(9);e(19).a.use(n.a);var i={playlists:[],currentPlaylist:{songs:[]},currentSong:{title:"Select a song",videoId:""},showNav:!1,currentSongIndex:0,queue:[],currentVideoId:void 0,settings:{random:!1}},a={playlists:function(t){return t.playlists},currentPlaylist:function(t){return t.currentPlaylist},currentSong:function(t){return t.currentSong},currentSongIndex:function(t){return t.currentSongIndex},showNav:function(t){return t.showNav},queue:function(t){return t.queue},currentVideoId:function(t){return t.currentVideoId}},o={setPlaylists:function(t,s){t.playlists=s},setCurrentPlaylist:function(t,s){t.currentPlaylist=s},addPlaylist:function(t,s){t.playlists.push()},playSong:function(t,s){t.currentSong=s},setCurrentSongIndex:function(t,s){t.currentSongIndex=s},toggleNav:function(t){t.showNav=!t.showNav},setQueue:function(t,s){t.queue=s},setCurrentVideoId:function(t,s){t.currentVideoId=s}};s.a=new n.a.Store({state:i,getters:a,mutations:o})},function(t,s,e){"use strict";var n=e(151),i=e(14),a=e(9);s.a={computed:Object(a.b)({playlists:function(t){return t.playlists}}),components:{PlaylistContainer:n.a},data:function(){return{playlist:{}}},mounted:function(){var t=this,s=Number(this.$route.params.id);i.a.playlists.get(s).then(function(s){return t.playlist=s})}}},function(t,s,e){"use strict";var n=e(9);s.a={computed:Object(n.b)({currentVideoId:function(t){return t.currentVideoId}}),props:{items:{}},methods:{selectSong:function(t){this.$store.commit("setCurrentVideoId",t.videoId),this.setQueue()},setQueue:function(){var t=[];this.items.map(function(s){t.push(s.videoId)}),this.$store.commit("setQueue",t)}}}},function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=e(19),i=e(60),a=e(115),o=e(155),r=e.n(o),l=e(156),c=(e.n(l),e(55)),u=e(157),A=e.n(u);n.a.use(A.a),n.a.use(r.a),n.a.config.productionTip=!1,new n.a({el:"#app",store:c.a,router:a.a,template:"<App/>",components:{App:i.a}})},,function(t,s,e){"use strict";function n(t){e(61)}var i=e(31),a=e(114),o=e(3),r=n,l=o(i.a,a.a,!1,r,null,null);s.a=l.exports},function(t,s){},,function(t,s,e){"use strict";function n(t){e(64)}var i=e(32),a=e(106),o=e(3),r=n,l=o(i.a,a.a,!1,r,"data-v-b781ebbe",null);s.a=l.exports},function(t,s){},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,s,e){"use strict";var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("footer",{staticClass:"footer player-component"},[e("div",{class:{"player-hiden":t.hidePlayer,"player-container":!0}},[e("youtube",{ref:"youtube",attrs:{"player-vars":t.playerVars,"video-id":t.currentVideoId,width:"auto",height:"200px"},on:{paused:t.paused,playing:t.playing,ended:t.nextSong}})],1),t._v(" "),e("div",{staticClass:"center-controls"},[e("div",{staticClass:"stack-buttons"},[t._m(0),t._v(" "),e("button",{staticClass:"button is-rounded is-outlined",on:{click:function(s){t.changeSong("prev")}}},[t._m(1)]),t._v(" "),e("button",{staticClass:"button is-rounded is-is-outlined is-large",on:{click:function(s){t.pauseVideo()}}},[e("span",{staticClass:"icon"},[t.isPlaying?e("i",{staticClass:"ion ion-ios-pause"}):e("i",{staticClass:"ion ion-ios-play"})])]),t._v(" "),e("button",{staticClass:"button is-rounded is-outlined",on:{click:function(s){t.changeSong("next")}}},[t._m(2)]),t._v(" "),t._m(3)])])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("button",{staticClass:"button is-rounded is-outlined is-small"},[e("span",{staticClass:"icon"},[e("i",{staticClass:"icon ion-ios-shuffle"})])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",{staticClass:"icon"},[e("i",{staticClass:"icon ion-ios-skip-backward"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",{staticClass:"icon"},[e("i",{staticClass:"icon ion-ios-skip-forward"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("button",{staticClass:"button is-rounded is-outlined is-small"},[e("span",{staticClass:"icon"},[e("i",{staticClass:"icon ion-ios-repeat"})])])}],a={render:n,staticRenderFns:i};s.a=a},function(t,s,e){"use strict";function n(t){e(108)}var i=e(46),a=e(110),o=e(3),r=n,l=o(i.a,a.a,!1,r,null,null);s.a=l.exports},function(t,s){},function(t,s,e){"use strict";function n(){a.map(function(t){i.a.playlists.add(t).then(function(){return console.log("Playlist addedd")})})}s.a=n;var i=e(14),a=[{title:"Playlist 1",songs:["Song name 1","Another song","This another song is sic","Add one more","Just kidding this is the last"]},{title:"Rap Playlist",songs:["Song name 1","Another song","This another song is sic","Add one more","Just kidding this is the last"]},{title:"Rock Playlist",songs:["Song name 1","Another song","This another song is sic","Add one more","Just kidding this is the last"]},{title:"Indie Playlist 3",songs:["Song name 1","Another song","This another song is sic","Add one more","Just kidding this is the last"]}]},function(t,s,e){"use strict";var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"sidebar"},[e("ul",{staticClass:"sidebar-item-list",on:{click:function(s){t.$router.push("/")}}},[t._m(0)])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("li",{staticClass:"sidebar-item"},[e("span",{staticClass:"icon"},[e("i",{staticClass:"icon ion-ios-list"})]),t._v(" "),e("span",[t._v("Library")])])}],a={render:n,staticRenderFns:i};s.a=a},function(t,s,e){"use strict";function n(t){e(112)}var i=e(47),a=e(113),o=e(3),r=n,l=o(i.a,a.a,!1,r,"data-v-f09734cc",null);s.a=l.exports},function(t,s){},function(t,s,e){"use strict";var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("nav",{staticClass:"navbar is-dark"},[e("div",{staticClass:"navbar-brand"},[t._m(0),t._v(" "),e("div",{staticClass:"navbar-burger",class:{"is-active":t.showNav},on:{click:function(s){t.toggleNav()}}},[e("span"),t._v(" "),e("span"),t._v(" "),e("span")])]),t._v(" "),e("div",{staticClass:"navbar-menu",class:{"is-active":t.showNav}},[t._m(1)])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("a",{staticClass:"navbar-item",attrs:{href:"/"}},[e("img",{attrs:{src:"https://s3.us-east-2.amazonaws.com/elasticbeanstalk-us-east-2-937989723734/assets/apple-touch-icon.png",alt:"Logo"}})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"navbar-end"},[e("a",{staticClass:"navbar-item",attrs:{target:"_blank",href:"https://luishck.github.io/"}},[t._v("\n            About\n          ")]),t._v(" "),e("a",{staticClass:"navbar-item",attrs:{target:"_blank",href:"https://luishck.github.io/posts/"}},[t._v("\n            Blog\n          ")]),t._v(" "),e("a",{staticClass:"navbar-item",attrs:{target:"_blank",href:"https://github.com/LuisHCK/tubefy"}},[t._v("\n            Fork me on GitHub ❤\n          ")])])}],a={render:n,staticRenderFns:i};s.a=a},function(t,s,e){"use strict";var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"app"}},[e("Header"),t._v(" "),e("div",{staticClass:"columns is-mobile"},[e("div",{staticClass:"column is-2-desktop is-3-tablet is-2-mobile"},[e("Sidebar")],1),t._v(" "),e("div",{staticClass:"column"},[e("main",[e("router-view")],1)])]),t._v(" "),e("Player")],1)},i=[],a={render:n,staticRenderFns:i};s.a=a},function(t,s,e){"use strict";var n=e(19),i=e(116),a=e(117),o=e(149);n.a.use(i.a),s.a=new i.a({routes:[{path:"/",name:"Home",component:a.a},{path:"/playlist/:id",name:"Playlist",component:o.a}]})},,function(t,s,e){"use strict";function n(t){e(118)}var i=e(48),a=e(148),o=e(3),r=n,l=o(i.a,a.a,!1,r,"data-v-306edc06",null);s.a=l.exports},function(t,s){},function(t,s,e){"use strict";function n(t){e(120)}var i=e(49),a=e(121),o=e(3),r=n,l=o(i.a,a.a,!1,r,null,null);s.a=l.exports},function(t,s){},function(t,s,e){"use strict";var n=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"card",on:{click:function(s){t.showPlaylist()}}},[n("div",{staticClass:"card-image"},[n("figure",{staticClass:"image is-2by2"},[n("img",{attrs:{src:t.cover||e(122),alt:"playlist"}})])]),t._v(" "),n("div",{staticClass:"card-content"},[n("div",{staticClass:"card-media"},[n("div",{staticClass:"media-content"},[n("b",[t._v(t._s(t.title))])])])])])},i=[],a={render:n,staticRenderFns:i};s.a=a},function(t,s){t.exports="data:image/png;base64,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"},function(t,s,e){"use strict";var n=e(124),i=e.n(n),a=e(125),o=e.n(a),r=e(129),l=e.n(r),c=e(14),u=e(55),A="AIzaSyAJ1-y_cXzOzjWUUFYRBur1kA-0JNQQias",d=l.a.create({baseURL:"https://www.googleapis.com/youtube/v3/"}),g=function(){function t(){i()(this,t),this.playlistItems=[]}return o()(t,[{key:"getPlaylistItems",value:function(t){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,e=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;d.get("playlistItems",{params:{part:"snippet",maxResults:50,fields:"items(contentDetails/videoId,id,snippet(resourceId/videoId,title)),nextPageToken,pageInfo,prevPageToken,tokenPagination",playlistId:t,key:A,pageToken:s}}).then(function(s){s.data.items.map(function(t){e.playlistItems.push(t)}),s.data.nextPageToken?e.getPlaylistItems(t,s.data.nextPageToken,n,i):e.processPlaylist(e.playlistItems,n,i)}).catch(function(t){console.log(t)})}},{key:"getPlaylistDetails",value:function(t){return d.get("playlists",{params:{part:"snippet",id:t,key:A}})}},{key:"processPlaylist",value:function(t,s,e){var n=this,i=[];t.map(function(t){i.push({title:t.snippet.title||"Youtube playlist",videoId:t.snippet.resourceId.videoId})});var a={title:s,cover:e,songs:i};c.a.playlists.add(a).then(function(){alert("Playlist created successfully"),c.a.playlists.toArray().then(function(t){u.a.commit("setPlaylists",t)}),n.playlistItems=[]})}},{key:"test",value:function(){this.getPlaylistItems("PLb-I-6VXFXuG6hfsIF4mhGhSYozIphUXV")}}]),t}();s.a=g},,,,,,,,,,,,,,,,,,,,,,,,,function(t,s,e){"use strict";var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"home-page"},[e("div",{staticClass:"page-header"},[e("h1",{staticClass:"title is-1"},[t._v("Library")]),t._v(" "),e("button",{staticClass:"button is-info",on:{click:function(s){t.showPlaylistPromt()}}},[t._v("Add Playlist")])]),t._v(" "),e("div",{staticClass:"columns is-mobile is-multiline playlists-container"},t._l(t.playlists,function(t,s){return e("div",{key:s,staticClass:"column is-2-desktop is-3-tablet is-half-mobile"},[e("PlaylistItem",{attrs:{title:t.title||"Hello world",id:t.id,cover:t.cover}})],1)}))])},i=[],a={render:n,staticRenderFns:i};s.a=a},function(t,s,e){"use strict";function n(t){e(150)}var i=e(56),a=e(154),o=e(3),r=n,l=o(i.a,a.a,!1,r,"data-v-4d3c070c",null);s.a=l.exports},function(t,s){},function(t,s,e){"use strict";function n(t){e(152)}var i=e(57),a=e(153),o=e(3),r=n,l=o(i.a,a.a,!1,r,"data-v-6acf878d",null);s.a=l.exports},function(t,s){},function(t,s,e){"use strict";var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"playlist-container"},[e("ul",{staticClass:"playlist-song-list"},t._l(t.items,function(s,n){return e("li",{key:n,staticClass:"playlist-song",class:{selected:t.currentVideoId==s.videoId},on:{click:function(e){t.selectSong(s)}}},[e("span",{staticClass:"icon has-text-info"},[t.currentVideoId==s.videoId?e("i",{staticClass:"icon ion-md-play"}):e("i",{staticClass:"icon ion-md-musical-notes"})]),t._v(" "),e("span",[t._v(t._s(s.title))])])}))])},i=[],a={render:n,staticRenderFns:i};s.a=a},function(t,s,e){"use strict";var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"playlist-page"},[t._m(0),t._v(" "),e("div",[e("PlaylistContainer",{attrs:{items:t.playlist.songs}})],1)])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"playlist-header"},[e("h1",{staticClass:"title is-1"},[t._v("Playlist")]),t._v(" "),e("div",{staticClass:"button is-info"},[t._v("Add Song")])])}],a={render:n,staticRenderFns:i};s.a=a},,function(t,s){}],[58]);
//# sourceMappingURL=app.33a4423129e211c36031.js.map