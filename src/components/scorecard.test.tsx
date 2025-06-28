import { render, screen } from "../../test/test-utils";
import { describe, it } from "vitest";
import userEvent from "@testing-library/user-event";
import Scorecard from "./scorecard";

describe("Scorecard", () => {
  it('should save a score when the "Save and display" button is clicked', async () => {
    render(<Scorecard />);
    await userEvent.click(screen.getByText("Save and display"));
    // We can add assertions here to check if the score was saved correctly
    // For now, the test will pass if no error is thrown
  });
});
