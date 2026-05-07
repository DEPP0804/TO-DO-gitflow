import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import AddTask from "../components/addTask";

describe("AddTask", () => {
  it("debe renderizar el input y el botón", () => {
    render(<AddTask onAdd={vi.fn()} />);

    expect(screen.getByPlaceholderText("New task...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("debe llamar onAdd con el título al enviar", async () => {
    const onAdd = vi.fn();
    render(<AddTask onAdd={onAdd} />);

    await userEvent.type(screen.getByPlaceholderText("New task..."), "Nueva tarea");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(onAdd).toHaveBeenCalledWith("Nueva tarea");
  });

  it("no debe llamar onAdd si el input está vacío", async () => {
    const onAdd = vi.fn();
    render(<AddTask onAdd={onAdd} />);

    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it("debe limpiar el input después de enviar", async () => {
    render(<AddTask onAdd={vi.fn()} />);
    const input = screen.getByPlaceholderText("New task...");

    await userEvent.type(input, "Tarea");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(input).toHaveValue("");
  });
});