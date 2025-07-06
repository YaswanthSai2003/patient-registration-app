# Challenges Faced During Development

## 1. Learning PGlite and IndexedDB

I had never used PGlite before, so understanding how it stores data in the browser using IndexedDB was a new experience. Figuring out how to create the database, handle async functions, and persist data across sessions was tricky at first.

## 2. Synchronizing Multiple Tabs

One requirement was that the app should work correctly even if multiple tabs are open. I had to make sure changes in one tab reflect in another. This was solved by understanding how PGlite manages local state and ensuring functions always call `ensure()` before accessing data.

## 3. Sidebar and Topbar Design

Designing a clean and professional UI using Tailwind CSS was a challenge. I tried different color combinations and layout structures to make it visually appealing and responsive. Adding collapsible sidebar and transitions took time to get right.

## 4. Form Validation and UX

Making the patient registration form user-friendly was important. I worked on improving keyboard navigation (like pressing "Enter" to move between fields), showing previews, and displaying errors in a noticeable but non-intrusive way.

## 5. Git Commit History

One of the requirements was to make individual commits for each feature. I had to be more mindful about how I structured my code changes and ensure that each commit focused on one thing at a time.

## 6. Deployment

I wasn’t very familiar with Netlify or Vercel, so figuring out how to deploy a Vite + React app was a new skill I learned. I chose Vercel in the end because of its simplicity and fast setup.

This project helped me learn not just frontend skills but also how to organize and present a complete working app with clean code, UI, and deployment.
