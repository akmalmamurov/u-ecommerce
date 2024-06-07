import { Spinner } from "@chakra-ui/react";
import "./Spiner.scss";
const Spiner = () => {
  return (
    <div className="spiner">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
};

export default Spiner;
