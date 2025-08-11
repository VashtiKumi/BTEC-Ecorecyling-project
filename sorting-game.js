// Complete Working Recycling Sorting Game
class RecyclingSortingGame {
  constructor() {
    this.score = 0
    this.attempts = 0
    this.totalItems = 6
    this.gameCompleted = false
    this.draggedElement = null

    // All possible game items
    this.allGameItems = [
      { emoji: "📰", name: "Newspaper", type: "paper" },
      { emoji: "📦", name: "Cardboard Box", type: "paper" },
      { emoji: "📄", name: "Office Paper", type: "paper" },
      { emoji: "📚", name: "Magazine", type: "paper" },
      { emoji: "🥤", name: "Plastic Bottle", type: "plastic" },
      { emoji: "🧴", name: "Shampoo Bottle", type: "plastic" },
      { emoji: "🥛", name: "Milk Jug", type: "plastic" },
      { emoji: "🧽", name: "Cleaning Spray", type: "plastic" },
      { emoji: "🍶", name: "Glass Jar", type: "glass" },
      { emoji: "🍷", name: "Wine Bottle", type: "glass" },
      { emoji: "🍯", name: "Honey Jar", type: "glass" },
      { emoji: "🫙", name: "Pickle Jar", type: "glass" },
      { emoji: "🥫", name: "Aluminum Can", type: "metal" },
      { emoji: "🥤", name: "Soda Can", type: "metal" },
      { emoji: "🍅", name: "Tin Can", type: "metal" },
      { emoji: "🍺", name: "Beer Can", type: "metal" },
      { emoji: "🍌", name: "Banana Peel", type: "organic" },
      { emoji: "🍎", name: "Apple Core", type: "organic" },
      { emoji: "☕", name: "Coffee Grounds", type: "organic" },
      { emoji: "🥬", name: "Lettuce Leaves", type: "organic" },
      { emoji: "📱", name: "Old Phone", type: "electronics" },
      { emoji: "💻", name: "Old Laptop", type: "electronics" },
      { emoji: "🔋", name: "Battery", type: "electronics" },
      { emoji: "🎧", name: "Headphones", type: "electronics" },
    ]

    this.init()
  }

  init() {
    console.log("🎮 Initializing Recycling Sorting Game...")
    this.setupEventListeners()
    this.setupDragAndDrop()
    this.updateDisplay()
    this.showFeedback("🎯 Drag items to the correct bins to start playing!", "info")
  }

