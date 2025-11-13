import { type NextRequest, NextResponse } from "next/server"

interface FormData {
  year: string
  branch: string
  strongSubjects: string[]
  helpSubjects: string[]
  studyStyle: string
  groupSize: string
  timeSlots: string
  sessionPreference: string
  location: string
  branchPreference: string
}

interface MatchResult {
  name: string
  similarity: number
  commonSubjects: string[]
  studyStyle: string
}

// Indian sample names
const SAMPLE_NAMES = [
  "Aarav Sharma",
  "Ananya Verma",
  "Rohan Mehta",
  "Priya Singh",
  "Vivaan Kapoor",
  "Isha Gupta",
  "Karan Patel",
  "Diya Reddy",
  "Aditya Joshi",
  "Sneha Nair",
  "Rahul Kumar",
  "Pooja Jain",
  "Ankit Malhotra",
  "Meera Rao",
  "Vikram Choudhary",
  "Sanya Khanna",
  "Ritika Bansal",
  "Nikhil Desai",
  "Tanya Saxena",
  "Varun Iyer"
]

const STUDY_STYLES = ["Quiet", "Interactive", "Problem-solving", "Mixed"]

function generateMatches(formData: FormData): MatchResult[] {
  const matches: MatchResult[] = []

  // Copy names to pick randomly without repetition
  const availableNames = [...SAMPLE_NAMES]

  const numMatches = Math.floor(Math.random() * 3) + 3 // 3-5 matches
  const usedNames = new Set<string>()

  for (let i = 0; i < numMatches; i++) {
    if (availableNames.length === 0) break
    const index = Math.floor(Math.random() * availableNames.length)
    const name = availableNames.splice(index, 1)[0]
    usedNames.add(name)

    // Base similarity
    let similarity = Math.floor(Math.random() * 30) + 70 // 70-100%

    // Common subjects from strongSubjects and helpSubjects
    const commonSubjects: string[] = []

    const strongSubjectsToAdd = Math.min(formData.strongSubjects.length, 3)
    for (let j = 0; j < strongSubjectsToAdd; j++) {
      if (Math.random() > 0.3) {
        const subject = formData.strongSubjects[Math.floor(Math.random() * formData.strongSubjects.length)]
        if (!commonSubjects.includes(subject)) commonSubjects.push(subject)
      }
    }

    const helpSubjectsToAdd = Math.min(formData.helpSubjects.length, 2)
    for (let j = 0; j < helpSubjectsToAdd; j++) {
      if (Math.random() > 0.4) {
        const subject = formData.helpSubjects[Math.floor(Math.random() * formData.helpSubjects.length)]
        if (!commonSubjects.includes(subject)) commonSubjects.push(subject)
      }
    }

    if (commonSubjects.length === 0 && formData.strongSubjects.length > 0) {
      commonSubjects.push(formData.strongSubjects[0])
    }

    // Study style
    let studyStyle: string
    if (Math.random() > 0.4) {
      studyStyle = formData.studyStyle || STUDY_STYLES[Math.floor(Math.random() * STUDY_STYLES.length)]
    } else {
      studyStyle = STUDY_STYLES[Math.floor(Math.random() * STUDY_STYLES.length)]
    }

    if (studyStyle === formData.studyStyle) similarity += 5
    if (commonSubjects.length >= 3) similarity += 10
    if (commonSubjects.length >= 2) similarity += 5
    similarity = Math.min(similarity, 98)

    matches.push({
      name,
      similarity,
      commonSubjects: commonSubjects.slice(0, 4),
      studyStyle,
    })
  }

  matches.sort((a, b) => b.similarity - a.similarity)
  return matches
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json()

    // Validate required fields
    if (!formData.year || !formData.branch) {
      return NextResponse.json({ error: "Year and branch are required fields" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate matches
    const matches = generateMatches(formData)

    return NextResponse.json({
      success: true,
      matches,
      message: `Found ${matches.length} potential study partners for you!`,
    })
  } catch (error) {
    console.error("Error processing match request:", error)
    return NextResponse.json({ error: "Failed to process your request. Please try again." }, { status: 500 })
  }
}

// GET is not allowed
export async function GET() {
  return NextResponse.json({ error: "Method not allowed. Use POST to submit match requests." }, { status: 405 })
}
