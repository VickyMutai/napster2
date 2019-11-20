const $playlist = $('#playlist-container');
const $tracks = $('#tracks-container');
const $mainTitle = $('.header');
const $backButton = $('.back-button');

var API_KEY = 'ZWE2YjY4MGItZGFlMi00NGIxLTgzOGYtZTU2YzZjODdjMWNi';
function refresh(callback) {
  $.ajax({
    url: '/reauthorize',
    method: 'GET',
    data: { refreshToken: Napster.member.refreshToken },
    success: function(data) {
      Napster.member.set({
        accessToken: data.access_token,
        refreshToken: data.refresh_token
      });
      if (callback) {
        callback(data);
      }
    }
  });
}
function getParameters() {
  var query = window.location.search.substring(1);
  var parameters = {};
  if (query) {
    query.split('&').forEach(function(item) {
      var param = item.split('=');
      parameters[param[0]] = param[1];
    });
  }
  return parameters;
}
$(document).ready(function() {
  if (typeof Napster === 'undefined') {
    $('body').html("There has been an error while loading Napster.js. Please check the console for errors.")
    return;
  }
  var currentTrack;
  Napster.init({ consumerKey: API_KEY, isHTML5Compatible: true });

  Napster.player.on('ready', function(e) {
    // Uncomment to know when The Napster Player is ready
    // console.log('initialized');
    var params = getParameters();
    if (params.accessToken) {
      Napster.member.set(params);
    }
    
   
    $backButton.click(() => {
      $playlist.show();
      $tracks.hide();
      $mainTitle.text('Top Playlists');
      $backButton.hide();
    });
    $backButton.hide(); // Initally hide back button.
Napster.api.get('false','/playlists',function(data) {
      var tracky = data.playlists;     
      console.log(tracky)
      tracky.forEach(function getPlaylistTracks(tracky,i) {
      var t = $('<div style="background-image:url('+ tracky.images[0].url +')" data-playlist-id="' + tracky.id + '" data-playlist-name="' + tracky.name + '" class="cover">' + 
        '<div class="content-name">' + tracky.name + '</div></div>')
        t.appendTo('#playlist-container');

          console.log("I am", tracky.links.tracks, tracky.name )
          var m = $('<div data-track-id="' + tracky.link.tracks.id + '" style="background-image:url(http://direct.rhapsody.com/imageserver/v2/albums/' + track.albumId + '/images/300x300.jpg)" class="cover" >' +
          '<div class=content-name>' + tracks.albumName + '</div>'
          + '<audio controls class= "audio">' +
            '<source src=' + track.previewURL + 'type="audio/mpeg">' +
          '</audio>' + 
          '</div>');
          m.appendTo('#tracks-container');
    
});
});
});
});