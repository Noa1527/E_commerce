<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220714183735 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE feature (id INT AUTO_INCREMENT NOT NULL, feature_name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE feature_product (feature_id INT NOT NULL, product_id INT NOT NULL, INDEX IDX_E25D9FA460E4B879 (feature_id), INDEX IDX_E25D9FA44584665A (product_id), PRIMARY KEY(feature_id, product_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE inventory (id INT AUTO_INCREMENT NOT NULL, product_id INT DEFAULT NULL, amount BIGINT NOT NULL, UNIQUE INDEX UNIQ_B12D4A364584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, category_id INT NOT NULL, product_name VARCHAR(600) NOT NULL, product_description VARCHAR(3000) DEFAULT NULL, price INT NOT NULL, weight INT NOT NULL, INDEX IDX_D34A04AD12469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE feature_product ADD CONSTRAINT FK_E25D9FA460E4B879 FOREIGN KEY (feature_id) REFERENCES feature (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE feature_product ADD CONSTRAINT FK_E25D9FA44584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE inventory ADD CONSTRAINT FK_B12D4A364584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD12469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE feature_product DROP FOREIGN KEY FK_E25D9FA460E4B879');
        $this->addSql('ALTER TABLE feature_product DROP FOREIGN KEY FK_E25D9FA44584665A');
        $this->addSql('ALTER TABLE inventory DROP FOREIGN KEY FK_B12D4A364584665A');
        $this->addSql('DROP TABLE feature');
        $this->addSql('DROP TABLE feature_product');
        $this->addSql('DROP TABLE inventory');
        $this->addSql('DROP TABLE product');
    }
}
