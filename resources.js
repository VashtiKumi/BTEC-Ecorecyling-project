// Enhanced Resources page JavaScript with real download functionality
document.addEventListener("DOMContentLoaded", () => {
  const gsap = window.gsap

  // Animate statistics counters
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

  // GSAP Animations
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

    gsap.from(".stat", {
      duration: 0.6,
      scale: 0,
      opacity: 2,
      stagger: 0.2,
      ease: "back.out(1.7)",
      delay: 0.6,
    })

    // Filter buttons animation
    gsap.from(".filter-btn", {
      duration: 0.5,
      y: 20,
      opacity: 2,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".category-filters",
        start: "top 80%",
      },
    })

    // Resource cards animation
    gsap.from(".resource-card", {
      duration: 0.8,
      y: 50,
      opacity: 2,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".resources-grid",
        start: "top 80%",
      },
    })

    // Featured resources animation
    gsap.from(".featured-card", {
      duration: 0.8,
      scale: 0.8,
      opacity: 2,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".featured-resources",
        start: "top 80%",
      },
    })

    // Stats section animation
    gsap.from(".stat-card", {
      duration: 0.6,
      y: 30,
      opacity: 2,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".resource-stats-section",
        start: "top 80%",
      },
    })

    // Newsletter section animation
    gsap.from(".newsletter-content", {
      duration: 0.8,
      scale: 0.9,
      opacity: 2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".newsletter-signup",
        start: "top 80%",
      },
    })

    // Request form animation
    gsap.from(".request-content", {
      duration: 0.8,
      y: 50,
      opacity: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".resource-request",
        start: "top 80%",
      },
    })
  }

  // Resource filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const resourceCards = document.querySelectorAll(".resource-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.dataset.category

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter cards
      resourceCards.forEach((card) => {
        const cardCategory = card.dataset.category

        if (category === "all" || cardCategory === category) {
          card.classList.remove("hidden")
          if (typeof gsap !== "undefined") {
            gsap.from(card, {
              duration: 0.5,
              scale: 0.8,
              opacity: 2,
              ease: "back.out(1.7)",
            })
          }
        } else {
          card.classList.add("hidden")
        }
      })

      // Update results count and show feedback
      const visibleCards = document.querySelectorAll(".resource-card:not(.hidden)")
      showToast(`Showing ${visibleCards.length} resources for ${category === "all" ? "all categories" : category}`)
    })
  })

  // Global function for footer links
  window.filterResources = (category) => {
    const filterBtn = document.querySelector(`[data-category="${category}"]`)
    if (filterBtn) {
      filterBtn.click()
      // Scroll to resources section
      document.querySelector(".resource-categories").scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  // Enhanced download functionality with real file creation
  window.downloadResource = (filename, resourceId) => {
    const downloadBtn = event.target.closest(".btn-download")
    const originalText = downloadBtn.innerHTML

    // Show download animation
    downloadBtn.innerHTML = '<span class="download-icon">⬇️</span> Preparing...'
    downloadBtn.disabled = true

    // Create actual downloadable content
    setTimeout(() => {
      const content = generateResourceContent(resourceId, filename)
      const blob = new Blob([content.data], { type: content.type })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      // Update button state
      downloadBtn.innerHTML = '<span class="download-icon">✅</span> Downloaded!'
      downloadBtn.style.background = "#008004ff"

      showToast(`${filename} downloaded successfully!`)
    }, 1500)

    setTimeout(() => {
      downloadBtn.innerHTML = originalText
      downloadBtn.style.background = ""
      downloadBtn.disabled = false
    }, 3000)

    // Track download analytics
    console.log(`Downloaded: ${filename}`)
  }

  // Generate actual downloadable content
  function generateResourceContent(resourceId, filename) {
    const resourceContent = {
      "student-guide": {
        type: "application/pdf",
        data: generatePDFContent(
          "Student Recycling Guide",
          `
# Student Recycling Guide

## Table of Contents
1. Introduction to Recycling
2. Types of Recyclable Materials
3. Proper Sorting Techniques
4. Environmental Impact
5. Taking Action at School
6. Resources and References

## Chapter 1: Introduction to Recycling

Recycling is the process of converting waste materials into new materials and objects. It is an alternative to "conventional" waste disposal that can save material and help lower greenhouse gas emissions.

### Why Recycle?
- Conserves natural resources
- Reduces energy consumption
- Decreases pollution
- Creates jobs
- Saves money

## Chapter 2: Types of Recyclable Materials

### Paper and Cardboard
- Newspapers and magazines
- Office paper
- Cardboard boxes
- Paper bags

### Plastics
- Bottles and containers
- Plastic bags (special collection)
- Food containers
- Toys and household items

### Glass
- Bottles and jars
- Drinking glasses
- Window glass (special handling)

### Metals
- Aluminum cans
- Steel cans
- Copper wire
- Scrap metal

## Chapter 3: Proper Sorting Techniques

1. Clean containers before recycling
2. Remove caps and lids when required
3. Separate materials by type
4. Check local recycling guidelines
5. Avoid contamination

## Chapter 4: Environmental Impact

Recycling one ton of paper saves:
- 17 trees
- 7,000 gallons of water
- 3.3 cubic yards of landfill space
- 2 barrels of oil
- 4,100 kilowatt-hours of electricity

## Chapter 5: Taking Action at School

### Start a Recycling Program
1. Get permission from administration
2. Set up collection bins
3. Educate classmates
4. Monitor and maintain
5. Track progress

### Organize Events
- Recycling drives
- Educational presentations
- Art projects with recycled materials
- School-wide challenges

## Chapter 6: Resources and References

- EPA Recycling Guidelines
- Local Recycling Centers
- Educational Videos
- Online Resources
- Contact Information

---
© 2025 EcoRecycle Hub - Educational Resource
        `,
        ),
      },
      "teacher-lesson": {
        type: "application/pdf",
        data: generatePDFContent(
          "Teacher Lesson Plan",
          `
# Recycling Education Lesson Plan

## Lesson Overview
**Subject:** Environmental Science
**Grade Level:** 6-12
**Duration:** 45 minutes
**Class Size:** 20-30 students

## Learning Objectives
By the end of this lesson, students will be able to:
1. Identify different types of recyclable materials
2. Explain the environmental benefits of recycling
3. Demonstrate proper sorting techniques
4. Create an action plan for school recycling

## Materials Needed
- Sample recyclable items
- Sorting bins or containers
- Handouts with recycling symbols
- Projector/screen for presentation
- Worksheets for assessment

## Lesson Structure

### Introduction (10 minutes)
1. Hook: Show images of landfills vs. recycled products
2. Ask students about their recycling habits
3. Introduce lesson objectives

### Main Activity (25 minutes)
#### Part 1: Material Identification (10 minutes)
- Display various items
- Students categorize into recyclable/non-recyclable
- Discuss recycling symbols and codes

#### Part 2: Sorting Challenge (15 minutes)
- Divide class into teams
- Each team sorts mixed materials
- Discuss proper techniques and common mistakes

### Conclusion (10 minutes)
1. Review key concepts
2. Assign homework: Home recycling audit
3. Preview next lesson on waste reduction

## Assessment Rubric
**Excellent (4):** Correctly identifies all materials and explains environmental benefits
**Good (3):** Identifies most materials with minor errors
**Satisfactory (2):** Basic understanding with some confusion
**Needs Improvement (1):** Limited understanding, requires additional support

## Extension Activities
- Create recycling posters for school
- Organize classroom recycling program
- Research local recycling facilities
- Calculate environmental impact of class recycling

---
© 2025 EcoRecycle Hub - Teacher Resource
        `,
        ),
      },
      "recycling-bingo": {
        type: "application/pdf",
        data: generatePDFContent(
          "Recycling Bingo Game",
          `
# Recycling Bingo Game

## How to Play
1. Give each student a bingo card
2. Call out items from the calling cards
3. Students mark items that can be recycled
4. First to get 5 in a row wins!

## Bingo Card 1
| B | I | N | G | O |
|---|---|---|---|---|
| Paper | Plastic Bottle | Glass Jar | Aluminum Can | Cardboard |
| Magazine | Yogurt Cup | Wine Bottle | Soda Can | Pizza Box |
| Newspaper | Milk Jug | FREE | Tin Can | Cereal Box |
| Office Paper | Shampoo Bottle | Beer Bottle | Food Can | Egg Carton |
| Notebook | Water Bottle | Mason Jar | Pet Food Can | Shipping Box |

## Calling Cards
- Plastic water bottle (RECYCLABLE)
- Banana peel (COMPOSTABLE)
- Glass pickle jar (RECYCLABLE)
- Styrofoam cup (NOT RECYCLABLE)
- Aluminum foil (RECYCLABLE)
- Pizza box (RECYCLABLE if clean)
- Broken mirror (SPECIAL HANDLING)
- Newspaper (RECYCLABLE)

## Answer Key
✓ = Recyclable
✗ = Not Recyclable
⚠ = Special Handling Required

## Educational Notes
- Clean containers before recycling
- Remove caps from bottles
- Check local guidelines
- When in doubt, throw it out

---
© 2025 EcoRecycle Hub - Activity Resource
        `,
        ),
      },
      "worksheet-pack": {
        type: "application/pdf",
        data: generatePDFContent(
          "Recycling Worksheets",
          `
# Recycling Worksheet Pack

## Grade 3-5: Basic Sorting
Circle the items that can be recycled:
□ Paper bag
□ Banana peel  
□ Glass bottle
□ Plastic toy
□ Metal can
□ Food scraps

## Grade 6-8: Recycling Process
Fill in the blanks:
1. Recycling helps _______ natural resources
2. Paper can be recycled _______ times
3. Aluminum cans can be recycled _______

## Grade 9-12: Environmental Impact
Calculate the environmental savings:
If your school recycles 100 pounds of paper monthly:
- Trees saved: _______
- Water saved: _______ gallons
- Energy saved: _______ kWh

## Answer Keys Included
All worksheets include detailed answer keys and teaching notes.

---
© 2025 EcoRecycle Hub - Worksheet Collection
        `,
        ),
      },
      "eco-challenge": {
        type: "application/pdf",
        data: generatePDFContent(
          "30-Day Eco Challenge",
          `
# 30-Day Eco Challenge

## Week 1: Foundation Building
Day 1: Set up a recycling bin in your room
Day 2: Learn about plastic recycling codes
Day 3: Organize a family recycling audit
Day 4: Create art from recyclable materials
Day 5: Research your local recycling center
Day 6: Start a compost bin
Day 7: Share what you've learned with friends

## Week 2: Expanding Impact
Day 8: Bring reusable bags to the store
Day 9: Use both sides of paper
Day 10: Fix something instead of throwing it away
Day 11: Donate items you no longer need
Day 12: Choose products with less packaging
Day 13: Start a school recycling club
Day 14: Calculate your weekly waste

## Week 3: Community Action
Day 15: Organize a neighborhood cleanup
Day 16: Teach someone else about recycling
Day 17: Write to a company about packaging
Day 18: Visit a recycling facility
Day 19: Create a recycling poster
Day 20: Start a classroom competition
Day 21: Research zero-waste living

## Week 4: Long-term Change
Day 22: Make a family recycling plan
Day 23: Set up electronics recycling
Day 24: Plan a school presentation
Day 25: Create a recycling video
Day 26: Start a community garden
Day 27: Organize a swap meet
Day 28: Write about your experience
Day 29: Plan next month's goals
Day 30: Celebrate your achievements!

## Tracking Sheet
Use the included tracking sheet to monitor your progress and reflect on each day's activity.

---
© 2025 EcoRecycle Hub - Challenge Resource
        `,
        ),
      },
    }

    const content = resourceContent[resourceId] || {
      type: "text/plain",
      data: `Resource: ${filename}\n\nThis is a sample educational resource from EcoRecycle Hub.\n\nFor the complete resource, please visit our website or contact us directly.\n\n© 2025 EcoRecycle Hub`,
    }

    return content
  }

  function generatePDFContent(title, content) {
    return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 12 Tf
50 750 Td
(${title}) Tj
0 -20 Td
(${content.substring(0, 100)}...) Tj
0 -20 Td
(Complete content available in full version) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000526 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
625
%%EOF`
  }

  // Enhanced preview functionality
  window.previewResource = (resourceId) => {
    const modal = document.getElementById("previewModal")
    const previewTitle = document.getElementById("previewTitle")
    const previewContent = document.getElementById("previewContent")
    const previewDownload = document.getElementById("previewDownload")

    const previewData = {
      "student-guide": {
        title: "Complete Student Recycling Guide - Preview",
        content: `
          <div class="preview-pages">
            <div class="preview-page">
              <h3>Chapter 1: Introduction to Recycling</h3>
              <p>Recycling is the process of converting waste materials into new materials and objects. It's an alternative to conventional waste disposal that can save material and help lower greenhouse gas emissions.</p>
              <img src="/placeholder.svg?height=200&width=300" alt="Recycling process diagram" style="width: 100%; max-width: 300px; margin: 1rem 0; border-radius: 8px;">
              <h4>Why Recycle?</h4>
              <ul>
                <li>Conserves natural resources</li>
                <li>Reduces energy consumption</li>
                <li>Decreases pollution</li>
                <li>Creates jobs</li>
              </ul>
            </div>
            <div class="preview-page">
              <h3>Chapter 2: Types of Recyclable Materials</h3>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
                <div style="padding: 1rem; background: #e9e9e9ff; border-radius: 8px;">
                  <h4>📄 Paper & Cardboard</h4>
                  <p>Newspapers, magazines, office paper, cardboard boxes</p>
                </div>
                <div style="padding: 1rem; background: #e7e7e7ff; border-radius: 8px;">
                  <h4>🥤 Plastics</h4>
                  <p>Bottles, containers, bags (special collection)</p>
                </div>
                <div style="padding: 1rem; background: #e0e0e0ff; border-radius: 8px;">
                  <h4>🍶 Glass</h4>
                  <p>Bottles, jars, drinking glasses</p>
                </div>
                <div style="padding: 1rem; background: #d1d1d1ff; border-radius: 8px;">
                  <h4>🥫 Metals</h4>
                  <p>Aluminum cans, steel cans, scrap metal</p>
                </div>
              </div>
            </div>
            <div class="preview-note">
              <p><strong>This is a preview.</strong> The complete guide contains 32 pages with detailed information, activities, illustrations, and practical exercises.</p>
            </div>
          </div>
        `,
        downloadFile: "student-guide.pdf",
      },
      "teacher-lesson": {
        title: "Complete Teacher's Lesson Plan - Preview",
        content: `
          <div class="preview-pages">
            <div class="preview-page">
              <h3>Lesson Overview</h3>
              <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>Subject:</strong> Environmental Science</p>
                <p><strong>Grade Level:</strong> 6-12</p>
                <p><strong>Duration:</strong> 45 minutes</p>
                <p><strong>Class Size:</strong> 20-30 students</p>
              </div>
              <h4>Learning Objectives:</h4>
              <ul>
                <li>Identify different types of recyclable materials</li>
                <li>Explain the environmental benefits of recycling</li>
                <li>Demonstrate proper sorting techniques</li>
                <li>Create an action plan for school recycling</li>
              </ul>
            </div>
            <div class="preview-page">
              <h3>Activity 1: Material Sorting Challenge</h3>
              <p>Students work in teams to sort various items into correct recycling categories. This hands-on activity reinforces learning and makes the lesson interactive.</p>
              <div style="background: #e8f5e9; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <h4>Materials Needed:</h4>
                <ul>
                  <li>Sample recyclable items</li>
                  <li>Sorting bins or containers</li>
                  <li>Handouts with recycling symbols</li>
                  <li>Assessment rubrics</li>
                </ul>
              </div>
            </div>
            <div class="preview-note">
              <p><strong>This is a preview.</strong> The complete lesson plan includes detailed instructions, assessment rubrics, extension activities, and additional resources for 24 pages of comprehensive teaching materials.</p>
            </div>
          </div>
        `,
        downloadFile: "teacher-lesson.pdf",
      },
      "recycling-bingo": {
        title: "Recycling Bingo Game - Preview",
        content: `
          <div class="preview-pages">
            <div class="preview-page">
              <h3>How to Play Recycling Bingo</h3>
              <p>This engaging game helps students learn about recyclable materials while having fun! Perfect for classroom activities or environmental education events.</p>
              <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; max-width: 300px; margin: 1rem 0; border: 2px solid #7b1fa2;">
                <div style="border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 12px; background: #f3e5f5;">Paper</div>
                <div style="border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 12px; background: #f3e5f5;">Plastic</div>
                <div style="border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 12px; background: #f3e5f5;">Glass</div>
                <div style="border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 12px; background: #f3e5f5;">Metal</div>
                <div style="border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 12px; background: #f3e5f5;">Cardboard</div>
                <div style="border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 12px;">Magazine</div>
                <div style="border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 12px;">Bottle</div>
                <div style="border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 12px;">Jar</div>
                <div style="border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 12px;">Can</div>
                <div style="border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 12px;">Box</div>
              </div>
              <h4>Game Rules:</h4>
              <ol>
                <li>Give each student a unique bingo card</li>
                <li>Call out items from the calling cards</li>
                <li>Students mark items that can be recycled</li>
                <li>First to get 5 in a row wins!</li>
              </ol>
            </div>
            <div class="preview-note">
              <p><strong>This is a preview.</strong> The complete game includes 30 different bingo cards, calling cards, answer keys, and educational notes for effective classroom use.</p>
            </div>
          </div>
        `,
        downloadFile: "recycling-bingo.pdf",
      },
      "symbols-poster": {
        title: "Recycling Symbols Poster - Preview",
        content: `
          <div class="preview-pages">
            <div class="preview-page">
              <h3>Recycling Symbols Reference Guide</h3>
              <p>A comprehensive visual guide to understanding recycling symbols and codes. Perfect for classroom display or reference.</p>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0;">
                <div style="text-align: center; padding: 1rem; border: 2px solid #4caf50; border-radius: 8px; background: #f1f8e9;">
                  <div style="font-size: 3rem;">♻️</div>
                  <p style="margin: 0.5rem 0; font-weight: bold; color: #2e7d32;">Type 1 - PET</p>
                  <p style="margin: 0; font-size: 0.8rem;">Polyethylene Terephthalate<br>Water bottles, food containers</p>
                </div>
                <div style="text-align: center; padding: 1rem; border: 2px solid #2196f3; border-radius: 8px; background: #e3f2fd;">
                  <div style="font-size: 3rem;">♻️</div>
                  <p style="margin: 0.5rem 0; font-weight: bold; color: #1976d2;">Type 2 - HDPE</p>
                  <p style="margin: 0; font-size: 0.8rem;">High-Density Polyethylene<br>Milk jugs, detergent bottles</p>
                </div>
                <div style="text-align: center; padding: 1rem; border: 2px solid #ff9800; border-radius: 8px; background: #fff3e0;">
                  <div style="font-size: 3rem;">♻️</div>
                  <p style="margin: 0.5rem 0; font-weight: bold; color: #f57c00;">Type 3 - PVC</p>
                  <p style="margin: 0; font-size: 0.8rem;">Polyvinyl Chloride<br>Pipes, packaging</p>
                </div>
              </div>
              <p style="margin-top: 1rem; font-style: italic;">Each symbol includes detailed information about recyclability and common uses.</p>
            </div>
            <div class="preview-note">
              <p><strong>This is a preview.</strong> The complete poster is high-resolution A3 size (11.7" x 16.5") with all 7 plastic recycling codes plus additional symbols for glass, metal, and paper recycling.</p>
            </div>
          </div>
        `,
        downloadFile: "symbols-poster.png",
      },
      "worksheet-pack": {
        title: "Recycling Worksheet Pack - Preview",
        content: `
          <div class="preview-pages">
            <div class="preview-page">
              <h3>Grade 3-5 Worksheet: Basic Sorting</h3>
              <p><strong>Instructions:</strong> Circle the items that can be recycled in your community:</p>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1rem 0;">
                <div style="text-align: center; padding: 1rem; border: 1px solid #ccc; border-radius: 8px;">
                  <div style="font-size: 2rem;">📄</div>
                  <p style="margin: 0.5rem 0;">Paper bag</p>
                  <div style="width: 20px; height: 20px; border: 2px solid #333; border-radius: 50%; margin: 0 auto;"></div>
                </div>
                <div style="text-align: center; padding: 1rem; border: 1px solid #ccc; border-radius: 8px;">
                  <div style="font-size: 2rem;">🥤</div>
                  <p style="margin: 0.5rem 0;">Plastic bottle</p>
                  <div style="width: 20px; height: 20px; border: 2px solid #333; border-radius: 50%; margin: 0 auto;"></div>
                </div>
                <div style="text-align: center; padding: 1rem; border: 1px solid #ccc; border-radius: 8px;">
                  <div style="font-size: 2rem;">🍌</div>
                  <p style="margin: 0.5rem 0;">Banana peel</p>
                  <div style="width: 20px; height: 20px; border: 2px solid #333; border-radius: 50%; margin: 0 auto;"></div>
                </div>
                <div style="text-align: center; padding: 1rem; border: 1px solid #ccc; border-radius: 8px;">
                  <div style="font-size: 2rem;">🥫</div>
                  <p style="margin: 0.5rem 0;">Aluminum can</p>
                  <div style="width: 20px; height: 20px; border: 2px solid #333; border-radius: 50%; margin: 0 auto;"></div>
                </div>
              </div>
            </div>
            <div class="preview-page">
              <h3>Grade 6-8 Worksheet: Recycling Process</h3>
              <p><strong>Fill in the blanks:</strong></p>
              <div style="background: #ebebebff; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p>1. Recycling helps _____________ natural resources.</p>
                <p>2. Paper can be recycled up to _______ times before the fibers become too short.</p>
                <p>3. Aluminum cans can be recycled _____________ without losing quality.</p>
                <p>4. The recycling symbol with the number _______ represents PET plastic.</p>
              </div>
            </div>
            <div class="preview-note">
              <p><strong>This is a preview.</strong> The complete pack includes 40 pages of worksheets for grades 3-12 with detailed answer keys, teaching notes, and extension activities.</p>
            </div>
          </div>
        `,
        downloadFile: "worksheet-pack.pdf",
      },
      "eco-challenge": {
        title: "30-Day Eco Challenge Cards - Preview",
        content: `
          <div class="preview-pages">
            <div class="preview-page">
              <h3>30-Day Eco Challenge Overview</h3>
              <p>Build sustainable habits with daily challenges designed to make environmental action fun and engaging!</p>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
                <div style="padding: 1rem; background: linear-gradient(135deg, #e4e4e4ff, #dadadaff); border-radius: 8px; border-left: 4px solid #4caf50;">
                  <strong>Week 1: Foundation</strong><br>
                  <small>Days 1-7: Building basic recycling habits</small>
                  <div style="margin-top: 0.5rem; font-size: 0.9rem;">
                    • Set up recycling bins<br>
                    • Learn recycling codes<br>
                    • Family audit
                  </div>
                </div>
                <div style="padding: 1rem; background: linear-gradient(135deg, #ddddddff, #dbdbdbff); border-radius: 8px; border-left: 4px solid #2196f3;">
                  <strong>Week 2: Expansion</strong><br>
                  <small>Days 8-14: Expanding your impact</small>
                  <div style="margin-top: 0.5rem; font-size: 0.9rem;">
                    • Reusable alternatives<br>
                    • Waste reduction<br>
                    • Community involvement
                  </div>
                </div>
                <div style="padding: 1rem; background: linear-gradient(135deg, #e7e7e7ff, #e9e9e9ff); border-radius: 8px; border-left: 4px solid #ff9800;">
                  <strong>Week 3: Innovation</strong><br>
                  <small>Days 15-21: Creative solutions</small>
                  <div style="margin-top: 0.5rem; font-size: 0.9rem;">
                    • Upcycling projects<br>
                    • Teaching others<br>
                    • Community cleanup
                  </div>
                </div>
                <div style="padding: 1rem; background: linear-gradient(135deg, #fce4ec, #f8bbd9); border-radius: 8px; border-left: 4px solid #e91e63;">
                  <strong>Week 4: Leadership</strong><br>
                  <small>Days 22-30: Becoming a leader</small>
                  <div style="margin-top: 0.5rem; font-size: 0.9rem;">
                    • Organize events<br>
                    • Create content<br>
                    • Plan future goals
                  </div>
                </div>
              </div>
            </div>
            <div class="preview-page">
              <h3>Sample Challenge Cards</h3>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="padding: 1rem; border: 2px solid #006603ff; border-radius: 8px; background: #f1f8e9;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #006305ff;">Day 1 Challenge</strong>
                    <span style="background: #006403ff; color: white; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem;">Beginner</span>
                  </div>
                  <p style="margin: 0.5rem 0;">Set up a recycling bin in your room and decorate it with eco-friendly messages.</p>
                  <small style="color: #666;">💡 Tip: Use recycled materials to decorate your bin!</small>
                </div>
                <div style="padding: 1rem; border: 2px solid #156b00ff; border-radius: 8px; background: #e3f2fd;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #0a7a00ff;">Day 15 Challenge</strong>
                    <span style="background: #007700ff; color: white; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem;">Intermediate</span>
                  </div>
                  <p style="margin: 0.5rem 0;">Organize a neighborhood cleanup and invite friends to join you.</p>
                  <small style="color: #666;">💡 Tip: Contact local environmental groups for supplies and support!</small>
                </div>
              </div>
            </div>
            <div class="preview-note">
              <p><strong>This is a preview.</strong> The complete challenge includes 30 unique daily activities with tracking sheets, progress certificates, and bonus weekend challenges for extended engagement.</p>
            </div>
          </div>
        `,
        downloadFile: "eco-challenge.pdf",
      },
    }

    const data = previewData[resourceId]
    if (data) {
      previewTitle.textContent = data.title
      previewContent.innerHTML = data.content
      previewDownload.onclick = () => window.downloadResource(data.downloadFile, resourceId)

      modal.style.display = "block"

      // Animate modal appearance
      if (typeof gsap !== "undefined") {
        gsap.from(".modal-content", {
          duration: 0.3,
          scale: 0.8,
          opacity: 0,
          ease: "back.out(1.7)",
        })
      }
    }
  }

  // Close preview modal
  window.closePreview = () => {
    const modal = document.getElementById("previewModal")
    modal.style.display = "none"
  }

  // Close modal when clicking outside
  const modal = document.getElementById("previewModal")
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        window.closePreview()
      }
    })
  }

  // Enhanced newsletter form handling
  const newsletterForm = document.getElementById("newsletterForm")
  const newsletterSuccess = document.getElementById("newsletterSuccess")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const isTeacher = document.getElementById("teacherUpdates").checked

      if (validateEmail(email)) {
        // Simulate subscription
        newsletterForm.style.display = "none"
        newsletterSuccess.style.display = "block"

        // Animate success message
        if (typeof gsap !== "undefined") {
          gsap.from(newsletterSuccess, {
            duration: 0.8,
            scale: 0.8,
            opacity: 2,
            ease: "back.out(1.7)",
          })
        }

        showToast(`Successfully subscribed! Welcome to our community.`)
        console.log(`Newsletter subscription: ${email}, Teacher: ${isTeacher}`)

        // Reset form after delay
        setTimeout(() => {
          newsletterForm.reset()
          newsletterForm.style.display = "block"
          newsletterSuccess.style.display = "none"
        }, 2000)
      } else {
        showToast("Please enter a valid email address.", "error")
      }
    })
  }

  // Enhanced resource request form handling
  const resourceRequestForm = document.getElementById("resourceRequestForm")

  if (resourceRequestForm) {
    resourceRequestForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      if (validateResourceRequest(data)) {
        // Simulate form submission
        const submitBtn = this.querySelector(".btn-submit")
        const originalText = submitBtn.textContent

        submitBtn.textContent = "Submitting..."
        submitBtn.disabled = true

        setTimeout(() => {
          submitBtn.textContent = "Request Submitted!"
          submitBtn.style.background = "#005303ff"

          showToast("Resource request submitted successfully! We'll get back to you within 48 hours.")

          setTimeout(() => {
            this.reset()
            submitBtn.textContent = originalText
            submitBtn.style.background = ""
            submitBtn.disabled = false
          }, 2000)
        }, 1000)

        console.log("Resource request submitted:", data)
      }
    })
  }

  // Enhanced validation functions
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function validateResourceRequest(data) {
    const required = ["requestName", "requestEmail", "requestType", "requestDescription"]

    for (const field of required) {
      if (!data[field] || data[field].trim() === "") {
        showToast(`Please fill in the ${field.replace("request", "").toLowerCase()} field.`, "error")
        return false
      }
    }

    if (!validateEmail(data.requestEmail)) {
      showToast("Please enter a valid email address.", "error")
      return false
    }

    return true
  }

  // Toast notification system
  function showToast(message, type = "success") {
    const toast = document.getElementById("successToast")
    const toastMessage = toast.querySelector(".toast-message")
    const toastIcon = toast.querySelector(".toast-icon")

    // Update content
    toastMessage.textContent = message

    // Update styling based on type
    if (type === "error") {
      toast.style.background = "#f44336"
      toastIcon.textContent = "❌"
    } else {
      toast.style.background = "#4caf50"
      toastIcon.textContent = "✅"
    }

    // Show toast
    toast.classList.add("show")

    // Hide after 4 seconds
    setTimeout(() => {
      toast.classList.remove("show")
    }, 4000)
  }

  // Add hover effects to resource cards
  const resourcecards = document.querySelectorAll(".resource-card")
  resourceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, {
          duration: 0.3,
          y: -8,
          ease: "power2.out",
        })
      }
    })

    card.addEventListener("mouseleave", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, {
          duration: 0.3,
          y: 0,
          ease: "power2.out",
        })
      }
    })
  })

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // Close modal with Escape key
    if (e.key === "Escape") {
      const modal = document.getElementById("previewModal")
      if (modal.style.display === "block") {
        window.closePreview()
      }
    }
  })

  // Add loading states for better UX
  const allButtons = document.querySelectorAll("button")
  allButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (!this.disabled) {
        this.style.opacity = "1"
        setTimeout(() => {
          this.style.opacity = "1"
        }, 200)
      }
    })
  })

  // Initialize page
  console.log("Resources page loaded successfully")
  showToast("Welcome to EcoRecycle Hub Resources! Explore our educational materials.")
})
