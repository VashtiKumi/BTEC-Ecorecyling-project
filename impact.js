// Enhanced Impact page JavaScript with comprehensive functionality
document.addEventListener("DOMContentLoaded", () => {
  const gsap = window.gsap;

  // Register ScrollTrigger plugin
  if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // GSAP Animations
  if (typeof gsap !== "undefined") {
    // Hero animations
    gsap.from(".page-title", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    });

    gsap.from(".page-subtitle", {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.from(".impact-counter", {
      duration: 0.8,
      scale: 0,
      opacity: 0,
      ease: "back.out(1.7)",
      delay: 0.6,
    });

    gsap.from(".hero-actions", {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power3.out",
      delay: 0.9,
    });

    // Quick facts animation
    gsap.from(".fact-item", {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".quick-facts",
        start: "top 80%",
      },
    });

    // Stats overview animation
    gsap.from(".overview-card", {
      duration: 0.8,
      y: 50,
      opacity: 2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".stats-overview",
        start: "top 80%",
      },
    });

    // Stats grid animation
    gsap.from(".stat-card", {
      duration: 0.8,
      y: 50,
      opacity: 2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top 80%",
      },
    });

    // Regional impact animation
    gsap.from(".region-selector", {
      duration: 0.8,
      y: 30,
      opacity: 3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".regional-impact",
        start: "top 80%",
      },
    });

    gsap.from(".region-stat", {
      duration: 0.6,
      scale: 0.8,
      opacity: 2,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".region-data",
        start: "top 80%",
      },
    });

    // Calculator animation
    gsap.from(".calculator-inputs", {
      duration: 0.8,
      x: -50,
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".impact-calculator",
        start: "top 80%",
      },
    });

    // Timeline animation
    gsap.from(".timeline-item", {
      duration: 0.8,
      x: (index) => (index % 2 === 0 ? -50 : 50),
      opacity: 0,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".impact-timeline",
        start: "top 80%",
      },
    });

    // Case studies animation
    gsap.from(".case-study", {
      duration: 0.8,
      y: 50,
      opacity: 3,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".case-studies",
        start: "top 80%",
      },
    });

    // Benefits breakdown animation
    gsap.from(".benefit-tab", {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".benefits-breakdown",
        start: "top 80%",
      },
    });
  }

  // Counter animation for hero
  const heroCounter = document.querySelector(".counter-number");
  if (heroCounter) {
    const target = Number.parseInt(heroCounter.dataset.target);
    animateCounter(heroCounter, target, 2000);
  }

  // Challenge stats counters
  const challengeStats = document.querySelectorAll(".challenge-stat .stat-number");
  const challengeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.dataset.target);
          animateCounter(entry.target, target, 1500);
          challengeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  challengeStats.forEach((stat) => {
    challengeObserver.observe(stat);
  });

  function animateCounter(element, target, duration = 2000) {
    let count = 0;
    const increment = target / (duration / 16);
    const counterInterval = setInterval(() => {
      if (count < target) {
        count += increment;
        element.textContent = Math.floor(count).toLocaleString();
      } else {
        element.textContent = target.toLocaleString();
        clearInterval(counterInterval);
      }
    }, 16);
  }

  // Smooth scrolling function
  window.scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Regional impact functionality
  const regionBtns = document.querySelectorAll('.region-btn');
  const regionData = {
    'north-america': {
      recyclingRate: '35%',
      co2Saved: '2.1M',
      energySaved: '15.8B',
      waterSaved: '890M'
    },
    'europe': {
      recyclingRate: '47%',
      co2Saved: '3.2M',
      energySaved: '22.4B',
      waterSaved: '1.2B'
    },
    'asia': {
      recyclingRate: '28%',
      co2Saved: '4.8M',
      energySaved: '31.6B',
      waterSaved: '2.1B'
    },
    'global': {
      recyclingRate: '32%',
      co2Saved: '12.5M',
      energySaved: '78.9B',
      waterSaved: '4.8B'
    }
  };

  regionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      regionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update data
      const region = btn.dataset.region;
      const data = regionData[region];
      
      document.getElementById('region-recycling-rate').textContent = data.recyclingRate;
      document.getElementById('region-co2-saved').textContent = data.co2Saved;
      document.getElementById('region-energy-saved').textContent = data.energySaved;
      document.getElementById('region-water-saved').textContent = data.waterSaved;

      // Animate the change
      if (typeof gsap !== "undefined") {
        gsap.from('.region-stat', {
          duration: 0.5,
          scale: 0.9,
          opacity: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        });
      }

      // Update regional chart
      updateRegionalChart(region);
    });
  });

  // Initialize Charts
  initializeCharts();

  function initializeCharts() {
    // Recycling Rates Chart
    const recyclingRatesCtx = document.getElementById("recyclingRatesChart");
    if (recyclingRatesCtx) {
      new Chart(recyclingRatesCtx, {
        type: "doughnut",
        data: {
          labels: ["Steel", "Aluminum", "Paper", "Glass", "Plastic"],
          datasets: [
            {
              data: [85, 75, 68, 33, 9],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
              borderWidth: 2,
              borderColor: "#fff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                usePointStyle: true,
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => context.label + ": " + context.parsed + "%",
              },
            },
          },
          animation: {
            animateRotate: true,
            duration: 2000,
          },
        },
      });
    }

    // Waste Generation Trends Chart
    const wasteGenerationCtx = document.getElementById("wasteGenerationChart");
    if (wasteGenerationCtx) {
      new Chart(wasteGenerationCtx, {
        type: "line",
        data: {
          labels: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
          datasets: [
            {
              label: "Global Waste (Million Tons)",
              data: [1300, 1400, 1500, 1650, 1800, 1950, 2100, 2250],
              borderColor: "#FF6384",
              backgroundColor: "rgba(255, 99, 132, 0.1)",
              borderWidth: 3,
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
            },
            x: {
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
            },
          },
          animation: {
            duration: 2000,
            easing: "easeInOutQuart",
          },
        },
      });
    }

    // Energy Savings Chart
    const energySavingsCtx = document.getElementById("energySavingsChart");
    if (energySavingsCtx) {
      new Chart(energySavingsCtx, {
        type: "bar",
        data: {
          labels: ["Aluminum", "Steel", "Paper", "Glass", "Plastic"],
          datasets: [
            {
              label: "Energy Savings (%)",
              data: [95, 74, 60, 30, 80],
              backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
              borderRadius: 8,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
              ticks: {
                callback: (value) => value + "%",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          animation: {
            duration: 2000,
            easing: "easeInOutBounce",
          },
        },
      });
    }

    // CO2 Reduction Chart
    const co2ReductionCtx = document.getElementById("co2ReductionChart");
    if (co2ReductionCtx) {
      new Chart(co2ReductionCtx, {
        type: "polarArea",
        data: {
          labels: ["Paper Recycling", "Aluminum Recycling", "Steel Recycling", "Glass Recycling", "Plastic Recycling"],
          datasets: [
            {
              data: [1200, 800, 600, 300, 150],
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 15,
                usePointStyle: true,
                font: {
                  size: 11,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => context.label + ": " + context.parsed + " million tons CO₂",
              },
            },
          },
          scales: {
            r: {
              beginAtZero: true,
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
            },
          },
          animation: {
            duration: 2000,
          },
        },
      });
    }

    // Initialize regional chart
    initializeRegionalChart();
    
    // Initialize benefits charts
    initializeBenefitsCharts();
  }

  function initializeRegionalChart() {
    const regionalCtx = document.getElementById("regionalChart");
    if (regionalCtx) {
      window.regionalChart = new Chart(regionalCtx, {
        type: "radar",
        data: {
          labels: ["Recycling Rate", "CO₂ Reduction", "Energy Savings", "Water Conservation", "Job Creation"],
          datasets: [
            {
              label: "North America",
              data: [35, 65, 70, 60, 75],
              borderColor: "#1976d2",
              backgroundColor: "rgba(25, 118, 210, 0.2)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
            },
          },
          animation: {
            duration: 1500,
          },
        },
      });
    }
  }

  function updateRegionalChart(region) {
    if (window.regionalChart) {
      const chartData = {
        'north-america': [35, 65, 70, 60, 75],
        'europe': [47, 80, 85, 78, 82],
        'asia': [28, 55, 62, 45, 68],
        'global': [32, 60, 68, 58, 72]
      };

      const regionNames = {
        'north-america': 'North America',
        'europe': 'Europe',
        'asia': 'Asia',
        'global': 'Global Average'
      };

      window.regionalChart.data.datasets[0].data = chartData[region];
      window.regionalChart.data.datasets[0].label = regionNames[region];
      window.regionalChart.update('active');
    }
  }

  function initializeBenefitsCharts() {
    // Climate Chart
    const climateCtx = document.getElementById("climateChart");
    if (climateCtx) {
      new Chart(climateCtx, {
        type: "line",
        data: {
          labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
          datasets: [
            {
              label: "CO₂ Emissions Avoided (Million Tons)",
              data: [1800, 1900, 1950, 2000, 2050, 1900, 2100, 2150, 2200, 2250],
              borderColor: "#1976d2",
              backgroundColor: "rgba(25, 118, 210, 0.1)",
              borderWidth: 3,
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
            },
            x: {
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
            },
          },
        },
      });
    }

    // Resources Chart
    const resourcesCtx = document.getElementById("resourcesChart");
    if (resourcesCtx) {
      new Chart(resourcesCtx, {
        type: "doughnut",
        data: {
          labels: ["Trees Saved", "Water Conserved", "Energy Saved", "Landfill Diverted"],
          datasets: [
            {
              data: [25, 30, 25, 20],
              backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#9c27b0"],
              borderWidth: 2,
              borderColor: "#fff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 15,
                usePointStyle: true,
              },
            },
          },
        },
      });
    }

    // Pollution Chart
    const pollutionCtx = document.getElementById("pollutionChart");
    if (pollutionCtx) {
      new Chart(pollutionCtx, {
        type: "bar",
        data: {
          labels: ["Air Pollution", "Water Pollution", "Soil Contamination", "Greenhouse Gases"],
          datasets: [
            {
              label: "Reduction Percentage",
              data: [74, 35, 58, 82],
              backgroundColor: ["#f44336", "#2196f3", "#8bc34a", "#ff9800"],
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => value + "%",
              },
            },
          },
        },
      });
    }

    // Economy Chart
    const economyCtx = document.getElementById("economyChart");
    if (economyCtx) {
      new Chart(economyCtx, {
        type: "pie",
        data: {
          labels: ["Direct Jobs", "Indirect Jobs", "Economic Activity", "Tax Revenue"],
          datasets: [
            {
              data: [35, 25, 30, 10],
              backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#9c27b0"],
              borderWidth: 2,
              borderColor: "#fff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 15,
                usePointStyle: true,
              },
            },
          },
        },
      });
    }
  }

  // Benefits tabs functionality
  const benefitTabs = document.querySelectorAll('.benefit-tab');
  const benefitPanels = document.querySelectorAll('.benefit-panel');

  benefitTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and panels
      benefitTabs.forEach(t => t.classList.remove('active'));
      benefitPanels.forEach(p => p.classList.remove('active'));

      // Add active class to clicked tab
      tab.classList.add('active');

      // Show corresponding panel
      const benefit = tab.dataset.benefit;
      const panel = document.getElementById(`${benefit}-panel`);
      if (panel) {
        panel.classList.add('active');
      }
    });
  });

  // Impact Calculator
  const calculateBtn = document.getElementById("calculateBtn");
  const calculatorResults = document.getElementById("calculatorResults");

  if (calculateBtn) {
    calculateBtn.addEventListener("click", calculateImpact);
  }

  // Auto-calculate on input change
  const inputs = document.querySelectorAll(".input-group input");
  inputs.forEach((input) => {
    input.addEventListener("input", debounce(calculateImpact, 500));
  });

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Preset functionality
  window.setPreset = (type) => {
    const presets = {
      light: { paper: 5, plastic: 2, glass: 1, metal: 1 },
      average: { paper: 10, plastic: 5, glass: 3, metal: 2 },
      heavy: { paper: 20, plastic: 12, glass: 8, metal: 5 }
    };

    const preset = presets[type];
    if (preset) {
      document.getElementById('paperInput').value = preset.paper;
      document.getElementById('plasticInput').value = preset.plastic;
      document.getElementById('glassInput').value = preset.glass;
      document.getElementById('metalInput').value = preset.metal;
      
      // Trigger calculation
      setTimeout(calculateImpact, 100);
    }
  };

  function calculateImpact() {
    const paper = Number.parseFloat(document.getElementById("paperInput").value) || 0;
    const plastic = Number.parseFloat(document.getElementById("plasticInput").value) || 0;
    const glass = Number.parseFloat(document.getElementById("glassInput").value) || 0;
    const metal = Number.parseFloat(document.getElementById("metalInput").value) || 0;

    // Annual amounts (multiply by 12)
    const annualPaper = paper * 12;
    const annualPlastic = plastic * 12;
    const annualGlass = glass * 12;
    const annualMetal = metal * 12;

    // Calculate impacts based on EPA data (example conversion factors)
    // These are simplified for demonstration and may not reflect exact EPA figures.
    const impacts = {
      trees: Math.round(annualPaper * 0.017), // 17 trees per ton, 1 ton = 2000 lbs, so 17/2000 = 0.0085 trees/lb. Adjusted for more visible impact.
      energy: Math.round(annualPaper * 6400 / 2000 + annualPlastic * 5774 / 2000 + annualGlass * 42 / 2000 + annualMetal * 14000 / 2000), // kWh per ton, converted to kWh per lb
      water: Math.round(annualPaper * 7000 + annualPlastic * 24 + annualGlass * 12 + annualMetal * 40), // gallons per ton, simplified
      co2: Math.round(annualPaper * 1.5 + annualPlastic * 1.2 + annualGlass * 0.2 + annualMetal * 2.5), // lbs CO2 per lb of material recycled, simplified
    };

    // Update results
    updateResult("treesSaved", impacts.trees);
    updateResult("energySaved", impacts.energy.toLocaleString());
    updateResult("waterSaved", impacts.water.toLocaleString());
    updateResult("co2Reduced", impacts.co2.toLocaleString());

    // Update comparisons
    const miles = Math.round(impacts.co2 * 2.4); // 1 lb CO2 saved is equivalent to 2.4 miles not driven
    const lightbulbs = Math.round(impacts.energy / 10); // 10 kWh powers an LED bulb for a year
    const heatingDays = Math.round(impacts.energy / 30); // 30 kWh heats a home for a day

    updateResult("milesSaved", miles.toLocaleString());
    updateResult("lightbulbs", lightbulbs.toLocaleString());
    updateResult("heatingDays", heatingDays);

    // Update timeline data
    updateTimelineData(impacts);

    // Calculate and display grade
    calculateGrade(impacts);

    // Show results with animation
    calculatorResults.style.display = "block";
    calculatorResults.classList.add("show");

    if (typeof gsap !== "undefined") {
      gsap.from(".result-item", {
        duration: 0.6,
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }
  }

  function updateTimelineData(impacts) {
    // Update timeline stats based on calculated impacts
    document.getElementById('daily-co2').textContent = (impacts.co2 / 365).toFixed(1);
    document.getElementById('daily-energy').textContent = (impacts.energy / 365).toFixed(1);
    document.getElementById('weekly-co2').textContent = (impacts.co2 / 52).toFixed(1);
    document.getElementById('weekly-trees').textContent = (impacts.trees / 52).toFixed(1);
    document.getElementById('monthly-co2').textContent = (impacts.co2 / 12).toFixed(0);
    document.getElementById('monthly-water').textContent = (impacts.water / 12).toFixed(0);
    document.getElementById('yearly-co2').textContent = impacts.co2;
    document.getElementById('yearly-trees').textContent = impacts.trees;
  }

  function calculateGrade(impacts) {
    // Calculate grade based on total impact score
    // Increased multipliers for a more sensitive grading system
    const totalScore = impacts.trees * 50 + impacts.energy * 0.5 + impacts.water * 0.005 + impacts.co2 * 0.1;
    
    let grade, description, suggestions;
    
    if (totalScore >= 10000) { // Adjusted thresholds
      grade = "A+";
      description = "Outstanding! You're an environmental champion!";
      suggestions = ["Share your success with others", "Consider starting a community program"];
    } else if (totalScore >= 7500) {
      grade = "A";
      description = "Excellent impact! You're making a real difference.";
      suggestions = ["Try to increase metal recycling", "Look into composting"];
    } else if (totalScore >= 5000) {
      grade = "B+";
      description = "Great job! You're making a significant impact.";
      suggestions = ["Increase paper recycling by 20%", "Start recycling electronics"];
    } else if (totalScore >= 3000) {
      grade = "B";
      description = "Good work! There's room for improvement.";
      suggestions = ["Focus on increasing all materials", "Learn about proper sorting"];
    } else if (totalScore >= 1500) {
      grade = "C+";
      description = "You're on the right track, keep going!";
      suggestions = ["Double your current recycling efforts", "Join a local recycling program"];
    } else {
      grade = "C";
      description = "Every bit helps! Let's increase your impact.";
      suggestions = ["Start with paper and plastic", "Set weekly recycling goals"];
    }

    document.getElementById('impactGrade').textContent = grade;
    document.getElementById('gradeDescription').textContent = description;
    
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = suggestions.map(s => `<li>${s}</li>`).join('');
  }

  function updateResult(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
      const currentValue = Number.parseFloat(element.textContent.replace(/,/g, "")) || 0; // Use parseFloat for potential decimal values
      animateValue(element, currentValue, value, 1000);
    }
  }

  function animateValue(element, start, end, duration) {
    let currentStart = typeof start === 'string' ? Number.parseFloat(start.replace(/,/g, "")) : start;
    let currentEnd = typeof end === 'string' ? Number.parseFloat(end.replace(/,/g, "")) : end;

    const range = currentEnd - currentStart;
    const increment = range / (duration / 16);
    let current = currentStart;

    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= currentEnd) || (increment < 0 && current <= currentEnd)) {
        current = currentEnd;
        clearInterval(timer);
      }
      element.textContent = (typeof end === 'string' && !Number.isFinite(currentEnd)) ? end : Math.floor(current).toLocaleString();
    }, 16);
  }


  // Case studies filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseStudies = document.querySelectorAll('.case-study');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter case studies
      const filter = btn.dataset.filter;
      caseStudies.forEach(study => {
        if (filter === 'all' || study.dataset.category === filter) {
          study.style.display = 'block';
          if (typeof gsap !== "undefined") {
            gsap.from(study, {
              duration: 0.5,
              opacity: 0,
              y: 20,
              ease: "power2.out"
            });
          }
        } else {
          study.style.display = 'none';
        }
      });
    });
  });

  // Modal functionality
  window.showChartInfo = (chartType) => {
    const modal = document.getElementById('chartInfoModal');
    const content = document.getElementById('chartInfoContent');
    
    const chartInfo = {
      'recycling-rates': {
        title: 'Global Recycling Rates by Material',
        content: `
          <h3>Understanding Recycling Rates</h3>
          <p>Different materials have vastly different recycling rates worldwide:</p>
          <ul>
            <li><strong>Steel (85%):</strong> Most recycled material globally due to magnetic separation</li>
            <li><strong>Aluminum (75%):</strong> Highly valuable and infinitely recyclable</li>
            <li><strong>Paper (68%):</strong> Widely collected but quality degrades with each cycle</li>
            <li><strong>Glass (33%):</strong> Infinitely recyclable but collection challenges exist</li>
            <li><strong>Plastic (9%):</strong> Complex sorting and contamination issues</li>
          </ul>
          <p>These rates vary significantly by region and local infrastructure.</p>
        `
      },
      'waste-generation': {
        title: 'Global Waste Generation Trends',
        content: `
          <h3>Rising Waste Challenge</h3>
          <p>Global waste generation has been steadily increasing:</p>
          <ul>
            <li>Population growth and urbanization drive waste increases</li>
            <li>Economic development leads to higher consumption</li>
            <li>Packaging and single-use items contribute significantly</li>
            <li>Electronic waste is the fastest-growing waste stream</li>
          </ul>
          <p>Without intervention, waste generation could increase by 70% by 2050.</p>
        `
      },
      'energy-savings': {
        title: 'Energy Savings from Recycling',
        content: `
          <h3>Energy Conservation Benefits</h3>
          <p>Recycling saves substantial energy compared to virgin material production:</p>
          <ul>
            <li><strong>Aluminum:</strong> 95% energy savings - most efficient</li>
            <li><strong>Plastic:</strong> 80% energy savings</li>
            <li><strong>Steel:</strong> 74% energy savings</li>
            <li><strong>Paper:</strong> 60% energy savings</li>
            <li><strong>Glass:</strong> 30% energy savings</li>
          </ul>
          <p>These savings translate to reduced fossil fuel consumption and lower emissions.</p>
        `
      },
      'co2-reduction': {
        title: 'CO₂ Emissions Reduction',
        content: `
          <h3>Climate Impact of Recycling</h3>
          <p>Annual CO₂ reduction by recycling activity (in million tons):</p>
          <ul>
            <li><strong>Paper Recycling:</strong> 1,200 million tons CO₂ saved</li>
            <li><strong>Aluminum Recycling:</strong> 800 million tons CO₂ saved</li>
            <li><strong>Steel Recycling:</strong> 600 million tons CO₂ saved</li>
            <li><strong>Glass Recycling:</strong> 300 million tons CO₂ saved</li>
            <li><strong>Plastic Recycling:</strong> 150 million tons CO₂ saved</li>
          </ul>
          <p>This is equivalent to removing over 250 million cars from the road annually.</p>
        `
      }
    };

    const info = chartInfo[chartType];
    if (info) {
      content.innerHTML = `<h2>${info.title}</h2>${info.content}`;
      modal.classList.add('show');
    }
  };

  window.showCaseStudyDetails = (caseStudyId) => {
    const modal = document.getElementById('caseStudyModal');
    const content = document.getElementById('caseStudyContent');

    const caseStudyDetails = {
      'lincoln-high': {
        title: 'Lincoln High School: A Green Transformation',
        content: `
          <h3>Comprehensive Recycling Program</h3>
          <p>Lincoln High School launched a school-wide recycling program, integrating it into daily operations and curriculum. Students led awareness campaigns, set up recycling bins in every classroom, and organized collection drives for hard-to-recycle items like electronics.</p>
          <h4>Key Achievements:</h4>
          <ul>
            <li><strong>75% Waste Reduction:</strong> Significant decrease in landfill waste.</li>
            <li><strong>$5,000 Annual Savings:</strong> Reduced waste disposal costs.</li>
            <li><strong>1,200 Students Engaged:</strong> High participation rate across all grades.</li>
            <li><strong>Curriculum Integration:</strong> Environmental science classes used school data for projects.</li>
          </ul>
          <p>The program fostered a strong sense of environmental responsibility among students and staff, making Lincoln High a model for other schools in the district.</p>
          <div class="case-study-quote">
            "Our students are now environmental leaders in their community, inspiring their families and friends to adopt more sustainable practices. This program has been a game-changer for our school culture."
            <cite>- Principal Sarah Johnson</cite>
          </div>
        `
      },
      'tech-corp': {
        title: 'Tech Corp Office: Achieving Zero Waste',
        content: `
          <h3>Innovative Zero-Waste Initiative</h3>
          <p>Tech Corp implemented an ambitious zero-waste program, focusing on reducing, reusing, and recycling across all departments. This included eliminating single-use plastics, introducing reusable containers in the cafeteria, and establishing robust composting and recycling streams.</p>
          <h4>Key Achievements:</h4>
          <ul>
            <li><strong>90% Diversion Rate:</strong> Vast majority of waste diverted from landfills.</li>
            <li><strong>500 Employees Engaged:</strong> High adoption rate through workshops and incentives.</li>
            <li><strong>50 Tons Diverted:</strong> Significant environmental impact.</li>
            <li><strong>Cost Savings:</strong> Reduced waste collection fees and increased material sales.</li>
          </ul>
          <p>The success of Tech Corp's initiative demonstrates that large businesses can achieve significant environmental goals with dedicated effort and employee buy-in.</p>
          <div class="case-study-quote">
            "Recycling became part of our company culture. Employees are proud to work for a company that prioritizes sustainability, and it has even boosted morale and team cohesion."
            <cite>- HR Director Mike Chen</cite>
          </div>
        `
      },
      'green-community': {
        title: 'Green Community: Neighborhood-Wide Sustainability',
        content: `
          <h3>Community-Led Composting and Recycling</h3>
          <p>The Green Community project brought neighbors together to implement a comprehensive composting and recycling program. Volunteers educated residents on proper sorting, organized communal composting bins, and facilitated bulk recycling of challenging items.</p>
          <h4>Key Achievements:</h4>
          <ul>
            <li><strong>60% Organic Waste Diverted:</strong> Major reduction in food waste sent to landfills.</li>
            <li><strong>200 Families Participating:</strong> Strong community involvement.</li>
            <li><strong>30 Tons Composted:</strong> Rich compost used for local gardens.</li>
            <li><strong>Stronger Community Bonds:</strong> Fostered collaboration and shared purpose.</li>
          </ul>
          <p>This initiative proved that collective action at the neighborhood level can lead to substantial environmental benefits and stronger community ties.</p>
          <div class="case-study-quote">
            "Our neighborhood is cleaner and greener than ever! It's amazing what we can achieve when we work together towards a common goal. The Green Community project has truly transformed our area."
            <cite>- Community Leader Maria Rodriguez</cite>
          </div>
        `
      },
      'university-campus': {
        title: 'University Campus Initiative: Researching a Sustainable Future',
        content: `
          <h3>Integrated Campus Sustainability Program</h3>
          <p>This university launched a multi-faceted sustainability program, encompassing waste management, energy efficiency, and water conservation. A unique aspect was the integration of student research, with environmental science and engineering students analyzing campus data and proposing innovative solutions.</p>
          <h4>Key Achievements:</h4>
          <ul>
            <li><strong>85% Waste Diversion:</strong> High rate of materials recycled and composted.</li>
            <li><strong>15,000 Students Involved:</strong> Broad engagement across all faculties.</li>
            <li><strong>200 Tons Recycled:</strong> Significant volume of materials diverted.</li>
            <li><strong>Student-Led Innovations:</strong> Implementation of student-designed waste reduction strategies.</li>
          </ul>
          <p>The initiative not only improved the campus's environmental footprint but also provided invaluable hands-on learning experiences for students, preparing them to be future leaders in sustainability.</p>
          <div class="case-study-quote">
            "Students are conducting real research on campus sustainability, turning our university into a living laboratory. This practical experience is crucial for developing the next generation of environmental problem-solvers."
            <cite>- Dr. Emily Watson, Environmental Science Department</cite>
          </div>
        `
      }
    };

    const details = caseStudyDetails[caseStudyId];
    if (details) {
      content.innerHTML = `<h2>${details.title}</h2>${details.content}`;
      modal.classList.add('show');
    }
  };

  window.showChallengeDetails = () => {
    const modal = document.getElementById('challengeModal');
    modal.classList.add('show');
  };

  window.closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
    }
  };

  // Share Impact functionality
  window.shareImpact = (platform) => {
    const treesSaved = document.getElementById('treesSaved').textContent;
    const energySaved = document.getElementById('energySaved').textContent;
    const co2Reduced = document.getElementById('co2Reduced').textContent;
    const grade = document.getElementById('impactGrade').textContent;

    const text = `I've saved ${treesSaved} trees, ${energySaved} kWh energy, and reduced ${co2Reduced} lbs of CO₂ by recycling! My environmental grade is ${grade}. Calculate your impact at EcoRecycle Hub! #EcoRecycle #RecycleImpact`;
    const url = window.location.href;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}&u=${encodeURIComponent(url)}`, '_blank');
    }
  };

  window.copyImpact = () => {
    const treesSaved = document.getElementById('treesSaved').textContent;
    const energySaved = document.getElementById('energySaved').textContent;
    const waterSaved = document.getElementById('waterSaved').textContent;
    const co2Reduced = document.getElementById('co2Reduced').textContent;
    const grade = document.getElementById('impactGrade').textContent;

    const textToCopy = `My Annual Recycling Impact:\n` +
                       `Trees Saved: ${treesSaved}\n` +
                       `Energy Saved: ${energySaved} kWh\n` +
                       `Water Saved: ${waterSaved} Gallons\n` +
                       `CO₂ Reduced: ${co2Reduced} lbs\n` +
                       `Environmental Grade: ${grade}\n\n` +
                       `Calculate your own impact at EcoRecycle Hub: ${window.location.href}`;

    // Use document.execCommand('copy') for better compatibility in iframes
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed"; // Avoid scrolling to bottom
    textArea.style.left = "-9999px"; // Hide element
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      // Replace alert with a custom message box or toast notification
      displayMessage("Results copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy text: ', err);
      displayMessage("Failed to copy results. Please try manually.", true);
    }
    document.body.removeChild(textArea);
  };

  window.downloadReport = () => {
    const treesSaved = document.getElementById('treesSaved').textContent;
    const energySaved = document.getElementById('energySaved').textContent;
    const waterSaved = document.getElementById('waterSaved').textContent;
    const co2Reduced = document.getElementById('co2Reduced').textContent;
    const grade = document.getElementById('impactGrade').textContent;

    const reportContent = `EcoRecycle Hub - Your Annual Environmental Impact Report\n\n` +
                          `--------------------------------------------------\n` +
                          `Trees Saved: ${treesSaved}\n` +
                          `Energy Saved: ${energySaved} kWh\n` +
                          `Water Saved: ${waterSaved} Gallons\n` +
                          `CO₂ Reduced: ${co2Reduced} lbs\n` +
                          `Environmental Grade: ${grade}\n` +
                          `--------------------------------------------------\n\n` +
                          `Thank you for making a difference! Continue your efforts to help our planet.\n` +
                          `Find more tips and challenges at: ${window.location.href}`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'EcoRecycle_Impact_Report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    displayMessage("Your impact report has been downloaded!");
  };

  // Custom message box function (replaces alert)
  function displayMessage(message, isError = false) {
    let messageBox = document.getElementById('customMessageBox');
    if (!messageBox) {
      messageBox = document.createElement('div');
      messageBox.id = 'customMessageBox';
      messageBox.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1001;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        max-width: 80%;
        text-align: center;
      `;
      document.body.appendChild(messageBox);
    }

    messageBox.textContent = message;
    messageBox.style.backgroundColor = isError ? '#dc3545' : '#333';
    messageBox.style.opacity = '1';

    setTimeout(() => {
      messageBox.style.opacity = '0';
    }, 3000);
  }

  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const email = emailInput.value;

      if (email) {
        // Here you would typically send the email to a server
        console.log(`Subscribing email: ${email}`);
        displayMessage("Thank you for subscribing to our newsletter!");
        emailInput.value = ''; // Clear the input
      } else {
        displayMessage("Please enter a valid email address.", true);
      }
    });
  }

  // Initial calculation on page load to populate results
  calculateImpact();
});

document.addEventListener("DOMContentLoaded", () => {
  // Case Studies Filter
  const filterBtns = document.querySelectorAll(".filter-btn")
  const caseStudies = document.querySelectorAll(".case-study")

  // Ensure case studies are visible
  function ensureCaseStudiesVisible() {
    const caseStudies = document.querySelectorAll(".case-study")
    caseStudies.forEach((study) => {
      study.style.display = "block"
      study.style.opacity = "1"
      study.style.visibility = "visible"
    })
  }

  // Call the function after DOM is loaded
  ensureCaseStudiesVisible()

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Filter case studies
      const filter = btn.dataset.filter
      caseStudies.forEach((study) => {
        if (filter === "all" || study.dataset.category === filter) {
          study.style.display = "block"
          study.style.opacity = "1"
          study.style.visibility = "visible"
          if (typeof gsap !== "undefined") {
            gsap.from(study, {
              duration: 0.5,
              opacity: 0,
              y: 20,
              ease: "power2.out",
            })
          }
        } else {
          study.style.display = "none"
          study.style.opacity = "0"
          study.style.visibility = "hidden"
        }
      })
    })
  })
})

