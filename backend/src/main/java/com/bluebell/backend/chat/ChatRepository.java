package com.bluebell.backend.chat;

import com.bluebell.backend.chat.modal.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface ChatRepository extends JpaRepository<Message, UUID> {

    @Transactional
    @Modifying
    @Query("UPDATE Message m " +
            "SET m.editedAt = :editedAt, " +
            "m.text = :text " +
            "WHERE m.id = :id")
    void updateMessage(@Param("id") UUID id,
                       @Param("text") String text,
                       @Param("editedAt") String editedAt);


    @Transactional
    @Modifying
    @Query("UPDATE Message m " +
            "SET m.likeCount = m.likeCount + :like " +
            "WHERE m.id = :id")
    void updateLike(@Param("id") UUID id, @Param("like") int likeDiff);
}
