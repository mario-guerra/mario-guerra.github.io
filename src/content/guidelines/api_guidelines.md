# REST API Design Guidelines

## Introduction

This document outlines best practices for designing high-quality, maintainable, and performant REST APIs. They reflect industry standards and lessons learned from working with first-party and third-party developers using TypeSpec to build real-world APIs at scale.  

_NOTE: These guidelines are not meant to represent or inform any particular cloud service implementation, they are meant to be generic. However, I've noted where Azure does things a specific way where applicable, mainly for my own reference._

## Core Principles

1. **API-First Design**: Design your API before implementation. Use tools like TypeSpec to define your API contract.
2. **Consistency**: Apply uniform patterns across all endpoints.
3. **Simplicity**: Keep your API as simple as possible while meeting requirements.
4. **Evolution**: Design for growth without breaking existing clients.

## URL Structure Guidelines

1. **Resource-Oriented Design**
   - Use nouns for resources: `/projects`, `/todoitems` (not verbs)
   - Use plural nouns for collections: `/projects` (not `/project`)
   - Nest resources logically: `/projects/{project_id}/collaborators`

2. **URL Hierarchy**
   - Keep URLs short and intuitive
   - Limit nesting to 2-3 levels: `/resource/{id}/subresource/{sub_id}`
   - Use query parameters for filtering: `/todoitems?project_id=123&is_completed=false`

3. **Resource Identification**
   - Use consistent identifiers (UUIDs or stable strings)
   - Avoid exposing raw database IDs when possible

## HTTP Methods

1. **Standard HTTP Method Usage**
   - `GET`: Retrieve resources (safe, idempotent)
   - `POST`: Create resources or trigger state-changing operations
   (not naturally idempotent but can be made idempotent with something like OASIS repeatability)
   - `PUT`: Create or replace resources entirely (idempotent)
   - `PATCH`: Update resources partially (idempotent if body is JSON Merge Patch)
   - `DELETE`: Remove resources (idempotent)
   - Note: All operations should be designed to be retriable for fault tolerance against network failures

2. **Method Properties**
   - Safe methods (no side effects): `GET`, `HEAD`, `OPTIONS`, `TRACE`
   - Idempotent methods (same result regardless of repetition): `GET`, `HEAD`, `PUT`, `DELETE`, `OPTIONS`, `TRACE`, `PATCH` with JSON Merge Patch

## Request/Response Format

1. **Data Format**
   - Use JSON as your primary exchange format
   - Apply consistent property naming (camelCase or snake_case)
   - Include appropriate Content-Type headers: `Content-Type: application/json`

2. **Request Bodies**
   - Include request bodies only with `POST`, `PUT`, and `PATCH`
   - Validate all inputs with clear error messages
   - Clearly distinguish required from optional fields
     - Note: Required/optional status may vary by operation type (e.g., a field might be required for creation but optional for updates)

3. **Response Structure**
   - Use appropriate HTTP status codes
   - Return the resource or collection in the response body
   - For collections, consider including metadata: `{"items": [...], "total_count": 100}`
     - Note: Including total counts may impact performance with large datasets and some storage technologies
   - Implement pagination for list endpoints with potentially large result sets
     - Note: Small, fixed-size collections (e.g., list of US states) may not require pagination

## Status Codes

1. **Common Status Codes**
   - `200 OK`: Success (GET, PUT, PATCH)
     - Note: Some systems (like Azure) treat 200 and 201 as functionally identical for idempotency reasons*
   - `201 Created`: Resource created (POST)
   - `204 No Content`: Success with empty response (often DELETE)
   - `400 Bad Request`: Invalid request format/parameters
   - `401 Unauthorized`: Authentication required
   - `403 Forbidden`: Authentication succeeded but permissions lacking
   - `404 Not Found`: Resource not found
   - `409 Conflict`: Request conflicts with resource state
   - `422 Unprocessable Entity`: Valid syntax but semantic errors
   - `429 Too Many Requests`: Rate limit exceeded
   - `500 Internal Server Error`: Server failure

_*A client might create a resource (201) but then timeout waiting for the response and retry the operation. In this case, the resource was already created and so the operation returns 200._

