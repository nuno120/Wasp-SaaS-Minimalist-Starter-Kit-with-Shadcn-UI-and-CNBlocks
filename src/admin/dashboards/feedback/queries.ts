
import { type Feedback } from 'wasp/entities';
import { HttpError } from 'wasp/server';
import { type GetFeedbackForAdmin } from 'wasp/server/operations';

type GetFeedbackArgs = {
  page: number;
  pageSize: number;
}

export type GetFeedbackResult = {
  feedback: Feedback[];
  totalCount: number;
}

export const getFeedbackForAdmin: GetFeedbackForAdmin<GetFeedbackArgs, GetFeedbackResult> = async (args, context) => {
  if (!context.user?.isAdmin) {
    throw new HttpError(403, 'Unauthorized: Only admins can access this data.');
  }

  const page = args.page; //  required
  const pageSize = args.pageSize; // required

  const skip = (page - 1) * pageSize;

  const [feedback, totalCount] = await Promise.all([
    context.entities.Feedback.findMany({
      orderBy: {
        createdAt: 'desc', // Newest first
      },
      skip,
      take: pageSize,
    }),
    context.entities.Feedback.count(),
  ]);

  return { feedback, totalCount };
};

export default getFeedbackForAdmin