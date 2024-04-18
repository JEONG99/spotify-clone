import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarLinkProps {
  label: string;
  Icon: IconType;
  path: string;
  active: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  label,
  Icon,
  path,
  active,
}) => {
  return (
    <Link href={path}>
      <div className="flex items-center gap-3 cursor-pointer group">
        <Icon
          size={26}
          className={twMerge(
            "group-hover:text-white transition-colors",
            active ? "text-white" : "text-neutral-300"
          )}
        />
        <span
          className={twMerge(
            "group-hover:text-white transition-colors font-semibold",
            active ? "text-white" : "text-neutral-300"
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLink;
