import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderApp(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
}

test("renders resume builder title", () => {
  renderApp();
  expect(screen.getByText("Resume Builder")).toBeInTheDocument();
});

test("shows prompt to add personal info when none exists", () => {
  renderApp();
  expect(
    screen.getByText("No personal information added yet.")
  ).toBeInTheDocument();
  expect(screen.getByText("Add Personal Info")).toBeInTheDocument();
});

test("navigates to add info form when clicking Add Personal Info", async () => {
  renderApp();
  await userEvent.click(screen.getByText("Add Personal Info"));
  expect(screen.getByText("Add Personal Information")).toBeInTheDocument();
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
});

test("shows validation errors when submitting empty form", async () => {
  renderApp("/add-info");
  await userEvent.click(screen.getByText("Save"));
  expect(screen.getByText("Name is required.")).toBeInTheDocument();
  expect(screen.getByText("Phone number is required.")).toBeInTheDocument();
  expect(screen.getByText("Email is required.")).toBeInTheDocument();
});

test("shows error for phone without international country code", async () => {
  renderApp("/add-info");
  await userEvent.type(screen.getByLabelText("Name"), "John Doe");
  await userEvent.type(screen.getByLabelText("Phone Number"), "1234567890");
  await userEvent.type(
    screen.getByLabelText("Email Address"),
    "john@example.com"
  );
  await userEvent.click(screen.getByText("Save"));
  expect(
    screen.getByText(
      "Phone must include an international country code (e.g. +1 1234567890)."
    )
  ).toBeInTheDocument();
});

test("saves user info and displays it on resume", async () => {
  renderApp("/add-info");
  await userEvent.type(screen.getByLabelText("Name"), "John Doe");
  await userEvent.type(screen.getByLabelText("Phone Number"), "+1 1234567890");
  await userEvent.type(
    screen.getByLabelText("Email Address"),
    "john@example.com"
  );
  await userEvent.click(screen.getByText("Save"));

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("+1 1234567890")).toBeInTheDocument();
  expect(screen.getByText("john@example.com")).toBeInTheDocument();
  expect(screen.getByText("Edit Personal Info")).toBeInTheDocument();
});

test("cancel button navigates back to resume without saving", async () => {
  renderApp("/add-info");
  await userEvent.type(screen.getByLabelText("Name"), "John Doe");
  await userEvent.click(screen.getByText("Cancel"));
  expect(
    screen.getByText("No personal information added yet.")
  ).toBeInTheDocument();
});
