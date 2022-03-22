import ITsupportImg from "../../asset/Images/ITsupportImg.png";
import { Image } from "react-bootstrap";

export default function ItSupport() {
  return (
    <>
      <Image
        src={ITsupportImg}
        style={{ marginLeft: "20%", width: "50%", position: "absolute" }}
        fluid
      />
    </>
  );
}
