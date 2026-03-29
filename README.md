# 🚀 ERIS Intelligence: Smart HR & Resource Allocation System

**ERIS Intelligence** is an enterprise-grade SaaS application designed to help HR teams make data-driven decisions. The system leverages the **GitHub REST API** to automatically track, verify, and map employee coding skills based on their real-world contributions.

---

## 🌟 Key Features

* **🎯 Smart Resource Allocation:** HR can search for any technology (e.g., React, Java, Python) to instantly identify and rank the best-performing experts within the company.
* **🔄 Auto-Skill Mapping:** Seamless integration with GitHub to scan employee repositories, analyze primary languages, and sync proficiency levels directly to the database.
* **🛡️ Role-Based Access Control (RBAC):**
    * **HR/Admin:** Access to the full command center, employee management, and advanced resource filtering.
    * **Employee:** Personalized dashboard showing individual work summaries, assigned projects, and current skill growth.
* **🔑 Secure Authentication:** Implemented stateless security using **JSON Web Tokens (JWT)** for secure login and session management.
* **🎨 Premium Dark UI:** A modern, high-performance dashboard featuring glowing glassmorphism cards, real-time statistics, and smooth Framer Motion-like animations.

---

## 🛠️ Tech Stack

### **Frontend**
* **React.js (Vite)** - For a lightning-fast UI and modular component architecture.
* **Tailwind CSS** - Custom utility-first styling for a premium dark theme.
* **Lucide React** - High-quality consistent iconography.
* **React Router** - Managing Single Page Application (SPA) navigation.

### **Backend**
* **Java (Spring Boot)** - Robust and scalable REST API development.
* **Spring Security** - Advanced JWT-based authentication and authorization.
* **Spring Data JPA** - Efficient Object-Relational Mapping (ORM) for data persistence.
* **MySQL** - Reliable relational data storage.

---

## 🏗️ Practical Implementation

1.  **Authentication Flow:** User submits credentials via the React UI. The Backend validates them and issues a JWT containing the user's `Role` and `ID`.
2.  **Dynamic Authorization:** The Frontend Sidebar dynamically filters menu items based on the decoded JWT role (HR vs. Employee).
3.  **The Sync Engine:** When "Auto-Sync" is triggered, the Backend fetches repository metadata from GitHub, calculates project frequency, and updates the `UserSkill` records.
4.  **Ranking Logic:** The Smart Filter uses custom JPA queries to rank engineers by balancing their `ProficiencyLevel` and `ProjectsCompleted`.

---

## ⚙️ Installation & Setup

### **Backend Configuration**
1.  Update your MySQL credentials in `src/main/resources/application.properties`.
2.  Run `mvn clean install` to download dependencies.
3.  Execute `ErisIntelligenceApplication.java` to start the server.

### **Frontend Configuration**
1.  Navigate to the frontend directory: `cd frontend`.
2.  Install dependencies: `npm install`.
3.  Start the development server: `npm run dev`.

---

**Developed by:** Aaditya Saini 🚀
