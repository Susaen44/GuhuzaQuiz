Guhuza’s Brain Boost

Guhuza’s Brain Boost is an interactive quiz game designed to help users improve their job search skills through fun, competitive gameplay. Players answer job-related questions, earn rewards, compete on leaderboards, and share their achievements on social media.

---

Features

- Job Search Quiz – Answer career-focused questions to earn points.
- Leaderboard – Track your ranking against other players.
- Social Sharing – Share your scores and badges on Facebook, WhatsApp, or Email.
- Friend Invites – Invite friends via SMS or email.
- Rewards System – Earn badges for performance milestones and streaks.
- Mobile-Friendly – Fully responsive design for all devices.

---

Technologies Used

- Frontend: React.js, Next.js, TypeScript
- Backend: MySQL with Prisma ORM
- Styling: CSS, Bootstrap

---

Installation (via GitHub)

To set up Guhuza’s Brain Boost locally using Git:

1. Clone the Repository

Open a terminal and run:

git clone https://github.com/Susaen44/GuhuzaQuiz.git
cd GuhuzaQuiz

(Replace the URL if your repo is private or different.)

---

2. Install Dependencies

Make sure you're in the project root directory, then run:

npm install

---

3. Configure Environment Variables

Create a .env.local file in the root directory:

touch .env.local

Add your environment variables inside .env.local:

DATABASE_URL=your_local_database_url
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
NEXTAUTH_SECRET=your_application_secret

(Do NOT commit .env.local to Git.)

---

4. Set Up the Database

Generate Prisma client and apply migrations:

npx prisma generate
npx prisma migrate dev

---

5. Run the Development Server

Start the app locally:

npm run dev

Open http://localhost:3000 in your browser to see the app.

---

Notes for Developers

- Keep .env.local private.
- Avoid pushing secrets to the repository.
- If secrets are pushed accidentally, rotate them immediately and remove from Git history using tools like BFG Repo Cleaner or git filter-branch.

---

Contributing

- Follow the existing folder structure and code style.
- Document your changes clearly.
- Share your code updates via agreed channels.

---

License

This project is licensed under the MIT License.
See the included LICENSE.txt file for details.
