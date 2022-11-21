<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;


class UserController extends AbstractController
{

    public function __construct(TokenStorageInterface $tokenStorageInterface, JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
    }

    #[Route('/user', name: 'register-user', methods: ['POST'])]
    #[IsGranted("PUBLIC_ACCESS", message: "Vous n'êtes pas autorisé à accéder à cette page")]
    public function register(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, UserPasswordHasherInterface $passwordHasher): JsonResponse
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

    #[Route('api/user', name: 'read-user', methods: ['GET'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function read(SerializerInterface $serializer): JsonResponse
    {
        
        $user = $this->tokenStorageInterface->getToken()->getUser();
        $jsonUser = $serializer->serialize($user, 'json', ["groups" => ["user_user", 'id']]);
        return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
    }

    #[Route('api/user', name: 'update-user', methods: ['PATCH'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function update(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $currentUser = $this->tokenStorageInterface->getToken()->getUser();
        $content = $request->getContent();
        $content = json_decode($content);
        foreach ($content as $key => $value) {
            if ($key !== 'password' && $key !== 'roles') {
                $method_name = ucfirst($key);
                $method = "set$method_name";
                $currentUser->$method($value);
            }
        }
        $em->persist($currentUser);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/user', name: 'delete-user', methods: ['DELETE'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function delete(EntityManagerInterface $em)
    {
        $currentUser = $this->tokenStorageInterface->getToken()->getUser();
        $em->remove($currentUser);
        $em->flush();
        
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('api/user/update-password', name: 'update-user-password', methods: ['PATCH'])]
    #[IsGranted('ROLE_USER', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function update_password(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher, SerializerInterface $serializer): JsonResponse
    {
        $content = $request->getContent();
        $content = json_decode($content, true);
        
        if (!empty($content["password"]) && !empty($content["confirm"])) {
            $currentUser = $this->tokenStorageInterface->getToken()->getUser();
            $password = $content["password"];
            $confirm = $content["confirm"];

            if ($password === $confirm) {
                $user = $this->tokenStorageInterface->getToken()->getUser();
                $hashedPassword = $passwordHasher->hashPassword($user, $password);
                $user->setPassword($hashedPassword);
                $em->persist($currentUser);
                $em->flush();
                return new JsonResponse(null, Response::HTTP_NO_CONTENT);
            } else {
                return new JsonResponse('Les deux mots de passe ne sont pas identique', Response::HTTP_BAD_REQUEST);
            }
        } else {
            return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
        }
    }
}
