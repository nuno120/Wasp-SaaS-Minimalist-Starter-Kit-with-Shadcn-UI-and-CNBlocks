import { useAuth } from 'wasp/client/auth';
import { generateCheckoutSession, getCustomerPortalUrl, useQuery } from 'wasp/client/operations';
import { PaymentPlanId, paymentPlans, prettyPaymentPlanName } from './plans';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../client/cn';

const bestDealPaymentPlanId: PaymentPlanId = PaymentPlanId.Credits10; // Highlight Credits10 as the main option

interface PaymentPlanCard {
  name: string;
  price: string;
  description: string[]; // Changed to array to support more lines.
  features: string[];
}

export const paymentPlanCards: Record<PaymentPlanId, PaymentPlanCard> = {
  [PaymentPlanId.Hobby]: { // This is kept in case it is used later on
    name: prettyPaymentPlanName(PaymentPlanId.Hobby),
    price: '$15.00',
    description: ['All you need to get started'],
    features: ['Limited monthly usage', 'Basic support'],
  },
  [PaymentPlanId.Pro]: { // This is kept in case it is used later on
    name: prettyPaymentPlanName(PaymentPlanId.Pro),
    price: '$19.99',
    description: ['Our most popular plan'],
    features: ['Unlimited monthly usage', 'Priority customer support'],
  },
  [PaymentPlanId.Credits10]: {
    name: prettyPaymentPlanName(PaymentPlanId.Credits10),
    price: '€15.00',
    description: ['Purchase credits to use our services.', 'Your credits never expire!'],
    features: ['Use credits for e.g. OpenAI API calls', 'No expiration date'],
  },
};

const PricingPage = () => {
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const { data: user } = useAuth();
  const navigate = useNavigate();

  async function handleBuyNowClick(paymentPlanId: PaymentPlanId) {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      setIsPaymentLoading(true);

      const checkoutResults = await generateCheckoutSession(paymentPlanId);

      if (checkoutResults?.sessionUrl) {
        window.open(checkoutResults.sessionUrl, '_self');
      } else {
        throw new Error('Error generating checkout session URL');
      }
    } catch (error) {
      console.error(error);
      setIsPaymentLoading(false);
    }
  }

  return (
    <div className='py-10 lg:mt-10'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div id='pricing' className='mx-auto max-w-4xl text-center'>
          <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
            Pricing
          </h2>
          <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-white'>
            We operate on a pay-as-you-go credit system.  Purchase credits upfront, and then use them for our services as needed.
          </p>

          {/* Payment Plans - Credits10 First */}
          <div className='isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 lg:gap-x-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-1'>
            {[PaymentPlanId.Credits10].map((planId) => (
              <div
                key={planId}
                className={cn(
                  'relative flex flex-col grow justify-between rounded-3xl ring-gray-900/10 dark:ring-gray-100/10 overflow-hidden p-8 xl:p-10',
                  {
                    'ring-2': planId === bestDealPaymentPlanId, // Highlight Credits10
                    'ring-1 lg:mt-8': planId !== bestDealPaymentPlanId,
                  }
                )}
              >
                {planId === bestDealPaymentPlanId && (
                  <div
                    className='absolute top-0 right-0 -z-10 w-full h-full transform-gpu blur-3xl'
                    aria-hidden='true'
                  >
                    <div
                      className='absolute w-full h-full bg-gradient-to-br from-amber-400 to-purple-300 opacity-30 dark:opacity-50'
                      style={{
                        clipPath: 'circle(670% at 50% 50%)',
                      }}
                    />
                  </div>
                )}
                <div className='mb-8'>
                  <div className='flex items-center justify-between gap-x-4'>
                    <h3 id={planId} className='text-gray-900 text-lg font-semibold leading-8 dark:text-white'>
                      {paymentPlanCards[planId].name}
                    </h3>
                  </div>
                  <div className='mt-4 space-y-2'>
                    {paymentPlanCards[planId].description.map((line, index) => (
                      <p key={index} className='text-sm leading-6 text-gray-600 dark:text-white'>{line}</p>
                    ))}
                  </div>
                  <p className='mt-6 flex items-baseline gap-x-1 dark:text-white'>
                    <span className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
                      {paymentPlanCards[planId].price}
                    </span>
                  </p>
                  <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-white'>
                    {paymentPlanCards[planId].features.map((feature) => (
                      <li key={feature} className='flex gap-x-3'>
                        <AiFillCheckCircle className='h-6 w-5 flex-none text-yellow-500' aria-hidden='true' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleBuyNowClick(planId)}
                  aria-describedby={planId}
                  className={cn(
                    {
                      'bg-yellow-500 text-white hover:text-white shadow-sm hover:bg-yellow-400':
                        planId === bestDealPaymentPlanId,
                      'text-gray-600  ring-1 ring-inset ring-purple-200 hover:ring-purple-400':
                        planId !== bestDealPaymentPlanId,
                    },
                    {
                      'opacity-50 cursor-wait': isPaymentLoading,
                    },
                    'mt-8 block rounded-md py-2 px-3 text-center text-sm dark:text-white font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400'
                  )}
                  disabled={isPaymentLoading}
                >
                  {!!user ? 'Buy Credits' : 'Log in to buy Credits'}
                </button>
                <p className='mt-2 text-center text-sm text-gray-500 dark:text-gray-400'>
                  A €0.50 transaction fee applies.
                </p>
              </div>
            ))}
          </div>

           {/* Pricing Explanation */}
          <div className='mt-12 mx-auto max-w-2xl text-left space-y-4 dark:text-white'>
            <h3 className='text-2xl font-semibold'>Cost Breakdown:</h3>
            <p>
              <strong>Kokoro (TTS):</strong> €1.50 per million characters.
            </p>
            <p>
              <strong>SSR:</strong> €0.03 per hour (€0.0005 per minute).
            </p>
            <p>
              <strong>LLM (Llama 8B):</strong> €0.02 per million input tokens and €0.05 per million output tokens.
            </p>

            {/* Pricing Estimations */}
            <h3 className='text-2xl font-semibold mt-8'>Estimated Hourly Costs:</h3>
            <p>
              <strong>Kokoro:</strong> Assuming an average generation of 100,000 characters per hour, the estimated cost is €0.15/hour.
            </p>
            <p>
              <strong>SSR:</strong> Cost is fixed at €0.03 per hour.
            </p>
            <p>
              <strong>LLM:</strong> Assuming an average of 500,000 input and 500,000 output tokens per hour, the estimated cost is €0.035/hour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;