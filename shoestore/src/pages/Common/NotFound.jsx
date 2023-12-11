import { Result } from "antd";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <div
            style={{
              textAlign: "center",
              textDecoration: "underline",
              fontStyle: "italic",
              fontSize: "13px",
              color: "rgba(0,0,0,0.7)",
            }}
          >
            <Link to="/">Back Home</Link>
          </div>
        }
      />
    </div>
  );
}
NotFound.displayName = "notfound"; // Đặt tên cho component

export default NotFound;
