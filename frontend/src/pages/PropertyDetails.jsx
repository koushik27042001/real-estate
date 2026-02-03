import { useParams } from "react-router-dom";
import Button from "../components/common/Button";

export default function PropertyDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto">
      <img src="https://via.placeholder.com/600" alt="" className="mb-4" />
      <h1 className="text-3xl font-bold">Property #{id}</h1>
      <p className="my-4">Spacious apartment in prime location.</p>
      <p className="font-bold text-xl text-blue-600">₹ 75 Lakh</p>

      <Button className="mt-4">Contact Owner</Button>
    </div>
  );
}
