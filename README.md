# 🎂 Nephew Diaries - Birthday Time Capsule

A beautiful digital time capsule application for creating and storing birthday messages that unlock on each birthday. Built with React, TypeScript, and AWS Amplify.

## 🌟 Overview

Nephew Diaries is a special application designed to create a digital time capsule of birthday messages for a loved one. Family members add personalized messages, videos, and memories for specific ages through admin tools, and these messages automatically unlock on each birthday (February 20th).

## ✨ Features

- **🎉 Birthday Countdown**: Real-time countdown to the next birthday
- **🔒 Time-Locked Messages**: Messages unlock automatically on each birthday
- **👨‍👩‍👧‍👦 Family Messages**: Multiple family members can add messages (via admin)
- **📹 Video Support**: Include video messages alongside text
- **🔐 Secure Access**: Simple sign-in for the birthday person
- **📱 Responsive Design**: Beautiful interface that works on all devices
- **🔐 Secure Authentication**: AWS Cognito for user management

## 🏗️ Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: AWS Amplify Gen2
- **Authentication**: Amazon Cognito (sign-in only)
- **Database**: Amazon DynamoDB with GraphQL API
- **Storage**: AWS S3 (for video uploads)
- **Styling**: Modern CSS with beautiful gradients and animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- AWS Account
- AWS Amplify CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nephewdiaries
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Amplify**
   ```bash
   npx amplify init
   npx amplify push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📋 Usage

### For the Birthday Person
1. **Sign in** with your provided credentials
2. **View the countdown** to your next birthday
3. **See unlocked messages** from previous birthdays
4. **Watch videos** and read messages from family
5. **Look forward to** new messages unlocking each year

### For Family Members (Admin Access)
Family members add messages through:
- AWS Amplify Admin UI
- Direct database access
- Custom admin tools

## 🗄️ Database Schema

### BirthdayMessage
- `age`: Integer (age the message is for)
- `title`: String (message title)
- `content`: String (text message)
- `videoUrl`: String (optional video URL)
- `fromFamilyMember`: String (who sent the message)
- `isUnlocked`: Boolean (whether message can be viewed)
- `unlockDate`: String (when message unlocks)
- `createdAt`: String (when message was created)

### User
- `email`: String (user email)
- `name`: String (user name)
- `role`: Enum ('admin', 'family')
- `isActive`: Boolean

## 🎨 Customization

### Changing the Birthday Date
Update the `NEPHEW_BIRTH_DATE` constant in `src/App.tsx`:
```typescript
const NEPHEW_BIRTH_DATE = new Date('2024-02-20'); // Change to your date
```

### Styling
The app uses CSS custom properties for easy theming. Update colors in `src/App.css`:
```css
:root {
  --primary-color: #ff6b6b;
  --secondary-color: #4ecdc4;
  --accent-color: #ffe66d;
  /* ... other colors */
}
```

## 🔧 Deployment

### Deploy to AWS
```bash
npm run build
npx amplify push
npx amplify publish
```

### Environment Variables
- `VITE_APP_AWS_REGION`: AWS region
- `VITE_APP_USER_POOL_ID`: Cognito User Pool ID
- `VITE_APP_USER_POOL_CLIENT_ID`: Cognito Client ID

## 🔐 Security Features

- **Sign-in Only**: No public registration - credentials provided by family
- **Email Verification**: Required for all accounts
- **Strong Passwords**: Enforced password requirements
- **Message Locking**: Messages locked until appropriate birthday
- **User Authentication**: AWS Cognito for secure access

## 📹 Video Support
To add video messages:
1. Upload your video to a service like YouTube, Vimeo, or AWS S3
2. Get the direct video URL
3. Add it to messages through admin tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT-0 License. See the LICENSE file for details.

## 💝 Special Thanks

This application was created with love for a special nephew, turning birthdays into magical moments of discovery and connection with family memories.

---

**Made with ❤️ for family memories that last a lifetime**