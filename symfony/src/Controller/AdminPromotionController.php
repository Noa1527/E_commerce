<?php

namespace App\Controller;

use App\Entity\Promotion;
use App\Repository\PromotionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[IsGranted('ROLE_ADMIN', message: "Vous n'êtes pas autorisé à accéder à cette page")]
class AdminPromotionController extends AbstractController
{
    public function __construct()
    {
        $this->getRelationName = function($object, $outerObject, $name) {
            if ($name == 'category') {
                return [$object->getId() => $object->getName()];
            } elseif ($name == 'features') {
                $values = $object->getValues();
                $output = [];
                foreach ($values as  $value) {
                    $output[$value->getId()] = $value->getName();
                }
                return $output;
            } else{
                return null;
            }
        };

    }
    
    #[Route('api/admin/promotion/list', name: 'admin-list-promotion', methods: ['GET'])]
    public function list(PromotionRepository $promotionRepository, SerializerInterface $serializer): JsonResponse
    {
        $promotions = $promotionRepository->findAll();
        $jsonPromotion = $serializer->serialize($promotions, 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ['products']]);
        
        return new JsonResponse($jsonPromotion, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/promotion/{id}', name: 'admin-update-promotion', methods: ['PUT'])]
    public function update(Promotion $currentPromotion, Request $request, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        $updatedPromotion = $serializer->deserialize($request->getContent(),
            Promotion::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $currentPromotion]
    );
        $em->persist($updatedPromotion);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/admin/promotion/{id}', name: 'admin-read-promotion', methods: ['GET'])]
    public function read(Promotion $promotion, SerializerInterface $serializer): JsonResponse
    {
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'features' => $this->getRelationName,
                'category' => $this->getRelationName,
                'product' => $this->getRelationName
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['promotions']
        ];
        $jsonProduct = $serializer->serialize($promotion, 'json', $defaultContext);

        return new JsonResponse($jsonProduct, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/promotion/{id}', name: 'admin-delete-promotion', methods: ['DELETE'])]
    public function delete(Promotion $promotion, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        if ($promotion) {
            $em->remove($promotion);
            $em->flush();

            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        } else {
            return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('api/admin/promotion', name: 'admin-create-promotion', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        $promotion = $serializer->deserialize($request->getContent(), Promotion::class, 'json');
        $em->persist($promotion);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
