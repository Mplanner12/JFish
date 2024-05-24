import { AlignJustify } from 'lucide-react';

export default function AlignJustifyButton(props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) {
  return (
    <AlignJustify
      className="mb-[0.5rem] md:hidden"
      color="black"
      aria-controls="sidebar"
      onClick={(e) => {
        e.stopPropagation();
        props.setSidebarOpen(!props.sidebarOpen);
      }}
    />
  );
}
