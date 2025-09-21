"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Bell, Calendar, Clock, Plus, TrendingUp } from "lucide-react"
import { QuietHourForm } from "@/components/QuietHourForm"

type Block = {
  _id: string
  title: string
  startTime: string
  endTime: string
  reminderSent: boolean   // new field
}

const Page = () => {
  const [showForm, setShowForm] = useState(false)

  const handleCloseForm = () => setShowForm(false)
  

const [block, setBlock] = useState<Block[]>([])



  const handleFormSubmit = async (formData: { title: string; start_time: string; end_time: string }) => {
    try {
      const response = await axios.post("/api/create-block", formData) // send form data to API
      console.log("Quiet hour created:", response.data)

      // Close modal after successful save
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
          console.error("Error in fetching blocks: ",error)
      }
    }
    fetchData()
  },[]) 

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards */}
      <div className="">Your Quiet Hours</div>
      {block.length !== 0 ? (
        block.map((item,id) => (
          <div key={item._id} className="p-4 mb-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="font-semibold">{item.title}</div>
            <div>{new Date(item.startTime).toLocaleString()}</div>
            <div>{new Date(item.endTime).toLocaleString()}</div>
            <div className="flex items-center mt-2 text-sm">
              <Bell className="w-4 h-4 mr-1" />
              {item.reminderSent ? (
                <span className="text-green-600 font-medium">Reminder sent</span>
              ) : (
                <span className="text-yellow-600 font-medium">Reminder pending</span>
              )}
            </div>
          </div>
        ))
      )
      :(<div>No things made make one now</div>)}

      {/* Quick Actions */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Schedule New Session
        </button>
      </div>

      <QuietHourForm isOpen={showForm} onClose={handleCloseForm} onSubmit={handleFormSubmit} />

      {/* Later you’ll fetch and list quiet hours here */}
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
