import Feedback from "./Feedback";

export default function Help() {
  return (
    <div style={{ margin: "20px" }}>
      <div style={{ whiteSpace: "pre-wrap", marginBottom: 30 }}>
        <div style={{ textDecoration: "underline", marginBottom: 20 }}>
          Background
        </div>
        <div style={{ marginBottom: 30 }}>
          Recent scientific research has ignited new interest in the use of
          psychedelic substances for treating various mood disorders and
          optimizing various aspects of brain function. As this research grows
          and as efforts to legalize psychedelics gain momentum, Tripper’s
          Almanac is intended to be a forum for sharing and discussing
          information regarding their safe and legal use. The site may be of
          interest to consumers, therapists, scientists, investors, regulators,
          and anyone else who’s curious about the space. We hope to build a
          community where people are engaged in learning and meaningful
          discussion.{" "}
        </div>

        <div style={{ textDecoration: "underline", marginBottom: 20 }}>
          How to Use the Site
        </div>
        <div style={{ marginBottom: 30 }}>
          Tripper’s Almanac consists primarily of posts created by users of the
          site. Posts may contain links to articles or resources that are likely
          to be of interest to the community, but they can also be questions or
          commentary intended to stimulate dialogue. Anyone can view posts and
          comments, but in order to create or vote on posts or comments, you
          must register and be logged into the site.
          <br />
          <br />
          To view the most recent posts (sorted by time stamp), click on ’new’
          at the to of the page. To view trending posts (sorted by a function of
          recency and activity), click on ’trending.’
          <br />
          <br />
          Clicking on the title of any post containing a link will open that
          link in a new tab in your browser.
          <br />
          <br />
          Clicking on the ‘comments’ of any post will allow you to view a
          description of the post (if one was included with the post) and to
          participate in discussion about the post.
        </div>

        <div style={{ textDecoration: "underline", marginBottom: 20 }}>
          How to Create New Posts
        </div>
        <div style={{ marginBottom: 30 }}>
          DO post information, resources, or perspectives that the intelligent
          psychedelics community would find interesting and engaging.
          <br />
          <br />
          DO NOT post small-sample anecdotes, for example, anything that starts
          off, “My cousin says he once did…”
          <br />
          <br />
          When posting links (optional), please give preference to original
          sources or to high-quality summaries of scientific sources. In the
          ’Title’ field (required), feel free to copy the original title of the
          source, but remove site names (which will appear automatically) and
          anything resembling clickbait. When linking to resources or books,
          please include ‘Resource:’ or ‘Book:’ before the title. In the
          ‘Description’ field (optional), include any elaboration that you feel
          will help elucidate the intent of the post.
          <br />
          <br />
          In all posts and comments you submit, PLEASE:
          <ul>
            <li>Be kind, thoughtful, and gracious.</li>
            <li>
              Add value. People should become better off and more knowledgable
              because of what you post.
            </li>
            <li>Be as clear and succinct as you can be.</li>
          </ul>
        </div>
      </div>

      <div style={{ textDecoration: "underline", marginBottom: 20 }}>
        Feedback
      </div>
      <div>
        You will undoubtedly notice that the design and functionality of the
        site are rather spartan at this early stage. Rest assured that, as
        visitor engagement grows and as feedback accumulates, we plan to keep
        making improvements.
        <br />
        <br />
        Please share any feedback you have on Tripper’s Almanac. Let us know
        what you think and what’s missing. Your feedback will help us prioritize
        development efforts going forward.
        <Feedback />
      </div>
    </div>
  );
}
