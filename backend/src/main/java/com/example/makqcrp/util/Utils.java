package com.example.makqcrp.util;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.ZoneOffset;
import java.util.UUID;

/**
 * Utility class for backend helper functions.
 */
public final class Utils {

    private Utils() {
        // Prevent instantiation
    }

    /**
     * Checks if a string is null or empty.
     *
     * @param str the string to check
     * @return true if the string is null or empty, false otherwise
     */
    public static boolean isNullOrEmpty(String str) {
        return str == null || str.isEmpty();
    }

    /**
     * Checks if a string is null, empty, or blank (only whitespace).
     *
     * @param str the string to check
     * @return true if the string is null, empty, or blank, false otherwise
     */
    public static boolean isNullOrBlank(String str) {
        return str == null || str.isBlank();
    }

    /**
     * Formats an Instant to the application's standard date-time format (UTC).
     *
     * @param instant the instant to format
     * @return formatted date-time string or null if input is null
     */
    public static String formatDateTime(Instant instant) {
        if (instant == null) {
            return null;
        }
        return DateTimeFormatter.ofPattern(Constants.DATE_TIME_FORMAT)
                .withZone(ZoneOffset.UTC)
                .format(instant);
    }

    /**
     * Formats a LocalDate to the application's standard date format.
     *
     * @param date the date to format
     * @return formatted date string or null if input is null
     */
    public static String formatDate(LocalDate date) {
        if (date == null) {
            return null;
        }
        return DateTimeFormatter.ofPattern(Constants.DATE_FORMAT)
                .format(date);
    }

    /**
     * Generates a random UUID string.
     *
     * @return a random UUID string
     */
    public static String generateUuid() {
        return UUID.randomUUID().toString();
    }
}