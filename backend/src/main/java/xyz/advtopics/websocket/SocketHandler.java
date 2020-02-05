package xyz.advtopics.websocket;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import xyz.advtopics.objects.Event;

public class SocketHandler extends TextWebSocketHandler {

    @Autowired
    private ObjectMapper jacksonObjectMapper;

    private Map<String, WebSocketSession> openSessions = new ConcurrentHashMap<>();

    @Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        if (!openSessions.containsValue(session)) {
            openSessions.put(session.getId(), session);
        } else {
            throw new Exception("Session already open");
        }
    }
    
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        if (openSessions.containsValue(session)) {
            System.out.println("Removing session: " + session.getId());
            openSessions.remove(session.getId());
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            for (Map.Entry<String, WebSocketSession> s : openSessions.entrySet()) {
                System.out.println("ID: " + s.getKey() + ", Content: " + s.getValue());
            }
            session.sendMessage(new TextMessage(jacksonObjectMapper.writeValueAsString(new Event())));
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}