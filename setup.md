# 🚀 Nephew Diaries Setup Guide

## Quick Start

### 1. Deploy the Backend
```bash
# Navigate to your project directory
cd nephewdiaries

# Deploy the Amplify backend
npx amplify push
```

### 2. Start the Development Server
```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

### 3. Create Admin Account
1. Open the app in your browser
2. Click "Create Account" 
3. Use email: `admin@nephewdiaries.com` (or your preferred admin email)
4. Complete the signup process
5. Verify your email

### 4. Add Your First Birthday Message
1. Sign in with your admin account
2. Click "➕ Add New Message"
3. Fill in the details:
   - **Age**: 1 (for first birthday)
   - **Title**: "Your First Birthday!"
   - **Message**: Write a heartfelt message
   - **Video URL**: (optional) Add a video link
4. Click "Add Message"

## 🎯 Key Features to Test

### Birthday Countdown
- The app automatically calculates days until the next birthday
- Shows current age and next birthday date

### Message Locking/Unlocking
- Messages for future birthdays are locked with a countdown
- Messages for past birthdays are unlocked and viewable
- The system automatically unlocks messages on February 20th each year

### Admin Features
- Only admin users can add new messages
- Admin users can see all messages (locked and unlocked)
- Regular users can only see unlocked messages

## 🔧 Customization Options

### Change Birthday Date
Edit `src/App.tsx` line 9:
```typescript
const NEPHEW_BIRTH_DATE = new Date('2024-02-20'); // Change to your date
```

### Change Admin Email
Edit `src/App.tsx` line 25:
```typescript
setIsAdmin(currentUser.username === 'admin@nephewdiaries.com'); // Change email
```

### Add More Family Members
1. Have family members sign up with their own emails
2. You can modify the admin logic to include multiple admin emails
3. Or create a separate admin management system

## 📱 Mobile Responsive
The app is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Styling
The app uses a warm, family-friendly color scheme:
- Primary: Coral red (#ff6b6b)
- Secondary: Turquoise (#4ecdc4)
- Accent: Warm yellow (#ffe66d)

You can customize colors in `src/App.css` under the `:root` section.

## 🔐 Security Features
- Email verification required for all accounts
- Strong password requirements
- User authentication with AWS Cognito
- Messages are locked until the appropriate birthday

## 📹 Video Support
To add video messages:
1. Upload your video to a service like YouTube, Vimeo, or AWS S3
2. Get the direct video URL
3. Add it to the "Video URL" field when creating a message

## 🚨 Troubleshooting

### Common Issues

**"No user signed in" error**
- Make sure you're signed in with a valid account
- Check that email verification is complete

**Messages not showing**
- Ensure the backend is deployed (`npx amplify push`)
- Check browser console for errors
- Verify your user has the correct permissions

**Countdown not updating**
- Refresh the page to recalculate the countdown
- Check that the birth date is set correctly

### Getting Help
1. Check the browser console for error messages
2. Verify your AWS Amplify configuration
3. Ensure all dependencies are installed

## 🎉 Ready to Use!

Your Nephew Diaries birthday time capsule is now ready! Family members can start adding messages for future birthdays, and your nephew will have a magical experience discovering new messages each year on February 20th.

---

**Happy Birthday Planning! 🎂✨**
