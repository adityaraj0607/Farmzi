function _init_infiniteImgScroll() {
    const leftStrip = document.querySelectorAll('.img-strip-left');
    console.log(leftStrip)
    const rightStrip = document.querySelectorAll('.img-strip-right');
    const leftItems = leftStrip[0].children;
    const rightItems = rightStrip[0].children;

    let scrollSpeed = 0.5; // Adjust the scroll speed
    let leftOffset = 0;
    let rightOffset = 0;
    let paused = false;

    function scrollStrips() {
        if (!paused) {
            leftOffset -= scrollSpeed;
            rightOffset += scrollSpeed;

            leftStrip[0].style.transform = `translateY(${leftOffset}px)`;
            rightStrip[0].style.transform = `translateY(${rightOffset}px)`;

            if (leftOffset <= -leftStrip[0].scrollHeight / 2) {
                leftOffset = 0;
            }
            if (rightOffset >= rightStrip[0].scrollHeight / 2) {
                rightOffset = 0;
            }
        }
        requestAnimationFrame(scrollStrips);
    }

    // Clone items to create the infinite loop effect
    let leftItemsInitLength = leftItems.length

    for (let i = 0; i < leftItemsInitLength; i++) {
        leftStrip[0].appendChild(leftItems[i].cloneNode(true));
        rightStrip[0].appendChild(rightItems[i].cloneNode(true));
    }

    // Pause on hover and darken other images
    document.querySelectorAll('.img-strip-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            paused = true;
            document.querySelectorAll('.img-strip-item').forEach(img => {
                if (img !== item) {
                    img.style.opacity = '0.5';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            paused = false;
            document.querySelectorAll('.img-strip-item').forEach(img => {
                img.style.opacity = '1';
            });
        });
    });

    scrollStrips();
}

_init_infiniteImgScroll()

function typewriter() {
    const textThin = document.querySelector('.text-thin');
    const textBold = document.querySelector('.text-bold');

    const texts = [
        {
            text_thin: 'Search Your Crops ',
            text_bold: "Farmzi"
        },
        {
            text_thin: 'Search For The Best ',
            text_bold: "FARMZI is here..."
        }
    ]

    let i = 0

    function changeText() {
        if (i === texts.length) {
            i = 0
        }

        const text = texts[i].text_bold;
        textThin.textContent = texts[i].text_thin
        textBold.textContent = '';
        const span = document.createElement('span');
        textBold.appendChild(span);
        let index = 0;

        function type() {
            span.textContent += text[index++];
            if (index < text.length) {
                setTimeout(type, 200); // Adjust typing speed here (milliseconds)
            } else {
                function deleteText() {
                    span.textContent = span.textContent.slice(0, - 1)
                    if (span.textContent.trim() === "") {
                        setTimeout(changeText(), 200)
                    } else {
                        setTimeout(deleteText, 100)
                    }
                }

                setTimeout(deleteText, 2000)
            }
        }

        type();
        i++
    }

    changeText()

}

typewriter();

