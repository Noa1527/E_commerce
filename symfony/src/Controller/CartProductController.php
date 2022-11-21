<?php

namespace App\Controller;

use App\Entity\CartProduct;
use App\Entity\User;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
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

class CartProductController extends AbstractController
{
    public function __construct(TokenStorageInterface $tokenStorageInterface)
    {
        $this->getProductsInfo = function($object, $outerObject, $name) {
            return [
                "name" => $object->getName(), 
                "weight" => $object->getWeight(), 
                "price" => $object->getPrice(), 
                "id" => $object->getId()
            ];
        };
        $this->tokenStorageInterface = $tokenStorageInterface;

    }

    #[Route('api/user/cart', name: 'user-read-cart', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function read(SerializerInterface $serializer): JsonResponse
    {
        $user = $this->tokenStorageInterface->getToken()->getUser();
        $cart = $user->getCartProducts();
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'product' => $this->getProductsInfo
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user']
        ];
        $jsonProduct = $serializer->serialize($cart, 'json', $defaultContext);

        return new JsonResponse($jsonProduct, Response::HTTP_OK, json: true);
    }

    #[Route('api/user/cart', name: 'user-add-product-cart', methods: ['POST'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function addProductToCart(Request $request, ProductRepository $productRepository, EntityManagerInterface $em) 
    {   

        $datas = $request->toArray();
        $product = $productRepository->find($datas["id_product"]);
        $cartProduct = new CartProduct();
        $cartProduct->setUser($this->tokenStorageInterface->getToken()->getUser());
        $cartProduct->setProduct($product);
        $cartProduct->setAmount($datas["amount"]);
        $em->persist($cartProduct);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/user/cart/{id}', name: 'user-remove-product-cart', methods: ['DELETE'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function removeProductToCart(CartProduct $cartProduct, EntityManagerInterface $em) 
    {   
        if ($cartProduct) {
            $em->remove($cartProduct);
            $em->flush();
        }
        
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/user/cart', name: 'user-remove-cart', methods: ['DELETE'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function removeCart(EntityManagerInterface $em) 
    {   
        $cart = $this->tokenStorageInterface->getToken()->getUser()->getCartProducts();
        if ($cart) {
            foreach ($cart as $key => $value) {
                $em->remove($value);
            }
            $em->flush();
        }
        
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/user/cart/{id}', name: 'user-update-product-cart', methods: ['PATCH'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function updateCartProductAmount(CartProduct $cartProduct, EntityManagerInterface $em, Request $request) 
    {   
        $cartProduct->setAmount($request->toArray()["amount"]);
        $em->persist($cartProduct);
        $em->flush();
        
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/admin/cart/{id}', name: 'admin-read-cart', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function readAdmin(User $user, SerializerInterface $serializer): JsonResponse
    {
        $cartProducts = $user->getCartProducts();
        $arrayUser = [];
        if ($cartProducts) {
            $arrayUser["id"] = $user->getId();
            $arrayUser["id_user"] = $user->getId();
            $arrayUser["email_user"] = $user->getEmail();
            $arrayUser["amount"] = count($cartProducts);
            $arrayUser["cart"] = $cartProducts;
            $id_products = [];
            foreach ($cartProducts as $value) {
                $id_products[] = $value->getProduct()->getId();
            }
            $arrayUser["id_products"] = $id_products;
        }

        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'product' => $this->getProductsInfo
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user']
        ];
        $jsonProduct = $serializer->serialize($arrayUser, 'json', $defaultContext);

        return new JsonResponse($jsonProduct, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/cart/{id}', name: 'admin-delete-cart', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function removeAdmin(User $user, EntityManagerInterface $em): JsonResponse
    {
        $cart = $user->getCartProducts();
        if ($cart) {
            foreach ($cart as $value) {
                $em->remove($value);
            }
            $em->flush();
        }
        
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/admin/carts', name: 'admin-list-users-cart', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function listUsersCart(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $users = $userRepository->findAll();
        $carts = [];
        foreach ($users as $user) {
            $cartProducts = $user->getCartProducts()->getValues();
            if ($cartProducts) {
                $arrayUser = [];
                $arrayUser["id_user"] = $user->getId();
                $arrayUser["id"] = $user->getId();
                $arrayUser["email_user"] = $user->getEmail();
                $arrayUser["amount"] = count($cartProducts);
                $arrayUser["cart"] = $cartProducts;
                $carts[] = $arrayUser;
            }
        }

        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'product' => $this->getProductsInfo
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user']
        ];
        $jsonCarts = $serializer->serialize($carts, 'json', $defaultContext);

        return new JsonResponse($jsonCarts, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/cartProduct/{id}', name: 'user-read-cart', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function readOneCartProduct(CartProduct $cartProduct, SerializerInterface $serializer): JsonResponse
    {
        
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'product' => $this->getProductsInfo
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user']
        ];
        $jsonCartProduct = $serializer->serialize($cartProduct, 'json', $defaultContext);

        return new JsonResponse($jsonCartProduct, Response::HTTP_OK, json: true);
    }

}
