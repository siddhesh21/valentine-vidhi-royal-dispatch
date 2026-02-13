<div align="center">

  # 🕯️ The Royal Correspondence 🕯️
  
  ### *Dearest Reader,*
  
  **It has come to this author's attention that a digital missive of great importance 
  has been dispatched from the Emerald Isle to the shores of India.**

  ---
  <a href="https://siddhesh21.github.io/valentine-vidhi-royal-dispatch/">
    <img src="https://img.shields.io/badge/💌_CLICK_HERE_TO-OPEN_THE_LETTER-722f37?style=for-the-badge&logoColor=d4af37" height="50" />
  </a>
  ---
  
  ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
  ![Love](https://img.shields.io/badge/Made_with-Love_&_Magic-d4af37?style=flat)

</div>

<br />

## 🗺️ The Journey
> "Distance is but a test to see how far love can travel."

This application simulates the journey of a letter traversing **7,618 kilometers** across the globe. It features:
* ✨ **A Royal Aesthetic:** Inspired by the Regency era (Bridgerton).
* ✈️ **Live Tracking:** A visual map animation from Ireland to India.
* ⏳ **The Countdown:** A real-time timer ticking down to **March 14th, 2026**.
* 📜 **The Reveal:** An interactive wax seal and unrolling scroll.

---

## 🕵️‍♂️ For The Curious Developer (Interactive)

<details>
<summary><strong>🔻 Click to break the wax seal and view the Architecture</strong></summary>
<br>

### 🏗️ How it was built
The "Royal Dispatch" is not merely ink and paper, but a modern React application powered by:

1.  **State Management:** React `useState` and `useEffect` control the five stages of the letter (`flying` -> `arrived` -> `sealed` -> `unrolling` -> `reading`).
2.  **The Animation Engine:** Pure CSS3 Keyframes (`@keyframes`) handle the envelope's flight path and the scroll's unrolling effect—no heavy animation libraries were harmed in the making of this app.
3.  **Timezone Logic:** The countdown is hard-locked to `Asia/Kolkata` (IST) to ensure the moment aligns perfectly with the destination.

```javascript
// A snippet of the logic
const targetDate = new Date('2026-03-14T00:00:00+05:30');