package chat.chatapp.service;

import chat.chatapp.model.Channel;
import chat.chatapp.model.User;
import chat.chatapp.repository.ChannelRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChannelService {
    private final ChannelRepository channelRepository;

    // Создание нового канала
    @Transactional
    public Channel createChannel(String name) {
        Channel channel = Channel.builder()
                .name(name)
                .build();
        return channelRepository.save(channel);
    }

    // Получение списка всех каналов
    public List<Channel> getAllChannels() {
        return channelRepository.findAll();
    }

    // Поиск канала по ID
    public Channel getChannelById(Long channelId) {
        return channelRepository.findById(channelId)
                .orElseThrow(() -> new EntityNotFoundException("Канал не найден"));
    }
}