function fadeInMiddle() {
    const middle = document.querySelector('.desktop-normal .middle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(middle);
}

fadeInMiddle()

function _init_cardSwipe() {
    const container = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.genre-card');

    let currentCard = 0

    function prevCard() {
        if (currentCard === 0) return

        eldocument.querySelectorAll('.genre-card.enlarged').forEach(e => {
            e.classList.remove('enlarged')
            e.style.zIndex = 'unset'
        })

        cards[currentCard - 1].style.margin = 0
        cards[currentCard - 1].style.zIndex = 10
        cards[currentCard - 1].style.transform = `scale(1)`
        cards[currentCard - 1].style.filter = `blur(0)`
        cards[currentCard - 1].classList.add('enlarged')

        currentCard = currentCard - 1

        function leftCards() {
            if (currentCard - 1 < 0) return

            let margin = 0
            let scale = 1
            let brightness = 1
            let blur = 0

            for (let i = currentCard - 1; i >= 0; i--) {
                cards[i].style.margin = `0 ${margin + 15}vw 0 0`
                cards[i].style.transform = `scale(${scale - 0.1})`
                cards[i].style.filter = `brightness(${brightness - 0.1}) blur(${blur + 0.5}px)`

                margin = margin + 15
                scale = scale - 0.1
                brightness = brightness - 0.1
                blur = blur + 0.5
            }
        }

        leftCards()

        function rightCards() {
            let margin = 0
            let scale = 1
            let z = 10
            let brightness = 1
            let blur = 0

            for (let i = currentCard + 1; i < cards.length; i++) {
                cards[i].style.margin = `0 0 0 ${margin + 15}vw`
                cards[i].style.transform = `scale(${scale - 0.1})`
                cards[i].style.zIndex = `${z - 1}`
                cards[i].style.filter = `brightness(${brightness - 0.1}) blur(${blur + 0.5}px)`

                margin = margin + 15
                scale = scale - 0.1
                z = z - 1
                brightness = brightness - 0.1
                blur = blur + 0.5
            }
        }

        rightCards()
    }

    function nextCard() {
        if (currentCard === cards.length - 1) return

        eldocument.querySelectorAll('.genre-card.enlarged').forEach(e => {
            e.classList.remove('enlarged')
            e.style.zIndex = 'unset'
        })


        cards[currentCard + 1].style.margin = 0
        cards[currentCard + 1].style.zIndex = 10
        cards[currentCard + 1].style.transform = `scale(1)`
        cards[currentCard + 1].style.filter = `blur(0)`
        cards[currentCard + 1].classList.add('enlarged')

        currentCard = currentCard + 1

        function leftCards() {
            if (currentCard - 1 < 0) return

            let margin = 0
            let scale = 1
            let brightness = 1
            let blur = 0

            for (let i = currentCard - 1; i >= 0; i--) {
                cards[i].style.margin = `0 ${margin + 15}vw 0 0`
                cards[i].style.transform = `scale(${scale - 0.1})`
                cards[i].style.filter = `brightness(${brightness - 0.1}) blur(${blur + 0.5}px)`

                margin = margin + 15
                scale = scale - 0.1
                brightness = brightness - 0.1
                blur = blur + 0.5
            }
        }

        leftCards()

        function rightCards() {
            let margin = 0
            let scale = 1
            let z = 10
            let brightness = 1
            let blur = 0

            for (let i = currentCard + 1; i < cards.length; i++) {
                cards[i].style.margin = `0 0 0 ${margin + 15}vw`
                cards[i].style.transform = `scale(${scale - 0.1})`
                cards[i].style.zIndex = `${z - 1}`
                cards[i].style.filter = `brightness(${brightness - 0.1}) blur(${blur + 0.5}px)`

                margin = margin + 15
                scale = scale - 0.1
                z = z - 1
                brightness = brightness - 0.1
                blur = blur + 0.5
            }
        }

        rightCards()
    }

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchend', () => {
        if (!isDragging) return;
        const diffX = startX - currentX;

        if (window.innerWidth > 600) return

        if (diffX > 50) {
            nextCard();
        } else if (diffX < -50) {
            prevCard();
        }
        isDragging = false;
    }, { passive: true });

    function _init_cardPosition() {
        if (window.innerWidth > 600) {
            cards.forEach(e => {
                e.removeAttribute('style')
            })

            return
        }

        function getMiddleIndex(arr) {
            if (arr.length === 0) {
                return null; // Return null for empty arrays
            }

            const middleIndex = Math.floor(arr.length / 2);

            if (arr.length % 2 === 0) {
                // Even number of elements, choose randomly between the two middle indices
                return middleIndex - (Math.random() < 0.5 ? 1 : 0);
            } else {
                // Odd number of elements, return the middle index
                return middleIndex;
            }
        }

        const middleElementIndex = getMiddleIndex(cards)
        currentCard = middleElementIndex

        cards[currentCard].style.margin = 0
        cards[currentCard].style.zIndex = 10
        cards[currentCard].style.transform = `scale(1)`
        cards[currentCard].classList.add('enlarged')

        function leftCards() {
            if (currentCard - 1 < 0) return

            let margin = 0
            let scale = 1
            let brightness = 1

            for (let i = currentCard - 1; i >= 0; i--) {

                cards[i].style.margin = `0 ${margin + 15}vw 0 0`
                cards[i].style.transform = `scale(${scale - 0.1})`
                cards[i].style.filter = `brightness(${brightness - 0.1})`

                margin = margin + 15
                scale = scale - 0.1
                brightness = brightness - 0.1
            }
        }

        leftCards()

        function rightCards() {
            let margin = 0
            let scale = 1
            let z = 10
            let brightness = 1

            for (let i = currentCard + 1; i < cards.length; i++) {
                cards[i].style.margin = `0 0 0 ${margin + 15}vw`
                cards[i].style.transform = `scale(${scale - 0.1})`
                cards[i].style.zIndex = `${z - 1}`
                cards[i].style.filter = `brightness(${brightness - 0.1})`

                margin = margin + 15
                scale = scale - 0.1
                z = z - 1
                brightness = brightness - 0.1
            }
        }

        rightCards()
    }

    const middle = document.querySelector('.desktop-normal .middle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                _init_cardPosition()
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(middle);


    let wasMobileView = window.innerWidth <= 600;

    window.addEventListener("resize", () => {
        const isMobileView = window.innerWidth <= 600;

        if (wasMobileView !== isMobileView) {
            _init_cardPosition()
            wasMobileView = isMobileView;
        }
    });


}

