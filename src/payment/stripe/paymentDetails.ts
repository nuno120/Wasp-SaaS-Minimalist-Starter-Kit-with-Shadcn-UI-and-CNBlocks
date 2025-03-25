import type { SubscriptionStatus } from '../plans';
import { PaymentPlanId } from '../plans';
import { PrismaClient } from '@prisma/client';

export const updateUserStripePaymentDetails = (
  { userStripeId, subscriptionPlan, subscriptionStatus, datePaid, numOfCreditsPurchased }: {
    userStripeId: string;
    subscriptionPlan?: PaymentPlanId;
    subscriptionStatus?: SubscriptionStatus;
    numOfCreditsPurchased?: number;
    datePaid?: Date;
  },
  userDelegate: PrismaClient['user']
) => {
  let adjustedCredits: number | undefined = undefined;
  if (numOfCreditsPurchased !== undefined) {
    // Subtract 50 cents (represented as 0.5 credits) for the processing fee.
    adjustedCredits = numOfCreditsPurchased - 0.5;

    // Ensure we don't subtract more than available, resulting in negative credits. This is a crucial safeguard.
    if (adjustedCredits < 0) {
      adjustedCredits = 0; // Or handle this case differently, e.g., log an error or throw an exception.  Crucially important for real world use.
      console.warn("Warning: Processing fee exceeds the number of credits purchased.  Setting credits increment to 0."); // Add logging.
    }
  }


  return userDelegate.update({
    where: {
      paymentProcessorUserId: userStripeId
    },
    data: {
      paymentProcessorUserId: userStripeId,
      subscriptionPlan,
      subscriptionStatus,
      datePaid,
      credits: adjustedCredits !== undefined ? { increment: adjustedCredits } : undefined,
    },
  });
};