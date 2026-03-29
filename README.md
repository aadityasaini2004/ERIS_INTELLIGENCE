# 🚀 ERIS Intelligence: Smart HR & Resource Allocation System

**ERIS Intelligence** ek enterprise-grade SaaS application hai jo HR teams ko data-driven decision lene mein madad karta hai. Yeh system **GitHub API** ka use karke employees ki coding skills ko automatically track aur verify karta hai.

---

## 🌟 Key Features

* **🎯 Smart Resource Allocation:** HR kisi bhi skill (e.g., React, Java) ko search karke company ke best-performing employees ko filter kar sakta hai.
* **🔄 Auto-Skill Mapping:** GitHub API integration se employee ke repositories scan hote hain aur unki skills automatically database mein sync ho jati hain.
* **🛡️ Role-Based Access Control (RBAC):**
    * **HR/Admin:** Pura dashboard, employee management, aur smart filters access kar sakte hain.
    * **Employee:** Sirf apna personal work summary, assigned projects, aur skill level dekh sakte hain.
* **🔑 Secure Authentication:** JSON Web Tokens (JWT) ka use karke stateless aur secure login system.
* **🎨 Premium Dark UI:** Modern dashboard jisme glowing cards, real-time stats, aur sleek animations hain (Tailwind CSS).

---

## 🛠️ Tech Stack

### **Frontend**
* **React.js (Vite)** - Fast development aur modern architecture.
* **Tailwind CSS** - Custom styling aur premium dark theme.
* **Lucide React** - Professional icons.
* **React Router** - Single Page Application (SPA) navigation.

### **Backend**
* **Java (Spring Boot)** - Robust REST API development.
* **Spring Security** - JWT based authentication aur authorization.
* **Spring Data JPA** - Database interaction.
* **MySQL** - Relational data storage.

---

## 🏗️ Practical Implementation

1.  **Authentication:** User login karta hai, Backend JWT generate karta hai jisme user ka `Role` encoded hota hai.
2.  **Authorization:** React Sidebar sirf wahi options dikhata hai jo user ke role ke liye allowed hain.
3.  **Skill Sync:** Jab "Auto-Sync" trigger hota hai, Backend GitHub se repos fetch karke languages analyze karta hai.
4.  **Team Filtering:** Backend JPA queries ke through `ProficiencyLevel` aur `ProjectsCompleted` ke base par top employees ko rank karta hai.

---

## ⚙️ Installation & Setup

### **Backend Setup**
1. Update MySQL credentials in `application.properties`.
2. Run `mvn clean install`.
3. Start `ErisIntelligenceApplication.java`.

### **Frontend Setup**
1. `cd frontend/react`
2. `npm install`
3. `npm run dev`

---

**Developed by:** Aaditya Saini 🚀
