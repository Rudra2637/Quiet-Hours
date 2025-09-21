"use client"
import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from "react";
import { Bell, Calendar, Clock, Plus, TrendingUp } from 'lucide-react';
import { QuietHourForm } from '@/components/QuietHourForm';

const page = () => {

  const [showForm, setShowForm] = useState(false)
  const handleCloseForm = () => {
    setShowForm(false)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900">todayQuietHours</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">thisWeek Quiet Hours</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">Hello here is quietHours.length</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Quiet Hours</h2>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Schedule New Session
          </button>
        </div>
        {showForm && <QuietHourForm
          isOpen={showForm}
          onClose={handleCloseForm}
          onSubmit={async (data) => {
            try {
              // POST new quiet hour to your API
              await axios.post("/api/blocks", data);

              // (optional) re-fetch or refresh the list of blocks
              // fetchQuietHours();

            } catch (err) {
              console.error("Failed to save quiet hour", err);
            }
          }}
          />
        }

        {/* Upcoming Sessions */}
        {/* {upcomingQuietHours.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {upcomingQuietHours.map(quietHour => (
                <QuietHourCard
                  key={quietHour._id}
                  quietHour={quietHour}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSendNotification={sendNotificationEmail}
                />
              ))}
            </div>
          </div>
        )} */}

        {/* All Sessions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Sessions</h3>
          {/* {quietHours.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No quiet hours scheduled</h3>
              <p className="text-gray-600 mb-6">
                Create your first quiet hour to start managing your focused study time.
              </p>
              <button
                // onClick={() => setShowForm(true)}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Schedule Your First Session
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {quietHours.map(quietHour => (
                <QuietHourCard
                  key={quietHour._id}
                  quietHour={quietHour}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSendNotification={sendNotificationEmail}
                />
              ))}
            </div>
          )} */}
        </div>
      </main>
  )
}

export default page







































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
