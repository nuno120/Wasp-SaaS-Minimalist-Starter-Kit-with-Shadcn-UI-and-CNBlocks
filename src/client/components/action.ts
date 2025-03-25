// @src/actions/feedbackActions.ts
import { type CreateFeedback } from 'wasp/server/operations'

// Define input types using Pick to include the necessary fields
type CreateFeedbackInput = { content: string };

export const createFeedback: CreateFeedback<CreateFeedbackInput, void> = async (args, context) => {
  try {
    await context.entities.Feedback.create({
      data: {
        content: args.content,
      },
    });
  } catch (error: any) {
    console.error(error)
    throw new Error('Failed to create feedback'); // You can use HttpError if you want
  }
};

export default createFeedback;