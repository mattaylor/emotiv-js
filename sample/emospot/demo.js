const SpotifyWebHelper = require('spotify-web-helper')

const helper = SpotifyWebHelper()

var log = console.log

helper.player.on('error', err => {
  log('ERROR', err)
  if (err.message.match(/No user logged in/)) {
    // also fires when Spotify client quits
  } else {
    // other errors: /Cannot start Spotify/ and /Spotify is not installed/
  }
})

helper.player.on('ready', () => {

  // Playback events
  helper.player.on('play', () => log('playing'))
  helper.player.on('pause', () => log('pause'))
  helper.player.on('end', () => log('end'))
  helper.player.on('track-will-change', track => log('track', track))
  helper.player.on('status-will-change', status => log('status', status))

  // Playback control. These methods return promises
  helper.player.play('spotify:track:4uLU6hMCjMI75M1A2tKUQC')
  helper.player.pause()
  helper.player.seekTo(60) // 60 seconds

  // Get current playback status, including up to date playing position
  console.log(helper.status)
  // 'status': {
  //    'track': ...,
  //    'shuffle': ...,
  //    'playing_position': ...
  //  }

})