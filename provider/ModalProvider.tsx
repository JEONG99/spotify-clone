"use client";

import UploadModal from "@/components/UploadModal";
import { useEffect, useState } from "react";

const ModalProvier = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <UploadModal />
    </>
  );
};

export default ModalProvier;
