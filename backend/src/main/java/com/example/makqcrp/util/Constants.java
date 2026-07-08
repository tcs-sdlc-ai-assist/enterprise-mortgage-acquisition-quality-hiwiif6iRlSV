package com.example.makqcrp.util;

/**
 * Utility class for application-wide constants.
 */
public final class Constants {

    private Constants() {
        // Prevent instantiation
    }

    // API related constants
    public static final String API_BASE_PATH = "/api";
    public static final String VERSION_1 = "/v1";

    // Pagination defaults
    public static final int DEFAULT_PAGE_SIZE = 10;
    public static final int MAX_PAGE_SIZE = 100;

    // Date time formats
    public static final String DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    public static final String DATE_FORMAT = "yyyy-MM-dd";

    // JWT token header (if authentication is implemented)
    public static final String JWT_TOKEN_HEADER = "Authorization";
    public static final String JWT_TOKEN_PREFIX = "Bearer ";

    // Common status values
    public static final String STATUS_ACTIVE = "ACTIVE";
    public static final String STATUS_INACTIVE = "INACTIVE";
    public static final String STATUS_PENDING = "PENDING";
    public static final String STATUS_APPROVED = "APPROVED";
    public static final String STATUS_REJECTED = "REJECTED";

    // File upload limits
    public static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    public static final String[] ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/gif"};
    public static final String[] ALLOWED_DOCUMENT_TYPES = {"application/pdf", "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"};
}