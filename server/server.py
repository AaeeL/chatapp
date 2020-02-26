import sys
import types
import socket
import requests
import selectors

HOST = '127.0.0.1'
PORT = 65432

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    print('running')
    s.bind((HOST,PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('Hey look! A new client from', addr)
        while True:
            data = conn.recv(1024)
            if not data:
                print('no data')
                break
            msg = b"Hello there client :)"
            conn.sendall(msg)