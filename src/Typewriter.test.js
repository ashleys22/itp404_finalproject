import React from "react";
import { render } from "@testing-library/react";
import Typewriter from "./Typewriter";

const createEntry = jest.fn();

test("rendering typewriter effect", async () => {
	const { container } = render(<Typewriter message="Message" />);

	expect(container).toHaveTextContent("Message");
});
