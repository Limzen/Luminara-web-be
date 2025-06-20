# Luminara Backend

A modern Express.js backend service for managing directories, articles, and guides, built with Sequelize and PostgreSQL (Supabase).

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd luminara-be
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the root directory with:
   ```
   DB_USER=postgres
   DB_PASSWORD=your_supabase_password
   DB_HOST=your_supabase_host
   DB_PORT=5432
   DB_NAME=postgres
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000/api`

---

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # Route definitions
├── services/       # Business logic
├── utils/          # Utility functions
└── app.js          # Express app setup
```

## 📚 API Documentation

All endpoints are prefixed with `/api`.

---

### Directories

#### 1. Get All Directories
- **Endpoint:** `GET /api/directories`
- **Description:** Retrieve all directories with their ratings.
- **Request Example:**
  ```http
  GET /api/directories
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Directories retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "Sample Directory",
        "address": "123 Main St",
        "overall_rating": 4.5,
        "opening_hours": "09:00-17:00",
        "description": "A great place to visit.",
        "main_image_url": "https://example.com/image.jpg",
        "rating": {
          "id": 1,
          "directory_id": 1,
          "overall_rating": 4.5,
          "total_reviews": 10,
          "guide_rating": 4.7,
          "transportation_rating": 4.2,
          "value_for_money_rating": 4.8,
          "safety_rating": 4.6
        }
      }
    ]
  }
  ```

#### 2. Get Directory by ID
- **Endpoint:** `GET /api/directories/:id`
- **Description:** Retrieve a single directory by its ID, including its rating.
- **Request Example:**
  ```http
  GET /api/directories/1
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Directory retrieved successfully",
    "data": {
      "id": 1,
      "name": "Sample Directory",
      "address": "123 Main St",
      "overall_rating": 4.5,
      "opening_hours": "09:00-17:00",
      "description": "A great place to visit.",
      "main_image_url": "https://example.com/image.jpg",
      "rating": {
        "id": 1,
        "directory_id": 1,
        "overall_rating": 4.5,
        "total_reviews": 10,
        "guide_rating": 4.7,
        "transportation_rating": 4.2,
        "value_for_money_rating": 4.8,
        "safety_rating": 4.6
      }
    }
  }
  ```

#### 3. Search Directories
- **Endpoint:** `GET /api/directories/search?query=keyword`
- **Description:** Search directories by name or address.
- **Query Parameters:**
  - `query` (string, required): The search keyword.
- **Request Example:**
  ```http
  GET /api/directories/search?query=museum
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Search completed successfully",
    "data": {
      "query": "museum",
      "total": 1,
      "results": [
        {
          "id": 2,
          "name": "City Museum",
          "address": "456 Museum Ave",
          "overall_rating": 4.2,
          "opening_hours": "10:00-18:00",
          "description": "A place full of history.",
          "main_image_url": "https://example.com/museum.jpg",
          "rating": { /* ... */ }
        }
      ]
    }
  }
  ```

#### 4. Create a Directory
- **Endpoint:** `POST /api/directories`
- **Description:** Create a new directory.
- **Request Example:**
  ```http
  POST /api/directories
  Content-Type: application/json

  {
    "name": "New Directory",
    "address": "789 New St",
    "overall_rating": 4.0,
    "opening_hours": "08:00-16:00",
    "description": "A newly added directory.",
    "main_image_url": "https://example.com/new.jpg"
  }
  ```
- **Response Example:**
  ```json
  {
    "status": 201,
    "message": "Directory created successfully",
    "data": {
      "id": 3,
      "name": "New Directory",
      "address": "789 New St",
      "overall_rating": 4.0,
      "opening_hours": "08:00-16:00",
      "description": "A newly added directory.",
      "main_image_url": "https://example.com/new.jpg"
    }
  }
  ```

#### 5. Update a Directory
- **Endpoint:** `PUT /api/directories/:id`
- **Description:** Update an existing directory by its ID.
- **Request Example:**
  ```http
  PUT /api/directories/3
  Content-Type: application/json

  {
    "name": "Updated Directory",
    "address": "789 Updated St",
    "overall_rating": 4.3,
    "opening_hours": "08:00-18:00",
    "description": "An updated directory.",
    "main_image_url": "https://example.com/updated.jpg"
  }
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Directory updated successfully",
    "data": {
      "id": 3,
      "name": "Updated Directory",
      "address": "789 Updated St",
      "overall_rating": 4.3,
      "opening_hours": "08:00-18:00",
      "description": "An updated directory.",
      "main_image_url": "https://example.com/updated.jpg"
    }
  }
  ```

#### 6. Delete a Directory
- **Endpoint:** `DELETE /api/directories/:id`
- **Description:** Delete a directory by its ID.
- **Request Example:**
  ```http
  DELETE /api/directories/3
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Directory deleted successfully"
  }
  ```

---

### Guides

#### 1. Get All Guides
- **Endpoint:** `GET /api/guides`
- **Description:** Retrieve all guides (does not include full_desc).
- **Request Example:**
  ```http
  GET /api/guides
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Guides retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "Sample Guide",
        "short_desc": "Short description.",
        "image_url": "https://example.com/guide.jpg"
      }
    ]
  }
  ```

#### 2. Get Guide by ID
- **Endpoint:** `GET /api/guides/:id`
- **Description:** Retrieve a single guide by its ID.
- **Request Example:**
  ```http
  GET /api/guides/1
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Guide retrieved successfully",
    "data": { /* ... */ }
  }
  ```

#### 3. Search Guides
- **Endpoint:** `GET /api/guides/search?query=keyword`
- **Description:** Search guides by name or short description.
- **Query Parameters:**
  - `query` (string, required): The search keyword.
- **Request Example:**
  ```http
  GET /api/guides/search?query=adventure
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Search completed successfully",
    "data": {
      "query": "adventure",
      "total": 1,
      "results": [ /* ... */ ]
    }
  }
  ```

#### 4. Create a Guide
- **Endpoint:** `POST /api/guides`
- **Description:** Create a new guide.
- **Request Example:**
  ```http
  POST /api/guides
  Content-Type: application/json

  {
    "name": "New Guide",
    "short_desc": "Short desc.",
    "full_desc": "Full desc.",
    "image_url": "https://example.com/guide.jpg"
  }
  ```
- **Response Example:**
  ```json
  {
    "status": 201,
    "message": "Guide created successfully",
    "data": { /* ... */ }
  }
  ```

#### 5. Update a Guide
- **Endpoint:** `PUT /api/guides/:id`
- **Description:** Update an existing guide by its ID.
- **Request Example:**
  ```http
  PUT /api/guides/2
  Content-Type: application/json

  {
    "name": "Updated Guide",
    "short_desc": "Updated short desc.",
    "full_desc": "Updated full desc.",
    "image_url": "https://example.com/updated-guide.jpg"
  }
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Guide updated successfully",
    "data": { /* ... */ }
  }
  ```

#### 6. Delete a Guide
- **Endpoint:** `DELETE /api/guides/:id`
- **Description:** Delete a guide by its ID.
- **Request Example:**
  ```http
  DELETE /api/guides/2
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Guide deleted successfully"
  }
  ```

---

### Articles

#### 1. Get All Articles
- **Endpoint:** `GET /api/articles`
- **Description:** Retrieve all articles (does not include full_desc).
- **Request Example:**
  ```http
  GET /api/articles
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Articles retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "Sample Article",
        "short_desc": "Short description.",
        "image_url": "https://example.com/article.jpg"
      }
    ]
  }
  ```

#### 2. Get Article by ID
- **Endpoint:** `GET /api/articles/:id`
- **Description:** Retrieve a single article by its ID.
- **Request Example:**
  ```http
  GET /api/articles/1
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Article retrieved successfully",
    "data": { /* ... */ }
  }
  ```

#### 3. Search Articles
- **Endpoint:** `GET /api/articles/search?query=keyword`
- **Description:** Search articles by name or short description.
- **Query Parameters:**
  - `query` (string, required): The search keyword.
- **Request Example:**
  ```http
  GET /api/articles/search?query=history
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Search completed successfully",
    "data": {
      "query": "history",
      "total": 1,
      "results": [ /* ... */ ]
    }
  }
  ```

#### 4. Create an Article
- **Endpoint:** `POST /api/articles`
- **Description:** Create a new article.
- **Request Example:**
  ```http
  POST /api/articles
  Content-Type: application/json

  {
    "name": "New Article",
    "short_desc": "Short desc.",
    "full_desc": "Full desc.",
    "image_url": "https://example.com/article.jpg"
  }
  ```
- **Response Example:**
  ```json
  {
    "status": 201,
    "message": "Article created successfully",
    "data": { /* ... */ }
  }
  ```

#### 5. Update an Article
- **Endpoint:** `PUT /api/articles/:id`
- **Description:** Update an existing article by its ID.
- **Request Example:**
  ```http
  PUT /api/articles/2
  Content-Type: application/json

  {
    "name": "Updated Article",
    "short_desc": "Updated short desc.",
    "full_desc": "Updated full desc.",
    "image_url": "https://example.com/updated-article.jpg"
  }
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Article updated successfully",
    "data": { /* ... */ }
  }
  ```

#### 6. Delete an Article
- **Endpoint:** `DELETE /api/articles/:id`
- **Description:** Delete an article by its ID.
- **Request Example:**
  ```http
  DELETE /api/articles/2
  ```
- **Response Example:**
  ```json
  {
    "status": 200,
    "message": "Article deleted successfully"
  }
  ```
