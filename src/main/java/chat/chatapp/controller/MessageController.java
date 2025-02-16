package chat.chatapp.controller;

import chat.chatapp.model.Message;
import chat.chatapp.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestParam Long userId, @RequestParam Long channelId, @RequestParam String content) {
        return ResponseEntity.ok(messageService.sendMessage(userId, channelId, content));
    }

    @GetMapping("/channels/{channelId}")
    public ResponseEntity<List<Message>> getMessagesByChannel(@PathVariable Long channelId) {
        return ResponseEntity.ok(messageService.getMessagesByChannel(channelId));
    }
}
