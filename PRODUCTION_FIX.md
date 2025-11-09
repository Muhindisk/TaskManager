# Production Deployment Fix - "Failed to Fetch" on Live

## 🎯 Issue: Works Locally, Fails on Live (Render/Vercel)

This is a **CORS and environment configuration** issue.

---

## ✅ Step-by-Step Fix

### Step 1: Update Environment Variables on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Select your **taskmanager-api** service
3. Click **Environment** tab
4. Set/Update these variables:

```
NODE_ENV=production
HOST=0.0.0.0
MONGODB_URI=mongodb+srv://Muhindisk:Sleyking903@cluster0.sspdpre.mongodb.net/taskmanager?appName=Cluster0
JWT_SECRET=527fc83c13e05b792c07f67f80bc77538e62d2fca5c9d0fe982291ceded1c71928f8f9b63525a6033121a831803c1995dc2e09630616551ea6209e82abba826b
CLIENT_URL=https://task-manager-eta-one-18.vercel.app
```

⚠️ **IMPORTANT:** 
- `CLIENT_URL` should be your **frontend Vercel URL** (no trailing slash!)
- Copy it exactly from Vercel dashboard

5. Click **Save Changes**

---

### Step 2: Push Updated Code to GitHub

The server code has been updated with better CORS handling. Push it:

```powershell
git add .
git commit -m "Fix production CORS and environment configuration"
git push origin main
```

Render will automatically redeploy.

---

### Step 3: Update Frontend Environment Variable (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **task-manager** project
3. Go to **Settings** → **Environment Variables**
4. Add/Update:

```
VITE_API_URL=https://your-backend-service.onrender.com/api
```

Replace `your-backend-service` with your actual Render service URL.

**Example:**
```
VITE_API_URL=https://taskmanager-api-abc123.onrender.com/api
```

5. **Redeploy** the frontend:
   - Go to **Deployments** tab
   - Click the 3 dots on latest deployment
   - Click **Redeploy**

---

### Step 4: Verify Backend is Running

Visit your Render backend URL:
```
https://your-backend.onrender.com/api/health
```

Should return:
```json
{
  "status": "success",
  "message": "Task Manager API is running",
  "database": {
    "status": "Connected"
  }
}
```

---

### Step 5: Test Frontend Connection

1. Open your Vercel frontend: `https://task-manager-eta-one-18.vercel.app`
2. Press **F12** → **Console** tab
3. Try to register/login
4. Check for errors

**Expected:** No CORS errors, successful API calls

---

## 🔍 Find Your Service URLs

### Backend URL (Render):
1. Go to Render dashboard
2. Click your service
3. Look at the top for: `https://your-service.onrender.com`
4. Your API health: `https://your-service.onrender.com/api/health`

### Frontend URL (Vercel):
1. Go to Vercel dashboard
2. Click your project
3. Look for the deployment URL: `https://your-project.vercel.app`

---

## 🐛 Common Production Issues

### Issue 1: CORS Error on Live Site

**Error in browser console:**
```
Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS
```

**Fix:**
1. Check `CLIENT_URL` in Render matches your Vercel URL **exactly**
2. No trailing slash in `CLIENT_URL`
3. Both URLs must use `https://` in production
4. Redeploy backend after changing `CLIENT_URL`

---

### Issue 2: "Failed to fetch" / Network Error

**Causes:**
- Backend is not running
- Wrong API URL in frontend
- Backend crashed

**Fix:**

1. **Check backend is running:**
   ```
   https://your-backend.onrender.com/api/health
   ```
   Should return JSON, not an error page

2. **Check Render logs:**
   - Render Dashboard → Your Service → Logs
   - Look for errors (red text)
   - Check for "MongoDB Connected"

3. **Check frontend API URL:**
   - Vercel Dashboard → Settings → Environment Variables
   - `VITE_API_URL` should point to Render backend
   - Should end with `/api` not `/`

---

### Issue 3: MongoDB Not Connected on Render

**Render logs show:**
```
❌ Error connecting to MongoDB
⚠️  MongoDB disconnected
```

**Fix:**
1. MongoDB Atlas → Network Access
2. Make sure `0.0.0.0/0` (all IPs) is allowed
3. Verify `MONGODB_URI` in Render includes:
   - Correct username
   - Correct password (URL-encoded if special chars)
   - Database name: `taskmanager`
4. Restart Render service

---

### Issue 4: Environment Variables Not Loading

