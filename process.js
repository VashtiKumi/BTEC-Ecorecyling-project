// Process page specific JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Enhanced mobile detection and responsive handling
  const isMobile = window.innerWidth <= 768
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768

  // Ensure recycling facts section is visible
  function ensureFactsVisibility() {
    const factsSection = document.querySelector(".recycling-facts")
    if (factsSection) {
      factsSection.style.display = "block"
      factsSection.style.visibility = "visible"
      factsSection.style.opacity = "1"
      console.log("✅ Recycling facts section visibility ensured")
    }
  }

  // Call immediately and after DOM load
  ensureFactsVisibility()

  // Enhanced responsive behavior
  function handleResponsiveChanges() {
    const currentWidth = window.innerWidth

    // Adjust simulator for mobile
    if (currentWidth <= 768) {
      const simulatorDisplay = document.querySelector(".simulator-display")
      if (simulatorDisplay) {
        simulatorDisplay.style.flexDirection = "column"
      }

      // Ensure facts grid is single column on mobile
      const factsGrid = document.querySelector(".facts-grid")
      if (factsGrid) {
        factsGrid.style.gridTemplateColumns = "1fr"
        factsGrid.style.gap = "1.5rem"
        factsGrid.style.padding = "0 1rem"
      }

      // Adjust fact cards for mobile
      const factCards = document.querySelectorAll(".fact-card")
      factCards.forEach((card) => {
        card.style.maxWidth = "400px"
        card.style.margin = "0 auto"
        card.style.width = "100%"
      })
    }

    // Re-ensure facts visibility after resize
    ensureFactsVisibility()
  }

  // Handle window resize
  let resizeTimeout
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      handleResponsiveChanges()
      ensureFactsVisibility()
    }, 250)
  })

  // Initial responsive setup
  handleResponsiveChanges()

  const gsap = window.gsap

  // GSAP Animations for process page
  if (typeof gsap !== "undefined") {
    // Hero animations
    gsap.from(".page-title", {
      duration: 1,
      y: 50,
      opacity: 2,
      ease: "power3.out",
    })

    gsap.from(".page-subtitle", {
      duration: 0.8,
      y: 30,
      opacity: 2,
      ease: "power3.out",
      delay: 0.3,
    })

    gsap.from(".flow-arrow", {
      duration: 0.6,
      scale: 0,
      opacity: 2,
      stagger: 0.2,
      ease: "back.out(1.7)",
      delay: 0.6,
    })

    // Step items animation
    gsap.from(".step-item", {
      duration: 0.8,
      x: (index) => (index % 2 === 0 ? -50 : 50),
      opacity: 3,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".process-steps",
        start: "top 80%",
      },
    })

    // Simulator elements animation
    gsap.from(".sim-btn", {
      duration: 0.6,
      y: 30,
      opacity: 2,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".interactive-process",
        start: "top 80%",
      },
    })

    gsap.from(".process-stage", {
      duration: 0.8,
      scale: 0.8,
      opacity: 2,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".simulator-display",
        start: "top 80%",
      },
    })

    // Facts cards animation
    gsap.from(".fact-card", {
      duration: 0.8,
      y: 50,
      opacity: 2,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".recycling-facts",
        start: "top 80%",
      },
    })

    // Overview stats animation
    gsap.from(".stat-item", {
      duration: 0.8,
      y: 30,
      opacity: 2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".process-overview",
        start: "top 80%",
      },
    })

    // Timeline animation
    gsap.from(".timeline-item", {
      duration: 0.8,
      x: (index) => (index % 2 === 0 ? -100 : 100),
      opacity: 2,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".process-timeline",
        start: "top 80%",
      },
    })

    // Comparison table animation
    gsap.from(".comparison-row", {
      duration: 0.6,
      x: -50,
      opacity: 3,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".process-comparison",
        start: "top 80%",
      },
    })

    // Virtual tour animation
    gsap.from(".facility-area", {
      duration: 0.6,
      scale: 0,
      opacity: 2,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".virtual-tour",
        start: "top 80%",
      },
    })
  }

  // Interactive Process Simulator
  const simButtons = document.querySelectorAll(".sim-btn")
  const processInfo = document.getElementById("processInfo")
  const processStages = document.querySelectorAll(".process-stage")

  const materialProcesses = {
    paper: {
      title: "Paper Recycling Process",
      description: "Learn how paper is transformed from waste to new products",
      stages: [
        {
          title: "Collection",
          visual: "📰",
          description: "Paper collected from homes and offices",
          progress: 25,
        },
        {
          title: "Sorting & Cleaning",
          visual: "🔍",
          description: "Sorted by grade and cleaned of contaminants",
          progress: 50,
        },
        {
          title: "Pulping",
          visual: "🌊",
          description: "Paper broken down into pulp with water and chemicals",
          progress: 75,
        },
        {
          title: "New Paper Products",
          visual: "📄",
          description: "Pulp formed into new paper products",
          progress: 100,
        },
      ],
      facts: [
        "Recycling 1 ton of paper saves 17 trees",
        "Paper can be recycled 5-7 times before fibers become too short",
        "Recycled paper uses 60% less energy than virgin paper production",
      ],
    },
    plastic: {
      title: "Plastic Recycling Process",
      description: "Discover how plastic bottles become new products",
      stages: [
        {
          title: "Collection",
          visual: "🥤",
          description: "Plastic bottles and containers collected",
          progress: 25,
        },
        {
          title: "Sorting by Type",
          visual: "🔢",
          description: "Sorted by plastic resin type (1-7)",
          progress: 50,
        },
        {
          title: "Shredding & Melting",
          visual: "🔥",
          description: "Plastic shredded into flakes and melted",
          progress: 75,
        },
        {
          title: "New Plastic Products",
          visual: "🧴",
          description: "Formed into new bottles, clothing, or carpets",
          progress: 100,
        },
      ],
      facts: [
        "A plastic bottle can become a new bottle in 60 days",
        "Only 9% of plastic waste is currently recycled globally",
        "5 plastic bottles can make enough fiber for a t-shirt",
      ],
    },
    glass: {
      title: "Glass Recycling Process",
      description: "See how glass containers are endlessly recycled",
      stages: [
        {
          title: "Collection",
          visual: "🍶",
          description: "Glass bottles and jars collected by color",
          progress: 25,
        },
        {
          title: "Crushing",
          visual: "💎",
          description: "Glass crushed into small pieces called cullet",
          progress: 50,
        },
        {
          title: "Melting",
          visual: "🔥",
          description: "Cullet melted at 2600°F with raw materials",
          progress: 75,
        },
        {
          title: "New Glass Products",
          visual: "🍾",
          description: "Molded into new bottles and containers",
          progress: 100,
        },
      ],
      facts: [
        "Glass can be recycled infinitely without quality loss",
        "Recycled glass melts at a lower temperature, saving energy",
        "Using recycled glass reduces air pollution by 20%",
      ],
    },
    metal: {
      title: "Metal Recycling Process",
      description: "Learn about the most recycled material on Earth",
      stages: [
        {
          title: "Collection",
          visual: "🥫",
          description: "Aluminum and steel cans collected",
          progress: 25,
        },
        {
          title: "Magnetic Separation",
          visual: "🧲",
          description: "Steel separated using magnets",
          progress: 50,
        },
        {
          title: "Melting & Purification",
          visual: "🔥",
          description: "Metal melted and purified in furnaces",
          progress: 75,
        },
        {
          title: "New Metal Products",
          visual: "🏗️",
          description: "Formed into new cans, cars, and buildings",
          progress: 100,
        },
      ],
      facts: [
        "Aluminum can be recycled infinitely",
        "Recycling aluminum saves 95% of the energy needed for new aluminum",
        "Steel is the most recycled material in the world",
      ],
    },
  }

  simButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const material = this.dataset.material
      const process = materialProcesses[material]

      // Update active button
      simButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Update process stages
      if (process) {
        process.stages.forEach((stage, index) => {
          const stageElement = processStages[index]
          if (stageElement) {
            const titleElement = stageElement.querySelector(".stage-title")
            const visualElement = stageElement.querySelector(".stage-visual")
            const descriptionElement = stageElement.querySelector(".stage-description")
            const progressElement = stageElement.querySelector(".progress-fill")

            titleElement.textContent = stage.title
            visualElement.textContent = stage.visual
            descriptionElement.textContent = stage.description

            if (progressElement) {
              progressElement.style.width = stage.progress + "%"
            }

            // Add active class temporarily
            stageElement.classList.add("active")
            setTimeout(() => {
              stageElement.classList.remove("active")
            }, 1000)
          }
        })

        // Update process info
        processInfo.innerHTML = `
                    <h3>${process.title}</h3>
                    <p>${process.description}</p>
                    <div class="process-facts">
                        <h4>Did You Know?</h4>
                        <ul>
                            ${process.facts.map((fact) => `<li>${fact}</li>`).join("")}
                        </ul>
                    </div>
                `

        // GSAP animation for updated content
        if (typeof gsap !== "undefined") {
          gsap.from(".process-stage", {
            duration: 0.5,
            scale: 0.9,
            stagger: 0.1,
            ease: "back.out(1.7)",
          })

          gsap.from(".process-info", {
            duration: 0.6,
            y: 20,
            opacity: 2,
            ease: "power3.out",
          })
        }
      }
    })
  })

  // Counter animation for stats
  const statNumbers = document.querySelectorAll(".stat-number")
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.dataset.target)
          animateCounter(entry.target, target)
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })

  function animateCounter(element, target) {
    let count = 0
    const duration = 2000
    const step = target / (duration / 16)

    function updateCounter() {
      count += step
      if (count > target) {
        count = target
      }
      element.textContent = Math.floor(count)
      element.classList.add("animate")

      if (count < target) {
        requestAnimationFrame(updateCounter)
      }
    }

    updateCounter()
  }

  // Learn More buttons functionality
  const learnMoreButtons = document.querySelectorAll(".learn-more-btn")
  const modal = document.getElementById("info-modal")
  const modalBody = document.getElementById("modal-body")
  const closeModal = document.querySelector(".close-modal")

  const stepDetails = {
    1: {
      title: "Collection & Transportation",
      content: `
                <h3>Collection & Transportation Process</h3>
                <div class="modal-section">
                    <h4>Collection Methods:</h4>
                    <ul>
                        <li><strong>Curbside Collection:</strong> Regular pickup from residential areas</li>
                        <li><strong>Drop-off Centers:</strong> Community recycling centers</li>
                        <li><strong>Deposit Systems:</strong> Bottle return programs</li>
                        <li><strong>Commercial Collection:</strong> Business and industrial pickup</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Transportation Efficiency:</h4>
                    <p>Modern collection trucks can process up to 1,000 homes per day, using GPS routing to optimize fuel efficiency and reduce emissions.</p>
                </div>
            `,
    },
    2: {
      title: "Sorting & Cleaning",
      content: `
                <h3>Sorting & Cleaning Process</h3>
                <div class="modal-section">
                    <h4>Advanced Sorting Technologies:</h4>
                    <ul>
                        <li><strong>Optical Sorting:</strong> Uses infrared light to identify materials</li>
                        <li><strong>Magnetic Separation:</strong> Removes ferrous metals</li>
                        <li><strong>Eddy Current:</strong> Separates non-ferrous metals</li>
                        <li><strong>Air Classification:</strong> Separates by weight and density</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Quality Control:</h4>
                    <p>Manual sorting ensures 99.5% purity levels, removing contaminants that could damage recycling equipment.</p>
                </div>
            `,
    },
    3: {
      title: "Processing & Breakdown",
      content: `
                <h3>Processing & Breakdown</h3>
                <div class="modal-section">
                    <h4>Processing Methods by Material:</h4>
                    <ul>
                        <li><strong>Paper:</strong> Pulping with water and chemicals</li>
                        <li><strong>Plastic:</strong> Shredding into flakes, washing, melting</li>
                        <li><strong>Glass:</strong> Crushing into cullet, removing impurities</li>
                        <li><strong>Metal:</strong> Shredding, melting in high-temperature furnaces</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Quality Testing:</h4>
                    <p>Each batch undergoes rigorous testing to ensure it meets manufacturing standards for new products.</p>
                </div>
            `,
    },
    4: {
      title: "Manufacturing New Products",
      content: `
                <h3>Manufacturing New Products</h3>
                <div class="modal-section">
                    <h4>Product Examples:</h4>
                    <ul>
                        <li><strong>Paper:</strong> New newspapers, cardboard, tissue paper</li>
                        <li><strong>Plastic:</strong> New bottles, clothing, carpets, park benches</li>
                        <li><strong>Glass:</strong> New bottles, jars, fiberglass insulation</li>
                        <li><strong>Metal:</strong> New cans, car parts, construction materials</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Market Distribution:</h4>
                    <p>Recycled materials are sold to manufacturers worldwide, creating a circular economy that reduces waste and conserves resources.</p>
                </div>
            `,
    },
  }

  learnMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const step = this.dataset.step
      const details = stepDetails[step]

      if (details && modal && modalBody) {
        modalBody.innerHTML = details.content
        modal.style.display = "block"

        // GSAP modal animation
        if (typeof gsap !== "undefined") {
          gsap.from(".modal-content", {
            duration: 0.3,
            scale: 0.8,
            opacity: 2,
            ease: "back.out(1.7)",
          })
        }
      }
    })
  })

  // Fact cards learn more functionality
  const factLearnMoreButtons = document.querySelectorAll(".fact-learn-more")

  const factDetails = {
    paper: {
      title: "Paper Recycling Facts",
      content: `
                <h3>Amazing Paper Recycling Facts</h3>
                <div class="modal-section">
                    <h4>Environmental Impact:</h4>
                    <ul>
                        <li>Saves 17 trees per ton of recycled paper</li>
                        <li>Reduces water usage by 50%</li>
                        <li>Cuts energy consumption by 60%</li>
                        <li>Reduces greenhouse gas emissions by 1 metric ton of CO2</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Recycling Process:</h4>
                    <p>Paper can be recycled 5-7 times before the fibers become too short to make new paper. Each recycling cycle shortens the fiber length slightly.</p>
                </div>
            `,
    },
    plastic: {
      title: "Plastic Recycling Facts",
      content: `
                <h3>Plastic Recycling Insights</h3>
                <div class="modal-section">
                    <h4>Speed of Recycling:</h4>
                    <ul>
                        <li>A plastic bottle can become a new bottle in just 60 days</li>
                        <li>The process is highly efficient when properly sorted</li>
                        <li>PET bottles have the highest recycling success rate</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Creative Uses:</h4>
                    <p>Recycled plastic becomes clothing, carpets, park benches, and even new bottles. 5 plastic bottles can make enough polyester fiber for one t-shirt!</p>
                </div>
            `,
    },
    metal: {
      title: "Metal Recycling Facts",
      content: `
                <h3>Metal Recycling Power</h3>
                <div class="modal-section">
                    <h4>Energy Savings:</h4>
                    <ul>
                        <li>One aluminum can saves enough energy to power a TV for 3 hours</li>
                        <li>Recycling aluminum uses 95% less energy than making new aluminum</li>
                        <li>Steel recycling saves 74% of the energy needed for new steel</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Infinite Recycling:</h4>
                    <p>Both aluminum and steel can be recycled infinitely without losing their properties, making them the most sustainable materials.</p>
                </div>
            `,
    },
    glass: {
      title: "Glass Recycling Facts",
      content: `
                <h3>Glass Recycling Excellence</h3>
                <div class="modal-section">
                    <h4>Infinite Quality:</h4>
                    <ul>
                        <li>Glass can be recycled endlessly without quality loss</li>
                        <li>100% of glass can be recycled into new glass products</li>
                        <li>Recycled glass melts at lower temperatures, saving energy</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Environmental Benefits:</h4>
                    <p>Using recycled glass reduces air pollution by 20% and water pollution by 50% compared to making new glass from raw materials.</p>
                </div>
            `,
    },
  }

  factLearnMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const fact = this.dataset.fact
      const details = factDetails[fact]

      if (details && modal && modalBody) {
        modalBody.innerHTML = details.content
        modal.style.display = "block"

        if (typeof gsap !== "undefined") {
          gsap.from(".modal-content", {
            duration: 0.3,
            scale: 0.8,
            opacity: 2,
            ease: "back.out(1.7)",
          })
        }
      }
    })
  })

  // Virtual tour functionality
  const facilityAreas = document.querySelectorAll(".facility-area")
  const tourInfo = document.getElementById("tourInfo")

  const tourDetails = {
    entrance: {
      title: "Facility Entrance",
      description:
        "Welcome to our state-of-the-art recycling facility! This is where all recyclable materials arrive for processing.",
      details: [
        { icon: "🚛", text: "Trucks arrive every 15 minutes during peak hours" },
        { icon: "⚖️", text: "All materials are weighed upon arrival" },
        { icon: "📋", text: "Quality inspection begins at the entrance" },
      ],
    },
    sorting: {
      title: "Sorting Area",
      description: "Advanced technology and skilled workers separate materials by type and quality.",
      details: [
        { icon: "🤖", text: "AI-powered optical sorting systems" },
        { icon: "👥", text: "20 quality control specialists work here" },
        { icon: "🔍", text: "99.5% sorting accuracy achieved" },
      ],
    },
    processing: {
      title: "Processing Center",
      description: "Materials are broken down and prepared for manufacturing into new products.",
      details: [
        { icon: "⚙️", text: "Industrial shredders and melting equipment" },
        { icon: "🌡️", text: "Temperature-controlled processing chambers" },
        { icon: "🧪", text: "Chemical analysis ensures quality" },
      ],
    },
    storage: {
      title: "Storage Warehouse",
      description: "Processed materials are stored before being shipped to manufacturers.",
      details: [
        { icon: "📦", text: "Climate-controlled storage areas" },
        { icon: "📊", text: "Inventory tracking system" },
        { icon: "🚛", text: "Ready for shipment to manufacturers" },
      ],
    },
    shipping: {
      title: "Shipping Dock",
      description: "Recycled materials leave the facility to become new products around the world.",
      details: [
        { icon: "🌍", text: "Ships to manufacturers globally" },
        { icon: "📈", text: "500 tons shipped daily" },
        { icon: "♻️", text: "Completing the recycling circle" },
      ],
    },
  }

  facilityAreas.forEach((area) => {
    area.addEventListener("click", function () {
      const areaType = this.dataset.area
      const details = tourDetails[areaType]

      if (details && tourInfo) {
        tourInfo.innerHTML = `
                    <h3>${details.title}</h3>
                    <p>${details.description}</p>
                    <div class="tour-details">
                        ${details.details
                          .map(
                            (detail) => `
                            <div class="detail-item">
                                <span class="detail-icon">${detail.icon}</span>
                                <span class="detail-text">${detail.text}</span>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `

        // Highlight selected area
        facilityAreas.forEach((a) => a.classList.remove("active"))
        this.classList.add("active")

        // GSAP animation
        if (typeof gsap !== "undefined") {
          gsap.from(".tour-info", {
            duration: 0.5,
            y: 20,
            opacity: 2,
            ease: "power3.out",
          })
        }
      }
    })
  })

  // Comparison table row interactions
  const comparisonRows = document.querySelectorAll(".comparison-row")

  comparisonRows.forEach((row) => {
    row.addEventListener("click", function () {
      const material = this.dataset.material
      const process = materialProcesses[material]

      if (process && modal && modalBody) {
        modalBody.innerHTML = `
                    <h3>${process.title} - Detailed Comparison</h3>
                    <div class="modal-section">
                        <h4>Process Overview:</h4>
                        <p>${process.description}</p>
                    </div>
                    <div class="modal-section">
                        <h4>Key Facts:</h4>
                        <ul>
                            ${process.facts.map((fact) => `<li>${fact}</li>`).join("")}
                        </ul>
                    </div>
                    <div class="modal-section">
                        <h4>Process Steps:</h4>
                        <ol>
                            ${process.stages.map((stage) => `<li><strong>${stage.title}:</strong> ${stage.description}</li>`).join("")}
                        </ol>
                    </div>
                `
        modal.style.display = "block"

        if (typeof gsap !== "undefined") {
          gsap.from(".modal-content", {
            duration: 0.3,
            scale: 0.8,
            opacity: 2,
            ease: "back.out(1.7)",
          })
        }
      }
    })
  })

  // Recycling cycle interactions
  const cycleSteps = document.querySelectorAll(".cycle-step")

  cycleSteps.forEach((step) => {
    step.addEventListener("click", function () {
      const stepType = this.dataset.step
      const stepInfo = {
        collect: "Collection: Materials are gathered from homes, businesses, and drop-off centers.",
        sort: "Sorting: Advanced technology separates materials by type and removes contaminants.",
        process: "Processing: Clean materials are broken down into raw materials for manufacturing.",
        manufacture: "Manufacturing: Raw materials become new products, completing the cycle.",
      }

      if (stepInfo[stepType]) {
        // Create temporary tooltip
        const tooltip = document.createElement("div")
        tooltip.className = "cycle-tooltip"
        tooltip.textContent = stepInfo[stepType]
        tooltip.style.cssText = `
                    position: absolute;
                    background: #00695c;
                    color: white;
                    padding: 1rem;
                    border-radius: 10px;
                    font-size: 0.9rem;
                    max-width: 200px;
                    z-index: 1000;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    top: -60px;
                    left: 50%;
                    transform: translateX(-50%);
                `

        this.appendChild(tooltip)

        // Remove tooltip after 3 seconds
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip)
          }
        }, 3000)
      }
    })
  })

  // Close modal functionality
  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
    })
  }

  if (modal) {
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })
  }

  // Add CSS for process facts
  const style = document.createElement("style")
  style.textContent = `
        .process-facts {
            margin-top: 2rem;
            padding: 1.5rem;
            background: #e0f2f1;
            border-radius: 10px;
            border-left: 4px solid #00897b;
        }
        
        .process-facts h4 {
            color: #00695c;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .process-facts ul {
            list-style: none;
            margin: 0;
        }
        
        .process-facts li {
            padding: 0.5rem 0;
            position: relative;
            padding-left: 1.5rem;
            color: #555;
            line-height: 1.5;
        }
        
        .process-facts li::before {
            content: '💡';
            position: absolute;
            left: 0;
            top: 0.5rem;
        }

        .facility-area.active {
            background: #e0f2f1;
            border: 2px solid #00897b;
            transform: scale(1.1);
        }

        .cycle-tooltip {
            animation: tooltipFadeIn 0.3s ease;
        }

        @keyframes tooltipFadeIn {
            from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .modal-section {
            margin-bottom: 2rem;
        }

        .modal-section h4 {
            color: #00695c;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }

        .modal-section ul, .modal-section ol {
            padding-left: 1.5rem;
        }

        .modal-section li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
        }
    `
  document.head.appendChild(style)

  // Initialize with paper process
  if (simButtons.length > 0) {
    simButtons[0].click()
  }

  // Add hover effects to step items
  document.querySelectorAll(".step-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, {
          duration: 0.3,
          scale: 1.02,
          ease: "power2.out",
        })
      }
    })

    item.addEventListener("mouseleave", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, {
          duration: 0.3,
          scale: 1,
          ease: "power2.out",
        })
      }
    })
  })

  // Animate fact cards on scroll
  const factCards = document.querySelectorAll(".fact-card")
  const factObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"
        }
      })
    },
    { threshold: 0.5 },
  )

  factCards.forEach((card) => {
    factObserver.observe(card)
  })

  // Enhanced facts section observer
  const factsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const factsSection = entry.target
          factsSection.style.display = "block"
          factsSection.style.visibility = "visible"
          factsSection.style.opacity = "1"

          // Animate fact cards
          const factCards = factsSection.querySelectorAll(".fact-card")
          factCards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
              if (typeof gsap !== "undefined") {
                gsap.from(card, {
                  duration: 0.6,
                  y: 30,
                  opacity: 0=2,
                  ease: "power3.out",
                  delay: index * 0.1,
                })
              }
            }, index * 100)
          })
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "50px",
    },
  )

  // Observe facts section
  const factsSection = document.querySelector(".recycling-facts")
  if (factsSection) {
    factsObserver.observe(factsSection)
  }

  console.log("✅ Process page JavaScript loaded successfully!")
})

