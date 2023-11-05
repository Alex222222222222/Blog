const Comments: React.FC = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
            <script
              src="https://utteranc.es/client.js"
              repo="Alex222222222222/Blog"
              issue-term="url"
              theme="boxy-light"
              crossorigin="anonymous"
              async
            ></script>
          `,
      }}
    />
  );
};

export default Comments;
