// app/confirm/page.js
import { Suspense } from 'react'
import ConfirmComponent from './ConfirmComponent'

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading confirmation...</p>
      </div>
    }>
      <ConfirmComponent />
    </Suspense>
  )
}