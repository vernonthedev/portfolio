"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, PenTool, Share2, Clock } from "lucide-react";
import Image from "next/image";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

const blogPosts: BlogPost[] = [
  {
    slug: "laravel-tips-2024",
    title: "Advanced Laravel Tips for 2024",
    excerpt: "Discover powerful Laravel techniques and best practices to level up your backend development.",
    content: `
# Advanced Laravel Tips for 2024

Laravel continues to evolve, and 2024 brings exciting new features and best practices. In this comprehensive guide, we'll explore advanced techniques that will help you write more efficient, maintainable code.

## Performance Optimization

### Query Optimization
One of the most critical aspects of Laravel development is optimizing database queries. Use eager loading to prevent N+1 query problems:

\`\`\`php
// Instead of this:
$users = User::all();
foreach ($users as $user) {
    echo $user->posts->count();
}

// Do this:
$users = User::with('posts')->get();
foreach ($users as $user) {
    echo $user->posts->count();
}
\`\`\`

### Caching Strategies
Implement intelligent caching to reduce database load:

- Use Redis for session storage
- Cache frequently accessed queries
- Implement cache tags for better invalidation

## Modern Laravel Features

### Laravel 11 Improvements
The latest version introduces several game-changing features:

1. **Simplified Configuration**: Less boilerplate, more convention
2. **Enhanced Routing**: More expressive route definitions
3. **Improved Testing**: Better test isolation and performance

### API Development
Building robust APIs with Laravel has never been easier:

- Use API resources for consistent responses
- Implement rate limiting effectively
- Leverage Sanctum for authentication

## Best Practices

### Code Organization
Maintain clean, organized code by:

- Using service classes for business logic
- Implementing repository patterns where appropriate
- Keeping controllers thin and focused

### Security Considerations
Always prioritize security:

- Validate all user input
- Use prepared statements (Laravel does this automatically)
- Implement proper authorization checks
- Keep dependencies updated

## Conclusion

Mastering these advanced Laravel techniques will significantly improve your development workflow and application performance. Stay curious, keep learning, and build amazing things!
    `,
    date: new Date("2024-01-15"),
    category: "Laravel Tips",
    featured: true,
    id: "laravel-tips-2024",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    slug: "flutter-state-management",
    title: "State Management in Flutter: A Complete Guide",
    excerpt: "Exploring different state management solutions in Flutter and when to use each one.",
    content: `
# State Management in Flutter: A Complete Guide

State management is one of the most crucial aspects of Flutter development. Choosing the right approach can make or break your application's architecture.

## Understanding State

State in Flutter refers to any data that can change over time. This includes:

- User input
- API responses
- UI interactions
- Application configuration

## Popular Solutions

### Provider
Provider is one of the most popular state management solutions:

\`\`\`dart
class CounterProvider extends ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}
\`\`\`

### Riverpod
Riverpod is Provider's successor, offering compile-time safety:

- Better error handling
- Improved performance
- More flexible architecture

### Bloc Pattern
For complex applications, the BLoC pattern provides:

- Clear separation of concerns
- Testable business logic
- Predictable state changes

## When to Use What

- **Small apps**: Use setState or Provider
- **Medium apps**: Consider Riverpod or Bloc
- **Large apps**: Bloc or Redux for complex state

## Best Practices

1. Keep state as local as possible
2. Use immutable state objects
3. Implement proper error handling
4. Test your state management logic

## Conclusion

The right state management solution depends on your project's complexity and team preferences. Start simple and scale as needed.
    `,
    date: new Date("2024-01-10"),
    category: "Flutter Dev",
    featured: true,
    id: "flutter-state-management",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    slug: "pwa-best-practices",
    title: "Building PWAs That Feel Native",
    excerpt: "Learn how to create Progressive Web Apps that provide a seamless user experience.",
    content: `
# Building PWAs That Feel Native

Progressive Web Apps combine the best of web and mobile applications, offering users a native-like experience through their browsers.

## Core PWA Features

### Service Workers
Service workers enable offline functionality and background sync:

\`\`\`javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/app.js'
      ]);
    })
  );
});
\`\`\`

### Web App Manifest
The manifest file defines how your app appears:

- App name and icons
- Display mode
- Theme colors
- Start URL

## Performance Optimization

### Critical Rendering Path
Optimize your initial load:

1. Minimize render-blocking resources
2. Use code splitting
3. Implement lazy loading
4. Optimize images

### Caching Strategies

- Cache-first for static assets
- Network-first for dynamic content
- Stale-while-revalidate for balance

## User Experience

### Offline Support
Provide meaningful offline experiences:

- Show cached content
- Display offline indicators
- Queue actions for when online

### Push Notifications
Engage users with push notifications:

- Request permission appropriately
- Provide value, not spam
- Allow easy opt-out

## Conclusion

PWAs represent the future of web applications. By implementing these best practices, you can create experiences that rival native apps.
    `,
    date: new Date("2024-01-05"),
    category: "PWA Development",
    featured: false,
    id: "pwa-best-practices",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    slug: "docker-ci-cd",
    title: "Docker & CI/CD: Streamlining Your Workflow",
    excerpt: "Setting up automated deployments with Docker and modern CI/CD pipelines.",
    content: `
# Docker & CI/CD: Streamlining Your Workflow

Modern development workflows require automation and consistency. Docker and CI/CD pipelines are essential tools for achieving this.

## Docker Fundamentals

### Containerization Benefits
- Consistent environments
- Easy scaling
- Simplified deployments
- Resource efficiency

### Dockerfile Best Practices
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
\`\`\`

## CI/CD Pipeline Setup

### GitHub Actions Example
Automate your deployments:

\`\`\`yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build
        run: docker build -t app .
      - name: Deploy
        run: docker push app
\`\`\`

## Best Practices

1. Use multi-stage builds
2. Leverage Docker Compose
3. Implement health checks
4. Use secrets management
5. Monitor your deployments

## Conclusion

Docker and CI/CD transform development workflows, enabling faster, more reliable deployments.
    `,
    date: new Date("2023-12-20"),
    category: "DevOps & CI/CD",
    featured: false,
    id: "docker-ci-cd",
    createdAt: new Date("2023-12-20"),
    updatedAt: new Date("2023-12-20"),
  },
  {
    slug: "building-in-public",
    title: "My Journey Building in Public",
    excerpt: "Reflections on sharing my development journey and the lessons learned along the way.",
    content: `
# My Journey Building in Public

Building in public has been one of the most transformative experiences in my development career. Here's what I've learned.

## Why Build in Public?

### Benefits
- Accountability
- Community feedback
- Learning opportunities
- Networking
- Personal brand building

## Challenges

### Vulnerability
Sharing failures and struggles is difficult but valuable:

- Shows authenticity
- Helps others learn
- Builds trust
- Creates connections

### Time Management
Balancing building and sharing:

- Set boundaries
- Batch content creation
- Focus on value
- Don't overthink

## Lessons Learned

1. **Consistency > Perfection**: Regular updates beat perfect posts
2. **Community Matters**: Engage with your audience
3. **Share Process**: People want to see the journey
4. **Be Authentic**: Your unique perspective is valuable

## Tools I Use

- Twitter/X for quick updates
- YouTube for tutorials
- Blog for deep dives
- GitHub for code sharing

## Conclusion

Building in public isn't for everyone, but if you're considering it, start small and stay consistent. The community you build will be invaluable.
    `,
    date: new Date("2023-12-15"),
    category: "Personal",
    featured: false,
    id: "building-in-public",
    createdAt: new Date("2023-12-15"),
    updatedAt: new Date("2023-12-15"),
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="text-center">
          <h1 className="text-4xl font-youth mb-4" style={{ color: "var(--base)" }}>Post Not Found</h1>
          <button
            onClick={() => router.push("/#blog")}
            className="px-6 py-3 rounded-xl font-semibold"
            style={{
              background: "linear-gradient(135deg, var(--orange), var(--purple))",
              color: "var(--bg)",
            }}
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <article className="relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-[70vh] overflow-hidden"
        >
          <div className="relative w-full h-full">
            <Image
              src={`https://picsum.photos/seed/${post.slug}/1920/1080`}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-br opacity-70"
              style={{
                background: "linear-gradient(135deg, var(--purple), var(--orange))",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <motion.button
                onClick={() => router.push("/#blog")}
                className="mb-8 flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-sm"
                style={{
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-d)",
                  color: "var(--base)",
                }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Blog</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border backdrop-blur-sm mb-6"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "var(--bg-d)",
                    color: "var(--orange)",
                  }}
                >
                  <PenTool className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-wide">{post.category}</span>
                </motion.span>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-youth font-bold mb-6 leading-[0.9] tracking-tight" style={{ color: "var(--base)" }}>
                  {post.title}
                </h1>

                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2" style={{ color: "var(--grey)" }}>
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: "var(--grey)" }}>
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">{readingTime} min read</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="prose prose-lg max-w-none"
              style={{
                color: "var(--base)",
              }}
            >
              <div
                className="p-12 rounded-[2.5em] border backdrop-blur-sm mb-12"
                style={{
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-d)",
                }}
              >
                <div
                  className="text-xl leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--base)" }}
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/#{1,6}\s(.+)/g, '<h2 class="text-3xl font-youth font-bold mt-8 mb-4" style="color: var(--base)">$1</h2>')
                      .replace(/\*\*(.+?)\*\*/g, '<strong style="color: var(--orange)">$1</strong>')
                      .replace(/```([^`]+)```/g, '<pre class="p-4 rounded-xl my-4 overflow-x-auto" style="background: var(--bg); border: 1px solid var(--border-subtle)"><code style="color: var(--base)">$1</code></pre>')
                      .replace(/`([^`]+)`/g, '<code class="px-2 py-1 rounded" style="background: var(--bg); color: var(--orange)">$1</code>')
                      .replace(/^\d+\.\s(.+)$/gm, '<li class="ml-6 mb-2" style="color: var(--grey)">$1</li>')
                      .replace(/^-\s(.+)$/gm, '<li class="ml-6 mb-2" style="color: var(--grey)">$1</li>')
                      .replace(/\n\n/g, '</p><p class="mb-4" style="color: var(--base)">')
                      .replace(/^(.+)$/gm, '<p class="mb-4 text-lg leading-relaxed" style="color: var(--base)">$1</p>'),
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-between pt-8 border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <button
                onClick={() => router.push("/#blog")}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-sm font-semibold"
                style={{
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-d)",
                  color: "var(--base)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--orange)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </button>

              <button
                className="flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-sm font-semibold"
                style={{
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-d)",
                  color: "var(--base)",
                }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--orange)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </motion.div>
          </div>
        </div>
      </article>
    </div>
  );
}

