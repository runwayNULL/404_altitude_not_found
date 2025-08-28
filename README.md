# 404 altitude not found
Where curiosity takes flight.
## 🚀 Inspiration
I was inspired by the magic of flight itself.  
Many people believe that aviation is either **too complicated** or **too mundane**. I wanted to close that gap by demonstrating how engineering, physics, and human resiliency all play a part in flying.

A 17-hour ultra-long-haul is, after all, more than just sitting in a cabin; it's a dynamic combination of safety, fuel management, and rotations:

$$
\text{Safety Margin} = \frac{\text{Fuel Load}}{\text{Consumption Rate}} - \text{Diversion Distance}
$$

I'm trying to convey those tales in a magical way with this project.

---

## ✨ What it does
**404 altitude not found** is a blog with an aviation theme that combines interactive elements with narrative. Visitors get to experience aviation in addition to reading:

- 📖 Explore stories about aviation, including hidden crew compartments, historical tragedies, and cutting-edge inventions.  
- 🎮 Test knowledge with mini quizzes.  
- 🛫 Tap playful airplane-shaped UI elements to unlock random aviation fun facts.  
- 🌗 Switch between **day and night modes**, giving the impression that you’re flying from dawn into the night.  
- 📱 Explore on any device thanks to a responsive layout built with **Flexbox + Grid + hamburger menu**.  
- ✈ Enjoy subtle **flying plane animations** that set the mood as soon as you arrive.  

---

## 🛠 How I built it
This project was built as a **static web app** with modular JavaScript and clean semantic HTML.  

### **Frontend Stack**
- **HTML5** → semantic structure  
- **CSS3** → responsive design with **Flexbox** + **Grid**  
- **Vanilla JavaScript (ES6+)** → interactivity (no frameworks)  

### **Dynamic Blog Engine**
- Posts are loaded dynamically from `posts.js` using **URL query parameters** (`post.html?id=1`).  
- A single **template page (`post.html`)** renders multiple blog posts dynamically.  

### **Quizzes**
Each quiz is defined directly inside **`quiz.js`** as a JavaScript object:

```js
const quizzes = {
  "1": {
    q: "✈ What was the primary cause of the Tenerife Airport Disaster in 1977?",
    choices: [
      "Mechanical failure of the KLM aircraft",
      "Miscommunication and misunderstanding of takeoff clearance",
      "Poor maintenance of the runway"
    ],
    answer: "b"
  },
  "2": {
    q: "✈ Why don’t pilots consider turbulence a major safety risk?",
    choices: [
      "Pilots can avoid all turbulence",
      "Planes are designed to flex and pilots manage it",
      "It only occurs during takeoff"
    ],
    answer: "b"
  }
  // … additional quizzes
};
```
- `quiz.js` dynamically loads the correct quiz for each post based on postId from the URL.  

- **Dark Mode**:  
  - Implemented via a `dark-mode` CSS class toggled with JavaScript.  
  - Custom airplane-shaped cursor (`.cur`) for visibility in dark mode.  
  - Colors are defined with **CSS variables** for seamless switching.  

- **Animations**:  
  - CSS keyframes drive airplane entry and text “flying in.”  
  - JS event listeners trigger fun fact planes and interactive toasts.  

---

## ⚡ Challenges I ran into
- 🌑 **Dark mode contrast issues** (blog titles disappearing into the void).  
- ✈ Making a **plane-shaped button** that looked fun but didn’t break layouts.  

---

## 🏆 Accomplishments that I'm proud of
- ✅ Converting **dry aviation facts** into **engaging, human stories**.  
- ✅ Creating a **design that feels both professional and playful**.  
- ✅ Making a space where **learning about flight feels like flying itself**.  
- ✅ Actually *enjoying* the debugging process (rare, but true).  

---

## 📚 What I learned
- Storytelling is a technology in itself.  
- UI choices (color, readability, button shape) can make or break the experience.  
- Accessibility = inclusivity.  
- Sometimes **hardcoding ≠ bad coding**—especially when it’s the most reliable landing.  
- The true magic occurs when **STEM + creativity** are combined.  

---

## ✈️ What's next for *404 altitude not found*
This is just the **maiden flight** as far as I can tell. The following actions are included:  
- 🛫 **Questions based on scenarios** — "What would you do as captain?" simulations.  
- 🤖 **AI Co-Pilot Chatbot** — provides real-time aviation answers.  
- 🎧 **Immersive soundscapes** — engine hum, cabin ambience, and cockpit chatter.  
