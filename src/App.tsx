import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import './App.css';

const client = generateClient<Schema>();

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'family';
  isActive: boolean;
}

interface BirthdayMessage {
  id: string;
  age: number;
  title: string;
  content: string;
  videoUrl?: string;
  fromFamilyMember: string;
  isUnlocked: boolean;
  unlockDate: string;
  createdAt: string;
}

interface BirthdayCountdown {
  id: string;
  currentAge: number;
  nextBirthday: string;
  daysUntilBirthday: number;
  birthDate: string;
}

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<BirthdayMessage[]>([]);
  const [countdown, setCountdown] = useState<BirthdayCountdown | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthState();
  }, []);

  // Update countdown every second
  useEffect(() => {
    if (countdown) {
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [countdown]);

  const checkAuthState = async () => {
    try {
      const savedUser = localStorage.getItem('nephewDiariesUser');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        await loadMessages();
        await loadCountdown();
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    setSignInError('');

    try {
      // Find user in DynamoDB
      const { data: users } = await client.models.User.list({
        filter: {
          email: { eq: email },
          isActive: { eq: true }
        }
      });

      if (users.length === 0) {
        setSignInError('User not found or inactive');
        return;
      }

      const foundUser = users[0];
      
      // Check password from User model
      if (password !== foundUser.password) {
        setSignInError('Invalid password');
        return;
      }

      // Save user to localStorage
      localStorage.setItem('nephewDiariesUser', JSON.stringify(foundUser));
      setUser(foundUser);
      
      // Load data
      await loadMessages();
      await loadCountdown();
      
    } catch (error) {
      console.error('Sign in error:', error);
      setSignInError('Sign in failed. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('nephewDiariesUser');
    setUser(null);
    setMessages([]);
    setCountdown(null);
  };

  const loadMessages = async () => {
    try {
      const { data: messageData } = await client.models.BirthdayMessage.list();
      setMessages(messageData);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const loadCountdown = async () => {
    try {
      const { data: countdownData } = await client.models.BirthdayCountdown.list();
      if (countdownData.length > 0) {
        setCountdown(countdownData[0]);
      } else {
        // Create default countdown if none exists
        const birthDate = '2024-02-20';
        const currentDate = new Date();
        const birthDateObj = new Date(birthDate);
        const nextBirthday = new Date(currentDate.getFullYear(), 1, 20); // February 20
        
        if (nextBirthday < currentDate) {
          nextBirthday.setFullYear(currentDate.getFullYear() + 1);
        }
        
        const currentAge = nextBirthday.getFullYear() - birthDateObj.getFullYear();
        const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        const newCountdown = await client.models.BirthdayCountdown.create({
          currentAge,
          nextBirthday: nextBirthday.toISOString(),
          daysUntilBirthday,
          birthDate
        });
        
        setCountdown(newCountdown.data);
      }
    } catch (error) {
      console.error('Error loading countdown:', error);
    }
  };

  const updateCountdown = () => {
    if (!countdown) return;
    
    const now = new Date();
    const nextBirthday = new Date(countdown.nextBirthday);
    const diff = nextBirthday.getTime() - now.getTime();
    
    if (diff > 0) {
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ months, days, hours, minutes, seconds });
    }
  };

  const MessageCard = ({ message }: { message: BirthdayMessage }) => (
    <div className={`message-card ${message.isUnlocked ? 'unlocked' : 'locked'}`}>
      <div className="message-header">
        <h3>{message.title}</h3>
        <span className="age-badge">Age {message.age}</span>
      </div>
      <div className="message-content">
        {message.isUnlocked ? (
          <>
            <p>{message.content}</p>
            {message.videoUrl && (
              <div className="video-container">
                <video controls>
                  <source src={message.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <p className="from-family">From: {message.fromFamilyMember}</p>
          </>
        ) : (
          <div className="locked-message">
            <p>🔒 This message will unlock on your {message.age}th birthday!</p>
            <p className="unlock-date">Unlocks: {new Date(message.unlockDate).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );

  const CountdownTimer = () => (
    <div className="countdown-timer">
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.months}</div>
        <div className="countdown-label">Months</div>
      </div>
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.days}</div>
        <div className="countdown-label">Days</div>
      </div>
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.hours}</div>
        <div className="countdown-label">Hours</div>
      </div>
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.minutes}</div>
        <div className="countdown-label">Minutes</div>
      </div>
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.seconds}</div>
        <div className="countdown-label">Seconds</div>
      </div>
    </div>
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <h2>🎂 Loading Nephew Diaries...</h2>
          <p>Please wait while we prepare your birthday messages!</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app">
        <div className="header">
          <h1>🎂 Nephew Diaries</h1>
          <p>A Birthday Time Capsule</p>
          <p className="signin-note">Sign in with your provided credentials to see your birthday messages!</p>
        </div>
        
        <div className="signin-container">
          <div className="matrix-border">
            <form onSubmit={handleSignIn} className="login-form">
              <h2>Sign In</h2>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              
              <button type="submit" disabled={isSigningIn} className="signin-btn">
                {isSigningIn ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
          
          {signInError && (
            <div className="error-message">
              <p>❌ {signInError}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="nav-left">
          <h1>🎂 Nephew Diaries</h1>
        </div>
        <div className="nav-center">
          <span className="current-age">Age: {countdown?.currentAge}</span>
        </div>
        <div className="nav-right">
          <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Section with Countdown */}
        <div className="hero-section">
          <div className="hero-content">
            <h2>🎉 Countdown to Your Next Birthday!</h2>
            <p className="birthday-date">February 20, {new Date(countdown?.nextBirthday || '').getFullYear()}</p>
            <CountdownTimer />
          </div>
        </div>

        {/* Messages Section */}
        <div className="messages-section">
          <h2>📝 Your Birthday Messages</h2>
          {messages.length === 0 ? (
            <div className="no-messages">
              <p>No birthday messages yet. Check back later!</p>
              <p className="note">Family members are preparing special messages for you! 🎁</p>
            </div>
          ) : (
            <div className="messages-grid">
              {messages
                .sort((a, b) => a.age - b.age)
                .map((message) => (
                  <MessageCard key={message.id} message={message} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
