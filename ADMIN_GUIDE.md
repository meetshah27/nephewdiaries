# 👑 Admin Guide - User Management & Birthday Messages

## Overview
This guide helps you manage user accounts and add birthday messages for the nephew through AWS Amplify Admin UI.

## 🚀 Accessing Admin UI

### Method 1: AWS Amplify Console
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Select your app
3. Go to **Backend environments** → **Admin UI**
4. Sign in with your AWS credentials

### Method 2: Direct URL
```
https://[your-app-id].amplifyapp.com/admin
```

## 👥 User Management - Creating Accounts

### Step 1: Access User Management
1. In Admin UI, click on **Data** in the left sidebar
2. Select **User** from the table list
3. Click **Create item**

### Step 2: Create User Account
Fill in the user details:

| Field | Description | Example |
|-------|-------------|---------|
| **email** | Email address | `nephew@example.com` |
| **name** | Full name | `My Nephew` |
| **password** | Login password | `MyNephew2024!` |
| **role** | User role | `family` or `admin` |
| **isActive** | Account status | `true` |

### Step 3: User Roles
- **`admin`**: Can add/edit birthday messages (for family members)
- **`family`**: Can view messages but not edit (for nephew)

### Step 4: Recommended User Setup

#### For Family Members (Admin Access):
```
email: aunt.sarah@example.com
name: Aunt Sarah
password: AuntSarah2024!
role: admin
isActive: true
```

```
email: uncle.john@example.com
name: Uncle John
password: UncleJohn2024!
role: admin
isActive: true
```

```
email: grandma@example.com
name: Grandma
password: Grandma2024!
role: admin
isActive: true
```

#### For Nephew (Family Access):
```
email: nephew@example.com
name: My Nephew
password: Nephew2024!
role: family
isActive: true
```

### Step 5: Password Requirements
Passwords can be any string you choose - no specific requirements since this is custom authentication.

### Step 6: User Status
After creating users:
1. Users will appear in the **User** list
2. Set `isActive` to `true` for active accounts
3. Users can immediately sign in to the app using their email and password

## 🔐 Managing User Accounts

### View All Users
1. Go to **Data** → **User**
2. See all created accounts
3. Check their status and roles

### Edit User Details
1. Find user in the list
2. Click **Edit**
3. Update name, role, password, or other details
4. Click **Save**

### Delete User
1. Find user in the list
2. Click **Delete**
3. Confirm deletion

### Reset Password
1. Find user in the list
2. Click **Edit**
3. Update the password field
4. Click **Save**

## 📱 Sharing Credentials

### For Family Members (Admin):
```
Email: aunt.sarah@example.com
Password: AuntSarah2024!
```
**Instructions**: "Use these credentials to sign in and add birthday messages for nephew."

### For Nephew (Family):
```
Email: nephew@example.com
Password: Nephew2024!
```
**Instructions**: "Use these credentials to sign in and see your birthday messages!"

## 🎯 Next Steps After User Creation

1. **Test Login**: Have each user try signing in
2. **Add Messages**: Family members can now add birthday messages
3. **Share Credentials**: Provide nephew with his login details
4. **Monitor Usage**: Check Admin UI for user activity

## 📝 Adding Birthday Messages

### Step 1: Navigate to Data
1. In Admin UI, click on **Data**
2. Select **BirthdayMessage** from the table list

### Step 2: Create New Message
1. Click **Create item**
2. Fill in the fields:

| Field | Description | Example |
|-------|-------------|---------|
| `age` | Age this message is for | `1` (for 1st birthday) |
| `title` | Message title | "Happy 1st Birthday!" |
| `content` | Your message text | "Dear nephew, on your first birthday..." |
| `videoUrl` | Optional video link | `https://example.com/video.mp4` |
| `fromFamilyMember` | Your name | "Aunt Sarah" |
| `isUnlocked` | Leave as `false` | `false` |
| `unlockDate` | Birthday date for that age | `2025-02-20T00:00:00.000Z` |
| `createdAt` | Current date | `2024-12-19T10:30:00.000Z` |

### Step 3: Calculate Unlock Date
For each age, the unlock date is February 20th of the year the nephew turns that age:

- **Age 1**: February 20, 2025
- **Age 2**: February 20, 2026
- **Age 3**: February 20, 2027
- And so on...

### Step 4: Save Message
Click **Create** to save the message.

## 🎥 Adding Video Messages

### Option 1: YouTube
1. Upload video to YouTube (unlisted)
2. Get the direct video URL
3. Add to `videoUrl` field

### Option 2: AWS S3
1. Upload video to S3 bucket
2. Make it publicly accessible
3. Use the S3 URL

### Option 3: Other Services
- Vimeo
- Google Drive (with public link)
- Dropbox (with public link)

## 📋 Message Ideas by Age

### Age 1
- First steps
- First words
- Family photos
- Birthday party memories

### Age 2
- Favorite toys
- Funny moments
- Family traditions
- Growth milestones

### Age 3
- Preschool memories
- Friends made
- Special achievements
- Family vacations

### Age 4-5
- Learning to read
- Drawing skills
- Sports activities
- Family celebrations

### Age 6-10
- School memories
- Hobbies and interests
- Family trips
- Personal growth

### Age 11-18
- Teenage years
- Academic achievements
- Personal interests
- Future dreams

## 🔧 Managing Messages

### Edit Existing Messages
1. Find the message in Admin UI
2. Click **Edit**
3. Make changes
4. Click **Save**

### Delete Messages
1. Find the message in Admin UI
2. Click **Delete**
3. Confirm deletion

### View All Messages
- Use the **List** view to see all messages
- Filter by age or family member
- Sort by creation date

## 🎨 Message Tips

### Writing Style
- Keep it personal and heartfelt
- Include specific memories
- Use age-appropriate language
- Add humor when appropriate

### Content Ideas
- **Photos**: Describe special moments
- **Videos**: Record personal messages
- **Stories**: Share family anecdotes
- **Wishes**: Express hopes for the future
- **Advice**: Share life lessons

### Technical Tips
- Keep text messages under 500 words
- Use simple video formats (MP4)
- Test video links before saving
- Double-check unlock dates

## 🔐 Security Notes

- Only authorized family members should have admin access
- Keep admin credentials secure
- Don't share admin login with the nephew
- Regularly review and update messages

## 🚨 Troubleshooting

### Message Not Showing
- Check if `isUnlocked` is set correctly
- Verify the unlock date format
- Ensure all required fields are filled

### Video Not Playing
- Test the video URL in a browser
- Check if video is publicly accessible
- Try a different video format

### Admin Access Issues
- Verify AWS credentials
- Check user permissions
- Contact the app administrator

## 📞 Support

If you need help:
1. Check this guide first
2. Contact the app administrator
3. Review AWS Amplify documentation

---

**Happy Message Writing! 🎂✨**
