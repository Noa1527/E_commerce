<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Product;
use App\Repository\CommentRepository;
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

class CommentController extends AbstractController
{
    public function __construct(TokenStorageInterface $tokenStorageInterface)
    {
        $this->getProductInfo = function ($object, $outerObject, $name) {
                return [
                    "name" => $object->getName(),
                    "id" => $object->getId()
                ];
            
        };
        $this->getUserInfo = function ($object, $outerObject, $name) {
                return [
                    "id" => $object->getId(),
                    "email" => $object->getEmail()
                ];
        };
        $this->tokenStorageInterface = $tokenStorageInterface;
    }


    #[Route('api/comment/{id}', name: 'remove-comment', methods: ['DELETE'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function remove(Comment $comment, EntityManagerInterface $em)
    {
        $user = $this->tokenStorageInterface->getToken()->getUser();
        $commentUser = $comment->getUser();
        if ($user == $commentUser || in_array("ROLE_ADMIN", $user->getRoles())) {
            $em->remove($comment);
            $em->flush();
            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        }
        return new JsonResponse(null, Response::HTTP_BAD_REQUEST);

    }

    #[Route('api/comments', name: 'list-comment', methods: ['GET'])]
    public function list(SerializerInterface $serializer, CommentRepository $commentRepository)
    {
        $comments = $commentRepository->findAll();
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'product' => $this->getProductInfo,
                'user' => $this->getUserInfo,
            ]
        ];
        $jsonComments = $serializer->serialize($comments, 'json', $defaultContext);

        return new JsonResponse($jsonComments, Response::HTTP_OK, json: true);
    }

    #[Route('/api/comment', name: 'read-many-comment', methods: ['GET'])]
    public function readMany(Request $request, SerializerInterface $serializer, CommentRepository $productRepository): JsonResponse
    {
        $ids = json_decode($request->query->get('filter'), true)["id"];
        
        $comments = [];
        foreach ($ids as $id) {
            $comments[] = $productRepository->find($id);
        }
        $defaultContext = [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user', 'product']
        ];
        $jsonComments = $serializer->serialize($comments, 'json', $defaultContext);

        return new JsonResponse($jsonComments, Response::HTTP_CREATED, json: true);
    }

    #[Route('api/comment/{id}', name: 'read-comment', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function read(Comment $comment, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'product' => $this->getProductInfo,
                'user' => $this->getUserInfo,
            ]
        ];
        $jsonComment = $serializer->serialize($comment, 'json', $defaultContext);

        return new JsonResponse($jsonComment, Response::HTTP_OK, json: true);
    }

    #[Route('api/comment/{id}', name: 'user-update-comment', methods: ['PUT'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function update(Comment $comment, Request $request, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $user = $this->tokenStorageInterface->getToken()->getUser();
        $commentUser = $comment->getUser();
        if ($user == $commentUser) {
            $comment = $serializer->deserialize($request->getContent(), Comment::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $comment]);
            $em->persist($comment);
            $em->flush();
            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        }
        return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
    }

    #[Route('api/product/{id}/comment', name: 'add-comment', methods: ['POST'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function create(Product $product, Request $request, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $user = $this->tokenStorageInterface->getToken()->getUser();
        $comment = new Comment();
        $comment->setUser($user);
        $comment->setProduct($product);
        $comment = $serializer->deserialize($request->getContent(), Comment::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $comment]);
        $em->persist($comment);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/product/{id}/comment', name: 'read-product-comment', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function read_product(Product $product, Request $request, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'product' => $this->getProductInfo,
                'user' => $this->getUserInfo,
            ]
        ];
        $comments = $product->getComments();
        $jsonComments = $serializer->serialize($comments, 'json', $defaultContext);

        return new JsonResponse($jsonComments, Response::HTTP_OK, json: true);
    }
}
