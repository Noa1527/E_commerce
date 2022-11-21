<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class CategoryController extends AbstractController
{

    public function __construct()
    {
        $this->getProductsInfo = function ($object, $outerObject, $name) {
            $ouput = [];
            foreach ($object as $value) {
                $output[] = [
                    "name" => $value->getName(),
                    "product_id" => $value->getId()
                ];
            }
            return $output;
        };
    }

    // #[Route('/api/card', name: 'user-add-card', methods: ['POST'])]
    // #[IsGranted("ROLE_USER", message: "Vous n'êtes pas autorisé à accéder à cette page")]
    // public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UserRepository $userRepository): JsonResponse
    // {
    //     $datas = $request->toArray();
    //     $card = $serializer->deserialize($request->getContent(), Card::class, 'json');
    //     if (empty($datas['user'])) {
    //         $user = $this->tokenStorageInterface->getToken()->getUser();
    //         $card->setUser($user);
    //     } else {
    //         $user = $userRepository->find($datas['user']);
    //         $card->setUser($user);
    //     }
    //     $em->persist($card);
    //     $em->flush($card);

    //     $context = [
    //         AbstractNormalizer::CALLBACKS => [
    //             "user" => $this->getUserInfos
    //         ]
    //     ];
    //     $jsonCard = $serializer->serialize($card, 'json', $context);

    //     return new JsonResponse($jsonCard, Response::HTTP_CREATED, json: true);
    // }
    #[Route('/api/category', name: 'read-categories', methods: ['GET'])]
    public function readMany(Request $request, SerializerInterface $serializer, CategoryRepository $categoryRepository): JsonResponse
    {
        $ids = json_decode($request->query->get('filter'), true)["id"];
        
        $categories = [];
        foreach ($ids as $id) {
            $categories[] = $categoryRepository->find($id);
        }
        
        $context = [
            AbstractNormalizer::IGNORED_ATTRIBUTES => [
                "products"
            ]
        ];
        $jsonCategories = $serializer->serialize($categories, 'json', $context);

        return new JsonResponse($jsonCategories, Response::HTTP_CREATED, json: true);
    }

    #[Route('/api/categories', name: 'delete-many-categories', methods: ['DELETE'])]
    public function deleteMany(Request $request, SerializerInterface $serializer, CategoryRepository $categoryRepository, EntityManagerInterface $em): JsonResponse
    {
        $ids = json_decode($request->query->get('ids'), true)["id"];
        $categoriesIds = [];
        foreach ($ids as $id) {
            $category = $categoryRepository->find($id);
            if ($category) {
                $em->remove($category);
                $categoriesIds[] = $category->getId();
            }
        }
        $em->flush();

        return new JsonResponse(json_encode($categoriesIds), Response::HTTP_OK, json: true);
    }

    #[Route('/api/category/{id}', name: 'read-category', methods: ['GET'])]
    public function read(Category $category, SerializerInterface $serializer): JsonResponse
    {
        
        $context = [
            AbstractNormalizer::IGNORED_ATTRIBUTES => [
                "products"
            ]
        ];
        $jsonCards = $serializer->serialize($category, 'json', $context);

        return new JsonResponse($jsonCards, Response::HTTP_CREATED, json: true);
    }

    #[Route('/api/category/{id}', name: 'delete-category', methods: ['DELETE'])]
    public function delete(Category $category, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($category);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_OK);
    }

    #[Route('/api/category/{id}', name: 'update-category', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function update(Category $category, EntityManagerInterface $em, SerializerInterface $serializer, REQUEST $request): JsonResponse
    {
        $newCategory = $serializer->deserialize(
            $request->getContent(),
            Category::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $category]
        );
        // dd($category);
        $em->remove($category);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_OK);
    }

    // #[Route('/api/card/{id}', name: 'user-update-card', methods: ['PUT'])]
    // #[IsGranted("ROLE_USER", message: "Vous n'êtes pas autorisé à accéder à cette page")]
    // public function update(Card $previousCard, SerializerInterface $serializer, Request $request, EntityManagerInterface $em): JsonResponse
    // {
    //     $user = $this->tokenStorageInterface->getToken()->getUser();
    //     if ($previousCard->getUser() == $user || in_array("ROLE_ADMIN", $user->getRoles())) {
    //         $newCard = $serializer->deserialize($request->getContent(), Card::class, 'json', [
    //             AbstractNormalizer::OBJECT_TO_POPULATE => $previousCard
    //         ]);
    //         $em->persist($newCard);
    //         $em->flush();
    
    //         return new JsonResponse(null, Response::HTTP_OK);
    //     }
    //     return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
    // }

    // #[Route('/api/card/{id}', name: 'user-delete-card', methods: ['DELETE'])]
    // #[IsGranted("ROLE_USER", message: "Vous n'êtes pas autorisé à accéder à cette page")]
    // public function delete(Card $card, EntityManagerInterface $em): JsonResponse
    // {
    //     $user = $this->tokenStorageInterface->getToken()->getUser();
    //     if ($card->getUser() == $user || in_array("ROLE_ADMIN", $user->getRoles())) {
    //         $em->remove($card);
    //         $em->flush();

    //         return new JsonResponse(null, Response::HTTP_OK);

    //     }
    //     return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
    // }

    #[Route('/api/categories', name: 'user-list-category', methods: ['GET'])]
    public function list(CategoryRepository $categoryRepository, EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $categories = $categoryRepository->findAll();
        $context = [
            AbstractNormalizer::IGNORED_ATTRIBUTES => [
                'products'
            ]
        ];
        $jsonCategories = $serializer->serialize($categories, 'json', $context);

        return new JsonResponse($jsonCategories, Response::HTTP_OK, json: true);
    }
}
