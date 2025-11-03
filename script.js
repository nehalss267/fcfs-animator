document.addEventListener('DOMContentLoaded', () => {
    // Get HTML Elements
    const processForm = document.getElementById('process-form');
    const processTableBody = document.querySelector('#process-table tbody');
    const runBtn = document.getElementById('run-btn');
    const resetBtn = document.getElementById('reset-btn');
    const ganttChart = document.getElementById('gantt-chart');
    const timeline = document.getElementById('timeline');
    const resultsDiv = document.getElementById('results');

    let processList = [];
    let processIdCounter = 1;
    const TIME_SCALE = 30; // 30 pixels per unit of time

    // 1. Add Process Event Listener
    processForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const arrivalTime = parseInt(document.getElementById('arrival-time').value);
        const burstTime = parseInt(document.getElementById('burst-time').value);

        if (isNaN(arrivalTime) || isNaN(burstTime) || burstTime <= 0) {
            alert("Please enter valid Arrival Time and Burst Time (Burst > 0).");
            return;
        }

        const process = {
            id: `P${processIdCounter++}`,
            arrival: arrivalTime,
            burst: burstTime,
            color: getRandomColor()
        };

        processList.push(process);
        addProcessToTable(process);

        // Reset form
        processForm.reset();
        document.getElementById('arrival-time').value = 0;
        document.getElementById('burst-time').value = 1;
    });

    // 2. Run FCFS Event Listener
    runBtn.addEventListener('click', runFCFS);

    // 3. Reset Event Listener
    resetBtn.addEventListener('click', resetAll);

    function addProcessToTable(process) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${process.id}</td>
            <td>${process.arrival}</td>
            <td>${process.burst}</td>
        `;
        processTableBody.appendChild(row);
    }

    // 4. The Core FCFS Logic and Animation
    async function runFCFS() {
        if (processList.length === 0) {
            alert("Please add at least one process.");
            return;
        }

        // FCFS Algorithm: Sort by arrival time
        processList.sort((a, b) => a.arrival - b.arrival);

        // Clear previous results
        ganttChart.innerHTML = '';
        timeline.innerHTML = '';
        resultsDiv.innerHTML = '';

        let currentTime = 0;
        let totalWaitingTime = 0;
        let totalTurnaroundTime = 0;
        const ganttData = []; // To store animation info

        for (const process of processList) {
            // Check for idle time
            if (currentTime < process.arrival) {
                const idleTime = process.arrival - currentTime;
                ganttData.push({
                    id: 'Idle',
                    start: currentTime,
                    duration: idleTime,
                    color: '#555'
                });
                currentTime = process.arrival;
            }

            // Process execution
            const completionTime = currentTime + process.burst;
            const turnaroundTime = completionTime - process.arrival;
            const waitingTime = turnaroundTime - process.burst;

            totalWaitingTime += waitingTime;
            totalTurnaroundTime += turnaroundTime;

            // Store data for animation
            ganttData.push({
                id: process.id,
                start: currentTime,
                duration: process.burst,
                color: process.color
            });

            currentTime = completionTime;
        }

        // Now, animate the Gantt chart
        await animateGanttChart(ganttData);

        // Finally, display results
        displayResults(totalWaitingTime, totalTurnaroundTime);
    }

    // 5. Animation Function
    async function animateGanttChart(ganttData) {
        let maxTime = 0;
        for (let i = 0; i < ganttData.length; i++) {
            const data = ganttData[i];
            const blockWidth = data.duration * TIME_SCALE;
            const blockLeft = data.start * TIME_SCALE;

            // Create the block
            const block = document.createElement('div');
            block.classList.add('gantt-block');
            block.innerText = data.id;
            block.style.backgroundColor = data.color;
            block.style.width = '0px'; // Start with 0 width
            block.style.left = `${blockLeft}px`;
            
            // Add block to chart
            ganttChart.appendChild(block);

            // Animate the width (this is the magic)
            await new Promise(resolve => setTimeout(resolve, 100)); // Short delay
            block.style.width = `${blockWidth}px`;

            // Add time markers
            addTimeMarker(data.start);
            maxTime = data.start + data.duration;
            
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait for animation
        }
        addTimeMarker(maxTime); // Add final time marker
    }
    
    function addTimeMarker(time) {
        // Prevent duplicate time markers
        const existingMarkers = timeline.querySelectorAll('.time-marker');
        for (let marker of existingMarkers) {
            if (marker.innerText == time) {
                return; // Don't add if time already exists
            }
        }

        const marker = document.createElement('div');
        marker.classList.add('time-marker');
        marker.innerText = time;
        marker.style.left = `${time * TIME_SCALE}px`;
        timeline.appendChild(marker);
    }

    // 6. Display Results Function
    function displayResults(totalWaitingTime, totalTurnaroundTime) {
        const avgWaitingTime = totalWaitingTime / processList.length;
        const avgTurnaroundTime = totalTurnaroundTime / processList.length;

        resultsDiv.innerHTML = `
            <p><strong>Average Waiting Time:</strong> ${avgWaitingTime.toFixed(2)}</pre>
            <p><strong>Average Turnaround Time:</strong> ${avgTurnaroundTime.toFixed(2)}</p>
        `;
    }

    // 7. Reset Function
    function resetAll() {
        processList = [];
        processIdCounter = 1;
        processTableBody.innerHTML = '';
        ganttChart.innerHTML = '';
        timeline.innerHTML = '';
        resultsDiv.innerHTML = '';
        document.getElementById('process-form').reset();
        document.getElementById('arrival-time').value = 0;
        document.getElementById('burst-time').value = 1;
    }

    // Utility to get random colors
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
