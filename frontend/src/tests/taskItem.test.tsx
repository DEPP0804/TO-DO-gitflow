import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskItem from "../components/taskItem";
import { type Task } from "../services/taskService";

const mockTask: Task = {
  id: 1,
  title: "Tarea de prueba",
  completed: false,
};

const mockTaskDone: Task = {
  id: 2,
  title: "Tarea completada",
  completed: true,
};

describe("TaskItem", () => {
  it("debe renderizar el título de la tarea", () => {
    render(
      <TaskItem
        task={mockTask}
        onComplete={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Tarea de prueba")).toBeInTheDocument();
  });

  it("debe llamar onComplete al hacer click en el check", async () => {
    const onComplete = vi.fn();
    render(
      <TaskItem
        task={mockTask}
        onComplete={onComplete}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /complete/i }));
    expect(onComplete).toHaveBeenCalledWith(1);
  });

  it("no debe llamar onComplete si la tarea ya está completada", async () => {
    const onComplete = vi.fn();
    render(
      <TaskItem
        task={mockTaskDone}
        onComplete={onComplete}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /complete/i }));
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("debe llamar onDelete al hacer click en eliminar", async () => {
    const onDelete = vi.fn();
    render(
      <TaskItem
        task={mockTask}
        onComplete={vi.fn()}
        onEdit={vi.fn()}
        onDelete={onDelete}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("debe mostrar input al hacer click en editar", async () => {
    render(
      <TaskItem
        task={mockTask}
        onComplete={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(screen.getByDisplayValue("Tarea de prueba")).toBeInTheDocument();
  });

  it("debe llamar onEdit al guardar con Enter", async () => {
    const onEdit = vi.fn();
    render(
      <TaskItem
        task={mockTask}
        onComplete={vi.fn()}
        onEdit={onEdit}
        onDelete={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /edit/i }));
    const input = screen.getByDisplayValue("Tarea de prueba");
    await userEvent.clear(input);
    await userEvent.type(input, "Tarea editada{Enter}");

    expect(onEdit).toHaveBeenCalledWith(1, "Tarea editada");
  });
});