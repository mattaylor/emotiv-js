var lame = require('lame')
var Speaker = require('speaker')
var Spotify = require('spotify-web')
var uri = process.argv[2] || 'spotify:track:6tdp8sdXrXlPV6AZZN2PE8';
console.log('hello')
// Spotify credentials...
var username = 'mat.taylor@gmail.com'
var password = 'C0smosky'
var fbuid = 707024497
var token = 'EAAAAKLSe4lIBACcM6JtwfkDIDV47cTaO6fLDGk8m0Ssz6tWxed0mblMyTZAY8Ecs5HOVL7REtxhmiAT6CD28PM6Xs4vsCDdsmmzZBrpGzHFsGMHpab6ZBTmAfvKcGFxqkx0mZCySbLYXNXiS8wpkY9ynVWhtSNMZD'


var onTrack = (err, track) => { 
  if (err) throw err
  console.log('Playing: %s - %s', track.artist[0].name, track.name)
  track.play()
  .pipe(new lame.Decoder())
  .pipe(new Speaker())
  .on('finish', () => spotify.disconnect())
}

var onLogin = (err, spotify)  => {
  console.log('onLogin')
  if (err) console.log(err)
  if (err) throw err
  console.log(spotify)
  spotify.get(uri, onTrack)
}

//console.log(Spotify)

Spotify().facebookLogin(fbuid, token, onLogin)

//Spotify.login(username, password, onLogin)