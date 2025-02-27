package chat.chatapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChatApplication {
    private static final Logger logger = LoggerFactory.getLogger(ChatApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ChatApplication.class, args);
        logger.info("Chat Application Started Successfully!");
    }

}
