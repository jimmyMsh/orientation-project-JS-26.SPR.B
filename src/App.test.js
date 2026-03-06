import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders resume builder title", () => {
  render(<App />);
  expect(screen.getByText("Resume Builder")).toBeInTheDocument();
});

test("shows empty state when no skills are added", () => {
  render(<App />);
  expect(screen.getByText("No skills added yet.")).toBeInTheDocument();
});

test("shows skill form when clicking Add Skill", async () => {
  render(<App />);
  await userEvent.click(screen.getByText("Add Skill"));
  expect(screen.getByLabelText("Skill Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Proficiency")).toBeInTheDocument();
});

test("shows validation errors when submitting empty skill form", async () => {
  render(<App />);
  await userEvent.click(screen.getByText("Add Skill"));
  await userEvent.click(screen.getByText("Save"));
  expect(screen.getByText("Skill name is required.")).toBeInTheDocument();
  expect(
    screen.getByText("Proficiency level is required.")
  ).toBeInTheDocument();
});

test("adds a new skill and displays it", async () => {
  render(<App />);
  await userEvent.click(screen.getByText("Add Skill"));

  await userEvent.type(screen.getByLabelText("Skill Name"), "JavaScript");
  await userEvent.selectOptions(screen.getByLabelText("Proficiency"), [
    "Advanced",
  ]);
  await userEvent.click(screen.getByText("Save"));

  expect(screen.getByText("JavaScript")).toBeInTheDocument();
  expect(screen.getByText(/Advanced/)).toBeInTheDocument();
  expect(screen.queryByText("No skills added yet.")).not.toBeInTheDocument();
});

test("opens edit form with existing skill data when clicking Edit", async () => {
  render(<App />);

  await userEvent.click(screen.getByText("Add Skill"));
  await userEvent.type(screen.getByLabelText("Skill Name"), "Python");
  await userEvent.selectOptions(screen.getByLabelText("Proficiency"), [
    "Intermediate",
  ]);
  await userEvent.click(screen.getByText("Save"));

  await userEvent.click(screen.getByText("Edit"));

  expect(screen.getByLabelText("Skill Name")).toHaveValue("Python");
  expect(screen.getByLabelText("Proficiency")).toHaveValue("Intermediate");
  expect(screen.getByText("Edit Skill")).toBeInTheDocument();
});

test("updates an existing skill using its index", async () => {
  render(<App />);

  await userEvent.click(screen.getByText("Add Skill"));
  await userEvent.type(screen.getByLabelText("Skill Name"), "Python");
  await userEvent.selectOptions(screen.getByLabelText("Proficiency"), [
    "Beginner",
  ]);
  await userEvent.click(screen.getByText("Save"));

  await userEvent.click(screen.getByText("Edit"));

  const nameInput = screen.getByLabelText("Skill Name");
  await userEvent.clear(nameInput);
  await userEvent.type(nameInput, "Python 3");
  await userEvent.selectOptions(screen.getByLabelText("Proficiency"), [
    "Expert",
  ]);
  await userEvent.click(screen.getByText("Save"));

  expect(screen.getByText("Python 3")).toBeInTheDocument();
  expect(screen.getByText(/Expert/)).toBeInTheDocument();
  expect(screen.queryByText("Python")).not.toBeInTheDocument();
  expect(screen.queryByText(/Beginner/)).not.toBeInTheDocument();
});

test("cancel button hides the add skill form without saving", async () => {
  render(<App />);
  await userEvent.click(screen.getByText("Add Skill"));
  await userEvent.type(screen.getByLabelText("Skill Name"), "React");
  await userEvent.click(screen.getByText("Cancel"));

  expect(screen.queryByLabelText("Skill Name")).not.toBeInTheDocument();
  expect(screen.queryByText("React")).not.toBeInTheDocument();
});

test("cancel button hides the edit skill form without saving changes", async () => {
  render(<App />);

  await userEvent.click(screen.getByText("Add Skill"));
  await userEvent.type(screen.getByLabelText("Skill Name"), "CSS");
  await userEvent.selectOptions(screen.getByLabelText("Proficiency"), [
    "Advanced",
  ]);
  await userEvent.click(screen.getByText("Save"));

  await userEvent.click(screen.getByText("Edit"));
  const nameInput = screen.getByLabelText("Skill Name");
  await userEvent.clear(nameInput);
  await userEvent.type(nameInput, "SCSS");
  await userEvent.click(screen.getByText("Cancel"));

  expect(screen.getByText("CSS")).toBeInTheDocument();
  expect(screen.queryByText("SCSS")).not.toBeInTheDocument();
});
