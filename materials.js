// Materials page specific JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Declare gsap variable
  const gsap = window.gsap
  const AudioContext = window.AudioContext || window.webkitAudioContext

  // Animate progress bars
  const progressBars = document.querySelectorAll(".progress")

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width
          entry.target.style.width = width + "%"
          progressObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  progressBars.forEach((bar) => {
    progressObserver.observe(bar)
  })

  // GSAP Animations for materials page
  if (typeof gsap !== "undefined") {
    // Hero title animation
    gsap.from(".page-title", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    })

    gsap.from(".page-subtitle", {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power3.out",
      delay: 0.3,
    })

    // Material cards stagger animation
    gsap.from(".material-card", {
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".materials-grid",
        start: "top 80%",
      },
    })

    // Material icons floating animation
    gsap.to(".material-icon", {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
    })

    // Sorting game elements animation
    gsap.from(".sortable-item", {
      duration: 0.6,
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".sorting-game",
        start: "top 80%",
      },
    })

    gsap.from(".bin", {
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".sorting-bins",
        start: "top 80%",
      },
    })
  }

  // Enhanced Sorting Game Logic
  let score = 0
  const totalItems = 6
  let gameCompleted = false
  let currentItems = []

  // Game items database
  const gameItemsDatabase = [
    { name: "📰 Newspaper", type: "paper" },
    { name: "📦 Cardboard Box", type: "paper" },
    { name: "📄 Office Paper", type: "paper" },
    { name: "🥤 Plastic Bottle", type: "plastic" },
    { name: "🧴 Shampoo Bottle", type: "plastic" },
    { name: "🥛 Milk Jug", type: "plastic" },
    { name: "🍶 Glass Jar", type: "glass" },
    { name: "🍷 Wine Bottle", type: "glass" },
    { name: "🍯 Honey Jar", type: "glass" },
    { name: "🥫 Aluminum Can", type: "metal" },
    { name: "🥤 Soda Can", type: "metal" },
    { name: "🍅 Tin Can", type: "metal" },
    { name: "🍌 Banana Peel", type: "organic" },
    { name: "🍎 Apple Core", type: "organic" },
    { name: "☕ Coffee Grounds", type: "organic" },
    { name: "📱 Old Phone", type: "electronics" },
    { name: "💻 Old Laptop", type: "electronics" },
    { name: "🔋 Battery", type: "electronics" },
  ]

  function initializeSortingGame() {
    const sortableItems = document.querySelectorAll(".sortable-item")
    const bins = document.querySelectorAll(".bin")
    const scoreElement = document.getElementById("score")
    const resetButton = document.getElementById("reset-game")
    const newChallengeButton = document.getElementById("new-challenge")

    // Initialize current items
    currentItems = Array.from(sortableItems)

    // Setup drag and drop for initial items
    setupDragAndDrop()

    // Setup bin drop zones
    setupBinDropZones()

    // Setup game controls
    if (resetButton) {
      resetButton.addEventListener("click", resetGame)
    }

    if (newChallengeButton) {
      newChallengeButton.addEventListener("click", generateNewChallenge)
    }

    // Update score display
    updateScore()
  }

  function setupDragAndDrop() {
    const sortableItems = document.querySelectorAll(".sortable-item")

    sortableItems.forEach((item) => {
      // Remove existing listeners to prevent duplicates
      item.removeEventListener("dragstart", handleDragStart)
      item.removeEventListener("dragend", handleDragEnd)
      item.removeEventListener("touchstart", handleTouchStart)
      item.removeEventListener("touchmove", handleTouchMove)
      item.removeEventListener("touchend", handleTouchEnd)

      // Make item draggable
      item.draggable = true

      // Add drag event listeners
      item.addEventListener("dragstart", handleDragStart)
      item.addEventListener("dragend", handleDragEnd)

      // Add touch event listeners for mobile
      item.addEventListener("touchstart", handleTouchStart, { passive: false })
      item.addEventListener("touchmove", handleTouchMove, { passive: false })
      item.addEventListener("touchend", handleTouchEnd, { passive: false })

      // Add visual feedback
      item.addEventListener("mousedown", function () {
        this.style.cursor = "grabbing"
      })

      item.addEventListener("mouseup", function () {
        this.style.cursor = "grab"
      })
    })
  }

  function setupBinDropZones() {
    const bins = document.querySelectorAll(".bin")

    bins.forEach((bin) => {
      // Remove existing listeners
      bin.removeEventListener("dragover", handleDragOver)
      bin.removeEventListener("dragleave", handleDragLeave)
      bin.removeEventListener("drop", handleDrop)

      // Add drop event listeners
      bin.addEventListener("dragover", handleDragOver)
      bin.addEventListener("dragleave", handleDragLeave)
      bin.addEventListener("drop", handleDrop)
    })
  }

  // Drag event handlers
  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", this.dataset.type)
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        type: this.dataset.type,
        content: this.textContent,
        id: this.id || Date.now().toString(),
      }),
    )
    this.classList.add("dragging")

    // Add visual feedback
    this.style.opacity = "0.5"
  }

  function handleDragEnd(e) {
    this.classList.remove("dragging")
    this.style.opacity = "1"
  }

  function handleDragOver(e) {
    e.preventDefault()
    this.classList.add("drag-over")

    // Add pulsing effect
    if (typeof gsap !== "undefined") {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      })
    }
  }

  function handleDragLeave(e) {
    this.classList.remove("drag-over")

    // Remove pulsing effect
    if (typeof gsap !== "undefined") {
      gsap.to(this, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      })
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    this.classList.remove("drag-over")

    // Reset scale
    if (typeof gsap !== "undefined") {
      gsap.to(this, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    try {
      const itemData = JSON.parse(e.dataTransfer.getData("application/json"))
      const draggedElement = document.querySelector(".dragging")

      if (draggedElement && itemData) {
        checkAnswer(itemData.type, this.dataset.bin, draggedElement, this)
      }
    } catch (error) {
      console.warn("Fallback to simple drag data")
      const itemType = e.dataTransfer.getData("text/plain")
      const draggedElement = document.querySelector(".dragging")

      if (draggedElement && itemType) {
        checkAnswer(itemType, this.dataset.bin, draggedElement, this)
      }
    }
  }

  // Touch event handlers for mobile
  let touchItem = null
  const touchOffset = { x: 0, y: 0 }

  function handleTouchStart(e) {
    touchItem = this
    const touch = e.touches[0]
    const rect = this.getBoundingClientRect()

    touchOffset.x = touch.clientX - rect.left
    touchOffset.y = touch.clientY - rect.top

    this.style.zIndex = "1000"
    this.style.position = "fixed"
    this.style.pointerEvents = "none"
    this.classList.add("dragging")

    // Haptic feedback on supported devices
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  function handleTouchMove(e) {
    if (!touchItem) return

    e.preventDefault()
    const touch = e.touches[0]

    touchItem.style.left = touch.clientX - touchOffset.x + "px"
    touchItem.style.top = touch.clientY - touchOffset.y + "px"

    // Highlight bins when hovering
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
    const bin = elementBelow?.closest(".bin")

    // Remove previous highlights
    document.querySelectorAll(".bin").forEach((b) => b.classList.remove("drag-over"))

    if (bin) {
      bin.classList.add("drag-over")
    }
  }

  function handleTouchEnd(e) {
    if (!touchItem) return

    const touch = e.changedTouches[0]
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
    const bin = elementBelow?.closest(".bin")

    // Remove highlights
    document.querySelectorAll(".bin").forEach((b) => b.classList.remove("drag-over"))

    if (bin) {
      checkAnswer(touchItem.dataset.type, bin.dataset.bin, touchItem, bin)
    }

    // Reset item position and styles
    touchItem.style.position = ""
    touchItem.style.left = ""
    touchItem.style.top = ""
    touchItem.style.zIndex = ""
    touchItem.style.pointerEvents = ""
    touchItem.classList.remove("dragging")

    touchItem = null
  }

  function checkAnswer(itemType, binType, itemElement, binElement) {
    const isCorrect = itemType === binType

    if (isCorrect) {
      score++
      handleCorrectAnswer(itemElement, binElement)
    } else {
      handleIncorrectAnswer(itemElement, binElement)
    }

    updateScore()

    // Check if game is completed
    const remainingItems = document.querySelectorAll('.sortable-item:not([style*="display: none"])')
    if (remainingItems.length === 0 && !gameCompleted) {
      gameCompleted = true
      setTimeout(showGameCompletion, 1000)
    }
  }

  function handleCorrectAnswer(itemElement, binElement) {
    binElement.classList.add("correct")

    // Hide the item with animation
    if (typeof gsap !== "undefined") {
      gsap.to(itemElement, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          itemElement.style.display = "none"
        },
      })

      // Bin success animation
      gsap.to(binElement, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
        yoyo: true,
        repeat: 1,
      })

      // Add success particles effect
      createSuccessParticles(binElement)
    } else {
      itemElement.style.display = "none"
    }

    // Play success sound (if available)
    playSound("success")

    // Remove feedback class after animation
    setTimeout(() => {
      binElement.classList.remove("correct")
    }, 1000)
  }

  function handleIncorrectAnswer(itemElement, binElement) {
    binElement.classList.add("incorrect")

    // Shake animation for incorrect answer
    if (typeof gsap !== "undefined") {
      gsap.to(binElement, {
        x: -10,
        duration: 0.1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 5,
        onComplete: () => {
          gsap.set(binElement, { x: 0 })
        },
      })

      // Item bounce back animation
      gsap.to(itemElement, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    // Play error sound (if available)
    playSound("error")

    // Show hint
    showHint(itemElement.dataset.type)

    // Remove feedback class after animation
    setTimeout(() => {
      binElement.classList.remove("incorrect")
    }, 1000)
  }

  function createSuccessParticles(element) {
    if (typeof gsap === "undefined") return

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Create particle elements
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement("div")
      particle.textContent = "✨"
      particle.style.position = "fixed"
      particle.style.left = centerX + "px"
      particle.style.top = centerY + "px"
      particle.style.fontSize = "20px"
      particle.style.pointerEvents = "none"
      particle.style.zIndex = "9999"
      document.body.appendChild(particle)

      // Animate particles
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          particle.remove()
        },
      })
    }
  }

  function showHint(itemType) {
    const hints = {
      paper: "📄 Paper items go in the paper bin!",
      plastic: "🥤 Plastic items go in the plastic bin!",
      glass: "🍶 Glass items go in the glass bin!",
      metal: "🥫 Metal items go in the metal bin!",
      organic: "🍎 Organic waste goes in the organic bin!",
      electronics: "📱 Electronics go in the e-waste bin!",
    }

    const hint = hints[itemType]
    if (hint) {
      showToast(hint, "hint")
    }
  }

  function showToast(message, type = "info") {
    const toast = document.createElement("div")
    toast.className = `toast toast-${type}`
    toast.textContent = message
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "hint" ? "#ff9800" : "#4caf50"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `

    document.body.appendChild(toast)

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)"
    }, 100)

    // Animate out and remove
    setTimeout(() => {
      toast.style.transform = "translateX(100%)"
      setTimeout(() => toast.remove(), 300)
    }, 3000)
  }

  function playSound(type) {
    // Create audio context for sound effects
    if (typeof AudioContext !== "undefined") {
      try {
        const audioContext = new AudioContext()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        if (type === "success") {
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
          oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
          oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
        } else if (type === "error") {
          oscillator.frequency.setValueAtTime(220, audioContext.currentTime) // A3
          oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.1) // G3
        }

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
      } catch (e) {
        // Audio not supported, continue silently
      }
    }
  }

  function updateScore() {
    const scoreElement = document.getElementById("score")
    if (scoreElement) {
      scoreElement.textContent = score

      // Animate score update
      if (typeof gsap !== "undefined") {
        gsap.from(scoreElement, {
          scale: 1.5,
          duration: 0.3,
          ease: "back.out(1.7)",
        })
      }
    }
  }

  function resetGame() {
    score = 0
    gameCompleted = false
    updateScore()

    // Show all items again
    const sortableItems = document.querySelectorAll(".sortable-item")
    sortableItems.forEach((item) => {
      item.style.display = "block"
      item.style.opacity = "1"
      item.style.transform = "scale(1)"
    })

    // Remove any completion messages
    const completionMessage = document.querySelector(".game-completion")
    if (completionMessage) {
      completionMessage.remove()
    }

    // Reset bin states
    document.querySelectorAll(".bin").forEach((bin) => {
      bin.classList.remove("correct", "incorrect", "drag-over")
    })

    // Re-initialize drag and drop
    setupDragAndDrop()

    // Animate items back in
    if (typeof gsap !== "undefined") {
      gsap.from(".sortable-item", {
        duration: 0.5,
        scale: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
      })
    }

    showToast("Game reset! Try again!", "info")
  }

  function generateNewChallenge() {
    // Reset current game
    resetGame()

    // Generate new random items
    const shuffled = [...gameItemsDatabase].sort(() => 0.5 - Math.random())
    const newItems = shuffled.slice(0, 6)

    const itemsContainer = document.querySelector(".items-to-sort")
    if (!itemsContainer) return

    itemsContainer.innerHTML = ""

    newItems.forEach((item, index) => {
      const itemElement = document.createElement("div")
      itemElement.className = "sortable-item"
      itemElement.dataset.type = item.type
      itemElement.textContent = item.name
      itemElement.id = `item-${index}`

      itemsContainer.appendChild(itemElement)
    })

    // Re-initialize drag and drop for new items
    setupDragAndDrop()

    // Animate new items
    if (typeof gsap !== "undefined") {
      gsap.from(".sortable-item", {
        duration: 0.5,
        scale: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
      })
    }

    showToast("New challenge generated!", "info")
  }

  function showGameCompletion() {
    const gameContainer = document.querySelector(".game-container")
    if (!gameContainer) return

    const completionMessage = document.createElement("div")
    completionMessage.className = "game-completion"

    const percentage = Math.round((score / totalItems) * 100)
    let message = ""
    let emoji = ""

    if (percentage === 100) {
      message = "Perfect! You're a recycling expert!"
      emoji = "🎉"
    } else if (percentage >= 80) {
      message = "Great job! You're getting the hang of it!"
      emoji = "👏"
    } else if (percentage >= 60) {
      message = "Good effort! Keep practicing!"
      emoji = "👍"
    } else {
      message = "Keep trying! You'll get better!"
      emoji = "💪"
    }

    completionMessage.innerHTML = `
      <div class="completion-content">
        <div class="completion-icon">${emoji}</div>
        <h3>${message}</h3>
        <div class="completion-score">Score: ${score}/${totalItems} (${percentage}%)</div>
        <button class="completion-btn" onclick="resetGame()">Play Again</button>
        <button class="completion-btn" onclick="generateNewChallenge()">New Challenge</button>
      </div>
    `

    // Add enhanced styles
    const style = document.createElement("style")
    style.textContent = `
      .game-completion {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(76, 175, 80, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        color: white;
        text-align: center;
        backdrop-filter: blur(10px);
      }
      
      .completion-content {
        animation: completionBounce 0.8s ease-out;
        padding: 2rem;
      }
      
      .completion-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        animation: completionSpin 1s ease-out;
      }
      
      .completion-content h3 {
        font-size: 2rem;
        margin-bottom: 1rem;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      }
      
      .completion-score {
        font-size: 1.5rem;
        font-weight: bold;
        background: rgba(255, 255, 255, 0.2);
        padding: 0.5rem 1rem;
        border-radius: 25px;
        display: inline-block;
        margin-bottom: 2rem;
        backdrop-filter: blur(5px);
      }
      
      .completion-btn {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        margin: 0 0.5rem;
        transition: all 0.3s ease;
        backdrop-filter: blur(5px);
      }
      
      .completion-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      }
      
      @keyframes completionBounce {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      
      @keyframes completionSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `

    if (!document.querySelector("#completion-styles")) {
      style.id = "completion-styles"
      document.head.appendChild(style)
    }

    gameContainer.style.position = "relative"
    gameContainer.appendChild(completionMessage)

    // Play completion sound
    playSound("success")
  }

  // Initialize the game when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Wait a bit for other scripts to load
    setTimeout(initializeSortingGame, 100)
  })

  // Re-initialize if the page is shown from cache
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      setTimeout(initializeSortingGame, 100)
    }
  })

  // Material card hover effects
  document.querySelectorAll(".material-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, {
          duration: 0.3,
          y: -10,
          scale: 1.02,
          ease: "power2.out",
        })
      }
    })

    card.addEventListener("mouseleave", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, {
          duration: 0.3,
          y: 0,
          scale: 1,
          ease: "power2.out",
        })
      }
    })
  })

  // Enhanced hover effects for symbol cards
  document.querySelectorAll(".symbol-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, {
          duration: 0.3,
          y: -5,
          scale: 1.05,
          ease: "power2.out",
        })
      }
    })

    card.addEventListener("mouseleave", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, {
          duration: 0.3,
          y: 0,
          scale: 1,
          ease: "power2.out",
        })
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

  // Learn More button functionality
  const learnMoreButtons = document.querySelectorAll(".learn-more-btn")
  const modal = document.getElementById("material-modal")
  const modalBody = document.getElementById("modal-body")
  const closeModal = document.querySelector(".close")

  const materialDetails = {
    paper: {
      title: "Paper & Cardboard Recycling",
      content: `
                <h3>Paper & Cardboard Recycling Guide</h3>
                <div class="modal-section">
                    <h4>What Can Be Recycled:</h4>
                    <ul>
                        <li>Newspapers and magazines</li>
                        <li>Office paper and documents</li>
                        <li>Cardboard boxes and packaging</li>
                        <li>Paper bags and wrapping paper</li>
                        <li>Paperback books and catalogs</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>What Cannot Be Recycled:</h4>
                    <ul>
                        <li>Wax-coated paper</li>
                        <li>Tissues and paper towels</li>
                        <li>Carbon paper</li>
                        <li>Laminated paper</li>
                        <li>Paper with food contamination</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Environmental Impact:</h4>
                    <p>Recycling one ton of paper saves 17 trees, 7,000 gallons of water, and enough energy to power an average home for 6 months.</p>
                </div>
            `,
    },
    plastic: {
      title: "Plastic Recycling",
      content: `
                <h3>Plastic Recycling Guide</h3>
                <div class="modal-section">
                    <h4>Recycling Codes:</h4>
                    <ul>
                        <li><strong>Code 1 (PET):</strong> Water bottles, soda bottles</li>
                        <li><strong>Code 2 (HDPE):</strong> Milk jugs, detergent bottles</li>
                        <li><strong>Code 3 (PVC):</strong> Pipes, vinyl siding</li>
                        <li><strong>Code 4 (LDPE):</strong> Plastic bags, squeeze bottles</li>
                        <li><strong>Code 5 (PP):</strong> Yogurt containers, bottle caps</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Preparation Tips:</h4>
                    <ul>
                        <li>Remove all caps and lids</li>
                        <li>Rinse containers thoroughly</li>
                        <li>Remove labels when possible</li>
                        <li>Check local recycling guidelines</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Did You Know?</h4>
                    <p>It takes 450-1000 years for plastic to decompose in landfills. Recycling plastic saves 88% of the energy needed to make new plastic.</p>
                </div>
            `,
    },
    glass: {
      title: "Glass Recycling",
      content: `
                <h3>Glass Recycling Guide</h3>
                <div class="modal-section">
                    <h4>Types of Recyclable Glass:</h4>
                    <ul>
                        <li>Clear glass bottles and jars</li>
                        <li>Brown/amber glass containers</li>
                        <li>Green glass bottles</li>
                        <li>Food and beverage containers</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Not Recyclable:</h4>
                    <ul>
                        <li>Window glass and mirrors</li>
                        <li>Light bulbs and fluorescent tubes</li>
                        <li>Ceramics and pottery</li>
                        <li>Pyrex and heat-resistant glass</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Amazing Fact:</h4>
                    <p>Glass can be recycled infinitely without losing quality. One recycled glass bottle saves enough energy to power a computer for 25 minutes!</p>
                </div>
            `,
    },
    metal: {
      title: "Metal Recycling",
      content: `
                <h3>Metal Recycling Guide</h3>
                <div class="modal-section">
                    <h4>Commonly Recycled Metals:</h4>
                    <ul>
                        <li>Aluminum cans and foil</li>
                        <li>Steel and tin cans</li>
                        <li>Copper pipes and wire</li>
                        <li>Brass and bronze items</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Preparation:</h4>
                    <ul>
                        <li>Remove labels when possible</li>
                        <li>Rinse food containers</li>
                        <li>Separate different metal types</li>
                        <li>Remove non-metal attachments</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Environmental Benefits:</h4>
                    <p>Recycling aluminum uses 95% less energy than producing new aluminum. Steel recycling saves 74% of the energy needed for new steel production.</p>
                </div>
            `,
    },
    electronics: {
      title: "Electronics Recycling",
      content: `
                <h3>E-Waste Recycling Guide</h3>
                <div class="modal-section">
                    <h4>Recyclable Electronics:</h4>
                    <ul>
                        <li>Smartphones and tablets</li>
                        <li>Computers and laptops</li>
                        <li>TVs and monitors</li>
                        <li>Batteries and chargers</li>
                        <li>Small appliances</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Before Recycling:</h4>
                    <ul>
                        <li>Back up important data</li>
                        <li>Perform factory reset</li>
                        <li>Remove batteries if possible</li>
                        <li>Find certified e-waste recycler</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Why It Matters:</h4>
                    <p>E-waste contains valuable materials like gold, silver, and rare earth elements. Proper recycling prevents toxic materials from entering landfills.</p>
                </div>
            `,
    },
    organic: {
      title: "Organic Waste Composting",
      content: `
                <h3>Organic Waste Composting Guide</h3>
                <div class="modal-section">
                    <h4>Compostable Materials:</h4>
                    <ul>
                        <li>Fruit and vegetable scraps</li>
                        <li>Coffee grounds and tea bags</li>
                        <li>Eggshells and nutshells</li>
                        <li>Yard waste and leaves</li>
                        <li>Paper towels and napkins</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Avoid Composting:</h4>
                    <ul>
                        <li>Meat and fish scraps</li>
                        <li>Dairy products</li>
                        <li>Oils and fats</li>
                        <li>Pet waste</li>
                        <li>Diseased plants</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4>Benefits:</h4>
                    <p>Composting reduces methane emissions from landfills and creates nutrient-rich soil amendment for gardens.</p>
                </div>
            `,
    },
  }

  learnMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const material = this.dataset.material
      const details = materialDetails[material]

      if (details) {
        modalBody.innerHTML = details.content
        modal.style.display = "block"

        // GSAP modal animation
        if (typeof gsap !== "undefined") {
          gsap.from(".modal-content", {
            duration: 0.3,
            scale: 0.8,
            opacity: 0,
            ease: "back.out(1.7)",
          })
        }
      }
    })
  })

  // Close modal functionality
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
  })

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  })

  function animateCounter(element, target) {
    let count = 0
    const duration = 2000 // Animation duration in milliseconds
    const step = target / (duration / 10) // Increment step

    function updateCounter() {
      count += step
      if (count > target) {
        count = target
      }
      element.textContent = Math.floor(count)

      if (count < target) {
        requestAnimationFrame(updateCounter)
      }
    }

    updateCounter()
  }
})

// Load the sorting game
document.addEventListener("DOMContentLoaded", () => {
  // Load sorting game script
  const gameScript = document.createElement("script")
  gameScript.src = "sorting-game.js"
  gameScript.onload = () => {
    console.log("✅ Sorting game loaded successfully!")
  }
  document.head.appendChild(gameScript)
})
