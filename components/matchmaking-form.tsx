"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface FormData {
  firstName: string
  lastName: string
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

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"]
const BRANCHES = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Chemical",
  "Electrical",
  "Information Technology",
  "Biotechnology",
  "Mathematics",
  "Physics",
  "Chemistry",
]
const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Programming",
  "Data Structures",
  "Algorithms",
  "Database Systems",
  "Operating Systems",
  "Computer Networks",
  "Machine Learning",
  "Web Development",
  "Mobile Development",
  "Statistics",
  "Linear Algebra",
  "Calculus",
  "Discrete Mathematics",
  "Software Engineering",
]
const STUDY_STYLES = ["Quiet", "Interactive", "Problem-solving", "Mixed"]
const GROUP_SIZES = ["1-on-1", "2-3", "4-6"]
const SESSION_PREFERENCES = ["Regular weekly", "On-demand"]
const LOCATIONS = ["Library","LRC", "Hostel","Common Room"]
const BRANCH_PREFERENCES = ["Same branch only", "Open to cross-branch"]

export function MatchmakingForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    year: "",
    branch: "",
    strongSubjects: [],
    helpSubjects: [],
    studyStyle: "",
    groupSize: "",
    timeSlots: "",
    sessionPreference: "",
    location: "",
    branchPreference: "",
  })

  const [matches, setMatches] = useState<MatchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubjectChange = (subject: string, type: "strong" | "help", checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [type === "strong" ? "strongSubjects" : "helpSubjects"]: checked
        ? [...prev[type === "strong" ? "strongSubjects" : "helpSubjects"], subject]
        : prev[type === "strong" ? "strongSubjects" : "helpSubjects"].filter((s) => s !== subject),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setMatches(data.matches)
        setShowResults(true)

        // Scroll to results after a brief delay
        setTimeout(() => {
          const resultsElement = document.getElementById("results-section")
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: "smooth" })
          }
        }, 500)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to find matches. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      year: "",
      branch: "",
      strongSubjects: [],
      helpSubjects: [],
      studyStyle: "",
      groupSize: "",
      timeSlots: "",
      sessionPreference: "",
      location: "",
      branchPreference: "",
    })
    setMatches([])
    setShowResults(false)
    setError(null)
  }

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 90) return "bg-green-100 text-green-800 border-green-200"
    if (similarity >= 80) return "bg-blue-100 text-blue-800 border-blue-200"
    if (similarity >= 70) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <section id="matchmaking-form" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Find Your Study Match</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Tell us about your academic preferences and we'll connect you with compatible study partners
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Academic Profile</CardTitle>
              <CardDescription>Help us understand your study needs and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                {/* Year and Branch */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year of Study</Label>
                    <Select
                      value={formData.year}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, year: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEARS.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch of Study</Label>
                    <Select
                      value={formData.branch}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, branch: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRANCHES.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Strong Subjects */}
                <div className="space-y-4">
                  <Label>Strong Subjects (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SUBJECTS.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={`strong-${subject}`}
                          checked={formData.strongSubjects.includes(subject)}
                          onCheckedChange={(checked) => handleSubjectChange(subject, "strong", checked as boolean)}
                        />
                        <Label htmlFor={`strong-${subject}`} className="text-sm font-normal">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help Subjects */}
                <div className="space-y-4">
                  <Label>Subjects Needing Help (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SUBJECTS.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={`help-${subject}`}
                          checked={formData.helpSubjects.includes(subject)}
                          onCheckedChange={(checked) => handleSubjectChange(subject, "help", checked as boolean)}
                        />
                        <Label htmlFor={`help-${subject}`} className="text-sm font-normal">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Study Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="studyStyle">Preferred Study Style</Label>
                    <Select
                      value={formData.studyStyle}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, studyStyle: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select study style" />
                      </SelectTrigger>
                      <SelectContent>
                        {STUDY_STYLES.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="groupSize">Preferred Group Size</Label>
                    <Select
                      value={formData.groupSize}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, groupSize: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select group size" />
                      </SelectTrigger>
                      <SelectContent>
                        {GROUP_SIZES.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-2">
                  <Label htmlFor="timeSlots">Available Time Slots</Label>
                  <Textarea
                    id="timeSlots"
                    placeholder="e.g., Weekdays 2-4 PM, Weekends 10 AM-12 PM"
                    value={formData.timeSlots}
                    onChange={(e) => setFormData((prev) => ({ ...prev, timeSlots: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Session and Location Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sessionPreference">Session Preference</Label>
                    <Select
                      value={formData.sessionPreference}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, sessionPreference: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {SESSION_PREFERENCES.map((pref) => (
                          <SelectItem key={pref} value={pref}>
                            {pref}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Preferred Study Location</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branchPreference">Branch Preference</Label>
                    <Select
                      value={formData.branchPreference}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, branchPreference: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRANCH_PREFERENCES.map((pref) => (
                          <SelectItem key={pref} value={pref}>
                            {pref}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-destructive text-sm">{error}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 text-lg py-6 rounded-xl" disabled={isLoading}>
                    {isLoading ? "Finding Matches..." : "Find My Study Partners"}
                  </Button>
                  {showResults && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="px-6 py-6 rounded-xl bg-transparent"
                    >
                      New Search
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {showResults && (
            <div id="results-section" className="mt-12 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Your Recommended Matches</h3>
                <p className="text-muted-foreground">
                  Found {matches.length} compatible study partner{matches.length !== 1 ? "s" : ""} for you!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match, index) => (
                  <Card
                    key={index}
                    className="shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in-50 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{match.name}</CardTitle>
                        <Badge
                          variant="secondary"
                          className={`${getSimilarityColor(match.similarity)} border font-semibold`}
                        >
                          {match.similarity}% Match
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-foreground mb-2">Study Style:</p>
                          <Badge variant="outline" className="text-xs">
                            {match.studyStyle}
                          </Badge>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-foreground mb-2">Shared Subjects:</p>
                          <div className="flex flex-wrap gap-1">
                            {match.commonSubjects.length > 0 ? (
                              match.commonSubjects.map((subject, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                                >
                                  {subject}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground">No shared subjects</span>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-4 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                        >
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Great! We found your matches</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Click "Connect" on any match to start your collaborative learning journey. Remember, the best
                      study sessions happen when everyone contributes their strengths!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
