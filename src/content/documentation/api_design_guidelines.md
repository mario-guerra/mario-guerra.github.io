---
title: "API Design Guidelines"
description: "Technical guidelines for designing high-quality, maintainable, and performant REST APIs."
heroImage: "/assets/images/API_Design_Guidelines.jpeg"
slug: "api_design_guidelines"
---

## Introduction

This document outlines technical best practices for designing high-quality, maintainable, and performant REST APIs. They reflect industry standards and lessons learned from working with first-party and third-party developers to build real-world APIs at scale.

These guidelines focus on the technical aspects of API design to help developers create consistent, usable, and reliable APIs. For strategic and organizational aspects of API programs, see the [API Strategy and Governance Guide](/documentation/api_strategy_governance), and for implementation guidance, see the [API Lifecycle Management Guide](/documentation/api_lifecycle_management).

> _**NOTE:** These guidelines are not meant to represent or inform any particular cloud service implementation, they are meant to be generic. However, I've noted where Azure does things a specific way where applicable, mainly for my own reference._

---

## Core Design Principles

1. **API-First Design** 
   * Design your API before implementation
   * Use tools like TypeSpec to define your API contract
   * Consider both internal and external consumption patterns

2. **Consistency** 
   * Apply uniform patterns across all endpoints
   * Ensure consistency with enterprise-wide API standards
   * Provide consistent experiences for API consumers

3. **Simplicity** 
   * Keep your API as simple as possible while meeting requirements
   * Design for the consumer's needs, not your implementation
   * Differentiate internal service APIs from partner/external APIs

4. **Evolution** 
   * Design for growth without breaking existing clients
   * Plan for long-term API lifecycle management
   * Balance backward compatibility with innovation

---

## API Design Guidelines

### Consistency Principles

* **Naming Conventions**
  * Use domain-driven naming that reflects the business context
    * *Names should map to business capabilities rather than implementation details*
    * *Avoid technical jargon that obscures the business purpose*
  * Maintain consistent casing and plurality patterns
    * *Use singular nouns for resources, plural for collections*
    * *Apply camelCase or snake_case consistently across all services*
  * Establish glossary of approved terms and concepts
    * *Standardize terminology across APIs to prevent cognitive load*
    * *Align API vocabulary with industry-standard terminology*

### Resource Modeling

* **Resource Representations**
  * Model resources based on business entities, not database tables
    * *The public contract should hide implementation details*
    * *Resources should represent meaningful business objects with clear lifecycles*
  * Balance between normalization and denormalization
    * *Optimize representations for consumption rather than storage*
    * *Consider embedding frequently accessed related data to reduce round trips*
  * Design for evolvability through extensions
    * *Include extension points for future capabilities*
    * *Use properties that allow for capability discovery*

### URL Design

* **Path Structure**
  * Create hierarchical paths that reflect resource relationships
    * *Express ownership and containment through path structure*
    * *Limit path depth to maintain understandability*
  * Use path parameters for identity, query parameters for filtering
    * *Resource identifiers belong in the path*
    * *Optional or variable selection criteria belong in query string*
  * Establish conventions for collection pagination and filtering
    * *Standardize pagination parameters across all collection endpoints*
    * *Create consistent filtering patterns that compose well*

### Method Usage

* **HTTP Methods**
  * Apply HTTP methods according to their semantic meaning
    * *GET for retrieval, POST for creation, PUT for replacement, PATCH for updates*
    * *Maintain idempotency where appropriate (GET, PUT, DELETE)*
  * Define consistent success and error responses
    * *2xx responses should have consistent structure*
    * *Error responses should provide actionable information*
  * Support bulk operations for efficiency
    * *Enable batch processing for common operations*
    * *Maintain atomicity guarantees for batch operations*

---

## URL Structure Guidelines

### 1. Resource-Oriented Design

* Use **nouns** for resources: `/projects`, `/todoitems` (not verbs)
* Use **plural nouns** for collections: `/projects` (not `/project`)
* Nest resources logically: `/projects/{project_id}/collaborators`

### 2. URL Hierarchy

* Keep URLs short and intuitive
* Limit nesting to 2-3 levels: `/resource/{id}/subresource/{sub_id}`
* Use query parameters for filtering: `/todoitems?project_id=123&is_completed=false`

### 3. Resource Identification

* Use consistent identifiers (UUIDs or stable strings)
* Avoid exposing raw database IDs when possible

---

## HTTP Methods

### 1. Standard HTTP Method Usage

| Method | Purpose | Properties |
|--------|---------|------------|
| `GET` | Retrieve resources | Safe, idempotent |
| `POST` | Create resources or trigger operations | Not naturally idempotent¹ |
| `PUT` | Create or replace resources entirely | Idempotent |
| `PATCH` | Update resources partially | Idempotent² |
| `DELETE` | Remove resources | Idempotent |

¹ *Can be made idempotent with OASIS repeatability*  
² *When using JSON Merge Patch*

> **Note:** All operations should be designed to be retriable for fault tolerance against network failures

### 2. Method Properties

