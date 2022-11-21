<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\User;
use App\Form\UserType;
use App\Repository\AddressRepository;
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
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;


#[IsGranted('ROLE_ADMIN', message: "Vous n'êtes pas autorisé à accéder à cette page")]
class UserAdminController extends AbstractController
{
    public function __construct()
    {
        $this->getProductsInfo = function ($object, $outerObject, $name) {
            $output = [];
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
        
        $this->getCommentsInfo = function ($object, $outerObject, $name) {
            $output = [];
            foreach ($object as $value) {
                $output[] = [
                    "id" => $value->getId()
                ];
            }
            return $output;
        };

        $this->getCommentsId = function ($object) {
            $output = [];
            foreach ($object as $value) {
                $output[] = $value->getId();
            }
            return $output;
        };
    }

    #[Route('api/admin/user', name: 'admin-create-user', methods: ['POST'])]
    public function new(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, UserPasswordHasherInterface $passwordHasher): Response
    {
        $content = json_decode($request->getContent());
        $password = $content->password;
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);
        $em->persist($user);
        $em->flush();
        $jsonUser = $serializer->serialize($user, 'json');
        $location = $urlGenerator->generate('read-user', referenceType: UrlGeneratorInterface::ABSOLUTE_URL);

        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ["Location" => $location], true);
    }


    #[Route('api/admin/user/{id}', name: 'admin-update-user', methods: ['PUT'])]
    public function update(User $user, Request $request, int $id, EntityManagerInterface $em,  SerializerInterface $serializer, UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository, ObjectNormalizer $normalizer): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        // dd($content);
        if ($content["comments"]) unset($content["comments"]);
        if (!empty($content["address"])) {

            $newAddress = $content["address"];
            unset($content["address"]);
            $address = $user->getAddress();
            if ($address) {
                $normalizer->denormalize($newAddress, Address::class, context: [AbstractNormalizer::OBJECT_TO_POPULATE => $address]);
            } else {
                $address = $normalizer->denormalize($newAddress, Address::class);
            }
            $user->setAddress($address);
            $em->persist($user);
            $em->flush();
        }
        if (!empty($content["password"])) {
            $hashedPassword = $passwordHasher->hashPassword($user, $content["password"]);
            unset($content["password"]);
            $user->setPassword($hashedPassword);
        }
        $normalizer->denormalize($content, User::class, context: [AbstractNormalizer::OBJECT_TO_POPULATE => $user]);
        $em->persist($user);
        $em->flush();

        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                    'products' => $this->getProductsInfo,
                    'comments' => $this->getCommentsId
            ],
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                // dd($object);
                return $object->getId();
            },
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user', 'cartProducts', 'orders', 'cards']
        ];
        $jsonUser = $serializer->serialize($user, 'json', $defaultContext);

        return new JsonResponse($jsonUser, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/user/{id}', name: 'admin-delete-user', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em, UserRepository $userRepository): JsonResponse
    {
        $user = $userRepository->find($id);
        
        if ($user) {
            $em->remove($user);
            $em->flush();

            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        } else {
            return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('api/admin/user/list', name: 'admin-list-users', methods: ['GET'])]
    public function list(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $users = $userRepository->findAll();
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                        'products' => $this->getProductsInfo,
                        'comments' => $this->getCommentsInfo
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user', 'orders', 'cartProducts', 'category', 'feature']
        ];
        $jsonUsers = $serializer->serialize($users, 'json', $defaultContext);
        
        return new JsonResponse($jsonUsers, Response::HTTP_OK, json: true);
    }

    #[Route('/api/admin/user', name: 'read-many-user', methods: ['GET'])]
    public function readMany(Request $request, SerializerInterface $serializer, UserRepository $productRepository): JsonResponse
    {
        $ids = json_decode($request->query->get('filter'), true)["id"];
        $users = [];
        foreach ($ids as $id) {
            $users[] = $productRepository->find($id);
        }
        
        $defaultContext = [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['orders', 'address', 'password', 'cartProducts', 'username', 'userIdentifier', 'comments']
        ];
        $jsonUsers = $serializer->serialize($users, 'json', $defaultContext);

        return new JsonResponse($jsonUsers, Response::HTTP_CREATED, json: true);
    }

    #[Route('/api/admin/user', name: 'delete-many-user', methods: ['DELETE'])]
    public function deleteMany(Request $request, SerializerInterface $serializer, UserRepository $productRepository, EntityManagerInterface $em): JsonResponse
    {
        $ids = json_decode($request->query->get('ids'), true)["id"];
        $userIds = [];
        foreach ($ids as $id) {
            $user = $productRepository->find($id);
            if ($user) {
                $em->remove($user);
                $userIds[] = $user->getId();

            }
        }
        $em->flush();

        return new JsonResponse($userIds, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/user/{id}', name: 'admin-read-user', methods: ['GET'])]
    public function read(int $id, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $user = $userRepository->find($id);
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                    'products' => $this->getProductsInfo,
                    'comments' => $this->getCommentsId
            ],
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                // dd($object);
                return $object->getId();
            },
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['user', 'cartProducts', 'orders', 'cards']
        ];
        $jsonUser = $serializer->serialize($user, 'json', $defaultContext);

        if ($user) {
            return new JsonResponse($jsonUser, Response::HTTP_OK, json: true);
        } else {
            return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
        }
    }

}

