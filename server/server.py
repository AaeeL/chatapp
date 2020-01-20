import sys
import types
import socket
import selectors

sel = selectors.DefaultSelector()

def accept_connection(sock):
    conn, addr = sock.accept()
    print('accepted connection from', addr)
    conn.setblocking(False)
    data = types.SimpleNamespace(addr=addr, inb=b'', outb=b'')
    events = selectors.EVENT_READ | selectors.EVENT_WRITE
    sel.register(conn, events, data=data)

if len(sys.argv) != 3:
    print('Please specify host and port!')
    print('usage', sys.argv[0], ' <HOST> <PORT>')
    sys.exit(1)

host, port = sys.argv[1], int(sys.argv[2])
listening_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
listening_socket.bind((host, port))
listening_socket.listen()
print("listening on", (host, port))
listening_socket.setblocking(False)
sel.register(listening_socket, selectors.EVENT_READ, data=None)

try:
    while True:
        events = sel.select(timeout=None)
        for key, mask in events:
            if key.data is None:
                accept_connection(key.fileobj)
            else:
                pass
except KeyboardInterrupt:
    print('caught keyboard interrupt, closing')
finally:
    sel.close()
