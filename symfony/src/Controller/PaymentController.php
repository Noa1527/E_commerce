<?php

namespace App\Controller;

use App\Entity\Product;
use App\Manager\ProductManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;


class PaymentController extends AbstractController
{
    

    #[Route('api/payment/{id}', name: 'app_payment', methods: ['GET', 'POST'])]
    public function payment(
        Product $product, 
        ProductManager $productManager, 
        SerializerInterface $serializer
    ): JsonResponse
    {

        $user = $this->tokenStorageInterface->getToken()->getUser();
        $products = $user->getorders();
        foreach ($products as $productUser) {
            if ($product == $productUser) {
                $defaultContext = [
                    AbstractNormalizer::CALLBACKS => [
                        'user' => $this->getUser(),
                        'intentSecret' => $productManager->intentSecret($product),
                        'product' => $product,
                    ],
                    AbstractNormalizer::IGNORED_ATTRIBUTES => ['user']
                ];
                $jsonProduct = $serializer->serialize($products, 'json', $defaultContext);
            }
        }
        return new JsonResponse($jsonProduct, Response::HTTP_OK, json: true);
    }

    // @Route("/user/subscription/{id}/paiement/load", name="subscription_paiement", methods={"GET", "POST"})
    // * @param Product $product
    // * @param Request $request
    // * @return \Symfony\Component\HttpFoundation\RedirectResponse|Response
    // * @throws \Exception

    #[Route('api/subscription/{id}/payment/load', name: 'subscription_paiement', methods: ['GET', 'POST'])]
    public function subscription(
        Product $product,
        Request $request,
        ProductManager $productManager
    ) : JsonResponse {
        $user = $this->getUser();

        if ($request->getMethod() === "POST") {
            $resource = $productManager->stripe($_POST, $product);

            if (null !== $resource) {
                $productManager->create_subscription($resource, $product, $user);

                return $this->render('user/reponse.html.twig', [
                    'product' => $product
                ]);
            }
        }

        return $this->redirectToRoute('payment', ['id' => $product->getId()]);
    }
}