**Safe methods** (no side effects):
* `GET`, `HEAD`, `OPTIONS`, `TRACE`

**Idempotent methods** (same result regardless of repetition):
* `GET`, `HEAD`, `PUT`, `DELETE`, `OPTIONS`, `TRACE`
* `PATCH` (when using JSON Merge Patch)

---

## Request/Response Format

### 1. Data Format

* Use **JSON** as your primary exchange format
* Apply consistent property naming (camelCase or snake_case)
* Include appropriate Content-Type headers: `Content-Type: application/json`

### 2. Request Bodies

* Include request bodies only with `POST`, `PUT`, and `PATCH`
* Validate all inputs with clear error messages
* Clearly distinguish required from optional fields
  > **Note:** Required/optional status may vary by operation type (e.g., a field might be required for creation but optional for updates)

### 3. Response Structure

* Use appropriate HTTP status codes
* Return the resource or collection in the response body
* For collections, consider including metadata:
  ```json
  {
    "items": [...],
    "total_count": 100
  }
  ```
  > **Note:** Including total counts may impact performance with large datasets and some storage technologies

* Implement pagination for list endpoints with potentially large result sets
  > **Note:** Small, fixed-size collections (e.g., list of US states) may not require pagination

---

## Status Codes

### 1. Common Status Codes

| Code | Description | Typical Use |
|------|-------------|-------------|
| `200 OK` | Success | GET, PUT, PATCH |
| `201 Created` | Resource created | POST |
| `204 No Content` | Success with empty response | DELETE |
| `400 Bad Request` | Invalid request format/parameters | - |
| `401 Unauthorized` | Authentication required | - |
| `403 Forbidden` | Authentication succeeded but permissions lacking | - |
| `404 Not Found` | Resource not found | - |
| `409 Conflict` | Request conflicts with resource state | - |
| `422 Unprocessable Entity` | Valid syntax but semantic errors | - |
| `429 Too Many Requests` | Rate limit exceeded | - |
| `500 Internal Server Error` | Server failure | - |

> **Azure note:** Some systems (like Azure) treat 200 and 201 as functionally identical for idempotency reasons. A client might create a resource (201) but then timeout waiting for the response and retry the operation. In this case, the resource was already created and so the operation returns 200.

### 2. Error Response Format

Use consistent error structure across all endpoints:

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

#### Best Practices for Error Responses

* Define and document all possible error codes as part of your API contract
* Error codes should be string constants that clients can reliably program against
* Human-readable messages are for logging and debugging only, not for programmatic decisions
* Include sufficient context for troubleshooting without exposing sensitive information
* For validation errors, specify which fields failed and why
* Consider including a request ID for correlation with server logs
* Don't expose internal implementation details in error messages

#### Error Response Implementation Considerations

* Don't duplicate information already in the HTTP response (like status codes)
* Balance between providing helpful debugging information and avoiding verbosity
* Localize error messages when appropriate for your audience
* Ensure error handling doesn't leak security-sensitive information

---

## Pagination, Filtering, and Sorting

### 1. Pagination

* Implement pagination for collection endpoints that can return large datasets
* Common pagination approaches:
  * Use query parameters like `skip` and `top` (simple and effective)
  * Return a "next link" URL for the client to retrieve the next page
* Consider whether including total count is feasible for your data storage technology
  > **Note:** Total counts often require scanning the entire dataset, which can be impractical or expensive with certain data stores
* Set sensible defaults and maximum page sizes

### 2. Filtering and Sorting

* Use query parameters for filtering: 
  ```
  ?status=active&priority=high
  ```
  > **Note:** Some systems may use a domain-specific query language like `?filter=status eq 'active' and priority eq 'high'`

* Use query parameters for sorting: 
  ```
  ?sort=created_at&order=desc
  ```
  > **Note:** Consider the performance implications of sorting, especially on large datasets.

* Document all supported filter and sort options
* For complex filtering needs, ensure your approach is well-documented and consistent

---

## Versioning

### 1. API Versioning Approaches

| Approach | Example | Pros | Cons |
|----------|---------|------|------|
| URL path | `/v1/resources` | Explicit, easily testable, widely used | Changes resource identity in strict REST interpretation |
| Custom header | `API-Version: 1` | Cleaner URLs | Less discoverable, doesn't work well for browser requests |
| Accept header | `Accept: application/vnd.company.v1+json` | RESTful | Similar browser limitations, more complex for developers |
| Query parameter | `?api-version=2023-01-01` | Browser-friendly, simple | Parameters may conflict with resource filtering |

> **Note on URL path versioning:** While this approach technically suggests different resource identities across versions in strict REST interpretation, it remains one of the most widely implemented and developer-friendly approaches. If used, ensure that resource references across versions are well-documented.

### 2. Versioning Best Practices

* Version from the beginning
* Consider how you'll manage version compatibility
* Maintain backward compatibility where possible
* When introducing breaking changes in a new major version:
  * Consider running multiple API versions side by side during transition
  * Provide clear migration guides between versions
  * Offer tooling to help identify usage of deprecated features
  * Consider the operational cost of maintaining multiple versions