_init_cardSwipe()

document.querySelector('.item.sa-KQuuNjFQCV[href="/home"]').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default navigation
    const catalog = document.getElementById('catalog');
    catalog.style.display = catalog.style.display === 'none' ? 'block' : 'none';
});
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const modal = document.getElementById('login-modal');
    const accountLink = document.querySelector('.account.sa-KQuuNjFQCV');
    const closeBtn = document.querySelector('.close-modal');
    
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginFormContainer = document.getElementById('login-form-container');
    const signupFormContainer = document.getElementById('signup-form-container');
    
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    
    const loginError = document.getElementById('login-error');
    const signupError = document.getElementById('signup-error');
    
    // Check if user is already logged in
    function checkLoginStatus() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            updateUIForLoggedInUser(currentUser);
        }
    }
    
    // Update the UI when user is logged in
    function updateUIForLoggedInUser(user) {
        // Replace the account icon with user profile
        if (accountLink) {
            accountLink.innerHTML = `
                <div class="user-profile">
                    <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
                    <span class="user-name">${user.name}</span>
                    <div class="user-menu" id="user-menu">
                        <a href="#" class="user-menu-item">My Profile</a>
                        <a href="#" class="user-menu-item">Saved Crops</a>
                        <a href="#" class="user-menu-item">Settings</a>
                        <a href="#" class="user-menu-item" id="logout-btn">Logout</a>
                    </div>
                </div>
            `;
            
            // Add event listener for user menu
            const userProfile = document.querySelector('.user-profile');
            const userMenu = document.getElementById('user-menu');
            
            if (userProfile) {
                userProfile.addEventListener('click', function(e) {
                    e.preventDefault();
                    userMenu.classList.toggle('show');
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (!userProfile.contains(e.target)) {
                        userMenu.classList.remove('show');
                    }
                });
                
                // Logout functionality
                document.getElementById('logout-btn').addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('currentUser');
                    window.location.reload();
                });
            }
        }
    }
    
    // Toggle between login and signup forms
    if (showSignupLink) {
        showSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginFormContainer.style.display = 'none';
            signupFormContainer.style.display = 'block';
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            signupFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
        });
    }
    
    // Open modal when clicking the account link
    if (accountLink) {
        accountLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Don't show login modal if user is already logged in
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                return;
            }
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Initialize particles.js
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                    "particles": {
                        "number": {
                            "value": 80,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#00ffaa"
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            }
                        },
                        "opacity": {
                            "value": 0.5,
                            "random": false
                        },
                        "size": {
                            "value": 3,
                            "random": true
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#00ffaa",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 2,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "resize": true
                        }
                    },
                    "retina_detect": true
                });
            }
        });
    }
    
    // Close modal functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Validation
            if (!email || !password) {
                loginError.textContent = "Please enter both email and password";
                return;
            }
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Find user with matching email and password
            const user = users.find(u => (u.email === email || u.phone === email) && u.password === password);
            
            if (user) {
                // Successful login
                loginError.textContent = "";
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Close modal and update UI
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                updateUIForLoggedInUser(user);
                
                // Show welcome message
                alert(`Welcome back, ${user.name}!`);
            } else {
                // Failed login
                loginError.textContent = "Invalid email or password";
            }
        });
    }
    
    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                signupError.textContent = "Must fill all fields";
                return;
            }
            
            if (password !== confirmPassword) {
                signupError.textContent = "Passwords do not match";
                return;
            }
            
            if (password.length < 6) {
                signupError.textContent = "Password must be at least 6 characters";
                return;
            }
            
            // Get existing users
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if email already exists
            if (users.some(user => user.email === email)) {
                signupError.textContent = "Email already in use";
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now(),
                name,
                email,
                password
            };
            
            // Add to users array
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Login the user
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            // Clear error and close modal
            signupError.textContent = "";
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Update UI
            updateUIForLoggedInUser(newUser);
            
            // Show welcome message
            alert(`Welcome to Smart Farmer Hub, ${name}! Your account has been created successfully.`);
        });
    }
    
    // Check login status on page load
    checkLoginStatus();
});

