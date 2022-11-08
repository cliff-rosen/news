import Feedback from "./Feedback";

export default function Help() {
  return (
    <div style={{ margin: "20px" }}>
      <div style={{ whiteSpace: "pre-wrap", marginBottom: 30 }}>
        <div style={{ textDecoration: "underline", marginBottom: 20 }}>
          Background
        </div>
        <div style={{ marginBottom: 30 }}>
          Recent scientific research has .... As this research grows and as
          efforts to legalize psychedelics gain momentum, Tripper’s Almanac is
          intended to be a forum for sharing and discussing information
          regarding their safe and legal use. Accordingly, the site may be of
          interest to consumers, therapists, scientists, investors, regulators,
          and anyone else who’s curious. We hope to build a thoughtful
          community, where people are engaged in meaningful discussion. We’re
          glad you’re here.
        </div>

        <div style={{ textDecoration: "underline", marginBottom: 20 }}>
          How to Use the Site
        </div>
        <div style={{ marginBottom: 30 }}>
          The site consists of a series of posts. Posts can be links to articles
          or resources or any other content that is likely to be of interest to
          the community. Posts can also be questions or statements intended to
          cultivate useful dialogue. They aren’t required to contain links.
        </div>

        <div style={{ textDecoration: "underline", marginBottom: 20 }}>
          How to Create New Posts
        </div>
        <div style={{ marginBottom: 30 }}>
          DO post information, resources, or perspectives that the intelligent
          psychedelics community would find interesting and engaging. DO NOT
          post small-sample anecdotes, for example, anything that starts off,
          “My cousin says he once did…”
        </div>
      </div>

      <div style={{ textDecoration: "underline", marginBottom: 20 }}>
        Please Provide Your Feedback Here
      </div>
      <div>
        <Feedback />
      </div>
    </div>
  );
}
