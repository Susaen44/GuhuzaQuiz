
# Guhuza’s Brain Boost

**Guhuza’s Brain Boost** is an interactive quiz game designed to help users improve their job search skills through fun, competitive gameplay. Players answer job-related questions, earn rewards, compete on leaderboards, and share their achievements on social media.

---

##  Features

-  **Job Search Quiz** – Answer career-focused questions to earn points.
-  **Leaderboard** – Track your ranking against other players.
-  **Social Sharing** – Share your scores and badges on Facebook, WhatsApp, or Email.
-  **Friend Invites** – Invite friends via SMS or email.
-  **Rewards System** – Earn badges for performance milestones and streaks.
-  **Mobile-Friendly** – Fully responsive design for all devices.

---

## 🛠 Technologies Used

- **Frontend:** React.js, Next.js, TypeScript
- **Backend:** MySQL with Prisma ORM
- **Styling:** CSS, Bootstrap

---

## 📦 Installation (Zip File)

This project is provided as a `.zip` archive. Follow these steps to set it up locally:

1. **Extract the Zip**
   - Unzip the downloaded archive to your preferred development folder.

2. **Navigate to the Project Directory**
   ```bash
   cd path/to/guhuza-quiz-app
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Configure Environment Variables**
   - Create a `.env.local` file in the root folder.
   - Add your configuration:
     ```
     DATABASE_URL=your_local_database_url
     GOOGLE_CLIENT_ID=your_google_oauth_client_id
     GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
     NEXTAUTH_SECRET=your_application_secret
     ```

5. **Set Up the Database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

6. **Run the Development Server**
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser to start using the app.

---

##  Contributing

This zipped version is shared for internal use and development.  
If you wish to contribute:

- Follow the existing folder structure and coding conventions.
- Make sure your updates are well-documented.
- Share your updated zip or files through the agreed channel (email, shared drive, etc.).

---

## 📄 License

This project is licensed under the MIT License.  
See the included `LICENSE.txt` file for details.
