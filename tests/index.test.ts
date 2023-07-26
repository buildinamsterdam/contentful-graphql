import { renderHook } from "@testing-library/react";

import { CFAdaptor } from "../src";

const DATA = {
  __typename: "page",
  title: "Page title",
  body: [
    { __typename: "content", title: "Block title" },
    { __typename: "media", src: "http://" },
  ],
};

describe("CFAdaptor", () => {
  it("should work with the first argument", () => {
    const Adaptor = new CFAdaptor({
      contentAdaptors: {
        content: (data) => ({ ...data, subtitle: "Block subtitle" }),
      },
      pageAdaptors: {
        page: (data) => ({ ...data, title: "Adapted page title" }),
      },
    });

    const outcome = Adaptor.adapt(DATA);

    expect(outcome.title).toBe("Adapted page title");
    expect(outcome.body[0].subtitle).toBe("Block subtitle");
  });
});
