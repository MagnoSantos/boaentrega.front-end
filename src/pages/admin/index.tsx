import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminIndex: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/sellers");
  }, []);
  return <></>;
};

export default AdminIndex;
