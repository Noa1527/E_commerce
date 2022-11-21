<?php

namespace App\Services;

use App\Entity\Order;
use App\Entity\Product;

class StripeService
{
    private $provateKey;

    public function __construct()
    {
        $this->provateKey = $_ENV['STRIPE_PRIVATE_KEY_TEST'];
        dd($this->provateKey);
    }

    /**
     * @param Product $product
     * @return \Stripe\PaymentIntent
     * @trhows \Stripe\Exception\ApiErrorException
     */
    public function paymentIntent(Product $product)
    {
        \Stripe\Stripe::setApiKey($this->provateKey);

        return \Stripe\PaymentIntent::create([
            'amount' => $product->getPrice() * 100,
            'currency' => Order::DEVISE,
            'payment_method_types' => ['card'],
            // 'confirm' => true,
            // 'off_session' => true,
            // 'confirmation_method' => 'manual',
            // 'confirm' => true,
            // 'off_session' => true,
            // 'confirmation_method' => 'manual',
        ]);
    }

    public function payment(
        $amount,
        $currency,
        $description,
        array $stripeParameter
    ) {
        \Stripe\Stripe::setApiKey($this->provateKey);

        $payment_intent = null;

        if (isset($stripeParameter['payment_intent_id'])) {
            $payment_intent = \Stripe\PaymentIntent::retrieve($stripeParameter['payment_intent_id']);
        }

        if ($stripeParameter['payment_method_id'] === 'succeeded') {

            //TO DO
        } else {
            $payment_intent->cancel();
        }

        return $payment_intent;
    }

    /**
     * @param $stripeParameter
     * @return Product $product
     * @throws \Stripe\PaymentIntent|null
     */
    public function stripe(array $stripeParameter, Product $product)
    {
        return $this->payment(
            $product->getPrice() * 100,
            Order::DEVISE,
            $product->getName(),
            $stripeParameter
        );
    }
}
