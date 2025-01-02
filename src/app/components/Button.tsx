"use client";
import React from "react";

// PrimaryButton Component
function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 mb-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// SecondaryButton Component
function SecondaryButton({
  children,
  onClick,
  prefix,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  prefix?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 mb-2 flex items-center space-x-2"
      onClick={onClick}
    >
      {prefix && <div className="text-xl">{prefix}</div>}
      <div>{children}</div>
    </button>
  );
}

export { PrimaryButton, SecondaryButton };