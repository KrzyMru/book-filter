"use client"
import React from "react";
import { Rating } from "react-simple-star-rating";

const ClientRating = ({ initialValue, className }: { initialValue: number, className?: string }) => {
  return (
    <Rating
        readonly
        iconsCount={5}
        initialValue={initialValue}
        allowFraction
        fillColor="#ffb81fff"
        SVGclassName={className}
        allowTitleTag={false}
    />
  );
}

export default ClientRating;