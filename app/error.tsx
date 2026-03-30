'use client'; 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2 id="errorH2">Taking a Short break!</h2>
      <span id="errorSpan">Will be back April 1st!</span>
    </div>
  )
}