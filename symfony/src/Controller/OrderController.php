<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\User;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class OrderController extends AbstractController
{
    public function __construct(TokenStorageInterface $tokenStorageInterface)
    {
        $this->getProductsInfo = function ($object, $outerObject, $name) {
            $ouput = [];
            foreach ($object as $value) {
                $output[] = [
                    "name" => $value->getName(),
                    "weight" => $value->getWeight(),
                    "price" => $value->getPrice(),
                    "id" => $value->getId()
                ];
            }
            return $output;
        };
        $this->getOrdersInfo = function ($object, $outerObject, $name) {
            foreach ($object as $value) {
                return [
                    "id" => $value->getId(),
                ];
            }
        };
        $this->tokenStorageInterface = $tokenStorageInterface;
    }

    #[Route('api/user/order/{id}', name: 'user-read-order', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function read(Order $order, SerializerInterface $serializer): JsonResponse
    {
        $user = $this->tokenStorageInterface->getToken()->getUser();
        $orders = $user->getorders();
        foreach ($orders as $orderUser) {
            if ($order == $orderUser) {
                $defaultContext = [
                    AbstractNormalizer::CALLBACKS => [
                        'products' => $this->getProductsInfo,
                        'orders' => $this->getOrdersInfo,
                    ],
                    AbstractNormalizer::IGNORED_ATTRIBUTES => ['user']
                ];
                $jsonProduct = $serializer->serialize($orders, 'json', $defaultContext);

                return new JsonResponse($jsonProduct, Response::HTTP_OK, json: true);
            }
        }
        return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
    }

    #[Route('api/user/order', name: 'user-add-order', methods: ['POST'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function create(Request $request, ProductRepository $productRepository, EntityManagerInterface $em)
    {
        $datas = $request->toArray();
        $user = $this->tokenStorageInterface->getToken()->getUser();
        $order = new Order();
        $order->setUser($user);
        foreach ($datas["products"] as $value) {
            $product = $productRepository->find($value);
            $order->addProduct($product);
        }
        $order->setState("En cours de préparation");
        $em->persist($order);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/user/order/{id}', name: 'user-remove-order', methods: ['DELETE'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function remove(Order $order, EntityManagerInterface $em)
    {
        $user = $this->tokenStorageInterface->getToken()->getUser();
        $orderUser = $order->getUser();
        if ($user == $orderUser) {
            $em->remove($order);
            $em->flush();
        }

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/order/list', name: 'user-list-order', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function list(SerializerInterface $serializer): JsonResponse
    {
        $user = $this->tokenStorageInterface->getToken()->getUser();
        $orders = $user->getorders();

        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'products' => $this->getProductsInfo,
                'orders' => $this->getOrdersInfo,
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user']
        ];
        $jsonProduct = $serializer->serialize($orders, 'json', $defaultContext);

        return new JsonResponse($jsonProduct, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/order/list', name: 'admin-list-order', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function listAll(OrderRepository $orderRepository, SerializerInterface $serializer): JsonResponse
    {
        $orders = $orderRepository->findAll();
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'products' => $this->getProductsInfo,
                'orders' => $this->getOrdersInfo,
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user']
        ];
        $jsonProduct = $serializer->serialize($orders, 'json', $defaultContext);

        return new JsonResponse($jsonProduct, Response::HTTP_OK, json: true);
    }




























    #[Route('api/admin/order/{id}', name: 'admin-remove-order', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function removeAdmin(Order $order, EntityManagerInterface $em)
    {
        if ($order) {
            $em->remove($order);
            $em->flush();
        }

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/admin/order/{id}', name: 'admin-read-order', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function readAdmin(Order $order, SerializerInterface $serializer): JsonResponse
    {
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'products' => $this->getProductsInfo,
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user']
        ];
        $jsonOrder = $serializer->serialize($order, 'json', $defaultContext);

        return new JsonResponse($jsonOrder, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/order/user/{id}', name: 'admin-read-user_order', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function readUserOrders(User $user, SerializerInterface $serializer): JsonResponse
    {
        $orders = $user->getorders();
        if ($orders) {

            $defaultContext = [
                AbstractNormalizer::CALLBACKS => [
                    'products' => $this->getProductsInfo,
                    'orders' => $this->getOrdersInfo,
                ],
                AbstractNormalizer::IGNORED_ATTRIBUTES => ['user']
            ];
            $jsonOrders = $serializer->serialize($orders, 'json', $defaultContext);

            return new JsonResponse($jsonOrders, Response::HTTP_OK, json: true);
        }

        return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
    }
}