### 3. Migration Strategies Between Versions

* **Incremental Adoption:**
  * Allow clients to opt into new versions feature by feature
  * Use feature flags or capability negotiation where appropriate
  * Consider a hybrid approach during transition periods

* **Dependency Management:**
  * Consider how versioned APIs depend on each other
  * Document cross-service version compatibility
  * Test version combinations to ensure interoperability

### 4. Choosing a Versioning Strategy

* **Consider your clients' preferences and technical constraints:**
  * Some clients may prefer URL versioning for its explicitness
  * Developer tooling often works better with URL versioning
  * Browser-based applications may need query parameter versioning

* **Consider your operational model:**
  * Some versioning strategies are easier to implement in certain platforms
  * Balance theoretical purity with practical implementation

* **Aim for consistency across your API portfolio:**
  * Using different versioning approaches across APIs increases client complexity

## Performance Optimization

### 1. Response Optimization

* Support field selection to reduce payload size
* Enable compression (gzip/deflate)
* Implement conditional requests with ETags
  * For collection endpoints, include ETags with each item to enable proper caching and concurrency control
* Use appropriate cache controls

### 2. Batch Operations

* Provide endpoints for bulk operations
* Design for efficient handling of multiple resources
* Return OK-200 if the batch was processed. Each item might be processed successfully or fail but it was processed.

> **Note on batch atomicity:** The hardest thing about batching is dealing with failures and batch processing should be atomic – all or nothing (as is true with ALL HTTP requests). But services rarely implement batch processing as atomic because it is too hard to do.

---

## Data Types and Formats

### Date and Time

#### 1. Standard Format

* Use RFC3339: `YYYY-MM-DDThh:mm:ssZ`
* Store and transmit dates in UTC
* Include timezone information when needed
* Examples: 
  * `2023-10-15T14:30:00Z` 
  * `2023-10-15T10:30:00-04:00`

#### 2. Date and Time Best Practices

* Distinguish between date-only and date-time fields
* Use consistent naming: `due_date` vs. `created_at`
* Document expected precision

**For durations, consider:**
* Simple integer values with specified units (e.g., `durationHours: 24`) for better language support and simplicity
* ISO 8601 format: `P1Y2M10DT2H30M` (standard but has limitations):
  * Limited programming language support for parsing/generating
  * Potential ambiguity (e.g., a month could be 28-31 days; a year could have 365-366 days)

**For ranges:**
* Provide explicit start and end fields

---

## File Handling

### 1. Upload Strategies

* **For small files:** Use multipart/form-data when combining binary data with other request fields
* **For binary-only requests:** Content-Type can match the file type
* **For file uploads:** Consider chunked upload capabilities
  > **Note:** There's no fixed size threshold for chunking. The tradeoff involves network reliability - larger uploads have higher chances of network failure, requiring full retransmission which increases latency and bandwidth consumption. Services should allow clients to decide their chunk size based on their network conditions.
* Support resumable uploads for reliability as part of a comprehensive retry strategy

### 2. File Operations

* Store comprehensive metadata (name, type, size, checksums)
* Consider whether to use separate endpoints for metadata operations vs. content operations

#### Downloading Files

* For binary data, implement partial content (HTTP Range) support to enable efficient downloading
* Support HTTP Range requests for all binary content, not just media files
* Return appropriate Content-Type headers matching the file type
* Consider including Content-Disposition headers when appropriate
* Consider carefully whether to implement image transformations via query parameters, as these can add complexity

---

## Streaming Data

### 1. Real-time Data Options

| Option | Description | Best for |
|--------|-------------|----------|
| Periodic polling | Client periodically polls service for updates | Most common approach |
| Server-Sent Events (SSE) | One-way server updates with standard HTTP | Real-time notifications |
| WebSockets | Bidirectional communication | Interactive applications |
| Long Polling | Keeps connection open until server has data to send | Similar to SSE |

### 2. Stream Design Best Practices

* Consider throttling mechanisms for request rates
* Design for stateless connections to improve scalability
* Consider both streaming and batch access patterns
* Include timestamps for ordering
* Document latency expectations

### 3. Webhooks

* Allow subscription to specific events
* Include event type, timestamp, and payload
* Consider retry policies and failure handling
* Require HTTPS with verification

> **Note:** Webhooks can present challenges with firewalls, client reliability, and error handling. Services must handle various failure scenarios, including unresponsive clients and potential infinite loops. Consider webhooks only when necessary and implement proper safeguards.

---

## Wrap up

These technical guidelines provide a foundation for building robust, developer-friendly APIs. Follow these guidelines to ensure your APIs are consistent, maintainable, and provide a great developer experience. For guidance on API strategy and governance, see the [API Strategy and Governance Guide](/documentation/api_strategy_governance), and for implementation guidance, see the [API Lifecycle Management Guide](/documentation/api_lifecycle_management).

> **Remember:** An API is a user interface for developers—design it with the same care as any user-facing product.