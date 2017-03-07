/* Polyfill socket that implments both QT and Browser based Websocket API's */

class PolySocket {
  constructor(socket, type="QTWebSocket") {
    // W3 Socket polyfill from QTWebsocket
    if (type === "QTWebSocket") {
			sock.onMessageReceived = function(message) { if (this.onmessage) this.onmessage(message) }
			sock.onStatusChanged   = function(status) {
				if (status == 'error' && this.onerror) return this.onerror()
				if (status == 'close' && this.onclose) return this.onclose()
				if (status == 'open'  && this.onopen) return this.onopen()
			}
		} else {
			sock.onmessage = function(message) { if (this.onMessageReceived) this.onMessageRecieved(message) }
			sock.onerror   = function() { if (this.onStatusChanged) this.onStatusChanged('error') }
			sock.onclose   = function() { if (this.onStatusChanged) this.onStatusChanged('close') }
			sock.onopen    = function() { if (this.onStatusChanged) this.onStatusChanged('close') }
		}
	}
if (typeof module == 'object') module.exports = PolySocket

function PolySocket(socket) {
	if (socket.sendMessage) { //socket is QT WebSocket
		socket.onMessageReceived = function(message) { if (this.onmessage) this.onmessage(message) }
		socket.onStatusChanged   = function(status) {
			if (status == 'error' && this.onerror) return this.onerror()
			if (status == 'close' && this.onclose) return this.onclose()
			if (status == 'open'  && this.onopen)  return this.onopen()
		}
		socket.send = socket.sendMessage
	} else { //socket is W3C WebSocket
		socket.onmessage = function(message) { if (this.onMessageReceived) this.onMessageRecieved(message) }
		socket.onerror   = function() { if (this.onStatusChanged) this.onStatusChanged('error') }
		socket.onclose   = function() { if (this.onStatusChanged) this.onStatusChanged('close') }
		socket.onopen    = function() { if (this.onStatusChanged) this.onStatusChanged('close') }
		socket.sendMessage = socket.send
	}
}

if (typeof module == 'object') module.exports = PolySocket