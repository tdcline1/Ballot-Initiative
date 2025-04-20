import { createFileRoute } from "@tanstack/react-router";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 mb-8 text-left">
      <Markdown
        rehypePlugins={[rehypeRaw]}
        components={{
          a(props) {
            const { node, ...rest } = props;
            return <a className="text-blue-400 underline" {...rest}></a>;
          },
          h1(props) {
            const { node, ...rest } = props;
            return (
              <h1
                className="text-3xl font-bold text-gray-900 dark:text-white"
                {...rest}
              ></h1>
            );
          },
          h3(props) {
            const { node, ...rest } = props;
            return (
              <h2
                className="text-2xl font-bold text-gray-900 dark:text-white"
                {...rest}
              ></h2>
            );
          },
          li(props) {
            const { node, ...rest } = props;
            return (
              <li
                className="text-gray-700 dark:text-gray-300 list-disc ml-5"
                {...rest}
              ></li>
            );
          },
        }}
      >{`
# Welcome to the Ballot Initiative Project! 👋
This project aims to

> Provide a cheap, quick, and accurate way to validate signed petitions for local ballot measures

It does this by performing [OCR](https://en.wikipedia.org/wiki/Optical_character_recognition) on the signatures, matching the results against official voter records, and providing a score for each signature.

<figure class="text-center mb-5">
        <img src="ballot_initiative_schematic.png" alt="Ballot Initiative Schematic" />
        <figcaption class="text-black dark:text-white"><em>Core process for validating signatures</em></figcaption>
</figure>

Signature verification is typically a tedious process that requires human reviewers to inspect submitted signatures one by one, searching a voter database for the associated voter, and then ensuring the voter was registered at the time of signing. This process takes hundreds of person-hours and moves resources away from the more impactful work of advocating for the ballot measures themselves. 

There is software that can perform signature verification, but it is generally expensive and inaccessible to more grassroots organizations. By building a cheap, quick, and accurate way to automate this process, we hope to help even the smallest organizations get their ballot measures off the ground.

### The Builders
This project was created by the members of [Civic Tech DC](https://www.civictechdc.org/), a group of tech-savvy volunteers passionate about building software for the public good. 

Because of our experience with the DC ballot initiative process, we built the current version of the application for **Washington DC petitions of the type [here](https://github.com/Civic-Tech-Ballot-Inititiave/Ballot-Initiative/blob/main/sample_data/fake_signed_petitions_1-10.pdf)**. However, the code is open source and is easy to modify for your use case. Contact the Civic Tech DC team if you have questions about implementing it for your organization.


### Want to learn more?
- Check out the project repository [(Ballot Initiative Repository)](https://github.com/Civic-Tech-Ballot-Inititiave/Ballot-Initiative)
- Ballot Initiatives around the US [(Ballotpedia)](https://ballotpedia.org/Ballot_initiative)
- Civic Tech DC Homepage [(Civic Tech DC)](https://www.civictechdc.org/)

`}</Markdown>
    </div>
  );
}
