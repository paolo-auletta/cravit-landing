Turned a simple idea with friends into an actual app
Hey everyone!
I’m a first-year university student and I just finished building an app I really needed myself. It’s in waitlist mode for now, and the App Store launch is coming next week — but you can already check it out here: getcravit.com.
When I moved from my hometown to Milan, I kept having the same experience:
1. Trying to find “our pub” with a friend — our own McLarens from How I Met Your Mother.
2. With another group, trying every smash burger in the city to find the real #1.
3. With my roommate, searching for the best Sunday breakfast spot.
Every time, we ended up creating random notes, spreadsheets, IG saves… nothing that made the experience fun or organized.
After doing this three times in three completely different ways, I thought: why isn’t there an app for this?
So… I built one. It’s called Cravit.
The idea is super simple:
* You create a “Cravy,” which is basically a personal food mission.
* You choose your criteria (taste, vibe, price, etc.).
* You add all the spots you want to try.
* You invite your friends.
* Every time you try a place, you log a review.
* And at the end, Cravit shows a leaderboard of all the spots — so you finally know which bar becomes your new McLarens.
If this sounds fun or useful, I’d love if you checked it out → getcravit.comAny feedback is super appreciated!
Say also that we are on product hunt, landed at #11 position for the day we published, and to stay updated subscribe to the waitlist and so on


# 🧡 Cravit — Full Product Overview

Cravit is a **social food-discovery app** that turns restaurant exploration into **personal taste missions**, called **Cravies**.  
Users create a Cravy (e.g., “Find the best smash burger in Milan”), set criteria, add spots, visit them, review them, and compare results with friends.  
The goal is to make food discovery **fun, personal, and social** instead of browsing generic reviews.

---

## 🧭 Mission & Values

**Mission:** Help people discover restaurants that match their personal taste and turn every meal into an adventure.

**Core Values**
- **Authenticity** — Real opinions, real experiences  
- **Discovery** — Every day is a chance to find something new  
- **Community** — Food brings people together

**Why Cravit Exists:**  
Choosing where to eat shouldn't be overwhelming. Cravit turns cravings into missions and meals into memories.

---

## 🍽 What Is a Cravy?

A **Cravy** is a personal or group mission to find *something specific*.

A Cravy includes:
- A theme (e.g., Best Sushi, Aperitivo Tour, Pizza Hunt)
- Category (restaurant, bar, pizza, etc.)
- Criteria with weights (taste, price, vibes…)
- Rating system (1–5 or 1–10)
- Optional frequency rules
- Spot list + multimedia reviews  
- Leaderboards when friends join

Cravies can be done **alone or with friends**.

---

## ⭐ Core Features

### 1. Cravies  
Structured missions with criteria, scoring, and progress.

### 2. Spot Discovery  
Search via **Google Maps / Places API**, add spots to Cravies, track visits.

### 3. Multimedia Reviews  
Log:
- Ratings per criterion  
- Notes  
- Photos  
- Visit date  

### 4. Crews (Social)  
Friends join a Cravy → compare ratings, track progress, compete.

### 5. Gamification  
Badges, progress indicators, best-of lists.

### 6. Activity Feed  
Recent Cravies, reviews, new spots, leaderboard updates.

### 7. Map-Based Discovery  
Browse spots geographically and visually inside each Cravy.

---

## 🎨 Brand Identity

### Tone of Voice  
Playful, friendly, casual, motivational.  
Celebrate small wins. Avoid corporate speak.

### Visual Identity  
- **Primary Color:** Orange (#FF6900)  
- **Typography:** Poppins  
- **Style:** Modern, vibrant, approachable  
- **Background Colors:** White + soft grays

---

## 👤 Target Personas

### Persona 1 (16–30)
- Loves trying new places  
- Active on TikTok/IG  
- Attracted to gamified, social experiences  

### Persona 2 (28–40)
- Wants quick, reliable recommendations  
- Values clarity and efficiency  

---

## 🥊 Positioning

Cravit is **not** a review platform like Yelp or Google Maps.  
It is a **personal, gamified taste-mission app**.

Cravit's differentiation:
- Reviews are contextual (inside Cravies)
- Highly personal scoring
- Social missions with friends  
- Leaderboards, badges, progress

---

## 🧱 Tech Stack

### 📱 Frontend — React Native (Expo)
- **UI:** NativeWind + Reanimated  
- **State:** Zustand (local)  
- **Server Cache:** TanStack Query  
- **Navigation:** expo-router  
- **Forms:** react-hook-form + zod  
- **Image Handling:** expo-image + compression  

### 🛠 Backend — Supabase
- Postgres  
- Auth (Email + Google + Apple)  
- Storage (photos)  
- Realtime  
- RLS  
- Edge Functions  

---

## 🗄 Database Schema (Simplified)

### User

### Cravy
- id  
- name  
- category  
- rating_min / rating_max  
- frequency_count / frequency_unit  
- timestamps  

### Criteria
- id  
- name  
- weight (0–1)  
- cravy_id  

### Spot
- id  
- name  
- place_id  
- address  
- lat/lng  
- image  
- cravy_id  

### Review
- id  
- spot_id  
- user_id  
- title  
- notes  
- images  
- visited_at  

### CriteriaReviewed
- id  
- criteria_id  
- review_id  
- grade  

---

## 🚀 Launch Strategy

### Timeline
- **Week 1–2:** Beta test (50 users)  
- **Week 3:** Feedback + iteration  
- **Week 4:** Soft launch on Product Hunt  
- **Week 5:** App Store release  

### Channels
- Instagram (BTS, testimonials)  
- TikTok ("Cravy of the Day")  
- Landing page → getcravit.com  
- Press kit + screenshots  

---

## 💰 Monetization & Business Model

### Revenue Streams
- **Freemium** with premium subscription (€4.99/mo)  
- Restaurant partnerships  
- Sponsored Cravies  
- Light, non-intrusive ads  

### Partnerships
- Local restaurants  
- Food bloggers & influencers  
- Food festivals, tourism events  

---

## 🧪 Beta Program

- ~50 testers  
- Feedback on UX clarity, bugs, onboarding  
- TestFlight builds with instructions  
- Users asked to:  
  - Create Cravies  
  - Add spots  
  - Leave reviews  
  - Try social features  
  - Break things  

---

## 🧑‍💻 The Founder Story

Cravit began when its founder kept trying to:
1. Find “our pub” with a friend  
2. Explore every smash burger in Milan  
3. Rate Sunday brunch spots with a roommate  

Each time required messy notes, spreadsheets, IG saves… nothing fun or organized.  
So the concept of **Cravies** was born.

---

## 🧩 In One Sentence

Cravit turns food discovery into **personal missions** you can complete alone or with friends.

---