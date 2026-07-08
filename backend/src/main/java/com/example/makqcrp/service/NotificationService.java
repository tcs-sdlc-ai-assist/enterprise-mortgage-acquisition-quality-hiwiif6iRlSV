package com.example.makqcrp.service;

import com.example.makqcrp.model.Notification;
import com.example.makqcrp.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for Notification business logic.
 */
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Creates a new notification.
     *
     * @param notification the notification to create
     * @return the created notification
     */
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    /**
     * Retrieves a notification by its ID.
     *
     * @param id the ID of the notification to retrieve
     * @return an Optional containing the notification if found, or empty if not found
     */
    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    /**
     * Retrieves all notifications.
     *
     * @return a list of all notifications
     */
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    /**
     * Updates an existing notification.
     *
     * @param notification the notification to update (must contain the ID)
     * @return the updated notification
     */
    public Notification updateNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    /**
     * Deletes a notification by its ID.
     *
     * @param id the ID of the notification to delete
     */
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}