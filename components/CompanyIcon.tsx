import {FC} from "react"
import Image from "next/image";

interface iconProps {
    width?: string;
    iconPath: string;
    iconBackground: string;
}

const CompanyIcon: FC<iconProps> = ({iconPath, iconBackground, width}: iconProps) => {
    return (
        <div
          style={{ backgroundColor: iconBackground }}
          className="h-full w-full flex items-center justify-center p-7"
        >
          <Image
            src={iconPath}
            alt="logo"
            width="1"
            height="1"
            className=" h-auto w-full  "
          />
        </div>
    )
}
export default CompanyIcon