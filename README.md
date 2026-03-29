🚀 ERIS Intelligence: Smart HR & Resource Allocation System
ERIS Intelligence ek enterprise-grade SaaS application hai jo HR teams ko data-driven decision lene mein madad karta hai. Yeh system GitHub API ka use karke employees ki coding skills ko automatically track aur verify karta hai.

🌟 Key Features
Smart Resource Allocation (The Brain): HR kisi bhi skill (e.g., React, Java) ko search karke company ke best-performing employees ko filter kar sakta hai.

Auto-Skill Mapping: GitHub API integration se employee ke repositories scan hote hain aur unki skills automatically database mein sync ho jati hain.

Role-Based Access Control (RBAC): * HR/Admin: Pura dashboard, employee management, aur smart filters access kar sakte hain.

Employee: Sirf apna personal work summary, assigned projects, aur skill level dekh sakte hain.

Secure Authentication: JSON Web Tokens (JWT) ka use karke stateless aur secure login system.

Premium Dark UI: Modern dashboard jisme glowing cards, real-time stats, aur sleek animations hain (Tailwind CSS).

🛠️ Tech Stack
Frontend
React.js (Vite) - Fast development aur modern architecture.

Tailwind CSS - Custom styling aur premium dark theme.

Lucide React - Professional icons.

React Router - Single Page Application (SPA) navigation.

Backend
Java (Spring Boot) - Robust REST API development.

Spring Security - JWT based authentication aur authorization.

Spring Data JPA - Database interaction.

MySQL - Relational data storage.

External APIs
GitHub REST API - Real-time repository scanning aur profile fetching.

🏗️ Practical Implementation (How it Works)
Authentication: User login karta hai, Backend JWT generate karta hai jisme user ka Role (HR/Employee) encoded hota hai.

Authorization: React Sidebar sirf wahi options dikhata hai jo user ke role ke liye allowed hain.

Skill Sync: Jab "Auto-Sync" trigger hota hai, Backend GitHub se repos fetch karta hai, languages analyze karta hai, aur UserSkill table ko update karta hai.

Team Filtering: HR jab search karta hai, Backend ek complex JPA query chalta hai jo ProficiencyLevel aur ProjectsCompleted ke base par top employees ko rank karti hai.

⚙️ Installation & Setup
Prerequisites
Java 17+

Node.js (v18+)

MySQL Server

Backend Setup
src/main/resources/application.properties mein apni MySQL credentials update karein.

Maven dependencies install karein.

ErisIntelligenceApplication.java run karein.

Frontend Setup
cd frontend/react

npm install

npm run dev

📸 Screenshots
Tip: Yahan apne project ke screenshots ki links ya images folder ka path daal dena.

Login Page: Secured with JWT.

HR Dashboard: Company-wide stats.

Employee Dashboard: Personal work summary.

Smart Filter: Ranking engineers based on skills.

📜 Database Schema Overview
Users Table: Store names, emails, passwords, roles, and designations.

Skills Table: Master list of all technologies.

User_Skills Table: Mapping table with proficiency levels and project counts.

Developed by: Aaditya Saini 🚀
