import Feedback from "./Feedback";

export default function Help() {
  return (
    <div style={{ margin: "20px", color: "gray", border: "none" }}>
      <div style={{ whiteSpace: "pre-wrap", marginBottom: 30 }}>
        <div style={{ textDecoration: "underline", marginBottom: 20 }}>
          Background
        </div>
        <div style={{ marginBottom: 30 }}>
          Recent scientific research has ignited new interest in the use of
          psychedelic substances for treating a variety of medical conditions
          and for optimizing certain aspects of brain function. As this research
          grows and as efforts to legalize psychedelics gain momentum, Tripper’s
          Almanac is intended to be a forum for sharing and discussing
          information and resources related to their safe and legal use. The
          site may be useful to consumers, therapists, scientists, investors,
          regulators, and anyone else with an interest in the space. We hope to
          build a community where people are engaged in learning and in
          meaningful discussion.{" "}
        </div>

        <div style={{ textDecoration: "underline", marginBottom: 20 }}>
          How to Use the Site
        </div>
        <div style={{ marginBottom: 30 }}>
          Tripper’s Almanac consists primarily of posts created by users of the
          site. Posts may contain links to articles or resources that are likely
          to be of interest to the community, but they can also be questions or
          commentary intended to stimulate dialogue. Anyone can view posts and
          comments, but in order to create or to vote on posts or comments, you
          must register and be logged into the site.
          <br />
          <br />
          To view the most recent posts (sorted by time stamp), click on ’new’
          at the top of the page. To view trending posts (sorted by a function
          of recency and activity), click on ’trending.’ Once viewing the list
          of posts, you can click on ‘filter’ for options that limit the posts
          you see to only those with certain attributes based on the information
          of greatest interest to you.
          <br />
          <br />
          Clicking on the title of any post containing a link will open that
          link in a new tab in your browser.
          <br />
          <br />
          Clicking on the ‘comments’ of any post will allow you to view a
          description of the post (if one was included with the post) and to
          view or participate in discussion about the post.
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
          When you click ‘post’ at the top of the page, you will see a form that
          prompts you to choose a ‘post type’ from a drop-down menu. In the
          ’Title’ field, feel free to copy the original title of the source, but
          remove site names (which will appear automatically) and anything
          resembling clickbait. When creating posts containing links, please
          give preference to original sources or to high-quality summaries of
          scientific sources. In the ‘Description’ field, include anything you
          feel will elucidate the intent of the post. When selecting tags from
          the lists of Substances or Conditions provided, please choose tags
          reflecting the primary focus of the post (as opposed to tags that are
          mentioned incidentally by the post). <br />
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
        what you think and what’s missing. Your feedback will help us to improve
        the site experience and prioritize development efforts going forward.
        <Feedback />
      </div>
    </div>
  );
}
