# Firebase Setup — skillnests.in

Project ref: `skillnests-3002c`. Config is already wired into `src/lib/firebase.ts` (publishable values, safe in code).

## One-time steps in the Firebase Console

1. **Authentication → Sign-in method**
   - Enable **Email/Password**
   - Enable **Google** (set support email; that's it)
2. **Firestore Database → Create database** → production mode → region `asia-south1` (or closest to your users)
3. **Firestore → Rules** → paste the contents of `firestore.rules` (in this repo) and **Publish**
4. **Authentication → Settings → Authorized domains** → add your production domain (e.g. `skillnests.in`). `localhost` is already allowed.

## Admin account

Sign up (or sign in with Google) using **`founders@skillnests.in`**. That email is automatically given the `admin` role on first login. Anyone else becomes a `student`.

## Data model

Each Firestore collection mirrors the in-app stores:

| Collection            | Purpose                               |
| --------------------- | ------------------------------------- |
| `users/{uid}`         | Profile + role                        |
| `sn-chat-group`       | Group chat                            |
| `sn-chat-dm`          | Direct messages with admin            |
| `sn-schedule`         | Personal schedule events              |
| `sn-pyq`              | Past-year question papers             |
| `sn-notes`            | Subject notes                         |
| `sn-meetings`         | Global / peer meetings                |
| `sn-coding`           | Coding workshops                      |
| `sn-career-live`      | Live career sessions                  |
| `sn-career-vids`      | Recorded career videos                |
| `sn-skill`            | Skill-share posts                     |
| `sn-founder-inbox`    | Messages to the founder (admin-only)  |

## Free tier

Spark plan: 50k reads/day, 20k writes/day, 1 GiB storage, 10 GiB/month bandwidth, unlimited auth. Plenty of headroom for early users; no card required, never pauses.
