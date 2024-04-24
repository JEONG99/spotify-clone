import { IoMdClose } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "./ui/dialog";

interface ModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  isOpen,
  onChange,
}) => {
  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogContent className="fixed drop-shadow-md border border-neutral-700 top-1/2 left-1/2 max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px]">
        <DialogTitle className="text-xl text-center font-bold mb-4">
          {title}
        </DialogTitle>
        <DialogDescription className="mb-5 leading-normal text-sm text-center">
          {description}
        </DialogDescription>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
