// Static map of generated studio shots: <car>-<color>.jpg
import coupeStealth from "@/assets/cars/coupe-stealth.jpg";
import coupeElectric from "@/assets/cars/coupe-electric.jpg";
import coupePearl from "@/assets/cars/coupe-pearl.jpg";
import coupeCandy from "@/assets/cars/coupe-candy.jpg";
import coupeBronze from "@/assets/cars/coupe-bronze.jpg";
import coupeLime from "@/assets/cars/coupe-lime.jpg";

import suvStealth from "@/assets/cars/suv-stealth.jpg";
import suvElectric from "@/assets/cars/suv-electric.jpg";
import suvPearl from "@/assets/cars/suv-pearl.jpg";
import suvCandy from "@/assets/cars/suv-candy.jpg";
import suvBronze from "@/assets/cars/suv-bronze.jpg";
import suvLime from "@/assets/cars/suv-lime.jpg";

import sedanStealth from "@/assets/cars/sedan-stealth.jpg";
import sedanElectric from "@/assets/cars/sedan-electric.jpg";
import sedanPearl from "@/assets/cars/sedan-pearl.jpg";
import sedanCandy from "@/assets/cars/sedan-candy.jpg";
import sedanBronze from "@/assets/cars/sedan-bronze.jpg";
import sedanLime from "@/assets/cars/sedan-lime.jpg";

import pickupStealth from "@/assets/cars/pickup-stealth.jpg";
import pickupElectric from "@/assets/cars/pickup-electric.jpg";
import pickupPearl from "@/assets/cars/pickup-pearl.jpg";
import pickupCandy from "@/assets/cars/pickup-candy.jpg";
import pickupBronze from "@/assets/cars/pickup-bronze.jpg";
import pickupLime from "@/assets/cars/pickup-lime.jpg";

import convStealth from "@/assets/cars/convertible-stealth.jpg";
import convElectric from "@/assets/cars/convertible-electric.jpg";
import convPearl from "@/assets/cars/convertible-pearl.jpg";
import convCandy from "@/assets/cars/convertible-candy.jpg";
import convBronze from "@/assets/cars/convertible-bronze.jpg";
import convLime from "@/assets/cars/convertible-lime.jpg";

import hatchStealth from "@/assets/cars/hatch-stealth.jpg";
import hatchElectric from "@/assets/cars/hatch-electric.jpg";
import hatchPearl from "@/assets/cars/hatch-pearl.jpg";
import hatchCandy from "@/assets/cars/hatch-candy.jpg";
import hatchBronze from "@/assets/cars/hatch-bronze.jpg";
import hatchLime from "@/assets/cars/hatch-lime.jpg";

import bikeStealth from "@/assets/cars/bike-stealth.jpg";
import bikeElectric from "@/assets/cars/bike-electric.jpg";
import bikePearl from "@/assets/cars/bike-pearl.jpg";
import bikeCandy from "@/assets/cars/bike-candy.jpg";
import bikeBronze from "@/assets/cars/bike-bronze.jpg";
import bikeLime from "@/assets/cars/bike-lime.jpg";

import vanStealth from "@/assets/cars/van-stealth.jpg";
import vanElectric from "@/assets/cars/van-electric.jpg";
import vanPearl from "@/assets/cars/van-pearl.jpg";
import vanCandy from "@/assets/cars/van-candy.jpg";
import vanBronze from "@/assets/cars/van-bronze.jpg";
import vanLime from "@/assets/cars/van-lime.jpg";

export type CarId = "coupe" | "suv" | "sedan" | "pickup" | "convertible" | "hatch" | "bike" | "van";
export type ColorId = "stealth" | "electric" | "pearl" | "candy" | "bronze" | "lime";

export const carImages: Record<CarId, Record<ColorId, string>> = {
  coupe: {
    stealth: coupeStealth, electric: coupeElectric, pearl: coupePearl,
    candy: coupeCandy, bronze: coupeBronze, lime: coupeLime,
  },
  suv: {
    stealth: suvStealth, electric: suvElectric, pearl: suvPearl,
    candy: suvCandy, bronze: suvBronze, lime: suvLime,
  },
  sedan: {
    stealth: sedanStealth, electric: sedanElectric, pearl: sedanPearl,
    candy: sedanCandy, bronze: sedanBronze, lime: sedanLime,
  },
  pickup: {
    stealth: pickupStealth, electric: pickupElectric, pearl: pickupPearl,
    candy: pickupCandy, bronze: pickupBronze, lime: pickupLime,
  },
  convertible: {
    stealth: convStealth, electric: convElectric, pearl: convPearl,
    candy: convCandy, bronze: convBronze, lime: convLime,
  },
  hatch: {
    stealth: hatchStealth, electric: hatchElectric, pearl: hatchPearl,
    candy: hatchCandy, bronze: hatchBronze, lime: hatchLime,
  },
  bike: {
    stealth: bikeStealth, electric: bikeElectric, pearl: bikePearl,
    candy: bikeCandy, bronze: bikeBronze, lime: bikeLime,
  },
  van: {
    stealth: vanStealth, electric: vanElectric, pearl: vanPearl,
    candy: vanCandy, bronze: vanBronze, lime: vanLime,
  },
};

export const carList: { id: CarId; label: string }[] = [
  { id: "coupe",       label: "Sport Coupe" },
  { id: "suv",         label: "SUV" },
  { id: "sedan",       label: "Sedan" },
  { id: "pickup",      label: "Pickup" },
  { id: "convertible", label: "Convertible" },
  { id: "hatch",       label: "Hatchback" },
  { id: "bike",        label: "Motorcycle" },
  { id: "van",         label: "Luxury Van" },
];

export const palette: { id: ColorId; label: string; hex: string }[] = [
  { id: "stealth",  label: "Stealth Black", hex: "#0a0a0a" },
  { id: "electric", label: "Electric Blue", hex: "#2563EB" },
  { id: "pearl",    label: "Pearl White",   hex: "#f1f1ee" },
  { id: "candy",    label: "Candy Red",     hex: "#cc0a2a" },
  { id: "bronze",   label: "Bronze",        hex: "#9a6b3f" },
  { id: "lime",     label: "Acid Lime",     hex: "#a8e600" },
];
