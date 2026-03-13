<?php

namespace App\Controller;

use App\Repository\TareaRepository;
use App\Service\TareaManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/tasks')]
class TaskController extends AbstractController
{
    public function __construct(
        private readonly TareaManager $tareaManager,
        private readonly TareaRepository $tareaRepository,
        private readonly EntityManagerInterface $entityManager
    ) {
    }

    #[Route('', name: 'api_tasks_list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $usuarioId = $this->getUser()?->getId() ?? (int) $request->query->get('usuarioId', 1);

        $filtros = [
            'estado' => $request->query->get('estado'),
            'texto'  => $request->query->get('q'),
        ];

        $tareas = $this->tareaManager->listarPorUsuario($usuarioId, $filtros);

        return $this->json($tareas);
    }

    #[Route('', name: 'api_tasks_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $usuarioId = $this->getUser()?->getId()
            ?? $request->query->getInt('usuarioId', $request->request->getInt('usuarioId', 1));

        $payload = json_decode($request->getContent(), true);

        if (!is_array($payload)) {
            return $this->json(['error' => 'JSON inválido'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $usuarioObj = $this->entityManager->getReference('App\Entity\Usuario', $usuarioId);
        $tarea = $this->tareaManager->crear($payload, $usuarioObj);

        return $this->json($tarea, JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'api_tasks_update', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $usuarioId = $this->getUser()?->getId()
            ?? $request->query->getInt('usuarioId', $request->request->getInt('usuarioId', 1));

        $tarea = $this->tareaManager->aseguraPerteneceAUsuario(
            $this->tareaRepository->find($id),
            $usuarioId
        );

        $payload = json_decode($request->getContent(), true);

        if (!is_array($payload)) {
            return $this->json(['error' => 'JSON inválido'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $tarea = $this->tareaManager->actualizar($tarea, $payload);

        return $this->json(['message' => 'Tarea actualizada', 'tarea' => $tarea]);
    }

    #[Route('/{id}/status', name: 'api_tasks_change_status', methods: ['PATCH'])]
    public function changeStatus(int $id, Request $request): JsonResponse
    {
        $usuarioId = $this->getUser()?->getId()
            ?? $request->query->getInt('usuarioId', $request->request->getInt('usuarioId', 1));

        $tarea = $this->tareaManager->aseguraPerteneceAUsuario(
            $this->tareaRepository->find($id),
            $usuarioId
        );

        $payload = json_decode($request->getContent(), true);

        if (!is_array($payload)) {
            return $this->json(['error' => 'JSON inválido'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $tarea = $this->tareaManager->cambiarEstado($tarea, $payload['estado'] ?? '');

        return $this->json(['message' => 'Estado actualizado', 'tarea' => $tarea]);
    }

    #[Route('/{id}', name: 'api_tasks_delete', methods: ['DELETE'])]
    public function delete(int $id, Request $request): JsonResponse
    {
        $usuarioId = $this->getUser()?->getId()
            ?? $request->query->getInt('usuarioId', $request->request->getInt('usuarioId', 1));

        $tarea = $this->tareaManager->aseguraPerteneceAUsuario(
            $this->tareaRepository->find($id),
            $usuarioId
        );

        $this->tareaManager->eliminar($tarea);

        return $this->json(['message' => 'Tarea eliminada']);
    }
}