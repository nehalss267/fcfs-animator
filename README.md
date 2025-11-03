🧮 FCFS Scheduling Algorithm Animator

A simple and interactive web-based animation tool that visually demonstrates how the First-Come, First-Serve (FCFS) scheduling algorithm works in Operating Systems.
Users can input process details, run the scheduler, and watch an animated Gantt chart showing how CPU time is allocated to processes in order of arrival.


---

🎯 Project Goal

To help learners visualize the FCFS scheduling algorithm through an engaging web interface that:

Accepts user input for Arrival Time and Burst Time of each process.

Generates a Gantt chart animation to simulate FCFS execution.

Displays Average Waiting Time and Average Turnaround Time after simulation.



---

🧰 Technology Stack

Technology	Purpose

HTML5	Page structure and UI layout
CSS3	Styling and responsive design
JavaScript (ES6)	Logic, calculations, and animations



---

📂 Project Structure

/fcfs-animator
│
├── fcfs.html # Main HTML page (UI)
├── style.css # Styling for layout
└── script.js # JavaScript logic and FCFS animation


---

⚙️ Features

✅ Add processes dynamically with Arrival and Burst Time
✅ Animated Gantt Chart showing CPU execution order
✅ Displays Idle time when CPU is not executing any process
✅ Automatically calculates:

Average Waiting Time

Average Turnaround Time
✅ Reset option to start a new simulation
✅ Fully client-side – no backend required



---

🚀 How to Run

1. Download or clone this repository:

git clone https://github.com/nehalss267/fcfs-animator.git


2. Open the project folder.


3. Double-click index.html to open it in your browser (Chrome, Firefox, or Edge).


4. Add processes → Click Run FCFS → Watch the animation!




---

🧠 Algorithm Overview

First-Come, First-Serve (FCFS) is a non-preemptive scheduling algorithm where:

The process that arrives first gets executed first.

Subsequent processes wait until the CPU becomes free.


Formulas used:

Turnaround Time = Completion Time − Arrival Time

Waiting Time = Turnaround Time − Burst Time

Average values are computed over all processes.



---

🧩 Example

Process	Arrival Time	Burst Time

P1	0	5
P2	2	3
P3	4	1


➡️ Gantt Chart: P1 → P2 → P3
➡️ CPU Idle if there’s a gap between arrivals.


---

🌈 Future Enhancements

Add more algorithms (SJF, Priority, Round Robin)

Improve animations with GSAP or CSS keyframes

Display a real-time clock during animation

Allow CSV import/export of process data



---

👨‍💻 Author

Solanki Nehal Shailesh 
💡 "Visual learning makes algorithms come alive!"

---
