package chat.chatapp.controller;

import chat.chatapp.model.Channel;
import chat.chatapp.service.ChannelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/channels")
@RequiredArgsConstructor
public class ChannelController {
    private final ChannelService channelService;

    @PostMapping("/create")
    public ResponseEntity<Channel> createChannel(@RequestParam String name) {
        return ResponseEntity.ok(channelService.createChannel(name));
    }

    @GetMapping
    public ResponseEntity<List<Channel>> getAllChannels() {
        return ResponseEntity.ok(channelService.getAllChannels());
    }
}
