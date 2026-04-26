# Software Requirements Specification (SRS)
## For "No Limit Gym" Management & Workout Booking System

### 1. Introduction
**1.1 Purpose**
The purpose of this document is to outline the software requirements for the "No Limit Gym" web application. This application serves as a comprehensive platform connecting gym members with elite fitness trainers, streamlining the process of discovering trainers, booking workout sessions, and managing training schedules.

**1.2 Scope**
The No Limit Gym platform provides distinct portals for three primary user roles:
*   **Members**: Can browse trainers based on specialties (Yoga, Cardio, Strength, CrossFit), book training sessions, and track their booking statuses and personalized workout plans.
*   **Trainers (Coaches)**: Have access to a dedicated dashboard to manage incoming booking requests, approve/reject sessions, and assign customized workout plans to members.
*   **Admins**: Possess global oversight to manage user data, system settings, and overall platform health.

### 2. Overall Description
**2.1 Product Perspective**
The system is a modern, responsive Single Page Application (SPA) built on the MERN stack (MongoDB, Express.js, React, Node.js). It utilizes a RESTful API architecture for seamless client-server communication and JSON Web Tokens (JWT) for secure authentication.

**2.2 User Classes and Characteristics**
*   **General Visitors**: Unregistered users who can view the home page, about page, contact details, and browse available trainers.
*   **Registered Members**: Users who have created an account and can actively request training sessions.
*   **Registered Trainers**: Fitness professionals authorized to accept bookings and provide workout regimens.
*   **System Administrators**: Super-users with unrestricted access to the administrative dashboard.

**2.3 Operating Environment**
*   **Frontend**: Any modern web browser (Chrome, Safari, Firefox, Edge).
*   **Backend**: Node.js runtime environment (hosted on Render).
*   **Database**: MongoDB (hosted on MongoDB Atlas).

### 3. System Features & Functional Requirements

**3.1 Authentication & Authorization**
*   **FR-1**: The system shall allow users to register with an email, password, and designated role (Member or Trainer).
*   **FR-2**: The system shall authenticate users using JWT and store tokens securely in local storage.
*   **FR-3**: The system shall provide role-based access control, preventing Members from accessing the Trainer or Admin dashboards.

**3.2 Member Booking Flow**
*   **FR-4**: The system shall display a dynamic grid of registered trainers, filterable by workout category.
*   **FR-5**: Members shall be able to view a trainer's detailed profile (Bio, Experience, Rating).
*   **FR-6**: Members shall be able to submit a session request specifying date, time, and a custom message.
*   **FR-7**: Members shall have a "My Bookings" dashboard to track the real-time status of their requests (Pending, Confirmed, Rejected) and view assigned workout plans.

**3.3 Trainer Dashboard**
*   **FR-8**: Trainers shall have a dedicated Kanban-style dashboard displaying all incoming booking requests.
*   **FR-9**: Trainers shall be able to write and attach a custom text-based workout plan to a pending request.
*   **FR-10**: Trainers shall be able to update the status of a request to either "Confirmed" or "Rejected".

### 4. Non-Functional Requirements

**4.1 Performance Requirements**
*   The web interface shall employ dynamic loading states (Spinners/Skeletons) to ensure perceived performance during API calls.
*   The application shall use React Router for instantaneous client-side navigation without full page reloads.

**4.2 Security Requirements**
*   All API endpoints handling sensitive data or booking modifications must be protected by a backend authentication middleware verifying JWT validity.
*   Passwords must be securely hashed before being stored in the database.

**4.3 Design & UI/UX Standards**
*   The interface shall utilize a premium, dark-mode aesthetic with vibrant orange accents.
*   The UI shall be fully responsive across mobile, tablet, and desktop viewports using Tailwind CSS.
*   Micro-animations and layout transitions shall be implemented via Framer Motion to enhance interactivity.

### 5. Technology Stack
*   **Frontend Framework**: React.js (via Vite)
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion, React-Parallax-Tilt
*   **Routing**: React Router DOM
*   **HTTP Client**: Axios
*   **Backend Environment**: Node.js & Express.js
*   **Database**: Mongoose & MongoDB
*   **Authentication**: JSON Web Tokens (JWT) & bcryptjs
