"use client";
import { useState } from "react";
import ModalWidgetLink from "@/app/components/widget/social-network/ModalWidgetLink";
import ButtonFacebook from "@/app/components/widget/social-network/ButtonFacebook";
import ButtonTwitter from "@/app/components/widget/social-network/ButtonTwitter";
import Modal from "@/app/components/Modal";

export default function SocialNetwork() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalKey, setModalKey] = useState(0);

  const data = {
    facebook: (
      <ModalWidgetLink
        id="facebook"
        preview={<ButtonFacebook showText={false} />}
      />
    ),
    twitter: (
      <ModalWidgetLink
        id="twitter"
        preview={<ButtonTwitter showText={false} />}
      />
    ),
  };

  const openModal = (type: "facebook" | "twitter") => {
    setModalContent(data[type]);
    setModalOpen(true);
    setModalKey((prev) => prev + 1);
  };

  return (
    <div>
      <Modal open={modalOpen} key={modalKey}>
        {modalContent}
      </Modal>
      <ButtonFacebook onClick={() => openModal("facebook")} />
      <ButtonTwitter onClick={() => openModal("twitter")} />
    </div>
  );
}
