<?php

namespace App\Controller;

use App\Entity\Feature;
use App\Entity\Photo;
use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\FeatureRepository;
use App\Repository\ProductRepository;
use App\Repository\PromotionRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

#[IsGranted('ROLE_ADMIN', message: "Vous n'êtes pas autorisé à accéder à cette page")]
class AdminProductController extends AbstractController
{
    public function __construct()
    {
        $this->getFeaturesInfos = function ($object, $outerObject, $name) {
            $output = [];
            foreach ($object as $value) {
                $output[] = [
                    "name" => $value->getName(),
                    "feature_id" => $value->getId()
                ];
            }
            return $output;
        };

        $this->getCategoryInfos = function ($object) {
            
            return $object ? [
                "name" => $object->getName(),
                "category_id" => $object->getId()
            ] :
            null;
        };

        $this->getPromotionsInfos = function ($object) {
            $output = [];
            foreach ($object as $value) {
                $output[] = [
                    "name" => $value->getName(),
                    "amount" => $value->getAmount(),
                    "id" => $value->getId()
                ];
            }
            return $output;
        };

        $this->getPhotosInfos = function ($object) {
            $output = [];
            foreach ($object as $value) {
                $output[] = [
                    "fullUrl" => 'http://127.0.0.1:8000' . $value->getImageUrl(),
                    "url" => $value->getImageUrl(),
                    "id" => $value->getId()
                ];
            }
            return $output;
        };

        $this->getCommentsInfos = function ($object) {
            $output = [];
            foreach ($object as $value) {
                $output[] = [
                    "comment" => $value->getComment(),
                    "rating" => $value->getRating(),
                    "user_email" => $value->getUser()->getEmail(),
                    "id" => $value->getId()
                ];
            }
            return $output;
        };
        
    }

    #[Route('api/admin/product/{id}', name: 'admin-update-product', methods: ['POST'])]
    public function update(Product $currentProduct, Request $request, SerializerInterface $serializer, EntityManagerInterface $em, CategoryRepository $categoryRepository, ProductRepository $productRepository): JsonResponse
    {
        $photos = $request->files->all();
        if (!empty($photos)) {
            foreach ($photos as $photo) {
                $image = new Photo();
                $image->addProduct($currentProduct);
                $image->setImageFile($photo);
                $em->persist($image);
                $image->setImageUrl('/images/products/' . $image->getImage());
                $em->persist($image);
            }
        }

        $datas = json_decode($request->get('data'), true);
        if (!empty($datas["category"])) {
            $category = $categoryRepository->find($datas["category"]);
            if ($category) {
                $currentProduct->setCategory($category);
            }
        }
        foreach ($datas as $key => $value) {
            if ($key !== "id" && $key !== "comments" && $key !== "category" && $key !== "list") {
                $method = 'set' . ucfirst($key); 
                $currentProduct->$method($value);
            }
        }

        $em->persist($currentProduct);
        $em->flush();
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'features' => $this->getFeaturesInfos,
                'category' => $this->getCategoryInfos,
                'promotions' => $this->getPromotionsInfos,
                'photos' => $this->getPhotosInfos,
                'comments' => $this->getCommentsInfos
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['orders', 'carts', 'promotions', 'features']
        ];
        $newProduct = $productRepository->find($currentProduct->getId());
        $jsonProduct = $serializer->serialize($newProduct, 'json', $defaultContext);

        return new JsonResponse($jsonProduct, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/product/{id}', name: 'admin-delete-product', methods: ['DELETE'])]
    public function delete(Product $product, EntityManagerInterface $em): JsonResponse
    {
        if ($product) {
            $em->remove($product);
            $em->flush();

            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        } else {
            return new JsonResponse(null, Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/api/admin/product', name: 'read-many-product', methods: ['GET'])]
    public function readMany(Request $request, SerializerInterface $serializer, ProductRepository $productRepository): JsonResponse
    {
        $ids = json_decode($request->query->get('filter'), true)["id"];
        $products = [];
        foreach ($ids as $id) {
            $products[] = $productRepository->find($id);
        }
        $defaultContext = [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['features', 'category', 'photo', 'comments', 'promotions', 'orders', 'carts', 'inventory', 'photos', 'description']
        ];
        $jsonProducts = $serializer->serialize($products, 'json', $defaultContext);

        return new JsonResponse($jsonProducts, Response::HTTP_OK, json: true);
    }

    #[Route('api/admin/product', name: 'admin-create-product', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, SerializerInterface $serializer, CategoryRepository $categoryRepository, ProductRepository $productRepository): JsonResponse
    {
        $product = new Product();
        $photos = $request->files->all();
        if (!empty($photos)) {
            foreach ($photos as $photo) {
                $image = new Photo();
                $image->addProduct($product);
                $image->setImageFile($photo);
                $em->persist($image);
                $image->setImageUrl('/images/products/' . $image->getImage());
                $em->persist($image);
            }
        }

        $datas = json_decode($request->get('data'), true);
        if (!empty($datas["category"])) {
            $category = $categoryRepository->find($datas["category"]);
            if ($category) {
                $product->setCategory($category);
            }
        }
        foreach ($datas as $key => $value) {
            if ($key !== "id" && $key !== "comments" && $key !== "category" && $key !== "list") {
                $method = 'set' . ucfirst($key); 
                $product->$method($value);
            }
        }

        $em->persist($product);
        $em->flush();
        $defaultContext = [
            AbstractNormalizer::CALLBACKS => [
                'features' => $this->getFeaturesInfos,
                'category' => $this->getCategoryInfos,
                'promotions' => $this->getPromotionsInfos,
                'photos' => $this->getPhotosInfos,
                'comments' => $this->getCommentsInfos
            ],
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['orders', 'carts', 'promotions', 'features']
        ];
        $newProduct = $productRepository->find($product->getId());
        $jsonProduct = $serializer->serialize($newProduct, 'json', $defaultContext);

        return new JsonResponse($jsonProduct, Response::HTTP_OK, json: true);
    }
}
