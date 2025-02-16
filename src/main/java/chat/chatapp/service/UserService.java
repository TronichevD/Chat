package chat.chatapp.service;

import chat.chatapp.model.User;
import chat.chatapp.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    // Регистрация нового пользователя
    @Transactional
    public User registerUser(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Пользователь с таким именем уже существует!");
        }
        User user = User.builder()
                .username(username)
                .password(password) // В реальности тут должен быть хешированный пароль!
                .build();
        return userRepository.save(user);
    }

    // Получение списка всех пользователей
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Поиск пользователя по ID
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Пользователь не найден"));
    }
}