<?php

namespace App\Controller;

use App\Entity\Card;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class CardController extends AbstractController
{

    public function __construct(TokenStorageInterface $tokenStorageInterface)
    {
        $this->tokenStorageInterface = $tokenStorageInterface;

        $this->getUserInfos = function($object) {
            return [
                "email" => $object->getEmail(),
                "id" => $object->getId()
            ];
        };
    }

    #[Route('/api/card', name: 'user-add-card', methods: ['POST'])]
    #[IsGranted("ROLE_USER", message: "Vous n'êtes pas autorisé à accéder à cette page")]
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UserRepository $userRepository): JsonResponse
    {
        $datas = $request->toArray();
        $card = $serializer->deserialize($request->getContent(), Card::class, 'json');
        if (empty($datas['user'])) {
            $user = $this->tokenStorageInterface->getToken()->getUser();
            $card->setUser($user);
        } else {
            $user = $userRepository->find($datas['user']);
            $card->setUser($user);
        }
        $em->persist($card);
        $em->flush($card);

        $context = [
            AbstractNormalizer::CALLBACKS => [
                "user" => $this->getUserInfos
            ]
        ];
        $jsonCard = $serializer->serialize($card, 'json', $context);

        return new JsonResponse($jsonCard, Response::HTTP_CREATED, json: true);
    }

    #[Route('/api/card', name: 'user-get-card', methods: ['GET'])]
    #[IsGranted("ROLE_USER", message: "Vous n'êtes pas autorisé à accéder à cette page")]
    public function read(SerializerInterface $serializer): JsonResponse
    {
        $cards = $this->tokenStorageInterface->getToken()->getUser()->getCards();
        $context = [
            AbstractNormalizer::CALLBACKS => [
                "user" => $this->getUserInfos
            ]
        ];
        $jsonCards = $serializer->serialize($cards, 'json', $context);

        return new JsonResponse($jsonCards, Response::HTTP_CREATED, json: true);
    }

    #[Route('/api/card/{id}', name: 'user-update-card', methods: ['PUT'])]
    #[IsGranted("ROLE_USER", message: "Vous n'êtes pas autorisé à accéder à cette page")]
    public function update(Card $previousCard, SerializerInterface $serializer, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->tokenStorageInterface->getToken()->getUser();
        if ($previousCard->getUser() == $user || in_array("ROLE_ADMIN", $user->getRoles())) {
            $newCard = $serializer->deserialize($request->getContent(), Card::class, 'json', [
                AbstractNormalizer::OBJECT_TO_POPULATE => $previousCard
            ]);
            $em->persist($newCard);
            $em->flush();
    
            return new JsonResponse(null, Response::HTTP_OK);
        }
        return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
    }

    #[Route('/api/card/{id}', name: 'user-delete-card', methods: ['DELETE'])]
    #[IsGranted("ROLE_USER", message: "Vous n'êtes pas autorisé à accéder à cette page")]
    public function delete(Card $card, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->tokenStorageInterface->getToken()->getUser();
        if ($card->getUser() == $user || in_array("ROLE_ADMIN", $user->getRoles())) {
            $em->remove($card);
            $em->flush();

            return new JsonResponse(null, Response::HTTP_OK);

        }
        return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
    }
}
