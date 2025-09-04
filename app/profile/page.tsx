"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Award, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [user] = useState({
    name: "Alex Johnson",
    title: "Senior AI Solutions Architect",
    email: "alex.johnson@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2022",
    avatar: "/professional-headshot.png",
  })

  const stats = [
    { label: "Projects Completed", value: "150+", icon: Award },
    { label: "Team Members", value: "25", icon: Users },
    { label: "Success Rate", value: "98%", icon: TrendingUp },
    { label: "Years Experience", value: "8", icon: Calendar },
  ]

  const expertise = [
    "Machine Learning & AI",
    "Data Architecture",
    "Cloud Solutions",
    "Team Leadership",
    "Strategic Planning",
    "Client Relations",
  ]

  const recentProjects = [
    {
      name: "AI-Powered Analytics Platform",
      client: "TechCorp Inc.",
      status: "Completed",
      description: "Developed comprehensive analytics solution using machine learning algorithms",
    },
    {
      name: "Automated Customer Service Bot",
      client: "RetailMax",
      status: "In Progress",
      description: "Building intelligent chatbot with natural language processing capabilities",
    },
    {
      name: "Predictive Maintenance System",
      client: "Manufacturing Co.",
      status: "Planning",
      description: "Designing IoT-based predictive maintenance solution for industrial equipment",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-[#f9d022] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
            <div className="text-[#f9d022] font-bold text-xl">Profile</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#f9d022]"
              />
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{user.name}</h1>
                <p className="text-xl text-[#f9d022] mb-6">{user.title}</p>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Passionate about leveraging artificial intelligence to solve complex business challenges. With over 8
                  years of experience in AI and machine learning, I help organizations transform their operations
                  through innovative solutions that make a difference.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-5 h-5 text-[#f9d022]" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-5 h-5 text-[#f9d022]" />
                    {user.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-[#f9d022]" />
                    {user.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-5 h-5 text-[#f9d022]" />
                    Joined {user.joinDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Button className="w-full bg-[#f9d022] text-black hover:bg-[#e6bb1e] font-semibold">Edit Profile</Button>
            <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent">
              Download Resume
            </Button>
            <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent">
              Schedule Meeting
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">My expertise, reach and recognition</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-[#f9d022] mb-2">{stat.value}</div>
                  <div className="text-gray-300 mb-4">{stat.label}</div>
                  <Icon className="w-8 h-8 text-[#f9d022] mx-auto" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Core Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expertise.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-[#f9d022] transition-colors"
              >
                <div className="text-white font-semibold">{skill}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Recent Projects</h2>
          <div className="space-y-6">
            {recentProjects.map((project, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 p-0 gap-0">
                <CardHeader className="bg-black text-white font-bold p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{project.name}</h3>
                      <p className="text-[#f9d022] mt-1">{project.client}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === "Completed"
                          ? "bg-green-900 text-green-300"
                          : project.status === "In Progress"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-yellow-900 text-yellow-300"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="bg-[#f9d022] text-white p-6">
                  <p>{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Let's work together</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to transform your business with AI? Let's discuss how we can create innovative solutions that drive
            real results.
          </p>
          <Button className="bg-[#f9d022] text-black hover:bg-[#e6bb1e] font-semibold px-8 py-3 text-lg">
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  )
}
