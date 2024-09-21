import {
  ChartBarSquareIcon,
  CursorArrowRippleIcon,
  DevicePhoneMobileIcon,
  AdjustmentsVerticalIcon,
  SunIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

import benefitOneImg from "../../public/img/benefit-one.png";
import benefitTwoImg from "../../public/img/benefit-two.png";
import fdfs from "../../";
const benefitOne = {
  title: "Privacy",
  // desc: "ou have the freedom to choose whether to store your data on IPFS or Web3 storage.",

  image: benefitTwoImg,
  bullets: [
    {
      title: "Secure Data Sharing",
      desc: "Easily share your encrypted wallet portfolio with financial institutions for loan approvals, job applications, or visa processes, all with full control over who can access your data.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Trustless Transactions",
      desc: "Perform secure transactions and share data without relying on centralized third parties, ensuring your privacy is never compromised.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Privacy-Preserving Lending",
      desc: "Borrow USDC and MINA while keeping your financial data completely private using zero-knowledge proofs.",
      icon: <CursorArrowRippleIcon />,
    },
  ],
};

const benefitTwo = {
  title: "And even more with SecureFi...",
  // desc: "It is secure and unchangeable because of the use of blockchain. indicating that nobody can manipulate your data",
  image: benefitOneImg,
  bullets: [
    {
      title: "Encrypted Financial Data",
      desc: "Your financial details are securely encrypted, ensuring that only the authorized party can access the shared data.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "ZK-Based Sharing",
      desc: "Share sensitive financial data using Mina Protocol with full privacy and security, verified through zero-knowledge proofs.",
      icon: <AdjustmentsVerticalIcon />,
    },
    {
      title: "USDC & MINA Lending",
      desc: "Access fast and secure lending using USDC and MINA with complete confidentiality.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
