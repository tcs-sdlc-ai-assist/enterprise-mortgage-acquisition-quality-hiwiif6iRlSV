package com.example.makqcrp.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.access.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Global exception handler for REST API.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles validation exceptions from @Valid on request bodies.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Validation failed", errors, request);
    }

    /**
     * Handles validation exceptions for path/query parameters.
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolation(
            ConstraintViolationException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        Set<ConstraintViolation<?>> violations = ex.getConstraintViolations();
        for (ConstraintViolation<?> violation : violations) {
            String path = violation.getPropertyPath().toString();
            String message = violation.getMessage();
            errors.put(path, message);
        }
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Validation failed", errors, request);
    }

    /**
     * Handles missing servlet request parameters.
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<Object> handleMissingServletRequestParam(
            MissingServletRequestParameterException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        errors.put(ex.getParameterName(), ex.getMessage());
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing parameter", errors, request);
    }

    /**
     * Handles missing path variables.
     */
    @ExceptionHandler(MissingPathVariableException.class)
    public ResponseEntity<Object> handleMissingPathVariable(
            MissingPathVariableException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        errors.put(ex.getVariableName(), "Missing path variable: " + ex.getVariableName());
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Missing path variable", errors, request);
    }

    /**
     * Handles resource not found exceptions.
     */
    @ExceptionHandler({NoSuchElementException.class, EmptyResultDataAccessException.class})
    public ResponseEntity<Object> handleNotFound(RuntimeException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Resource not found", null, request);
    }

    /**
     * Handles data integrity violations (e.g., duplicate key).
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrityViolation(
            DataIntegrityViolationException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.CONFLICT, "Data integrity violation", null, request);
    }

    /**
     * Handles access denied exceptions.
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDenied(
            AccessDeniedException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, "Access denied", null, request);
    }

    /**
     * Handles malformed JSON requests.
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Malformed JSON request", null, request);
    }

    /**
     * Handles unsupported media type.
     */
    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Object> handleHttpMediaTypeNotSupported(
            HttpMediaTypeNotSupportedException ex, WebRequest request) {
        StringBuilder builder = new StringBuilder();
        builder.append("Unsupported media type: ");
        builder.append(ex.getContentType());
        builder.append(". Supported media types: ");
        ex.getSupportedMediaTypes().forEach(t -> builder.append(t).append(" "));
        return buildErrorResponse(HttpStatus.UNSUPPORTED_MEDIA_TYPE, builder.toString(), null, request);
    }

    /**
     * Handles unsupported HTTP methods.
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Object> handleHttpRequestMethodNotSupported(
            HttpRequestMethodNotSupportedException ex, WebRequest request) {
        StringBuilder builder = new StringBuilder();
        builder.append("Method ");
        builder.append(ex.getMethod());
        builder.append(" not supported for this request. Supported methods: ");
        ex.getSupportedHttpMethods().forEach(t -> builder.append(t).append(" "));
        return buildErrorResponse(HttpStatus.METHOD_NOT_ALLOWED, builder.toString(), null, request);
    }

    /**
     * Handles no handler found (404 for wrong URL).
     */
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Object> handleNoHandlerFound(
            NoHandlerFoundException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Endpoint not found", null, request);
    }

    /**
     * Handles all other exceptions.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAllExceptions(
            Exception ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 
                "Internal server error", null, request);
    }

    /**
     * Builds a standardized error response.
     */
    private ResponseEntity<Object> buildErrorResponse(HttpStatus status, 
                                                      String message, 
                                                      Map<String, String> errors,
                                                      WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        if (errors != null && !errors.isEmpty()) {
            body.put("errors", errors);
        }
        return new ResponseEntity<>(body, new HttpHeaders(), status);
    }
}