2. **Error Response Format**
   - Use consistent error structure across all endpoints:
     ```json
     {
       "error": {
         "code": "descriptive_error_code",
         "message": "Human-readable explanation",
         "details": [
           {
             "code": "specific_error_code",
             "target": "field_name",
             "message": "Field-specific error explanation"
           }
         ]
       }
     }
     ```
   - **Best Practices for Error Responses**:
     - Define and document all possible error codes as part of your API contract
     - Error codes should be string constants that clients can reliably program against
     - Human-readable messages are for logging and debugging only, not for programmatic decisions
     - Include sufficient context for troubleshooting without exposing sensitive information
     - For validation errors, specify which fields failed and why
     - Consider including a request ID for correlation with server logs
     - Don't expose internal implementation details in error messages

   - **Error Response Implementation Considerations**:
     - Don't duplicate information already in the HTTP response (like status codes)
     - Balance between providing helpful debugging information and avoiding verbosity
     - Localize error messages when appropriate for your audience
     - Ensure error handling doesn't leak security-sensitive information

   - **Azure-Specific Approach** (for reference):
     - Azure does not include the HTTP status code in the response body
     - In Azure, error codes are well-defined, stable contract elements that clients can switch/case on
     - Error messages in Azure are intended only for logging and debugging, not for programmatic use
     - Azure typically uses a standardized error format across all services to ensure consistency

## Pagination, Filtering, and Sorting

