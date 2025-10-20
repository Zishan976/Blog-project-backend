# MERN Blog Backend

A robust backend API for a MERN stack blog application, built with Node.js, Express, and MongoDB. This API provides authentication, user management, and comprehensive blog post CRUD operations.

## Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Blog Post Management**: Full CRUD operations for blog posts
- **Post Categories and Tags**: Organize posts with categories and tags
- **View Tracking**: Increment and track post view counts
- **Related Posts**: Fetch related posts by category
- **Featured Posts**: Mark posts as featured
- **Draft/Published Status**: Manage post publication workflow
- **MongoDB Integration**: Efficient data storage with Mongoose ODM

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd mern-blog-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:8080` (or the port specified in your `.env` file).

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user

  - Body: `{ "username": "string", "email": "string", "password": "string" }`

- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`
  - Returns: JWT token and user data

### Posts

- `GET /api/posts` - Get all posts (sorted by creation date, newest first)
- `GET /api/posts/:id` - Get a specific post by ID
- `POST /api/posts` - Create a new post
  - Body: Post object (see Post model below)
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `POST /api/posts/:id/increment-view` - Increment view count for a post
- `GET /api/posts/related/:category/:currentPostId` - Get related posts by category (excluding current post)

## Data Models

### User

```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Post

```javascript
{
  title: String (required),
  image: String,
  publish_on: Date,
  is_featured: Boolean (default: false),
  tags: [String],
  category: [String],
  author: String,
  summary: String,
  meta_description: String,
  content: String (required),
  status: String (enum: ['draft', 'published', 'scheduled'], default: 'draft'),
  viewCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

1. Start the server with `npm run dev`
2. Use tools like Postman or curl to test the API endpoints
3. Register a user first, then use the returned JWT token in the Authorization header for authenticated requests

Example curl command for registration:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

## Deployment on Vercel

1. Push your code to a GitHub repository.

2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account.

3. Click "New Project" and import your GitHub repository.

4. In the project settings, add the following environment variables:

   - `MONGODB_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas)
   - `JWT_SECRET`: A secure secret key for JWT tokens

5. Vercel will automatically detect the `vercel.json` configuration and deploy your app.

6. Once deployed, your API will be available at the Vercel-provided URL (e.g., `https://your-project.vercel.app`).

Note: Ensure your MongoDB database allows connections from all IP addresses (0.0.0.0/0) if using MongoDB Atlas.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
