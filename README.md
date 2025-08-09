# Wanderlust

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  
A full-stack MERN (MongoDB, Express, React, Node.js) web application for sharing and browsing travel listings.

##  Live Demo  
Check out the deployed version: [Wanderlust Live Listings](https://wanderlust-2-6mua.onrender.com/listings)

##  Features

-  **User Authentication**: Secure signup/login/logout functionality (e.g., using JWT or Passport.js).
-  **Travel Listings**: Users can browse, create, update, and delete travel listings (destinations, accommodations, etc.).
-  **Image Uploads**: Upload and manage photos for each listing (e.g., via Cloudinary or similar).
-  **Search & Filtering**: Search listings by location, title, or apply filters (possibly by category or rating).
-  **Responsive Design**: Mobile-first layout, optimized for all devices.

##  Tech Stack

| Layer        | Technologies                                |
|--------------|---------------------------------------------|
| **Frontend** | React (or EJS/HTML/CSS if using server-side templates), Bootstrap/Tailwind CSS |
| **Backend**  | Node.js with Express.js                      |
| **Database** | MongoDB (via Mongoose ORM)                   |
| **Cloud**    | Cloudinary (image storage), Render (deployment) |
| **Authentication** | JWT or Passport.js                    |

*(Adjust the specifics depending on your implementation details.)*

##  Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later recommended)  
- npm (comes with Node.js)  
- MongoDB (local or Atlas cluster)  
- (Optional) Cloudinary account for image hosting

### Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/vaibhavshukla-codes/Wanderlust.git
   cd Wanderlust
