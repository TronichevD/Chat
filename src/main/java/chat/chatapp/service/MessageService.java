package chat.chatapp.service;

import chat.chatapp.model.Channel;
import chat.chatapp.model.Message;
import chat.chatapp.model.User;
import chat.chatapp.repository.MessageRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserService userService;
    private final ChannelService channelService;

    // Отправка сообщения в канал
    @Transactional
    public Message sendMessage(Long userId, Long channelId, String content) {
        User sender = userService.getUserById(userId);
        Channel channel = channelService.getChannelById(channelId);

        Message message = Message.builder()
                .content(content)
                .sender(sender)
                .channel(channel)
                .timestamp(LocalDateTime.now())
                .build();

        return messageRepository.save(message);
    }

    // Получение всех сообщений канала
    public List<Message> getMessagesByChannel(Long channelId) {
        return messageRepository.findByChannelId(channelId);
    }
}