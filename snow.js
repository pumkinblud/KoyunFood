document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Configuration
    const snowflakesCount = 100;  // Increased number of snowflakes
    const snowflakes = [];
    const body = document.querySelector('body');
    let snowActive = true;
    
    // Initialize snow toggle button
    const snowToggle = document.getElementById('snowToggle');
    
    // Create snowflakes
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Random position
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.top = `-10px`;
        
        // Random opacity with higher minimum for better visibility
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Faster animation duration (3-10 seconds)
        const duration = Math.random() * 7 + 3;
        snowflake.style.animation = `fall ${duration}s linear infinite`;
        
        // Random delay for more natural distribution
        snowflake.style.animationDelay = `${Math.random() * 3}s`;
        
        // More pronounced horizontal movement
        const horizontalMovement = (Math.random() - 0.5) * 150;
        snowflake.style.setProperty('--horizontal-movement', `${horizontalMovement}px`);
        
        // Add slight rotation for more dynamic effect
        snowflake.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        body.appendChild(snowflake);
        snowflakes.push(snowflake);
        return snowflake;
    }
    
    // Initialize snowflakes
    for (let i = 0; i < snowflakesCount; i++) {
        createSnowflake();
    }
    
    // Toggle snow effect
    function toggleSnow() {
        snowActive = !snowActive;
        snowToggle.classList.toggle('active', snowActive);
        
        if (snowActive) {
            // Show all snowflakes
            snowflakes.forEach(flake => {
                flake.style.display = 'block';
                flake.style.animationPlayState = 'running';
            });
        } else {
            // Hide all snowflakes
            snowflakes.forEach(flake => {
                flake.style.animationPlayState = 'paused';
                flake.style.display = 'none';
            });
        }
        
        // Save preference to localStorage
        localStorage.setItem('snowActive', snowActive);
    }
    
    // Add click event to toggle button
    if (snowToggle) {
        snowToggle.addEventListener('click', toggleSnow);
    }
    
    // Check saved preference
    if (localStorage.getItem('snowActive') === 'false') {
        toggleSnow(); // This will set the correct initial state
    }
    
    // Add some interactivity - snowflakes will slightly move with mouse
    document.addEventListener('mousemove', (e) => {
        if (!snowActive) return;
        
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        snowflakes.forEach((flake, i) => {
            const moveX = (x - 0.5) * 20 * (i % 3 + 1);
            flake.style.transform = `translateX(${moveX}px) rotate(${i * 5}deg)`;
        });
    });
    
    // Clean up function if needed
    window.cleanupSnowflakes = function() {
        snowflakes.forEach(flake => flake.remove());
        snowflakes.length = 0;
    };
});
