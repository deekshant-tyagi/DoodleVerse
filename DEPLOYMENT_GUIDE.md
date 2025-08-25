# 🚀 DoodleVerse Deployment Guide

## Overview
This guide will help you deploy DoodleVerse with:
- **Frontend**: Netlify (React + Vite)
- **Backend**: Render (Express.js + Socket.io)
- **Database**: MongoDB Atlas (already configured)

## 📋 Prerequisites
- GitHub account
- Netlify account
- Render account
- Your MongoDB Atlas connection string

## 🔧 Step 1: Backend Deployment on Render

### 1.1 Push Code to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 1.2 Deploy on Render
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `doodleverse-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier is fine for testing

### 1.3 Set Environment Variables on Render
In your Render dashboard, go to Environment tab and add:
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://deekshanttyagii:Kn78AyJUNoOb839Q@cluster0.llq7g.mongodb.net/doodleProject?retryWrites=true&w=majority
JWT_SECRET=deekshantTyagi
FRONTEND_URL=https://your-app-name.netlify.app
```

**⚠️ Important**: Replace `https://your-app-name.netlify.app` with your actual Netlify URL after frontend deployment.

### 1.4 Deploy
Click "Create Web Service" and wait for deployment to complete.
Note your backend URL: `https://your-backend-app.onrender.com`

## 🌐 Step 2: Frontend Deployment on Netlify

### 2.1 Update Production Environment
Edit `frontend/.env.production` with your actual URLs:
```env
VITE_API_URL=https://your-backend-app.onrender.com
VITE_SOCKET_URL=https://your-backend-app.onrender.com
VITE_FRONTEND_URL=https://your-app-name.netlify.app
```

### 2.2 Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

### 2.3 Set Environment Variables on Netlify
In Netlify dashboard, go to Site settings → Environment variables:
```
VITE_API_URL=https://your-backend-app.onrender.com
VITE_SOCKET_URL=https://your-backend-app.onrender.com
VITE_FRONTEND_URL=https://your-app-name.netlify.app
```

### 2.4 Deploy
Click "Deploy site" and wait for deployment.

## 🔄 Step 3: Update Backend CORS

After frontend deployment:
1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable with your actual Netlify URL
3. Redeploy the backend service

## ✅ Step 4: Testing

Test these features:
- [ ] User registration/login
- [ ] Dashboard loads with user data
- [ ] Create new whiteboard
- [ ] Join existing whiteboard
- [ ] Real-time drawing synchronization
- [ ] Chat functionality
- [ ] Save/load drawings

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure `FRONTEND_URL` in backend matches your Netlify URL exactly
2. **Socket.io Connection Failed**: Check that both `VITE_SOCKET_URL` and backend CORS are configured correctly
3. **API Calls Failing**: Verify `VITE_API_URL` points to your Render backend URL
4. **Build Failures**: Check that all environment variables are set correctly

### Logs:
- **Backend logs**: Available in Render dashboard
- **Frontend logs**: Available in Netlify dashboard → Functions tab

## 🎯 Production URLs Structure

After deployment, your URLs should look like:
- **Frontend**: `https://doodleverse-app.netlify.app`
- **Backend**: `https://doodleverse-backend.onrender.com`
- **API Endpoints**: `https://doodleverse-backend.onrender.com/api/v1/...`

## 🔐 Security Notes

- JWT secret is currently hardcoded - consider using a more secure secret in production
- MongoDB credentials are exposed - consider using environment variables for database connection
- Add rate limiting for production use
- Consider implementing HTTPS redirects

## 📱 Next Steps

After successful deployment:
1. Test all functionality thoroughly
2. Set up monitoring and error tracking
3. Configure custom domain names (optional)
4. Set up CI/CD pipelines for automatic deployments
5. Implement proper logging and analytics
