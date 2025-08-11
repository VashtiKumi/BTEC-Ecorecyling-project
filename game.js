// Complete Interactive Sorting Game
class RecyclingSortingGame {
  constructor() {
    this.score = 0
    this.attempts = 0
    this.totalItems = 6
    this.gameCompleted = false
    this.hintsVisible = false

    // Game items database
    this.gameItems = [
      { id: "item-1", name: "📰 Newspaper", type: "paper", emoji: "📰" },
      { id: "item-2", name: "🥤 Plastic Bottle", type: "plastic", emoji: "🥤" },
      { id: "item-3", name: "🍶 Glass Jar", type: "glass", emoji: "🍶" },
      { id: "item-4", name: "🥫 Aluminum Can", type: "metal", emoji: "🥫" },
      { id: "item-5", name: "🍌 Banana Peel", type: "organic", emoji: "🍌" },
      { id: "item-6", name: "📱 Old Phone", type: "electronics", emoji: "📱" },
    ]

    this.allItems = [
      { name: "📰 Newspaper", type: "paper", emoji: "📰" },
      { name: "📦 Cardboard Box", type: "paper", emoji: "📦" },
      { name: "📄 Office Paper", type: "paper", emoji: "📄" },
      { name: "📚 Magazine", type: "paper", emoji: "📚" },
      { name: "🥤 Plastic Bottle", type: "plastic", emoji: "🥤" },
      { name: "🧴 Shampoo Bottle", type: "plastic", emoji: "🧴" },
      { name: "🥛 Milk Jug", type: "plastic", emoji: "🥛" },
      { name: "🧽 Cleaning Spray", type: "plastic", emoji: "🧽" },
      { name: "🍶 Glass Jar", type: "glass", emoji: "🍶" },
      { name: "🍷 Wine Bottle", type: "glass", emoji: "🍷" },
      { name: "🍯 Honey Jar", type: "glass", emoji: "🍯" },
      { name: "🫙 Pickle Jar", type: "glass", emoji: "🫙" },
      { name: "🥫 Aluminum Can", type: "metal", emoji: "🥫" },
      { name: "🥤 Soda Can", type: "metal", emoji: "🥤" },
      { name: "🍅 Tin Can", type: "metal", emoji: "🍅" },
      { name: "🍺 Beer Can", type: "metal", emoji: "🍺" },
      { name: "🍌 Banana Peel", type: "organic", emoji: "🍌" },
      { name: "🍎 Apple Core", type: "organic", emoji: "🍎" },
      { name: "☕ Coffee Grounds", type: "organic", emoji: "☕" },
      { name: "🥬 Lettuce Leaves", type: "organic", emoji: "🥬" },
      { name: "📱 Old Phone", type: "electronics", emoji: "📱" },
      { name: "💻 Old Laptop", type: "electronics", emoji: "💻" },
      { name: "🔋 Battery", type: "electronics", emoji: "🔋" },
      { name: "🎧 Headphones", type: "electronics", emoji: "🎧" },
    ]

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.setupDragAndDrop()
    this.updateDisplay()
    console.log("🎮 Recycling Sorting Game initialized!")
  }

  setupEventListeners() {
    // Game control buttons
    const resetBtn = document.getElementById("reset-game")
    const newChallengeBtn = document.getElementById("new-challenge")
    const hintsBtn = document.getElementById("show-hints")

    if (resetBtn) resetBtn.addEventListener("click", () => this.resetGame())
    if (newChallengeBtn) newChallengeBtn.addEventListener("click", () => this.newChallenge())
    if (hintsBtn) hintsBtn.addEventListener("click", () => this.toggleHints())
  }

  setupDragAndDrop() {
    // Setup draggable items
    const items = document.querySelectorAll(".sortable-item")
    items.forEach((item) => {
      item.addEventListener("dragstart", (e) => this.handleDragStart(e))
      item.addEventListener("dragend", (e) => this.handleDragEnd(e))

      // Touch events for mobile
      item.addEventListener("touchstart", (e) => this.handleTouchStart(e), { passive: false })
      item.addEventListener("touchmove", (e) => this.handleTouchMove(e), { passive: false })
      item.addEventListener("touchend", (e) => this.handleTouchEnd(e), { passive: false })
    })

    // Setup drop zones (bins)
    const bins = document.querySelectorAll(".bin")
    bins.forEach((bin) => {
      bin.addEventListener("dragover", (e) => this.handleDragOver(e))
      bin.addEventListener("dragleave", (e) => this.handleDragLeave(e))
      bin.addEventListener("drop", (e) => this.handleDrop(e))
    })
  }

