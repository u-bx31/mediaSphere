import { ImageIcon, SwatchBook } from "lucide-react";

export const Navlinks = [
  { title: 'Home', route: '/' },
  { title: 'pricing', route: '/pricing' },
]

export const options = [
  {
    value: "color",
    label: "Color",
    icon: <SwatchBook className="w-5 h-5 stroke-black" />,
  },
  {
    value: "image",
    label: "Image",
    icon: <ImageIcon className="w-5 h-5 stroke-black" />,
  },
];