1. **Pagination**
   - Implement pagination for collection endpoints that can return large datasets
   - Common pagination approaches:
     - Use query parameters like `skip` and `top` (simple and effective)
     - Return a "next link" URL for the client to retrieve the next page (Azure's approach)
   - Consider whether including total count is feasible for your data storage technology
     - Note: Total counts often require scanning the entire dataset, which can be impractical or expensive with certain data stores
   - Set sensible defaults and maximum page sizes

2. **Filtering and Sorting**
   - Use query parameters for filtering: `?status=active&priority=high`
     - Note: Some systems (like Azure) may use a domain-specific query language like `?filter=status eq 'active' and priority eq 'high'`
   - Use query parameters for sorting: `?sort=created_at&order=desc`
     - Note: Consider the performance implications of sorting, especially on large datasets. Sorting can be an expensive operation that increases latency and resource consumption, particularly when dealing with distributed data stores.
   - Document all supported filter and sort options
   - For complex filtering needs, ensure your approach is well-documented and consistent

## Versioning

1. **API Versioning Approaches**
   - URL path: `/v1/resources` (explicit, easily testable)
     - Note: This approach can be problematic as it suggests different resource identities across versions. Resources should ideally have stable URLs regardless of API version, allowing a resource created with v1 to be accessible via v2 endpoints as the same resource, not a different one.
   - Custom header: `API-Version: 1` (cleaner URLs)
     - Note: This approach doesn't work well for browser-based GET requests since browsers typically don't provide a way to include custom headers in normal navigation
   - Accept header: `Accept: application/vnd.company.v1+json` (RESTful)
     - Note: While this approach is RESTful, it has similar limitations as custom headers for browser-based operations
   - Query parameter: `?api-version=2023-01-01` (browser-friendly, Azure's approach)
     - Note: This approach works well with browsers and is more accessible for testing and direct URL access

2. **Versioning Best Practices**
   - Version from the beginning
   - Consider how you'll manage version compatibility
   - Maintain backward compatibility where possible
   - When introducing breaking changes in a new major version, consider running multiple API versions side by side for a transition period to avoid disrupting existing clients
   - Consider your API consumers' needs when choosing a strategy
   - Be consistent in your versioning approach across APIs

## Security

1. **Authentication and Authorization**
   - Use standard protocols (OAuth 2.0, JWT)
   - Require HTTPS for all endpoints
   - Implement proper token validation
   - Apply least privilege principle

2. **Data Protection**
   - Never expose sensitive data in URLs
   - Validate all inputs against injection attacks
   - Implement rate limiting to prevent abuse
   - Use appropriate security headers

## Performance Optimization

1. **Response Optimization**
   - Support field selection to reduce payload size
   - Enable compression (gzip/deflate)
   - Implement conditional requests with ETags
     - For collection endpoints, include ETags with each item to enable proper caching and concurrency control
   - Use appropriate cache controls

2. **Batch Operations**
   - Provide endpoints for bulk operations
   - Design for efficient handling of multiple resources
   - Return OK-200 if the batch was processed. Each item might be processed successfully or fail but it was processed. 
    
    The hardest thing about batching is dealing with failures and batch processing should be atomic – all or nothing (as is true with ALL HTTP requests). But services rarely implement batch processing as atomic because it is too hard to do. 

## Data Types and Formats

### Date and Time

1. **Standard Format**
   - Use RFC3339: `YYYY-MM-DDThh:mm:ssZ`
   - Store and transmit dates in UTC
   - Include timezone information when needed
   - Examples: `2023-10-15T14:30:00Z` or `2023-10-15T10:30:00-04:00`

2. **Date and Time Best Practices**
   - Distinguish between date-only and date-time fields
   - Use consistent naming: `due_date` vs. `created_at`
   - Document expected precision
   - For durations, consider:
     - Simple integer values with specified units (e.g., `durationHours: 24`) for better language support and simplicity
     - ISO 8601 format: `P1Y2M10DT2H30M` (standard but has limitations):
       - Limited programming language support for parsing/generating
       - Potential ambiguity (e.g., a month could be 28-31 days; a year could have 365-366 days)
   - For ranges, provide explicit start and end fields

## File Handling

1. **Upload Strategies**
   - For small files: Use multipart/form-data when combining binary data with other request fields
   - For binary-only requests, Content-Type can match the file type
   - For file uploads: Consider chunked upload capabilities
     - Note: There's no fixed size threshold for chunking. The tradeoff involves network reliability - larger uploads have higher chances of network failure, requiring full retransmission which increases latency and bandwidth consumption
     - Services should allow clients to decide their chunk size based on their network conditions
   - Support resumable uploads for reliability as part of a comprehensive retry strategy

2. **File Operations**
   - Store comprehensive metadata (name, type, size, checksums)
   - Consider whether to use separate endpoints for metadata operations vs. content operations
     - Azure storage uses a single endpoint strategy - in a GET request, metadata comes back in response headers and binary content in the body
   - **Downloading Files**:
     - For binary data, implement partial content (HTTP Range) support to enable efficient downloading
     - Support HTTP Range requests for all binary content, not just media files
     - Note: Range requests enable more efficient download patterns. If a download of 100KB fails after 25KB, the client can keep what was received and request only the remaining 75KB
     - Return appropriate Content-Type headers matching the file type
     - Consider including Content-Disposition headers when appropriate
       - Note: Content-Disposition headers tell the client how to handle the response (e.g., `attachment; filename="example.pdf"` instructs browsers to download the file rather than display it inline, and specifies the suggested filename)
   - Consider carefully whether to implement image transformations via query parameters, as these can add complexity

## Streaming Data

1. **Real-time Data Options**
   - Periodic polling: The client periodically polls the service for updates (most common approach)
   - Server-Sent Events (SSE): One-way server updates with standard HTTP
   - WebSockets: Bidirectional communication
   - Long Polling: Similar to SSE, keeps connection open until server has data to send

2. **Stream Design Best Practices**
   - Consider throttling mechanisms for request rates
     - Note: Throttling is typically applied to new incoming HTTP requests. For long-lived connections like SSE or WebSockets, throttling becomes more challenging once the connection is established. This is an advantage of periodic polling, as each request can be properly throttled
   - Design for stateless connections to improve scalability
     - Note: Maintaining state (like remembering the last event a client received) can limit service scalability. Stateless designs are preferable for highly scalable services
   - Consider both streaming and batch access patterns
   - Include timestamps for ordering
   - Document latency expectations

3. **Webhooks**
   - Allow subscription to specific events
   - Include event type, timestamp, and payload
   - Consider retry policies and failure handling
   - Require HTTPS with verification
   - Note: Webhooks can present challenges with firewalls, client reliability, and error handling. Services must handle various failure scenarios, including unresponsive clients and potential infinite loops. Consider webhooks only when necessary and implement proper safeguards

## API Management

1. **Rate Limiting**
   - Use standard headers:
     - `X-RateLimit-Limit`: Total requests allowed
     - `X-RateLimit-Remaining`: Requests remaining
     - `X-RateLimit-Reset`: Reset timestamp
   - Return 429 status with Retry-After header when exceeded
   - Consider different limits for different operations

2. **Idempotency and Concurrency**
   - Support idempotency keys for non-idempotent operations
   - Use ETags and If-Match headers for optimistic concurrency
   - Return 412 Precondition Failed, 409 Conflict, and 304 Not Modified for version conflicts

3. **Observability**
   - Include unique request IDs in responses
   - Use correlation IDs for cross-service tracing
   - Provide health check endpoints
   - Consider including API version information in responses where it helps with troubleshooting

## Documentation

1. **API Documentation**
   - Maintain complete, up-to-date documentation
   - Include examples for all endpoints
   - Document error codes and scenarios
   - Use OpenAPI/Swagger specifications
   - Provide change management information

2. **Error Handling**
   - Define standard error types
   - Ensure consistent error formats
   - Include actionable information
   - Document retry strategies

## Testing and Quality Assurance

1. **Comprehensive Testing**
   - Unit test all endpoints
   - Implement realistic integration tests
   - Test edge cases and error conditions
   - Conduct performance tests under load

2. **Monitoring**
   - Log all API interactions
   - Monitor usage, performance, and errors
   - Set up alerts for abnormal patterns
   - Track deprecated feature usage

## Wrap up

These guidelines provide a foundation for building robust, developer-friendly APIs. Treat them as living documents that evolve with technology and organizational needs. Always prioritize clarity, consistency, and ease of use in your API design.

Remember: An API is a user interface for developers—design it with the same care as any user-facing product.
