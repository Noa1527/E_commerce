<?php

namespace App\Controller;

use App\Entity\Feature;
use App\Repository\FeatureRepository;
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
class AdminFeatureController extends AbstractController
{
    public function __construct()
    {
        $this->getProductsName = function ($object, $outerObject, $name) {
            $values = $object->getValues();
            $output = [];
            foreach ($values as  $value) {
                $output[$value->getId()] = $value->getName();
            }
            return $output;
        };
    }

    #[Route('api/admin/feature/list', name: 'admin-list-feature', methods: ['GET'])]
    public function list(FeatureRepository $featureRepository, SerializerInterface $serializer): JsonResponse
    {
        $features = $featureRepository->findAll();
        $jsonFeature = $serializer->serialize($features, 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ['products']]);

        return new JsonResponse($jsonFeature, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/feature/{id}', name: 'admin-update-feature', methods: ['PUT'])]
    public function update(Feature $currentFeature, Request $request, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        $updatedFeature = $serializer->deserialize(
            $request->getContent(),
            Feature::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $currentFeature]
        );
        $em->persist($updatedFeature);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/admin/feature/{id}', name: 'admin-read-feature', methods: ['GET'])]
    public function read(Feature $feature, SerializerInterface $serializer): JsonResponse
    {
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'products' => $this->getProductsName
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => []
        ];
        $jsonProduct = $serializer->serialize($feature, 'json', $defaultContext);

        return new JsonResponse($jsonProduct, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/feature/{id}', name: 'admin-delete-feature', methods: ['DELETE'])]
    public function delete(Feature $feature, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        if ($feature) {
            $em->remove($feature);
            $em->flush();

            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        } else {
            return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('api/admin/feature', name: 'admin-create-feature', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        $feature = $serializer->deserialize($request->getContent(), Feature::class, 'json');
        $em->persist($feature);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
