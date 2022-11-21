<?php

namespace App\Entity;

use App\Repository\AddressRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AddressRepository::class)]
class Address
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['address_user', 'address_admin', 'id'])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['address_user', 'address_admin'])]
    private $city;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['address_user', 'address_admin'])]
    private $zipcode;


    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['address_user', 'address_admin'])]
    private $number;

    #[ORM\OneToOne(inversedBy: 'address', targetEntity: User::class, cascade: ['persist'])]
    #[Groups(['address_user', 'address_admin'])]
    private $user;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['address_user', 'address_admin'])]
    private $country;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['address_user', 'address_admin'])]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['address_user', 'address_admin'])]
    private $lastname;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['address_user', 'address_admin'])]
    private $region;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['address_user', 'address_admin'])]
    private $phone;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['address_user', 'address_admin'])]
    private $street;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(?string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(string $street): self
    {
        $this->street = $street;

        return $this;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(?string $number): self
    {
        $this->number = $number;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(?string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }
}
