import SockJS from 'sockjs-client';
import { over } from "stompjs";
import { API_BASE_URL } from './DomainAPI';


// const socket = new SockJS(API_BASE_URL + '/ws');
// const stompClient = over(socket)

// stompClient.connect({}, onConnected, onError)

// function onConnected()
// {

// }

// function onError()
// {

// }



export const Socket = "socket";
//export const StompClient = stompClient;
