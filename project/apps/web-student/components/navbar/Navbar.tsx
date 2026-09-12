import React from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Calendário", href: "/calendar" },
  { name: "Metas", href: "/goals" },
];

export default function Navbar() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Navbar</h1>
      <div>
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className="mx-2">
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}
