// Enhanced Contact page JavaScript with professional features
document.addEventListener("DOMContentLoaded", () => {
  const gsap = window.gsap

  // Initialize page
  initializePage()

  // GSAP Animations for contact page
  if (typeof gsap !== "undefined") {
    initializeAnimations()
  }

  // Form handling
  initializeForm()

  // Interactive features
  initializeInteractiveFeatures()

  // FAQ functionality
  initializeFAQ()

  // Office hours status
  updateOfficeStatus()

  function initializePage() {
    console.log("Contact page loaded successfully")
    window.showToast("Welcome! We're here to help with your environmental education needs.", "success")
  }

  function initializeAnimations() {
    // Hero animations
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

    gsap.from(".contact-method", {
      duration: 0.6,
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      ease: "back.out(1.7)",
      delay: 0.6,
    })

    // Form animations
    gsap.from(".contact-form-section", {
      duration: 0.8,
      x: -50,
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-content",
        start: "top 80%",
      },
    })

    gsap.from(".contact-info-section > *", {
      duration: 0.8,
      x: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-content",
        start: "top 80%",
      },
    })

    // FAQ animations
    gsap.from(".faq-item", {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 80%",
      },
    })

    // Stats animation
    animateStats()
  }

  function animateStats() {
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
  }

  function animateCounter(element, target) {
    let count = 0
    const increment = target / 100
    const counterInterval = setInterval(() => {
      if (count < target) {
        count += increment
        element.textContent = Math.floor(count).toLocaleString()
      } else {
        element.textContent = target.toLocaleString()
        clearInterval(counterInterval)
      }
    }, 20)
  }

  function initializeForm() {
    const contactForm = document.getElementById("contactForm")
    const formSuccess = document.getElementById("formSuccess")

    if (contactForm) {
      // Real-time validation
      const formInputs = contactForm.querySelectorAll("input, select, textarea")
      formInputs.forEach((input) => {
        input.addEventListener("input", () => {
          validateField(input)
          updateProgress()
        })
        input.addEventListener("blur", () => validateField(input))
      })

      // Character count for message
      const messageField = document.getElementById("message")
      const charCount = document.getElementById("charCount")
      if (messageField && charCount) {
        messageField.addEventListener("input", () => {
          const count = messageField.value.length
          charCount.textContent = count
          const countElement = charCount.parentElement

          if (count > 450) {
            countElement.classList.add("error")
            countElement.classList.remove("warning")
          } else if (count > 400) {
            countElement.classList.add("warning")
            countElement.classList.remove("error")
          } else {
            countElement.classList.remove("warning", "error")
          }
        })
      }

      // Form submission
      contactForm.addEventListener("submit", handleFormSubmission)
    }
  }

  function validateField(field) {
    const value = field.value.trim()
    const fieldName = field.name
    const errorElement = document.getElementById(`${fieldName}Error`)
    const successElement = document.getElementById(`${fieldName}Success`)
    let isValid = true
    let errorMessage = ""

    // Remove existing styling
    field.classList.remove("error", "valid")
    if (errorElement) {
      errorElement.classList.remove("show")
    }
    if (successElement) {
      successElement.classList.remove("show")
    }

    // Validate based on field type
    switch (fieldName) {
      case "firstName":
      case "lastName":
        if (value === "") {
          isValid = false
          errorMessage = `${fieldName === "firstName" ? "First" : "Last"} name is required`
        } else if (value.length < 2) {
          isValid = false
          errorMessage = "Name must be at least 2 characters"
        }
        break
      case "email":
        if (value === "") {
          isValid = false
          errorMessage = "Email is required"
        } else if (!isValidEmail(value)) {
          isValid = false
          errorMessage = "Please enter a valid email address"
        }
        break
      case "phone":
        if (value !== "" && !isValidPhone(value)) {
          isValid = false
          errorMessage = "Please enter a valid phone number"
        }
        break
      case "subject":
        if (value === "") {
          isValid = false
          errorMessage = "Please select a subject"
        }
        break
      case "message":
        if (value === "") {
          isValid = false
          errorMessage = "Message is required"
        } else if (value.length < 10) {
          isValid = false
          errorMessage = "Message must be at least 10 characters"
        } else if (value.length > 500) {
          isValid = false
          errorMessage = "Message must be less than 500 characters"
        }
        break
      case "privacy":
        if (!field.checked) {
          isValid = false
          errorMessage = "You must agree to the privacy policy"
        }
        break
    }

    // Apply styling and show messages
    if (!isValid) {
      field.classList.add("error")
      if (errorElement) {
        errorElement.textContent = errorMessage
        errorElement.classList.add("show")
      }
    } else if (value !== "" || field.type === "checkbox") {
      field.classList.add("valid")
      if (successElement) {
        successElement.classList.add("show")
      }
    }

    return isValid
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function isValidPhone(phone) {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    const cleanPhone = phone.replace(/[\s\-$$$$]/g, "")
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10
  }

  function updateProgress() {
    const form = document.getElementById("contactForm")
    const requiredFields = form.querySelectorAll("[required]")
    const progressFill = document.getElementById("progressFill")
    const progressText = document.getElementById("progressText")

    let completedFields = 0
    requiredFields.forEach((field) => {
      if (field.type === "checkbox") {
        if (field.checked) completedFields++
      } else if (field.value.trim() !== "") {
        completedFields++
      }
    })

    const percentage = Math.round((completedFields / requiredFields.length) * 100)
    progressFill.style.width = `${percentage}%`
    progressText.textContent = `${percentage}% Complete`

    // Animate progress bar
    if (typeof gsap !== "undefined") {
      gsap.to(progressFill, {
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  function handleFormSubmission(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    // Validate entire form
    let isFormValid = true
    const formInputs = e.target.querySelectorAll("input, select, textarea")
    formInputs.forEach((input) => {
      if (!validateField(input)) {
        isFormValid = false
      }
    })

    if (isFormValid) {
      submitForm(data, e.target)
    } else {
      window.showToast("Please fix the errors in the form", "error")
      // Scroll to first error
      const firstError = document.querySelector(".field-error.show")
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  function submitForm(data, form) {
    const submitBtn = document.getElementById("submitBtn")
    const formSuccess = document.getElementById("formSuccess")

    // Show loading state
    submitBtn.classList.add("loading")
    submitBtn.disabled = true

    // Simulate form submission
    setTimeout(() => {
      // Generate reference ID
      const referenceId = "ECO-" + Date.now().toString().slice(-6)
      document.getElementById("referenceId").textContent = referenceId

      // Hide form and show success message
      form.style.display = "none"
      formSuccess.style.display = "block"

      // Animate success message
      if (typeof gsap !== "undefined") {
        gsap.from(formSuccess, {
          duration: 0.8,
          scale: 0.8,
          opacity: 0,
          ease: "back.out(1.7)",
        })
      }

      window.showToast("Message sent successfully! We'll get back to you soon.", "success")

      // Log submission data
      console.log("Form submitted:", data)

      // Reset form after delay
      setTimeout(() => {
        window.resetForm()
      }, 10000)
    }, 2000)
  }

  function initializeInteractiveFeatures() {
    // Contact method clicks
    window.scrollToForm = () => {
      document.querySelector(".contact-form-section").scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      window.showToast("Ready to send us a message!", "success")
    }

    window.callUs = () => {
      window.open("tel:+15551234567")
      window.showToast("Calling EcoRecycle Hub...", "success")
    }

    window.requestVisit = () => {
      const subjectSelect = document.getElementById("subject")
      const messageTextarea = document.getElementById("message")

      if (subjectSelect) subjectSelect.value = "presentation"
      if (messageTextarea) {
        messageTextarea.value =
          "I would like to request a school visit or assembly presentation. Please contact me to discuss scheduling and availability."
      }

      document.querySelector(".contact-form-section").scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      window.showToast("Form pre-filled for school visit request!", "success")
    }

    // Copy to clipboard functionality
    window.copyToClipboard = (text) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          window.showToast(`${text} copied to clipboard!`, "success")
        })
        .catch(() => {
          window.showToast("Failed to copy to clipboard", "error")
        })
    }

    // Phone call functionality
    window.callPhone = (number) => {
      window.open(`tel:${number}`)
      window.showToast("Opening phone app...", "success")
    }

    // Maps functionality
    window.openMaps = () => {
      const address = "123 Green Street, Eco City, EC 12345"
      const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`
      window.open(mapsUrl, "_blank")
      window.showToast("Opening maps for directions...", "success")
    }

    // Partnership form pre-fill
    window.fillPartnershipForm = () => {
      const subjectSelect = document.getElementById("subject")
      const messageTextarea = document.getElementById("message")
      const roleSelect = document.getElementById("role")

      if (subjectSelect) subjectSelect.value = "partnership"
      if (roleSelect) roleSelect.value = "administrator"
      if (messageTextarea) {
        messageTextarea.value =
          "I am interested in learning more about school partnership opportunities with EcoRecycle Hub. Please provide information about your programs, implementation process, and how we can get started with environmental education at our school."
      }

      // Scroll to form
      document.querySelector(".contact-form-section").scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Highlight form
      if (typeof gsap !== "undefined") {
        gsap.to(".contact-form-section", {
          duration: 0.5,
          scale: 1.02,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        })
      }

      window.showToast("Partnership form ready! Please complete the details.", "success")
      updateProgress()
    }

    // Form field animations
    const formInputs = document.querySelectorAll(".form-group input, .form-group select, .form-group textarea")

    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        if (typeof gsap !== "undefined") {
          gsap.to(this, {
            duration: 0.3,
            scale: 1.02,
            ease: "power2.out",
          })
        }
      })

      input.addEventListener("blur", function () {
        if (typeof gsap !== "undefined") {
          gsap.to(this, {
            duration: 0.3,
            scale: 1,
            ease: "power2.out",
          })
        }
      })
    })

    // Social media hover effects
    const socialLinks = document.querySelectorAll(".social-link")
    socialLinks.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        if (typeof gsap !== "undefined") {
          gsap.to(this, {
            duration: 0.3,
            scale: 1.05,
            ease: "power2.out",
          })
        }
      })

      link.addEventListener("mouseleave", function () {
        if (typeof gsap !== "undefined") {
          gsap.to(this, {
            duration: 0.3,
            scale: 1,
            ease: "power2.out",
          })
        }
      })
    })
  }

  function initializeFAQ() {
    // FAQ toggle functionality
    window.toggleFAQ = (element) => {
      const faqItem = element.parentElement
      const faqAnswer = faqItem.querySelector(".faq-answer")
      const isActive = faqItem.classList.contains("active")

      // Close all other FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active")
        }
      })

      // Toggle current item
      if (isActive) {
        faqItem.classList.remove("active")
      } else {
        faqItem.classList.add("active")
      }

      // Animate with GSAP if available
      if (typeof gsap !== "undefined" && !isActive) {
        gsap.from(faqAnswer, {
          duration: 0.3,
          height: 0,
          ease: "power2.out",
        })
      }
    }

    // FAQ search functionality
    window.searchFAQs = () => {
      const searchInput = document.getElementById("faqSearch")
      const searchTerm = searchInput.value.toLowerCase()
      const faqItems = document.querySelectorAll(".faq-item")

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question span").textContent.toLowerCase()
        const answer = item.querySelector(".faq-answer p").textContent.toLowerCase()
        const keywords = item.dataset.keywords || ""

        if (
          question.includes(searchTerm) ||
          answer.includes(searchTerm) ||
          keywords.includes(searchTerm) ||
          searchTerm === ""
        ) {
          item.classList.remove("hidden")
        } else {
          item.classList.add("hidden")
        }
      })

      // Show message if no results
      const visibleItems = document.querySelectorAll(".faq-item:not(.hidden)")
      if (visibleItems.length === 0 && searchTerm !== "") {
        window.showToast("No FAQs found matching your search", "warning")
      }
    }
  }

  function updateOfficeStatus() {
    const statusIndicator = document.querySelector(".status-indicator")
    const statusText = document.querySelector(".status-text")

    if (!statusIndicator || !statusText) return

    const now = new Date()
    const day = now.getDay() // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours()

    let isOpen = false
    let statusMessage = ""

    if (day >= 1 && day <= 5) {
      // Monday to Friday
      if (hour >= 9 && hour < 17) {
        isOpen = true
        statusMessage = "Open now"
      } else {
        statusMessage = "Closed - Opens 9:00 AM"
      }
    } else if (day === 6) {
      // Saturday
      if (hour >= 10 && hour < 14) {
        isOpen = true
        statusMessage = "Open now"
      } else {
        statusMessage = "Closed - Opens 10:00 AM"
      }
    } else {
      // Sunday
      statusMessage = "Closed - Opens Monday 9:00 AM"
    }

    statusIndicator.classList.toggle("closed", !isOpen)
    statusText.textContent = statusMessage
  }

  // Privacy policy modal
  window.showPrivacyPolicy = () => {
    const modal = document.getElementById("privacyModal")
    modal.style.display = "block"

    if (typeof gsap !== "undefined") {
      gsap.from(".modal-content", {
        duration: 0.3,
        scale: 0.8,
        opacity: 0,
        ease: "back.out(1.7)",
      })
    }
  }

  window.hidePrivacyPolicy = () => {
    const modal = document.getElementById("privacyModal")
    modal.style.display = "none"
  }

  // Toast notification system
  window.showToast = (message, type = "success") => {
    const toast = document.getElementById("toast")
    const toastIcon = document.getElementById("toastIcon")
    const toastMessage = document.getElementById("toastMessage")

    // Update content
    toastMessage.textContent = message

    // Update styling based on type
    toast.className = "toast"
    if (type === "error") {
      toast.classList.add("error")
      toastIcon.textContent = "❌"
    } else if (type === "warning") {
      toast.classList.add("warning")
      toastIcon.textContent = "⚠️"
    } else {
      toastIcon.textContent = "✅"
    }

    // Show toast
    toast.classList.add("show")

    // Hide after 4 seconds
    setTimeout(() => {
      toast.classList.remove("show")
    }, 4000)
  }

  window.hideToast = () => {
    const toast = document.getElementById("toast")
    toast.classList.remove("show")
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("privacyModal")
    if (e.target === modal) {
      window.hidePrivacyPolicy()
    }
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById("privacyModal")
      if (modal.style.display === "block") {
        window.hidePrivacyPolicy()
      }
      window.hideToast()
    }
  })

  // Update office status every minute
  setInterval(updateOfficeStatus, 60000)

  // Initialize progress on page load
  updateProgress()
})