  setupEventListeners() {
    // Game control buttons
    const resetBtn = document.getElementById("reset-game-btn")
    const newChallengeBtn = document.getElementById("new-challenge-btn")
    const hintsBtn = document.getElementById("show-hints-btn")

    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetGame())
    }

    if (newChallengeBtn) {
      newChallengeBtn.addEventListener("click", () => this.newChallenge())
    }

    if (hintsBtn) {
      hintsBtn.addEventListener("click", () => this.toggleHints())
    }
  }

  setupDragAndDrop() {
    // Setup draggable items
    const draggableItems = document.querySelectorAll(".draggable-item")
    draggableItems.forEach((item) => {
      item.addEventListener("dragstart", (e) => this.handleDragStart(e))
      item.addEventListener("dragend", (e) => this.handleDragEnd(e))

      // Touch events for mobile
      item.addEventListener("touchstart", (e) => this.handleTouchStart(e), { passive: false })
      item.addEventListener("touchmove", (e) => this.handleTouchMove(e), { passive: false })
      item.addEventListener("touchend", (e) => this.handleTouchEnd(e), { passive: false })
    })

    // Setup drop zones (bins)
    const bins = document.querySelectorAll(".recycling-bin")
    bins.forEach((bin) => {
      bin.addEventListener("dragover", (e) => this.handleDragOver(e))
      bin.addEventListener("dragleave", (e) => this.handleDragLeave(e))
      bin.addEventListener("drop", (e) => this.handleDrop(e))
    })
  }

  handleDragStart(e) {
    this.draggedElement = e.target
    e.target.classList.add("dragging")

    // Store data for the drop
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        type: e.target.dataset.type,
        item: e.target.dataset.item,
        emoji: e.target.querySelector(".item-emoji").textContent,
        name: e.target.querySelector(".item-name").textContent,
      }),
    )

    this.showFeedback("🖱️ Drag to the correct bin!", "info")
    console.log(`🎯 Dragging: ${e.target.querySelector(".item-name").textContent}`)
  }

  handleDragEnd(e) {
    e.target.classList.remove("dragging")
    this.draggedElement = null
  }

  handleDragOver(e) {
    e.preventDefault()
    e.currentTarget.classList.add("drag-over")
  }

  handleDragLeave(e) {
    e.currentTarget.classList.remove("drag-over")
  }

  handleDrop(e) {
    e.preventDefault()
    const bin = e.currentTarget
    bin.classList.remove("drag-over")

    try {
      const itemData = JSON.parse(e.dataTransfer.getData("text/plain"))
      const binType = bin.dataset.binType

      console.log(`🎯 Dropped ${itemData.name} into ${binType} bin`)

      this.checkAnswer(itemData, binType, bin)
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
  }

  handleTouchMove(e) {
    if (!this.touchItem) return
    e.preventDefault()

    const touch = e.touches[0]
    this.touchItem.style.left = touch.clientX - this.touchOffset.x + "px"
    this.touchItem.style.top = touch.clientY - this.touchOffset.y + "px"

    // Highlight bins when hovering
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
    const bin = elementBelow?.closest(".recycling-bin")

    // Remove previous highlights
    document.querySelectorAll(".recycling-bin").forEach((b) => b.classList.remove("drag-over"))

    if (bin) {
      bin.classList.add("drag-over")
    }
  }

  handleTouchEnd(e) {
    if (!this.touchItem) return

    const touch = e.changedTouches[0]
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
    const bin = elementBelow?.closest(".recycling-bin")

    // Remove highlights
    document.querySelectorAll(".recycling-bin").forEach((b) => b.classList.remove("drag-over"))

    if (bin) {
      const itemData = {
        type: this.touchItem.dataset.type,
        item: this.touchItem.dataset.item,
        emoji: this.touchItem.querySelector(".item-emoji").textContent,
        name: this.touchItem.querySelector(".item-name").textContent,
      }

      this.checkAnswer(itemData, bin.dataset.binType, bin)
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

  checkAnswer(itemData, binType, binElement) {
    this.attempts++
    const isCorrect = itemData.type === binType

    console.log(`✅ Answer check: ${itemData.name} -> ${binType} = ${isCorrect ? "CORRECT" : "WRONG"}`)

    if (isCorrect) {
      this.handleCorrectAnswer(itemData, binElement)
    } else {
      this.handleIncorrectAnswer(itemData, binType, binElement)
    }

    this.updateDisplay()
    this.checkGameCompletion()
  }

  handleCorrectAnswer(itemData, binElement) {
    this.score++

    // Visual feedback
    binElement.classList.add("correct")
    this.showFeedback(`✅ Correct! ${itemData.name} belongs in the ${this.getBinName(itemData.type)} bin!`, "success")

    // Add item to bin
    const binContent = binElement.querySelector(".bin-content")
    const placeholder = binContent.querySelector(".bin-placeholder")

    if (placeholder) {
      placeholder.style.display = "none"
    }

    const sortedItem = document.createElement("div")
    sortedItem.className = "sorted-item"
    sortedItem.innerHTML = `${itemData.emoji} ${itemData.name}`
    binContent.appendChild(sortedItem)

    // Remove original item
    const originalItem = document.querySelector(`[data-item="${itemData.item}"]`)
    if (originalItem) {
      originalItem.style.animation = "fadeOut 0.5s ease"
      setTimeout(() => {
        originalItem.remove()
      }, 500)
    }

    // Play success sound
    this.playSound("success")

    // Remove feedback class
    setTimeout(() => {
      binElement.classList.remove("correct")
    }, 1000)
  }

  handleIncorrectAnswer(itemData, binType, binElement) {
    // Visual feedback
    binElement.classList.add("incorrect")

    const correctBinName = this.getBinName(itemData.type)
    this.showFeedback(`❌ Wrong! ${itemData.name} should go in the ${correctBinName} bin!`, "error")

    // Highlight correct bin
    const correctBin = document.querySelector(`[data-bin-type="${itemData.type}"]`)
    if (correctBin) {
      correctBin.style.border = "3px solid #ff9800"
      correctBin.style.boxShadow = "0 0 20px rgba(255, 152, 0, 0.5)"

      setTimeout(() => {
        correctBin.style.border = ""
        correctBin.style.boxShadow = ""
      }, 2000)
    }

    // Play error sound
    this.playSound("error")

    // Remove feedback class
    setTimeout(() => {
      binElement.classList.remove("incorrect")
    }, 1000)
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

  playSound(type) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      if (type === "success") {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
      } else {
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime) // A3
        oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.1) // G3
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
    const feedbackArea = document.getElementById("feedback-area")
    if (!feedbackArea) return

    feedbackArea.innerHTML = `
            <div class="feedback-message feedback-${type}">
                ${message}
            </div>
        `

    // Auto-hide after 4 seconds
    setTimeout(() => {
      if (feedbackArea.innerHTML.includes(message)) {
        feedbackArea.innerHTML = ""
      }
    }, 4000)
  }

  updateDisplay() {
    const scoreElement = document.getElementById("current-score")
    const attemptsElement = document.getElementById("total-attempts")
    const progressElement = document.getElementById("game-progress")

    if (scoreElement) scoreElement.textContent = this.score
    if (attemptsElement) attemptsElement.textContent = this.attempts

    // Update progress bar
    if (progressElement) {
      const percentage = (this.score / this.totalItems) * 100
      progressElement.style.width = percentage + "%"
    }
  }

  checkGameCompletion() {
    const remainingItems = document.querySelectorAll(".draggable-item")

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
  }

  resetGame() {
    console.log("🔄 Resetting game...")

    this.score = 0
    this.attempts = 0
    this.gameCompleted = false

    // Clear all bins
    document.querySelectorAll(".bin-content").forEach((binContent) => {
      const placeholder = binContent.querySelector(".bin-placeholder")
      const sortedItems = binContent.querySelectorAll(".sorted-item")

      sortedItems.forEach((item) => item.remove())

      if (placeholder) {
        placeholder.style.display = "block"
      }
    })

    // Reset items container with original items
    const itemsContainer = document.getElementById("draggable-items")
    itemsContainer.innerHTML = `
            <div class="draggable-item" draggable="true" data-type="paper" data-item="newspaper">
                <span class="item-emoji">📰</span>
                <span class="item-name">Newspaper</span>
            </div>
            <div class="draggable-item" draggable="true" data-type="plastic" data-item="bottle">
                <span class="item-emoji">🥤</span>
                <span class="item-name">Plastic Bottle</span>
            </div>
            <div class="draggable-item" draggable="true" data-type="glass" data-item="jar">
                <span class="item-emoji">🍶</span>
                <span class="item-name">Glass Jar</span>
            </div>
            <div class="draggable-item" draggable="true" data-type="metal" data-item="can">
                <span class="item-emoji">🥫</span>
                <span class="item-name">Aluminum Can</span>
            </div>
            <div class="draggable-item" draggable="true" data-type="organic" data-item="banana">
                <span class="item-emoji">🍌</span>
                <span class="item-name">Banana Peel</span>
            </div>
            <div class="draggable-item" draggable="true" data-type="electronics" data-item="phone">
                <span class="item-emoji">📱</span>
                <span class="item-name">Old Phone</span>
            </div>
        `

    // Re-setup drag and drop
    this.setupDragAndDrop()
    this.updateDisplay()

    this.showFeedback("🔄 Game reset! Try again!", "info")
  }

  newChallenge() {
    console.log("🎲 Creating new challenge...")

    this.score = 0
    this.attempts = 0
    this.gameCompleted = false

    // Clear bins
    document.querySelectorAll(".bin-content").forEach((binContent) => {
      const placeholder = binContent.querySelector(".bin-placeholder")
      const sortedItems = binContent.querySelectorAll(".sorted-item")

      sortedItems.forEach((item) => item.remove())

      if (placeholder) {
        placeholder.style.display = "block"
      }
    })

    // Generate new random items
    const shuffled = [...this.allGameItems].sort(() => 0.5 - Math.random())
    const newItems = shuffled.slice(0, 6)

    const itemsContainer = document.getElementById("draggable-items")
    itemsContainer.innerHTML = ""

    newItems.forEach((item, index) => {
      const itemElement = document.createElement("div")
      itemElement.className = "draggable-item"
      itemElement.draggable = true
      itemElement.dataset.type = item.type
      itemElement.dataset.item = `challenge-${index}`
      itemElement.innerHTML = `
                <span class="item-emoji">${item.emoji}</span>
                <span class="item-name">${item.name}</span>
            `
      itemsContainer.appendChild(itemElement)
    })

    // Re-setup drag and drop
    this.setupDragAndDrop()
    this.updateDisplay()

    this.showFeedback("🎲 New challenge created! Good luck!", "info")
  }

  toggleHints() {
    const bins = document.querySelectorAll(".recycling-bin")
    const isShowingHints = document.querySelector(".bin-hint")

    if (isShowingHints) {
      // Hide hints
      document.querySelectorAll(".bin-hint").forEach((hint) => hint.remove())
      this.showFeedback("💡 Hints hidden!", "info")
    } else {
      // Show hints
      bins.forEach((bin) => {
        const hint = document.createElement("div")
        hint.className = "bin-hint"
        hint.textContent = this.getHintForBin(bin.dataset.binType)
        hint.style.cssText = `
                    font-size: 0.8rem;
                    color: #666;
                    margin-top: 0.5rem;
                    font-style: italic;
                    text-align: center;
                `
        bin.querySelector(".bin-content").appendChild(hint)
      })
      this.showFeedback("💡 Hints are now visible!", "info")
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

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
    
    .bin-hint {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`
document.head.appendChild(style)

// Initialize the game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎮 DOM loaded, initializing game...")
  setTimeout(() => {
    window.recyclingSortingGame = new RecyclingSortingGame()
  }, 500)
})

// Re-initialize if page is shown from cache
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    setTimeout(() => {
      if (!window.recyclingSortingGame) {
        window.recyclingSortingGame = new RecyclingSortingGame()
      }
    }, 500)
  }
})
