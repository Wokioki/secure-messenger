# 🔐 Secure Messenger (React + Spring Boot + PostgreSQL)

A secure chat application built with **React** (frontend), **Spring Boot** (backend), and **PostgreSQL** database.  
Users can **register**, **log in**, select other users, and **exchange encrypted messages** in real-time.

---

## ✨ Features

- 🔑 User registration and login  
- 🔐 AES-encrypted message storage  
- 🗨️ Decrypted messages shown in the chat window  
- 📧 User-to-user messaging interface  
- 🔁 Auto-refreshing chat (polling)  
- 🌐 CORS configured for secure frontend-backend communication  
- ⚙️ Environment variables for deployment

---

## 🧰 Tech Stack

### 🖥️ Frontend (React)
- React
- Axios
- CSS (custom responsive UI)

### 🔧 Backend (Spring Boot)
- Java 17 + Spring Boot 3
- Spring Security + BCrypt
- Spring Data JPA
- PostgreSQL
- AES encryption (`javax.crypto`)
- Global CORS filter

---

## 🚀 Deployment

| Component   | Platform |
|-------------|----------|
| Frontend    | [Vercel] |
| Backend     | [Render] |
| Database    | PostgreSQL (Render) |
