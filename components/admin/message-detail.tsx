"use client"

import { useState } from "react"
import { type Message, formatDate, useAdminStore } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, User } from "lucide-react"

interface MessageDetailProps {
  message: Message
  onClose: () => void
  onDelete: () => void
}

export default function MessageDetail({ message, onClose, onDelete }: MessageDetailProps) {
  const { markMessageAsRead } = useAdminStore()
  const [replying, setReplying] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleMarkAsRead = () => {
    if (!message.read) {
      markMessageAsRead(message.id)
    }
  }

  const handleReply = () => {
    setReplying(true)

    // Simulate sending a reply
    setTimeout(() => {
      setReplying(false)
      // In a real app, this would send an email
      alert(`Reply sent to ${message.email}`)
    }, 1500)
  }

  const handleDelete = () => {
    setDeleting(true)

    setTimeout(() => {
      onDelete()
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium text-gray-900">{message.subject}</h3>
          <p className="text-sm text-gray-500">{formatDate(message.date)}</p>
        </div>
        {!message.read && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            New
          </span>
        )}
      </div>

      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{message.name}</p>
          <p className="text-sm text-gray-500 flex items-center">
            <Mail className="h-4 w-4 mr-1" /> {message.email}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="whitespace-pre-line">{message.message}</p>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Back to Messages
        </Button>

        <div className="space-x-3">
          {!message.read && (
            <Button variant="outline" onClick={handleMarkAsRead}>
              Mark as Read
            </Button>
          )}

          <Button className="bg-[#004D40] hover:bg-[#00695C] text-white" onClick={handleReply} disabled={replying}>
            {replying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>Reply</>
            )}
          </Button>

          <Button
            variant="outline"
            className="text-red-600 hover:bg-red-50 border-red-200"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>Delete</>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
