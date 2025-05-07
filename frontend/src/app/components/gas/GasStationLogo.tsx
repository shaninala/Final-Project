import { StaticImageData } from "next/image";

const gasStationLogos: Record<string, StaticImageData> = {
  aloha: require("@/../public/gas_logo/aloha.png"),
  alon: require("@/../public/gas_logo/alon.png"),
  amoco: require("@/../public/gas_logo/amoco.png"),
  arco: require("@/../public/gas_logo/arco.png"),
  bp: require("@/../public/gas_logo/bp.png"),
  "buc-ee's": require("@/../public/gas_logo/buc-ee's.png"),
  "byrne dairy": require("@/../public/gas_logo/byrne_dairy.png"),
  cenex: require("@/../public/gas_logo/cenex.png"),
  chevron: require("@/../public/gas_logo/chevron.png"),
  "circle-k": require("@/../public/gas_logo/circle-k.png"),
  citgo: require("@/../public/gas_logo/citgo.png"),
  conoco: require("@/../public/gas_logo/conoco.png"),
  costco: require("@/../public/gas_logo/costco.png"),
  crown: require("@/../public/gas_logo/crown.png"),
  cumberland: require("@/../public/gas_logo/cumberland.png"),
  dk: require("@/../public/gas_logo/dk.png"),
  exxon: require("@/../public/gas_logo/exxon.png"),
  gomart: require("@/../public/gas_logo/gomart.png"),
  gulf: require("@/../public/gas_logo/gulf.png"),
  hele: require("@/../public/gas_logo/hele.png"),
  "high's dairy store": require("@/../public/gas_logo/high's_dairy_store.png"),
  holiday: require("@/../public/gas_logo/holiday.png"),
  kroger: require("@/../public/gas_logo/kroger.png"),
  "kwik trip": require("@/../public/gas_logo/kwik_trip.png"),
  "kwik-fill": require("@/../public/gas_logo/kwik-fill.png"),
  mobil: require("@/../public/gas_logo/mobil.png"),
  oxxo: require("@/../public/gas_logo/oxxo.png"),
  quiktrip: require("@/../public/gas_logo/quiktrip.png"),
  safeway: require("@/../public/gas_logo/safeway.png"),
  shell: require("@/../public/gas_logo/shell.png"),
  sinclair: require("@/../public/gas_logo/sinclair.png"),
  sunoco: require("@/../public/gas_logo/sunoco.png"),
  texaco: require("@/../public/gas_logo/texaco.png"),
  wawa: require("@/../public/gas_logo/wawa.png"),
};

export function getGasStationLogo(name: string): StaticImageData | undefined {
  const lowerName = name.toLowerCase();

  if (gasStationLogos[lowerName]) {
    return gasStationLogos[lowerName];
  }

  for (const [key, value] of Object.entries(gasStationLogos)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }

  const firstWord = lowerName.split(" ")[0];
  if (gasStationLogos[firstWord]) {
    return gasStationLogos[firstWord];
  }

  return undefined;
}
