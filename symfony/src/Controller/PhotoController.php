<?php

namespace App\Controller;

use App\Entity\Photo;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PhotoController extends AbstractController
{

    #[Route('api/amdin/product/{id}/image', name: 'admin-add-image', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function create(Product $product, Request $request,  EntityManagerInterface $em): JsonResponse
    {
        $file = $request->files->get('file');
        $photo = new Photo();
        $photo->addProduct($product);
        $photo->setImageFile($file);
        $em->persist($photo);
        $photo->setImageUrl('/images/products/' . $photo->getImage());
        $em->persist($photo);
        $em->flush();
        
        return new JsonResponse('ok', 200);
    }

    #[Route('api/amdin/image/{id}', name: 'admin-remove-image', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour accéder à cette page.')]
    public function delete(Photo $photo, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($photo);
        $em->flush();
        
        return new JsonResponse('ok', 200);
    }
}