**Symptoms:**
- Backend works locally but not on Render
- `undefined` errors in logs

**Fix:**
1. Double-check ALL environment variables are set in Render
2. No typos in variable names
3. Click "Save Changes" after adding variables
4. Manually trigger a redeploy

---

### Issue 5: 404 on API Endpoints

**Error:** `Cannot GET /api/auth/login`

**Fix:**
1. Check `rootDirectory: ./server` in render.yaml
2. Verify build/start commands:
   - Build: `npm install`
   - Start: `npm start`
3. Check Render logs for route registration errors

---

## ✅ Production Deployment Checklist

### Backend (Render):
- [ ] Service is deployed and showing "Live" (green)
- [ ] Environment variables are set (NODE_ENV, MONGODB_URI, JWT_SECRET, CLIENT_URL)
- [ ] Health endpoint returns 200: `/api/health`
- [ ] Logs show "MongoDB Connected"
- [ ] Logs show "Server running"
- [ ] No errors in logs
- [ ] `CLIENT_URL` matches Vercel frontend URL (no trailing slash)

### Frontend (Vercel):
- [ ] Deployment successful
- [ ] Environment variable `VITE_API_URL` points to Render backend
- [ ] `VITE_API_URL` ends with `/api`
- [ ] Site loads without errors
- [ ] Can see the app UI

### MongoDB Atlas:
- [ ] Cluster is running (not paused)
- [ ] Network Access allows `0.0.0.0/0`
- [ ] Database user exists with correct password
- [ ] Connection string is correct

### Testing:
- [ ] Can access backend health endpoint in browser
- [ ] Can access frontend in browser
- [ ] No CORS errors in browser console
- [ ] Can register new user
- [ ] Can login
- [ ] Can create/view tasks

---

## 🧪 Test Production Connection

### Test 1: Backend Health
```bash
curl https://your-backend.onrender.com/api/health
```

Should return JSON with `"status": "success"`

### Test 2: Frontend to Backend
1. Open frontend: `https://your-frontend.vercel.app`
2. Open DevTools (F12) → Console
3. Run:
```javascript
fetch('https://your-backend.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

Should log the health response, not an error.

### Test 3: Full Flow
1. Try to register a new account
2. Check browser console for errors
3. Check Render logs for requests
4. Login with the account
5. Create a task

---

## 📊 Expected Configuration

### Render Environment Variables:
```
NODE_ENV=production
HOST=0.0.0.0
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=<your-64-char-secret>
CLIENT_URL=https://your-frontend.vercel.app
```

### Vercel Environment Variables:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### Important:
- URLs use `https://` in production
- No trailing slashes
- `VITE_API_URL` ends with `/api`
- `CLIENT_URL` does NOT end with `/api`

---

## 🔄 Redeploy After Changes

### Redeploy Backend (Render):
1. Push code to GitHub: `git push origin main`
2. Render auto-deploys
3. Or manually: Render Dashboard → Manual Deploy → Deploy latest commit

### Redeploy Frontend (Vercel):
1. After changing environment variables
2. Vercel Dashboard → Deployments
3. Click ⋯ on latest → Redeploy

---

## 🚨 Emergency: Check Render Logs

If nothing works:

1. Render Dashboard → Your Service → **Logs**
2. Look for:
   - ✅ "Server running"
   - ✅ "MongoDB Connected"
   - ❌ Any red error messages
3. Common errors:
   - MongoDB connection timeout → Fix Network Access
   - CORS errors → Check CLIENT_URL
   - Module not found → Check rootDirectory

---

## 💡 Pro Tips

1. **Test backend independently first**
   - Make sure health endpoint works
   - Before testing frontend connection

2. **Check browser DevTools Network tab**
   - See actual requests being made
   - Check request/response headers
   - Look for CORS headers

3. **Use environment-specific URLs**
   - Local: `http://localhost:5000`
   - Production: `https://your-service.onrender.com`
   - Don't mix them!

4. **Render Free Tier**
   - Spins down after 15 min inactivity
   - First request takes 30-60 seconds
   - Normal behavior, not an error

---

## 📞 Still Not Working?

Share these details:
1. Render backend URL
2. Vercel frontend URL
3. Error message from browser console
4. Render logs (last 50 lines)
5. Vercel deployment logs
6. Screenshot of CORS error (if applicable)

The issue is usually:
- Wrong `CLIENT_URL` in Render (most common)
- Wrong `VITE_API_URL` in Vercel
- MongoDB not accessible
- Render service crashed/not running
