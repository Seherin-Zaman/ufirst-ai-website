import type { Partner } from "@/types/content";

/**
 * Real partner profiles, supplied by the company. No job titles, bios or
 * social links were provided, so "Partner" is used as a neutral designation
 * and LinkedIn is left unset rather than invented.
 */
export const partners: Partner[] = [
  {
    id: "na-sumon",
    name: "N A Sumon",
    designation: "Partner",
    bio: "",
    expertise: [],
    photo: { src: "/images/partners/partner-na-sumon.jpg", alt: "N A Sumon", width: 800, height: 1000 },
  },
  {
    id: "radeen-rahman",
    name: "Radeen Rahman",
    designation: "Partner",
    bio: "",
    expertise: [],
    photo: { src: "/images/partners/partner-radeen-rahman.jpg", alt: "Radeen Rahman", width: 800, height: 1000 },
  },
  {
    id: "zareef-hossain",
    name: "Zareef Hossain",
    designation: "Partner",
    bio: "",
    expertise: [],
    photo: { src: "/images/partners/partner-zareef-hossain.jpg", alt: "Zareef Hossain", width: 800, height: 1000 },
  },
  {
    id: "safir-ahmed",
    name: "Safir Ahmed",
    designation: "Partner",
    bio: "",
    expertise: [],
    photo: { src: "/images/partners/partner-safir-ahmed.jpg", alt: "Safir Ahmed", width: 800, height: 1000 },
  },
];
