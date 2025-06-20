# Luminara Backend

A modern Express.js backend service for managing directories and ratings, built with Sequelize and PostgreSQL (Supabase).

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
├── middleware/     # Custom middlewarLe
├── models/         # Database models
├── routes/         # Route definitions
├── services/       # Business logic
├── utils/          # Utility functions
└── app.js          # Express app setup
```

## 📚 API Documentation

All endpoints are prefixed with `/api`.

### 1. Get All Directories

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

---

### 2. Get Directory by ID

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

---

### 3. Search Directories

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

---

### 4. Create a Directory

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

---

### 5. Update a Directory

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

---

### 6. Delete a Directory

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
