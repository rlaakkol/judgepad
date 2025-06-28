import { render, screen } from "../../test/test-utils";
import { describe, it, expect } from "vitest";
import App from "./app";

describe("App", () => {
  it("renders the navbar with the correct title", () => {
    render(<App />);
    expect(screen.getByText("Dantai Hokei")).toBeInTheDocument();
  });

  it("renders the Alerts component", () => {
    render(<App />);
    expect(screen.getByTestId("alerts")).toBeInTheDocument();
  });
});
