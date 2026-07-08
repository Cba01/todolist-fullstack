# Todo App Fullstack

Aplicación fullstack moderna para gestión de tareas, desarrollada con **React + Django REST Framework**, con autenticación JWT y desplegada en producción.

---

## Demo en vivo

🔗 Frontend: https://todolist-fullstack-mu.vercel.app/
🔗 Backend API: https://todolist-fullstack-vjxk.onrender.com/api/

---

## Features

* 🔐 Autenticación con JWT (login/register)
* 👤 Usuario persistente
* ✅ CRUD de tareas
* 🎨 UI moderna con Tailwind CSS
* 🎬 Animaciones suaves con Framer Motion
* 🔄 Persistencia de sesión
* 🔒 Rutas protegidas

---

## Tecnologías

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* Framer Motion

### Backend

* Django
* Django REST Framework
* Simple JWT

### Deploy

* Vercel (Frontend)
* Render (Backend)

---

##  Screenshots

### Login



### Tasks



---

## Instalación local

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Variables de entorno

Frontend:

```env
VITE_API_URL=http://127.0.0.1:8000/api/
```

---

## Arquitectura

* React maneja UI y estado global (AuthContext)
* Django REST expone API
* JWT maneja autenticación
* Axios intercepta requests

---

## Autor

Sebastian Chuquimia
