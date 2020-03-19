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
import xyz.advtopics.objects.Game;

public class SocketHandler extends TextWebSocketHandler {

    @Autowired
    private ObjectMapper jacksonObjectMapper;

    private Map<String, WebSocketSession> openSessions = new ConcurrentHashMap<>();
    private Map<String, Long> sessionGames = new ConcurrentHashMap<>();

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
            // System.out.println("Removing session: " + session.getId());
            openSessions.remove(session.getId());
        }
        if (sessionGames.containsKey(session.getId())) {
            // System.out.println("Removing game link session: " + session.getId());
            sessionGames.remove(session.getId());
        }
    }

    public void sendToGame(Game g, Event e) {
        if (sessionGames.containsValue(g.getId())) {
            for (Map.Entry<String, Long> entry : sessionGames.entrySet()) {
                if (entry.getValue() == g.getId()) {
                    try {
                        openSessions.get(entry.getKey())
                                .sendMessage(new TextMessage(jacksonObjectMapper.writeValueAsString(e)));
                    } catch (Exception err) {
                        System.out.println("Error: " + err);
                    }
                }
            }
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            long gameId = jacksonObjectMapper.readValue(message.getPayload(), Long.class);
            sessionGames.put(session.getId(), gameId);
        } catch (Exception e) {
            System.out.println("Exception: " + e);
        }
    }
}