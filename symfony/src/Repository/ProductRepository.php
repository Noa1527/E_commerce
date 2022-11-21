<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 *
 * @method Product|null find($id, $lockMode = null, $lockVersion = null)
 * @method Product|null findOneBy(array $criteria, array $orderBy = null)
 * @method Product[]    findAll()
 * @method Product[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    public function add(Product $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Product $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    //    /**
    //     * @return Product[] Returns an array of Product objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('p.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    public function findAllByParams($search, array $params = null)
    {

        $qb = $this->createQueryBuilder('product')
            ->andWhere("product.name like :search")
            ->setParameter('search', "%$search%");

        if (!empty($params)) {

            foreach ($params as $key => $value) {
                if ($key == "available") {
                    $qb->andWhere("product.inventory > 0");
                } else {
                    $qb->leftJoin("product.$key", "$key")
                    ->andWhere("$key.name = :val")
                    ->setParameter('val', $value);
                }
            }
        }

        $result = $qb->getQuery()->getResult();

        return !empty($result) ? $result : null;
    }

    public function findByCategory($category)
    {

        $qb = $this->createQueryBuilder('product')
            ->leftJoin("product.category", "category")
            ->andWhere("category.name = :val")
            ->setParameter('val', $category);

        $result = $qb->getQuery()->getResult();

        return !empty($result) ? $result : null;
    }

}
