# 404 altitude not found
Where curiosity takes flight.
## Inspiration
I was inspired by the magic of flight itself.  
Aviation is often seen as either **too technical** or **too mundane**. I wanted to bridge that gap: to show how flying is a blend of **engineering, physics, and human resilience**.  

After all, a 17-hour ultra-long-haul isn’t just sitting in a cabin—it’s a living equation of rotations, fuel management, and safety:  

$$
\text{Safety Margin} = \frac{\text{Fuel Load}}{\text{Consumption Rate}} - \text{Diversion Distance}
$$

This project is my attempt to tell those stories in a way that feels magical.  

## What it does
- 📖 Shares **aviation stories** (disasters, innovations, hidden crew compartments).  
- 🎮 Embeds **mini quizzes** in every post to test knowledge.  
- 🌗 Offers a **day/night mode toggle** for atmosphere and accessibility.  
- ✈ Features playful **airplane-shaped UI elements** that make interaction fun.  
- 🧑‍🤝‍🧑 Brings aviation closer to *everyone*—not just pilots or engineers.  

## How I built it
- **Frontend Stack:**  
  Built with **HTML5** for semantic structure, **CSS3 (Flexbox + Grid)** for responsive layouts, and **vanilla JavaScript (ES6+)** for interactivity.  
  - No heavy frameworks were used to keep the bundle lightweight (< 50 KB gzipped).  
  - Modular JavaScript functions handle quizzes, UI toggles, and animations.  

- **Quizzes:**  
  Implemented as **state-driven components**. Each quiz is represented as a JSON-like object with the following schema:  

  ```js
  {
            q: "✈ Why don’t pilots consider turbulence a major safety risk?",
            choices: [
                "Pilots can avoid all turbulence",
                "Planes are designed to flex and pilots manage it",
                "It only occurs during takeoff"
            ],
            answer: "b"
  }

## Challenges I ran into
- 🌑 **Dark mode contrast issues** (blog titles disappearing into the void).  
- ✈ Making a **plane-shaped button** that looked fun but didn’t break layouts. 

## Accomplishments that we're proud of

## What I learned
- Storytelling is a technology in itself.  
- UI choices (color, readability, button shape) can make or break the experience.  
- Accessibility = inclusivity.  
- Sometimes **hardcoding ≠ bad coding**—especially when it’s the most reliable landing.  
- Blending **STEM + creativity** is where the real magic happens.  

## What's next for 404 altitude not found
I see this as just the **maiden flight**. Next steps include:  
- 🛫 **Scenario-based quizzes** — “What would you do as captain?” simulations.  
- 🤖 **AI Co-Pilot Chatbot** — answers aviation questions in real time.  
- 🎧 **Immersive soundscapes** — cockpit chatter, engine hum, cabin ambiance.  
