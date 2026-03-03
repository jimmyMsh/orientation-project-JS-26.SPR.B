import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import LogoDropzone from "./components/LogoDropzone";

test("renders resume builder title", () => {
  render(<App />);
  expect(screen.getByText("Resume Builder")).toBeInTheDocument();
});

test("shows 'No logo uploaded' for each section when no logos exist", () => {
  render(<App />);
  const emptyMessages = screen.getAllByText("No logo uploaded");
  expect(emptyMessages).toHaveLength(3);
});

test("shows drag and drop zones for each section", () => {
  render(<App />);
  const dropMessages = screen.getAllByText("Drag & drop a logo here");
  expect(dropMessages).toHaveLength(3);
});

test("shows browse hint in each dropzone", () => {
  render(<App />);
  const hints = screen.getAllByText("or click to browse");
  expect(hints).toHaveLength(3);
});

test("LogoDropzone shows placeholder when no logo is provided", () => {
  render(<LogoDropzone logo={null} onLogoChange={() => {}} />);
  expect(screen.getByText("Drag & drop a logo here")).toBeInTheDocument();
  expect(screen.getByText("or click to browse")).toBeInTheDocument();
});

test("LogoDropzone shows image preview when logo is provided", () => {
  render(
    <LogoDropzone
      logo="data:image/png;base64,fakedata"
      onLogoChange={() => {}}
    />
  );
  const img = screen.getByAltText("Uploaded logo");
  expect(img).toBeInTheDocument();
  expect(img.src).toBe("data:image/png;base64,fakedata");
});

test("LogoDropzone shows remove button when logo is provided", () => {
  render(
    <LogoDropzone
      logo="data:image/png;base64,fakedata"
      onLogoChange={() => {}}
    />
  );
  expect(screen.getByText("Remove")).toBeInTheDocument();
});

test("LogoDropzone calls onLogoChange with null when remove is clicked", async () => {
  const mockOnChange = jest.fn();
  render(
    <LogoDropzone
      logo="data:image/png;base64,fakedata"
      onLogoChange={mockOnChange}
    />
  );
  await userEvent.click(screen.getByText("Remove"));
  expect(mockOnChange).toHaveBeenCalledWith(null);
});

test("LogoDropzone does not show remove button when no logo exists", () => {
  render(<LogoDropzone logo={null} onLogoChange={() => {}} />);
  expect(screen.queryByText("Remove")).not.toBeInTheDocument();
});

test("LogoDropzone does not show placeholder when logo is provided", () => {
  render(
    <LogoDropzone
      logo="data:image/png;base64,fakedata"
      onLogoChange={() => {}}
    />
  );
  expect(screen.queryByText("Drag & drop a logo here")).not.toBeInTheDocument();
});
