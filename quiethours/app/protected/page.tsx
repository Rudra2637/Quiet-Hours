"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Bell, Calendar, Clock, Plus } from "lucide-react"
import { QuietHourForm } from "@/components/QuietHourForm"

type Block = {
  _id: string
  title: string
  startTime: string
  endTime: string
  reminderSent: boolean  
}

const Page = () => {
  const [showForm, setShowForm] = useState(false)
  const [block, setBlock] = useState<Block[]>([])

  const handleCloseForm = () => setShowForm(false)

  const handleFormSubmit = async (formData: { title: string; start_time: string; end_time: string }) => {
    try {
      const response = await axios.post("/api/create-block", formData) 
      console.log("Quiet hour created:", response.data)

      setShowForm(false)
      const result = await axios.get("/api/get-blocks")
      setBlock(result.data)

    } catch (error) {
      console.error("Error creating quiet hour:", error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/get-blocks")
        setBlock(response.data)
      } catch (error) {
        console.error("Error in fetching blocks: ", error)
      }
    }
    fetchData()
  },[]) 

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Calendar className="w-7 h-7 text-indigo-600" />
          Your Quiet Hours
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Schedule Session
        </button>
      </div>

      {/* Quiet Hour Cards */}
      {block.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {block.map((item) => (
            <div
              key={item._id}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
                {item.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                <Clock className="w-4 h-4 text-indigo-500" />
                {new Date(item.startTime).toLocaleString()}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <Clock className="w-4 h-4 text-indigo-500" />
                {new Date(item.endTime).toLocaleString()}
              </div>
              <div className="flex items-center text-sm font-medium">
                <Bell className="w-4 h-4 mr-2 text-indigo-500" />
                {item.reminderSent ? (
                  <span className="text-green-600">Reminder sent</span>
                ) : (
                  <span className="text-yellow-600">Reminder pending</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            You haven’t scheduled any Quiet Hours yet.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Session
          </button>
        </div>
      )}

      {/* Form Modal */}
      <QuietHourForm isOpen={showForm} onClose={handleCloseForm} onSubmit={handleFormSubmit} />
    </main>
  )
}

export default Page









































// import { redirect } from "next/navigation";

// import { createClient } from "@/lib/supabase/server";
// import { InfoIcon } from "lucide-react";
// import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";

// export default async function ProtectedPage() {
//   const supabase = await createClient();

//   const { data, error } = await supabase.auth.getClaims();
//   if (error || !data?.claims) {
//     redirect("/auth/login");
//   }

//   return (
//     <div className="flex-1 w-full flex flex-col gap-12">
//       <div className="w-full">
//         <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
//           <InfoIcon size="16" strokeWidth={2} />
//           This is a protected page that you can only see as an authenticated
//           user Hi from RUdra
//         </div>
//       </div>
//       <div className="flex flex-col gap-2 items-start">
//         <h2 className="font-bold text-2xl mb-4">Your user details</h2>
//         <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
//           {JSON.stringify(data.claims, null, 2)}
//         </pre>
//       </div>
//       <div>
//         <h2 className="font-bold text-2xl mb-4">Next steps</h2>
//         <FetchDataSteps />
//       </div>
//     </div>
//   );
// }
