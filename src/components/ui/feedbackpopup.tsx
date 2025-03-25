
//@src/components/ui/feedbackpopup.tsx
import { Button } from "../../components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Textarea } from "../../components/ui/textarea";
import React, { useState } from 'react';
import { createFeedback as _createFeedback } from 'wasp/client/operations'; // Import the action aliased
import { useAction } from 'wasp/client/operations';

function Component() {
  const [feedbackText, setFeedbackText] = useState('');
  const createFeedbackAction = useAction(_createFeedback);  // Use the aliased import
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createFeedbackAction({ content: feedbackText });
      setFeedbackText(''); // Clear textarea on success
      alert('Feedback submitted successfully!'); // Success message
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Feedback</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 z-1000">
          <h2 className="mb-2 text-sm font-semibold">Send us feedback</h2>
          <form className="space-y-3">
            <Textarea
              id="feedback"
              placeholder="How can we improve this website?"
              aria-label="Send feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              disabled={isSubmitting} // Disable the textarea while submitting
            />
            <div className="flex flex-col sm:flex-row sm:justify-end">
              <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}> {/* Use onClick, not type=submit */}
                {isSubmitting ? 'Sending...' : 'Send feedback'}
              </Button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error */}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { Component };