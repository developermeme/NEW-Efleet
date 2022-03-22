import { Image } from "react-bootstrap";
import PageNotFound from "../asset/Images/PageNotFound.gif";

export default function NotFound() {
  return (
    <div>
      <Image
        alt=""
        src={PageNotFound}
        style={{
          marginLeft: "14%",
          width: "50%",
          position: "absolute",
          marginTop: "5%",
        }}
        fluid
      />
    </div>
  );
}
