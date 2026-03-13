<?php

namespace App\Command;

use App\Entity\Usuario;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-admin',
    description: 'Crea un usuario administrador por defecto si no existe.'
)]
final class CreateAdminCommand extends Command
{
    private const DEFAULT_EMAIL = 'admin@example.com';
    private const DEFAULT_PASSWORD = 'password123';
    private const DEFAULT_ROLES = ['ROLE_ADMIN', 'ROLE_USER'];

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly UserPasswordHasherInterface $passwordHasher
    ) {
        parent::__construct();
    }

    // Solo agregamos configure() para definir opciones
    protected function configure(): void
    {
        $this
            ->addOption('email', null, InputOption::VALUE_OPTIONAL, 'Email del administrador', self::DEFAULT_EMAIL)
            ->addOption('password', null, InputOption::VALUE_OPTIONAL, 'Contraseña del administrador', self::DEFAULT_PASSWORD)
            ->addOption('roles', null, InputOption::VALUE_OPTIONAL, 'Roles separados por coma', implode(',', self::DEFAULT_ROLES));
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $email = $input->getOption('email');
        $passwordPlano = $input->getOption('password');
        $roles = explode(',', $input->getOption('roles'));
        $nombre = 'Admin';

        $io->title('Creación de administrador');
        $io->text(sprintf('Email objetivo: %s', $email));
        $io->text(sprintf('Roles: %s', implode(', ', $roles)));

        $usuarioExistente = $this->entityManager
            ->getRepository(Usuario::class)
            ->findOneBy(['email' => $email]);

        if ($usuarioExistente) {
            $io->warning('Ya existe un usuario con ese email. No se realizaron cambios.');
            return Command::SUCCESS;
        }

        $usuario = (new Usuario())
            ->setEmail($email)
            ->setNombre($nombre)
            ->setRoles($roles);

        $usuario->setPassword($this->passwordHasher->hashPassword($usuario, $passwordPlano));

        $this->entityManager->persist($usuario);
        $this->entityManager->flush();

        $io->success('Administrador creado correctamente.');

        return Command::SUCCESS;
    }
}