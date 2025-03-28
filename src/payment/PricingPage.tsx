import { useAuth } from 'wasp/client/auth';
import { generateCheckoutSession, getCustomerPortalUrl, useQuery } from 'wasp/client/operations';
import { PaymentPlanId, paymentPlans, prettyPaymentPlanName } from './plans'; // Adjust path as needed
import { AiFillCheckCircle } from 'react-icons/ai'; // If you want to use the icons
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../client/cn'; // Adjust path as needed
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Check } from 'lucide-react';

//Payment Plan Cards
interface PaymentPlanCard {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export const paymentPlanCards: Record<PaymentPlanId, PaymentPlanCard> = {
  [PaymentPlanId.Hobby]: {
    name: prettyPaymentPlanName(PaymentPlanId.Hobby),
    price: '$9.99',
    description: 'All you need to get started',
    features: ['Limited monthly usage', 'Basic support'],
  },
  [PaymentPlanId.Pro]: {
    name: prettyPaymentPlanName(PaymentPlanId.Pro),
    price: '$19.99',
    description: 'Our most popular plan',
    features: ['Unlimited monthly usage', 'Priority customer support'],
  },
  [PaymentPlanId.Credits10]: {
    name: prettyPaymentPlanName(PaymentPlanId.Credits10),
    price: '$9.99',
    description: 'One-time purchase of 10 credits for your account',
    features: ['Use credits for e.g. OpenAI API calls', 'No expiration date'],
  },
};

const PricingPage = () => {
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const { data: user } = useAuth();
  const isUserSubscribed = !!user && !!user.subscriptionStatus && user.subscriptionStatus !== 'deleted';
  const {
    data: customerPortalUrl,
    isLoading: isCustomerPortalUrlLoading,
    error: customerPortalUrlError,
  } = useQuery(getCustomerPortalUrl, { enabled: isUserSubscribed });
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
      setIsPaymentLoading(false); // We only set this to false here and not in the try block because we redirect to the checkout url within the same window
    }
  }

  const handleCustomerPortalClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (customerPortalUrlError) {
      console.error('Error fetching customer portal url');
    }

    if (!customerPortalUrl) {
      throw new Error(`Customer Portal does not exist for user ${user.id}`);
    }

    window.open(customerPortalUrl, '_blank');
  };

  return (
    <section className="py-8 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">Pricing that Scales with You</h1>
          <p>Gemini is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.</p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">

          {/* Hobby Plan (Example) */}
          <Card className="bg-gray-100 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="font-medium">{paymentPlanCards[PaymentPlanId.Hobby].name}</CardTitle>
              <span className="my-3 block text-2xl font-semibold">{paymentPlanCards[PaymentPlanId.Hobby].price} / mo</span>
              <CardDescription className="text-sm">{paymentPlanCards[PaymentPlanId.Hobby].description}</CardDescription>
              {isUserSubscribed ? (
                <Button disabled={isCustomerPortalUrlLoading} onClick={handleCustomerPortalClick} className="mt-4 w-full">
                  Manage Subscription
                </Button>
              ) : (
                <Button disabled={isPaymentLoading} onClick={() => handleBuyNowClick(PaymentPlanId.Hobby)} className="mt-4 w-full">
                  {!!user ? 'Buy Plan' : 'Log in to Buy'}
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <hr className="border-dashed" />
              <ul className="list-outside space-y-3 text-sm">
                {paymentPlanCards[PaymentPlanId.Hobby].features.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
           {/* Pro Plan (Example) */}
           <Card className="relative bg-gray-100 dark:bg-gray-800">
            <span className="bg-gradient-to-br from-purple-400 to-amber-300 absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">Popular</span>
            <CardHeader>
              <CardTitle className="font-medium">{paymentPlanCards[PaymentPlanId.Pro].name}</CardTitle>
              <span className="my-3 block text-2xl font-semibold">{paymentPlanCards[PaymentPlanId.Pro].price} / mo</span>
              <CardDescription className="text-sm">{paymentPlanCards[PaymentPlanId.Pro].description}</CardDescription>
              {isUserSubscribed ? (
                <Button disabled={isCustomerPortalUrlLoading} onClick={handleCustomerPortalClick} className="mt-4 w-full">
                  Manage Subscription
                </Button>
              ) : (
                <Button disabled={isPaymentLoading} onClick={() => handleBuyNowClick(PaymentPlanId.Pro)} className="mt-4 w-full">
                  {!!user ? 'Buy Plan' : 'Log in to Buy'}
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <hr className="border-dashed" />
              <ul className="list-outside space-y-3 text-sm">
                {paymentPlanCards[PaymentPlanId.Pro].features.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {/* Credit10 Plan (Example) */}
          <Card className="bg-gray-100 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="font-medium">{paymentPlanCards[PaymentPlanId.Credits10].name}</CardTitle>
              <span className="my-3 block text-2xl font-semibold">{paymentPlanCards[PaymentPlanId.Credits10].price} / mo</span>
              <CardDescription className="text-sm">{paymentPlanCards[PaymentPlanId.Credits10].description}</CardDescription>
              {isUserSubscribed ? (
                <Button disabled={isCustomerPortalUrlLoading} onClick={handleCustomerPortalClick} className="mt-4 w-full">
                  Manage Subscription
                </Button>
              ) : (
                <Button disabled={isPaymentLoading} onClick={() => handleBuyNowClick(PaymentPlanId.Credits10)} className="mt-4 w-full">
                  {!!user ? 'Buy Plan' : 'Log in to Buy'}
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <hr className="border-dashed" />
              <ul className="list-outside space-y-3 text-sm">
                {paymentPlanCards[PaymentPlanId.Credits10].features.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;