  handleDragStart(e) {
    const item = e.target
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        id: item.id,
        type: item.dataset.type,
        content: item.textContent.trim(),
      }),
    )

    item.classList.add("dragging")
    item.style.opacity = "0.5"

    this.showFeedback("🖱️ Drag the item to the correct bin!", "info")
    console.log(`🎯 Started dragging: ${item.textContent.trim()}`)
  }

  handleDragEnd(e) {
    const item = e.target
    item.classList.remove("dragging")
    item.style.opacity = "1"
  }

  handleDragOver(e) {
    e.preventDefault()
    const bin = e.currentTarget
    bin.classList.add("drag-over")

    // Visual feedback
    if (window.gsap) {
      window.gsap.to(bin, { scale: 1.05, duration: 0.2 })
    }
  }

  handleDragLeave(e) {
    const bin = e.currentTarget
    bin.classList.remove("drag-over")

    if (window.gsap) {
      window.gsap.to(bin, { scale: 1, duration: 0.2 })
    }
  }

  handleDrop(e) {
    e.preventDefault()
    const bin = e.currentTarget
    bin.classList.remove("drag-over")

    if (window.gsap) {
      window.gsap.to(bin, { scale: 1, duration: 0.2 })
    }

    try {
      const itemData = JSON.parse(e.dataTransfer.getData("text/plain"))
      const draggedItem = document.getElementById(itemData.id)

      if (draggedItem && itemData) {
        this.checkAnswer(itemData.type, bin.dataset.bin, draggedItem, bin, itemData.content)
      }
    } catch (error) {
      console.error("Drop error:", error)
      this.showFeedback("❌ Something went wrong. Try again!", "error")
    }
  }

  // Touch events for mobile
  handleTouchStart(e) {
    this.touchItem = e.target
    const touch = e.touches[0]
    const rect = this.touchItem.getBoundingClientRect()

    this.touchOffset = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    }

    this.touchItem.style.zIndex = "1000"
    this.touchItem.style.position = "fixed"
    this.touchItem.style.pointerEvents = "none"
    this.touchItem.classList.add("dragging")

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    this.showFeedback("📱 Drag to the correct bin!", "info")
  }

  handleTouchMove(e) {
    if (!this.touchItem) return
    e.preventDefault()

    const touch = e.touches[0]
    this.touchItem.style.left = touch.clientX - this.touchOffset.x + "px"
    this.touchItem.style.top = touch.clientY - this.touchOffset.y + "px"

    // Highlight bins
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
    const bin = elementBelow?.closest(".bin")

    document.querySelectorAll(".bin").forEach((b) => b.classList.remove("drag-over"))
    if (bin) {
      bin.classList.add("drag-over")
    }
  }

  handleTouchEnd(e) {
    if (!this.touchItem) return

    const touch = e.changedTouches[0]
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
    const bin = elementBelow?.closest(".bin")

    document.querySelectorAll(".bin").forEach((b) => b.classList.remove("drag-over"))

    if (bin) {
      this.checkAnswer(
        this.touchItem.dataset.type,
        bin.dataset.bin,
        this.touchItem,
        bin,
        this.touchItem.textContent.trim(),
      )
    }

    // Reset styles
    this.touchItem.style.position = ""
    this.touchItem.style.left = ""
    this.touchItem.style.top = ""
    this.touchItem.style.zIndex = ""
    this.touchItem.style.pointerEvents = ""
    this.touchItem.classList.remove("dragging")

    this.touchItem = null
  }

  checkAnswer(itemType, binType, itemElement, binElement, itemContent) {
    this.attempts++
    const isCorrect = itemType === binType

    console.log(`🎯 Checking: ${itemContent} -> ${binType} bin (${isCorrect ? "CORRECT" : "WRONG"})`)

    if (isCorrect) {
      this.handleCorrectAnswer(itemElement, binElement, itemContent)
    } else {
      this.handleIncorrectAnswer(itemElement, binElement, itemType, itemContent)
    }

    this.updateDisplay()
    this.checkGameCompletion()
  }

  handleCorrectAnswer(itemElement, binElement, itemContent) {
    this.score++

    // Visual feedback
    binElement.classList.add("correct")
    this.showFeedback(`✅ Correct! ${itemContent} goes in this bin!`, "success")

    // Move item to bin
    const binItems = binElement.querySelector(".bin-items")
    const itemClone = itemElement.cloneNode(true)
    itemClone.classList.add("sorted-item")
    itemClone.style.fontSize = "0.8rem"
    itemClone.style.margin = "2px"
    itemClone.style.padding = "4px 8px"
    binItems.appendChild(itemClone)

    // Remove original item with animation
    if (window.gsap) {
      window.gsap.to(itemElement, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.in(1.7)",
        onComplete: () => itemElement.remove(),
      })

      // Bin success animation
      window.gsap.to(binElement, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
        yoyo: true,
        repeat: 1,
      })

      // Success particles
      this.createParticles(binElement, "✨")
    } else {
      itemElement.remove()
    }

    // Play success sound
    this.playSound("success")

    // Remove feedback class
    setTimeout(() => binElement.classList.remove("correct"), 1000)
  }

  handleIncorrectAnswer(itemElement, binElement, correctType, itemContent) {
    // Visual feedback
    binElement.classList.add("incorrect")

    const correctBinName = this.getBinName(correctType)
    this.showFeedback(`❌ Wrong! ${itemContent} should go in the ${correctBinName} bin!`, "error")

    // Shake animation
    if (window.gsap) {
      window.gsap.to(binElement, {
        x: -10,
        duration: 0.1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 5,
        onComplete: () => window.gsap.set(binElement, { x: 0 }),
      })

      window.gsap.to(itemElement, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      })
    }

    // Play error sound
    this.playSound("error")

    // Highlight correct bin
    const correctBin = document.querySelector(`[data-bin="${correctType}"]`)
    if (correctBin) {
      correctBin.classList.add("hint-highlight")
      setTimeout(() => correctBin.classList.remove("hint-highlight"), 2000)
    }

    // Remove feedback class
    setTimeout(() => binElement.classList.remove("incorrect"), 1000)
  }

  getBinName(type) {
    const names = {
      paper: "Paper",
      plastic: "Plastic",
      glass: "Glass",
      metal: "Metal",
      organic: "Organic",
      electronics: "E-Waste",
    }
    return names[type] || type
  }

  createParticles(element, emoji) {
    if (!window.gsap) return

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    for (let i = 0; i < 6; i++) {
      const particle = document.createElement("div")
      particle.textContent = emoji
      particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 20px;
                pointer-events: none;
                z-index: 9999;
            `
      document.body.appendChild(particle)

      window.gsap.to(particle, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      })
    }
  }

  playSound(type) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      if (type === "success") {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1)
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2)
      } else {
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.1)
      }

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (e) {
      console.log("Audio not supported")
    }
  }

  showFeedback(message, type = "info") {
    const feedback = document.getElementById("game-feedback")
    if (!feedback) return

    const colors = {
      success: "#4caf50",
      error: "#f44336",
      info: "#2196f3",
      warning: "#ff9800",
    }

    feedback.innerHTML = `
            <div class="feedback-message" style="
                background: ${colors[type]};
                color: white;
                padding: 1rem;
                border-radius: 10px;
                margin: 1rem 0;
                text-align: center;
                font-weight: 600;
                animation: feedbackSlide 0.3s ease-out;
            ">
                ${message}
            </div>
        `

    // Auto-hide after 3 seconds
    setTimeout(() => {
      if (feedback.innerHTML.includes(message)) {
        feedback.innerHTML = ""
      }
    }, 3000)
  }

  updateDisplay() {
    const scoreElement = document.getElementById("score")
    const attemptsElement = document.getElementById("attempts")

    if (scoreElement) scoreElement.textContent = this.score
    if (attemptsElement) attemptsElement.textContent = this.attempts

    // Animate score update
    if (window.gsap && scoreElement) {
      window.gsap.from(scoreElement, { scale: 1.5, duration: 0.3, ease: "back.out(1.7)" })
    }
  }

  checkGameCompletion() {
    const remainingItems = document.querySelectorAll(".sortable-item:not(.sorted)")

    if (remainingItems.length === 0 && !this.gameCompleted) {
      this.gameCompleted = true
      setTimeout(() => this.showGameCompletion(), 1000)
    }
  }

  showGameCompletion() {
    const percentage = Math.round((this.score / this.totalItems) * 100)
    let message, emoji

    if (percentage === 100) {
      message = "Perfect! You're a recycling expert! 🌟"
      emoji = "🎉"
    } else if (percentage >= 80) {
      message = "Great job! You're getting the hang of it! 👏"
      emoji = "👏"
    } else if (percentage >= 60) {
      message = "Good effort! Keep practicing! 👍"
      emoji = "👍"
    } else {
      message = "Keep trying! You'll get better! 💪"
      emoji = "💪"
    }

    this.showFeedback(
      `
            ${emoji} ${message}<br>
            <strong>Final Score: ${this.score}/${this.totalItems} (${percentage}%)</strong><br>
            <strong>Total Attempts: ${this.attempts}</strong>
        `,
      "success",
    )

    // Play completion sound
    this.playSound("success")

    // Show completion particles
    this.createParticles(document.querySelector(".game-container"), "🎊")
  }

  resetGame() {
    this.score = 0
    this.attempts = 0
    this.gameCompleted = false

    // Clear all bins
    document.querySelectorAll(".bin-items").forEach((binItems) => {
      binItems.innerHTML = ""
    })

    // Reset items container
    const container = document.getElementById("items-container")
    container.innerHTML = ""

    // Add original items back
    this.gameItems.forEach((item) => {
      const itemElement = document.createElement("div")
      itemElement.className = "sortable-item"
      itemElement.draggable = true
      itemElement.dataset.type = item.type
      itemElement.id = item.id
      itemElement.textContent = item.name
      container.appendChild(itemElement)
    })

    // Re-setup drag and drop
    this.setupDragAndDrop()
    this.updateDisplay()

    this.showFeedback("🔄 Game reset! Try again!", "info")
    console.log("🔄 Game reset!")
  }

  newChallenge() {
    this.score = 0
    this.attempts = 0
    this.gameCompleted = false

    // Clear bins
    document.querySelectorAll(".bin-items").forEach((binItems) => {
      binItems.innerHTML = ""
    })

    // Generate new random items
    const shuffled = [...this.allItems].sort(() => 0.5 - Math.random())
    const newItems = shuffled.slice(0, 6)

    const container = document.getElementById("items-container")
    container.innerHTML = ""

    newItems.forEach((item, index) => {
      const itemElement = document.createElement("div")
      itemElement.className = "sortable-item"
      itemElement.draggable = true
      itemElement.dataset.type = item.type
      itemElement.id = `challenge-item-${index}`
      itemElement.textContent = item.name
      container.appendChild(itemElement)
    })

    // Re-setup drag and drop
    this.setupDragAndDrop()
    this.updateDisplay()

    // Animate new items
    if (window.gsap) {
      window.gsap.from(".sortable-item", {
        scale: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
      })
    }

    this.showFeedback("🎲 New challenge generated!", "info")
    console.log("🎲 New challenge created!")
  }

  toggleHints() {
    this.hintsVisible = !this.hintsVisible
    const bins = document.querySelectorAll(".bin")

    if (this.hintsVisible) {
      bins.forEach((bin) => {
        bin.classList.add("show-hints")
        const hintText = document.createElement("div")
        hintText.className = "bin-hint"
        hintText.textContent = this.getHintForBin(bin.dataset.bin)
        bin.appendChild(hintText)
      })
      this.showFeedback("💡 Hints are now visible!", "info")
    } else {
      bins.forEach((bin) => {
        bin.classList.remove("show-hints")
        const hint = bin.querySelector(".bin-hint")
        if (hint) hint.remove()
      })
      this.showFeedback("💡 Hints hidden!", "info")
    }
  }

  getHintForBin(binType) {
    const hints = {
      paper: "Newspapers, magazines, cardboard",
      plastic: "Bottles, containers with recycling codes",
      glass: "Bottles and jars only",
      metal: "Cans and aluminum foil",
      organic: "Food scraps and yard waste",
      electronics: "Phones, computers, batteries",
    }
    return hints[binType] || ""
  }
}

// Initialize the game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wait for other scripts to load
  setTimeout(() => {
    window.recyclingSortingGame = new RecyclingSortingGame()
  }, 500)
})

// Add CSS for feedback animations
const style = document.createElement("style")
style.textContent = `
    @keyframes feedbackSlide {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .bin.hint-highlight {
        border-color: #ff9800 !important;
        background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%) !important;
        animation: hintPulse 1s ease-in-out infinite alternate;
    }
    
    @keyframes hintPulse {
        from { box-shadow: 0 0 10px rgba(255, 152, 0, 0.5); }
        to { box-shadow: 0 0 20px rgba(255, 152, 0, 0.8); }
    }
    
    .bin-hint {
        font-size: 0.8rem;
        color: #666;
        margin-top: 0.5rem;
        font-style: italic;
    }
    
    .sorted-item {
        background: rgba(76, 175, 80, 0.8) !important;
        color: white !important;
        border-radius: 15px !important;
        display: inline-block;
    }
    
    .game-btn {
        background: linear-gradient(135deg, #6a1b9a 0%, #9c27b0 100%);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        margin: 0 0.5rem;
        transition: all 0.3s ease;
    }
    
    .game-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(106, 27, 154, 0.3);
    }
    
    .bin-items {
        margin-top: 0.5rem;
        min-height: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
    }
    
    .game-area {
        margin: 2rem 0;
    }
    
    .score-info {
        display: flex;
        gap: 2rem;
        align-items: center;
    }
    
    .game-controls {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
        .game-score {
            flex-direction: column;
            gap: 1rem;
        }
        
        .score-info {
            gap: 1rem;
        }
        
        .game-controls {
            justify-content: center;
        }
        
        .game-btn {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
        }
    }
`
document.head.appendChild(style)