// Function to load and create the SVG map
function loadMapData() {
    const svgMap = document.getElementById('india-map');
    const statesLegend = document.getElementById('states-legend');
    if (!svgMap || !statesLegend) return;
    
    // Clear existing content
    svgMap.innerHTML = '';
    statesLegend.innerHTML = '';
    
    // Define state data with paths and URLs
    const states = [
        {
            id: 'uttarakhand',
            name: 'Uttrakhand',
            path: 'M450,290 L470,260 L510,250 L540,270 L520,300 L480,320 L450,290'
        },
        {
            id: 'up',
            name: 'Uttar Pradesh',
            path: 'M460,320 L520,300 L560,330 L550,380 L490,400 L460,360 L460,320'
        },
        {
            id: 'bihar',
            name: 'Bihar',
            path: 'M550,380 L600,370 L630,400 L600,430 L560,420 L550,380'
        },
        {
            id: 'punjab',
            name: 'Punjab',
            path: 'M390,280 L420,260 L450,290 L420,320 L390,310 L380,290 L390,280'
        },
        {
            id: 'ap',
            name: 'Andhra Pradesh',
            path: 'M450,600 L500,570 L550,590 L540,640 L490,650 L450,620 L450,600'
        },
        {
            id: 'gujrat',
            name: 'Gujarat',
            path: 'M300,420 L350,400 L390,440 L370,490 L320,510 L290,470 L300,420'
        }
    ];
    
    // Create and add state paths to SVG
    states.forEach(state => {
        // Create path element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('id', state.id);
        path.setAttribute('d', state.path);
        path.setAttribute('class', 'map-state');
        path.dataset.name = state.name;
        path.dataset.id = state.id;
        
        // Add click event to show districts
        path.addEventListener('click', function() {
            const stateId = this.dataset.id;
            const stateName = this.dataset.name;
            showDistrictsForState(stateId, stateName);
        });
        
        // Add tooltip/title
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = state.name;
        path.appendChild(title);
        
        svgMap.appendChild(path);
        
        // Calculate center of path for label
        const bbox = path.getBBox();
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;
        
        // Add state label with improved styling
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', centerX);
        label.setAttribute('y', centerY);
        label.setAttribute('class', 'map-state-label');
        label.setAttribute('id', `label-${state.id}`);
        label.textContent = state.name;
        svgMap.appendChild(label);
        
        // Add state to the legend below the map
        const legendItem = document.createElement('div');
        legendItem.className = 'state-legend-item';
        legendItem.textContent = state.name;
        legendItem.dataset.id = state.id;
        legendItem.dataset.name = state.name;
        
        // Add click event to legend items
        legendItem.addEventListener('click', function() {
            showDistrictsForState(this.dataset.id, this.dataset.name);
        });
        
        // Add hover effect to highlight corresponding state on the map
        legendItem.addEventListener('mouseenter', function() {
            const mapState = document.getElementById(this.dataset.id);
            if (mapState) {
                mapState.style.fill = 'red';
                mapState.style.stroke = 'white';
                mapState.style.strokeWidth = '2';
            }
        });
        
        legendItem.addEventListener('mouseleave', function() {
            const mapState = document.getElementById(this.dataset.id);
            if (mapState) {
                mapState.style.fill = '';
                mapState.style.stroke = '';
                mapState.style.strokeWidth = '';
            }
        });
        
        statesLegend.appendChild(legendItem);
    });
}
// Function to load and create the SVG map
function loadMapData() {
    const svgMap = document.getElementById('india-map');
    const statesLegend = document.getElementById('states-legend');
    
    if (!svgMap || !statesLegend) return;
    
    // Clear existing content
    svgMap.innerHTML = '';
    statesLegend.innerHTML = '';
    
    // Define state data with more accurate paths
    const states = [
        {
            id: 'uttarakhand',
            name: 'Uttrakhand',
            path: 'M370,220 L400,190 L430,180 L460,190 L470,210 L450,240 L420,250 L380,230 L370,220'
        },
        {
            id: 'up',
            name: 'Uttar Pradesh',
            path: 'M370,230 L420,250 L450,240 L480,250 L510,280 L510,320 L480,350 L450,370 L420,360 L400,340 L380,320 L360,290 L370,250 L370,230'
        },
        {
            id: 'bihar',
            name: 'Bihar',
            path: 'M510,320 L550,310 L580,320 L600,340 L590,370 L570,390 L540,380 L510,360 L510,320'
        },
        {
            id: 'punjab',
            name: 'Punjab',
            path: 'M300,240 L340,220 L370,220 L380,230 L370,250 L340,260 L310,260 L300,240'
        },
        {
            id: 'haryana',
            name: 'Haryana',
            path: 'M340,260 L370,250 L360,290 L330,310 L310,290 L320,270 L340,260'
        },
        {
            id: 'ap',
            name: 'Andhra Pradesh',
            path: 'M400,500 L450,480 L500,490 L530,520 L520,560 L480,590 L440,580 L410,550 L400,500'
        },
        {
            id: 'telangana',
            name: 'Telangana',
            path: 'M400,500 L450,480 L470,460 L490,440 L460,420 L430,430 L400,450 L380,470 L400,500'
        },
        {
            id: 'gujrat',
            name: 'Gujarat',
            path: 'M220,380 L250,350 L290,340 L320,360 L330,390 L320,420 L290,450 L250,460 L220,440 L210,410 L220,380'
        },
        {
            id: 'rajasthan',
            name: 'Rajasthan',
            path: 'M250,350 L290,340 L320,360 L330,310 L360,290 L380,320 L380,350 L370,380 L340,400 L320,420 L290,420 L250,350'
        },
        {
            id: 'maharashtra',
            name: 'Maharashtra',
            path: 'M320,420 L370,380 L400,390 L430,430 L460,420 L490,440 L470,460 L450,480 L400,500 L380,470 L350,460 L320,460 L290,450 L320,420'
        },
        {
            id: 'mp',
            name: 'Madhya Pradesh',
            path: 'M320,360 L380,350 L400,340 L420,360 L450,370 L460,420 L430,430 L400,390 L370,380 L320,360'
        },
        {
            id: 'karnataka',
            name: 'Karnataka',
            path: 'M350,460 L380,470 L400,500 L410,550 L380,580 L340,570 L310,520 L320,490 L350,460'
        },
        {
            id: 'wb',
            name: 'West Bengal',
            path: 'M570,390 L590,370 L610,380 L630,400 L620,430 L590,470 L570,450 L560,430 L570,390'
        }
    ];
    
    // Set viewBox for SVG
    svgMap.setAttribute('viewBox', '180 150 500 500');
    svgMap.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    
    // Add background
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('x', '180');
    background.setAttribute('y', '150');
    background.setAttribute('width', '500');
    background.setAttribute('height', '500');
    background.setAttribute('fill', '#0a0a0a');
    background.setAttribute('rx', '10');
    background.setAttribute('ry', '10');
    svgMap.appendChild(background);
    
    // Create and add state paths to SVG
    states.forEach(state => {
        // Create path element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('id', state.id);
        path.setAttribute('d', state.path);
        path.setAttribute('class', 'map-state');
        path.dataset.name = state.name;
        path.dataset.id = state.id;
        
        // Add click event to show districts
        path.addEventListener('click', function() {
            const stateId = this.dataset.id;
            const stateName = this.dataset.name;
            showDistrictsForState(stateId, stateName);
        });
        
        // Add tooltip/title
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = state.name;
        path.appendChild(title);
        
        svgMap.appendChild(path);
        
        // Calculate center of path for label
        const bbox = path.getBBox();
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;
        
        // Add state label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', centerX);
        label.setAttribute('y', centerY);
        label.setAttribute('class', 'map-state-label');
        label.textContent = state.name;
        svgMap.appendChild(label);
        
        // Add state to the legend below the map
        const legendItem = document.createElement('div');
        legendItem.className = 'state-legend-item';
        legendItem.textContent = state.name;
        legendItem.dataset.id = state.id;
        legendItem.dataset.name = state.name;
        
        // Add click event to legend items
        legendItem.addEventListener('click', function() {
            showDistrictsForState(this.dataset.id, this.dataset.name);
        });
        
        // Add hover effect to highlight corresponding state on the map
        legendItem.addEventListener('mouseenter', function() {
            const mapState = document.getElementById(this.dataset.id);
            if (mapState) {
                mapState.style.fill = '#ff0000';
                mapState.style.stroke = '#ffffff';
                mapState.style.strokeWidth = '2';
            }
        });
        
        legendItem.addEventListener('mouseleave', function() {
            const mapState = document.getElementById(this.dataset.id);
            if (mapState) {
                mapState.style.fill = '';
                mapState.style.stroke = '';
                mapState.style.strokeWidth = '';
            }
        });
        
        statesLegend.appendChild(legendItem);
    });
    
    // Add water bodies (optional, to make map more attractive)
    const waterBodies = [
        {
            name: "Arabian Sea",
            path: "M180,380 L220,380 L210,410 L220,440 L250,460 L250,510 L220,550 L180,550 Z"
        },
        {
            name: "Bay of Bengal",
            path: "M590,470 L620,430 L650,450 L670,480 L680,520 L670,560 L640,580 L610,590 L580,570 L560,540 Z"
        }
    ];
    
    waterBodies.forEach(water => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', water.path);
        path.setAttribute('fill', '#103050');
        path.setAttribute('stroke', '#2a5080');
        path.setAttribute('stroke-width', '1');
        
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = water.name;
        path.appendChild(title);
        
        // Insert water bodies before states (as background)
        if (svgMap.firstChild) {
            svgMap.insertBefore(path, svgMap.firstChild.nextSibling);
        } else {
            svgMap.appendChild(path);
        }
    });
}
