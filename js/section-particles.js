document.addEventListener('DOMContentLoaded', function() {
    // Create particles containers for each section
    const sections = ['About', 'Projects', 'Contact'];
    
    sections.forEach(section => {
      // Create a new div for particles in this section
      const particlesDiv = document.createElement('div');
      particlesDiv.setAttribute('id', `${section.toLowerCase()}-particles-js`);
      particlesDiv.style.position = 'absolute';
      particlesDiv.style.top = '0';
      particlesDiv.style.left = '0';
      particlesDiv.style.width = '100%';
      particlesDiv.style.height = '100%';
      particlesDiv.style.zIndex = '0';
      particlesDiv.style.pointerEvents = 'none';
      
      // Add the particles container to the section
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        // Make sure the section has position relative for absolute positioning to work
        if (getComputedStyle(sectionElement).position === 'static') {
          sectionElement.style.position = 'relative';
        }
        sectionElement.appendChild(particlesDiv);
        
        // Initialize particles for this section
        initializeSectionParticles(section.toLowerCase());
      }
    });
    
    function initializeSectionParticles(sectionName) {
      // Different configurations for each section with more visible colors
      const configs = {
        'about': {
          color: '#AEE4FF', // cyan
          number: 40,     // Number of particles
          opacity: 0.5,  // Increased opacity
          speed: 0.5
        },
        'projects': {
          color: '#AEE4FF', // cyan
          number: 30,     // Number of particles
          opacity: 0.5,  // Increased opacity
          speed: 0.5
        },
        'contact': {
          color: '#AEE4FF', // Light cyan
          number: 25,     // Number of particles
          opacity: 0.5,  // Increased opacity
          speed: 0.5
        }
      };
      
      const config = configs[sectionName];
      
      particlesJS(`${sectionName}-particles-js`, {
        "particles": {
          "number": {
            "value": config.number,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": config.color
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            }
          },
          "opacity": {
            "value": config.opacity,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 0.3,
              "opacity_min": config.opacity * 0.5,
              "sync": false
            }
          },
          "size": {
            "value": 2.5, // Slightly larger particles
            "random": true,
            "anim": {
              "enable": true,
              "speed": 0.4,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": config.color,
            "opacity": config.opacity * 0.8, // Adjusted line opacity
            "width": 0.6 // Slightly thicker lines
          },
          "move": {
            "enable": true,
            "speed": config.speed,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": config.opacity * 2 // Stronger highlight on hover
              }
            },
            "push": {
              "particles_nb": 3 // Add particles on click
            }
          }
        },
        "retina_detect": true
      });
    }
  });