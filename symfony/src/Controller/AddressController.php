<?php

namespace App\Controller;

use App\Entity\Address;
use App\Form\AddressType;
use App\Repository\AddressRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;


class AddressController extends AbstractController
{

    #[Route('api/address', name: 'create-address', methods: ['POST'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, TokenStorageInterface $tokenStorageInterface): JsonResponse
    {
        $currentUser = $tokenStorageInterface->getToken()->getUser();
        $address = $serializer->deserialize($request->getContent(), Address::class, 'json');
        $address->setUser($currentUser);
        $em->persist($address);
        $em->flush();
        $jsonAdress = $serializer->serialize($address, 'json', ['ignored_attributes' => ['user']]);
        $location = $urlGenerator->generate('read-address', referenceType: UrlGeneratorInterface::ABSOLUTE_URL);

        return new JsonResponse($jsonAdress, Response::HTTP_CREATED, ['location' => $location], true);
    }

    #[Route('api/address', name: 'read-address', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function read(TokenStorageInterface $tokenStorageInterface, SerializerInterface $serializer): Response
    {
        $address = $tokenStorageInterface->getToken()->getUser()->getAddress();
        $jsonAdress = $serializer->serialize($address, 'json', ['groups' => ['address_user', 'id']]);
        
        return new JsonResponse($jsonAdress, Response::HTTP_CREATED, ['location' => null], true);
    }

    #[Route('api/address', name: 'update-address', methods: ['PUT'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function update(Request $request, TokenStorageInterface $tokenStorageInterface, SerializerInterface $serializer, EntityManagerInterface $em): Response
    {
        $currentAddress = $tokenStorageInterface->getToken()->getUser()->getAddress();
        $updatedAdress = $serializer->deserialize(
            $request->getContent(),
            Address::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $currentAddress]
        );
        $em->persist($updatedAdress);
        $em->flush();

        return new JsonResponse(NULL, Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/address', name: 'delete-address', methods: ['DELETE'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function delete(EntityManagerInterface $em, TokenStorageInterface $tokenStorageInterface): Response
    {
        $user = $tokenStorageInterface->getToken()->getUser();
        $address = $user->getAddress();
        $user->setAddress(null);
        $em->persist($user);
        $em->remove($address);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
