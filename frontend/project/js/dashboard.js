const server = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Dashboard JS Loaded!");
    const token = localStorage.getItem('token');
    const nameElement = document.querySelector('.sidebar-footer .name');
    const avatarElement = document.querySelector('.sidebar-footer .avatar');

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`${server}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("user info in dashboard js",data)
            const displayName = data.username || "User";
            
            // Update UI
            if (nameElement) nameElement.innerText = displayName;
            if (avatarElement) avatarElement.innerText = displayName.charAt(0).toUpperCase();
            
            // Store for backup
            localStorage.setItem('username', displayName);
        }
    } catch (error) {
        console.error("Sync Error:", error);
        // Fallback to local storage if server is down
        const cached = localStorage.getItem('username');
        if (cached && nameElement) nameElement.innerText = cached;
    }
});
function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}
// --- ADD THIS TO YOUR EXISTING dashboard.js ---

function refreshUI() {
    const progGrid = document.getElementById('prog-grid');
    const nonProgGrid = document.getElementById('non-prog-grid');

    // Clear existing cards before re-rendering
    if (progGrid) progGrid.innerHTML = '';
    if (nonProgGrid) nonProgGrid.innerHTML = '';

    // 1. Render Programming Modules
    roadmapData.programming.forEach(module => {
        const card = createCardHTML(module);
        if (progGrid) progGrid.appendChild(card);
    });

    // 2. Render Non-Programming Modules
    roadmapData.nonProgramming.forEach(module => {
        const card = createCardHTML(module);
        if (nonProgGrid) nonProgGrid.appendChild(card);
    });

    // 3. Update the Visual Progress Bars
    updateOverallProgress();
}

function createCardHTML(module) {
    const div = document.createElement('div');
    // Add 'locked' class if progress is 0 and prerequisites aren't met
    const isLocked = module.progress < 100 && !checkPrerequisites(module.id);
    
    div.className = `part-card ${isLocked ? 'locked' : ''}`;
    div.innerHTML = `
        <div class="card-img-box">
            <img src="${module.img}" alt="${module.title}">
        </div>
        <div class="card-info">
            <span class="status-tag" style="color: ${module.color}">${module.progress === 100 ? 'Completed' : (isLocked ? 'Locked' : 'Available')}</span>
            <h4 style="font-size: 0.9rem; margin: 5px 0;">${module.title}</h4>
            <div class="progress-bar-bg">
                <div class="progress-fill" style="width: ${module.progress}%; background: ${module.color}"></div>
            </div>
        </div>
    `;

    // Redirect to course page if unlocked
    div.onclick = () => {
        if (!isLocked) {
            window.location.href = `courses/${module.id}.html`;
        } else {
            alert("Finish the previous modules to unlock this path!");
        }
    };

    return div;
}

function checkPrerequisites(moduleId) {
    // Logic to check if previous modules in the array are at 100% progress
    // For now, it returns true to allow testing
    return true; 
}

function updateOverallProgress() {
    const allModules = [...roadmapData.programming, ...roadmapData.nonProgramming];
    if (allModules.length === 0) return;

    const totalProgress = allModules.reduce((acc, curr) => acc + curr.progress, 0);
    const average = Math.round(totalProgress / allModules.length);

    const textField = document.getElementById('overall-progress-text');
    const fillBar = document.getElementById('overall-progress-fill');

    if (textField) textField.innerText = `${average}%`;
    if (fillBar) fillBar.style.width = `${average}%`;
}